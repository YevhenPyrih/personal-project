function initScrollTopButton() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (!scrollTopBtn || scrollTopBtn.dataset.initialized === "true") return;

  const updateVisibility = () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.remove("hidden");
      return;
    }

    scrollTopBtn.classList.add("hidden");
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollTopBtn.dataset.initialized = "true";
  updateVisibility();
}

document.addEventListener("DOMContentLoaded", initScrollTopButton);
document.body.addEventListener("htmx:load", initScrollTopButton);
