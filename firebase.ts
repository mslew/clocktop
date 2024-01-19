// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBQSEl7tDDVw27XQR1WtP-ozg9_BsT-uc",
  authDomain: "clocktop.firebaseapp.com",
  projectId: "clocktop",
  storageBucket: "clocktop.appspot.com",
  messagingSenderId: "549442833070",
  appId: "1:549442833070:web:9d182ed044b8bc7e32bb3f",
  measurementId: "G-WNFXVR2L6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
