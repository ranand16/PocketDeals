import firebase from 'firebase'
import '@firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDqetdyZP3OSZNhRT0fxdXnB6MO8Cy2ZI4",
  authDomain: "cloud-checkup.firebaseapp.com",
  databaseURL: "https://cloud-checkup.firebaseio.com",
  projectId: "cloud-checkup",
  storageBucket: "cloud-checkup.appspot.com",
  messagingSenderId: "616498626633",
  appId: "1:616498626633:web:3aa565d865b57c09767f98",
  measurementId: "G-D1CB2MECFM"
})

const rsf = new ReduxSagaFirebase(firebaseApp)

export default rsf
