document.addEventListener("DOMContentLoaded", function () {

  const iconsButton = document.getElementById("icons");
  const navMenu = document.getElementById("nav");
  const navLinks = document.querySelectorAll("nav li");
  const houseFilterSelect = document.getElementById("houseFilter");
  const cardsContainer = document.getElementById("cards-container");
  const cardTemplate = document.getElementById("cards-template");
  const searchInput = document.getElementById("search-input");

  // Menu burger
  iconsButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Filtrage des cartes 
  searchInput.addEventListener("input", searchCards);

  // Filtrage des cartes à partir de la sélection de la maison
  houseFilterSelect.addEventListener("change", function (e) {
    const selectedHouse = e.target.value;
    fetchAndDisplayCards(selectedHouse);
  });

  // Recuperation et affichage des cartes en fonction de la maison grâce au filtre
  async function fetchAndDisplayCards(house = "") {
    const apiUrl = `https://hp-api.lainocs.fr/characters`;
    try {
      const response = await fetch(apiUrl);
      const characters = await response.json();
      const filteredCharacters = house ? characters.filter(character => character.house === house) : characters;
      displayCards(filteredCharacters);
    } catch (error) {
      console.error("Erreur lors de la récupération des personnages :", error);
    }
  }

  // Recherche des cartes
  function searchCards() {
    const query = searchInput.value.trim().toLowerCase();
    fetch(`https://hp-api.lainocs.fr/characters`)
      .then(response => response.json())
      .then(characters => {
        const results = characters.filter(character => character.name.toLowerCase().includes(query));
        displayCards(results);
      })
      .catch(error => {
        console.error("Erreur lors de la recherche des personnages :", error);
      });
  }

  // Affichage les cartes
  function displayCards(characters) {
    cardsContainer.innerHTML = ""; 
    if (characters.length === 0) {
      cardsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
      return;
    }

    characters.forEach(character => {
      const card = cardTemplate.cloneNode(true);
      card.style.display = "block";
      card.id = ""; // Supprime l'ID pour éviter les duplications
      // Mise à jour des éléments de la carte
      card.querySelector(".cards-title").textContent = character.name;
      card.querySelector(".cards-img").src = character.image;
      card.querySelector(".cards-img").alt = character.name;
      card.querySelector(".cards-description").textContent = `Maison: ${character.house}`;
      card.querySelector(".cards-details-link").href = `detail.html?id=${character.id}`;
      cardsContainer.appendChild(card);
    });
  }

  
  fetchAndDisplayCards();
});
