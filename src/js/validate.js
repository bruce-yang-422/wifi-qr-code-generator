/* ─── Validation ────────────────────────────────────────────────────────── */

function focusWifiField(input) {
    for (let parent = input.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
    }
    input.focus();
}

function clearInputErrors() {
    [
        elements.ssid24Input,
        elements.ssid5Input,
        elements.ssidMloInput,
        elements.ssidGuestInput,
        elements.sharedPasswordInput,
        elements.password24Input,
        elements.password5Input,
        elements.passwordMloInput,
        elements.passwordGuestInput
    ].forEach((input) => input.classList.remove('input-error'));
}

function ensureRequiredValues() {
    const { ssid24, ssid5, ssidMlo, ssidGuest, mode, sharedPassword, password24, password5, passwordMlo, passwordGuest } = getState();
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();
    const anyMainEnabled = enabled24 || enabled5 || enabledMlo;
    clearInputErrors();

    if (!anyMainEnabled && !enabledGuest) return false;

    if (enabled24 && !ssid24) {
        elements.ssid24Input.classList.add('input-error');
        focusWifiField(elements.ssid24Input);
        return false;
    }
    if (!isBandSteering() && enabled5 && !ssid5) {
        elements.ssid5Input.classList.add('input-error');
        focusWifiField(elements.ssid5Input);
        return false;
    }
    if (enabledMlo && !ssidMlo) {
        elements.ssidMloInput.classList.add('input-error');
        focusWifiField(elements.ssidMloInput);
        return false;
    }
    if (enabledGuest && !ssidGuest) {
        elements.ssidGuestInput.classList.add('input-error');
        focusWifiField(elements.ssidGuestInput);
        return false;
    }

    if (anyMainEnabled && mode === 'shared' && !sharedPassword) {
        elements.sharedPasswordInput.classList.add('input-error');
        focusWifiField(elements.sharedPasswordInput);
        return false;
    }

    if (anyMainEnabled && mode === 'separate') {
        if (enabled24 && !password24) {
            elements.password24Input.classList.add('input-error');
            focusWifiField(elements.password24Input);
            return false;
        }
        if (enabled5 && !password5) {
            elements.password5Input.classList.add('input-error');
            focusWifiField(elements.password5Input);
            return false;
        }
        if (enabledMlo && !passwordMlo) {
            elements.passwordMloInput.classList.add('input-error');
            focusWifiField(elements.passwordMloInput);
            return false;
        }
    }

    if (enabledGuest && !passwordGuest) {
        elements.passwordGuestInput.classList.add('input-error');
        focusWifiField(elements.passwordGuestInput);
        return false;
    }

    return true;
}

function allRequiredFilled() {
    const { ssid24, ssid5, ssidMlo, ssidGuest, mode, sharedPassword, password24, password5, passwordMlo, passwordGuest } = getState();
    const { enabled24, enabled5, enabledMlo, enabledGuest } = getEnabledNetworks();
    const anyMainEnabled = enabled24 || enabled5 || enabledMlo;
    const bs = isBandSteering();

    if (enabled24             && !ssid24)    return false;
    if (!bs && enabled5       && !ssid5)     return false;
    if (enabledMlo            && !ssidMlo)   return false;
    if (enabledGuest          && !ssidGuest) return false;

    if (anyMainEnabled) {
        if (mode === 'shared' && !sharedPassword) return false;
        if (mode === 'separate') {
            if (enabled24  && !password24)  return false;
            if (enabled5   && !password5)   return false;
            if (enabledMlo && !passwordMlo) return false;
        }
    }

    if (enabledGuest && !passwordGuest) return false;
    return true;
}
