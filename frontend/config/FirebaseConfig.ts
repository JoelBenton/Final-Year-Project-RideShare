import { initializeApp  } from "@firebase/app";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDpuUFnj78rAIfMFelvP8_Z8JvyS9xZOQ0",
    authDomain: "fyp-rideshare-a656e.firebaseapp.com",
    projectId: "fyp-rideshare-a656e",
    storageBucket: "fyp-rideshare-a656e.appspot.com",
    messagingSenderId: "596159472278",
    appId: "1:596159472278:web:98993b0610ac8ac9b158b7",
    measurementId: "G-P08H7QLJEG"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
  });