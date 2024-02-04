// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config();
const { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } = process.env;
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//   appId: FIREBASE_APP_ID
// };
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