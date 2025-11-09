// /js/navbar.js
// Navbar injetada automaticamente ao importar o módulo.

export function getNavbarHtml() {
  return `
    <nav class="navbar">
      <div class="nav-inner">
        <div class="nav-left">
          <a class="nav-logo" href="index.html">🌱 <span>EcoPontos</span></a>
        </div>
        <div class="nav-right">
          <a class="nav-link" href="index.html">Início</a>
          <a class="nav-link" href="info.html">Reciclagem</a>
          <a class="nav-link" href="map.html">Mapa</a>
          <a class="nav-link user-link" href="profile.html" title="Perfil">👤</a>
        </div>
      </div>
    </nav>
  `;
}

// injeta imediatamente quando o arquivo for carregado como módulo
(function injectNavbar() {
  try {
    // evita duplicar caso já exista
    if (!document.querySelector(".navbar")) {
      document.body.insertAdjacentHTML("afterbegin", getNavbarHtml());
    }
  } catch (err) {
    // se o DOM ainda não estiver pronto, aguarda carregar
    window.addEventListener("DOMContentLoaded", () => {
      if (!document.querySelector(".navbar")) {
        document.body.insertAdjacentHTML("afterbegin", getNavbarHtml());
      }
    });
  }
})();
