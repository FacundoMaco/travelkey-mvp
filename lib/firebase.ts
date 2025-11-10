import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Cachear el acceso a las variables de entorno para evitar accesos repetidos
const envVars = Constants.expoConfig?.extra || {};

// Firebase configuration from environment variables via Constants.expoConfig.extra
const firebaseConfig = {
  apiKey: envVars.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyAkSSUfPrpCYk1lt_i-5Vy7-CtmcKs3gKQ",
  authDomain: envVars.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "travelkey-app-cc402.firebaseapp.com",
  projectId: envVars.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "travelkey-app-cc402",
  storageBucket: envVars.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "travelkey-app-cc402.firebasestorage.app",
  messagingSenderId: envVars.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "230524118081",
  appId: envVars.EXPO_PUBLIC_FIREBASE_APP_ID || "1:230524118081:web:bff37008c785a4a437d2c0",
  measurementId: envVars.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-N2JWHXFYY1"
};

// Validar que las variables críticas estén configuradas (validación silenciosa)
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  // Configuración incompleta - usar valores por defecto
}

// Initialize Firebase for React Native (optimizado para no bloquear)
let app: ReturnType<typeof getApp> | null = null;
let auth: ReturnType<typeof initializeAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  
  // Inicializar auth de forma diferente según la plataforma
  try {
    if (Platform.OS === 'web') {
      // En web, usar getAuth directamente (no necesita persistencia personalizada)
      auth = getAuth(app);
    } else {
      // En móvil, usar initializeAuth con persistencia de AsyncStorage
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });
    }
  } catch (error: any) {
    // Si ya está inicializado, obtener la instancia existente
    if (error.code === 'auth/already-initialized') {
      auth = getAuth(app);
    } else {
      // En caso de error, usar getAuth como fallback
      console.warn('Error inicializando auth, usando getAuth:', error.message);
      auth = getAuth(app);
    }
  }
  
  db = getFirestore(app);
  
  // Analytics solo en web y de forma lazy
  if (Platform.OS === 'web') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      // Analytics puede fallar si no está configurado correctamente
      analytics = null;
    }
  }
} catch (error) {
  // En caso de error, usar valores por defecto para evitar bloqueos
  // No lanzar error para que la app pueda continuar
  console.warn('Error inicializando Firebase (usando valores por defecto):', error);
  // Intentar inicializar con valores por defecto
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (fallbackError) {
    console.error('Error crítico inicializando Firebase:', fallbackError);
  }
}

export { analytics, app, auth, db };

