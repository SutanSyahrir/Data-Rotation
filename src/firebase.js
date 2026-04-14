import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'isi-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'isi-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'isi-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'isi-storage-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'isi-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'isi-app-id',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'isi-measurement-id',
};

const requiredFirebaseKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

const hasFirebaseEnv = requiredFirebaseKeys.every((value) => !String(value).startsWith('isi-'));

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
