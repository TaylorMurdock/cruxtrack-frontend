import React, { useEffect, useState } from "react";
import GearList from "../Gear/GearList"; // Import the GearList component
import GearHandles from "../Gear/GearHandles";
import Cookies from "js-cookie"; // Import the js-cookie library

function Dashboard() {
  const [gearData, setGearData] = useState([]);

  useEffect(() => {
    // Function to fetch gear data and authenticate using JWT token
    const fetchGearData = async () => {
      try {
        // Retrieve the JWT token from the cookies
        const token = Cookies.get("token");

        const response = await fetch("URL_TO_FETCH_GEAR_DATA", {
          headers: {
            Authorization: `Bearer ${token}`, // Provide the JWT token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching gear data:", error);
        return [];
      }
    };

    // Call the fetchGearData function to fetch and update gear data
    fetchGearData().then((data) => setGearData(data));
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <h1>Dashboard</h1>
      <GearList gearData={gearData} />
      <GearHandles />
    </div>
  );
}

export default Dashboard;
