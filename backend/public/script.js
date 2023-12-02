let menu = document.getElementsByClassName("menu")[0];
let navLinks = document.getElementsByClassName("nav-links")[0];

menu.addEventListener("click", () => {
  navLinks.classList.toggle("activeFlex");
})