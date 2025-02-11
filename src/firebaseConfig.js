// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyBzbL9KIt7HHw8dBVwwPGdJf8DZS18Q4hY",
    authDomain: "cdiisis.firebaseapp.com",
    projectId: "cdiisis",
    storageBucket: "cdiisis.firebasestorage.app",
    messagingSenderId: "177428481639",
    appId: "1:177428481639:web:ad8d71e37fe605debe76c2",
    measurementId: "G-JVGEJG3V41"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
