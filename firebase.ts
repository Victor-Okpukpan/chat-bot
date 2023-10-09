// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTJMOR2d6yb-EZSeCdm_EYqPkZIsve_-c",
  authDomain: "chatgpt-6430f.firebaseapp.com",
  projectId: "chatgpt-6430f",
  storageBucket: "chatgpt-6430f.appspot.com",
  messagingSenderId: "248569997325",
  appId: "1:248569997325:web:d71d7cd6f1c23bdff30d44"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db}