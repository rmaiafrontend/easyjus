// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASVQB_AI7gxwok4dZdoxoR4_rcp94sJww",
  authDomain: "easyjus-d2408.firebaseapp.com",
  projectId: "easyjus-d2408",
  storageBucket: "easyjus-d2408.appspot.com",
  messagingSenderId: "92608554128",
  appId: "1:92608554128:web:d6c138965dc7af9ac9e415",
  measurementId: "G-3ZPME87X1P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
