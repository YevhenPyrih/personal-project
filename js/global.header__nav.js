const burgerBtn = document.querySelector(".nav__burger");
const mobileNav = document.querySelector(".nav__mobile-nav");
const mobileLinks = mobileNav.querySelectorAll(".nav__mobile-menu .nav__link");
const navLinks = document.querySelectorAll(".nav__link");

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/index.html";
  return pathname.endsWith("/") ? `${pathname}index.html` : pathname;
};

const getPendingKey = (path) => {
  if (path === "/index.html") return "pendingIndexHash";
  if (path === "/contacts.html") return "pendingContactsHash";
  return "";
};

const handleSamePageAnchor = (e) => {
  const href = e.currentTarget.getAttribute("href");
  if (!href) return;

  const targetUrl = new URL(href, window.location.href);
  const currentPath = normalizePath(window.location.pathname);
  const targetPath = normalizePath(targetUrl.pathname);
  const pendingKey = getPendingKey(targetPath);

  if (pendingKey && targetUrl.hash) {
    sessionStorage.setItem(pendingKey, targetUrl.hash);
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
  burgerBtn.classList.remove("is-active");
};

burgerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mobileNav.classList.toggle("show__mobile-nav");
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
