import { useEffect, useState } from "react";
import GearHandles from "../Gear/GearHandles";
import Cookies from "js-cookie";

function Dashboard() {
  const [gearData, setGearData] = useState([]);
  const [username, setUsername] = useState(""); // State for the username

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

    // Get the username from Cookies
    const storedUsername = Cookies.get("username");
    console.log("Stored Username:", storedUsername); // Log the retrieved username
    if (storedUsername) {
      setUsername(storedUsername);
      console.log("Username in state:", storedUsername); // Log the current username state
    }

    fetchGearData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {username && <p>Signed In: {username}</p>}
      <GearHandles gearData={gearData} />
    </div>
  );
}

export default Dashboard;
