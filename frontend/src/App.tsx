import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "./components/app/store";
import { createAppTheme } from "./theme"; // Import the theme
import Opener from "./components/Opener";
import { AllNotes } from "./components/history/AllNotes";
import { AllReminders } from "./components/history/AllReminders";
import { AllTasks } from "./components/history/AllTasks";
import { AllTodos } from "./components/history/AllTodos";

const App: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.core.themeMode);

  const theme = createAppTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Opener />} />
          <Route
            path="/calendar"
            element={
              <RequireAuth fallbackPath="/">
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/AllNotes" element={<AllNotes />} />
          <Route path="/AllReminders" element={<AllReminders />} />
          <Route path="/AllTasks" element={<AllTasks />} />
          <Route path="/AllTodos" element={<AllTodos />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
