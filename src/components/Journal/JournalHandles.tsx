import React, { useEffect, useState } from "react";
import JournalForm from "./JournalForm";
import JournalList from "./JournalList";
import { FaPlus } from "react-icons/fa";

// Define the JournalEntry type for the journal data
export type JournalEntry = {
  id: number;
  entryName: string;
  description: string;
  date: string;
};

// Define the JournalHandles component
function JournalHandles() {
  // State variables to store journal data and form visibility
  const [journalData, setJournalData] = useState<JournalEntry[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch journal data from the server when the component mounts
  useEffect(() => {
    fetchJournalData();
  }, []);

  // Function to fetch journal data from the server
  const fetchJournalData = () => {
    fetch("http://localhost:5000/journal/")
      .then((response) => response.json())
      .then((data: JournalEntry[]) => {
        // Update the state with the fetched journal data
        setJournalData(data);
      })
      .catch((error) => console.error("Error fetching journal data:", error));
  };

  // Function to toggle the visibility of the journal entry form
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Function to add a new journal entry to the list
  const addJournalEntry = (entry: JournalEntry) => {
    // Create a new array with the added entry and update the state
    setJournalData([...journalData, entry]);
  };

  return (
    <div>
      <h2>
        <span>Journal</span>
        {/* Button to toggle the form visibility */}
        <button onClick={toggleForm} className="ml-2">
          <FaPlus />
        </button>
      </h2>

      {/* Render the JournalForm component when form is visible */}
      {isFormVisible && <JournalForm addEntry={addJournalEntry} />}

      {/* Render the JournalList component with the journal data */}
      <JournalList journalData={journalData} />
    </div>
  );
}

export default JournalHandles;
