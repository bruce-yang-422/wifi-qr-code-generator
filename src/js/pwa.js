(() => {
    const button = document.getElementById('installApp');
    const standalone = window.matchMedia('(display-mode: standalone)');
    let pending;
    const installed = () => standalone.matches || navigator.standalone;
    const iosManualInstall = wifiDevice.os === 'ios' && window.isSecureContext && location.protocol !== 'file:';
    if (iosManualInstall && !installed()) button.hidden = false;
    document.getElementById('closeIosInstall').addEventListener('click', () => document.getElementById('iosInstallDialog').close());
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        if (standalone.matches || navigator.standalone) return;
        pending = event;
        button.hidden = false;
    });
    button.addEventListener('click', async () => {
        if (!pending) {
            if (iosManualInstall && !installed()) document.getElementById('iosInstallDialog').showModal();
            return;
        }
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
