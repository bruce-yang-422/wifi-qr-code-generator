# WiFi QR Code Generator

[English](README.md) | **繁體中文**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://bruce-yang-422.github.io/wifi-qr-code-generator/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)

> 一個純前端、零相依建置的 WiFi QR Code 產生器，支援 2.4 GHz／5 GHz／MLO／訪客網路，可輸出 A4／A5 列印版面、PDF 及手機分享用 3:4 PNG，並支援 PWA 離線使用。

**[🌐 線上試用](https://bruce-yang-422.github.io/wifi-qr-code-generator/)** · **[🐛 回報問題](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues)** · **[💡 功能建議](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues/new)**

---

## 目錄

- [簡介](#簡介)
- [功能特色](#功能特色)
- [快速開始](#快速開始)
- [使用說明](#使用說明)
- [設定檔 `config.js`](#設定檔-configjs)
- [列印版面](#列印版面)
- [PNG 分享圖片](#png-分享圖片)
- [PWA 與離線使用](#pwa-與離線使用)
- [多國語言](#多國語言)
- [專案結構](#專案結構)
- [技術堆疊](#技術堆疊)
- [隱私與安全性](#隱私與安全性)
- [瀏覽器支援](#瀏覽器支援)
- [貢獻](#貢獻)
- [授權](#授權)

## 簡介

在辦公室、店面、會議室或民宿張貼 WiFi 連線資訊時，常需要同時提供多個頻段或訪客網路的 QR Code。本工具讓你在瀏覽器中填入 SSID 與密碼，即時預覽並產生可掃描的 QR Code，直接列印或另存 PDF。

SSID 與密碼在本機瀏覽器產生 QR Code，不會由應用程式上傳。桌面採 Apple 風格三欄工作區：左側設定網路、中間預覽紙張、右側安排列印與下載。全頁自然展開，以頁面捲動查看內容。

## 功能特色

| 類別 | 說明 |
| --- | --- |
| 📶 **多網路支援** | 2.4 GHz、5 GHz、MLO（Wi-Fi 7 多鏈路）、訪客網路，各自可獨立開關 |
| 🔀 **智慧混合 (Band Steering)** | 2.4／5 GHz 合併為單一 SSID 與密碼，只產生一個 QR Code |
| 🔑 **彈性密碼模式** | 內部網路可共用同一密碼或分開設定；訪客網路使用獨立密碼 |
| 📝 **自訂標題與備註** | 可加入 WiFi 標題及說明文字（開放時間、使用範圍等） |
| 👀 **即時預覽** | 輸入內容即時反映在右側列印預覽 |
| 🌐 **8 種語言** | 繁體中文、簡體中文、英文、日文、韓文、法文、德文、西班牙文 |
| 🖨️ **多種列印版面** | A4 單張、獨立 A5、A4 橫向印兩份 A5（含裁切線） |
| 🗂️ **分頁排列** | 內部網路可合併或逐一分頁；MLO 與訪客網路可獨立成頁 |
| 💾 **自動記憶** | 網路資料、標題、備註與網路開關保存在 `localStorage`；列印安排與容錯率不保存 |
| 🖼️ **PNG 分享** | 各網路獨立下載 1200 × 1600、3:4 圖片，方便分享到 LINE 等 App |
| 🎚️ **容錯率** | L／M／Q／H 可切換，預設 H；低於 H 時隱藏預覽中的中央圖示 |
| 📲 **PWA** | 支援的瀏覽器提供低調安裝入口；快取完成後可離線使用核心功能 |
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

然後開啟 <http://localhost:8080>。PWA 需透過 HTTPS 或 localhost 使用，直接開啟檔案不會註冊 Service Worker。

## 使用說明

1. **（選填）** 輸入 WiFi 標題與說明備註。
2. 開啟需要的網路（2.4 GHz／5 GHz／MLO／訪客），並填入 SSID。
3. **（選填）** 啟用「智慧混合」，讓 2.4／5 GHz 共用同一組 SSID 與密碼。
4. 選擇密碼模式：**共用密碼** 或 **分開設定**。
5. 已填完整的網路會獨立更新 QR Code；其中一組未填完整不會清除其他組。也可點選 **「產生 QR Code」** 檢查欄位。
6. 於右側選擇紙張、獨立列印開關與容錯率，參考列印摘要後列印或下載 PNG。列印前仍需補齊或關閉未完成的網路。

> [!TIP]
> 需要清除瀏覽器中保存的資料時，點選控制面板底部的 **「🗑️ 清除記憶」**。

### QR Code 格式

產生的 QR Code 使用以下 WiFi 設定格式，支援此格式的手機相機或掃碼工具可辨識；實際連線能力依裝置、系統與網路設定而定：

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

獨立列印開關一律「開啟＝獨立一張，關閉＝隨其他網路合併」。

| 開關 | 預設 | 行為 |
| --- | --- | --- |
| 所有網路各自獨立 | 關 | 開啟後每個啟用的網路各自成頁，MLO 與訪客個別開關暫停操作 |
| MLO 獨立列印 | 關 | 可將 MLO 分開提供給特定裝置或使用對象 |
| 訪客網路獨立列印 | 開 | 預設與內部網路分頁 |

雙 A5 是在一張橫向 A4 上印兩份相同內容，裁開後得到兩張 A5。右側摘要會列出實際紙張數及每張包含的網路。列印安排不會修改路由器的權限設定。

列印時關閉瀏覽器「頁首與頁尾」，紙張選擇對應尺寸，縮放設為 100%，並注意印表機的可列印邊界。

## PNG 分享圖片

在右側「分享圖片」選擇網路下載。僅啟用且 SSID、密碼完整的網路可下載，與列印合併設定無關。

- 尺寸：1200 × 1600，3:4 直式。
- 樣式：iPhone 風格圓角卡片，包含圖示、標題、備註、SSID、QR Code 與密碼。
- 文字：SSID、密碼使用 JetBrains Mono，長文字自動換行或縮字。
- QR Code：沿用目前容錯率，保留四個模組的白色邊界，PNG 不覆蓋中央圖示。
- 檔名：`WiFi-標題-SSID-頻段.png`；略過空白、相同片段與不合法字元，例如 `WiFi-會議室-Office-5G.png`。

圖片包含連線密碼，分享對象應依實際使用權限決定。

## PWA 與離線使用

`manifest.webmanifest` 提供應用程式名稱、192／512 圖示與獨立視窗模式，`sw.js` 快取應用程式核心檔案。

- 首次連網開啟並完成 Service Worker 快取後，可離線產生 QR Code、預覽、列印及匯出 PNG。
- 頁首「安裝」按鈕僅在瀏覽器觸發 `beforeinstallprompt` 且尚未以獨立視窗執行時顯示，不主動彈出安裝提示。
- 未提供此事件的瀏覽器不顯示按鈕，可使用瀏覽器本身提供的加入主畫面功能（若支援）。
- QR Code 套件隨專案提供，不依賴 CDN；Google Fonts 仍需網路，離線時可能使用系統替代字體。
- `config.js` 不納入 Service Worker 快取。離線時使用已保存的資料或手動輸入。
- 修改快取檔案後需更新 `sw.js` 的快取版本；新 Service Worker 通常會在舊分頁關閉後接手。

## 多國語言

支援繁體中文、簡體中文、英文、日文、韓文、法文、德文及西班牙文。首次依瀏覽器語言偏好自動選擇，不支援的語言回退至英文。頁首語言選單可手動切換並在本機記憶選擇。列印提示、摘要與 PNG 標籤同步切換；使用者輸入的 SSID、密碼、標題及備註保持原樣。

## 專案結構

```text
wifi-qr-code-generator/
├── index.html              # 主頁面
├── manifest.webmanifest    # PWA 名稱、圖示與啟動設定
├── sw.js                   # 離線快取
├── config.js               # 本機設定檔（已被 .gitignore 排除）
├── LICENSE
├── README.md               # 英文說明（主要）
├── README.zh-TW.md         # 繁體中文說明
└── src/
    ├── assets/             # Logo、ICO、PWA 圖示
    ├── vendor/             # qrcodejs、SheetJS 本機套件及授權
    ├── css/
    │   ├── base.css        # 全域變數、字型與配色
    │   ├── layout.css      # 主要版面配置
    │   ├── control.css     # 表單與控制項
    │   ├── workspace.css   # 工作區與預覽區
    │   ├── print-page.css  # 列印頁面樣式
    │   └── responsive.css  # 響應式斷點
    └── js/
        ├── main.js         # 進入點與事件綁定
        ├── i18n.js         # 介面翻譯與語言偵測
        ├── elements.js     # DOM 元素參照
        ├── state.js        # 狀態管理、localStorage、config.js 載入
        ├── validate.js     # 輸入驗證
        ├── ui.js           # 畫面更新
        ├── qr.js           # QR Code 產生
        ├── print-layout.js # 列印分組、摘要與預覽縮放
        ├── download.js     # 3:4 PNG 繪製與檔名
        ├── profiles.js     # 命名設定、管理表格與詳細資料
        ├── profiles-csv.js # CSV 完整備份與格式檢查
        ├── profiles-import.js # Excel／Numbers 匯入及工作表選擇
        └── pwa.js          # 安裝入口與 Service Worker 註冊
```

## 技術堆疊

- **HTML5／CSS3／Vanilla JavaScript**：無框架、無建置流程
- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)**：QR Code 產生（本機 `src/vendor/qrcode.min.js`，授權見 `src/vendor/qrcode.LICENSE`）
- **[Google Fonts](https://fonts.google.com/)**：Outfit、Noto Sans TC、JetBrains Mono

## 隱私與安全性

- 🔒 SSID 與密碼僅在本機瀏覽器處理，**不會傳送至任何伺服器**。
- 💾 `localStorage` 資料僅存於目前的瀏覽器，不會同步至雲端。
- 🙈 `config.js`、PDF、`exports/` 與部分舊版 PNG 檔名模式已列入 `.gitignore`。新版 `WiFi-*.png` 若存入專案根目錄不會自動忽略，建議下載至專案外或 `exports/`。
- ⚠️ 在公用電腦上使用後，請點選 **「清除記憶」** 移除保存的資料。

> [!WARNING]
> `localStorage` 中的密碼以明文保存。請勿在不信任的裝置上使用自動記憶功能。

## 瀏覽器支援

建議使用近期版本的 Chrome、Edge、Firefox 或 Safari。基本功能依賴 Canvas、Web Fonts 與瀏覽器列印；PWA 安裝入口與獨立視窗支援依瀏覽器及平台而異。

目前已執行 JavaScript 語法、manifest、圖示尺寸與快取清單檢查；實際瀏覽器安裝、離線流程及各裝置列印仍需驗證。

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

## 常用 WiFi 管理

按 **儲存目前設定** 後必須輸入辨識名稱，例如「公司網路」、「家裡網路」、「1樓門市」、「辦公室A」。每組會保存網路欄位原始值、密碼、標題備註、紙張、分頁安排與 QR 容錯率；同名時會明確顯示「更新同名設定」。

按 **管理常用 WiFi**，中間列印工作區即切換為Numbers 風格的可搜尋、排序管理表格。**載入並預覽** 會還原設定並返回列印；載入與刪除皆提供單步還原。清除目前自動記憶不會刪除常用設定。

可將所有紀錄匯出為 UTF-8 CSV 完整備份，用 Numbers／Excel 開啟，或匯入其他瀏覽器與裝置。匯入支援 CSV、Excel（.xlsx／.xls，另容許 .xlx 副檔名）及 Numbers（.numbers）。多工作表或多資料表會先顯示選擇視窗，選頁後預覽並確認，取消不會匯入。不支援 JSON 匯入。每組使用四列保留啟用及未啟用的網路、原始密碼、智慧混合、標題備註、列印參數、識別碼及更新時間。一般 CSV 至少需有 ssid、password 欄位，另可用 name、band 欄位指定名稱與頻段。匯入會保留原有設定、略過相同名稱與內容的紀錄，同名不同內容則自動加編號。無效檔案不會變更既有紀錄，CSV 限制 2 MB、Excel／Numbers 限制 10 MB，合計最多 200 組。

紀錄只存在此瀏覽器的 localStorage，密碼為明文。清除 Cookie 與網站資料、重設或移除瀏覽器，可能一併移除全部紀錄，請先自行匯出備份並妥善保存。備份不會上傳伺服器，產生的 WiFi-Profiles-*.csv 檔案已加入 Git 忽略規則。

管理模式下，右欄會由列印設定切換成選中紀錄的完整參數；密碼預設遮蔽，可主動顯示。CSV 支援逗號、分號與 Tab 分隔、引號換行及雙引號跳脫；匯出時會處理可能被試算表當成公式的內容，匯入時還原原始值。

試算表解析使用本機 [SheetJS CE 0.20.3](https://docs.sheetjs.com/docs/miscellany/formats/)（Apache-2.0，詳見 src/vendor/xlsx.LICENSE）。檔案在瀏覽器處理，不上傳伺服器。SSID／密碼建議使用文字儲存格，以保留開頭的 0。Numbers 同一頁的多張資料表可能被列為不同的可選工作表。

CSV 欄位標題會跟隨目前介面語言。匯入時可辨識八種語言標題、英文欄位鍵名及混合語言標題，不受目前介面語言影響；CSV 轉存為 Excel 後再次匯入也適用。

內部備註可寫最多 2,000 字，僅供管理；會隨設定保存並包含在 CSV 完整備份，但不加入列印、PNG 或 QR 內容。手機版優先顯示網路名稱、密碼、列印與 PNG 下載，網路管理及列印選項可按需展開；新的空白手機設定預設只啟用單一網路。

下載提供 1200×1600 分享資訊卡 PNG、1200×1200 透明底純 QR PNG、SVG 及 EPS。向量檔只包含黑色 QR 模組並預留四格透明淨空；EPS 使用 CMYK 0/0/0/100，整數座標封閉矩形子路徑、單一合併填色，無描邊與白底。美術檔應放在淺色背景。手機預設顯示兩種 PNG，SVG／EPS 可在進階選項開啟；底部分頁列提供輸入、下載、預覽及完整版／精簡版切換，並記住模式選擇。
