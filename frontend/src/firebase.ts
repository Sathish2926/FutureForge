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

// Export flag indicating whether a real Firebase API Key has been provided in .env
export const isFirebaseEnvConfigured = Boolean(
  envApiKey &&
  envApiKey.trim() !== "" &&
  envApiKey !== "your_api_key_here" &&
  !envApiKey.includes("DemoKey")
);

const firebaseConfig = {
  apiKey: envApiKey || "AIzaSyDemoKeyForCareerPathAI12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "careerpath-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "careerpath-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "careerpath-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
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
