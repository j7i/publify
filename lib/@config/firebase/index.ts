import clientCredentials from '@config/firebase/client.js'
import firebase from 'firebase'

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(clientCredentials)
}

// Initialize Cloud Firestore through Firebase
export const firestore: firebase.firestore.Firestore = firebase.firestore()

if (!firestore.settings.length) {
  firestore.settings({ timestampsInSnapshots: true })
}
