// OS hints improve ergonomics; browser feature detection decides capabilities.
function detectWifiPlatform(nav = navigator) {
    const ua = nav.userAgent || '';
    if (/iPad|iPhone|iPod/i.test(ua) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1)) return 'ios';
    if (nav.userAgentData?.platform === 'Android' || /Android/i.test(ua)) return 'android';
    return 'other';
}
const wifiDevice = { os: detectWifiPlatform() };
document.body.dataset.platform = wifiDevice.os;

(() => {
    document.querySelectorAll('input[id^="ssid"],input[type="password"]').forEach(input => {
        input.setAttribute('autocapitalize', 'none'); input.setAttribute('autocorrect', 'off');
        input.spellcheck = false;
        input.setAttribute('enterkeyhint', input.id.startsWith('ssid') ? 'next' : 'done');
    });
    const viewport = window.visualViewport;
    if (!viewport) return;
    let restingHeight = viewport.height;
    function updateKeyboard() {
        const editable = document.activeElement?.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="file"]),textarea,[contenteditable="true"]');
        if (!editable) restingHeight = viewport.height;
        document.body.classList.toggle('mobile-keyboard-open', Boolean(editable && restingHeight - viewport.height > 140));
    }
    viewport.addEventListener('resize', updateKeyboard);
    document.addEventListener('focusin', updateKeyboard);
    document.addEventListener('focusout', () => setTimeout(updateKeyboard, 0));
})();

const offerWifiImageShare = (() => {
    const dialog = document.getElementById('imageShareDialog');
    const preview = document.getElementById('imageSharePreview');
    const feedback = document.getElementById('imageShareStatus');
    let file = null;
    let url = null;
    let returnFocus = null;
    function cleanup() {
        if (url) URL.revokeObjectURL(url);
        url = null; file = null; preview.removeAttribute('src');
        if (returnFocus) document.querySelector(returnFocus)?.focus();
        returnFocus = null;
    }
    dialog.addEventListener('close', cleanup);
    document.getElementById('cancelImageShare').addEventListener('click', () => dialog.close());
    document.getElementById('downloadPreparedImage').addEventListener('click', () => {
        if (!file || !url) return;
        const link = document.createElement('a'); link.href = url; link.download = file.name;
        document.body.append(link); link.click(); link.remove();
        // Keep the object URL valid while Safari starts reading the download.
        const current = url; url = null; setTimeout(() => URL.revokeObjectURL(current), 60000);
        dialog.close();
    });
    document.getElementById('sharePreparedImage').addEventListener('click', async () => {
        if (!file) return;
        try {
            // A fresh user gesture after rendering retains transient activation.
            await navigator.share({ files: [file], title: t('分享圖片') });
            dialog.close();
        } catch (error) {
            if (error.name !== 'AbortError') feedback.textContent = t('無法開啟分享，請使用下載 PNG。');
        }
    });
    return (blob, filename, focusTarget = null) => {
        if (!['ios', 'android'].includes(wifiDevice.os) || typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') return false;
        const candidate = new File([blob], filename, { type: blob.type });
        try { if (!navigator.canShare({ files: [candidate] })) return false; } catch (_) { return false; }
        if (dialog.open) dialog.close();
        cleanup(); file = candidate; url = URL.createObjectURL(blob); returnFocus = focusTarget;
        preview.src = url; feedback.textContent = '';
        document.getElementById('imageShareFilename').textContent = filename;
        dialog.showModal(); return true;
    };
})();
