import { auth, db } from "./firebaseConfig.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";



const emailInput = document.getElementById("emailUser");
const pontosInput = document.getElementById("pontos");
const btn = document.getElementById("registerPointsBtn");
const adminMsg = document.getElementById("adminMsg");



// ------- PERMISSÃO: apenas emails autorizados ---------
const ADMINS = [
  "administrador@gmail.com",
  "ecoponto@gmail.com"
];

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (!ADMINS.includes(user.email)) {
    adminMsg.innerText = "Você não tem permissão para acessar esta página.";
    btn.style.display = "none";
    emailInput.disabled = true;
    pontosInput.disabled = true;
  }
});



// ------- FUNÇÃO PARA REGISTRAR OS PONTOS -------
btn.addEventListener("click", async () => {
  adminMsg.innerText = "";

  const email = emailInput.value.trim();
  const pontos = Number(pontosInput.value.trim());

  if (!email || !pontos) {
    adminMsg.innerText = "Preencha todos os campos.";
    return;
  }

  try {
    // Procurar usuário pelo email
    const q = query(collection(db, "usuarios"), where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.empty) {
      adminMsg.innerText = "Usuário não encontrado.";
      return;
    }

    const userDoc = snap.docs[0];
    const userRef = doc(db, "usuarios", userDoc.id);

    // Pegar pontos atuais
    const data = userDoc.data();
    const pontosNovos = (data.pontos || 0) + pontos;

    // Atualizar Firestore
    await updateDoc(userRef, {
      pontos: pontosNovos
    });

    // Registrar histórico
    await addDoc(collection(db, "usuarios", userDoc.id, "historico"), {
      pontos: pontos,
      data: Date.now()
    });

    adminMsg.style.color = "green";
    adminMsg.innerText = "Pontos registrados com sucesso!";
    emailInput.value = "";
    pontosInput.value = "";

  } catch (err) {
    console.log(err);
    adminMsg.innerText = "Erro ao registrar pontos.";
  }
});
