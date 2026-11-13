# WiFi QR Code Generator

[English](README.md) | **繁體中文**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://bruce-yang-422.github.io/wifi-qr-code-generator/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)

> 純前端 WiFi QR Code 產生與常用網路管理工具，支援 CSV 備份、Excel／Numbers 匯入、A4／A5／PDF 列印，以及分享 PNG、純 QR PNG／SVG／EPS，提供八語系、手機操作優化與 PWA 離線使用，不需建置。

**[🌐 線上試用](https://bruce-yang-422.github.io/wifi-qr-code-generator/)** · **[🐛 回報問題](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues)** · **[💡 功能建議](https://github.com/bruce-yang-422/wifi-qr-code-generator/issues/new)**

---

## 目錄

- [簡介](#簡介)
- [功能特色](#功能特色)
- [快速開始](#快速開始)
- [使用說明](#使用說明)
- [設定檔 `config.js`](#設定檔-configjs)
- [列印版面](#列印版面)
- [常用 WiFi 管理](#常用-wifi-管理)
- [CSV 備份與試算表匯入](#csv-備份與試算表匯入)
- [下載與美術輸出](#下載與美術輸出)
- [手機操作與系統適應](#手機操作與系統適應)
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

SSID 與密碼在本機瀏覽器產生 QR Code，不會由應用程式上傳。桌面採 Apple 風格三欄：左側設定網路、中間預覽紙張、右側列印與下載；管理模式則以中間表格與右側完整參數取代預覽及列印設定。全頁自然展開，以頁面捲動查看內容。

## 功能特色

| 類別 | 說明 |
| --- | --- |
| 📶 **多網路支援** | 2.4 GHz、5 GHz、MLO（Wi-Fi 7 多鏈路）、訪客網路，各自可獨立開關 |
| 🔀 **智慧混合 (Band Steering)** | 2.4／5 GHz 合併為單一 SSID 與密碼，只產生一個 QR Code |
| 🔑 **彈性密碼模式** | 內部網路可共用同一密碼或分開設定；訪客網路使用獨立密碼 |
| 📝 **自訂標題與備註** | 可加入 WiFi 標題及說明文字（開放時間、使用範圍等） |
| 👀 **即時預覽** | 輸入內容即時反映在右側列印預覽 |
| 🌐 **8 種語言** | 繁體中文、簡體中文、英文、日文、韓文、法文、德文、西班牙文 |
| 🖨️ **多種列印版面** | A4 單張、A5 單張、A4 橫向印兩份 A5（含裁切線） |
| 🗂️ **分頁排列** | 內部網路可合併或逐一分頁；MLO 與訪客網路可獨立成頁 |
| 💾 **自動記憶** | 目前輸入、內部備註、網路開關、列印安排與容錯率會自動記憶；命名的常用設定需明確儲存 |
| 🖼️ **下載格式** | 分享 PNG、透明純 QR PNG、SVG 及 K100 EPS |
| 🗃️ **常用 WiFi** | 命名儲存、表格搜尋、完整參數、CSV 備份及 Excel／Numbers 匯入 |
| 📱 **手機操作** | 底部分頁列、完整版切換、系統輸入與圖片分享優化 |
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
5. 已填完整的網路會獨立更新 QR Code；其中一組未填完整不會清除其他組。點選 **「檢查並預覽」** 會檢查欄位，並以文字指出第一個未填的欄位。密碼不在 WPA 規定的 8～63 個字元內時會顯示提醒，以免裝置無法連線。
6. 於右側選擇紙張、獨立列印開關與容錯率，參考列印摘要後列印或下載 PNG。列印前仍需補齊或關閉未完成的網路。

> [!TIP]
> 點選控制面板底部的 **清除目前記憶**，只會移除目前輸入的自動記憶，命名的常用 WiFi 設定仍會保留。

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
| **A5 單張** | 每張直式 A5 放一份內容 |
| **A4 印兩份 A5** | A4 橫向，左右各一份 A5，中央附裁切線 |

獨立列印開關一律「開啟＝獨立一張，關閉＝隨其他網路合併」。

| 開關 | 預設 | 行為 |
| --- | --- | --- |
| 所有網路各自獨立 | 關 | 開啟後每個啟用的網路各自成頁，MLO 與訪客個別開關暫停操作 |
| MLO 獨立列印 | 關 | 可將 MLO 分開提供給特定裝置或使用對象 |
| 訪客網路獨立列印 | 開 | 預設與內部網路分頁 |

雙 A5 是在一張橫向 A4 上印兩份相同內容，裁開後得到兩張 A5。右側摘要會列出實際紙張數及每張包含的網路。列印安排不會修改路由器的權限設定。

列印時關閉瀏覽器「頁首與頁尾」，紙張選擇對應尺寸，縮放設為 100%，並注意印表機的可列印邊界。

## 常用 WiFi 管理

按 **儲存目前設定** 後必須輸入名稱，例如「公司網路」、「家裡網路」、「1樓門市」或「辦公室A」。若同名設定已存在，確認按鈕會顯示 **更新同名設定**。

按 **管理常用 WiFi**，中間列印預覽會切換成 Numbers 風格表格。可依名稱、SSID 或內部備註搜尋，依名稱或更新時間排序；點選一列後，右欄顯示完整參數。密碼預設遮蔽，可主動顯示。**載入並預覽** 會套用設定並返回列印；載入與刪除均提供單步還原。

每組保存網路欄位原始值、密碼、標題、公開備註、內部備註、紙張、分頁與容錯率。內部備註最多 2,000 字，會包含在備份內，但不加入列印、PNG 或 QR 內容。

目前自動記憶與命名的常用設定分開保存。**清除目前記憶** 只清除目前輸入的自動記憶，不會刪除常用設定；要更新常用設定，請用相同名稱再次儲存。

## CSV 備份與試算表匯入

**匯出 CSV 完整備份** 會下載含 BOM 的 UTF-8 CSV，可用 Numbers／Excel 開啟。每組使用四列，完整保留啟用與未啟用的網路、原始密碼、智慧混合、備註、列印參數、識別碼與更新時間。

欄位標題跟隨目前語言，匯入可辨識八語系標題、英文鍵名與混合語言標題。「文字保護標記」是備份用的內部資訊，避免試算表把密碼等內容當成公式，匯入時會還原原始文字；請保留此欄位。

**匯入檔案** 支援：

| 格式 | 處理方式 |
| --- | --- |
| `.csv` | 上限 2 MB；支援逗號、分號、Tab 分隔，以及引號、逗號與換行內容 |
| `.xlsx`、`.xls`、`.xlx` | Excel 上限 10 MB；`.xlx` 視為容許的副檔名別名 |
| `.numbers` | Numbers 上限 10 MB；各資料表可能分別列為可選工作表 |

有多個工作表時，必須先選頁、查看遮蔽密碼的預覽，再確認匯入。取消不會匯入。一般檔案至少需有 `ssid`、`password` 或對應語言欄位；另可用 `name`、`band` 指定設定名稱與頻段。試算表中的 SSID／密碼建議使用文字格式，以保留開頭的 0。

匯入會保留既有紀錄、略過相同名稱與內容，遇到同名不同內容則加上編號。無效檔案不會更動原紀錄。最多保存 200 組；選取的工作表最多 800 筆資料、64 欄。

> [!WARNING]
> 紀錄與明文密碼只存在此瀏覽器的 localStorage。清除 Cookie 與網站資料、重設或移除瀏覽器，可能一併刪除紀錄。請先自行匯出備份並妥善保管；本工具沒有雲端同步或伺服器備份。

## 下載與美術輸出

下載不受列印分頁安排影響；需先啟用網路並填妥 SSID 與密碼。

| 選項 | 內容 | 用途 |
| --- | --- | --- |
| **分享 PNG** | 1200 × 1600、3:4 資訊卡，包含 Logo、標題、公開備註、SSID、QR Code 與密碼 | 傳送至 LINE 等 App |
| **純 QR PNG** | 1200 × 1200 透明底，黑格以整數像素繪製 | 美術排版 |
| **SVG** | 純黑 QR 向量幾何、透明底 | 可縮放的設計素材 |
| **EPS** | CMYK 0/0/0/100（K100），整數座標封閉矩形子路徑、合併填色 | 海報與印刷製作 |

SVG／EPS 不含點陣圖、字型、Logo、描邊或白底物件，並預留四格淨空。透明素材請放在淺色背景，保留周圍淨空。全部格式沿用目前容錯率，純 QR 檔不覆蓋中央圖示。所有輸出皆不包含內部備註。

分享卡檔名為 `WiFi-標題-SSID-頻段.png`；純 QR 檔名為 `WiFi-標題-SSID-頻段-QR.png`、`.svg` 或 `.eps`，自動略過空白、重複片段及非法字元。圖片與 QR Code 可讓他人取得連線資訊，請依實際權限分享。

## 手機操作與系統適應

手機預設為精簡流程：網路名稱、密碼、產生、列印與 PNG 下載。新的空白手機設定只啟用單一網路；更多網路、常用設定與列印參數可按需展開。

底部固定選單提供 **輸入、下載、預覽** 及 **完整版／精簡版** 切換，會記住模式且保留目前資料。各種螢幕預設只顯示兩種 PNG；SVG／EPS 請在下載清單上方開啟 **「顯示向量下載（SVG／EPS）」**，選擇會被記住。完整版則顯示全部控制項。

程式以瀏覽器提示輔助辨識 iOS／iPadOS、Android，包含 iPad 桌面模式；實際功能依瀏覽器能力決定：

- 支援的手機瀏覽器按 **分享 PNG** 後，先準備圖片，再由使用者按 **開啟系統分享**，另保留 PNG 下載。取消系統分享不會自動下載。
- SSID／密碼關閉自動更正與首字大寫；SSID 的 Enter 跳至對應密碼，輸入法組字不觸發 QR 產生。
- 底部選單預留螢幕安全區，偵測到螢幕鍵盤時收起。
- iOS 保持簡潔底部分頁列；Android 使用小型選中圖示提示並增加觸控範圍。

瀏覽器隱私設定或桌面模式可能影響系統辨識；未辨識或不支援的環境保留一般下載及響應式操作。

## PWA 與離線使用

`manifest.webmanifest` 提供應用程式名稱、192／512 圖示與獨立視窗模式，`sw.js` 快取應用程式核心檔案。

- 首次連網開啟並完成 Service Worker 快取後，可離線產生、管理、預覽、列印、匯入本機檔案及下載美術素材。
- 支援安裝事件的瀏覽器提供頁首「安裝」按鈕；iOS 安全網站則在點按按鈕後顯示 Safari 加入主畫面指引，不自動彈出安裝提醒。
- 其餘未提供安裝事件的瀏覽器不顯示按鈕，可使用瀏覽器內建的加入主畫面功能（若支援）。
- QR Code 套件隨專案提供，不依賴 CDN；Google Fonts 仍需網路，離線時可能使用系統替代字體。
- `config.js` 不納入 Service Worker 快取。離線時使用已保存的資料或手動輸入。
- 修改快取檔案後需更新 `sw.js` 的快取版本；新 Service Worker 通常會在舊分頁關閉後接手。

## 多國語言

支援繁體中文、簡體中文、英文、日文、韓文、法文、德文及西班牙文。首次依瀏覽器語言偏好自動選擇，不支援的語言回退至英文。頁首語言選單可手動切換並在本機記憶選擇。列印提示、摘要與 PNG 標籤同步切換；使用者輸入的 SSID、密碼、標題及備註保持原樣。

每種語言都有獨立網址，例如 `?lang=ja`、`?lang=zh-TW`（不分大小寫）。用 `?lang=` 連結開啟時只套用該語言，不會改變已記住的偏好；從選單切換語言時，網址會同步更新，方便直接分享。頁面為八種語言宣告 `hreflang`，並以自動偵測語言的網址作為 `x-default`；每種語言各自設定 canonical，所有網址都列在 `sitemap.xml`（可提交至 Google Search Console）。社群分享預覽使用 1200×630 的 `src/assets/og-image.png`。

## 專案結構

```text
wifi-qr-code-generator/
├── index.html              # 主頁面
├── manifest.webmanifest    # PWA 名稱、圖示與啟動設定
├── sw.js                   # 離線快取
├── sitemap.xml             # 各語言網址與 hreflang 對應
├── config.js               # 本機設定檔（已被 .gitignore 排除）
├── LICENSE
├── README.md               # 英文說明（主要）
├── README.zh-TW.md         # 繁體中文說明
└── src/
    ├── assets/             # Logo、ICO、PWA 圖示與 1200×630 社群分享圖
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
        ├── platform.js     # 系統辨識、輸入優化與圖片分享
        ├── mobile-ui.js    # 手機排版、底部分頁與模式切換
        ├── vector-export.js # 整數模組 SVG／K100 EPS
        ├── download.js     # 分享、純 QR PNG 與向量下載
        ├── profiles.js     # 命名設定、管理表格與詳細資料
        ├── profiles-csv.js # CSV 完整備份與格式檢查
        ├── profiles-import.js # Excel／Numbers 匯入及工作表選擇
        └── pwa.js          # 安裝入口與 Service Worker 註冊
```

## 技術堆疊

- **HTML5／CSS3／Vanilla JavaScript**：無框架、無建置流程
- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)**：QR Code 產生（本機 `src/vendor/qrcode.min.js`，授權見 `src/vendor/qrcode.LICENSE`）
- **[SheetJS CE 0.20.3](https://docs.sheetjs.com/docs/miscellany/formats/)**：本機 Excel／Numbers 解析，Apache-2.0 授權見 `src/vendor/xlsx.LICENSE`
- **[Google Fonts](https://fonts.google.com/)**：Outfit、Noto Sans TC、JetBrains Mono

## 隱私與安全性

- 🔒 SSID 與密碼僅在本機瀏覽器處理，**不會傳送至任何伺服器**。
- 💾 `localStorage` 資料僅存於目前的瀏覽器，不會同步至雲端。
- 🙈 `config.js`、PDF、`exports/` 與部分舊版 PNG 檔名模式已列入 `.gitignore`。新版 `WiFi-*.png` 若存入專案根目錄不會自動忽略，建議下載至專案外或 `exports/`。
- ⚠️ 公用電腦使用後請清除目前記憶並刪除常用設定；**清除目前記憶** 不會刪除命名設定。

> [!WARNING]
> `localStorage` 中的密碼以明文保存。請勿在不信任的裝置上使用自動記憶功能。

## 瀏覽器支援

建議使用近期版本的 Chrome、Edge、Firefox 或 Safari。基本功能依賴 Canvas、Web Fonts 與瀏覽器列印；PWA 安裝入口與獨立視窗支援依瀏覽器及平台而異。

已檢查語法、HTML、資源、八語系資料往返、試算表選頁匯入、390px 手機流程、實際圖片下載與向量幾何。系統分享／安裝以瀏覽器模擬驗證；實際 iOS／Android 分享面板、印表機輸出及美術軟體 EPS 匯入仍需實機確認。

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
