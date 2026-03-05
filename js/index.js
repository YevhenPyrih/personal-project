function init() {
    import('./global.header__nav.js');
    import('./global.footer__nav.js');
    import('./index.about.js');
    import('./index.certificates.js');
    import('./index.contents.js');
    import('./index.testimonial.js');
}

function getInitialTargetHash() {
    const pendingHash = sessionStorage.getItem('pendingIndexHash');
    if (pendingHash) {
        sessionStorage.removeItem('pendingIndexHash');
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

function runAfterAllPartialsLoaded(callback) {
    const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;

    if (totalPartials === 0) {
        callback();
        return;
    }

    let loadedPartialsCount = 0;

    const handleAfterOnLoad = () => {
        loadedPartialsCount += 1;
        if (loadedPartialsCount !== totalPartials) return;

        document.body.removeEventListener('htmx:afterOnLoad', handleAfterOnLoad);
        callback();
    };

    document.body.addEventListener('htmx:afterOnLoad', handleAfterOnLoad);
}

runAfterAllPartialsLoaded(() => {
    init();
    scrollToHashTarget();
});