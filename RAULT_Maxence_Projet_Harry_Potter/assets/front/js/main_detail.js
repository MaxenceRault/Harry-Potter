document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav li");

  icons.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });

  let currentPage = 1;

  async function fetchCardDetails(id) {
    const url = `https://hp-api.lainocs.fr/characters?id=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayCardDetails(data[id - 1]);
  }

  function displayCardDetails(card) {
    const container = document.getElementById("card-container");
    const template = document.getElementById("card-template");

    // Supprime les cartes précédentes, sauf le template
    container.innerHTML = "";
    container.appendChild(template);
    const houseColors = {
      Gryffindor: "#f44336",
      Hufflepuff: "#ff9800",
      Ravenclaw: "#3f51b5",
      Slytherin: "#4caf50"
    };
    
    container.style.backgroundColor = houseColors[card.house];
    const hpCard = template.cloneNode(true);
    hpCard.style.display = "block"; // Rend la carte visible

    hpCard.id = ""; // Enlève l'id pour éviter les doublons

    hpCard.querySelector(".card-img").src = card.image;
    hpCard.querySelector(".card-title").textContent = card.name;
    hpCard.querySelector(".card-description").textContent = card.house;
    hpCard.querySelector(".eye").textContent += card.eyes;
    hpCard.querySelector(".hair").textContent += card.hairs;
    hpCard.querySelector(".birthday").textContent += card.birthday;
    hpCard.querySelector(".blood").textContent = card.blood;
    let h = card.house;
    let slug = card.slug;
    container.appendChild(hpCard);
    console.log(h);
    console.log(slug);
    fetch("http://192.168.1.50:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastHouseVisited: h,
      }),
    });
  }
  
  

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  fetchCardDetails(id);
});
