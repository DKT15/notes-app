import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"; //listens for changes in the database and allows the code to act accordingly locally.
import { notesCollection, db } from "./firebase";

// saving all notes in state, initalising and empty array.
// Then I create a state called currentNoteId. It is initalisng the ID of the first note or an empty string.
// The first part is checking that the notes at the index of 0 exists before trying to access the ID property of that note.
function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(""); // notes will never be initalised with a real array of note object. The previous check here is not necessary.

  // This is a helper variable that is helping to determine what the currentNote is and it is being done in both the sidebar component and the editor component to pass the currentNote down as props to each component.
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  React.useEffect(() => {
    //Websocket connection (onSnapshot). React needs a way to unsubscribe from this listener if it is ever unmounted. If not there will be a memory leak.
    // the callback function is going to recieve a snapshot of the data at the time the function was called. This is where I will get the most updated version of the notes in notesCollection in the database
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      // Sync up our local notes array with the snapshot data
      const notesArr = snapshot.docs.map((doc) => ({
        // docs is an array I got back from snapshot. They are mapped over and the data is used in a way that makes sense for the notesArr that is being saved in the app.
        // For every document, I want to return an object that has all of the data from the doc.
        // Firestore does not put the ID as part of the data of the document. It is accessed seprately.
        // The object has a body property from doc.data() and an ID property from doc.id.
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe; //cleans up the side effects before unmounting the component.
  }, []);

  // Anytime notes array changes (the dependencies array), I will check if there is no current note ID. Then the currentNoteId will be set to be equal to notes at the index of 0.
  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  // newNote no longer needs to be given an ID from the nanoid as Firebase automatically provides one. Default text in the body.
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    const newNoteRef = await addDoc(notesCollection, newNote); //addDoc returns a promise
    setCurrentNoteId(newNoteRef.id); // the reference is where I can acces the id property so I can set the current note ID.
  }

  //setDoc is provided with the document reference of the doument I am trying to change in Firestore. The second parameter is the change I want to make.
  // I have a single property in all of my documents, so no need to create a seperate new object. Instead an inline object is created and the body will be text.
  // What it does by default is it takes the object that is provided ({ body: text }) and completely overwrites the exisiting document in Firestore with the object.
  // Thrid parameter allows the object to be merged to the existing object in FiresTore and stops everything being overwritten.
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(docRef, { body: text }, { merge: true });
  }

  // This does not rearrange the notes
  // setNotes(oldNotes => oldNotes.map(oldNote => {
  //    return oldNote.id === currentNoteId
  //       ? { ...oldNote, body: text }
  //       : oldNote
  // }))

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId); //passing the instance of the firebase database, the second is the name of the collection I am trying to delete the doucment from, the third one is the id of the document I am trying to delete.
    await deleteDoc(docRef);
  }

  // If the notes array length is greater than 0 then the split component below is rendered otherwise the code below it is rendered.
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor currentNote={currentNote()} updateNote={updateNote} />
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
