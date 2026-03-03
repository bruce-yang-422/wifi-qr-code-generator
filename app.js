const networks = {
    guest: {
        ssid: 'Yichai-Guest', // Default
        passwordId: 'guest-password',
        qrContainerId: 'guest-qr',
        qrCodeId: 'guest-qr-code'
    },
    office: {
        ssid: 'Yichai-Office', // Default
        passwordId: 'office-password',
        qrContainerId: 'office-qr',
        qrCodeId: 'office-qr-code'
    },
    boss: {
        ssid: 'Yichai-Jimmy-Office', // Default
        passwordId: 'boss-password',
        qrContainerId: 'boss-qr',
        qrCodeId: 'boss-qr-code'
    }
};

function getNetworkConfig(type, inputId) {
    const config = window.WIFI_CONFIG || {};

    // 獲取公司名稱，如果 config.js 沒定，則使用網頁上輸入的名稱，再沒有則預設為 "Company"
    const companyInput = document.getElementById('company-name')?.value.trim();
    const defaultCompanyName = config.companyName || companyInput || "Your Company";

    const localConfig = config[type];
    const defaultSsid = networks[type] ? networks[type].ssid : "";

    const ssid =
        localConfig && localConfig.ssid
            ? localConfig.ssid
            : defaultSsid;

    const password =
        localConfig && localConfig.password
            ? localConfig.password
            : document.getElementById(inputId)?.value.trim() || "";

    return { ssid, password, companyName: defaultCompanyName };
}

// 網頁載入完成後，檢查是否有設定檔並優先套用
document.addEventListener('DOMContentLoaded', () => {
    // 處理公司名稱與 UI 標題
    let currentCompanyName = '';
    if (window.WIFI_CONFIG && window.WIFI_CONFIG.companyName) {
        currentCompanyName = window.WIFI_CONFIG.companyName;
        // 如果有輸入框的話填寫
        const companyInput = document.getElementById('company-name');
        if (companyInput) companyInput.value = currentCompanyName;

        // 更新大寫標題
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) subtitle.textContent = `${currentCompanyName} Network QR Codes`;

        document.title = `${currentCompanyName} WiFi QR Codes`;
    }

    ['guest', 'office', 'boss'].forEach(type => {
        // 從配置或預設值讀取
        const { ssid } = getNetworkConfig(type, networks[type].passwordId);

        // 更新畫面上顯示的 SSID
        if (ssid !== networks[type].ssid) {
            networks[type].ssid = ssid;
            const card = document.querySelector(`.wifi-card.${type}`);
            if (card) {
                const ssidDisplay = card.querySelector('.ssid-name');
                if (ssidDisplay) ssidDisplay.textContent = ssid;
            }
        }

        // 如果有 config.js 且有密碼，將密碼填入輸入框（讓畫面也看得到），供預先得知狀態
        if (window.WIFI_CONFIG && window.WIFI_CONFIG[type] && window.WIFI_CONFIG[type].password) {
            document.getElementById(networks[type].passwordId).value = window.WIFI_CONFIG[type].password;
            // 自動為使用者預先產生 QR Code，讓瀏覽與預覽列印體驗最佳化
            setTimeout(() => generateQR(type), 100);
        }
    });

    // Add keyboard support for Enter key
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const card = input.closest('.wifi-card');
                if (card) {
                    const btn = card.querySelector('.generate-btn');
                    if (btn) btn.click();
                }
            }
        });
    });
});

// Helper function to draw rounded rectangle
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function generateQR(networkType) {
    const network = networks[networkType];
    const { ssid, password } = getNetworkConfig(networkType, network.passwordId);

    if (!password) {
        alert('請輸入密碼！');
        return;
    }

    // WiFi QR Code format: WIFI:T:WPA;S:<SSID>;P:<password>;H:false;;
    const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};H:false;;`;

    // Clear previous QR code
    const qrCodeElement = document.getElementById(network.qrCodeId);
    qrCodeElement.innerHTML = '';

    // Generate new QR code
    new QRCode(qrCodeElement, {
        text: wifiString,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.Q
    });

    // Show QR container with animation
    document.getElementById(network.qrContainerId).classList.add('show');
}


function downloadQRImage(networkType) {
    const network = networks[networkType];

    // 如果沒有公司名稱，要求輸入
    const configCompany = window.WIFI_CONFIG?.companyName || document.getElementById('company-name')?.value.trim();
    if (!configCompany) {
        alert('請先在上方輸入公司名稱！');
        const companyInput = document.getElementById('company-name');
        if (companyInput) companyInput.focus();
        return;
    }

    const { ssid, password, companyName } = getNetworkConfig(networkType, network.passwordId);

    if (!password) {
        alert('請先生成 QR Code！');
        return;
    }

    // 獲取 QR code canvas
    const qrCodeElement = document.getElementById(network.qrCodeId);
    const qrCanvas = qrCodeElement.querySelector('canvas');

    if (!qrCanvas) {
        alert('請先生成 QR Code！');
        return;
    }

    // 設定網路標題和顏色
    const networkInfo = {
        guest: {
            title: '訪客網路',
            subtitle: 'GUEST NETWORK',
            icon: '🌐',
            color: '#30d158'
        },
        office: {
            title: '辦公室網路',
            subtitle: 'OFFICE NETWORK',
            icon: '🏢',
            color: '#0a84ff'
        },
        boss: {
            title: '老闆辦公室',
            subtitle: 'EXECUTIVE NETWORK',
            icon: '👔',
            color: '#ff375f'
        }
    };

    const info = networkInfo[networkType];

    // 創建新的 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 設定畫布大小 (1080x1920 適合手機分享)
    canvas.width = 1080;
    canvas.height = 1920;

    // 背景漸變
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0d1117');
    gradient.addColorStop(0.5, '#1a1f2e');
    gradient.addColorStop(1, '#0d1117');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 添加光暈效果
    const glowGradient = ctx.createRadialGradient(540, 400, 0, 540, 400, 600);
    glowGradient.addColorStop(0, info.color + '33');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 繪製標題
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WiFi Access', 540, 200);

    // 繪製副標題
    ctx.fillStyle = '#8b949e';
    ctx.font = '32px "Space Mono", monospace';
    ctx.fillText(`${companyName.toUpperCase()} NETWORK`, 540, 260);

    // 繪製圖示和網路名稱卡片
    ctx.fillStyle = 'rgba(22, 27, 34, 0.9)';
    ctx.strokeStyle = info.color;
    ctx.lineWidth = 4;
    const cardY = 360;
    const cardHeight = 1300;
    drawRoundedRect(ctx, 90, cardY, 900, cardHeight, 40);
    ctx.fill();
    ctx.stroke();

    // 繪製圖示背景
    ctx.fillStyle = info.color + '33';
    ctx.beginPath();
    ctx.arc(540, cardY + 100, 60, 0, Math.PI * 2);
    ctx.fill();

    // 繪製圖示 (使用文字)
    ctx.font = '64px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(info.icon, 540, cardY + 100);

    // 繪製網路名稱
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Noto Sans TC", sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(info.title, 540, cardY + 230);

    ctx.fillStyle = info.color;
    ctx.font = '28px "Space Mono", monospace';
    ctx.fillText(info.subtitle, 540, cardY + 280);

    // SSID 區塊
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, 140, cardY + 340, 800, 100, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#8b949e';
    ctx.font = '28px "Space Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SSID:', 180, cardY + 395);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Space Mono", monospace';
    ctx.fillText(ssid, 180, cardY + 430);

    // 密碼區塊
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    drawRoundedRect(ctx, 140, cardY + 470, 800, 100, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#8b949e';
    ctx.font = '28px "Space Mono", monospace';
    ctx.fillText('密碼:', 180, cardY + 525);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Space Mono", monospace';
    ctx.fillText(password, 180, cardY + 560);

    // QR Code 背景
    ctx.fillStyle = '#ffffff';
    drawRoundedRect(ctx, 240, cardY + 620, 600, 600, 20);
    ctx.fill();

    // 繪製 QR Code
    ctx.drawImage(qrCanvas, 270, cardY + 650, 540, 540);

    // 提示文字
    ctx.fillStyle = '#8b949e';
    ctx.font = '28px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('掃描此 QR Code 連接網路', 540, cardY + 1260);

    // 底部資訊
    ctx.fillStyle = '#555';
    ctx.font = '24px "Space Mono", monospace';
    ctx.fillText(`${companyName} WiFi Network`, 540, 1800);

    // 轉換為圖片並下載
    canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // 檔名也動態套用公司名稱
        // 移除非法字元以保證檔案系統相容
        const safeCompanyName = companyName.replace(/[^a-zA-Z0-9_\-\u4e00-\u9fa5]/g, '');
        a.download = `${safeCompanyName}-WiFi-${ssid}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png');
}