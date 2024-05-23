document.addEventListener("DOMContentLoaded", async () => {
  const links = document.querySelectorAll("nav li");
  const nav = document.querySelector('nav');
  const icons = document.querySelector('.menu-icon');

  icons.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      const target = document.querySelector(button.dataset.tabTarget);
      button.classList.add("active");
      target.classList.add("active");
    });
  });

  const token = localStorage.getItem("token");
  if (!token) {
    redirectToLogin();
    return;
  }

  let userId;
  try {
    const decodedToken = jwt_decode(token);
    userId = decodedToken.id; 
  } catch (error) {
    console.error("Invalid token:", error);
    redirectToLogin();
    return;
  }

  try {
    const userProfile = await fetchUserProfile(token);
    document.getElementById("name").textContent = userProfile.name;
    document.getElementById("email").textContent = userProfile.email;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    redirectToLogin();
  }

  try {
    displayUserCards(userId, token);
  } catch (error) {
    console.error("Failed to display cards:", error);
  }

  const logoutButton = document.getElementById("deco");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    redirectToLogin();
  });
});

async function fetchUserProfile(token) {
  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}

function displayUserCards(userId, token) {
  fetch(`http://localhost:3000/users/${userId}/cards`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(cards => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ''; 

    cards.forEach(card => {
      const cardElement = createCardElement(card);
      cardsContainer.appendChild(cardElement);
    });
  })
  .catch(error => {
    console.error("Error fetching cards:", error);
  });
}

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = card.name || 'Nom non disponible';

  const cardImage = document.createElement("img");
  cardImage.src = card.image || 'default-image.jpg'; 
  cardImage.alt = card.alt || 'Image non disponible';

  const cardDescription = document.createElement("p");
  cardDescription.textContent = `Maison: ${card.house || 'Non attribuée'}`;

  cardElement.appendChild(cardTitle);
  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardDescription);

  return cardElement;
}

function redirectToLogin() {
  window.location.href = "./Connexion.html";
}
