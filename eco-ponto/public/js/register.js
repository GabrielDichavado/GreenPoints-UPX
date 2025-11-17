// =====================================================
// Registro de Usuário (User ou Admin)
// =====================================================

import { auth, db } from "./firebaseConfig.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Pegando o formulário
const form = document.getElementById("registerForm");

// Listener do envio
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Pegando valores dos inputs
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  // Verificar role selecionada
  const roleRadio = document.querySelector("input[name='role']:checked");

  if (!roleRadio) {
    alert("Por favor, selecione o tipo de usuário (Admin ou Usuário).");
    return;
  }

  const role = roleRadio.value; // "admin" ou "user"

  try {
    // Criando usuário no Auth
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Criando documento no Firestore
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      role: role,
      points: 0,
      history: []
    });

    // Guardar role no navegador
    localStorage.setItem("userRole", role);

    alert("Cadastro realizado com sucesso!");

    // Redirecionar
    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error("Erro ao cadastrar: ", error);
    alert("Erro ao cadastrar. Verifique seus dados.");
  }
});
