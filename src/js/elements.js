/* ─── DOM Element References ────────────────────────────────────────────── */

const elements = {
    // SSID inputs
    ssid24Input:        document.getElementById('ssid24Input'),
    ssid5Input:         document.getElementById('ssid5Input'),
    ssidMloInput:       document.getElementById('ssidMloInput'),
    ssidGuestInput:     document.getElementById('ssidGuestInput'),

    // Network enable checkboxes
    enable24:           document.getElementById('enable24'),
    enable5:            document.getElementById('enable5'),
    enableMlo:          document.getElementById('enableMlo'),
    enableGuest:        document.getElementById('enableGuest'),

    // Band steering
    bandSteering:       document.getElementById('bandSteering'),
    net5Group:          document.getElementById('net5Group'),

    // Password inputs
    passwordModeInputs: Array.from(document.querySelectorAll('input[name="passwordMode"]')),
    passwordModeToggle:     document.getElementById('passwordModeToggle'),
    sharedPasswordGroup:    document.getElementById('sharedPasswordGroup'),
    separatePasswordGroup:  document.getElementById('separatePasswordGroup'),
    guestPasswordGroup:     document.getElementById('guestPasswordGroup'),
    sharedPasswordInput:    document.getElementById('sharedPwInput'),
    password24Input:        document.getElementById('pw24Input'),
    password5Input:         document.getElementById('pw5Input'),
    passwordMloInput:       document.getElementById('pwMloInput'),
    passwordGuestInput:     document.getElementById('pwGuestInput'),

    // Password visibility toggles
    toggleSharedButton: document.getElementById('toggleSharedBtn'),
    toggle24Button:     document.getElementById('toggle24Btn'),
    toggle5Button:      document.getElementById('toggle5Btn'),
    toggleMloButton:    document.getElementById('toggleMloBtn'),
    toggleGuestButton:  document.getElementById('toggleGuestBtn'),

    // Action buttons
    generateButton:     document.getElementById('genBtn'),
    printButton:        document.getElementById('printBtn'),
    clearMemoryButton:  document.getElementById('clearMemoryBtn'),
    printPage:          document.getElementById('printPage'),

    // Quick-preview chips
    wifiCards:          document.getElementById('wifiCards'),
    quick24:            document.getElementById('quick24'),
    quick5:             document.getElementById('quick5'),
    quickMlo:           document.getElementById('quickMlo'),
    quickGuest:         document.getElementById('quickGuest'),
    quickChip24:        document.getElementById('quickChip24'),
    quickChip5:         document.getElementById('quickChip5'),
    quickChipMlo:       document.getElementById('quickChipMlo'),
    quickChipGuest:     document.getElementById('quickChipGuest'),
    quickLabel24:       document.getElementById('quickLabel24'),

    // Print page — SSID names
    ssid24Name:         document.getElementById('ssid24Name'),
    ssid5Name:          document.getElementById('ssid5Name'),
    ssidMloName:        document.getElementById('ssidMloName'),
    ssidGuestName:      document.getElementById('ssidGuestName'),

    // In-card password display
    cardPw24:               document.getElementById('cardPw24'),
    cardPw5:                document.getElementById('cardPw5'),
    cardPwMlo:              document.getElementById('cardPwMlo'),
    cardPwGuest:            document.getElementById('cardPwGuest'),

    // Legacy hidden elements (kept so old JS refs don't throw)
    pwSharedItem:           document.getElementById('pwSharedItem'),
    pwItem24:               document.getElementById('pwItem24'),
    pwItem5:                document.getElementById('pwItem5'),
    pwItemMlo:              document.getElementById('pwItemMlo'),
    pwItemGuest:            document.getElementById('pwItemGuest'),

    // Print page — scan hints
    hint24:             document.getElementById('hint24'),
    hint5:              document.getElementById('hint5'),
    hintMlo:            document.getElementById('hintMlo'),
    hintGuest:          document.getElementById('hintGuest'),
    footerText:         document.getElementById('footerText'),

    // Print page — QR frames
    qr24:               document.getElementById('qr24'),
    qr5:                document.getElementById('qr5'),
    qrMlo:              document.getElementById('qrMlo'),
    qrGuest:            document.getElementById('qrGuest'),
    frame24:            document.getElementById('frame24'),
    frame5:             document.getElementById('frame5'),
    frameMlo:           document.getElementById('frameMlo'),
    frameGuest:         document.getElementById('frameGuest'),

    // Print page — cards
    card24:             document.getElementById('card24'),
    card5:              document.getElementById('card5'),
    cardMlo:            document.getElementById('cardMlo'),
    cardGuest:          document.getElementById('cardGuest'),
    bandTag24:          document.getElementById('bandTag24'),

    // Print page — band guide
    pbg24:              document.getElementById('pbg24'),
    pbg5:               document.getElementById('pbg5'),
    pbgMlo:             document.getElementById('pbgMlo'),
    pbgGuest:           document.getElementById('pbgGuest'),
    pbgTag24:           document.getElementById('pbgTag24'),
    pbgDesc24:          document.getElementById('pbgDesc24')
};

let hasGenerated = false;
