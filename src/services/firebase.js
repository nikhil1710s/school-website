import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAAmgWAIt7yqxszIpl5LjeXMTNENZmyvY",
  authDomain: "school-website-37328.firebaseapp.com",
  projectId: "school-website-37328",
  storageBucket: "school-website-37328.firebasestorage.app",
  messagingSenderId: "894622802758",
  appId: "1:894622802758:web:82d1405966e52fb7033b47"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;


