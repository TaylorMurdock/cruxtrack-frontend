import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import GearForm from "./GearForm"; // Import the 'GearForm' component
import GearList from "./GearList"; // Import the 'GearList' component
import { FaEdit, FaPlus } from "react-icons/fa"; // Import the 'FaEdit' icon from the 'react-icons/fa' library
import "tailwindcss/tailwind.css";

// Define your GearItem interface here
interface GearItem {
  id: number;
  item: string;
  dateBought: string;
}

function Gear() {
  // Define and initialize various pieces of state using the 'useState' hook
  const [gearData, setGearData] = useState<GearItem[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newGearItem, setNewGearItem] = useState({ item: "", dateBought: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEditIcons, setShowEditIcons] = useState(false);
  const [editingGearItem, setEditingGearItem] = useState<GearItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Use the 'useEffect' hook to fetch gear data when the component mounts
  useEffect(() => {
    fetchGearData();
  }, []);

  // Define a function to fetch gear data from a server
  const fetchGearData = () => {
    fetch("http://localhost:5000/gear/")
      .then((response) => response.json())
      .then((data: GearItem[]) => setGearData(data))
      .catch((error) => console.error("Error fetching gear data:", error));
  };

  // Define a function to toggle the visibility of the gear form
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    // Reset the edit state when showing the form
    setEditingGearItem(null);
    setIsEditing(false);
    setNewGearItem({ item: "", dateBought: "" });
    setSelectedDate(null);
  };

  // Define a function to toggle the visibility of edit icons in the list
  const toggleEditIcons = () => {
    setShowEditIcons(!showEditIcons);
    // Reset the edit state when toggling the edit icons
    setEditingGearItem(null);
    setIsEditing(false);
    setNewGearItem({ item: "", dateBought: "" });
    setSelectedDate(null);
  };

  // Define a function to handle input changes in the gear form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGearItem({ ...newGearItem, [name]: value });
  };

  // Define a function to handle the deletion of a gear item
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

  // Define a function to handle form submission when adding a gear item
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

  // Define a function to handle editing a gear item
  const handleEdit = (id: number) => {
    const editedGearItem = gearData.find((gearItem) => gearItem.id === id);

    if (!editedGearItem) {
      console.error("Gear item not found for editing.");
      return;
    }

    // Set the newGearItem and selectedDate with the data to be edited
    setNewGearItem({
      item: editedGearItem.item,
      dateBought: editedGearItem.dateBought,
    });
    setSelectedDate(new Date(editedGearItem.dateBought));

    setEditingGearItem(editedGearItem);
    setIsEditing(true);
  };

  // Define a function to handle form submission when editing a gear item
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
    <div
      className="bg-gradient-to-r from-earth-1 to-earth-2 p-4"
      style={{ position: "absolute", left: "2in", bottom: "2in" }}
    >
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-900 to-green-600 p-4 rounded text-white flex justify-center items-center mx-auto max-w-md">
        <span className="mr-2">Gear</span>
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
