# WiFi QR Code 產生器

[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

純前端網頁工具，用來產生 `2.4 GHz`、`5 GHz`、`MLO` 三組 WiFi QR Code，並即時預覽 A4 列印版面。

🌐 **[立即使用](https://bruce-yang-422.github.io/wifi-qr-code-generator/)** | 📚 **[GitHub 倉庫](https://github.com/bruce-yang-422/wifi-qr-code-generator)**

## ✨ 設計風格

採用 **macOS Big Sur+ 設計語言**：
- **毛玻璃效果** (Glassmorphism)：半透明面板搭配背景模糊
- **流暢動畫**：按鈕互動、開關切換的細膩過渡
- **系統字體**：使用 SF Pro Display (macOS 原生字體) 降級至 SF Pro Rounded
- **Traffic Lights**：仿 macOS 視窗控制按鈕 (紅、黃、綠)
- **色彩系統**：淡藍漸層背景、柔和陰影、精準的色彩層級

## 🎯 功能特色

- **三組網路支援**：同時管理 `2.4 GHz`、`5 GHz`、`MLO`
- **密碼模式切換**：可選擇三組網路共用同一密碼，或分開設定各自密碼
- **即時預覽**：左側輸入後，右側 A4 預覽會同步更新名稱與密碼資訊
- **QR Code 生成**：按下按鈕後一次產生三組 QR Code
- **列印 / PDF 輸出**：內建 A4 直式列印樣式，可直接列印或另存 PDF
- **本機設定檔**：支援 `config.js` 預填 SSID 與密碼，避免每次手動輸入
- **純前端**：不需要後端或建置工具，直接開啟 `index.html` 即可使用
- **響應式設計**：支援桌面與平板裝置的自適應版面

## 使用方式

### 1. 直接使用

1. 用瀏覽器開啟 `index.html`
2. 輸入 `2.4 GHz`、`5 GHz`、`MLO` 三組 SSID
3. 選擇密碼要 `相同` 或 `分開設定`
4. 輸入密碼後按下「產生 QR Code」
5. 需要輸出時按「列印 / 儲存為 PDF」

### 2. 使用本機設定檔

在專案根目錄建立 `config.js`，此檔案已列入 `.gitignore`，不會進版本控制。

範例：

```js
// config.js
// 本機使用，不提交至 Git

window.WIFI_CONFIG = Object.freeze({
    guest: Object.freeze({
        ssid: "Company-2.4G",
        password: ""
    }),
    office: Object.freeze({
        ssid: "Company-5G",
        password: ""
    }),
    mlo: Object.freeze({
        ssid: "Company-MLO",
        password: ""
    })
});
```

規則：

- 若三組密碼相同，畫面會自動以「密碼相同」模式載入
- 若任兩組以上密碼不同，畫面會自動切換成「分開設定」模式
- 若 `config.js` 不存在，系統會退回手動輸入模式

## 專案結構

```text
wifi-qr-code-generator/
├── index.html              # HTML 頁面與結構
├── config.js               # 本機設定（.gitignore 排除）
├── README.md
├── LICENSE
├── .gitignore
└── src/
    ├── css/
    │   ├── base.css        # 根樣式、字型、配色
    │   ├── layout.css      # 主佈局、面板設計
    │   ├── control.css     # 輸入控制項樣式
    │   ├── print-page.css  # 列印頁面樣式
    │   └── responsive.css  # 響應式設計
    └── js/
        ├── main.js         # 應用程式進入點
        ├── elements.js     # DOM 元素選擇器
        ├── state.js        # 狀態管理
        ├── validate.js     # 驗證邏輯
        ├── ui.js           # UI 更新
        └── qr.js           # QR Code 生成
```

## 技術堆疊

- HTML5
- CSS3
- Vanilla JavaScript
- [qrcode.js](https://davidshimjs.github.io/qrcodejs/)
- [Outfit](https://fonts.google.com/specimen/Outfit)
- [Fraunces](https://fonts.google.com/specimen/Fraunces)

## 安全性

- 密碼只在本機瀏覽器處理，不會傳送到任何伺服器
- `config.js` 已列入 `.gitignore`，避免密碼誤提交

## 授權

MIT，詳見 [LICENSE](LICENSE)
