import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1e4dQzgv6nWyOeJOrQfNjBUAqnofpGPw",
  authDomain: "blog-dd599.firebaseapp.com",
  projectId: "blog-dd599",
  storageBucket: "blog-dd599.appspot.com",
  messagingSenderId: "863153973755",
  appId: "1:863153973755:web:74b592cd348d11a419435e",
  measurementId: "G-G5Q2H3QYRT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
