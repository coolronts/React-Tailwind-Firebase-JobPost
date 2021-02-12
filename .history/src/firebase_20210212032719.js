import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AuthDomain,
    projectId: process.env.REACT_APP_FIREBASE_ProjectId,
    storageBucket: process.env.REACT_APP_FIREBASE_StorageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MessagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_AppId,
    measurementId: process.env.REACT_APP_FIREBASE_MeasurementId
});

const db = firebase.firestore();

export const auth = firebase.auth();
export default db;