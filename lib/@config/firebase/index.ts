import clientCredentials from '@config/firebase/client.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(clientCredentials) : firebase.app()

// Initialize Cloud Firestore through Firebase
export const firestore: firebase.firestore.Firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export * from './types'
