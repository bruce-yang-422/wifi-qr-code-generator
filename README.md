# Yichai WiFi QR Code 生成器 📶

一個簡單、優雅且現代化的網頁應用程式，用於生成並分享 Yichai 辦公室網路的 WiFi QR Code。

## 核心特色 ✨

- **預設網路清單**：快速生成訪客、辦公室及老闆專用網路的 QR Code。
- **即時生成**：輸入密碼即可立即獲得可掃描的 QR Code。
- **精美設計**：現代化、俐落的介面，結合毛玻璃（Glassmorphism）特效與動態漸層。
- **支援下載分享**：可匯出高畫質、設計精美且適合手機瀏覽的圖片 (1080x1920) ，方便於通訊軟體中快速分享。
- **支援列印**：內建列印專用樣式，可輕鬆印出乾淨、高對比的實體 QR Code 供辦公室擺放。

## 網路列表 🌐

1. **訪客網路**
   - SSID: `Yichai-Guest`
2. **辦公室網路**
   - SSID: `Yichai-Office`
3. **老闆辦公室**
   - SSID: `Yichai-Jimmy-Office`

## 使用方式 🚀

1. 使用任何現代化的網頁瀏覽器開啟 `index.html`。
2. 找到您想要分享的網路對應卡片。
3. 在輸入框中輸入目前的 WiFi 密碼。
4. 點擊 **生成 QR Code** 或按 `Enter` 鍵。
5. QR Code 生成後，您可以：
   - 讓他人直接掃描螢幕上的條碼。
   - 點擊 **📥 下載圖片** 儲存帶有專屬設計風格、便於分享的圖片檔案。
6. 若需實體展示，可使用頁面底部的 **🖨️ 列印所有 QR Codes** 按鈕直接列印。

## 技術堆疊 🛠️

- HTML5 / CSS3 / 原生 JavaScript (Vanilla JS)
- **字體設計**：引入 [Outfit](https://fonts.google.com/specimen/Outfit) 與 [Space Mono](https://fonts.google.com/specimen/Space+Mono) 雙字體。
- **第三方套件**：使用 [qrcode.js](https://davidshimjs.github.io/qrcodejs/) 於前端純文字產生 QR Code。

## 授權條款 📄

本專案採用 MIT 授權條款 - 詳情請參閱 [LICENSE](LICENSE) 檔案。
