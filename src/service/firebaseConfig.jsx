// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe3v7IIitK6cG668jHBIxx96h_1L7LPUI",
  authDomain: "travel-planner-6252a.firebaseapp.com",
  projectId: "travel-planner-6252a",
  storageBucket: "travel-planner-6252a.appspot.com",
  messagingSenderId: "472429004629",
  appId: "1:472429004629:web:379be1df69670a78f811dc",
  measurementId: "G-XHKTZVMHT1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);