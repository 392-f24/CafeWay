// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useEffect, useState, useCallback } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAShMN-jJQYXa71FbLy0dXPoAY3uB9QZM",
    authDomain: "cafeway-12c73.firebaseapp.com",
    databaseURL: "https://cafeway-12c73-default-rtdb.firebaseio.com",
    projectId: "cafeway-12c73",
    storageBucket: "cafeway-12c73.firebasestorage.app",
    messagingSenderId: "708766148172",
    appId: "1:708766148172:web:634a6007a0f867b5cdf6e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };
  
export const firebaseSignOut = () => signOut(auth);

export const useAuthState = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
        return () => unsubscribe();
    }, []);

    return [user];
};

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const dbRef = ref(database, path);
        const unsubscribe = onValue(
        dbRef,
        (snapshot) => setData(snapshot.val()),
        (error) => setError(error)
        );
        return () => unsubscribe();
    }, [path]);

    return [data, error];
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();

    const updateData = useCallback(
        (value) => {
        update(ref(database, path), value)
            .then(() => setResult({ message: "Update successful", timestamp: Date.now() }))
            .catch((error) => setResult({ error, message: error.message }));
        },
        [path]
    );

    return [updateData, result];
};