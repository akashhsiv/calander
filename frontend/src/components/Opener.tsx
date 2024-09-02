import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Opener: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <img src="logo.png" alt="App Logo" width="150" />
      </Box>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold" }}>
        DaYFloW
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        DaYFloW: Your go-to tool for organizing tasks and staying on top of your
        day. 'The secret of getting ahead is getting started.' – Mark Twain
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          href="/login"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button variant="outlined" color="primary" href="/register">
          Register
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="text" color="secondary" onClick={handleDialogOpen}>
          About the App
        </Button>
      </Box>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>About DaYFloW</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            DaYFloW is your all-in-one personal organizer designed to help you
            manage tasks, daily schedules, and reminders effortlessly.
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            About the Creator
          </Typography>
          <Typography>
            Lives in India, created this app to gain experience in coding and to
            contribute positively to the world.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Opener;
