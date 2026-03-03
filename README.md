# Company WiFi QR Code 生成器 📶

一個簡單、優雅且現代化的網頁應用程式，用於生成並分享辦公室網路的 WiFi QR Code。本專案為純前端實作，不需後端，並支援安全性高的本地設定檔機制。

## 核心特色 ✨

- **高度客製化**：可自訂公司名稱、SSID 以及預設密碼。
- **預設網路清單**：內建訪客、辦公室及老闆專用的網路分類卡片。
- **本地安全設定**：支援 `config.js` 設定檔機制，可安全儲存真實密碼而不會被提交至 Git。
- **即時生成**：輸入設定或密碼後，一鍵立即獲得可掃描的 QR Code。
- **精美設計**：現代化、俐落的介面，結合毛玻璃（Glassmorphism）特效與動態漸層。
- **支援下載分享**：可匯出高畫質、設計精美且適合手機瀏覽的圖片 (1080x1920) ，方便於通訊軟體中快速分享。
- **文字渲染**：全面採用開源的「思源黑體 (Noto Sans TC)」，完美支援繁體中文顯示且無版權疑慮。
- **支援列印**：內建列印專用樣式，以 A4 直式滿版排列，並為每組 QR Code 自動加上簡潔獨立的大標題，可輕鬆印出高對比、排版完美的實體公告供辦公室擺放。

## 快速設定 (推薦) ⚙️

為了避免每次都要手打密碼，且防止密碼外洩到版本控制系統，強烈建議使用本地設定檔：

1. 在專案根目錄建立 `config.js` 檔案（此檔案已在 `.gitignore` 中排除）。
2. 將以下格式複製並填入您的真實資料：

```javascript
// config.js
// 本機使用，不提交至 Git

window.WIFI_CONFIG = Object.freeze({
  companyName: "我的公司", // 若無設定，使用者需在網頁手動輸入
  guest: Object.freeze({
    ssid: "Company-Guest",
    password: "" // 填寫訪客網路密碼
  }),
  office: Object.freeze({
    ssid: "Company-Office",
    password: "" // 填寫辦公室網路密碼
  }),
  boss: Object.freeze({
    ssid: "Company-Boss-Office",
    password: "" // 填寫老闆辦公室網路密碼
  })
});
```

設定完成後，再次開啟網頁，系統就會自動套用您的公司名稱、SSID 與對應密碼！

## 使用方式 🚀

1. 使用任何現代化的網頁瀏覽器直接開啟 `index.html`。
2. （如果未設定 `config.js`）在頂部填寫您的**公司/組織名稱**。
3. 找到您想要分享的網路對應卡片。
4. （如果未設定 `config.js`）在輸入框中輸入目前的 WiFi 密碼。
5. 點擊 **生成 QR Code** 或按 `Enter` 鍵。
6. QR Code 生成後，您可以：
   - 讓他人直接掃描螢幕上的條碼。
   - 點擊 **📥 下載圖片** 儲存帶有專屬設計風格、便於分享的圖片檔案。
7. 若需實體展示，可使用頁面底部的 **🖨️ 列印所有 QR Codes** 按鈕直接列印。

## 執行邏輯與安全性 🔒

本系統設計了極高的容錯率與安全性：

- **有 `config.js` 且有填密碼**：自動使用預設密碼，畫面載入即刻完成設定。
- **有 `config.js` 但密碼留空**：自動載入 SSID，但安全性退回由使用者當下手動輸入密碼。
- **無 `config.js` (例如剛 Clone 專案或放置於 GitHub Pages)**：安全退回完全手動模式，程式不會報錯。

## 技術堆疊 🛠️

- HTML5 / CSS3 / 原生 JavaScript (Vanilla JS)
- **字體設計**：引入 [Noto Sans TC](https://fonts.google.com/specimen/Noto+Sans+TC) (思源黑體) 與 [Space Mono](https://fonts.google.com/specimen/Space+Mono) 雙字體。
- **第三方套件**：使用 [qrcode.js](https://davidshimjs.github.io/qrcodejs/) 於前端純文字產生 QR Code。

## 授權條款 📄

本專案採用 MIT 授權條款 - 詳情請參閱 [LICENSE](LICENSE) 檔案。
