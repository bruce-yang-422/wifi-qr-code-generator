/* ─── Event Handlers ────────────────────────────────────────────────────── */

function refreshGeneratedState() {
    if (!hasGenerated) return;
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
        const nextValue = elements.password24Input.value
            || elements.password5Input.value
            || elements.passwordMloInput.value
            || elements.sharedPasswordInput.value;
        elements.sharedPasswordInput.value = nextValue;
        return;
    }
    const sharedValue = elements.sharedPasswordInput.value;
    if (!elements.password24Input.value)  elements.password24Input.value  = sharedValue;
    if (!elements.password5Input.value)   elements.password5Input.value   = sharedValue;
    if (!elements.passwordMloInput.value) elements.passwordMloInput.value = sharedValue;
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
    hasGenerated = true;
    renderQrCodes();
    updatePreviewText();
    if (!ensureRequiredValues()) return;
    // The source page is hidden when networks print on separate sheets, so scroll to the workspace.
    const workspace = document.getElementById('printWorkspace');
    for (let parent = workspace.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
    }
    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        if (event.key === 'Enter' && input.tagName !== 'TEXTAREA') handleGenerate();
    });
}

/* ─── Initialisation ────────────────────────────────────────────────────── */

function applyInitialValues(v = getInitialValues()) {
    document.getElementById('wifiTitleInput').value = v.wifiTitle || '';
    document.getElementById('wifiNoteInput').value = v.wifiNote || '';
    document.getElementById('internalNoteInput').value = v.internalNote || '';

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

    // Apply toggle switch states
    elements.enable24.checked      = v.enable24;
    elements.enable5.checked       = v.enable5;
    elements.enableMlo.checked     = v.enableMlo;
    elements.enableGuest.checked   = v.enableGuest;
    elements.bandSteering.checked  = v.bandSteering;

    updatePreviewText();

    hasGenerated = true;
    renderQrCodes();
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
        document.getElementById('clearMemoryDialog').showModal();
    });
    document.getElementById('cancelClearMemory').addEventListener('click', () => {
        document.getElementById('clearMemoryDialog').close();
    });
    document.getElementById('confirmClearMemory').addEventListener('click', () => {
        clearStoredState();
        location.reload();
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
        document.getElementById('wifiTitleInput'),
        document.getElementById('wifiNoteInput'),
        document.getElementById('internalNoteInput'),
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
