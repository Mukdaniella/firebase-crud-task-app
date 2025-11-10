// src/app/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDn0cBxBSfVkC1MHVbjfCfo0LUq0EXFhHE",
  authDomain: "task-manager-app-ed850.firebaseapp.com",
  projectId: "task-manager-app-ed850",
  storageBucket: "task-manager-app-ed850.firebasestorage.app",
  messagingSenderId: "770259546147",
  appId: "1:770259546147:web:56acf2cd669dc7a6208196",
  measurementId: "G-3MFHMSREFP"
};

// Initialize Firebase app (avoid reinitializing)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Correct exports
export const auth = getAuth(app);
export const db = getFirestore(app);
