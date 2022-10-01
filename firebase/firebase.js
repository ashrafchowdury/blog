import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Configure the Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7wig3yCdEWp8eapYdqywPFtAjQWvE2yQ",
  authDomain: "blog-70c2a.firebaseapp.com",
  projectId: "blog-70c2a",
  storageBucket: "blog-70c2a.appspot.com",
  messagingSenderId: "302776058813",
  appId: "1:302776058813:web:27b42a9894d41180b408d4",
  measurementId: "G-VFNWEQBEVP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Configure the firebase authentication
export const auth = getAuth(app);
//Configure the firebase firestore
export const db = getFirestore(app);

// apiKey: `${process.env.FIREBAS_API_KEY}`,
// authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
// projectId: `${process.env.FIREBASE_PROJECT_ID}`,
// storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
// messagingSenderId: `${process.env.FIREBASE_MSG_SENDER_ID}`,
// appId: `${process.env.FIREBASE_APP_ID}`,
// measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
