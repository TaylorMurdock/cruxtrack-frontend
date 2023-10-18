import React from "react";
import GearItem from "./GearItem"; // Import the GearItem component
import "../../index.css"; // Import the CSS file

// Define a function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month}-${day}-${year}`;
}

interface GearListProps {
  gearData: {
    id: number;
    item: string;
    dateBought: string;
  }[];
  onDelete: (itemId: number) => void;
  onEdit: (itemId: number, newItem: string, newDateBought: string) => void;
  isEditing: boolean;
  isEditingIconsVisible: boolean;
}

function GearList(props: GearListProps) {
  // Sort the gearData array order from oldest to newest
  const sortedGearData = [...props.gearData].sort((a, b) => {
    return new Date(a.dateBought).getTime() - new Date(b.dateBought).getTime();
  });

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end justify-center">
      <div className="mx-auto p-4 bg-white border-green-500 border-4 rounded-lg h-[300px] w-[500px] overflow-y-auto">
        <div className="flex my-8">
          <div style={{ flex: 1, fontWeight: "bold" }}>
            <p className="text-center">Item</p>
          </div>
          <div style={{ flex: 1, marginLeft: "250px", fontWeight: "bold" }}>
            <p className="text-center">Date Bought</p>
          </div>
        </div>
        <ul>
          {sortedGearData.map((gearItem) => (
            <GearItem
              key={gearItem.id}
              gearItem={{
                ...gearItem,
                dateBought: formatDate(gearItem.dateBought),
              }}
              showEditIcons={props.isEditingIconsVisible}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
            />
          ))}
        </ul>
        <div className="sticky bottom-0 left-0 right-0 text-center">
          <div
            className="arrow-down"
            style={{ animation: "bounce 1.5s infinite" }}
          >
            &#9660;
          </div>
        </div>
      </div>
    </div>
  );
}

export default GearList;
