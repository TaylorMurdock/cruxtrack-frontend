import React from "react";
import GearItem from "./GearItem"; // Import the GearItem component

// Define a function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month and ensure it's two digits
  const day = date.getDate().toString().padStart(2, "0"); // Get the day and ensure it's two digits
  const year = date.getFullYear().toString(); // Get the year as a string
  return `${month}-${day}-${year}`; // Return the formatted date in MM-DD-YYYY format
}

interface GearListProps {
  gearData: {
    id: number;
    item: string;
    dateBought: string;
  }[];
  onDelete: (itemId: number) => void;
}

function GearList(props: GearListProps) {
  if (!Array.isArray(props.gearData)) {
    return <p>No gear data available.</p>;
  }

  return (
    <ul>
      {props.gearData.map((gearItem) => (
        <GearItem
          key={gearItem.id}
          gearItem={{
            ...gearItem,
            dateBought: formatDate(gearItem.dateBought), // Format the date using formatDate function
          }}
          showEditIcons={true}
          onDelete={props.onDelete}
          onEdit={(itemId, newItem, newDateBought) => {
            // Handle editing here, you can implement the logic to send the updated data to the server.
          }}
        />
      ))}
    </ul>
  );
}

export default GearList;
