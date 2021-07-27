const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const name = document.querySelector(".nav-main__name");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    name.classList.toggle("inactive");
}
