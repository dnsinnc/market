import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
// @ts-ignore
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   // @ts-ignore
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   // @ts-ignore
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   // @ts-ignore
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
   // @ts-ignore
   messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
   // @ts-ignore
   appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

