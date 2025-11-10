import { auth } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


// --------- INSERIR NAVBAR NA PÁGINA ---------
const navbarHTML = `
  <nav class="navbar">
    <div class="nav-left">
      <a href="index.html" class="nav-logo">GreenPoints</a>
    </div>

    <div class="nav-links" id="navLinks">
      <a href="index.html" class="nav-item">Início</a>
      <a href="map.html" class="nav-item">Mapa</a>
      <a href="info.html" class="nav-item">Informações</a>
      <a href="profile.html" class="nav-item logged-only">Perfil</a>

      <a href="login.html" class="nav-item logged-out-only">Entrar</a>
      <a href="register.html" class="nav-item logged-out-only">Cadastrar</a>

      <button class="logout-btn logged-only" id="logoutBtn">Sair</button>
    </div>

    <div class="nav-avatar" id="navAvatar"></div>

    <button class="nav-toggle" id="menuToggle">
      ☰
    </button>
  </nav>
`;

document.body.insertAdjacentHTML("afterbegin", navbarHTML);


// --------- REFERÊNCIAS ---------
const navLinks = document.getElementById("navLinks");
const navAvatar = document.getElementById("navAvatar");
const logoutBtn = document.getElementById("logoutBtn");
const menuToggle = document.getElementById("menuToggle");


// --------- MENU RESPONSIVO ---------
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});


// --------- DESTAQUE DA PÁGINA ATIVA ---------
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-item").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


// --------- ATUALIZAR NAVBAR PELO LOGIN ---------
onAuthStateChanged(auth, (user) => {

  if (user) {
    // Mostrar itens restritos
    document.querySelectorAll(".logged-only").forEach(e => e.style.display = "inline-block");
    document.querySelectorAll(".logged-out-only").forEach(e => e.style.display = "none");

    // Avatar com inicial
    const inicial = user.displayName
      ? user.displayName.charAt(0).toUpperCase()
      : "?";

    navAvatar.innerText = inicial;
    navAvatar.style.display = "flex";

  } else {
    // Usuário deslogado
    document.querySelectorAll(".logged-only").forEach(e => e.style.display = "none");
    document.querySelectorAll(".logged-out-only").forEach(e => e.style.display = "inline-block");

    navAvatar.style.display = "none";
  }
});


// --------- LOGOUT ---------
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}
