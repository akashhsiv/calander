import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route
            path={"/"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
};

export default App;
