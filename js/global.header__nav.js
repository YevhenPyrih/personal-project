const burgerBtn = document.querySelector(".nav__burger");
const mobileNav = document.querySelector(".nav__mobile-nav");
const mobileLinks = mobileNav.querySelectorAll(".nav__mobile-menu .nav__link");
const navLinks = document.querySelectorAll(".nav__link");
const hamburger = document.querySelector(".nav__hamburger");

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/index.html";
  return pathname.endsWith("/") ? `${pathname}index.html` : pathname;
};

const handleSamePageAnchor = (e) => {
  const href = e.currentTarget.getAttribute("href");
  if (!href) return;

  const targetUrl = new URL(href, window.location.href);
  const currentPath = normalizePath(window.location.pathname);
  const targetPath = normalizePath(targetUrl.pathname);

  if (targetPath === "/index.html" && targetUrl.hash) {
    sessionStorage.setItem("pendingIndexHash", targetUrl.hash);
  }

  if (currentPath !== targetPath || !targetUrl.hash) return;

  const hashTarget = document.querySelector(targetUrl.hash);
  if (!hashTarget) return;

  e.preventDefault();
  hashTarget.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu();
};

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

if (navLinks) {
  navLinks.forEach((link) => {
    link.addEventListener("click", handleSamePageAnchor);
  });
}

let currentWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth !== currentWidth) {
    currentWidth = window.innerWidth;
    closeMenu();
  }
});
