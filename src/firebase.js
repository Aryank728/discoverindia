import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAjxZwfRoSla6zUIarM3-5LUgx1Ck6gvD8",
    authDomain: "crud-auth-03.firebaseapp.com",
    projectId: "crud-auth-03",
    storageBucket: "crud-auth-03.appspot.com",
    messagingSenderId: "869561677984",
    appId: "1:869561677984:web:9b50b19dbf971f5347b1c5",
    databaseURL: "https://crud-auth-03-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const image = getStorage(app);