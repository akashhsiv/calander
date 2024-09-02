import { grey } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

// Define a function to create and return the theme based on the mode
export const createAppTheme = (mode: "light" | "dark"): Theme => {
  const isDarkMode = mode === "dark";

  return createTheme({
    palette: {
      mode: mode,
      // Define additional palette options if needed
      // primary: {
      //   main: "#172c66",
      // },
      // secondary: {
      //   main: "#fffffe",
      // },
    },
    typography: {
      fontFamily: "Outfit", // Custom font
      // Define additional typography options if needed
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            border: isDarkMode
              ? "1px solid hsl(217.2, 32.6%, 17.5%)"
              : grey[50],
            backgroundColor: isDarkMode
              ? "hsl(222.2, 84%, 4.9%)"
              : "hsl(0, 0%, 100%)",
            color: isDarkMode ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode
              ? "hsl(222.2, 84%, 4.9%)"
              :   grey[50],
            color: isDarkMode ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode
              ? "hsl(222.2, 84%, 4.9%)"
              : "hsl(0, 0%, 100%)",
            color: isDarkMode ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
          },
        },
      },
    },
  });
};
