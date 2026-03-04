// Prevent browser-native hash jumps during HTMX rendering.
// Section scrolling is handled manually in js/index.js via pendingIndexHash.
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
