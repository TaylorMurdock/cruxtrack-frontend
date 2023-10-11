import React from "react";

interface GearItemProps {
  gearItem: { id: number; item: string; dateBought: string };
  showEditIcons: boolean;
}

function GearItem(props: GearItemProps) {
  return (
    <li>
      <span>
        Item: {props.gearItem.item} - Date Bought: {props.gearItem.dateBought}
      </span>
    </li>
  );
}

export default GearItem;
