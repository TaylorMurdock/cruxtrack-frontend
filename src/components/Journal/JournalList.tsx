import React from "react";
import { Link } from "react-router-dom";

// Define a function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month and ensure it's two digits
  const day = date.getDate().toString().padStart(2, "0"); // Get the day and ensure it's two digits
  const year = date.getFullYear().toString(); // Get the year as a string
  return `${month}-${day}-${year}`; // Return the formatted date in MM-DD-YYYY format
}

// Define the props interface for the JournalList component
interface JournalListProps {
  journalData: {
    id: number;
    entryName: string;
    description: string;
    date: string;
  }[];
}

// Define the JournalList component
function JournalList(props: JournalListProps) {
  return (
    <ul>
      {/* Map over the journal data and create a list item for each entry */}
      {props.journalData.map((journalEntry) => (
        <li key={journalEntry.id}>
          {/* Create a link to the journal entry detail page */}
          <Link to={`/journal/${journalEntry.id}`}>
            {/* Display the entry name and the formatted date */}
            {journalEntry.entryName} {formatDate(journalEntry.date)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default JournalList;
