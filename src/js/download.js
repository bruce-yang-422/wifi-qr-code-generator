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
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'png-download';
            button.textContent = t('下載 {band} PNG', { band: network.label });
            button.disabled = !network.ssid || !network.password;
            if (button.disabled) button.title = t('請填寫此網路的 SSID 與密碼');
            button.addEventListener('click', () => download(network.key, button));
            list.append(button);
        });
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
            text(state.wifiTitle || 'WiFi Access', 280, 60, sans, '#1d1d1f', 1);
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
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const band = { '24': isBandSteering() ? '2.4G-5G' : '2.4G', '5': '5G', Mlo: 'MLO', Guest: 'Guest' }[key];
            link.download = wifiPngFilename(state.wifiTitle, network.ssid, band);
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 60000);
            status.textContent = t('已下載：{file}', { file: link.download });
        } catch (error) {
            status.textContent = t('圖片下載失敗，請縮短網路資料後重試。');
            console.error('PNG export failed:', error);
        } finally {
            update();
        }
    }
    document.querySelector('.control-panel').addEventListener('input', update);
    document.querySelector('.control-panel').addEventListener('change', update);
    window.addEventListener('languagechange', () => { status.textContent = ''; update(); });
    update();
})();
