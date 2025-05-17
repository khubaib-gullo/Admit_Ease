// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Replace with your own Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBs9u1LqfW0USY45rV9JyalBCIpDhY05TQ",
  authDomain: "admit-ease-e321a.firebaseapp.com",
  projectId: "admit-ease-e321a",
  storageBucket: "admit-ease-e321a.firebasestorage.app",
  messagingSenderId: "353072540627",
  appId: "1:353072540627:web:31f8df3350246d5fea5d26",
  measurementId: "G-81FZ7BYH4D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
