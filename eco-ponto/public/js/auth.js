// /js/auth.js
import { app, auth, db } from "./firebaseConfig.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// FORMULÁRIO DE CADASTRO
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;

  try {
    // Cria o usuário no Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Cria o documento do usuário no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nome: nome,
      email: email,
      pontos: 0
    });

    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
});

// FORMULÁRIO DE LOGIN
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  try {
    // Faz login no Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Pega os dados do Firestore
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));

    if (userDoc.exists()) {
      const dados = userDoc.data();
      alert(`Bem-vindo, ${dados.nome}! Você tem ${dados.pontos} pontos.`);
      window.location.href = "profile.html";
    }
  } catch (error) {
    alert("Erro ao fazer login: " + error.message);
  }
});
