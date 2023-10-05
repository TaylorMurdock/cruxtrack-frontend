// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gear from "./components/GearHandles";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Gear />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
