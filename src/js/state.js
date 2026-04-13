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
            ssid24:         stored.ssid24 || '',
            ssid5:          stored.ssid5 || '',
            ssidMlo:        stored.ssidMlo || '',
            ssidGuest:      stored.ssidGuest || '',
            passwordMode:   stored.passwordMode || 'shared',
            sharedPassword: stored.sharedPassword || '',
            password24:     stored.password24 || '',
            password5:      stored.password5 || '',
            passwordMlo:    stored.passwordMlo || '',
            passwordGuest:  stored.passwordGuest || ''
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
