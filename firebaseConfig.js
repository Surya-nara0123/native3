import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDIgr1RBw9rKeLufDdhhIQEQjnc0G2LABg",
  authDomain: "app3-fd7b7.firebaseapp.com",
  projectId: "app3-fd7b7",
  storageBucket: "app3-fd7b7.appspot.com",
  messagingSenderId: "1055123904880",
  appId: "1:1055123904880:web:e8775ab0a6d21cdf3117b5",
  measurementId: "G-EB5NLH2Z5P",
  databaseURL: "https://app3-fd7b7-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let FIREBASE_APP;
let FIREBASE_AUTH;
let FIREBASE_DATABASE;

if (!getApps().length) {
  FIREBASE_APP = initializeApp(firebaseConfig);
} else {
  FIREBASE_APP = getApp();
}

let auth;
try {
  auth = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(FIREBASE_APP);
  } else {
    throw error;
  }
}

FIREBASE_AUTH = auth;
FIREBASE_DATABASE = getDatabase(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE };
