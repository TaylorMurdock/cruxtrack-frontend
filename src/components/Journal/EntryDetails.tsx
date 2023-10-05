import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define the JournalEntry interface
interface JournalEntry {
  id: number;
  entryName: string;
  description: string;
  date: string;
}

// Date format function
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month and ensure it's two digits
  const day = date.getDate().toString().padStart(2, "0"); // Get the day and ensure it's two digits
  const year = date.getFullYear().toString(); // Get the year as a string
  return `${month}-${day}-${year}`; // Return the formatted date in MM-DD-YYYY format
}

function EntryDetails() {
  // Get the "id" parameter from the URL using React Router's useParams hook
  const { id } = useParams<{ id: string }>();
  // Create state to store the journal entry
  const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);

  // Use useEffect to fetch the journal entry data when the component mounts
  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        // Make a GET request to fetch the journal entry by its ID
        const response = await fetch(`http://localhost:5000/journal/${id}`);
        if (response.ok) {
          // If the response is successful, parse the JSON data and set it in state
          const data = await response.json();
          setJournalEntry(data);
        } else {
          // Handle the case where the request fails
          console.error("Failed to fetch journal entry.");
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching journal entry:", error);
      }
    };

    // Call the fetchJournalEntry function when the "id" parameter changes
    fetchJournalEntry();
  }, [id]);

  return (
    <div>
      {/* Render the journal entry details if it exists */}
      {journalEntry && (
        <div>
          <h2>
            {/* Display the entry name and formatted date */}
            {journalEntry.entryName} {formatDate(journalEntry.date)}
          </h2>
          <p>{journalEntry.description}</p>
        </div>
      )}
    </div>
  );
}

export default EntryDetails;
