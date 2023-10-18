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
    <li className="flex my-8">
      <div style={{ flex: 1 }}>
        <span className="text-left">{props.gearItem.item}</span>
      </div>
      <div style={{ flex: 1, marginLeft: "250px" }}>
        <span className="text-right">{props.gearItem.dateBought}</span>
      </div>

      {props.showEditIcons && (
        <div className="space-x-2">
          <button onClick={handleEditClick}>
            {isEditing ? <AiFillEdit /> : <AiFillEdit />}
          </button>
          <button onClick={() => props.onDelete(props.gearItem.id)}>
            <BsFillTrashFill />
          </button>
        </div>
      )}
    </li>
  );
}

export default GearItem;
