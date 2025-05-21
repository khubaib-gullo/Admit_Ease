import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  
} from "firebase/auth";

import { getStorage } from "firebase/storage";
import { initializeApp, getApps, getApp } from "firebase/app";

import type { User } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

// import { db } from "@/lib/firebase"; // Adjust the import path if needed
import { collection, addDoc } from "firebase/firestore";

// a8863096@gmail.com

const firebaseConfig = {
  apiKey: "AIzaSyBs9u1LqfW0USY45rV9JyalBCIpDhY05TQ",
  authDomain: "admit-ease-e321a.firebaseapp.com",
  projectId: "admit-ease-e321a",
  storageBucket: "admit-ease-e321a.firebasestorage.app",
  messagingSenderId: "353072540627",
  appId: "1:353072540627:web:31f8df3350246d5fea5d26",
  measurementId: "G-81FZ7BYH4D"
};

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);



const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);


/* ---------- helpers ---------- */

export const googleSignIn = async (role: string): Promise<User> => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;

  /* create / update Firestore doc */
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      // photoURL: user.photoURL,
      role,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return user;
};

export const emailSignUp = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<User> => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    // photoURL: null,
    createdAt: serverTimestamp(),
  });

  return user;
};

export const emailSignIn = (
  email: string,
  password: string
) => signInWithEmailAndPassword(auth, email, password);

export const fetchUserRole = async (uid: string): Promise<string | null> => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data().role as string) : null;
};




// export const saveToFirebase = async (collectionName: string, data: any) => {
//   try {
//     const collectionRef = collection(db, collectionName);
//     const docRef = await addDoc(collectionRef, data);
//     console.log("Document written with ID: ", docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding document to Firestore:", error);
//     throw error;
//   }
// };

export const saveToFirebase = async (collection: string, data: any, docId: string) => {
  const docRef = doc(db, collection, docId);
  await setDoc(docRef, data);
  return docId;
};