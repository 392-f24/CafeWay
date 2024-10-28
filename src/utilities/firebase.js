import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBAShMN-jJQYXa71FbLy0dXPoAY3uB9QZM",
    authDomain: "cafeway-12c73.firebaseapp.com",
    projectId: "cafeway-12c73",
    storageBucket: "cafeway-12c73.appspot.com",
    messagingSenderId: "708766148172",
    appId: "1:708766148172:web:634a6007a0f867b5cdf6e9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, set, push };
