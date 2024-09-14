import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the CloseIcon

const Screen2: React.FC = () => {
  const [open, setOpen] = useState(false); // State to control the dialog

  const handleClickOpen = () => {
    setOpen(true); // Open dialog when image is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  return (
    <div>
      {/* Image that opens the dialog when clicked */}
      <img
        src="redemption.png"
        alt="redemption"
        style={{
          paddingTop: '40px', // Add padding to the top of the image
          width: '100%',   // Make the image fill the screen width
          height: 'auto',  // Maintain the aspect ratio
          cursor: 'pointer' // Add a pointer cursor to indicate it's clickable
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
            onClick={() => alert('Voucher Redeemed!')} // Placeholder action for redeeming
          >
            Redeem Voucher
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default Screen2;
