# WiFi QR Code 產生器

純前端網頁應用，為辦公室或個人環境產生 WiFi 連線 QR Code，支援多頻段、智慧混合（Band Steering）及訪客網路，列印輸出為 A4 直式。

## 功能特色

- **多頻段支援**：2.4 GHz、5 GHz、MLO、訪客網路，各自獨立開關
- **智慧混合（Band Steering）**：開啟後 2.4 / 5 GHz 合併為單一 QR Code
- **密碼模式**：共用密碼或各頻段分開設定
- **即時預覽**：右側同步顯示 A4 列印版面，所見即所得
- **列印 / PDF 輸出**：內建 A4 列印樣式，密碼顯示於各卡片下方
- **本地設定檔**：透過 `config.js` 預填 SSID 與密碼，不提交至 Git
- **零依賴後端**：純 HTML / CSS / JS，直接開啟 `index.html` 即可使用

## 快速開始

### 1. 直接使用（手動輸入）

用瀏覽器開啟 `index.html`，在左側控制面板輸入 SSID 與密碼，按「產生 QR Code」。

### 2. 使用設定檔（推薦）

在專案根目錄建立 `config.js`（已列入 `.gitignore`，不會進版本控制）：

```js
// config.js — 本機使用，不提交至 Git

window.WIFI_CONFIG = Object.freeze({
    companyName: "MyCompany",
    bandSteering: true,          // 2.4 / 5 GHz 智慧混合

    net24: Object.freeze({
        ssid: "Company-Office",
        password: ""             // 填入實際密碼
    }),
    net5: Object.freeze({
        ssid: "Company-Office",  // Band Steering 時與 2.4 GHz 相同
        password: ""
    }),
    // mlo: Object.freeze({ ssid: "Company-MLO", password: "" }),
    guestNet: Object.freeze({
        ssid: "Company-Guest",
        password: ""
    })
});
```

重新整理頁面後自動套用。若 `config.js` 不存在則退回手動輸入模式，不影響使用。

## 專案結構

```text
wifi_qr_code_generator/
├── index.html
├── config.js              ← 本機設定（.gitignore 排除）
├── src/ㄇ
│   ├── css/
│   │   ├── base.css       — 變數、reset、body、hero
│   │   ├── layout.css     — workspace、panels、preview stage
│   │   ├── control.css    — 控制面板、輸入、開關、按鈕
│   │   ├── print-page.css — 列印頁面卡片、密碼、頻段說明
│   │   └── responsive.css — 響應式 + @media print
│   └── js/
│       ├── elements.js    — DOM 元素參考
│       ├── state.js       — config / 狀態 getters
│       ├── ui.js          — 畫面更新
│       ├── qr.js          — QR Code 產生
│       ├── validate.js    — 欄位驗證
│       └── main.js        — 事件綁定、init
└── README.md
```

## 技術堆疊

| 項目 | 說明 |
| --- | --- |
| HTML5 / CSS3 / Vanilla JS | 無框架，無建置工具 |
| [qrcode.js](https://davidshimjs.github.io/qrcodejs/) | 前端 QR Code 產生 |
| [Outfit](https://fonts.google.com/specimen/Outfit) | UI 字體 |
| [Fraunces](https://fonts.google.com/specimen/Fraunces) | 列印標題 / 密碼字體 |

## 安全性

- 密碼只在本機瀏覽器處理，不傳送至任何伺服器
- `config.js` 已列入 `.gitignore`，防止密碼誤提交至版本控制

## 授權

MIT — 詳見 [LICENSE](LICENSE)
