import React from "react";

// Taking the array of notes and mapping it into noteElements, which are then being displayed for the user. Refer to line 26.
function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`} // If note.id is equal to the currentNote id, when one of the notes is selected it highlights it using the selected-note styling which is the className.
        onClick={() => props.setCurrentNoteId(note.id)} // when clicking inside of a div, the current note ID is set which is helping the user change the class/note in the application and also changing the text is displayed in each note.
        // The h4 below returns the first line of the note. Accessing the the body of the first note in the array. It is the string to run the split method on. The divider used is the new line character \n.
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

export default Sidebar;
