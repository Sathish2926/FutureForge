import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const env = import.meta.env as any;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDThkzaeZT2nFZG3OdNJyDmRkjDJG8fOaw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "futureforge-951cf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "futureforge-951cf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "futureforge-951cf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "964982611853",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:964982611853:web:099f7de9cdae9c4beda7c4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KCW1E32W00",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
