function Note({ note, toggleImportanceOf }) {
  const label = note.important ? "important" : "not important";

  return (
    <li>
      {note.content}{" "}
      <button onClick={() => toggleImportanceOf(note.id)}>{label}</button>
    </li>
  );
}

export default Note;