import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardContent, Typography, Tooltip as MuiTooltip } from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import InfoIcon from '@mui/icons-material/Info';

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
      "esgScore": 91,
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
      "esgScore": 43,
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
      "esgScore": 52,
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
      "esgScore": 86,
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
      "esgScore": 75,
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
      "esgScore": 91,
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
      "esgScore": 83,
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
      "esgScore": 62,
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
    "esgScore": 79,
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
    "esgScore": 27,
    "lastUpdated": "2024-09-13T13:00:00"
  }
}

const ForceGraph: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState([false, false, false]); // Manage flip state for 3 cards
  const [newDialogOpen, setNewDialogOpen] = useState(false); // State to control the new dialog
  const [jsonData, setJsonData] = useState<any>(dummyJson); // jsonData state to store API response
  const [tokenRewards, setTokenRewards] = useState(55);

  // Fetch JSON data via POST request
  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch('http://localhost:5165/Trace/ShipmentInfo?txHash=0x59577097eDC52def8991F7B71d2a5B9aFCDE3b4d', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ query: '0x59577097eDC52def8991F7B71d2a5B9aFCDE3b4d' }), // Add your payload here if needed
        });

        if (response.ok) {
          const data = await response.json();
          setJsonData(data); // Store API response in jsonData state
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchJsonData(); // Fetch data on component mount
  }, []);

  // Extract all ESG scores
  const esgScores = jsonData
    ? [
      ...jsonData.rawMaterialSource.map((source: any) => source.esgScore),
      ...jsonData.processor.map((processor: any) => processor.esgScore),
      jsonData.distributor.esgScore,
      jsonData.retailer.esgScore,
    ]
    : [];

  // Calculate mean of ESG scores
  const meanESG = esgScores.length > 0 ? esgScores.reduce((a, b) => a + b, 0) / esgScores.length : 0;

  // useEffect hook to calculate token rewards when the component mounts or ESG/meanESG changes
  useEffect(() => {
    // Calculate token rewards based on the formula
    const calculateTokenRewards = () => {
      const k = 47
      if (meanESG <= 60) {
        return 0; // If ESG is less than or equal to meanESG, reward is 0
      } else {
        return k * Math.pow((meanESG - 60), 2); // If ESG is greater than meanESG, apply the formula
      }
    };

    const rewards = calculateTokenRewards();
    setTokenRewards(rewards); // Set the token rewards based on the calculation
  }, [meanESG]); // Re-run the calculation if meanESG changes

  // Generate x-values for generic normal distribution
  const xValues = Array.from({ length: 101 }, (_, i) => i);

  // Generate y-values for generic normal distribution
  const mean = 50;
  const stdDev = 15;
  const yValues = xValues.map((x) => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)));

  // Create a dataset for the ESG mean point
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
        pointRadius: 0,
      },
      {
        label: 'ESG Mean',
        data: meanPointData,
        borderColor: 'red',
        pointBackgroundColor: 'red',
        pointBorderColor: 'red',
        pointRadius: meanPointData.map((value) => (value > 0 ? 5 : 0)),
        showLine: true,
      },
    ],
  };

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
        max: Math.max(...yValues) * 1.2,
      },
    },
  };

  // Generate graph data dynamically
  const generateGraphData = () => {
    if (!jsonData) return { nodes: [], links: [] };

    const nodes = [];
    const links = [];

    jsonData.rawMaterialSource.forEach((source: any, index: number) => {
      nodes.push({ id: `Raw Material Source ${index + 1}: ${source.name}`, group: 'rawMaterialSource' });
    });

    jsonData.processor.forEach((processor: any, index: number) => {
      nodes.push({ id: `Processor ${index + 1}: ${processor.name}`, group: 'processor' });
    });

    nodes.push({ id: `Distributor: ${jsonData.distributor.name}`, group: 'distributor' });
    nodes.push({ id: `Retailer: ${jsonData.retailer.name}`, group: 'retailer' });

    jsonData.rawMaterialSource.forEach((source: any, index: number) => {
      links.push({
        source: `Raw Material Source ${index + 1}: ${source.name}`,
        target: `Processor 1: ${jsonData.processor[0].name}`,
      });
    });

    jsonData.processor.forEach((processor: any, index: number) => {
      if (index < jsonData.processor.length - 1) {
        links.push({
          source: `Processor ${index + 1}: ${processor.name}`,
          target: `Processor ${index + 2}: ${jsonData.processor[index + 1].name}`,
        });
      }
    });

    links.push({
      source: `Processor ${jsonData.processor.length}: ${jsonData.processor[jsonData.processor.length - 1].name}`,
      target: `Distributor: ${jsonData.distributor.name}`,
    });

    links.push({
      source: `Distributor: ${jsonData.distributor.name}`,
      target: `Retailer: ${jsonData.retailer.name}`,
    });

    return { nodes, links };
  };

  const handleNodeClick = (node: any) => {
    let companyData = null;

    if (node.id.startsWith('Raw Material Source')) {
      const index = parseInt(node.id.match(/\d+/)[0]) - 1;
      companyData = jsonData.rawMaterialSource[index];
    } else if (node.id.startsWith('Processor')) {
      const index = parseInt(node.id.match(/\d+/)[0]) - 1;
      companyData = jsonData.processor[index];
    } else if (node.id.startsWith('Distributor')) {
      companyData = jsonData.distributor;
    } else if (node.id.startsWith('Retailer')) {
      companyData = jsonData.retailer;
    }

    setSelectedNode({ id: node.id, data: companyData });
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedNode(null);
    setIsFlipped([false, false, false]);
  };

  const handleFlip = (index: number) => {
    const newFlipState = [...isFlipped];
    newFlipState[index] = !newFlipState[index];
    setIsFlipped(newFlipState);
  };

  // Helper function to calculate the CDF of the standard normal distribution
  function cumulativeStandardNormal(z: number): number {
    // Constants for approximation
    const p = 0.2316419;
    const b1 = 0.319381530;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;

    const t = 1.0 / (1.0 + p * Math.abs(z));
    const poly = ((((b5 * t + b4) * t) + b3) * t + b2) * t + b1;
    const standardNormalApprox = 1.0 - (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z) * poly;

    // If z is negative, return the symmetric value for the CDF
    return z < 0 ? 1.0 - standardNormalApprox : standardNormalApprox;
  }

  // Function to calculate the percentile
  function calculatePercentile(meanESG: number, normalMean: number, stdDev: number): number {
    // Step 1: Calculate the Z-score
    const z = (meanESG - normalMean) / stdDev;

    // Step 2: Calculate the CDF of the standard normal distribution
    const percentile = cumulativeStandardNormal(z);

    // Step 3: Convert to percentage and return
    return percentile * 100;
  }

  // In your component
  const percentile = calculatePercentile(meanESG, mean, stdDev); // Get the percentile

  return (
    <>
      <div style={{ paddingLeft: '20px', marginBottom: '20px' }}>
        <Typography
          variant="h5"
          style={{
            fontWeight: 'bold',
          }}
        >
          DASANI Drinking Water
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
            Aggregate ESG: {meanESG.toFixed(2)} ({percentile.toFixed(2)} Percentile)
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Industry ESG: 60.00
          </Typography>
        </div>
      </div>


      <div style={{ position: 'relative' }}>
        <ForceGraph2D
          graphData={generateGraphData()}
          nodeLabel={(node: any) => `${node.id}`}
          linkDirectionalParticles={2}
          linkWidth={4}
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx, globalScale) => {
            let label = '';
            const match = node.id.match(/\d+/);
            let nodeIndex = 0;

            if (node.id.startsWith("Raw Material Source") && match) {
              nodeIndex = parseInt(match[0]) - 1;
              label = ``;
            } else if (node.id.startsWith("Processor") && match) {
              nodeIndex = parseInt(match[0]);
              label = `${nodeIndex}`;
            } else if (node.id.startsWith("Distributor")) {
              nodeIndex = jsonData.processor.length + 1;
              label = `${nodeIndex}`;
            } else if (node.id.startsWith("Retailer")) {
              nodeIndex = jsonData.processor.length + 2;
              label = `${nodeIndex}`;
            }

            const fontSize = 12 / globalScale;
            ctx.font = `bold ${fontSize}px Sans-Serif`;

            const esgScore = node.id.startsWith("Raw Material Source") && match
              ? jsonData.rawMaterialSource[parseInt(match[0]) - 1]?.esgScore ?? 0
              : node.id.startsWith("Processor") && match
                ? jsonData.processor[parseInt(match[0]) - 1]?.esgScore ?? 0
                : node.id.startsWith("Distributor")
                  ? jsonData.distributor?.esgScore ?? 0
                  : jsonData.retailer?.esgScore ?? 0;

            const x = node.x ?? 0;
            const y = node.y ?? 0;
            const nodeSize = 10;

            // Create gradient for node fill
            const gradient = ctx.createRadialGradient(x, y, nodeSize / 2, x, y, nodeSize);
            if (esgScore < 60) {
              gradient.addColorStop(0, '#cc6666'); // Inner color (darker muted red)
              gradient.addColorStop(1, '#b30000'); // Outer color (deep red)
            } else {
              gradient.addColorStop(0, '#66cc66'); // Inner color (darker muted green)
              gradient.addColorStop(1, '#009900'); // Outer color (deep green)
            }

            // Draw the border
            ctx.strokeStyle = esgScore < 60 ? 'darkred' : 'darkgreen'; // Border color based on ESG score
            ctx.lineWidth = 1; // Thickness of the border
            ctx.beginPath();
            ctx.arc(x, y, nodeSize + 0.5, 0, 2 * Math.PI, false); // Draw border
            ctx.stroke();

            // Set fill style to gradient
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, nodeSize, 0, 2 * Math.PI, false); // Draw node with gradient fill
            ctx.fill();

            // Draw text label
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
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
              {tokenRewards.toFixed(2)} $B3TR
            </Typography>
          </div>
          <Typography
            variant="h3"
            style={{
              textAlign: 'center',
              marginTop: '20px',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // Add drop shadow
              alignItems: 'center',  // Vertically center the icon with the text
            }}
          >
            Token Rewards
            <MuiTooltip
              title={
                <img
                  src="calculation.jpg"
                  alt="Calculation"
                  style={{
                    width: '300px', // Increase image size to be bigger
                    height: 'auto', // Ensure the image maintains its aspect ratio
                  }}
                />
              }
              arrow
              sx={{
                '.MuiTooltip-tooltip': {
                  fontSize: '1.5rem', // Adjust font size for text if present
                  maxWidth: 'none', // Remove any max width limitation on the tooltip
                  width: '420px', // Explicitly set the tooltip width to accommodate the image
                  padding: '20px', // Add padding around the tooltip content to make the bubble bigger
                  backgroundColor: 'rgba(0, 0, 0, 0.85)', // Optional: Adjust background color of the tooltip bubble
                  borderRadius: '10px', // Add rounded corners to the tooltip bubble
                },
                '.MuiTooltip-arrow': {
                  fontSize: '2rem', // Increase arrow size (optional)
                  color: 'rgba(0, 0, 0, 0.85)', // Match the arrow color with the tooltip bubble
                },
              }}
            >
              <InfoIcon
                style={{
                  marginLeft: '10px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '30px', // Increase the icon size
                }}
              />
            </MuiTooltip>
          </Typography>
          {/* Info icon wrapped with MuiTooltip */}
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
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {selectedNode?.id}
          </Typography>
          <Typography variant="subtitle2">
            {selectedNode?.data.productDescription}
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
                flexDirection: 'column', // Stack items vertically
                justifyContent: 'center', // Horizontally center the content
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  background: 'white', // White background
                  color: 'green', // Black text for contrast
                  padding: '10px 20px', // Padding to make it look like a button
                  borderRadius: '30px', // Rounded corners like a button
                  textAlign: 'center',
                  fontSize: '1.5rem', // Adjust font size
                  fontWeight: 'bold', // Bold font
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)', // Added shadow for button effect
                }}
              >
                ESG Score: {selectedNode.data.esgScore} 🥳
              </div>
              <div
                style={{
                  color: 'white', // White text for contrast
                  textAlign: 'center',
                  fontSize: '1.2rem', // Adjust font size
                  fontWeight: 'bold', // Bold font
                }}
              >
                vs
              </div>
              <div
                style={{
                  color: 'white', // White text for contrast
                  textAlign: 'center',
                  fontSize: '1.5rem', // Adjust font size
                  fontWeight: 'bold', // Bold font
                }}
              >
                Industry ESG: {(selectedNode.data.esgScore - 9.48).toFixed(2)}
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
