/* ─── Validation ────────────────────────────────────────────────────────── */

const WIFI_INPUTS_TO_VALIDATE = () => [
    elements.ssid24Input,
    elements.ssid5Input,
    elements.ssidMloInput,
    elements.ssidGuestInput,
    elements.sharedPasswordInput,
    elements.password24Input,
    elements.password5Input,
    elements.passwordMloInput,
    elements.passwordGuestInput
];

function focusWifiField(input) {
    for (let parent = input.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
    }
    input.focus();
}

// One message near each action button; only the form message is announced.
function showFormMessage(message) {
    for (const id of ['formStatus', 'printStatus']) {
        const target = document.getElementById(id);
        target.textContent = message;
        target.hidden = !message;
    }
}

function clearInputErrors() {
    WIFI_INPUTS_TO_VALIDATE().forEach((input) => {
        input.classList.remove('input-error');
        input.removeAttribute('aria-invalid');
    });
    showFormMessage('');
}

function rejectField(input) {
    const label = document.querySelector(`label[for="${input.id}"]`)?.textContent.trim() || input.id;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
    showFormMessage(t('請填寫「{field}」。', { field: label }));
    focusWifiField(input);
    return false;
}

function ensureRequiredValues() {
    const { ssid24, ssid5, ssidMlo, ssidGuest, mode, sharedPassword, password24, password5, passwordMlo, passwordGuest } = getState();
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();
    const anyMainEnabled = enabled24 || enabled5 || enabledMlo;
    clearInputErrors();

    if (!anyMainEnabled && !enabledGuest) {
        showFormMessage(t('請至少啟用一個網路。'));
        return false;
    }

    if (enabled24 && !ssid24) return rejectField(elements.ssid24Input);
    if (!isBandSteering() && enabled5 && !ssid5) return rejectField(elements.ssid5Input);
    if (enabledMlo && !ssidMlo) return rejectField(elements.ssidMloInput);
    if (enabledGuest && !ssidGuest) return rejectField(elements.ssidGuestInput);

    if (anyMainEnabled && mode === 'shared' && !sharedPassword) return rejectField(elements.sharedPasswordInput);

    if (anyMainEnabled && mode === 'separate') {
        if (enabled24 && !password24) return rejectField(elements.password24Input);
        if (enabled5 && !password5) return rejectField(elements.password5Input);
        if (enabledMlo && !passwordMlo) return rejectField(elements.passwordMloInput);
    }

    if (enabledGuest && !passwordGuest) return rejectField(elements.passwordGuestInput);

    return true;
}

/* ─── WPA Password Length ───────────────────────────────────────────────── */

// WPA/WPA2-PSK accepts an 8–63 character passphrase or a 64-digit hex key.
function isValidWpaPassword(value) {
    const length = [...value].length;
    return /^[0-9a-f]{64}$/i.test(value) || (length >= 8 && length <= 63);
}

// A warning only: QR codes still render so unusual router settings are not blocked.
function updatePasswordHints() {
    [
        elements.sharedPasswordInput,
        elements.password24Input,
        elements.password5Input,
        elements.passwordMloInput,
        elements.passwordGuestInput
    ].forEach((input) => {
        const group = input.closest('.password-panel');
        let hint = group.querySelector('.field-warning');
        if (!hint) {
            hint = document.createElement('p');
            hint.className = 'field-warning';
            hint.id = `${input.id}Hint`;
            group.append(hint);
            input.setAttribute('aria-describedby', hint.id);
        }
        const invalid = Boolean(input.value) && !isValidWpaPassword(input.value);
        hint.hidden = !invalid;
        hint.textContent = invalid
            ? t('WPA 密碼需為 8～63 個字元（目前 {count} 個），否則裝置可能無法連線。', { count: [...input.value].length })
            : '';
    });
}
