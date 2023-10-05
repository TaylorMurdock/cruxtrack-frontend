import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface GearItemProps {
  gearItem: { id: number; item: string; dateBought: string };
  handleDelete: () => void;
  handleEdit: () => void;
  showEditIcons: boolean;
}

function GearItem(props: GearItemProps) {
  return (
    <li>
      <span>
        Item: {props.gearItem.item} - Date Bought: {props.gearItem.dateBought}
      </span>
      {props.showEditIcons && (
        <>
          <button onClick={props.handleDelete}>
            <FaTrash />
          </button>
          <button onClick={props.handleEdit}>
            <FaEdit />
          </button>
        </>
      )}
    </li>
  );
}

export default GearItem;
