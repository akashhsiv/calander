import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BottomAppBar from "./components/RespNavBar"; // Ensure this is correctly imported

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <BottomAppBar />{" "}
      {/* Ensure this is included here or within Home if it should be part of the home page */}
    </Router>
  );
};

export default App;
 