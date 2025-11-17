// ==================================================
// PROTEÇÃO DE ROTAS  (authGuard.js)
// ==================================================

export function protectPage(requiredRole = null) {
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("userRole");

  // Não está logado? → vai p/ login
  if (!uid || !role) {
    window.location.href = "login.html";
    return;
  }

  // Se a página exige um tipo específico (admin, user...)
  if (requiredRole && role !== requiredRole) {
    alert("Você não tem permissão para acessar esta página.");
    window.location.href = "index.html";
  }
}
