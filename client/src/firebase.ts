// Import Firebase SDK
import {initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/auth'; 

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: "travel-69aa2.firebaseapp.com",
    projectId: "travel-69aa2",
    storageBucket: "travel-69aa2.appspot.com",
    messagingSenderId: "889702850641",
    appId: "1:889702850641:web:adf5ff7a82177a513b9870"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export default app
