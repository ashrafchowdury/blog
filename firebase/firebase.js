import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Configure the Firebase
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
//Configure the firebase authentication
export const auth = getAuth(app);
//Configure the firebase firestore
export const db = getFirestore(app);

// const firebaseConfig = {
//   apiKey: process.env.FIREBAS_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
