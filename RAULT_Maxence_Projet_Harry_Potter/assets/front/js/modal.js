
document.addEventListener("DOMContentLoaded", function() {
  const modalBtn = document.getElementById("modal-btn");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("close")[0];
  const confirmExchangeBtn = document.getElementById("confirm-exchange");
  const userCardsList = document.getElementById("user-cards-list");

  // Vérifie s'il y a un token d'authentification dans le local storage
  const authToken = localStorage.getItem("token");

  // Si un token d'authentification est présent, affiche le bouton modal
  if (authToken) {
      modalBtn.classList.remove("hidden");
  }

  // Ouvre le modal quand le bouton est cliqué
  modalBtn.addEventListener("click", function() {
      modal.style.display = "block";
      loadExchangeData();
  });

  
  closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
  });

  
  window.addEventListener("click", function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });

  
  confirmExchangeBtn.addEventListener("click", function() {
      alert("Échange confirmé !");
      modal.style.display = "none";
  });

  
});
