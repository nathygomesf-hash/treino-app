import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMNIiOQByvOjYHnt7ywGA-Q6bP9g0XRuU",
  authDomain: "treino-app-eca7a.firebaseapp.com",
  projectId: "treino-app-eca7a",
  storageBucket: "treino-app-eca7a.firebasestorage.app",
  messagingSenderId: "65970971651",
  appId: "1:65970971651:web:03f125140089010df81a36",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);