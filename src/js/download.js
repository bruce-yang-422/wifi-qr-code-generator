function wifiPngFilename(title, ssid, band) {
    const clean = value => value.normalize('NFC')
        .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, '')
        .replace(/\s+/g, '-').replace(/^[.\s-]+|[.\s-]+$/g, '').slice(0, 48).replace(/[.\s-]+$/g, '');
    const parts = ['WiFi'];
    for (const value of [title, ssid, band]) {
        const part = clean(value);
        if (part && !parts.some(existing => existing.toLowerCase() === part.toLowerCase())) parts.push(part);
    }
    return parts.join('-') + '.png';
}

// Generate one shareable 3:4 image per network, independently of print grouping.
(() => {
    const list = document.getElementById('pngDownloads');
    const status = document.getElementById('pngStatus');
    const definitions = [
        ['24', '2.4 GHz'], ['5', '5 GHz'], ['Mlo', 'MLO'], ['Guest', '訪客']
    ];
    function networks() {
        const state = getState();
        const enabled = getEnabledNetworks();
        return definitions.map(([key, label]) => ({
            key, label: key === '24' && isBandSteering() ? '2.4 / 5 GHz' : t(label),
            ssid: state['ssid' + key], password: state['password' + key],
            enabled: enabled['enabled' + key] && !(key === '5' && isBandSteering())
        })).filter(network => network.enabled);
    }
    function update() {
        list.replaceChildren();
        networks().forEach(network => {
            const item = document.createElement('div'); item.className = 'network-download-item';
            const label = document.createElement('strong'); label.textContent = network.label;
            const name = document.createElement('span'); name.className = 'network-download-name'; name.textContent = network.ssid || t('未填寫 SSID');
            const buttons = document.createElement('div'); buttons.className = 'network-download-formats';
            for (const format of ['png', 'qr-png', 'svg', 'eps']) {
                const button = document.createElement('button'); button.type = 'button'; button.className = 'png-download';
                const title = format === 'png' ? t('分享 PNG') : format === 'qr-png' ? t('純 QR PNG') : format.toUpperCase();
                button.textContent = title; button.dataset.format = format; button.dataset.key = network.key;
                button.setAttribute('aria-label', t('下載 {band} {format}', { band: network.label, format: title }));
                button.disabled = !network.ssid || !network.password;
                if (button.disabled) button.title = t('請填寫此網路的 SSID 與密碼');
                button.addEventListener('click', () => {
                    if (document.activeElement === button) restoreFocus = `[data-key="${network.key}"][data-format="${format}"]`;
                    return format === 'png' ? download(network.key, button) : format === 'qr-png' ? downloadQrPng(network.key, button) : downloadVector(network.key, format, button);
                });
                buttons.append(button);
            }
            item.append(label, name, buttons); list.append(item);
        });
    }
    // update() rebuilds every button; keep keyboard focus on the one that was used.
    // Disabled buttons lose focus, so the target is recorded when the click starts.
    let restoreFocus = null;
    function refresh() {
        const target = restoreFocus;
        restoreFocus = null;
        update();
        if (target) list.querySelector(target)?.focus();
    }
    function exportModel(network) {
        const level = document.querySelector('input[name="qrCorrection"]:checked').value;
        return new QRCode(document.createElement('div'), {
            text: `WIFI:T:WPA;S:${escapeWifiValue(network.ssid)};P:${escapeWifiValue(network.password)};H:false;;`,
            width: 140, height: 140, correctLevel: QRCode.CorrectLevel[level]
        })._oQRCode;
    }
    function artFilename(network, extension) {
        const band = { '24': isBandSteering() ? '2.4G-5G' : '2.4G', '5': '5G', Mlo: 'MLO', Guest: 'Guest' }[network.key];
        return wifiPngFilename(getState().wifiTitle, network.ssid, band).replace(/\.png$/, `-QR.${extension}`);
    }
    function saveArtBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = url; link.download = filename;
        document.body.append(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        status.textContent = t('已下載：{file}', { file: filename });
    }
    async function downloadQrPng(key, button) {
        const network = networks().find(item => item.key === key);
        if (!network?.ssid || !network.password) return;
        button.disabled = true;
        try {
            const model = exportModel(network); const count = model.getModuleCount();
            const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1200;
            const ctx = canvas.getContext('2d'); ctx.fillStyle = '#000000';
            const unit = Math.floor(1200 / (count + 8));
            const offset = Math.floor((1200 - (count + 8) * unit) / 2);
            for (let row = 0; row < count; row++) for (let col = 0; col < count; col++) {
                if (model.isDark(row, col)) ctx.fillRect(offset + (col + 4) * unit, offset + (row + 4) * unit, unit, unit);
            }
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (!blob) throw new Error('PNG export failed');
            saveArtBlob(blob, artFilename(network, 'png'));
        } catch (_) { status.textContent = t('圖片下載失敗，請縮短網路資料後重試。'); }
        finally { refresh(); }
    }
    function downloadVector(key, format, button) {
        const network = networks().find(item => item.key === key);
        if (!network?.ssid || !network.password) return;
        button.disabled = true;
        try {
            const content = wifiQrVector(exportModel(network), format);
            const blob = new Blob([content], { type: format === 'svg' ? 'image/svg+xml;charset=utf-8' : 'application/postscript' });
            saveArtBlob(blob, artFilename(network, format));
        } catch (_) { status.textContent = t('向量檔下載失敗，請檢查網路資料後重試。'); }
        finally { refresh(); }
    }
    async function download(key, button) {
        const network = networks().find(item => item.key === key);
        if (!network?.ssid || !network.password) return;
        button.disabled = true;
        status.textContent = t('正在準備圖片…');
        try {
            await Promise.all([
                document.fonts.load('600 40px "JetBrains Mono"'),
                document.fonts.load('600 40px "Noto Sans TC"')
            ]);
            await document.fonts.ready;
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 1600;
            const ctx = canvas.getContext('2d');
            const background = ctx.createLinearGradient(0, 0, 1200, 1600);
            background.addColorStop(0, '#f2f2f7');
            background.addColorStop(0.5, '#f2f2f7');
            background.addColorStop(1, '#e9e9ef');
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, 1200, 1600);
            ctx.shadowColor = 'rgba(29,45,75,0.09)';
            ctx.shadowBlur = 45;
            ctx.shadowOffsetY = 15;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.roundRect(48, 48, 1104, 1504, 54);
            ctx.fill();
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            ctx.textAlign = 'center';
            const sans = '"Noto Sans TC", Arial, sans-serif';
            const mono = '"JetBrains Mono", "Noto Sans TC", monospace';
            function text(value, y, size, family = sans, color = '#1d1d1f', maxLines = 2) {
                let lines;
                do {
                    ctx.font = `600 ${size}px ${family}`;
                    lines = [];
                    for (const paragraph of value.split('\n')) {
                        let line = '';
                        for (const char of paragraph) {
                            if (line && ctx.measureText(line + char).width > 840) {
                                lines.push(line);
                                line = '';
                            }
                            line += char;
                        }
                        lines.push(line);
                    }
                    if (lines.length <= maxLines || size <= 12) break;
                    size -= 2;
                } while (true);
                ctx.fillStyle = color;
                lines.forEach((line, i) => ctx.fillText(line, 600, y + i * size * 1.3));
            }
            // Match the standalone SVG, drawing vector paths without image tainting.
            ctx.save();
            ctx.translate(550, 100);
            ctx.scale(100 / 128, 100 / 128);
            const accent = ctx.createLinearGradient(0, 0, 128, 128);
            accent.addColorStop(0, '#009dff');
            accent.addColorStop(.5, '#1468ed');
            accent.addColorStop(1, '#7355cf');
            ctx.fillStyle = accent;
            ctx.beginPath(); ctx.roundRect(0, 0, 128, 128, 32); ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 7;
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.stroke(new Path2D('M48 26H35a9 9 0 0 0-9 9v13M80 26h13a9 9 0 0 1 9 9v13M26 80v13a9 9 0 0 0 9 9h13M102 80v13a9 9 0 0 1-9 9H80'));
            ctx.stroke(new Path2D('M37 57Q64 30 91 57M45 69Q64 50 83 69M54 81Q64 71 74 81'));
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(64, 92, 5, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            const state = getState();
            text(state.wifiTitle || t('WiFi 連線'), 280, 60, sans, '#1d1d1f', 1);
            text(t('掃描連線'), 344, 32, sans, '#667085');
            const networkTop = state.wifiNote ? 550 : 420;
            if (state.wifiNote) text(state.wifiNote, 400, 32, sans, '#6e6e73', 4);
            ctx.fillStyle = '#eef5ff'; ctx.beginPath(); ctx.roundRect(440, networkTop, 320, 54, 27); ctx.fill();
            text(network.label, networkTop + 38, 30, sans, '#007aff', 1);
            text(network.ssid, networkTop + 120, 54, mono, '#1d1d1f', 2);
            const frameTop = networkTop + 210;
            const frameHeight = 1290 - frameTop;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.roundRect(150, frameTop, 900, frameHeight, 32); ctx.fill();
            ctx.strokeStyle = '#e5e5ea'; ctx.lineWidth = 2; ctx.stroke();
            // Draw modules directly with a four-module quiet zone and integer pixels.
            const target = document.createElement('div');
            const level = document.querySelector('input[name="qrCorrection"]:checked').value;
            const qr = new QRCode(target, {
                text: `WIFI:T:WPA;S:${escapeWifiValue(network.ssid)};P:${escapeWifiValue(network.password)};H:false;;`,
                width: 600, height: 600, correctLevel: QRCode.CorrectLevel[level]
            });
            const model = qr._oQRCode;
            const count = model.getModuleCount();
            const cell = Math.floor(Math.min(620, frameHeight - 40) / (count + 8));
            const size = (count + 8) * cell;
            const left = (1200 - size) / 2;
            ctx.fillStyle = '#fff';
            const qrTop = frameTop + (frameHeight - size) / 2;
            ctx.fillRect(left, qrTop, size, size);
            ctx.fillStyle = '#111827';
            for (let row = 0; row < count; row++) {
                for (let col = 0; col < count; col++) {
                    if (model.isDark(row, col)) ctx.fillRect(left + (col + 4) * cell, qrTop + (row + 4) * cell, cell, cell);
                }
            }
            text(t('開啟相機掃描，即可加入網路'), 1345, 32, sans, '#667085');
            ctx.fillStyle = '#f2f2f7'; ctx.beginPath(); ctx.roundRect(150, 1375, 900, 157, 24); ctx.fill();
            text(t('連線密碼'), 1416, 28, sans, '#667085');
            text(network.password, 1472, 48, mono, '#1d1d1f', 2);
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (!blob) throw new Error('PNG export failed');
            const band = { '24': isBandSteering() ? '2.4G-5G' : '2.4G', '5': '5G', Mlo: 'MLO', Guest: 'Guest' }[key];
            const filename = wifiPngFilename(state.wifiTitle, network.ssid, band);
            if (offerWifiImageShare(blob, filename, `[data-key="${key}"][data-format="png"]`)) {
                status.textContent = t('圖片已準備，可分享或下載。');
                return;
            }
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 60000);
            status.textContent = t('已下載：{file}', { file: link.download });
        } catch (error) {
            status.textContent = t('圖片下載失敗，請縮短網路資料後重試。');
            console.error('PNG export failed:', error);
        } finally {
            refresh();
        }
    }
    document.querySelector('.control-panel').addEventListener('input', update);
    document.querySelector('.control-panel').addEventListener('change', update);
    window.addEventListener('languagechange', () => { status.textContent = ''; update(); });
    window.addEventListener('settingsloaded', update);
    // SVG/EPS are for designers; keep them behind a remembered switch on every screen size.
    const vectorSwitch = document.getElementById('showVectors');
    try { vectorSwitch.checked = localStorage.getItem('wifi-show-vectors') === 'true'; } catch (_) { /* Optional storage. */ }
    document.body.classList.toggle('show-vectors', vectorSwitch.checked);
    vectorSwitch.addEventListener('change', () => {
        document.body.classList.toggle('show-vectors', vectorSwitch.checked);
        try { localStorage.setItem('wifi-show-vectors', String(vectorSwitch.checked)); } catch (_) { /* Optional storage. */ }
    });
    update();
})();
