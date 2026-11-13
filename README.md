# WiFi QR Code Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://bruce-yang-422.github.io/wifi-qr-code-generator/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)

> 一個純前端、零相依建置的 WiFi QR Code 產生器，支援 2.4 GHz／5 GHz／MLO／訪客網路，並可直接輸出 A4／A5 列印版面或 PDF。

**[🌐 線上試用](https://bruce-yang-422.github.io/wifi-qr-code-generator/)** · **[🐛 回報問題](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues)** · **[💡 功能建議](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues/new)**

---

## 目錄

- [簡介](#簡介)
- [功能特色](#功能特色)
- [快速開始](#快速開始)
- [使用說明](#使用說明)
- [設定檔 `config.js`](#設定檔-configjs)
- [列印版面](#列印版面)
- [專案結構](#專案結構)
- [技術堆疊](#技術堆疊)
- [隱私與安全性](#隱私與安全性)
- [瀏覽器支援](#瀏覽器支援)
- [貢獻](#貢獻)
- [授權](#授權)

## 簡介

在辦公室、店面、會議室或民宿張貼 WiFi 連線資訊時，常需要同時提供多個頻段或訪客網路的 QR Code。本工具讓你在瀏覽器中填入 SSID 與密碼，即時預覽並產生可掃描的 QR Code，直接列印或另存 PDF。

所有資料只在本機瀏覽器處理，**不經過任何伺服器**。

## 功能特色

| 類別 | 說明 |
| --- | --- |
| 📶 **多網路支援** | 2.4 GHz、5 GHz、MLO（Wi-Fi 7 多鏈路）、訪客網路，各自可獨立開關 |
| 🔀 **智慧混合 (Band Steering)** | 2.4／5 GHz 合併為單一 SSID 與密碼，只產生一個 QR Code |
| 🔑 **彈性密碼模式** | 內部網路可共用同一密碼或分開設定；訪客網路使用獨立密碼 |
| 📝 **自訂標題與備註** | 可加入 WiFi 標題及說明文字（開放時間、使用範圍等） |
| 👀 **即時預覽** | 輸入內容即時反映在右側列印預覽 |
| 🖨️ **多種列印版面** | A4 單張、獨立 A5、A4 橫向印兩份 A5（含裁切線） |
| 🗂️ **分頁排列** | 內部網路可合併或逐一分頁；MLO 與訪客網路可獨立成頁 |
| 💾 **自動記憶** | 輸入內容與開關狀態保存在 `localStorage`，下次開啟自動復原 |
| ⚙️ **本機設定檔** | 透過 `config.js` 預填 SSID 與密碼 |
| 📱 **響應式設計** | 支援桌面、平板與手機版面 |
| 🚀 **零建置** | 不需 Node.js 或打包工具，直接開啟 `index.html` 即可使用 |

## 快速開始

### 線上使用

直接前往 **<https://bruce-yang-422.github.io/wifi-qr-code-generator/>**。

### 本機執行

```bash
git clone https://github.com/bruce-yang-422/wifi-qr-code-generator.git
cd wifi-qr-code-generator
```

接著以瀏覽器開啟 `index.html` 即可。

若想透過本機伺服器執行（可選）：

```bash
# Python 3
python -m http.server 8080

# 或 Node.js
npx serve .
```

然後開啟 <http://localhost:8080>。

## 使用說明

1. **（選填）** 輸入 WiFi 標題與說明備註。
2. 開啟需要的網路（2.4 GHz／5 GHz／MLO／訪客），並填入 SSID。
3. **（選填）** 啟用「智慧混合」，讓 2.4／5 GHz 共用同一組 SSID 與密碼。
4. 選擇密碼模式：**共用密碼** 或 **分開設定**。
5. 點選 **「產生 QR Code」**。
6. 於右側選擇紙張與排列方式，點選 **「🖨️ 列印 / 儲存為 PDF」**。

> [!TIP]
> 需要清除瀏覽器中保存的資料時，點選控制面板底部的 **「🗑️ 清除記憶」**。

### QR Code 格式

產生的 QR Code 遵循標準 WiFi 網路設定格式，iOS 11+ 與 Android 10+ 的相機皆可直接掃描連線：

```text
WIFI:T:WPA;S:<SSID>;P:<密碼>;H:false;;
```

SSID 與密碼中的特殊字元（`\`、`;`、`,`、`:`）會自動跳脫。

## 設定檔 `config.js`

若需要經常產生相同網路的 QR Code，可在專案根目錄建立 `config.js` 預先填入資料。此檔案已列入 `.gitignore`，**不會被提交至版本控制**。

```js
// config.js — 僅供本機使用，請勿提交至 Git
window.WIFI_CONFIG = Object.freeze({
    bandSteering: false,           // true：2.4 / 5 GHz 智慧混合
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

### 設定項目

| 鍵值 | 型別 | 說明 |
| --- | --- | --- |
| `bandSteering` | `boolean` | 是否啟用智慧混合，預設 `false` |
| `net24` | `{ ssid, password }` | 2.4 GHz 網路 |
| `net5` | `{ ssid, password }` | 5 GHz 網路 |
| `mlo` | `{ ssid, password }` | MLO 網路 |
| `guestNet` | `{ ssid, password }` | 訪客網路 |

所有欄位皆為選填。

### 載入規則

- **載入優先順序**：`localStorage` → `config.js` → 空白。若瀏覽器已有保存的資料，會優先使用。
- 若 2.4 GHz／5 GHz／MLO 的密碼相同，自動以「共用密碼」模式載入；任兩組不同則切換為「分開設定」。
- 若 `config.js` 不存在，則以手動輸入模式啟動，不影響使用。

## 列印版面

| 選項 | 說明 |
| --- | --- |
| **A4 單張** | 每張 A4 直式放置一份內容 |
| **獨立 A5** | 以 A5 紙張輸出 |
| **A4 印兩份 A5** | A4 橫向，左右各一份 A5，中央附裁切線 |

| 排列 | 選項 |
| --- | --- |
| **內部網路** | 合併列印／每個網路獨立 |
| **MLO** | 隨內部網路合併／獨立一張 |
| **訪客網路** | 單獨一張／隨其他網路合併 |

> [!NOTE]
> 列印時建議在瀏覽器列印對話框中關閉「頁首與頁尾」，並將邊界設為「無」或「預設」以獲得最佳效果。

## 專案結構

```text
wifi-qr-code-generator/
├── index.html              # 主頁面
├── src/assets/wifi-qr-logo.ico  # 瀏覽器圖示
├── src/assets/wifi-qr-logo.png  # 頁面 Logo 與 Apple 觸控圖示
├── config.js               # 本機設定檔（已被 .gitignore 排除）
├── LICENSE
├── README.md
└── src/
    ├── css/
    │   ├── base.css        # 全域變數、字型與配色
    │   ├── layout.css      # 主要版面配置
    │   ├── control.css     # 表單與控制項
    │   ├── workspace.css   # 工作區與預覽區
    │   ├── print-page.css  # 列印頁面樣式
    │   └── responsive.css  # 響應式斷點
    └── js/
        ├── main.js         # 進入點與事件綁定
        ├── elements.js     # DOM 元素參照
        ├── state.js        # 狀態管理、localStorage、config.js 載入
        ├── validate.js     # 輸入驗證
        ├── ui.js           # 畫面更新
        ├── qr.js           # QR Code 產生
        └── print-layout.js # 列印版面分頁與預覽縮放
```

## 技術堆疊

- **HTML5／CSS3／Vanilla JavaScript**：無框架、無建置流程
- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)**：QR Code 產生（透過 cdnjs 載入）
- **[Google Fonts](https://fonts.google.com/)**：Outfit、Noto Sans TC、JetBrains Mono

## 隱私與安全性

- 🔒 SSID 與密碼僅在本機瀏覽器處理，**不會傳送至任何伺服器**。
- 💾 `localStorage` 資料僅存於目前的瀏覽器，不會同步至雲端。
- 🙈 `config.js` 與匯出的 PNG／PDF 已列入 `.gitignore`，避免密碼誤提交。
- ⚠️ 在公用電腦上使用後，請點選 **「清除記憶」** 移除保存的資料。

> [!WARNING]
> `localStorage` 中的密碼以明文保存。請勿在不信任的裝置上使用自動記憶功能。

## 瀏覽器支援

| Chrome | Edge | Firefox | Safari |
| :---: | :---: | :---: | :---: |
| ✅ 最新版 | ✅ 最新版 | ✅ 最新版 | ✅ 最新版 |

## 貢獻

歡迎提交 Issue 與 Pull Request！

1. Fork 本專案
2. 建立功能分支：`git checkout -b feat/your-feature`
3. 提交變更：`git commit -m "feat: add your feature"`
4. 推送分支：`git push origin feat/your-feature`
5. 開啟 Pull Request

Commit 訊息請遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hant/) 規範（例如 `feat:`、`fix:`、`docs:`、`refactor:`、`chore:`）。

## 授權

本專案以 [MIT License](LICENSE) 授權釋出。

Copyright © 2026 Bruce Yang
