import React from "react";
import GearHandles from "../Gear/GearHandles";
import JournalHandles from "../Journal/JournalHandles";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <GearHandles />
      <JournalHandles />
    </div>
  );
}

export default Dashboard;
