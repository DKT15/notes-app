// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgyhLjfMq7VvcGHx43THF5UcYIm-bUMjg",
  authDomain: "notes-app-5ebe4.firebaseapp.com",
  projectId: "notes-app-5ebe4",
  storageBucket: "notes-app-5ebe4.appspot.com",
  messagingSenderId: "404906179788",
  appId: "1:404906179788:web:77ec516e3f4748e8aa1669",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// passing the app that is intialised.
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes"); // getting access to the notes collection by calling a function from firebase called collection. It is passed the db so it knows which database to collect it from, along with a string of the name of the collection I want.
