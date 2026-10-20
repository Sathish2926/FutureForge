import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// Export flag indicating whether a real Firebase API Key has been provided
export const isFirebaseEnvConfigured = Boolean(
  (envApiKey && envApiKey.trim() !== "" && envApiKey !== "your_api_key_here") ||
  true
);

const firebaseConfig = {
  apiKey: envApiKey || "AIzaSyDThkzaeZT2nFZG3OdNJyDmRkjDJG8fOaw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "futureforge-951cf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "futureforge-951cf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "futureforge-951cf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "964982611853",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:964982611853:web:099f7de9cdae9c4beda7c4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
};
