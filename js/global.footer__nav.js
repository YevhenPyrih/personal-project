const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') return '/index.html';
  return pathname.endsWith('/') ? `${pathname}index.html` : pathname;
};

const getPendingKey = (path) => {
  if (path === '/index.html') return 'pendingIndexHash';
  if (path === '/contacts.html') return 'pendingContactsHash';
  return '';
};

const handleFooterAnchor = (e, link) => {
  const href = link.getAttribute('href');
  if (!href) return;

  const targetUrl = new URL(href, window.location.href);
  const currentPath = normalizePath(window.location.pathname);
  const targetPath = normalizePath(targetUrl.pathname);
  const pendingKey = getPendingKey(targetPath);

  if (pendingKey && targetUrl.hash) {
    sessionStorage.setItem(pendingKey, targetUrl.hash);
  }

  if (currentPath !== targetPath || !targetUrl.hash) return;

  const target = document.querySelector(targetUrl.hash);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

document.addEventListener('click', (e) => {
  if (!(e.target instanceof Element)) return;

  const link = e.target.closest('.footer__link, .footer__legal-link');
  if (!link) return;

  handleFooterAnchor(e, link);
});
