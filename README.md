# WiFi QR Code Generator

**English** | [繁體中文](README.zh-TW.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Website](https://img.shields.io/badge/demo-wifiqr.stack--base.com-blue?logo=googlechrome&logoColor=white)](https://wifiqr.stack-base.com/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)

> A client-side WiFi QR code generator and saved-network manager. Back up CSV, import Excel/Numbers, print A4/A5/PDF, and export sharing PNGs or QR-only PNG/SVG/EPS artwork. Eight languages, mobile optimizations and offline PWA support; no build step.

**[🌐 Live Demo](https://wifiqr.stack-base.com/)** · **[🐛 Report a Bug](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues)** · **[💡 Request a Feature](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues/new)**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration (`config.js`)](#configuration-configjs)
- [Print Layouts](#print-layouts)
- [Saved WiFi manager](#saved-wifi-manager)
- [CSV backups and spreadsheet imports](#csv-backups-and-spreadsheet-imports)
- [Downloads and artwork](#downloads-and-artwork)
- [Mobile experience and platform behavior](#mobile-experience-and-platform-behavior)
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

QR codes are generated locally in your browser; the app never uploads your SSIDs or passwords. On desktop, the workspace uses an Apple-style three-column layout: network settings, paper preview, and print/download options. Management mode replaces the middle with a table and the right with the selected record inspector. The page expands naturally and scrolls as a whole.

> [!NOTE]
> The interface is available in 8 languages (see [Languages](#languages)). Button names in this README refer to the English UI. UI labels may wrap differently on phones.

## Features

| Category | Description |
| --- | --- |
| 📶 **Multiple networks** | 2.4 GHz, 5 GHz, MLO (Wi-Fi 7 Multi-Link Operation) and guest networks, each toggled independently |
| 🔀 **Band Steering** | Merge 2.4 and 5 GHz into a single SSID and password, producing one QR code |
| 🔑 **Flexible passwords** | Internal networks can share one password or use separate ones; the guest network has its own |
| 📝 **Custom title and notes** | Add a WiFi title and notes (opening hours, coverage area, usage rules, etc.) |
| 👀 **Live preview** | Changes appear instantly in the print preview |
| 🌐 **8 languages** | Traditional Chinese, Simplified Chinese, English, Japanese, Korean, French, German and Spanish |
| 🖨️ **Print layouts** | Single A4, single A5, or two A5 copies on landscape A4 (with a cut line) |
| 🗂️ **Page grouping** | Print internal networks together or one per page; MLO and guest can each get their own page |
| 💾 **Auto-save** | Current inputs, internal notes, network toggles, print arrangement and error correction are remembered locally; named sets are saved explicitly |
| 🖼️ **Downloads** | Share-card PNG, transparent QR-only PNG, SVG and K100 EPS |
| 🗃️ **Saved WiFi** | Named sets, searchable table, full inspector and CSV backup with Excel/Numbers imports |
| 📱 **Mobile workflow** | Fixed bottom tabs, full/simple switch, platform-aware keyboard and image sharing |
| 🎚️ **Error correction** | Switch between L / M / Q / H (default H); the center icon is hidden in the preview below H |
| 📲 **PWA** | An unobtrusive install button on supported browsers; core features work offline once cached |
| ⚙️ **Local config file** | Prefill SSIDs and passwords with `config.js` |
| 📱 **Responsive** | Works on desktop, tablet and mobile |
| 🚀 **Zero build** | No Node.js or bundler needed; just open `index.html` |

## Getting Started

### Online

Visit **<https://wifiqr.stack-base.com/>**.

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
5. Each network's QR code updates on its own as soon as its fields are complete; an incomplete network does not clear the others. Click **Check and preview** to validate all fields: a message names the first missing field. Passwords outside WPA's 8–63 characters show a warning, since devices may fail to connect.
6. In the right panel, choose the paper size, page-separation toggles and error correction level, review the print summary, then print or download PNGs. Any incomplete network must be completed or turned off before printing.

> [!TIP]
> To clear the current auto-saved draft, choose **Clear current data** at the bottom of the control panel. Named WiFi sets are kept.

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
| **Single A5** | One copy per portrait A5 sheet |
| **Two A5 on A4** | Landscape A4 with two A5 copies side by side and a center cut line |

Every page-separation toggle works the same way: **on = its own page, off = merged with the other networks**.

| Toggle | Default | Behavior |
| --- | --- | --- |
| Separate all networks | Off | Each enabled network gets its own page; the MLO and guest toggles are disabled while this is on |
| Separate MLO | Off | Lets you hand out the MLO network to specific devices or people |
| Separate guest network | On | Guest network is printed on a separate page from internal networks by default |

The two-A5 layout prints two identical copies on one landscape A4 sheet, which you cut into two A5 sheets. The summary on the right lists the actual number of sheets and the networks on each. Print arrangement does not change any access settings on your router.

When printing, turn off the browser's headers and footers, select the matching paper size, set scale to 100%, and keep your printer's printable margins in mind.

## Saved WiFi manager

Choose **Save current settings** and enter a required name, such as Office, Home, Shop or Meeting Room A. An existing name changes the confirmation button to **Update existing settings**.

**Manage saved WiFi** replaces the center print preview with a Numbers-style table. Search by name, SSID or internal notes, sort by name or update time, and select a row to view the full settings in the right inspector. Passwords remain masked until you choose to reveal them. **Load and preview** applies the set and returns to printing; loading and deletion offer one-step undo.

Each set preserves the raw network fields, passwords, title, public notes, internal notes, paper layout, page grouping and QR error correction. Internal notes accept up to 2,000 characters and are included in backups, but never appear in printouts, PNGs or QR payloads.

The current auto-saved draft and named sets are separate. **Clear current data** clears only the draft; it does not delete saved sets. To update a saved set, save again with its name.

## CSV backups and spreadsheet imports

**Export full CSV backup** downloads all saved sets as UTF-8 CSV with a BOM, readable in Numbers and Excel. Each set uses four rows so inactive networks and original password fields are preserved alongside band steering, notes, print settings, identifiers and update times.

Column headings follow the selected language. Imports recognize all eight supported languages, English field keys and mixed-language headings. The **Text protection markers** column is internal backup metadata that prevents spreadsheet formulas from interpreting credentials and lets the importer restore their original text; leave it unchanged.

**Import file** accepts:

| Format | Handling |
| --- | --- |
| `.csv` | Up to 2 MB; comma, semicolon or tab delimiters; quoted commas, quotes and newlines |
| `.xlsx`, `.xls`, `.xlx` | Excel workbooks up to 10 MB; `.xlx` is accepted as an extension alias |
| `.numbers` | Numbers workbooks up to 10 MB; each table may appear as a separate selectable sheet |

A workbook with multiple sheets requires an explicit sheet selection, a masked preview and confirmation. Cancelling imports nothing. General files need at least `ssid` and `password` columns or their localized equivalents; optional `name` and `band` columns group networks. Format SSIDs and passwords as text in spreadsheets to retain leading zeros.

Imports keep existing records, skip identical name/content pairs and add numbered suffixes to conflicting names. Invalid files leave records unchanged. The library is limited to 200 sets; selected worksheets are limited to 800 data rows and 64 columns.

> [!WARNING]
> Records and plaintext passwords exist only in the current browser's localStorage. Clearing cookies and site data, resetting or removing the browser can delete them. Export your own backup first and keep it private. There is no cloud sync or server-side backup.

## Downloads and artwork

Downloads are independent of print grouping. Enable a network and complete its SSID and password before downloading.

| Option | Contents | Intended use |
| --- | --- | --- |
| **Share PNG** | 1200 × 1600 (3:4) card with logo, title, public notes, SSID, QR code and password | Messaging apps and phone sharing |
| **QR-only PNG** | 1200 × 1200 transparent image with black modules drawn at integer pixel positions | Artwork and layouts |
| **SVG** | QR-only black vector geometry, transparent background | Scalable artwork |
| **EPS** | QR-only CMYK 0/0/0/100 (K100), closed integer-coordinate rectangle subpaths and a combined fill | Print and poster production |

SVG and EPS contain no image, font, logo, stroke or white background object. They reserve a four-module quiet zone. Place transparent artwork on a light surface and keep that margin clear. All formats use the selected error correction level; QR-only files contain no center icon. Internal notes are excluded from every output.

Share-card filenames use `WiFi-<title>-<SSID>-<band>.png`; QR-only files use `WiFi-<title>-<SSID>-<band>-QR.png`, `.svg` or `.eps`. Empty parts, repeated parts and invalid filename characters are removed. These files grant WiFi access, so choose their recipients accordingly.

## Mobile experience and platform behavior

Phones start in a simplified flow: network name, password, generate, print and PNG downloads. Fresh blank phone sessions enable one network. More networks, saved settings and print options remain available in expandable controls.

The fixed bottom bar provides **Input**, **Downloads**, **Preview** and a full/simple mode switch. Mode preference is remembered without changing entered data. The two PNG choices are shown by default on every screen size; turn on **Show vector downloads (SVG/EPS)** above the download list for SVG/EPS. The choice is remembered. Full mode exposes the complete controls.

The app uses browser hints to recognize iOS/iPadOS and Android, including iPad desktop-mode user agents. Capabilities, not the OS label alone, determine available features:

- On supported mobile browsers, **Share PNG** prepares the image, then offers a fresh-gesture **Open share sheet** button plus a PNG download fallback. Cancelling the system share sheet does not trigger a download.
- SSID and password inputs disable autocorrection and automatic capitalization. Enter on an SSID moves to its password; IME composition does not generate a QR code.
- The bottom bar accounts for screen safe areas and hides when on-screen keyboard use is detected.
- iOS keeps the simple bottom-tab appearance; Android receives a small active-icon indicator and larger touch targets.

UA-based recognition can be affected by browser privacy settings and desktop mode. Unrecognized or unsupported environments retain the regular download workflow and responsive controls.

## PWA and Offline Use

`manifest.webmanifest` defines the app name, 192/512 icons and standalone display mode; `sw.js` caches the core app files.

- After the first online visit and once the Service Worker has finished caching, you can generate, manage, preview, print, import local files and export artwork offline.
- The header **Install** button uses the browser install event where supported. On iOS, a secure website instead provides a Safari Home Screen guide only after the button is clicked. The app never opens install prompts automatically.
- Other browsers without this event keep the button hidden; use their built-in Home Screen feature if available.
- The QR code library is bundled with the project and does not rely on a CDN. Google Fonts still require a network connection; offline, system fallback fonts may be used.
- `config.js` is not cached by the Service Worker. Offline, the app uses saved data or manual input.
- After changing any cached file, bump the cache version in `sw.js`. The new Service Worker usually takes over after old tabs are closed.

## Languages

The interface supports Traditional Chinese, Simplified Chinese, English, Japanese, Korean, French, German and Spanish. On first visit it follows browser language preferences, with English as the fallback. The language menu remembers manual choices locally. Print hints, summaries and PNG labels follow the selected language; user-entered SSIDs, passwords, titles and notes are preserved.

Each language also has its own link, e.g. `?lang=ja` or `?lang=zh-TW` (case-insensitive). A `?lang=` link opens in that language without changing the saved preference; choosing a language from the menu updates the address so it can be shared. The page declares `hreflang` alternates for all eight languages plus an auto-detecting `x-default`, sets a self-referencing canonical per language, and lists every variant in `sitemap.xml` (submit it in Google Search Console). Social previews use the 1200×630 `src/assets/og-image.png`.

## Project Structure

```text
wifi-qr-code-generator/
├── index.html              # Main page
├── manifest.webmanifest    # PWA name, icons and launch settings
├── sw.js                   # Offline cache
├── sitemap.xml             # Language URLs with hreflang alternates
├── robots.txt              # Crawler rules and sitemap location
├── CNAME                   # Custom domain for GitHub Pages
├── config.js               # Local config (excluded by .gitignore)
├── LICENSE
├── README.md               # English documentation (primary)
├── README.zh-TW.md         # Traditional Chinese documentation
└── src/
    ├── assets/             # Logo, ICO, PWA icons and 1200×630 social image
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
        ├── platform.js     # OS hints, keyboard ergonomics and prepared image sharing
        ├── mobile-ui.js    # Phone layout, bottom tabs and full/simple mode
        ├── vector-export.js # Integer-module SVG / K100 EPS
        ├── download.js     # Sharing and QR-only PNG / vector downloads
        ├── profiles.js     # Named settings, manager table and record inspector
        ├── profiles-csv.js # Full CSV backup, parsing and validation
        ├── profiles-import.js # Excel / Numbers import and worksheet selection
        ├── pwa.js          # Install button and Service Worker registration
        └── site-info.js    # Site information and privacy policy dialogs
```

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no framework, no build step
- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)** — QR code generation (bundled at `src/vendor/qrcode.min.js`; license in `src/vendor/qrcode.LICENSE`)
- **[SheetJS CE 0.20.3](https://docs.sheetjs.com/docs/miscellany/formats/)** — local Excel/Numbers parsing; Apache-2.0 license in `src/vendor/xlsx.LICENSE`
- **[Google Fonts](https://fonts.google.com/)** — Outfit, Noto Sans TC, JetBrains Mono

## Privacy and Security

The page footer links to **Site information** (version, last update, author, licences and third-party components) and a **Privacy policy**, both translated into all eight languages. When publishing a release, update `version` and `updated` in `WIFI_SITE_META` at the top of `src/js/site-info.js` (and `privacyUpdated` if the policy changes); keep `softwareVersion` and `dateModified` in the JSON-LD of `index.html` in step.

- 🔒 SSIDs and passwords are processed only in your browser and are **never sent to any server**.
- 💾 `localStorage` data stays in the current browser and is not synced to the cloud.
- 🙈 `config.js`, PDFs, `exports/` and some legacy PNG file name patterns are listed in `.gitignore`. New `WiFi-*.png` files saved to the project root are **not** ignored automatically; download them outside the project or into `exports/`.
- ⚠️ On shared computers, clear the current draft and remove saved sets when finished. **Clear current data** alone does not remove named sets.

> [!WARNING]
> Passwords are stored in plain text in `localStorage`. Do not use auto-save on untrusted devices.

## Browser Support

Use a recent version of Chrome, Edge, Firefox or Safari. Core features rely on Canvas, web fonts and browser printing; PWA installation and standalone mode vary by browser and platform.

Checks cover syntax, HTML, assets, eight-language data round-trips, spreadsheet import and selection, 390px mobile flows, actual image downloads and vector geometry. OS-specific share/install behavior is browser-simulated; physical iOS/Android share sheets, printer output and artwork-editor EPS import still require real-device validation.

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
