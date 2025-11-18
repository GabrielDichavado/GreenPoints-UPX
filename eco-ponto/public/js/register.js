import { auth, db } from "./firebaseConfig.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// ELEMENTOS
const nomeInput = document.getElementById("nomeCadastro");
const emailInput = document.getElementById("emailCadastro");
const senhaInput = document.getElementById("senhaCadastro");
const registerBtn = document.getElementById("registerBtn");
const errorBox = document.getElementById("registerError");

registerBtn.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  const role = document.querySelector("input[name='role']:checked").value;

  errorBox.innerText = "";

  if (!nome || !email || !senha) {
    errorBox.innerText = "Preencha todos os campos.";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);

    await updateProfile(cred.user, {
      displayName: nome
    });

    // SALVAR TIPO DE USUÁRIO NO FIRESTORE
    await setDoc(doc(db, "usuarios", cred.user.uid), {
      nome: nome,
      email: email,
      pontos: 0,
      role: role,   // ← AQUI ESTÁ O OURO
      criadoEm: Date.now()
    });

    window.location.href = "index.html";

  } catch (err) {
    console.log(err);
    errorBox.innerText = "Erro ao cadastrar. Verifique os dados.";
  }
});
