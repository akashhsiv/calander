import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import Notes from "./components/Notes";
// import Tasks from "./components/Task";
// import Reminders from "./components/Reminder";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/notes" element={<Notes />} /> */}
        {/* <Route path="/tasks" element={<Tasks />} /> */}
        {/* <Route path="/reminders" element={<Reminders />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
