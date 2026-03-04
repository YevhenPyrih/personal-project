function init() {
    import('./global.header__nav.js');
    import('./global.footer__nav.js');
}

function getInitialTargetHash() {
    const pendingHash = sessionStorage.getItem('pendingContactsHash');
    if (pendingHash) {
        sessionStorage.removeItem('pendingContactsHash');
        return pendingHash;
    }

    return '';
}

const initialTargetHash = getInitialTargetHash();

function alignToTarget(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
    window.scrollTo({ top, behavior: 'auto' });
}

function scrollToHashTarget() {
    if (!initialTargetHash) return;

    alignToTarget(initialTargetHash);

    requestAnimationFrame(() => {
        setTimeout(() => alignToTarget(initialTargetHash), 180);
    });
}

const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) {
        init();
        scrollToHashTarget();
    }
});