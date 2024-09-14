import React, { useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardContent, Typography } from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dummyJson = {
  "name": "Shipment of Plastic Water Bottles",
  "quantity": 25000,
  "entityCount": 4,
  "rawMaterialSource": [
    {
      "address": "5001 Polymer St.",
      "name": "EcoPolymers Ltd.",
      "location": "Shanghai, China",
      "productDescription": "High-quality polyethylene for bottle manufacturing",
      "carbon": 135.4,
      "water": 180.2,
      "plastic": 500.0,
      "produceWeight": 1200.0,
      "esgScore": 10,
      "lastUpdated": "2024-09-12T08:00:00"
    },
    {
      "address": "5002 Chemical Rd.",
      "name": "GreenPlastics Co.",
      "location": "Frankfurt, Germany",
      "productDescription": "Recycled plastic materials for bottle production",
      "carbon": 145.0,
      "water": 220.0,
      "plastic": 550.0,
      "produceWeight": 1300.0,
      "esgScore": 40,
      "lastUpdated": "2024-09-12T09:30:00"
    },
    {
      "address": "5003 Resource Ave.",
      "name": "BioPolymer Solutions",
      "location": "São Paulo, Brazil",
      "productDescription": "Biodegradable polymers for eco-friendly water bottles",
      "carbon": 125.0,
      "water": 200.0,
      "plastic": 480.0,
      "produceWeight": 1150.0,
      "esgScore": 50,
      "lastUpdated": "2024-09-12T10:15:00"
    }
  ],
  "processor": [
    {
      "address": "6001 Processing Blvd.",
      "name": "BottleMakers Inc.",
      "location": "New York, USA",
      "productDescription": "Plastic molding and bottle formation",
      "carbon": 95.0,
      "water": 150.0,
      "plastic": 600.0,
      "produceWeight": 1400.0,
      "esgScore": 30,
      "lastUpdated": "2024-09-13T08:45:00"
    },
    {
      "address": "6002 MoldTech Ave.",
      "name": "Precision Bottle Tech",
      "location": "Berlin, Germany",
      "productDescription": "Precision molding for plastic bottles",
      "carbon": 85.5,
      "water": 140.0,
      "plastic": 580.0,
      "produceWeight": 1350.0,
      "esgScore": 70,
      "lastUpdated": "2024-09-13T09:30:00"
    },
    {
      "address": "6003 Polymer Dr.",
      "name": "PolyPro Manufacturing",
      "location": "Mumbai, India",
      "productDescription": "Mass production of water bottle plastics",
      "carbon": 80.0,
      "water": 130.0,
      "plastic": 550.0,
      "produceWeight": 1250.0,
      "esgScore": 100,
      "lastUpdated": "2024-09-13T10:15:00"
    },
    {
      "address": "6004 GreenMold St.",
      "name": "EcoMolding Solutions",
      "location": "Tokyo, Japan",
      "productDescription": "Eco-friendly plastic molding for sustainable bottles",
      "carbon": 75.0,
      "water": 120.0,
      "plastic": 520.0,
      "produceWeight": 1200.0,
      "esgScore": 80,
      "lastUpdated": "2024-09-13T11:00:00"
    },
    {
      "address": "6005 PlasticWorks Hub",
      "name": "NextGen Bottling",
      "location": "Cape Town, South Africa",
      "productDescription": "Next-generation bottling technology using recycled materials",
      "carbon": 70.0,
      "water": 110.0,
      "plastic": 500.0,
      "produceWeight": 1100.0,
      "esgScore": 60,
      "lastUpdated": "2024-09-13T11:45:00"
    }
  ],
  "distributor": {
    "address": "7001 Distribution Rd.",
    "name": "WorldWide Bottle Distribution",
    "location": "Dubai, UAE",
    "productDescription": "Global distribution of plastic water bottles",
    "carbon": 60.0,
    "water": 100.0,
    "plastic": 400.0,
    "produceWeight": 1000.0,
    "esgScore": 70,
    "lastUpdated": "2024-09-13T12:30:00"
  },
  "retailer": {
    "address": "8001 Retail Center",
    "name": "Hydration Hub",
    "location": "London, UK",
    "productDescription": "Retailer of plastic water bottles for consumers",
    "carbon": 45.0,
    "water": 80.0,
    "plastic": 350.0,
    "produceWeight": 900.0,
    "esgScore": 20,
    "lastUpdated": "2024-09-13T13:00:00"
  }
}

const ForceGraph: React.FC = () => {
  // State for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState([false, false, false]); // Manage flip state for 3 cards

  const [newDialogOpen, setNewDialogOpen] = useState(false); // State to control the new dialog

  // Sample JSON data for node details with updated fields: carbon, water, plastic
  const [jsonData] = useState(dummyJson);
  const [tokenRewards, setTokenRewards] = useState(55);

  // Extract all ESG scores
  const esgScores = [
    ...jsonData.rawMaterialSource.map((source: any) => source.esgScore),
    ...jsonData.processor.map((processor: any) => processor.esgScore),
    jsonData.distributor.esgScore,
    jsonData.retailer.esgScore
  ];

  // Calculate mean of ESG scores
  const meanESG = esgScores.reduce((a, b) => a + b, 0) / esgScores.length;

  // Generate x-values for generic normal distribution
  const xValues = Array.from({ length: 101 }, (_, i) => i);

  // Generate y-values for generic normal distribution
  const mean = 50; // Mean for the generic normal distribution
  const stdDev = 15; // Standard deviation for the generic normal distribution
  const yValues = xValues.map(x => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
  });

  // Create a dataset for the ESG mean point with only one visible point
  const meanPointData = xValues.map((x) => (x === Math.round(meanESG) ? 1 : 0)); // Keep the dataset as numbers

  // Chart.js data
  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: 'Generic Normal Distribution',
        data: yValues,
        borderColor: 'blue',
        fill: false,
        pointRadius: 0, // Remove points for the normal distribution line
      },
      {
        label: 'ESG Mean',
        data: meanPointData, // Use dataset with numbers only
        borderColor: 'red',
        pointBackgroundColor: 'red',
        pointBorderColor: 'red',
        pointRadius: meanPointData.map((value) => (value > 0 ? 5 : 0)), // Show the point only where the ESG mean is
        showLine: true, // Do not show a line for this dataset
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Generic Normal Distribution and ESG Mean: ${meanESG.toFixed(2)}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'ESG Score (0 to 100 scale)',
        },
        min: 0,
        max: 100,
      },
      y: {
        title: {
          display: true,
          text: 'Probability Density',
        },
        min: 0,
        max: Math.max(...yValues) * 1.2, // Ensure space for the curve
      },
    },
  };

  // Generate graph data dynamically
  const generateGraphData = () => {
    const nodes = [];
    const links = [];

    // Add raw material source nodes
    jsonData.rawMaterialSource.forEach((source, index) => {
      nodes.push({ id: `Raw Material Source ${index + 1}: ${source.name}`, group: 'rawMaterialSource' });
    });

    // Add processor nodes
    jsonData.processor.forEach((processor, index) => {
      nodes.push({ id: `Processor ${index + 1}: ${processor.name}`, group: 'processor' });
    });

    // Add distributor node
    nodes.push({ id: `Distributor: ${jsonData.distributor.name}`, group: 'distributor' });

    // Add retailer node
    nodes.push({ id: `Retailer: ${jsonData.retailer.name}`, group: 'retailer' });

    // Add links from raw material sources to the first processor
    jsonData.rawMaterialSource.forEach((source, index) => {
      links.push({
        source: `Raw Material Source ${index + 1}: ${source.name}`,
        target: `Processor 1: ${jsonData.processor[0].name}`,
      });
    });

    // Add links between processors
    jsonData.processor.forEach((processor, index) => {
      if (index < jsonData.processor.length - 1) {
        links.push({
          source: `Processor ${index + 1}: ${processor.name}`,
          target: `Processor ${index + 2}: ${jsonData.processor[index + 1].name}`,
        });
      }
    });

    // Add link from last processor to distributor
    links.push({
      source: `Processor ${jsonData.processor.length}: ${jsonData.processor[jsonData.processor.length - 1].name}`,
      target: `Distributor: ${jsonData.distributor.name}`,
    });

    // Add link from distributor to retailer
    links.push({
      source: `Distributor: ${jsonData.distributor.name}`,
      target: `Retailer: ${jsonData.retailer.name}`,
    });

    return { nodes, links };
  };

  // Function to handle node click
  const handleNodeClick = (node: any) => {
    // Find corresponding data in jsonData
    let companyData = null;

    if (node.id.startsWith("Raw Material Source")) {
      const index = parseInt(node.id.match(/\d+/)[0]) - 1;
      companyData = jsonData.rawMaterialSource[index];
    } else if (node.id.startsWith("Processor")) {
      const index = parseInt(node.id.match(/\d+/)[0]) - 1;
      companyData = jsonData.processor[index];
    } else if (node.id.startsWith("Distributor")) {
      companyData = jsonData.distributor;
    } else if (node.id.startsWith("Retailer")) {
      companyData = jsonData.retailer;
    }

    setSelectedNode({ id: node.id, data: companyData });
    setDialogOpen(true); // Open the dialog
  };

  // Function to handle dialog close
  const handleClose = () => {
    setDialogOpen(false); // Close the dialog
    setSelectedNode(null); // Clear the selected node
    setIsFlipped([false, false, false]); // Reset all cards to front
  };

  // Handle card flip for each card
  const handleFlip = (index: number) => {
    const newFlipState = [...isFlipped];
    newFlipState[index] = !newFlipState[index];
    setIsFlipped(newFlipState);
  };

  return (
    <>
      <div style={{ paddingLeft: '20px', marginBottom: '20px' }}>
        <Typography
          variant="h5"
          style={{
            fontWeight: 'bold',
          }}
        >
          DASANI DRINKING WATER
        </Typography>

        {/* Button to open the new dialog */}
        <Button
          variant="contained"
          style={{
            marginTop: '10px',
            width: '100%', // Set the width to match the container (which should be as wide as the DASANI text)
            maxWidth: '300px', // Optionally set a max width if needed
            color: 'white',
            borderRadius: '20px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #6a0080, #b266b2)', // Purple-pink gradient
          }}
          onClick={() => setNewDialogOpen(true)}
        >
          Rewards
        </Button>
      </div>

      {/* Display the normal distribution graph at the top right of the ForceGraph */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '20px',
          width: '400px',
          height: '200px',
        }}
      >
        <Line data={chartData} options={chartOptions} />
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Aggregate ESG: {meanESG}
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Industry ESG: 80
          </Typography>
        </div>
      </div>


      <div style={{ position: 'relative' }}>
        <ForceGraph2D
          graphData={generateGraphData()}
          nodeLabel={(node: any) => `${node.id}`}
          linkDirectionalParticles={2}
          linkWidth={4} // Increase the link width
          onNodeClick={handleNodeClick} // Open dialog on node click
          nodeCanvasObject={(node, ctx, globalScale) => {
            let label = ''; // Initialize the label
            const match = node.id.match(/\d+/); // Safe match extraction
            let nodeIndex = 0;

            // Set the label based on node type
            if (node.id.startsWith("Raw Material Source") && match) {
              nodeIndex = parseInt(match[0]) - 1;
              label = ``; // Raw material source starts at 0
            } else if (node.id.startsWith("Processor") && match) {
              nodeIndex = parseInt(match[0]); // Processor starts from 1
              label = `${nodeIndex}`;
            } else if (node.id.startsWith("Distributor")) {
              nodeIndex = jsonData.processor.length + 1; // After the processors
              label = `${nodeIndex}`;
            } else if (node.id.startsWith("Retailer")) {
              nodeIndex = jsonData.processor.length + 2; // After the distributor
              label = `${nodeIndex}`;
            }

            ctx.font = `bold Sans-Serif`; // Set the font to bold
            const fontSize = 12 / globalScale;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            // Determine the node color based on ESG score
            let esgScore = 0;

            if (node.id.startsWith("Raw Material Source") && match) {
              const index = parseInt(match[0]) - 1;
              esgScore = jsonData.rawMaterialSource[index]?.esgScore ?? 0;
            } else if (node.id.startsWith("Processor") && match) {
              const index = parseInt(match[0]) - 1;
              esgScore = jsonData.processor[index]?.esgScore ?? 0;
            } else if (node.id.startsWith("Distributor")) {
              esgScore = jsonData.distributor?.esgScore ?? 0;
            } else if (node.id.startsWith("Retailer")) {
              esgScore = jsonData.retailer?.esgScore ?? 0;
            }

            // Set default values for x and y if they are undefined
            const x = node.x ?? 0;
            const y = node.y ?? 0;

            // Increase the size of the node (default was 5, now increased to 10)
            const nodeSize = 10;

            // Set color: red if ESG score < 5, green if >= 5
            ctx.fillStyle = esgScore < 50 ? 'red' : 'green';
            ctx.beginPath();
            ctx.arc(x, y, nodeSize, 0, 2 * Math.PI, false); // Increase the node size here
            ctx.fill();

            // Draw text label
            ctx.fillStyle = 'white';
            ctx.fillText(label, x - bckgDimensions[0] / 2, y + bckgDimensions[1] / 2);
          }}
        />
      </div>

      {/* New dialog box with a purple-pink gradient */}
      <Dialog open={newDialogOpen} onClose={() => setNewDialogOpen(false)} maxWidth="md" fullWidth PaperProps={{
        style: {
          borderRadius: 30,
          background: 'linear-gradient(135deg, #6a0080, #b266b2)', // Purple-pink gradient
          color: 'white',
        },
      }}>
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Rewards
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <img src="b3tr_token.webp" alt="$B3TR Token" style={{ width: '100px', height: '100px' }} />
            <Typography
              variant="h1"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginLeft: '15px',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // Add drop shadow
              }}
            >
              {tokenRewards} $B3TR
            </Typography>
          </div>
          <Typography
            variant="h3"
            style={{
              textAlign: 'center',
              marginTop: '20px',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // Add drop shadow
            }}
          >
            Token Rewards
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDialogOpen(false)} color="primary" variant="contained" style={{ borderRadius: 15 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for node details */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
        style: {
          borderRadius: 30, // Increase the border radius for more curvature
          background: 'linear-gradient(135deg, #1e3a8a, #10b981)', // Blue-green gradient similar to the image
          color: 'white', // Ensure text is white to contrast with the background
        },
      }}>
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            {selectedNode?.id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Card Container */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            {/* Check if selected node has data and display information */}
            {selectedNode?.data ? (
              <>
                {/* Flip Card for Carbon Data */}
                <ReactCardFlip isFlipped={isFlipped[0]} flipDirection="horizontal">
                  <Card onClick={() => handleFlip(0)} style={{
                    width: '200px',
                    height: '150px',
                    cursor: 'pointer',
                    borderRadius: 15,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Even more shadow
                  }}>
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Vertically center text
                        height: '70%',
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">Carbon</Typography>
                      <Typography variant="body2" align="center">Click to flip</Typography>
                    </CardContent>
                  </Card>

                  <Card onClick={() => handleFlip(0)} style={{
                    width: '200px',
                    height: '150px',
                    cursor: 'pointer',
                    borderRadius: 15,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Even more shadow
                  }}>
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Vertically center text
                        height: '70%',
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">Carbon Emissions</Typography>
                      <Typography variant="h5" align="center">💨 {selectedNode.data.carbon} tons</Typography>
                    </CardContent>
                  </Card>
                </ReactCardFlip>

                {/* Similar updates for Water and Plastic Data */}
                <ReactCardFlip isFlipped={isFlipped[1]} flipDirection="horizontal">
                  <Card onClick={() => handleFlip(1)} style={{
                    width: '200px',
                    height: '150px',
                    cursor: 'pointer',
                    borderRadius: 15,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Even more shadow
                  }}>
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Vertically center text
                        height: '70%',
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">Water</Typography>
                      <Typography variant="body2" align="center">Click to flip</Typography>
                    </CardContent>
                  </Card>

                  <Card onClick={() => handleFlip(1)} style={{
                    width: '200px',
                    height: '150px',
                    cursor: 'pointer',
                    borderRadius: 15,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Even more shadow
                  }}>
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Vertically center text
                        height: '70%',
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">Water Used</Typography>
                      <Typography variant="h5" align="center">💧 {selectedNode.data.water} liters</Typography>
                    </CardContent>
                  </Card>
                </ReactCardFlip>

                <ReactCardFlip isFlipped={isFlipped[2]} flipDirection="horizontal">
                  <Card onClick={() => handleFlip(2)} style={{
                    width: '200px',
                    height: '150px',
                    cursor: 'pointer',
                    borderRadius: 15,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Even more shadow
                  }}>
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Vertically center text
                        height: '70%',
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">Plastic</Typography>
                      <Typography variant="body2" align="center">Click to flip</Typography>
                    </CardContent>
                  </Card>

                  <Card onClick={() => handleFlip(2)} style={{
                    width: '200px',
                    height: '150px',
                    cursor: 'pointer',
                    borderRadius: 15,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Even more shadow
                  }}>
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Vertically center text
                        height: '70%',
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">Plastic Consumed</Typography>
                      <Typography variant="h5" align="center">🧴 {selectedNode.data.plastic} kg</Typography>
                    </CardContent>
                  </Card>
                </ReactCardFlip>
              </>
            ) : (
              <Typography variant="body2" align="center">No data available for this node.</Typography>
            )}
          </div>

          {/* Add the ESG score at the bottom, centered, in a button-like container */}
          {selectedNode?.data && (
            <div
              style={{
                display: 'flex', // Use flexbox
                justifyContent: 'center', // Horizontally center the content
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', // Complementary orange-pink gradient
                  color: 'black', // White text for contrast
                  padding: '10px 20px', // Padding to make it look like a button
                  borderRadius: '30px', // Rounded corners like a button
                  textAlign: 'center',
                  fontSize: '1.5rem', // Adjust font size
                  fontWeight: 'bold', // Bold font
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)', // Added shadow for button effect
                }}
              >
                ESG Score: {selectedNode.data.esgScore}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant='contained' style={{ borderRadius: 15 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ForceGraph;
