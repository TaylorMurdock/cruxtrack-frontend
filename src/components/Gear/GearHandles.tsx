// GearHandles.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import GearForm from "./GearForm";
import GearList from "./GearList";
import { FaPlus } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

interface GearItem {
  id: number;
  item: string;
  dateBought: string;
}

function GearHandles() {
  const [gearData, setGearData] = useState<GearItem[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newGearItem, setNewGearItem] = useState({ item: "", dateBought: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchGearData();
  }, []);

  const fetchGearData = () => {
    // Get the stored token from cookies
    const token = Cookies.get("token")?.replace("Bearer", "").trim();
    console.log("Token:", token); // Log the token

    fetch("http://localhost:5000/gear/", {
      headers: {
        Authorization: `${token}`, // Use the extracted token
      },
    })
      .then((response) => response.json())
      .then((data: GearItem[]) => setGearData(data))
      .catch((error) => console.error("Error fetching gear data:", error));
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setNewGearItem({ item: "", dateBought: "" });
    setSelectedDate(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGearItem({ ...newGearItem, [name]: value });
  };

  const handleDelete = async (itemId: number) => {
    // Get the stored token from cookies
    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    try {
      const response = await fetch(`http://localhost:5000/gear/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 204) {
        // Delete was successful
        const updatedGearData = gearData.filter((item) => item.id !== itemId);
        setGearData(updatedGearData);
      } else {
        console.error("Failed to delete gear item.");
      }
    } catch (error) {
      console.error("Error deleting gear item:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      console.error("Please select a date.");
      return;
    }

    // Get the stored token from cookies
    const token = Cookies.get("token")?.replace("Bearer", "").trim();
    console.log(token);
    // Check if the token exists
    if (!token) {
      console.error("Token not found in cookies. Please log in.");
      // Handle this error condition as needed (e.g., redirect to the login page)
      return;
    }

    const formattedDate = selectedDate.toISOString();

    try {
      const gearResponse = await fetch(`http://localhost:5000/gear/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          item: newGearItem.item,
          dateBought: formattedDate,
        }),
      });

      if (gearResponse.status === 201) {
        const newGearItemData = await gearResponse.json();
        setGearData([...gearData, newGearItemData]);
        setNewGearItem({ item: "", dateBought: "" });
        setSelectedDate(null);
        setIsFormVisible(false);
      } else {
        console.error("Failed to add gear item.");
      }
    } catch (error) {
      console.error("Error adding gear item:", error);
    }
  };

  const handleEdit = async (
    itemId: number,
    newItem: string,
    newDateBought: string
  ) => {
    // Get the stored token from cookies
    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    try {
      const response = await fetch(`http://localhost:5000/gear/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          item: newItem,
          dateBought: newDateBought,
        }),
      });

      if (response.status === 200) {
        // Update was successful
        const updatedGearData = gearData.map((item) => {
          if (item.id === itemId) {
            item.item = newItem;
            item.dateBought = newDateBought;
          }
          return item;
        });
        setGearData(updatedGearData);
      } else {
        console.error("Failed to update gear item.");
      }
    } catch (error) {
      console.error("Error updating gear item:", error);
    }
  };

  return (
    <div>
      <h2>
        <span>Gear</span>
        <button onClick={toggleForm} className="ml-2">
          <FaPlus />
        </button>
      </h2>
      {isFormVisible && (
        <GearForm
          item={newGearItem}
          selectedDate={selectedDate}
          handleInputChange={handleInputChange}
          handleDateChange={(date) => setSelectedDate(date)}
          handleSubmit={handleSubmit}
          buttonText="Add"
        />
      )}
      <GearList
        gearData={gearData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default GearHandles;
