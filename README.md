# WiFi QR Code Generator

**English** | [繁體中文](README.zh-TW.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://bruce-yang-422.github.io/wifi-qr-code-generator/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)

> A client-side, zero-build WiFi QR code generator for 2.4 GHz, 5 GHz, MLO and guest networks. Export A4/A5 print layouts, PDFs and 3:4 PNG images for sharing on phones, with PWA offline support.

**[🌐 Live Demo](https://bruce-yang-422.github.io/wifi-qr-code-generator/)** · **[🐛 Report a Bug](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues)** · **[💡 Request a Feature](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues/new)**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration (`config.js`)](#configuration-configjs)
- [Print Layouts](#print-layouts)
- [PNG Share Images](#png-share-images)
- [PWA and Offline Use](#pwa-and-offline-use)
- [Languages](#languages)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Privacy and Security](#privacy-and-security)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## About

Offices, shops, meeting rooms and guesthouses often need to post WiFi details for several bands or a separate guest network. This tool lets you enter SSIDs and passwords in the browser, preview the result live, and print or save scannable QR codes as a PDF.

QR codes are generated locally in your browser; the app never uploads your SSIDs or passwords. On desktop, the workspace uses an Apple-style three-column layout: network settings on the left, the paper preview in the middle, and print and download options on the right. The page expands naturally and scrolls as a whole.

> [!NOTE]
> The interface is available in 8 languages (see [Languages](#languages)). Button names in this README refer to the English UI.

## Features

| Category | Description |
| --- | --- |
| 📶 **Multiple networks** | 2.4 GHz, 5 GHz, MLO (Wi-Fi 7 Multi-Link Operation) and guest networks, each toggled independently |
| 🔀 **Band Steering** | Merge 2.4 and 5 GHz into a single SSID and password, producing one QR code |
| 🔑 **Flexible passwords** | Internal networks can share one password or use separate ones; the guest network has its own |
| 📝 **Custom title and notes** | Add a WiFi title and notes (opening hours, coverage area, usage rules, etc.) |
| 👀 **Live preview** | Changes appear instantly in the print preview |
| 🌐 **8 languages** | Traditional Chinese, Simplified Chinese, English, Japanese, Korean, French, German and Spanish |
| 🖨️ **Print layouts** | Single A4, standalone A5, or two A5 copies on landscape A4 (with a cut line) |
| 🗂️ **Page grouping** | Print internal networks together or one per page; MLO and guest can each get their own page |
| 💾 **Auto-save** | Network details, title, notes and network toggles are saved to `localStorage`; print arrangement and error correction level are not |
| 🖼️ **PNG sharing** | Download a 1200 × 1600 (3:4) image per network, ready to share via LINE or other messaging apps |
| 🎚️ **Error correction** | Switch between L / M / Q / H (default H); the center icon is hidden in the preview below H |
| 📲 **PWA** | An unobtrusive install button on supported browsers; core features work offline once cached |
| ⚙️ **Local config file** | Prefill SSIDs and passwords with `config.js` |
| 📱 **Responsive** | Works on desktop, tablet and mobile |
| 🚀 **Zero build** | No Node.js or bundler needed; just open `index.html` |

## Getting Started

### Online

Visit **<https://bruce-yang-422.github.io/wifi-qr-code-generator/>**.

### Run Locally

```bash
git clone https://github.com/bruce-yang-422/wifi-qr-code-generator.git
cd wifi-qr-code-generator
```

Then open `index.html` in your browser.

To serve it locally instead (optional):

```bash
# Python 3
python -m http.server 8080

# or Node.js
npx serve .
```

Then open <http://localhost:8080>. The PWA requires HTTPS or localhost; opening the file directly will not register the Service Worker.

## Usage

1. **(Optional)** Enter a WiFi title and notes.
2. Enable the networks you need (2.4 GHz / 5 GHz / MLO / Guest) and enter their SSIDs.
3. **(Optional)** Turn on Band Steering so 2.4 and 5 GHz share one SSID and password.
4. Choose a password mode: **Shared** or **Separate**.
5. Each network's QR code updates on its own as soon as its fields are complete; an incomplete network does not clear the others. You can also click **Generate QR Code** to validate all fields.
6. In the right panel, choose the paper size, page-separation toggles and error correction level, review the print summary, then print or download PNGs. Any incomplete network must be completed or turned off before printing.

> [!TIP]
> To clear the data saved in your browser, click **🗑️ Clear Memory** at the bottom of the control panel.

### QR Code Format

QR codes use the following WiFi configuration format, which phone cameras and scanner apps that support it can recognize. Whether a device can connect directly depends on the device, OS and network setup.

```text
WIFI:T:WPA;S:<SSID>;P:<password>;H:false;;
```

Special characters in the SSID and password (`\`, `;`, `,`, `:`) are escaped automatically.

## Configuration (`config.js`)

If you regularly generate QR codes for the same networks, create a `config.js` file in the project root to prefill them. The file is listed in `.gitignore` and **will not be committed**.

```js
// config.js — local use only, do not commit to Git
window.WIFI_CONFIG = Object.freeze({
    bandSteering: false,           // true: merge 2.4 / 5 GHz
    net24: Object.freeze({
        ssid: "MyWiFi",
        password: "your-password"
    }),
    net5: Object.freeze({
        ssid: "MyWiFi_5G",
        password: "your-password"
    }),
    mlo: Object.freeze({
        ssid: "MyWiFi_MLO",
        password: "your-password"
    }),
    guestNet: Object.freeze({
        ssid: "MyWiFi_Guest",
        password: "guest-password"
    })
});
```

### Options

| Key | Type | Description |
| --- | --- | --- |
| `bandSteering` | `boolean` | Enable Band Steering; defaults to `false` |
| `net24` | `{ ssid, password }` | 2.4 GHz network |
| `net5` | `{ ssid, password }` | 5 GHz network |
| `mlo` | `{ ssid, password }` | MLO network |
| `guestNet` | `{ ssid, password }` | Guest network |

All fields are optional.

### Loading Rules

- **Priority:** `localStorage` → `config.js` → empty. Data already saved in the browser takes precedence.
- If the 2.4 GHz, 5 GHz and MLO passwords are identical, the app loads in **Shared** password mode; if any two differ, it switches to **Separate**.
- If `config.js` does not exist, the app starts in manual-entry mode and works normally.

## Print Layouts

| Option | Description |
| --- | --- |
| **Single A4** | One copy per portrait A4 sheet |
| **Standalone A5** | Output on A5 paper |
| **Two A5 on A4** | Landscape A4 with two A5 copies side by side and a center cut line |

Every page-separation toggle works the same way: **on = its own page, off = merged with the other networks**.

| Toggle | Default | Behavior |
| --- | --- | --- |
| Separate all networks | Off | Each enabled network gets its own page; the MLO and guest toggles are disabled while this is on |
| Separate MLO | Off | Lets you hand out the MLO network to specific devices or people |
| Separate guest network | On | Guest network is printed on a separate page from internal networks by default |

The two-A5 layout prints two identical copies on one landscape A4 sheet, which you cut into two A5 sheets. The summary on the right lists the actual number of sheets and the networks on each. Print arrangement does not change any access settings on your router.

When printing, turn off the browser's headers and footers, select the matching paper size, set scale to 100%, and keep your printer's printable margins in mind.

## PNG Share Images

Choose a network under **Share Image** on the right to download it. Only networks that are enabled and have both an SSID and a password can be downloaded; this is independent of the print grouping settings.

- **Size:** 1200 × 1600, 3:4 portrait.
- **Style:** iPhone-style rounded card with icon, title, notes, SSID, QR code and password.
- **Text:** SSID and password use JetBrains Mono; long text wraps or shrinks automatically.
- **QR code:** Uses the current error correction level with a four-module white quiet zone; the PNG does not overlay the center icon.
- **File name:** `WiFi-<title>-<SSID>-<band>.png`. Empty parts, duplicate parts and invalid characters are skipped, e.g. `WiFi-MeetingRoom-Office-5G.png`.

Images contain the network password, so share them only with people who should have access.

## PWA and Offline Use

`manifest.webmanifest` defines the app name, 192/512 icons and standalone display mode; `sw.js` caches the core app files.

- After the first online visit and once the Service Worker has finished caching, you can generate, preview, print and export PNGs offline.
- The **Install** button in the header appears only when the browser fires `beforeinstallprompt` and the app is not already running standalone. The app never shows an install prompt on its own.
- Browsers without this event do not show the button; use the browser's own "Add to Home Screen" feature if available.
- The QR code library is bundled with the project and does not rely on a CDN. Google Fonts still require a network connection; offline, system fallback fonts may be used.
- `config.js` is not cached by the Service Worker. Offline, the app uses saved data or manual input.
- After changing any cached file, bump the cache version in `sw.js`. The new Service Worker usually takes over after old tabs are closed.

## Languages

The interface supports Traditional Chinese, Simplified Chinese, English, Japanese, Korean, French, German and Spanish. On first visit it follows browser language preferences, with English as the fallback. The language menu remembers manual choices locally. Print hints, summaries and PNG labels follow the selected language; user-entered SSIDs, passwords, titles and notes are preserved.

## Project Structure

```text
wifi-qr-code-generator/
├── index.html              # Main page
├── manifest.webmanifest    # PWA name, icons and launch settings
├── sw.js                   # Offline cache
├── config.js               # Local config (excluded by .gitignore)
├── LICENSE
├── README.md               # English documentation (primary)
├── README.zh-TW.md         # Traditional Chinese documentation
└── src/
    ├── assets/             # Logo, ICO and PWA icons
    ├── vendor/             # Bundled qrcodejs, SheetJS and licenses
    ├── css/
    │   ├── base.css        # Global variables, fonts and colors
    │   ├── layout.css      # Main layout
    │   ├── control.css     # Forms and controls
    │   ├── workspace.css   # Workspace and preview area
    │   ├── print-page.css  # Print page styles
    │   └── responsive.css  # Responsive breakpoints
    └── js/
        ├── main.js         # Entry point and event binding
        ├── i18n.js         # UI translations and language detection
        ├── elements.js     # DOM element references
        ├── state.js        # State, localStorage and config.js loading
        ├── validate.js     # Input validation
        ├── ui.js           # UI updates
        ├── qr.js           # QR code generation
        ├── print-layout.js # Print grouping, summary and preview scaling
        ├── download.js     # 3:4 PNG rendering and file naming
        ├── profiles.js     # Named settings, manager table and record inspector
        ├── profiles-csv.js # Full CSV backup, parsing and validation
        ├── profiles-import.js # Excel / Numbers import and worksheet selection
        └── pwa.js          # Install button and Service Worker registration
```

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no framework, no build step
- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)** — QR code generation (bundled at `src/vendor/qrcode.min.js`; license in `src/vendor/qrcode.LICENSE`)
- **[Google Fonts](https://fonts.google.com/)** — Outfit, Noto Sans TC, JetBrains Mono

## Privacy and Security

- 🔒 SSIDs and passwords are processed only in your browser and are **never sent to any server**.
- 💾 `localStorage` data stays in the current browser and is not synced to the cloud.
- 🙈 `config.js`, PDFs, `exports/` and some legacy PNG file name patterns are listed in `.gitignore`. New `WiFi-*.png` files saved to the project root are **not** ignored automatically; download them outside the project or into `exports/`.
- ⚠️ On shared computers, click **Clear Memory** after use to remove saved data.

> [!WARNING]
> Passwords are stored in plain text in `localStorage`. Do not use auto-save on untrusted devices.

## Browser Support

Use a recent version of Chrome, Edge, Firefox or Safari. Core features rely on Canvas, web fonts and browser printing; PWA installation and standalone mode vary by browser and platform.

JavaScript syntax, the manifest, icon sizes and the cache list have been checked. Real-world installation, offline behavior and printing on different devices still need verification.

## Contributing

Issues and pull requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feat/your-feature`
5. Open a pull request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages (e.g. `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).

## License

Distributed under the [MIT License](LICENSE).

Copyright © 2026 Bruce Yang

## Saved WiFi manager

Use **Save current settings** and enter a required name such as Office, Home or Shop. Each saved set includes raw network fields, passwords, title, notes, paper layout, grouping and QR error correction. Saving an existing name explicitly updates that set.

**Manage saved WiFi** replaces the center print workspace with a Numbers-style searchable and sortable table. **Load and preview** restores a set and returns to printing. Loading and deletion offer a one-step undo. Removing the current auto-saved draft does not delete saved sets.

Export every set as a UTF-8 CSV full backup that opens in Numbers or Excel, then import it on another browser or device. Imports support CSV, Excel (.xlsx/.xls, including the .xlx extension alias) and Numbers (.numbers). When a workbook has multiple sheets or tables, choose one in the styled worksheet dialog, review the masked preview and confirm. Cancelling does not import anything. JSON import is not supported. Each set uses four rows to preserve active and inactive networks, original passwords, band steering, titles, notes, print options, IDs and timestamps. General CSV files need at least ssid and password columns; optional name and band columns group the imported networks. Imports preserve existing sets, skip identical name/content pairs and rename name collisions. Invalid files leave existing records unchanged (CSV up to 2 MB; Excel/Numbers up to 10 MB; 200 sets total).

Saved sets exist only in this browser's localStorage and contain plaintext WiFi passwords. Clearing cookies and site data, resetting or uninstalling the browser may remove all records. Export your own backup first and store it securely. Backups are not uploaded to a server; generated WiFi-Profiles-*.csv files are ignored by Git.

In management mode, the right panel shows the selected record’s full parameters instead of print settings. Passwords are masked until explicitly revealed. CSV parsing supports commas, semicolons and tabs, quoted newlines and doubled quotes; exported formula-like cells are escaped and restored on import.

Spreadsheet parsing uses locally bundled [SheetJS CE 0.20.3](https://docs.sheetjs.com/docs/miscellany/formats/) (Apache-2.0; see src/vendor/xlsx.LICENSE), including Numbers table extraction. Files are processed locally and never uploaded. Use text-formatted SSID/password cells to preserve leading zeros.

CSV column headings follow the selected interface language. Imports recognize headings from all eight supported languages, English field keys and mixed-language headers, regardless of the current interface language. This also applies when a CSV backup is saved as Excel and imported again.

Internal notes (up to 2,000 characters) are for management only. They are saved locally and included in full CSV backups, but excluded from printouts, PNG images and QR payloads. On phones, the interface prioritizes network name, password, printing and PNG downloads; network management and print options can be expanded when needed. Fresh blank phone sessions start with one enabled network.

Downloads now offer a 1200×1600 share-card PNG, a transparent 1200×1200 QR-only PNG, SVG, and EPS. Vector exports contain only black QR modules with a four-module transparent quiet zone. EPS uses CMYK 0/0/0/100, closed integer-coordinate rectangle subpaths, one combined fill, no strokes and no white background. Use artwork exports on a light surface. Phones show the two PNG choices by default; vector choices are opt-in. A bottom tab bar links input, downloads and preview, with a saved full/simple mode toggle.
