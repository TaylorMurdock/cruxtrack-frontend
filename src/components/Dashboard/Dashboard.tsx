import { useEffect, useState } from "react";
import GearHandles from "../Gear/GearHandles";
import Cookies from "js-cookie";

function Dashboard() {
  const [gearData, setGearData] = useState([]);

  useEffect(() => {
    const fetchGearData = async () => {
      try {
        const response = await fetch("http://localhost:5000/gear", {
          headers: {
            Authorization: Cookies.get("token") || "",
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
      <GearHandles gearData={gearData} />
    </div>
  );
}

export default Dashboard;
