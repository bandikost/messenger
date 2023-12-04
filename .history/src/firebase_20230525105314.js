import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBoWcMHTsDH9sJ-gXJWCO416nfnvnUxaqE",
    authDomain: "chat1-417fc.firebaseapp.com",
    projectId: "chat1-417fc",
    storageBucket: "chat1-417fc.appspot.com",
    messagingSenderId: "69600024811",
    appId: "1:69600024811:web:2e9f695b9865df306f46ae",
    measurementId: "G-H1PYBE4L44"
};




export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();