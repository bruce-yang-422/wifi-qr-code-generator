/* ─── Config & State Getters ────────────────────────────────────────────── */

function getConfig() {
    return window.WIFI_CONFIG || {};
}

function getPasswordMode() {
    return elements.passwordModeInputs.find((input) => input.checked)?.value || 'shared';
}

function setPasswordMode(mode) {
    elements.passwordModeInputs.forEach((input) => {
        input.checked = input.value === mode;
    });
}

function isBandSteering() {
    return elements.bandSteering.checked;
}

function getEnabledNetworks() {
    const bs = isBandSteering();
    return {
        enabled24:    elements.enable24.checked,
        enabled5:     bs ? elements.enable24.checked : elements.enable5.checked,
        enabledMlo:   elements.enableMlo.checked,
        enabledGuest: elements.enableGuest.checked
    };
}

function getInitialValues() {
    const config = getConfig();
    const password24    = config.net24?.password    || '';
    const password5     = config.net5?.password     || '';
    const passwordMlo   = config.mlo?.password      || '';
    const availablePasswords = [password24, password5, passwordMlo].filter(Boolean);
    const uniquePasswords    = [...new Set(availablePasswords)];

    return {
        ssid24:        config.net24?.ssid     || '',
        ssid5:         config.net5?.ssid      || '',
        ssidMlo:       config.mlo?.ssid       || '',
        ssidGuest:     config.guestNet?.ssid  || '',
        passwordMode:  uniquePasswords.length > 1 ? 'separate' : 'shared',
        sharedPassword: availablePasswords[0] || '',
        password24,
        password5,
        passwordMlo,
        passwordGuest: config.guestNet?.password || ''
    };
}

function getPasswordsByMode() {
    const mode = getPasswordMode();
    const bs   = isBandSteering();
    const sharedPassword = elements.sharedPasswordInput.value.trim();
    const password24     = mode === 'shared' ? sharedPassword : elements.password24Input.value.trim();
    const password5      = bs ? password24 : (mode === 'shared' ? sharedPassword : elements.password5Input.value.trim());
    const passwordMlo    = mode === 'shared' ? sharedPassword : elements.passwordMloInput.value.trim();
    const passwordGuest  = elements.passwordGuestInput.value.trim();

    return { mode, sharedPassword, password24, password5, passwordMlo, passwordGuest };
}

function getState() {
    const ssid24 = elements.ssid24Input.value.trim();
    return {
        ssid24,
        ssid5:     isBandSteering() ? ssid24 : elements.ssid5Input.value.trim(),
        ssidMlo:   elements.ssidMloInput.value.trim(),
        ssidGuest: elements.ssidGuestInput.value.trim(),
        ...getPasswordsByMode()
    };
}
