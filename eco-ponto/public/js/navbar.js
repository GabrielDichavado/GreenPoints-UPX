// /js/navbar.js
export function loadNavbar() {
  const navbar = `
    <nav class="navbar">
      <div class="nav-logo">🌱 EcoPontos</div>
      <ul class="nav-links">
        <li><a href="index.html">Início</a></li>
        <li><a href="info.html">Reciclagem</a></li>
        <li><a href="map.html">Mapa</a></li>
        <li><a href="profile.html" class="user-icon">👤 Perfil</a></li>
      </ul>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbar);
}
