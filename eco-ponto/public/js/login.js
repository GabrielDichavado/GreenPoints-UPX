// =====================================================
// LOGIN DE USUÁRIO (User e Admin)
// =====================================================

import { auth, db } from "./firebaseConfig.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Pegando formulário
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  try {
    // Login no Firebase Auth
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Pega informações do Firestore
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("Erro: Usuário sem registro no banco de dados.");
      return;
    }

    const data = userSnap.data();
    const role = data.role;

    // Salva no localStorage (navbar, bloqueios etc)
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("uid", uid);

    alert("Login realizado com sucesso!");

    // Redirecionamento baseado na role
    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    
    if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
      alert("E-mail ou senha incorretos.");
    } else {
      alert("Erro ao fazer login. Tente novamente.");
    }
  }
});
