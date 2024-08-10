import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MoreIcon from "@mui/icons-material/MoreVert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import  useSignIn  from 'react-auth-kit/hooks/useSignIn';

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const ProfileMenuIcon = styled(Avatar)({
  width: 40,
  height: 40,
  backgroundColor: "#ffffff",
  border: "2px solid #ffffff",
});

const BottomAppBar: React.FC = () => {
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(
    null
  );
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<HTMLElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const signIn = useSignIn(); // Use the signIn hook

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogin = () => {
    signIn({
      token: "dummy-token",
      expiresIn: 3600, // Duration in seconds
      tokenType: "Bearer",
      authState: { email: "user@example.com" },
    });
    handleProfileClose();
  };

  const handleRegister = () => {
    // Implement your register functionality here
    handleProfileClose();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleMoreClick}>
            <MoreIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {isMobile && (
            <StyledFab color="secondary" aria-label="add">
              <AddIcon />
            </StyledFab>
          )}
          <IconButton
            color="inherit"
            aria-label="profile"
            onClick={handleProfileClick}
          >
            <ProfileMenuIcon src="/path/to/profile-pic.jpg" alt="Profile" />
          </IconButton>
          <Menu
            anchorEl={moreAnchorEl}
            open={Boolean(moreAnchorEl)}
            onClose={handleMoreClose}
          >
            <MenuItem onClick={handleMoreClose} component={Link} to="/notes">
              My Notes
            </MenuItem>
            <MenuItem
              onClick={handleMoreClose}
              component={Link}
              to="/reminders"
            >
              My Reminders
            </MenuItem>
            <MenuItem onClick={handleMoreClose} component={Link} to="/tasks">
              My Tasks
            </MenuItem>
            <MenuItem onClick={handleMoreClose} component={Link} to="/todos">
              My To-Dos
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
          >
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            <MenuItem onClick={handleRegister}>Register</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default BottomAppBar;
