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
});
