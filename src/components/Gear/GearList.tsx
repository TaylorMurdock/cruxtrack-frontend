import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Define a function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month and ensure it's two digits
  const day = date.getDate().toString().padStart(2, "0"); // Get the day and ensure it's two digits
  const year = date.getFullYear().toString(); // Get the year as a string
  return `${month}-${day}-${year}`; // Return the formatted date in MM-DD-YYYY format
}

interface GearListProps {
  gearData: { id: number; item: string; dateBought: string }[];
  showEditIcons: boolean;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

function GearList(props: GearListProps) {
  return (
    <ul>
      {props.gearData.map((gearItem) => (
        <li key={gearItem.id}>
          <span>
            Item: {gearItem.item} - Date Bought:
            {formatDate(gearItem.dateBought)}
          </span>
          {props.showEditIcons && (
            <>
              <button onClick={() => props.handleDelete(gearItem.id)}>
                <FaTrash />
              </button>
              <button onClick={() => props.handleEdit(gearItem.id)}>
                <FaEdit />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
export default GearList;
