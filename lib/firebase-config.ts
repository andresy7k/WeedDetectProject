import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPj6i_vZSMqeBAyXDgeYRcZKw0W5vvIio",
  authDomain: "etsafe.firebaseapp.com",
  projectId: "etsafe",
  storageBucket: "etsafe.firebasestorage.app",
  messagingSenderId: "63661921427",
  appId: "1:63661921427:web:08465738fcf0618f62a966",
  measurementId: "G-3QNVTC45GH",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Inicializar analytics solo en el cliente
if (typeof window !== "undefined") {
  // Importación dinámica para evitar errores en SSR
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app)
  })
}

