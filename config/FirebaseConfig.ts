import {
	initializeAuth,
	getReactNativePersistence,
	getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
	apiKey: "AIzaSyBZcQ_niM284xVtAkFEyN4DZ307jcEQnaE",
	authDomain: "test-8c316.firebaseapp.com",
	projectId: "test-8c316",
	storageBucket: "test-8c316.appspot.com",
	messagingSenderId: "926686997786",
	appId: "1:926686997786:web:c14c3af1246c967695d0a3",
	measurementId: "G-GK4YRW1G80",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase