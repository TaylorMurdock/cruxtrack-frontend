import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import GearForm from "./GearForm";
import GearList from "./GearList";
import { FaPlus } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import "../../index.css"; // Import the CSS file

interface GearItem {
  id: number;
  item: string;
  dateBought: string;
}

interface GearHandlesProps {
  gearData: GearItem[];
}

function GearHandles({ gearData: propGearData }: GearHandlesProps) {
  const [gearData, setGearData] = useState<GearItem[]>(propGearData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newGearItem, setNewGearItem] = useState({ item: "", dateBought: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEditingItems, setIsEditingItems] = useState(false);
  const [isEditingIconsVisible, setIsEditingIconsVisible] = useState(false); // Add new state variable

  useEffect(() => {
    fetchGearData();
  }, []);

  const fetchGearData = () => {
    // Get the stored token from cookies
    const token = Cookies.get("token")?.replace("Bearer", "").trim();
    console.log("Token:", token); // Log the token

    fetch("http://localhost:5000/gear/", {
      headers: {
        Authorization: `${token}`,
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
    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    try {
      const response = await fetch(`http://localhost:5000/gear/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 204) {
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

    const token = Cookies.get("token")?.replace("Bearer", "").trim();
    console.log(token);

    if (!token) {
      console.error("Token not found in cookies. Please log in.");
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

  const toggleEditingItems = () => {
    setIsEditingItems(!isEditingItems);
    setIsEditingIconsVisible(!isEditingItems); // Toggle isEditingIconsVisible as well
  };

  return (
    <div className="gear-container">
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

      <h1 className="fixed bottom-96 right-100 z-50">
        <span>Gear</span>
        <button onClick={toggleForm} className="ml-2">
          <FaPlus />
        </button>
        <button onClick={toggleEditingItems} className="ml-2">
          <AiFillEdit />
        </button>
      </h1>

      <div className="gear-list-container">
        <GearList
          gearData={gearData}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isEditing={isEditingItems}
          isEditingIconsVisible={isEditingIconsVisible}
        />
      </div>
    </div>
  );
}

export default GearHandles;
