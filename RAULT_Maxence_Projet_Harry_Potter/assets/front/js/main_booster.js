document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav li");
  const nav = document.querySelector("nav");
  const icons = document.querySelector(".menu-icon");

  icons.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });

  const boosterButton = document.getElementById("booster-button");
  boosterButton.addEventListener("click", handleBoosterClick);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log("Token récupéré depuis localStorage:", token);
  console.log("User ID récupéré depuis localStorage:", userId);

  if (!token || !userId) {
    redirectToLogin();
    return;
  }

  function checkToken() {
    return token !== null;
  }

  function handleBoosterClick() {
    if (checkToken()) {
      const numCards = 5;
      const apiUrl = "https://hp-api.lainocs.fr/characters";

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const randomCards = getRandomCards(data, numCards);
          console.log("Cartes tirées :", randomCards);
          displayBooster(randomCards);
          sendCardsToServer(userId, randomCards); // Envoi des cartes vers le serveur
        })
        .catch(error => console.error("Erreur lors de la récupération des données :", error));
    } else {
      alert("Vous devez être connecté pour ouvrir le booster.");
      redirectToLogin();
    }
  }

  function getRandomCards(data, numCards) {
    const randomIndexes = [];
    const randomCards = [];
    while (randomIndexes.length < numCards) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
        const card = data[randomIndex];
        randomCards.push({
          name: card.name,
          house: card.house || 'Non attribuée', // Ajouter une valeur par défaut
          image: card.image || 'default-image.jpg', 
          alt: card.name || 'Image non disponible', 
        });
      }
    }
    return randomCards;
  }

  function displayBooster(cards) {
    const boosterContainer = document.getElementById("booster-container");
    boosterContainer.innerHTML = "";
    cards.forEach(card => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card");
      const cardTitle = document.createElement("h2");
      cardTitle.textContent = card.name;
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.alt;
      const cardDescription = document.createElement("p");
      cardDescription.textContent = `Maison: ${card.house}`;
      cardContainer.appendChild(cardTitle);
      cardContainer.appendChild(cardImage);
      cardContainer.appendChild(cardDescription);
      boosterContainer.appendChild(cardContainer);
    });
  }

  function sendCardsToServer(userId, cards) {
    fetch(`http://localhost:3000/users/${userId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ cards })
    })
    .then(response => response.json())
    .then(data => console.log("Cartes enregistrées avec succès :", data))
    .catch(error => console.error("Erreur lors de l'envoi des cartes :", error));
  }

  function redirectToLogin() {
    window.location.href = "../PAGE/Connexion.html";
  }
});
