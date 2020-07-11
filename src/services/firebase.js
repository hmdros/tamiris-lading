import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1Qk3v6wa5CZqBhAvdqhsHCnWqb9TYvf0",
  authDomain: "tamilanding.firebaseapp.com",
  databaseURL: "https://tamilanding.firebaseio.com",
  projectId: "tamilanding",
  storageBucket: "tamilanding.appspot.com",
  messagingSenderId: "729926988667",
  appId: "1:729926988667:web:3b9c48f6baa6dbc5b943de",
  measurementId: "G-4ZYK3ZT42R"
});

const db = firebaseApp.firestore();

export { db };
