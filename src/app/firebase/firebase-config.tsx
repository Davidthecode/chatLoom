import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqOJGWySaCZwjWPuKmLv29lR8dcE-6HTc",
  authDomain: "chatloom-666fc.firebaseapp.com",
  projectId: "chatloom-666fc",
  storageBucket: "chatloom-666fc.appspot.com",
  messagingSenderId: "367704879343",
  appId: "1:367704879343:web:6d62a7d4223b3decc16b1a",
  measurementId: "G-GS9QHQE7QB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);