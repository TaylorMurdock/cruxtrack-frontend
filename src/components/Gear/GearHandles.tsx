import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import GearForm from "./GearForm";
import EditGearForm from "./EditGearForm"; // Import the EditGearForm
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
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditingItems, setIsEditingItems] = useState(false);
  const [newGearItem, setNewGearItem] = useState({ item: "", dateBought: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [isEditingIconsVisible, setIsEditingIconsVisible] = useState(false);

  useEffect(() => {
    fetchGearData();
  }, []);

  const fetchGearData = () => {
    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    fetch("https://cruxtrack-backend.onrender.com/gear/", {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: GearItem[]) => setGearData(data))
      .catch((error) => console.error("Error fetching gear data:", error));
  };

  const toggleAddMode = () => {
    if (isEditingItems) {
      // If "Edit" mode is open, close it
      setIsEditingItems(false);
    }
    setIsAddMode(!isAddMode);
    setEditItemId(null);
    setNewGearItem({ item: "", dateBought: "" });
    setSelectedDate(null);
  };

  const toggleEditingItems = () => {
    setIsEditingItems(!isEditingItems);
    setIsEditingIconsVisible(!isEditingItems);

    if (isAddMode) {
      // If "Add" mode is open, close it
      setIsAddMode(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGearItem({ ...newGearItem, [name]: value });
  };

  const handleDelete = async (itemId: number) => {
    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    try {
      const response = await fetch(
        `https://cruxtrack-backend.onrender.com/gear/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

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

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      console.error("Please select a date.");
      return;
    }

    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    if (!token) {
      console.error("Token not found in cookies. Please log in.");
      return;
    }

    const formattedDate = selectedDate.toISOString();

    try {
      const gearResponse = await fetch(
        "https://cruxtrack-backend.onrender.com/gear/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            item: newGearItem.item,
            dateBought: formattedDate,
          }),
        }
      );

      if (gearResponse.status === 201) {
        const newGearItemData = await gearResponse.json();
        setGearData([...gearData, newGearItemData]);
        setNewGearItem({ item: "", dateBought: "" });
        setSelectedDate(null);
        setIsAddMode(false);
      } else {
        console.error("Failed to add gear item.");
      }
    } catch (error) {
      console.error("Error adding gear item:", error);
    }
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    if (editItemId === null) {
      return;
    }

    const newItem = newGearItem.item;
    const newDateBought = selectedDate?.toISOString() || "";

    const token = Cookies.get("token")?.replace("Bearer", "").trim();

    try {
      const response = await fetch(
        `https://cruxtrack-backend.onrender.com/gear/${editItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            item: newItem,
            dateBought: newDateBought,
          }),
        }
      );

      if (response.status === 200) {
        const updatedGearData = gearData.map((item) => {
          if (item.id === editItemId) {
            item.item = newItem;
            item.dateBought = newDateBought;
          }
          return item;
        });
        setGearData(updatedGearData);
        setEditItemId(null);
      } else {
        console.error("Failed to update gear item.");
      }
    } catch (error) {
      console.error("Error updating gear item:", error);
    }
  };

  return (
    <div className="gear-container">
      {isAddMode && (
        <GearForm
          item={newGearItem}
          selectedDate={selectedDate}
          handleInputChange={handleInputChange}
          handleDateChange={(date) => setSelectedDate(date)}
          handleSubmit={handleAdd}
          buttonText="Add"
        />
      )}
      {editItemId !== null && (
        <EditGearForm
          item={newGearItem}
          selectedDate={selectedDate}
          handleInputChange={handleInputChange}
          handleDateChange={(date) => setSelectedDate(date)}
          handleSubmit={handleEdit}
          buttonText="Save"
        />
      )}

      <h1 className="fixed bottom-96 right-100 z-50">
        <span style={{ fontWeight: "bold" }}>Gear</span>
        <button onClick={toggleAddMode} className="ml-2">
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
          onEdit={(itemId) => {
            setEditItemId(itemId);
            setIsAddMode(false); // Close the "Add" form when entering "Edit" mode
          }}
          isEditing={isEditingItems}
          isEditingIconsVisible={isEditingIconsVisible}
        />
      </div>
    </div>
  );
}

export default GearHandles;
