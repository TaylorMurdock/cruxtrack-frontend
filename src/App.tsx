import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"; // Import the Dashboard component
import NavBar from "./components/NavBar";
import EntryDetails from "./components/Journal/EntryDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal/:id" element={<EntryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
