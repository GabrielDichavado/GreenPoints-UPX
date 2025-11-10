import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


// ------ BLOQUEAR ACESSO SEM LOGIN ------
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});


// ------ INICIALIZAÇÃO DO MAPA ------
const map = L.map("map").setView([-23.55052, -46.633308], 12);

// Tile (camada visual do mapa)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);


// -------- LISTA DE ECO PONTOS --------
// Aqui você pode adicionar quantos quiser
const ecoPontos = [
  {
    nome: "EcoPonto Central",
    lat: -23.5512,
    lng: -46.6345
  },
  {
    nome: "EcoPonto Zona Norte",
    lat: -23.5301,
    lng: -46.6201
  },
  {
    nome: "EcoPonto Sul",
    lat: -23.5902,
    lng: -46.6408
  }
];


// -------- ADICIONAR MARCADORES NO MAPA --------
ecoPontos.forEach(ponto => {
  L.marker([ponto.lat, ponto.lng])
    .addTo(map)
    .bindPopup(`<b>${ponto.nome}</b><br>Descarte seu reciclável aqui.`);
});
