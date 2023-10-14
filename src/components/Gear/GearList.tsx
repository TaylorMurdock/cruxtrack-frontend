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
  onEdit: (itemId: number, newItem: string, newDateBought: string) => void;
  isEditing: boolean;
  isEditingIconsVisible: boolean; // Include isEditingIconsVisible in the props
}

function GearList(props: GearListProps) {
  return (
    <ul>
      {props.gearData.map((gearItem) => (
        <GearItem
          key={gearItem.id}
          gearItem={{
            ...gearItem,
            dateBought: formatDate(gearItem.dateBought),
          }}
          showEditIcons={props.isEditingIconsVisible} // Conditionally show the edit icons
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      ))}
    </ul>
  );
}

export default GearList;
