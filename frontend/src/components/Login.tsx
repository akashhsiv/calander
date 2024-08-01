import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login logic here (e.g., API call)
    // If login is successful, redirect to another page
    navigate("/dashboard"); // Redirect to the dashboard or any other page
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
        Login
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate("/register")}
        sx={{ mt: 1 }}
      >
        Don't have an account? Register
      </Button>
    </Box>
  );
};

export default Login;
