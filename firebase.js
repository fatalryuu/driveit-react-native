import { initializeApp, app } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARdUUDP45_4FzPSuY0W7p5epiRP9ju9Z8",
  authDomain: "bsuir-mobiles-development.firebaseapp.com",
  projectId: "bsuir-mobiles-development",
  storageBucket: "bsuir-mobiles-development.appspot.com",
  messagingSenderId: "407513828007",
  appId: "1:407513828007:web:76f951a21f810a82f5e982",
  measurementId: "G-G3W6DVY3PG",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { FIREBASE_AUTH };
