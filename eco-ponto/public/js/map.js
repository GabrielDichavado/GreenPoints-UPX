// /js/map.js
// Mapa com marcadores fixos de EcoPontos (fáceis de editar).
// Dependência: Leaflet (já incluído em map.html).

// Lista de EcoPontos (substitua por coordenadas reais da sua cidade)
const ecoPontos = [
  { id: "ecocentro", nome: "EcoPonto Central", lat: -23.5489, lng: -46.6388, endereco: "Praça Central, 100" },
  { id: "ecoNorte", nome: "EcoPonto Norte", lat: -23.5123, lng: -46.6245, endereco: "Av. Norte, 45" },
  { id: "ecoSul", nome: "EcoPonto Sul", lat: -23.5920, lng: -46.6576, endereco: "Rua Sul, 220" },
  { id: "ecoLeste", nome: "EcoPonto Leste", lat: -23.5420, lng: -46.5900, endereco: "Av. Leste, 78" },
];

// inicializa o mapa
const initialCenter = ecoPontos.length ? [ecoPontos[0].lat, ecoPontos[0].lng] : [-23.5505, -46.6333];
const map = L.map("map").setView(initialCenter, 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// marcador personalizado simples (usa o padrão do Leaflet)
ecoPontos.forEach(p => {
  const marker = L.marker([p.lat, p.lng]).addTo(map);
  const popupHtml = `
    <div style="min-width:180px">
      <strong>${p.nome}</strong><br/>
      ${p.endereco ? `<small>${p.endereco}</small><br/>` : ''}
      <div style="margin-top:8px;">
        <button class="btn btn-small btn-green" data-ecoid="${p.id}" onclick="window.location.href='profile.html'">Registrar entrega</button>
      </div>
    </div>
  `;
  marker.bindPopup(popupHtml);
});
