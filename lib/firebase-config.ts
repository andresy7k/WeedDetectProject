import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDPj6i_vZSMqeBAyXDgeYRcZKw0W5vvIio",
  authDomain: "etsafe.firebaseapp.com",
  projectId: "etsafe",
  storageBucket: "etsafe.firebasestorage.app",
  messagingSenderId: "63661921427",
  appId: "1:63661921427:web:08465738fcf0618f62a966",
  measurementId: "G-3QNVTC45GH",
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      try {
        getAnalytics(app)
      } catch {
        // analytics optional
      }
    })
    .catch(() => {})
}
