import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const defaultFirebaseConfig = {
  apiKey: 'AIzaSyCU7oN4ZA16-ELC0TK7AgvP180IhSF1578',
  authDomain: 'rotation-31b76.firebaseapp.com',
  projectId: 'rotation-31b76',
  storageBucket: 'rotation-31b76.firebasestorage.app',
  messagingSenderId: '733520935795',
  appId: '1:733520935795:web:8d1bbc89fbf8b55ea0a306',
  measurementId: 'G-72F684Y4X4',
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultFirebaseConfig.measurementId,
};

const requiredFirebaseKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

const hasFirebaseEnv = requiredFirebaseKeys.every(Boolean);

let app = null;
let db = null;
let analytics = null;

if (hasFirebaseEnv) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  if (typeof window !== 'undefined') {
    isSupported()
      .then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      })
      .catch(() => {
        analytics = null;
      });
  }
}

export { analytics, app, db, hasFirebaseEnv };
