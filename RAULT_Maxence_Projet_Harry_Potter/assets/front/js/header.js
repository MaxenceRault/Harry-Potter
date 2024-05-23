document.addEventListener("DOMContentLoaded", function() {
    // Récupère le header
    const header = document.querySelector('.header');
  
    // Vérifie s'il y a un token d'authentification dans le local storage
    const authToken = localStorage.getItem("token");
  
    // Si un token d'authentification est présent, modifie le contenu du header
    if (authToken) {
      // Crée le contenu du header avec un lien supplémentaire pour le profil
      const headerContent = `
        <h1 class="logo">Harry Pottcard</h1>
        <div class="menu-icon" id="icons">&#9776;</div>
        
        <nav class="nav" id="nav">
          <ul class="nav-list">
            <li><a href="/index.html">Home</a></li>
            <li><a href="/assets/front/Page/Cartes.html">Cartes</a></li>
            <li><a href="/assets/front/Page/booster.html">Booster</a></li>
            <li><a href="/assets/front/Page/profile.html">Votre profil</a></li>
          </ul>
        </nav>
      `;
      // Remplace le contenu actuel du header par le nouveau contenu
      header.innerHTML = headerContent;
    }
  });
  