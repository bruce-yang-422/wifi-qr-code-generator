/* ─── Event Handlers ────────────────────────────────────────────────────── */

function refreshGeneratedState() {
    if (!hasGenerated) return;
    if (!allRequiredFilled()) {
        resetQrPlaceholders();
        return;
    }
    renderQrCodes();
}

function handleInputChange() {
    updatePreviewText();
    clearInputErrors();
    refreshGeneratedState();
    // Save to localStorage
    saveStateToStorage(getState());
}

function handleEnableChange() {
    updatePreviewText();
    clearInputErrors();
    refreshGeneratedState();
    // Save to localStorage
    saveStateToStorage(getState());
}

function syncPasswordsOnModeChange(nextMode) {
    if (nextMode === 'shared') {
        const nextValue = elements.password24Input.value.trim()
            || elements.password5Input.value.trim()
            || elements.passwordMloInput.value.trim()
            || elements.sharedPasswordInput.value.trim();
        elements.sharedPasswordInput.value = nextValue;
        return;
    }
    const sharedValue = elements.sharedPasswordInput.value.trim();
    if (!elements.password24Input.value.trim())  elements.password24Input.value  = sharedValue;
    if (!elements.password5Input.value.trim())   elements.password5Input.value   = sharedValue;
    if (!elements.passwordMloInput.value.trim()) elements.passwordMloInput.value = sharedValue;
}

function handleModeChange(event) {
    syncPasswordsOnModeChange(event.target.value);
    updatePreviewText();
    clearInputErrors();
    refreshGeneratedState();
    // Save to localStorage
    saveStateToStorage(getState());
}

function handleGenerate() {
    if (!ensureRequiredValues()) return;
    hasGenerated = true;
    renderQrCodes();
    updatePreviewText();
    elements.printPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handlePrint() {
    if (!ensureRequiredValues()) return;
    if (!hasGenerated) {
        hasGenerated = true;
        renderQrCodes();
    }
    window.print();
}

function bindInputEvents(input) {
    input.addEventListener('input', handleInputChange);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleGenerate();
    });
}

/* ─── Initialisation ────────────────────────────────────────────────────── */

function applyInitialValues() {
    const v = getInitialValues();

    elements.ssid24Input.value        = v.ssid24;
    elements.ssid5Input.value         = v.ssid5;
    elements.ssidMloInput.value       = v.ssidMlo;
    elements.ssidGuestInput.value     = v.ssidGuest;
    setPasswordMode(v.passwordMode);
    elements.sharedPasswordInput.value  = v.sharedPassword;
    elements.password24Input.value      = v.password24;
    elements.password5Input.value       = v.password5;
    elements.passwordMloInput.value     = v.passwordMlo;
    elements.passwordGuestInput.value   = v.passwordGuest;

    if (v.ssidGuest)            elements.enableGuest.checked = true;
    if (getConfig().bandSteering) elements.bandSteering.checked = true;

    updatePreviewText();

    if (allRequiredFilled()) {
        hasGenerated = true;
        renderQrCodes();
        return;
    }
    resetQrPlaceholders();
}

function init() {
    // Password visibility toggles
    elements.toggleSharedButton.addEventListener('click', () =>
        togglePasswordVisibility(elements.sharedPasswordInput, elements.toggleSharedButton));
    elements.toggle24Button.addEventListener('click', () =>
        togglePasswordVisibility(elements.password24Input, elements.toggle24Button));
    elements.toggle5Button.addEventListener('click', () =>
        togglePasswordVisibility(elements.password5Input, elements.toggle5Button));
    elements.toggleMloButton.addEventListener('click', () =>
        togglePasswordVisibility(elements.passwordMloInput, elements.toggleMloButton));
    elements.toggleGuestButton.addEventListener('click', () =>
        togglePasswordVisibility(elements.passwordGuestInput, elements.toggleGuestButton));

    // Generate & print
    elements.generateButton.addEventListener('click', handleGenerate);
    elements.printButton.addEventListener('click', handlePrint);
    elements.clearMemoryButton.addEventListener('click', () => {
        if (confirm('確定要清除所有記憶的輸入嗎？此操作無法復原。')) {
            clearStoredState();
            location.reload();
        }
    });

    // Password mode radio
    elements.passwordModeInputs.forEach((input) =>
        input.addEventListener('change', handleModeChange));

    // Network enable toggles + band steering
    document.querySelectorAll('.network-enable').forEach((cb) =>
        cb.addEventListener('change', handleEnableChange));
    elements.bandSteering.addEventListener('change', handleEnableChange);

    // Text inputs
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
    ].forEach(bindInputEvents);

    applyInitialValues();
}

init();
