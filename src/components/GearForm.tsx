// GearForm.tsx
import React, { ChangeEvent, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface GearFormProps {
  item: { item: string; dateBought: string }; // Define the props interface for item and dateBought
  selectedDate: Date | null; // Define the prop for the selected date
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // Define the function prop for input change
  handleDateChange: (date: Date | null) => void; // Define the function prop for date change
  handleSubmit: (e: FormEvent) => void; // Define the function prop for form submission
  buttonText: string; // Define the text for the submit button
}

function GearForm(props: GearFormProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Item:
        <input
          type="text"
          name="item"
          value={props.item.item}
          onChange={props.handleInputChange} // Bind the input change handler
          required
        />
      </label>
      <label>
        Date Bought:
        <DatePicker
          selected={props.selectedDate}
          onChange={props.handleDateChange} // Bind the date change handler
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </label>
      <button type="submit">{props.buttonText}</button>
    </form>
  );
}

export default GearForm;
