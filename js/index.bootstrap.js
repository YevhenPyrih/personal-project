// Use event delegation to handle collapse buttons added dynamically by HTMX
document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-bs-toggle="collapse"]');
  if (!button) return;

  const targetSelector = button.getAttribute('data-bs-target');
  if (!targetSelector) return;

  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  // Get or create the Collapse instance
  let collapseInstance = bootstrap.Collapse.getInstance(targetElement);
  if (!collapseInstance) {
    collapseInstance = new bootstrap.Collapse(targetElement, { toggle: false });
  }

  // Toggle the collapse
  collapseInstance.toggle();
  event.preventDefault();
});
