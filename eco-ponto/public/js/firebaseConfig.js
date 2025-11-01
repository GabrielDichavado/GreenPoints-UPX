// /js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configurações do seu projeto (substitua pelas suas)
const firebaseConfig = {
    apiKey: "AIzaSyDsNtape6gjCEObSgws75GeUIY7sgG0rYQ",
    authDomain: "greenpoints-upx.firebaseapp.com",
    projectId: "greenpoints-upx",
    storageBucket: "greenpoints-upx.firebasestorage.app",
    messagingSenderId: "561905856549",
    appId: "1:561905856549:web:d5af07f420c09823f6cfcc"
};

// Inicializa o Firebase e exporta para outros arquivos JS
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
