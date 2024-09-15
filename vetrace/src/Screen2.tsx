import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the CloseIcon

const Screen2: React.FC = () => {
  const [open, setOpen] = useState(false); // State to control the dialog
  const [b3trValue, setB3trValue] = useState(2000); // State to control the B3TR value
  const [loading, setLoading] = useState(false); // State to manage the loading state

  // Set body background color to black on mount
  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = ''; // Reset on unmount
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true); // Open dialog when image is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  const handleRedeem = () => {
    if (b3trValue >= 500) {
      setLoading(true); // Set loading state to true to show the spinner

      // Simulate a delay with setTimeout (e.g., 2 seconds)
      setTimeout(() => {
        setB3trValue(b3trValue - 500); // Decrease the B3tR value by 500
        setLoading(false); // Stop showing the spinner
        alert('Voucher has been sent to your email!\n0x616c4fc81171abc2b132b53b98ef9852c5001d89aa5bfd483eade3f450cb635d');
      }, 2000); // 2 seconds delay
    } else {
      alert('Not enough $B3TR remaining to redeem the voucher!');
    }
  };

  return (
    <div
      style={{
        paddingTop: '40px', // Add padding to the top of the image
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the viewport
        backgroundColor: 'black', // Set the background to black
      }}
    >
      {/* Image that opens the dialog when clicked */}
      <img
        src="redemption.jpg"
        alt="redemption"
        style={{
          width: '80%', // Adjust width to fill most of the screen
          height: 'auto', // Maintain aspect ratio
          cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
        }}
        onClick={handleClickOpen} // Open the dialog when image is clicked
      />

      {/* Dialog to display the image */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
        style: {
          borderRadius: 30,
          background: 'linear-gradient(135deg, #6a0080, #b266b2)', // Purple-pink gradient
          color: 'white',
        },
      }}>
        {/* Add IconButton with CloseIcon to the top-right corner */}
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginRight: 'auto' }}>
            NTUC Fairprice Redemption
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ position: 'absolute', right: 20, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              {/* Left side: NTUC logo and $10 value */}
              <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                <img
                  src="ntuc.jpg"
                  alt="NTUC"
                  style={{
                    width: '80px', // Adjust width of the image
                    height: '80px',
                    marginBottom: '10px', // Spacing between image and text
                    borderRadius: '50%',
                  }}
                />
                <Typography variant="h5" style={{ marginTop: '10px' }}>
                  $10 Value
                </Typography>
              </Grid>

              {/* Right side: Terms and Conditions */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" style={{ marginLeft: '20px', textAlign: 'left' }}>
                  <strong>Terms & Conditions:</strong>
                  <ul>
                    <li>This voucher is valid for 6 months from the date of issue.</li>
                    <li>Can be redeemed at any NTUC Fairprice outlet.</li>
                    <li>Not refundable or exchangeable for cash.</li>
                    <li>Valid for a single transaction only.</li>
                    <li>Terms and conditions apply as per NTUC policies.</li>
                  </ul>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography>
            $B3TR Remaining: {b3trValue}
          </Typography>
          {/* Redeem button with gradient background and styled text */}
          <Button
            color="primary"
            variant="contained"
            style={{
              width: '80%', // Make the button take up 80% of the dialog width
              borderRadius: 20,
              background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', // Gradient background (orange-pink)
              padding: '10px',
              fontSize: '1.5rem', // Larger font size for the button text
              fontWeight: 'bold', // Bold text
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // Add text shadow
              color: 'white', // White text color for better visibility
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Add slight shadow to the button
              marginBottom: '20px', // Spacing at the bottom
            }}
            onClick={handleRedeem} // Trigger the redeem action on button click
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Redeem Voucher'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Screen2;
