// Dashboard.tsx
import React, { useEffect, useState } from "react";
import GearList from "../Gear/GearList";
import GearHandles from "../Gear/GearHandles";
import Cookies from "js-cookie";

function Dashboard() {
  const [gearData, setGearData] = useState([]);

  // Dummy onDelete function, as it's not needed in the Dashboard
  const handleDelete = (itemId: number) => {
    // Do nothing or display a message if needed
  };

  // Dummy onEdit function, as it's not needed in the Dashboard
  const handleEdit = (
    itemId: number,
    newItem: string,
    newDateBought: string
  ) => {
    // Do nothing or display a message if needed
  };

  useEffect(() => {
    const fetchGearData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("http://localhost:5000/gear", {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGearData(data);
      } catch (error) {
        console.error("Error fetching gear data:", error);
      }
    };

    fetchGearData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <GearList
        gearData={gearData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <GearHandles />
    </div>
  );
}

export default Dashboard;
