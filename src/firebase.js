import firebase from "firebase"

const config = {
  apiKey: "AIzaSyDZevMxOURbmgQf18aWktlJd5fMdUdUaYs",
  authDomain: "legarettedraftdodger.firebaseapp.com",
  databaseURL: "https://legarettedraftdodger.firebaseio.com",
  projectId: "legarettedraftdodger",
  storageBucket: "legarettedraftdodger.appspot.com",
  messagingSenderId: "319058977750"
}

export const fyrebase = firebase.initializeApp(config)
export const db = fyrebase.firestore()
