import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

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
  const { id } = useParams<{ id: string }>();
  const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State to track whether edit form should be displayed
  const [editedEntry, setEditedEntry] = useState<JournalEntry | null>(null); // State to store edited entry

  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const response = await fetch(`http://localhost:5000/journal/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJournalEntry(data);
        } else {
          console.error("Failed to fetch journal entry.");
        }
      } catch (error) {
        console.error("Error fetching journal entry:", error);
      }
    };

    fetchJournalEntry();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/journal/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        // Remove the entry from UI and reset journalEntry to null after successful deletion
        setJournalEntry(null);

        // Navigate to the "/" route after successful deletion
        window.location.href = "/";
      } else {
        console.error(
          "Failed to delete journal entry. Server returned status: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  const handleEditClick = () => {
    // Toggle the isEditing state
    setIsEditing((prevIsEditing) => !prevIsEditing);

    // Initialize the editedEntry with the current journalEntry data when opening the form
    if (!isEditing) {
      setEditedEntry(journalEntry);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/journal/${id}`, {
        method: "PUT", // Use the PUT method for editing
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEntry), // Send the edited data to the server
      });

      if (response.ok) {
        // Update the UI with the edited data
        setJournalEntry(editedEntry);

        // Hide the edit form
        setIsEditing(false);
      } else {
        console.error(
          "Failed to edit journal entry. Server returned status: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error editing journal entry:", error);
    }
  };

  return (
    <div>
      {journalEntry && (
        <div>
          <h2>
            {journalEntry.entryName} {formatDate(journalEntry.date)}
            <button onClick={handleDelete}>
              <FaTrash />
            </button>
            <button onClick={handleEditClick}>
              <FaEdit />
            </button>
          </h2>
          <p>{journalEntry.description}</p>
        </div>
      )}

      {isEditing && (
        <div>
          <h2>Edit Journal Entry</h2>
          <form>
            <div>
              <label htmlFor="entryName">Entry Name:</label>
              <input
                type="text"
                id="entryName"
                name="entryName"
                value={editedEntry?.entryName || ""}
                onChange={(e) =>
                  setEditedEntry({
                    ...(editedEntry as JournalEntry), // Type assertion
                    entryName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={editedEntry?.description || ""}
                onChange={(e) =>
                  setEditedEntry({
                    ...(editedEntry as JournalEntry), // Type assertion
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button type="button" onClick={handleEditSubmit}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EntryDetails;
