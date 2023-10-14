import React, { ChangeEvent, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EditGearFormProps {
  item: { item: string; dateBought: string };
  selectedDate: Date | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Date | null) => void;
  handleSubmit: (e: FormEvent) => void;
  buttonText: string;
}

function EditGearForm(props: EditGearFormProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Item:
        <input
          type="text"
          name="item"
          value={props.item.item}
          onChange={props.handleInputChange}
          required
        />
      </label>
      <label>
        Date Bought:
        <DatePicker
          selected={props.selectedDate}
          onChange={props.handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </label>
      <button type="submit">{props.buttonText}</button>
    </form>
  );
}

export default EditGearForm;