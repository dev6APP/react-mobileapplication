// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtjNwk7C2kv7L_PFkeirrRO2gJ-_izv6k",
  authDomain: "react-strawberry-auth.firebaseapp.com",
  projectId: "react-strawberry-auth",
  storageBucket: "react-strawberry-auth.appspot.com",
  messagingSenderId: "869384017999",
  appId: "1:869384017999:web:f43c9f063773fad56d323a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);