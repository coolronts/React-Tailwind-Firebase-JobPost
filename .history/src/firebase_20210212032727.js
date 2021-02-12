import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyArUrXUqJNmrv8pC7tPLon_OwTyg4cYrsY",
    authDomain: "jobs-51722.firebaseapp.com",
    projectId: "jobs-51722",
    storageBucket: "jobs-51722.appspot.com",
    messagingSenderId: "682695621578",
    appId: "1:682695621578:web:fd58937c78884b2ae52d33",
    measurementId: "G-GQPKQ55WBB"
});

const db = firebase.firestore();

export const auth = firebase.auth();
export default db;