import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => setNotes(response.data));
  }, []);

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
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Note note={note} />
          </li>
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default App;