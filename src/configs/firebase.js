// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
getAnalytics(app);
