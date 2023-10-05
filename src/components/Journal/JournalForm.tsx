import React, { useState, FormEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { JournalEntry } from "./JournalHandles";

// Define props for the JournalForm component
interface JournalFormProps {
  addEntry: (entry: JournalEntry) => void;
}

// Define the JournalForm component
function JournalForm({ addEntry }: JournalFormProps) {
  // State variables to store form data and submission status
  const [entryName, setEntryName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true); // Set the submission status to true

    try {
      // Send a POST request to the server with form data
      const response = await fetch("http://localhost:5000/journal/", {
        method: "POST", // HTTP POST method to create a new journal entry
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          entryName, // The entry name from state
          description, // The description from state
        }),
      });

      // Check if the server response is successful (status code 2xx)
      if (response.ok) {
        // Parse the response as JSON to get the new journal entry
        const newEntry = await response.json();
        // Call the addEntry function passed from the parent component to update the list of entries
        addEntry(newEntry);
        // Clear the form fields by resetting the state variables
        setEntryName("");
        setDescription("");
      } else {
        // Handle errors or display error messages here if needed
      }
    } catch (error) {
      // Handle any exceptions or errors that occur during the process
      console.error("Error adding journal entry:", error);
    } finally {
      // Set the submission status back to false, whether it succeeded or failed
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="entryName"
          placeholder="Entry Name"
          value={entryName}
          onChange={(e) => setEntryName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Entry"}
        </button>
      </form>
    </div>
  );
}

export default JournalForm;
