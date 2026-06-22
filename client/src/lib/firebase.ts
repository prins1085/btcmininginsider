import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const FIREBASE_VAPID_KEY =
  import.meta.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

let firebaseApp: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
  try {
    if (firebaseApp) {
      return firebaseApp;
    }

    firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    return firebaseApp;
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return null;
  }
};

export default getFirebaseApp;
