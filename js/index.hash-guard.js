// Prevent browser-native hash jumps during HTMX rendering.
// Section scrolling is handled manually in js/index.js via pendingIndexHash.
if (window.location.hash) {
  // Keep direct/open-in-new-tab hashes so index.js can scroll after partials load.
  if (!sessionStorage.getItem('pendingIndexHash')) {
    sessionStorage.setItem('pendingIndexHash', window.location.hash);
  }

  history.replaceState(null, '', window.location.pathname + window.location.search);
}
