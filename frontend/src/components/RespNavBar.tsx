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
import {  FormControlLabel, Menu, MenuItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { profilePictures } from "./Constants";
import { MaterialUISwitch } from "./ThemeSwitch";
import { resetState, setThemeMode } from "./features/core/coreSlice";
import { useDispatch } from "react-redux";
import useSignOut from "react-auth-kit/hooks/useSignOut";

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
});

const BottomAppBar: React.FC = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();

  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(
    null
  );
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<HTMLElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const username = useSelector((state: RootState) => state.core.auth.username);
const dispatch = useDispatch();
const themeMode = useSelector((state: RootState) => state.core.themeMode);

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

  // Array of profile picture URLs
 const handleLogout = () => {
   signOut();
    dispatch(resetState());
   navigate("/");
   console.log("logout successfull");
 };

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newMode = event.target.checked ? "dark" : "light";
  dispatch(setThemeMode(newMode));
};

  // Select a random profile picture
  const randomProfilePicture =
    profilePictures[Math.floor(Math.random() * profilePictures.length)];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={handleMoreClick}>
              <MoreIcon />
            </IconButton>

            <FormControlLabel
              control={
                <MaterialUISwitch
                  checked={themeMode === "dark"}
                  onChange={handleChange}
                  sx={{ m: 1 }}
                />
              }
              label=""
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 2,
                mb: 1,
              }}
            >
              <img
                src="/logo.png" // Replace with your image path
                alt="Logo"
                style={{ marginRight: "10px", height: "30px" }} // Adjust the styles as needed
              />
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                DaYFloW
              </Typography>
            </Box>
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
              <ProfileMenuIcon
                src={randomProfilePicture} // Use the random profile picture
                alt="Profile"
              />
            </IconButton>
            <Menu
              anchorEl={moreAnchorEl}
              open={Boolean(moreAnchorEl)}
              onClose={handleMoreClose}
            >
              <MenuItem
                onClick={handleMoreClose}
                component={Link}
                to="/AllNotes"
              >
                My Notes
              </MenuItem>
              <MenuItem
                onClick={handleMoreClose}
                component={Link}
                to="/AllTasks"
              >
                My Tasks
              </MenuItem>
              <MenuItem
                onClick={handleMoreClose}
                component={Link}
                to="/AllReminders"
              >
                My Reminders
              </MenuItem>

              <MenuItem
                onClick={handleMoreClose}
                component={Link}
                to="/AllTodos"
              >
                My To-Dos
              </MenuItem>
            </Menu>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem>{username}</MenuItem>

              <MenuItem onClick={handleLogout}>Exit</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default BottomAppBar;
