import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


// ------ Mapa ------
const map = L.map("mapIndex").setView([-23.55052, -46.633308], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);


// Mesma lista da page "map.html"
const ecoPontos = [
  { nome: "EcoPonto Central", lat: -23.5512, lng: -46.6345 },
  { nome: "EcoPonto Zona Norte", lat: -23.5301, lng: -46.6201 },
  { nome: "EcoPonto Sul", lat: -23.5902, lng: -46.6408 }
];

ecoPontos.forEach(ponto => {
  L.marker([ponto.lat, ponto.lng])
    .addTo(map)
    .bindPopup(`<b>${ponto.nome}</b><br>Descarte seu reciclável aqui.`);
});


// Apenas para navbar mostrar usuário (sem bloquear acesso)
onAuthStateChanged(auth, (user) => {
  console.log("Usuário na home:", user?.email);
});
