import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCfgmbz7xQ74W9qrv9g6UFZt_XMRhvVmnA",
  authDomain: "faceauth-d5ffb.firebaseapp.com",
  projectId: "faceauth-d5ffb",
  storageBucket: "faceauth-d5ffb.appspot.com",
  messagingSenderId: "767067534478",
  appId: "1:767067534478:web:8a6dd0d88bb0426d3a05df"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { firebase, db, auth, storage }