import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkSSUfPrpCYk1lt_i-5Vy7-CtmcKs3gKQ",
  authDomain: "travelkey-app-cc402.firebaseapp.com",
  projectId: "travelkey-app-cc402",
  storageBucket: "travelkey-app-cc402.firebasestorage.app",
  messagingSenderId: "230524118081",
  appId: "1:230524118081:web:bff37008c785a4a437d2c0",
  measurementId: "G-N2JWHXFYY1"
};

// Initialize Firebase for React Native
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const analytics = Platform.OS === 'web' ? getAnalytics(app) : null;

export { analytics, app, auth, db };

