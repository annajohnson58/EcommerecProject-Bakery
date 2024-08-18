

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAeq6TDCSaCnP6Un4zQypEYnjmLl3gpnF0",
  authDomain: "bake-b6e75.firebaseapp.com",
  projectId: "bake-b6e75",
  storageBucket: "bake-b6e75.appspot.com",
  messagingSenderId: "388346642687",
  appId: "1:388346642687:web:1d27472a2d7f0e2d8c4cca",
  measurementId: "G-1819LRN9ZJ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };