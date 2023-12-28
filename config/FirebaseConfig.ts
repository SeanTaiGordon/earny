import {
	initializeAuth,
	getReactNativePersistence,
	getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";

// Initialize Firebase
export const firebaseConfig = {
	apiKey: "AIzaSyCQTfDxbO4OIvObDcAa_OwNOqT3uK04e2A",
	authDomain: "earny.io",
	projectId: "earnys",
	storageBucket: "earnys.appspot.com",
	messagingSenderId: "527670211353",
	appId: "1:527670211353:web:65005ba3210eaefd48cb88",
	measurementId: "G-MC1NMVGRYZ",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = !getApps().length
	? initializeAuth(app, {
			persistence: getReactNativePersistence(ReactNativeAsyncStorage),
	  })
	: getAuth(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
