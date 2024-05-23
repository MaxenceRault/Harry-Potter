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

  let form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      // Décoder le token pour obtenir l'ID de l'utilisateur
      const decodedToken = jwt_decode(token);
      localStorage.setItem("userId", decodedToken.id); // Stocker l'ID de l'utilisateur

      window.location.href = "./profile.html";
    } catch (error) {
      console.error('Login error:', error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  });

  // Le reste de votre code, comme les validations de formulaire, peut être ici si nécessaire.
});

function jwt_decode(token) {
  // Fonction de décodage du token JWT (ou utilisez une bibliothèque comme jwt-decode)
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erreur lors du décodage du token JWT:", error);
    return null;
  }
}
