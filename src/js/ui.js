/* ─── UI Update Functions ────────────────────────────────────────────────── */

function updateCardVisibility() {
    const { enabled24, enabledMlo, enabledGuest } = getEnabledNetworks();
    const bs          = isBandSteering();
    const enabled5raw = elements.enable5.checked;

    // Band steering ON → merge 5 GHz into the 2.4 GHz card
    const show5separate = !bs && enabled5raw;
    const label24       = bs && enabled24 ? '2.4 / 5 GHz' : '2.4 GHz';
    document.querySelector('label[for="ssid24Input"]').textContent = bs ? '2.4／5 GHz 共用 SSID' : '2.4 GHz SSID';

    elements.bandTag24.textContent  = label24;
    elements.quickLabel24.textContent = label24;
    elements.pbgTag24.textContent   = label24;
    elements.pbgDesc24.textContent  = bs
        ? '選擇此網路即可，裝置會自動切換頻段'
        : '適合一般上網與較遠距離使用';

    elements.net5Group.classList.toggle('hidden', bs);

    elements.card24.classList.toggle('hidden', !enabled24);
    elements.card5.classList.toggle('hidden', !show5separate);
    elements.cardMlo.classList.toggle('hidden', !enabledMlo);
    elements.cardGuest.classList.toggle('hidden', !enabledGuest);

    elements.quickChip24.classList.toggle('hidden', !enabled24);
    elements.quickChip5.classList.toggle('hidden', !show5separate);
    elements.quickChipMlo.classList.toggle('hidden', !enabledMlo);
    elements.quickChipGuest.classList.toggle('hidden', !enabledGuest);

    elements.pbg24.classList.toggle('hidden', !enabled24);
    elements.pbg5.classList.toggle('hidden', !show5separate);
    elements.pbgMlo.classList.toggle('hidden', !enabledMlo);

    const count = [enabled24, show5separate, enabledMlo, enabledGuest].filter(Boolean).length;
    elements.wifiCards.dataset.count = Math.max(count, 1);
}

function syncModeVisibility() {
    const isShared = getPasswordMode() === 'shared';
    const bs = isBandSteering();
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();
    const anyMainEnabled = enabled24 || enabled5 || enabledMlo;

    // When Band Steering is ON, always use shared password mode
    if (bs) {
        setPasswordMode('shared');
    }

    // Hide password mode toggle when Band Steering is on or no main network is enabled
    const showModeToggle = !bs && anyMainEnabled;
    elements.passwordModeToggle.classList.toggle('hidden', !showModeToggle);

    elements.sharedPasswordGroup.classList.toggle('hidden', !isShared || !anyMainEnabled);
    elements.separatePasswordGroup.classList.toggle('hidden', isShared || !anyMainEnabled || bs);
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

    const display24    = ssid24    || '未填寫 SSID';
    const display5     = ssid5     || '未填寫 SSID';
    const displayMlo   = ssidMlo   || '未填寫 SSID';
    const displayGuest = ssidGuest || '未填寫 SSID';

    const footerParts = [
        enabled24    && ssid24,
        enabled5     && ssid5,
        enabledMlo   && ssidMlo,
        enabledGuest && ssidGuest
    ].filter(Boolean);

    elements.quick24.textContent        = display24;
    elements.quick5.textContent         = display5;
    elements.quickMlo.textContent       = displayMlo;
    elements.quickGuest.textContent     = displayGuest;
    elements.ssid24Name.textContent     = display24;
    elements.ssid5Name.textContent      = display5;
    elements.ssidMloName.textContent    = displayMlo;
    elements.ssidGuestName.textContent  = displayGuest;

    elements.cardPw24.textContent    = password24    || '••••••••';
    elements.cardPw5.textContent     = password5     || '••••••••';
    elements.cardPwMlo.textContent   = passwordMlo   || '••••••••';
    elements.cardPwGuest.textContent = passwordGuest || '••••••••';

    elements.footerText.textContent = footerParts.length
        ? footerParts.join(' / ')
        : 'WiFi Network Sheet';
    document.title = 'WiFi QR Code 產生器';

    syncModeVisibility();
    updateCardVisibility();

    const hintSuffix = mode === 'separate' ? '（獨立密碼）' : '';
    elements.hint24.textContent    = ssid24    && enabled24    ? `掃描加入 ${ssid24}${hintSuffix}`    : '等待產生 2.4 GHz QR Code';
    elements.hint5.textContent     = ssid5     && enabled5     ? `掃描加入 ${ssid5}${hintSuffix}`     : '等待產生 5 GHz QR Code';
    elements.hintMlo.textContent   = ssidMlo   && enabledMlo   ? `掃描加入 ${ssidMlo}${hintSuffix}`   : '等待產生 MLO QR Code';
    elements.hintGuest.textContent = ssidGuest && enabledGuest ? `掃描加入 ${ssidGuest}（訪客）`       : '等待產生訪客 QR Code';
}

function setPlaceholder(target, message) {
    target.innerHTML = `<div class="qr-placeholder">${message}</div>`;
}

function togglePasswordVisibility(input, button) {
    const isPassword = input.type === 'password';
    input.type       = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? '🙈' : '👁';
}
