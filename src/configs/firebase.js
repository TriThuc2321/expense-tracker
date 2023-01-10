// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCSJ6t62gVFSK1lZyJnjRSaZ-hIV39IsfA',
    authDomain: 'expense-tracker-373908.firebaseapp.com',
    projectId: 'expense-tracker-373908',
    storageBucket: 'expense-tracker-373908.appspot.com',
    messagingSenderId: '515743923635',
    appId: '1:515743923635:web:3da3282d09beb51b041fc6',
    measurementId: 'G-0CSYY4PY0Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
