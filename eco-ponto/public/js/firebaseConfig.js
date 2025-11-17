import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "Censurado",
    authDomain: "green-points-upx.firebaseapp.com",
    projectId: "green-points-upx",
    storageBucket: "green-points-upx.firebasestorage.app",
    messagingSenderId: "1029100815200",
    appId: "1:1029100815200:web:d5713b4b41141de12e1405"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
