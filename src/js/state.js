/* ─── Local Storage Keys ────────────────────────────────────────────────── */

const STORAGE_KEY = 'wifi-qr-state';

/* ─── LocalStorage Functions ────────────────────────────────────────────── */

function saveStateToStorage(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Failed to save state to localStorage:', e);
    }
}

function loadStateFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        console.warn('Failed to load state from localStorage:', e);
        return null;
    }
}

function clearStoredState() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('Failed to clear localStorage:', e);
    }
}

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
    // Try loading from localStorage first
    const stored = loadStateFromStorage();
    if (stored) {
        return {
            wifiTitle: stored.wifiTitle || '',
            wifiNote: stored.wifiNote || '',
            internalNote: stored.internalNote || '',
            ssid24:         stored.ssid24 || '',
            ssid5:          stored.ssid5 || '',
            ssidMlo:        stored.ssidMlo || '',
            ssidGuest:      stored.ssidGuest || '',
            passwordMode:   stored.passwordMode || stored.mode || 'shared',
            sharedPassword: stored.sharedPassword || '',
            password24:     stored.password24 || '',
            password5:      stored.password5 || '',
            passwordMlo:    stored.passwordMlo || '',
            passwordGuest:  stored.passwordGuest || '',
            enable24:       stored.enable24 !== undefined ? stored.enable24 : true,
            enable5:        stored.enable5 !== undefined ? stored.enable5 : true,
            enableMlo:      stored.enableMlo !== undefined ? stored.enableMlo : false,
            enableGuest:    stored.enableGuest !== undefined ? stored.enableGuest : false,
            bandSteering:   stored.bandSteering !== undefined ? stored.bandSteering : false
        };
    }

    // Fall back to config.js
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
        passwordGuest: config.guestNet?.password || '',
        enable24:      true,
        enable5:       true,
        enableMlo:     false,
        enableGuest:   false,
        bandSteering:  config.bandSteering || false
    };
}

function getPasswordsByMode() {
    const mode = getPasswordMode();
    const bs   = isBandSteering();
    const sharedPassword = elements.sharedPasswordInput.value;
    const password24     = mode === 'shared' ? sharedPassword : elements.password24Input.value;
    const password5      = bs ? password24 : (mode === 'shared' ? sharedPassword : elements.password5Input.value);
    const passwordMlo    = mode === 'shared' ? sharedPassword : elements.passwordMloInput.value;
    const passwordGuest  = elements.passwordGuestInput.value;

    return { mode, sharedPassword, password24, password5, passwordMlo, passwordGuest };
}

function getState() {
    const ssid24 = elements.ssid24Input.value;
    return {
        wifiTitle: document.getElementById('wifiTitleInput').value.trim(),
        wifiNote: document.getElementById('wifiNoteInput').value.trim(),
        internalNote: document.getElementById('internalNoteInput').value,
        passwordMode: getPasswordMode(),
        printOptions: getPrintOptions(),
        ssid24,
        ssid5:     isBandSteering() ? ssid24 : elements.ssid5Input.value,
        ssidMlo:   elements.ssidMloInput.value,
        ssidGuest: elements.ssidGuestInput.value,
        ...getPasswordsByMode(),
        enable24:     elements.enable24.checked,
        enable5:      elements.enable5.checked,
        enableMlo:    elements.enableMlo.checked,
        enableGuest:  elements.enableGuest.checked,
        bandSteering: elements.bandSteering.checked
    };
}

function getPrintOptions() {
    return {
        paper: document.querySelector('input[name="printLayout"]:checked').value,
        separateEach: document.getElementById('networkLayoutSwitch').checked,
        separateMlo: document.getElementById('mloLayoutSwitch').checked,
        separateGuest: document.getElementById('guestLayoutSwitch').checked,
        correction: document.querySelector('input[name="qrCorrection"]:checked').value
    };
}

function applyPrintOptions(options) {
    if (!options) return;
    const paper = [...document.querySelectorAll('input[name="printLayout"]')].find(input => input.value === options.paper);
    if (paper) paper.checked = true;
    for (const [id, key] of [['networkLayoutSwitch', 'separateEach'], ['mloLayoutSwitch', 'separateMlo'], ['guestLayoutSwitch', 'separateGuest']]) {
        if (typeof options[key] === 'boolean') document.getElementById(id).checked = options[key];
    }
    const correction = [...document.querySelectorAll('input[name="qrCorrection"]')].find(input => input.value === options.correction);
    if (correction) correction.checked = true;
    document.getElementById('printLayout').dispatchEvent(new Event('change', { bubbles: true }));
}
