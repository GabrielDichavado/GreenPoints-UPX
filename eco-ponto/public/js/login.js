import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const emailInput = document.getElementById("emailLogin");
const senhaInput = document.getElementById("senhaLogin");
const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("loginError");

// Clique no botão
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  errorBox.innerText = "";

  if (!email || !senha) {
    errorBox.innerText = "Preencha todos os campos.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);

    window.location.href = "index.html";

  } catch (err) {
    console.log(err);

    if (err.code === "auth/invalid-email") {
      errorBox.innerText = "Email inválido.";
    } else if (err.code === "auth/wrong-password") {
      errorBox.innerText = "Senha incorreta.";
    } else if (err.code === "auth/user-not-found") {
      errorBox.innerText = "Usuário não encontrado.";
    } else {
      errorBox.innerText = "Erro ao entrar. Tente novamente.";
    }
  }
});
