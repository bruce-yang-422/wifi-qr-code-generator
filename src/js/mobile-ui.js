// Reuse the same fields and events; only rearrange secondary controls on phones.
(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const moves = [];
    const wrappers = [];
    let enabled = false;
    let initialized = false;
    let printWasOpen = false;
    let fullMode = false;
    try { fullMode = localStorage.getItem('wifi-mobile-mode') === 'full'; } catch (_) { /* Optional storage. */ }
    function updateNavigation() {
        document.getElementById('mobileModeText').textContent = t(fullMode ? '精簡版' : '完整版');
        document.getElementById('mobileToggleFull').setAttribute('aria-pressed', String(fullMode));
        document.getElementById('mobileToggleFull').setAttribute('aria-label', t(fullMode ? '切換至精簡版' : '切換至完整版'));
    }
    function details(label, className) {
        const element = document.createElement('details'); element.className = className;
        const summary = document.createElement('summary'); summary.textContent = t(label); summary.dataset.translation = label;
        element.append(summary); wrappers.push(element); return element;
    }
    function move(node, target) {
        if (!node) return;
        const marker = document.createComment('desktop position'); node.before(marker);
        moves.push({ node, marker }); target.append(node);
    }
    function apply() {
        updateNavigation();
        const simple = media.matches && !fullMode;
        if (simple === enabled) return;
        enabled = simple; document.body.classList.toggle('mobile-simple', enabled);
        if (enabled) {
            const scroll = document.querySelector('.control-scroll');
            const advanced = details('更多網路與管理選項', 'mobile-advanced-settings');
            const extra = [
                document.querySelector('.profile-library'),
                document.querySelector('.control-scroll > details.settings-disclosure'),
                document.querySelector('.internal-note-field'), document.getElementById('net5Group'),
                document.querySelector('.band-steering-group'),
                document.getElementById('ssidMloInput').closest('.input-group'),
                document.getElementById('ssidGuestInput').closest('.input-group'),
                document.getElementById('passwordModeToggle').closest('.input-group'),
                document.getElementById('quickPreview').parentElement
            ];
            extra.forEach(node => move(node, advanced)); scroll.append(advanced);
            const panel = document.querySelector('.print-settings-panel');
            const printOptions = details('紙張與列印選項', 'mobile-print-options');
            panel.querySelector('.panel-chrome').after(printOptions);
            move(panel.querySelector('.print-options'), printOptions);
            const vectorOption = document.createElement('div'); vectorOption.className = 'mobile-vector-option';
            const vectorLabel = document.createElement('label'); vectorLabel.htmlFor = 'mobileVectorToggle'; vectorLabel.dataset.translation = '顯示向量下載（SVG／EPS）'; vectorLabel.textContent = t(vectorLabel.dataset.translation);
            const vectorSwitch = document.createElement('label'); vectorSwitch.className = 'network-switch';
            const vectorInput = document.createElement('input'); vectorInput.type = 'checkbox'; vectorInput.id = 'mobileVectorToggle'; vectorInput.setAttribute('role', 'switch');
            const track = document.createElement('span'); track.className = 'switch-track';
            document.body.classList.remove('mobile-vectors');
            vectorInput.addEventListener('change', () => document.body.classList.toggle('mobile-vectors', vectorInput.checked));
            vectorSwitch.append(vectorInput, track); vectorOption.append(vectorLabel, vectorSwitch); printOptions.append(vectorOption);
            const preview = document.getElementById('printWorkspace');
            const previewDetails = details('查看列印預覽', 'mobile-preview-details');
            preview.before(previewDetails); move(preview, previewDetails);
            if (!initialized && !loadStateFromStorage() && !['ssid24','ssid5','ssidMlo','ssidGuest'].some(key => getState()[key])) {
                elements.enable5.checked = false;
                handleEnableChange();
            }
            initialized = true;
        } else {
            for (const { node, marker } of moves) { marker.replaceWith(node); }
            moves.length = 0;
            wrappers.forEach(wrapper => wrapper.remove()); wrappers.length = 0;
        }
        updatePreviewText();
    }
    media.addEventListener('change', apply); apply();
    window.addEventListener('languagechange', () => {
        wrappers.forEach(wrapper => wrapper.querySelectorAll('[data-translation]').forEach(element => { element.textContent = t(element.dataset.translation); }));
        updateNavigation();
    });
    window.addEventListener('beforeprint', () => {
        const preview = document.querySelector('.mobile-preview-details');
        if (preview) { printWasOpen = preview.open; preview.open = true; }
    });
    window.addEventListener('afterprint', () => {
        const preview = document.querySelector('.mobile-preview-details');
        if (preview) preview.open = printWasOpen;
    });
    // Keep management usable even while its optional mobile entry is collapsed.
    document.getElementById('manageProfiles').addEventListener('click', () => {
        const preview = document.querySelector('.mobile-preview-details'); if (preview) preview.hidden = true;
    });
    document.getElementById('closeProfiles').addEventListener('click', () => {
        const preview = document.querySelector('.mobile-preview-details'); if (preview) { preview.hidden = false; preview.open = true; }
    });
    window.addEventListener('settingsloaded', () => {
        const preview = document.querySelector('.mobile-preview-details'); if (preview) { preview.hidden = false; preview.open = true; }
    });
    const navigation = ['mobileGoInput', 'mobileGoDownloads', 'mobileGoPreview'];
    function activate(id) {
        navigation.forEach(key => {
            const button = document.getElementById(key); button.classList.toggle('is-active', key === id);
            if (key === id) button.setAttribute('aria-current', 'location'); else button.removeAttribute('aria-current');
        });
    }
    function go(id, target) {
        if (!document.getElementById('profilesManager').hidden) document.getElementById('closeProfiles').click();
        const preview = document.querySelector('.mobile-preview-details');
        if (id === 'mobileGoPreview' && preview) { preview.hidden = false; preview.open = true; }
        target.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        activate(id);
    }
    document.getElementById('mobileGoInput').addEventListener('click', () => go('mobileGoInput', document.querySelector('.control-panel')));
    document.getElementById('mobileGoDownloads').addEventListener('click', () => go('mobileGoDownloads', document.querySelector('.print-settings-panel')));
    document.getElementById('mobileGoPreview').addEventListener('click', () => go('mobileGoPreview', document.getElementById('printWorkspace')));
    document.getElementById('mobileToggleFull').addEventListener('click', () => {
        fullMode = !fullMode;
        try { localStorage.setItem('wifi-mobile-mode', fullMode ? 'full' : 'simple'); } catch (_) { /* Optional storage. */ }
        apply();
    });
})();
