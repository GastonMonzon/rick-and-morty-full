// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBjX5C2R6XSPKhg__B5PJe1CPNE-RRdS4",
  authDomain: "rick-and-morty-api-spa.firebaseapp.com",
  projectId: "rick-and-morty-api-spa",
  storageBucket: "rick-and-morty-api-spa.appspot.com",
  messagingSenderId: "208786305357",
  appId: "1:208786305357:web:af81f05b6beab67313c704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Aunthentication and get a reference to the service
const auth = getAuth(app);

export default auth;