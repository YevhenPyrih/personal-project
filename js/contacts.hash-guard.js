// Prevent browser-native hash jumps while contacts sections are still loading via HTMX.
if (window.location.hash) {
  // Preserve incoming hash so contacts.js can align once partials are mounted.
  if (!sessionStorage.getItem('pendingContactsHash')) {
    sessionStorage.setItem('pendingContactsHash', window.location.hash);
  }

  history.replaceState(null, '', window.location.pathname + window.location.search);
}
