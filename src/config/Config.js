// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqk78UGvLD9gKyjgBGkRZfjdTcv1YnNdY",
  authDomain: "market-5b400.firebaseapp.com",
  projectId: "market-5b400",
  storageBucket: "market-5b400.appspot.com",
  messagingSenderId: "83302362121",
  appId: "1:83302362121:web:c1177a2f035d1efd34dcd8",
  measurementId: "G-FB68WGNSRS",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
