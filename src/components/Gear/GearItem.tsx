import React, { useState } from "react";
import GearForm from "./GearForm"; // The create form

interface GearItemProps {
  gearItem: {
    id: number;
    item: string;
    dateBought: string;
  };
  showEditIcons: boolean;
  onDelete: (itemId: number) => void;
  onEdit: (itemId: number, newItem: string, newDateBought: string) => void; // Add the onEdit prop
}

function GearItem(props: GearItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(props.gearItem.item);
  const [editedDateBought, setEditedDateBought] = useState(
    props.gearItem.dateBought
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Call the onEdit prop to update the item
    props.onEdit(props.gearItem.id, editedItem, editedDateBought);
    setIsEditing(false);
  };

  return (
    <li>
      <span>
        Item: {props.gearItem.item} - Date Bought: {props.gearItem.dateBought}
      </span>
      {props.showEditIcons && !isEditing && (
        <button onClick={handleEditClick}>Edit</button>
      )}
      {
        isEditing ? (
          <GearForm
            item={{ item: editedItem, dateBought: editedDateBought }}
            selectedDate={new Date(editedDateBought)}
            handleInputChange={(e) => setEditedItem(e.target.value)}
            handleDateChange={(date) =>
              setEditedDateBought(date?.toDateString() || "")
            }
            handleSubmit={handleSaveEdit}
            buttonText="Save"
          />
        ) : null /* Conditionally render the edit form */
      }
      {props.showEditIcons && !isEditing && (
        <button onClick={() => props.onDelete(props.gearItem.id)}>
          Delete
        </button>
      )}
    </li>
  );
}

export default GearItem;
