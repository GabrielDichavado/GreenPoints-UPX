import { auth, db } from "./firebaseConfig.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// ---------- ELEMENTOS ----------
const nomeInput = document.getElementById("nomeCadastro");
const emailInput = document.getElementById("emailCadastro");
const senhaInput = document.getElementById("senhaCadastro");
const registerBtn = document.getElementById("registerBtn");
const errorBox = document.getElementById("registerError");



// ---------- AÇÃO DO BOTÃO ----------
registerBtn.addEventListener("click", async () => {

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  errorBox.innerText = "";

  if (!nome || !email || !senha) {
    errorBox.innerText = "Preencha todos os campos.";
    return;
  }

  if (nome.length < 3) {
    errorBox.innerText = "Digite um nome válido.";
    return;
  }

  try {
    // Criar usuário no Auth
    const cred = await createUserWithEmailAndPassword(auth, email, senha);

    // Atualizar dados no Auth
    await updateProfile(cred.user, {
      displayName: nome
    });

    // Criar documento no Firestore
    await setDoc(doc(db, "usuarios", cred.user.uid), {
      nome: nome,
      email: email,
      pontos: 0
    });

    // Redirecionar
    window.location.href = "index.html";

  } catch (err) {
    console.log(err);

    if (err.code === "auth/email-already-in-use") {
      errorBox.innerText = "Este email já está cadastrado.";
    } else if (err.code === "auth/invalid-email") {
      errorBox.innerText = "Email inválido.";
    } else if (err.code === "auth/weak-password") {
      errorBox.innerText = "A senha deve ter pelo menos 6 caracteres.";
    } else {
      errorBox.innerText = "Erro ao cadastrar. Tente novamente.";
    }
  }
});
