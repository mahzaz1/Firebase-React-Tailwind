// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFTe-4rmARRmu2H3EPMIVDbyu8ezuC61A",
  authDomain: "color-palette-31a4a.firebaseapp.com",
  projectId: "color-palette-31a4a",
  storageBucket: "color-palette-31a4a.firebasestorage.app",
  messagingSenderId: "516770058957",
  appId: "1:516770058957:web:5f8d01eae4ae0ef402cf84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider()
export default getFirestore();