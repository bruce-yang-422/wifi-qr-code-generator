(() => {
    const button = document.getElementById('installApp');
    const standalone = window.matchMedia('(display-mode: standalone)');
    let pending;
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        if (standalone.matches || navigator.standalone) return;
        pending = event;
        button.hidden = false;
    });
    button.addEventListener('click', async () => {
        if (!pending) return;
        const prompt = pending;
        pending = null;
        button.hidden = true;
        try {
            await prompt.prompt();
            await prompt.userChoice;
        } catch (error) {
            console.warn('Installation prompt unavailable:', error);
        }
    });
    window.addEventListener('appinstalled', () => {
        pending = null;
        button.hidden = true;
    });
    if ('serviceWorker' in navigator && window.isSecureContext && location.protocol !== 'file:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(error => {
                console.warn('Offline support unavailable:', error);
            });
        });
    }
})();
