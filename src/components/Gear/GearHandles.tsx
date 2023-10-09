import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import GearForm from "./GearForm";
import GearList from "./GearList";
import { FaPlus } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

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
    fetch("http://localhost:5000/gear/")
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      console.error("Please select a date.");
      return;
    }

    const formattedDate = selectedDate.toISOString();

    try {
      const gearResponse = await fetch(`http://localhost:5000/gear/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/gear/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setGearData(gearData.filter((gearItem) => gearItem.id !== id));
      } else {
        console.error(
          "Failed to delete gear item. Server returned status: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error deleting gear item:", error);
    }
  };

  // Define a handleEdit function to handle editing gear items
  const handleEdit = (id: number) => {
    // Implement your logic for editing gear items here
    // You can set the state to enter edit mode or open a modal for editing
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
        showEditIcons={false} // Assuming this should be false for GearHandles
        handleDelete={handleDelete}
        handleEdit={handleEdit} // Pass the handleEdit function
      />
    </div>
  );
}

export default GearHandles;
