const burgerBtn = document.querySelector(".nav__burger");
const mobileNav = document.querySelector(".nav__mobile-nav");
const mobileLinks = mobileNav.querySelectorAll(".nav__mobile-menu .nav__link");
const hamburger = document.querySelector(".nav__hamburger");

const closeMenu = () => {
  mobileNav.classList.remove("show__mobile-nav");
  document.body.style.overflow = "";
  // FIX: Target burgerBtn and use only the class name
  burgerBtn.classList.remove("is-active");
};

burgerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mobileNav.classList.toggle("show__mobile-nav");
  // FIX: Target burgerBtn and use only the class name
  burgerBtn.classList.toggle("is-active");

  if (mobileNav.classList.contains("show__mobile-nav")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

if (mobileLinks) {
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

let currentWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth !== currentWidth) {
    currentWidth = window.innerWidth;
    closeMenu();
  }
});
