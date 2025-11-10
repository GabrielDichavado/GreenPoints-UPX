import { auth, db } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// Elementos da página
const profileName = document.getElementById("profileName");
const profilePoints = document.getElementById("profilePoints");
const newNameInput = document.getElementById("newName");
const saveNameBtn = document.getElementById("saveNameBtn");
const historyBody = document.getElementById("historyBody");

let currentUser = null;


// Detectar usuário logado
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;

  const userRef = doc(db, "usuarios", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const data = snap.data();
    profileName.innerText = data.nome;
    profilePoints.innerText = data.pontos;
  }

  carregarHistorico();
});


// -------- SALVAR NOVO NOME --------
saveNameBtn.addEventListener("click", async () => {
  const novoNome = newNameInput.value.trim();

  if (novoNome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return;
  }

  const userRef = doc(db, "usuarios", currentUser.uid);

  // atualiza no Firestore
  await updateDoc(userRef, { nome: novoNome });

  // atualiza no Auth (mostra inicial no avatar)
  await updateProfile(currentUser, {
    displayName: novoNome
  });

  profileName.innerText = novoNome;
  newNameInput.value = "";

  alert("Nome atualizado com sucesso!");
});



// -------- HISTÓRICO --------
async function carregarHistorico() {
  const historicoRef = collection(db, "usuarios", currentUser.uid, "historico");
  const q = query(historicoRef, orderBy("data", "desc"));

  const snap = await getDocs(q);

  historyBody.innerHTML = "";

  snap.forEach(doc => {
    const h = doc.data();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(h.data).toLocaleString()}</td>
      <td>${h.pontos}</td>
    `;

    historyBody.appendChild(tr);
  });
}
