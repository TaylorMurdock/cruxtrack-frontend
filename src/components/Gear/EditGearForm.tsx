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
    <form
      onSubmit={props.handleSubmit}
      className="fixed bottom-98 right-96 z-50"
    >
      <label className="mb-4 text-white">
        Item:
        <input
          type="text"
          name="item"
          value={props.item.item}
          onChange={props.handleInputChange}
          required
          className="block w-full mt-2 p-2 border rounded text-black"
        />
      </label>
      <label className="mb-4 text-white">
        <DatePicker
          selected={props.selectedDate}
          onChange={props.handleDateChange}
          value={props.item.dateBought}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="block w-full mt-2 p-2 border rounded text-black"
        />
      </label>
      <button className="text-white p-2" type="submit">
        {props.buttonText}
      </button>
    </form>
  );
}

export default EditGearForm;
