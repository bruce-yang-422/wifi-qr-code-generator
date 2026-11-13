/* ─── UI Update Functions ────────────────────────────────────────────────── */

function updateCardVisibility() {
    const { enabled24, enabledMlo, enabledGuest } = getEnabledNetworks();
    const bs          = isBandSteering();
    const enabled5raw = elements.enable5.checked;

    // Band steering ON → merge 5 GHz into the 2.4 GHz card
    const show5separate = !bs && enabled5raw;
    const label24       = bs && enabled24 ? '2.4 / 5 GHz' : '2.4 GHz';
    const mobile = document.body.classList.contains('mobile-simple');
    document.querySelector('label[for="ssid24Input"]').textContent = mobile ? t('網路名稱（SSID）') : bs ? t('2.4／5 GHz 共用 SSID') : '2.4 GHz SSID';
    document.querySelector('label[for="sharedPwInput"]').textContent = t(mobile ? '連線密碼' : '共用 WiFi 密碼');

    elements.bandTag24.textContent  = label24;
    elements.pbgTag24.textContent   = label24;
    elements.pbgDesc24.textContent  = bs
        ? t('選擇此網路即可，裝置會自動切換頻段')
        : t('適合一般上網與較遠距離使用');

    elements.net5Group.classList.toggle('hidden', bs);

    elements.card24.classList.toggle('hidden', !enabled24);
    elements.card5.classList.toggle('hidden', !show5separate);
    elements.cardMlo.classList.toggle('hidden', !enabledMlo);
    elements.cardGuest.classList.toggle('hidden', !enabledGuest);


    elements.pbg24.classList.toggle('hidden', !enabled24);
    elements.pbg5.classList.toggle('hidden', !show5separate);
    elements.pbgMlo.classList.toggle('hidden', !enabledMlo);

    const count = [enabled24, show5separate, enabledMlo, enabledGuest].filter(Boolean).length;
    elements.wifiCards.dataset.count = Math.max(count, 1);
}

function syncModeVisibility() {
    const bs = isBandSteering();
    // Band steering always uses one password; force the mode before reading it.
    if (bs) setPasswordMode('shared');
    const isShared = getPasswordMode() === 'shared';
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();
    const anyMainEnabled = enabled24 || enabled5 || enabledMlo;

    document.getElementById('passwordModeGroup').classList.toggle('hidden', bs || !anyMainEnabled);
    elements.sharedPasswordGroup.classList.toggle('hidden', !isShared || !anyMainEnabled);
    // Separate passwords sit under their own SSID and follow that network's switch.
    const separate = !isShared && !bs;
    document.getElementById('pw24Group').classList.toggle('hidden', !separate || !enabled24);
    document.getElementById('pw5Group').classList.toggle('hidden', !separate || !enabled5);
    document.getElementById('pwMloGroup').classList.toggle('hidden', !separate || !enabledMlo);
    elements.guestPasswordGroup.classList.toggle('hidden', !enabledGuest);
}

function updatePreviewText() {
    const custom = getState();
    for (const key of ['wifiTitle', 'wifiNote']) {
        const target = document.getElementById(key);
        target.textContent = custom[key];
        target.hidden = !custom[key];
    }
    const {
        ssid24, ssid5, ssidMlo, ssidGuest,
        mode, password24, password5, passwordMlo, passwordGuest
    } = getState();
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();

    const display24    = ssid24    || t('未填寫 SSID');
    const display5     = ssid5     || t('未填寫 SSID');
    const displayMlo   = ssidMlo   || t('未填寫 SSID');
    const displayGuest = ssidGuest || t('未填寫 SSID');

    const footerParts = [
        enabled24    && ssid24,
        enabled5     && ssid5,
        enabledMlo   && ssidMlo,
        enabledGuest && ssidGuest
    ].filter(Boolean);

    elements.ssid24Name.textContent     = display24;
    elements.ssid5Name.textContent      = display5;
    elements.ssidMloName.textContent    = displayMlo;
    elements.ssidGuestName.textContent  = displayGuest;
    [[elements.ssid24Name, ssid24], [elements.ssid5Name, ssid5],
        [elements.ssidMloName, ssidMlo], [elements.ssidGuestName, ssidGuest]]
        .forEach(([label, value]) => label.classList.toggle('is-empty-ssid', !value));

    elements.cardPw24.textContent    = password24    || '••••••••';
    elements.cardPw5.textContent     = password5     || '••••••••';
    elements.cardPwMlo.textContent   = passwordMlo   || '••••••••';
    elements.cardPwGuest.textContent = passwordGuest || '••••••••';

    elements.footerText.textContent = footerParts.length
        ? footerParts.join(' / ')
        : t('WiFi 連線資訊');

    syncModeVisibility();
    updateCardVisibility();
    updatePasswordHints();

    const hintSuffix = mode === 'separate' ? t('（獨立密碼）') : '';
    // Only promise a scan when the QR code can actually be rendered.
    elements.hint24.textContent    = ssid24    && password24    && enabled24    ? t('掃描加入 {ssid}', { ssid: ssid24 }) + hintSuffix    : t('等待產生 {band} QR Code', { band: '2.4 GHz' });
    elements.hint5.textContent     = ssid5     && password5     && enabled5     ? t('掃描加入 {ssid}', { ssid: ssid5 }) + hintSuffix     : t('等待產生 {band} QR Code', { band: '5 GHz' });
    elements.hintMlo.textContent   = ssidMlo   && passwordMlo   && enabledMlo   ? t('掃描加入 {ssid}', { ssid: ssidMlo }) + hintSuffix   : t('等待產生 {band} QR Code', { band: 'MLO' });
    elements.hintGuest.textContent = ssidGuest && passwordGuest && enabledGuest ? t('掃描加入 {ssid}', { ssid: ssidGuest })       : t('等待產生 {band} QR Code', { band: t('訪客') });
}

function setPlaceholder(target, message) {
    target.innerHTML = `<div class="qr-placeholder">${message}</div>`;
}

function togglePasswordVisibility(input, button) {
    const isPassword = input.type === 'password';
    input.type       = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? '🙈' : '👁';
    button.setAttribute('aria-pressed', String(isPassword));
}
