import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import GearForm from "./GearForm";
import GearList from "./GearList";
import { FaEdit, FaPlus } from "react-icons/fa";

interface GearItem {
  id: number;
  item: string;
  dateBought: string;
}

function Gear() {
  const [gearData, setGearData] = useState<GearItem[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newGearItem, setNewGearItem] = useState({ item: "", dateBought: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEditIcons, setShowEditIcons] = useState(false);
  const [editingGearItem, setEditingGearItem] = useState<GearItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
    setEditingGearItem(null);
    setIsEditing(false);
    setNewGearItem({ item: "", dateBought: "" });
    setSelectedDate(null);
  };

  const toggleEditIcons = () => {
    setShowEditIcons(!showEditIcons);
    setEditingGearItem(null);
    setIsEditing(false);
    setNewGearItem({ item: "", dateBought: "" });
    setSelectedDate(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGearItem({ ...newGearItem, [name]: value });
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

  const handleEdit = (id: number) => {
    const editedGearItem = gearData.find((gearItem) => gearItem.id === id);

    if (!editedGearItem) {
      console.error("Gear item not found for editing.");
      return;
    }

    setNewGearItem({
      item: editedGearItem.item,
      dateBought: editedGearItem.dateBought,
    });
    setSelectedDate(new Date(editedGearItem.dateBought));

    setEditingGearItem(editedGearItem);
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedDate || !editingGearItem) {
      console.error("Please select a date and gear item to edit.");
      return;
    }

    const formattedDate = selectedDate.toISOString();

    try {
      const gearResponse = await fetch(
        `http://localhost:5000/gear/${editingGearItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: newGearItem.item,
            dateBought: formattedDate,
          }),
        }
      );

      if (gearResponse.status === 200) {
        const updatedGearItemData = await gearResponse.json();
        const updatedGearData = gearData.map((gearItem) =>
          gearItem.id === editingGearItem.id ? updatedGearItemData : gearItem
        );
        setGearData(updatedGearData);

        setIsEditing(false);
        setEditingGearItem(null);
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
        <button onClick={toggleEditIcons} className="ml-2">
          <FaEdit />
        </button>
      </h2>

      {isFormVisible && !isEditing && (
        <GearForm
          item={newGearItem}
          selectedDate={selectedDate}
          handleInputChange={handleInputChange}
          handleDateChange={(date) => setSelectedDate(date)}
          handleSubmit={handleSubmit}
          buttonText="Add"
        />
      )}

      {isEditing && editingGearItem && (
        <GearForm
          item={newGearItem}
          selectedDate={selectedDate}
          handleInputChange={handleInputChange}
          handleDateChange={(date) => setSelectedDate(date)}
          handleSubmit={handleEditSubmit}
          buttonText="Save"
        />
      )}

      <GearList
        gearData={gearData}
        showEditIcons={showEditIcons}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default Gear;
