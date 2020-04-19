import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
    throw result.error
}

console.log(result.parsed)


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
