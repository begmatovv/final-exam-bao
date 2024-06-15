import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyC2xYn221NZY5dHsWMgAyLDX0xQTuxIY2I",
  authDomain: "mykitchen-bao.firebaseapp.com",
  projectId: "mykitchen-bao",
  storageBucket: "mykitchen-bao.appspot.com",
  messagingSenderId: "280676045240",
  appId: "1:280676045240:web:4551360db81e1f0869bf4d"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);