// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8pk56rzDmHEt3m4O4ooSGTtJfn9Gvv3s",
  authDomain: "kyo-nani-suru.firebaseapp.com",
  projectId: "kyo-nani-suru",
  storageBucket: "kyo-nani-suru.firebasestorage.app",
  messagingSenderId: "977402062356",
  appId: "1:977402062356:web:720927866dcb057c63a901",
  measurementId: "G-WHTX61ST3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);