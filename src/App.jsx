import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

// saving all notes in state, initalising and empty array.
// Then I create a state called currentNoteId. It is initalisng the ID of the first note or an empty string.
// The first part is checking that the notes at the index of 0 exists before trying to access the ID property of that note.
function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  // newNote is given an ID from the nanoid and default text in the body.
  // ...prevNotes is brining in all the existing notes if there are any.
  // setNotes adds the newNote to the beginning of the list. It sets the setCurrentNoteId base on the newNote Id.
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  // This allows me to save in state any changes to the notes that have been created. I can type something in the editor and it will be saved locally in state at least for now.
  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  // This is a helper function that is helping to determine what the currentNote is and it is being done in both the sidebar component and the editor component to pass the currentNote down as props to each component.
  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  // If the notes array length is greater than 0 then the split component below is rendered otherwise the code below it is rendered.
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
