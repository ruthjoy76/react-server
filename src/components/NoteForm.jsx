import { useState } from "react";
import axios from "axios";

function NoteForm({ notes, setNotes }) {
  const [newNote, setNewNote] = useState("");

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: false,
      id: notes.length + 1,
    };

    axios
      .post("http://localhost:3001/notes", noteObject)
      .then((response) => {
        setNotes(notes.concat(response.data));
        setNewNote("");
      })
      .catch((error) => {
        console.log(error);
        setNewNote("");
      });
  };

  const handleNoteChange = (event) => setNewNote(event.target.value);

  return (
    <form onSubmit={addNote}>
      <input type="text" value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  );
}

export default NoteForm;