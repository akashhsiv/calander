import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Add your register logic here (e.g., API call)
    // If registration is successful, redirect to another page
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        fullWidth
        required
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        type="password"
        fullWidth
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        sx={{ mt: 2 }}
      >
        Register
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate("/login")}
        sx={{ mt: 1 }}
      >
        Already have an account? Login
      </Button>
    </Box>
  );
};

export default Register;
