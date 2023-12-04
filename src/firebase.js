import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBoWcMHTsDH9sJ-gXJWCO416nfnvnUxaqE",
    authDomain: "chat1-417fc.firebaseapp.com",
    databaseURL: "https://chat1-417fc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat1-417fc",
    storageBucket: "chat1-417fc.appspot.com",
    messagingSenderId: "69600024811",
    appId: "1:69600024811:web:2e9f695b9865df306f46ae",
    measurementId: "G-H1PYBE4L44"
  };


  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const storage = firebase.storage();
  export const db = firebase.firestore();
  export default firebase;