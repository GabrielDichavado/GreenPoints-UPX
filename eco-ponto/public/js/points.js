import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  orderBy,
  query,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Elementos
const userNameEl = document.getElementById("userName");
const userPointsEl = document.getElementById("userPoints");
const addPointsBtn = document.getElementById("addPointsBtn");
const historyBody = document.getElementById("historyBody");

let currentUser = null;

// Quando usuário estiver autenticado
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;

  const userRef = doc(db, "usuarios", user.uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();
    userNameEl.textContent = data.nome;
    userPointsEl.textContent = data.pontos;
  }

  carregarHistorico();
});

// Carregar histórico
async function carregarHistorico() {
  const historicoRef = collection(db, "usuarios", currentUser.uid, "historico");
  const q = query(historicoRef, orderBy("data", "desc"));
  const querySnapshot = await getDocs(q);

  historyBody.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const h = doc.data();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(h.data).toLocaleString()}</td>
      <td>${h.pontos}</td>
    `;
    historyBody.appendChild(tr);
  });
}

// Registrar reciclagem
addPointsBtn.addEventListener("click", async () => {
  if (!currentUser) return;

  const userRef = doc(db, "usuarios", currentUser.uid);
  const userDoc = await getDoc(userRef);
  const data = userDoc.data();

  const novosPontos = data.pontos + 10;

  // Atualiza pontos do usuário
  await updateDoc(userRef, { pontos: novosPontos });

  // Salva no histórico
  const historicoRef = collection(db, "usuarios", currentUser.uid, "historico");
  await addDoc(historicoRef, {
    data: Date.now(),
    pontos: 10
  });

  userPointsEl.textContent = novosPontos;
  carregarHistorico();

  alert("Reciclagem registrada! +10 pontos.");
});
