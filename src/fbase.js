import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBe-J6HGeNdVqpwcSFegQpWPgQtmlG_fFY",
  authDomain: "nwitter-asd.firebaseapp.com",
  projectId: "nwitter-asd",
  storageBucket: "nwitter-asd.appspot.com",
  messagingSenderId: "366817541578",
  appId: "1:366817541578:web:5295a3a47323df44146333",
  measurementId: "G-DRZ6SE662H"
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export default app;
export const dbService = getFirestore();