import React, { useState } from "react";

import EditGearForm from "./EditGearForm";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

interface GearItemProps {
  gearItem: {
    id: number;
    item: string;
    dateBought: string;
  };
  showEditIcons: boolean;
  onDelete: (itemId: number) => void;
  onEdit: (itemId: number, newItem: string, newDateBought: string) => void;
}

function GearItem(props: GearItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(props.gearItem.item);
  const [editedDateBought, setEditedDateBought] = useState(
    props.gearItem.dateBought
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    props.onEdit(props.gearItem.id, editedItem, editedDateBought);
    setIsEditing(false);
  };

  return (
    <li>
      <span>
        {props.gearItem.item} Date Bought: {props.gearItem.dateBought}
      </span>
      {props.showEditIcons && (
        <button onClick={handleEditClick}>
          {isEditing ? <BsFillTrashFill /> : <AiFillEdit />}
        </button>
      )}
      {isEditing ? (
        <EditGearForm
          item={{ item: editedItem, dateBought: editedDateBought }}
          selectedDate={new Date(editedDateBought)}
          handleInputChange={(e) => setEditedItem(e.target.value)}
          handleDateChange={(date) =>
            setEditedDateBought(date?.toDateString() || "")
          }
          handleSubmit={handleSaveEdit}
          buttonText="Save"
        />
      ) : null}
      {props.showEditIcons && !isEditing && (
        <button onClick={() => props.onDelete(props.gearItem.id)}>
          <BsFillTrashFill />
        </button>
      )}
    </li>
  );
}

export default GearItem;
