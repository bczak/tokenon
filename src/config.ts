import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getFunctions} from "firebase/functions";
import {QueryClient} from "@tanstack/react-query";

const firebaseConfig = {
	apiKey: "AIzaSyCHb2efSWQFhPOt2KZTaFkJQhnvim9naes",
	authDomain: "tokenon.firebaseapp.com",
	projectId: "tokenon",
	storageBucket: "tokenon.appspot.com",
	messagingSenderId: "369770242036",
	appId: "1:369770242036:web:ffb4656007d6ef38d0e3a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const MASTER = 'EQCn150Zr41cva5ce0FhBZLAcZdCUJMFCVTuk7EIlCCK4p0W'
export const API_KEY = ''

export const db = getFirestore(app);
export const functions = getFunctions(app);

export const queryClient = new QueryClient();