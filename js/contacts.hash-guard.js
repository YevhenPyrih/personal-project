// Prevent browser-native hash jumps while contacts sections are still loading via HTMX.
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
