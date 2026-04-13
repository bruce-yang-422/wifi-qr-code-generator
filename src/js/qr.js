/* ─── QR Code Rendering ─────────────────────────────────────────────────── */

function escapeWifiValue(value) {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/:/g, '\\:');
}

function renderQr(target, frame, ssid, password) {
    target.innerHTML = '';
    new QRCode(target, {
        text: `WIFI:T:WPA;S:${escapeWifiValue(ssid)};P:${escapeWifiValue(password)};H:false;;`,
        width: 140,
        height: 140,
        colorDark: '#2c2420',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    frame.classList.add('has-qr');
}

function renderQrCodes() {
    const { ssid24, ssid5, ssidMlo, ssidGuest, password24, password5, passwordMlo, passwordGuest } = getState();
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();

    if (enabled24    && ssid24    && password24)    renderQr(elements.qr24,    elements.frame24,    ssid24,    password24);
    if (enabled5     && ssid5     && password5)     renderQr(elements.qr5,     elements.frame5,     ssid5,     password5);
    if (enabledMlo   && ssidMlo   && passwordMlo)   renderQr(elements.qrMlo,   elements.frameMlo,   ssidMlo,   passwordMlo);
    if (enabledGuest && ssidGuest && passwordGuest) renderQr(elements.qrGuest, elements.frameGuest, ssidGuest, passwordGuest);
}

function resetQrPlaceholders() {
    [elements.frame24, elements.frame5, elements.frameMlo, elements.frameGuest].forEach((frame) => {
        frame.classList.remove('has-qr');
    });
    const msg = '輸入 SSID 與密碼後，按下產生 QR Code';
    setPlaceholder(elements.qr24,    msg);
    setPlaceholder(elements.qr5,     msg);
    setPlaceholder(elements.qrMlo,   msg);
    setPlaceholder(elements.qrGuest, msg);
}
