import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyAFdShW11pxYFmSWkLmQcOLm2QJRHp4A7s",
  authDomain: "servy-a8ef2.firebaseapp.com",
  databaseURL: "https://servy-a8ef2.firebaseio.com",
  projectId: "servy-a8ef2",
  storageBucket: "servy-a8ef2.appspot.com",
  messagingSenderId: "912113167041",
  appId: "1:912113167041:web:2f7128d2bdd90e55888240",
  measurementId: "G-3PV882S41B",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();
firebase.functions();

export default firebase;
