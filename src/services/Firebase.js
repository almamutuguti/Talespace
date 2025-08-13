// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnel_oDLQYAAw-QqWuCU_CDSWQL95EtzA",
  authDomain: "talespace-2a41f.firebaseapp.com",
  projectId: "talespace-2a41f",
  storageBucket: "talespace-2a41f.firebasestorage.app",
  messagingSenderId: "1060136330754",
  appId: "1:1060136330754:web:b66a5a042284199bfc291b",
  measurementId: "G-CWXESJ7ZB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)