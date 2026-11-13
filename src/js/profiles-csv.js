const WIFI_CSV_LANGUAGES = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'fr', 'de', 'es'];
const WIFI_CSV_COLUMNS = [
    ['name', ['設定名稱','设置名称','Name','設定名','설정 이름','Nom','Name','Nombre']],
    ['band', ['頻段','频段','Band','周波数帯','주파수 대역','Bande','Frequenzband','Banda']],
    ['ssid', ['SSID','SSID','SSID','SSID','SSID','SSID','SSID','SSID']],
    ['password', ['連線密碼','连接密码','Password','接続パスワード','연결 비밀번호','Mot de passe','Passwort','Contraseña']],
    ['enabled', ['啟用','启用','Enabled','有効','활성화','Activé','Aktiviert','Habilitado']],
    ['password_mode', ['密碼模式','密码模式','Password mode','パスワード方式','비밀번호 모드','Mode de mot de passe','Passwortmodus','Modo de contraseña']],
    ['shared_password', ['共用密碼','共用密码','Shared password','共通パスワード','공용 비밀번호','Mot de passe commun','Gemeinsames Passwort','Contraseña común']],
    ['stored_password', ['原始密碼','原始密码','Stored password','保存パスワード','저장된 비밀번호','Mot de passe enregistré','Gespeichertes Passwort','Contraseña guardada']],
    ['title', ['標題','标题','Title','タイトル','제목','Titre','Titel','Título']],
    ['note', ['說明備註','说明备注','Notes','備考','메모','Notes','Hinweise','Notas']],
    ['internal_note', ['內部備註（不列印）','内部备注（不打印）','Internal notes (not printed)','内部メモ（印刷しない）','내부 메모 (인쇄 안 함)','Notes internes (non imprimées)','Interne Notizen (nicht gedruckt)','Notas internas (no se imprimen)']],
    ['paper', ['紙張版型','纸张版型','Paper layout','用紙レイアウト','용지 레이아웃','Disposition du papier','Papierlayout','Diseño del papel']],
    ['separate_each', ['所有網路獨立列印','所有网络独立打印','Separate every network','全ネットワークを個別印刷','모든 네트워크 개별 인쇄','Séparer chaque réseau','Jedes Netzwerk einzeln','Separar todas las redes']],
    ['separate_mlo', ['MLO 獨立列印','MLO 独立打印','Separate MLO','MLOを個別印刷','MLO 개별 인쇄','Séparer MLO','MLO separat','Separar MLO']],
    ['separate_guest', ['訪客獨立列印','访客独立打印','Separate guest','ゲストを個別印刷','게스트 개별 인쇄','Séparer les invités','Gäste separat','Separar invitados']],
    ['correction', ['容錯等級','容错等级','Error correction','誤り訂正レベル','오류 정정 수준','Correction d’erreurs','Fehlerkorrektur','Corrección de errores']],
    ['band_steering', ['智慧混合','智能混合','Band steering','バンドステアリング','밴드 스티어링','Band steering','Band-Steering','Selección de banda']],
    ['profile_id', ['設定識別碼','设置标识码','Profile ID','設定ID','설정 ID','Identifiant du profil','Profil-ID','ID del perfil']],
    ['updated_at', ['更新時間','更新时间','Updated at','更新日時','수정 시간','Date de mise à jour','Aktualisiert am','Fecha de actualización']],
    ['format', ['備份格式','备份格式','Backup format','バックアップ形式','백업 형식','Format de sauvegarde','Sicherungsformat','Formato de copia']],
    ['escaped_fields', ['文字保護標記','文字保护标记','Text protection markers','文字列保護マーカー','텍스트 보호 표시','Marqueurs de protection du texte','Textschutz-Markierungen','Marcadores de protección de texto']]
];

function normalizeWifiCsvHeader(value) {
    const normalize = text => text.normalize('NFKC').trim().replace(/^(["'])(.*)\1$/, '$2').trim().toLowerCase();
    const source = normalize(value);
    for (const [key, labels] of WIFI_CSV_COLUMNS) if (normalize(key) === source || labels.some(label => normalize(label) === source)) return key;
    for (const [key, aliases] of Object.entries({
        ssid: ['network', 'network_name', '網路名稱', '网络名称'],
        password: ['pass', '密碼', '密码'], name: ['profile', 'group'], band: ['frequency'],
        escaped_fields: ['跳脫欄位','转义字段','escaped fields','エスケープ列','이스케이프 필드','champs échappés','maskierte felder','campos escapados']
    })) if (aliases.includes(source)) return key;
    return source;
}

// RFC 4180-style CSV: UTF-8, quoted commas/newlines and doubled quotes.
function parseWifiCsv(text) {
    if (typeof text !== 'string' || text.length > 2 * 1024 * 1024) throw new Error('CSV too large');
    text = text.replace(/^\uFEFF/, '');
    const firstLine = text.split(/\r\n|\n|\r/, 1)[0];
    const separator = [',', ';', '\t'].map(char => {
        let count = 0; let inside = false;
        for (let i = 0; i < firstLine.length; i++) {
            if (firstLine[i] === '"') {
                if (inside && firstLine[i + 1] === '"') i++; else inside = !inside;
            } else if (!inside && firstLine[i] === char) count++;
        }
        return { char, count };
    }).sort((a, b) => b.count - a.count)[0].char;
    const rows = []; let row = []; let value = ''; let quoted = false; let closed = false;
    function cell() { row.push(value); value = ''; closed = false; }
    function record() { cell(); if (row.some(item => item !== '')) rows.push(row); row = []; }
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (quoted) {
            if (char === '"') {
                if (text[i + 1] === '"') { value += '"'; i++; }
                else { quoted = false; closed = true; }
            } else value += char;
        } else if (char === '"' && !value && !closed) quoted = true;
        else if (char === separator) cell();
        else if (char === '\r' || char === '\n') { if (char === '\r' && text[i + 1] === '\n') i++; record(); }
        else if (closed || char === '"') throw new Error('Malformed CSV');
        else value += char;
    }
    if (quoted) throw new Error('Unclosed CSV quote');
    if (value || row.length || closed) record();
    if (rows.length < 2 || rows.length > 801) throw new Error('Invalid CSV rows');
    return rows;
}

function wifiProfileCsv(profiles, language = typeof wifiLanguage === 'string' ? wifiLanguage : 'en') {
    const headers = WIFI_CSV_COLUMNS.map(column => column[0]);
    const languageIndex = WIFI_CSV_LANGUAGES.includes(language) ? WIFI_CSV_LANGUAGES.indexOf(language) : 2;
    const rows = [WIFI_CSV_COLUMNS.map(column => column[1][languageIndex])];
    for (const profile of profiles) {
        const s = profile.settings;
        for (const [band, key, enabled] of [['2.4GHz', '24', s.enable24], ['5GHz', '5', s.enable5], ['MLO', 'Mlo', s.enableMlo], ['Guest', 'Guest', s.enableGuest]]) {
            const password = key === 'Guest' ? s.passwordGuest : s.passwordMode === 'shared' ? s.sharedPassword : s['password' + key];
            const row = [profile.name, band, s['ssid' + key], password, String(enabled), s.passwordMode, s.sharedPassword, s['password' + key], s.wifiTitle, s.wifiNote, s.internalNote || '', s.printOptions.paper,
                String(s.printOptions.separateEach), String(s.printOptions.separateMlo), String(s.printOptions.separateGuest), s.printOptions.correction, String(s.bandSteering), profile.id, profile.updatedAt, 'wifi-studio-v1', ''];
            // Keep spreadsheet formulas inert; metadata makes this reversible on import.
            const escaped = [];
            for (let i = 0; i < row.length - 2; i++) if (/^[=+\-@\t\r]/.test(row[i])) { row[i] = "'" + row[i]; escaped.push(headers[i]); }
            row[row.length - 1] = escaped.join(';'); rows.push(row);
        }
    }
    return '\uFEFF' + rows.map(row => row.map(value => '"' + String(value).replace(/"/g, '""') + '"').join(',')).join('\r\n') + '\r\n';
}

function wifiProfilesFromCsv(text) {
    const [header, ...rows] = parseWifiCsv(text);
    const aliases = {
        ssid: ['ssid', 'network', 'network_name', '網路名稱', '网络名称'],
        password: ['password', 'pass', '密碼', '密码'], name: ['name', 'profile', 'group', '設定名稱', '设置名称'],
        band: ['band', 'frequency', '頻段', '频段']
    };
    const keys = header.map(normalizeWifiCsvHeader);
    const positions = {};
    for (const [key, names] of Object.entries(aliases)) positions[key] = keys.findIndex(value => names.includes(value));
    if (positions.ssid < 0 || positions.password < 0 || new Set(keys).size !== keys.length) throw new Error('Missing or duplicate CSV columns');
    const groups = new Map();
    const get = (row, key) => { const index = positions[key] ?? keys.indexOf(key); return index < 0 ? '' : row[index]; };
    const bool = (value, fallback) => value === '' ? fallback : /^(true|1|yes)$/i.test(value) ? true : /^(false|0|no)$/i.test(value) ? false : (() => { throw new Error('Invalid boolean'); })();
    for (const source of rows) {
        if (source.length !== keys.length) throw new Error('CSV column count');
        const row = [...source];
        if (get(row, 'format') === 'wifi-studio-v1') {
            for (const field of get(row, 'escaped_fields').split(';').filter(Boolean)) {
                const index = keys.indexOf(field);
                if (index < 0) throw new Error('Invalid escaped field');
                if (/^'[=+\-@\t\r]/.test(row[index])) row[index] = row[index].slice(1);
            }
        }
        const ssid = get(row, 'ssid'); const password = get(row, 'password');
        const name = (get(row, 'name') || ssid).trim();
        if (!name || name.length > 80) throw new Error('CSV name required');
        let band = get(row, 'band').trim().toLowerCase().replace(/[\s_-]/g, '');
        const steering = /^(2\.4\/5(ghz)?|2\.4g\/5g)$/.test(band);
        const key = !band || steering || /^(24|2\.4|2\.4g|2\.4ghz)$/.test(band) ? '24'
            : /^(5|5g|5ghz)$/.test(band) ? '5' : band === 'mlo' ? 'Mlo' : /^(guest|訪客|访客)$/.test(band) ? 'Guest' : null;
        if (!key) throw new Error('Unknown band');
        if (!groups.has(name)) {
            const settings = { wifiTitle: get(row, 'title'), wifiNote: get(row, 'note'), internalNote: get(row, 'internal_note'), ssid24: '', ssid5: '', ssidMlo: '', ssidGuest: '',
                sharedPassword: get(row, 'shared_password'), password24: '', password5: '', passwordMlo: '', passwordGuest: '',
                enable24: false, enable5: false, enableMlo: false, enableGuest: false, bandSteering: bool(get(row, 'band_steering'), steering), passwordMode: get(row, 'password_mode') || 'separate',
                printOptions: { paper: get(row, 'paper') || 'a4', correction: get(row, 'correction') || 'H', separateEach: bool(get(row, 'separate_each'), false), separateMlo: bool(get(row, 'separate_mlo'), false), separateGuest: bool(get(row, 'separate_guest'), true) } };
            groups.set(name, { name, settings, bands: new Set(), passwordEdits: new Map(), id: get(row, 'profile_id'), updatedAt: get(row, 'updated_at') });
        }
        const group = groups.get(name);
        if (group.bands.has(key)) throw new Error('Duplicate network band in group');
        group.bands.add(key);
        group.settings['ssid' + key] = ssid;
        group.settings['password' + key] = keys.includes('stored_password') ? get(row, 'stored_password') : password;
        const expectedPassword = key === 'Guest' || group.settings.passwordMode !== 'shared' ? get(row, 'stored_password') : group.settings.sharedPassword;
        if (keys.includes('stored_password') && password !== expectedPassword) group.passwordEdits.set(key, password);
        group.settings['enable' + key] = bool(get(row, 'enabled'), true);
        if (steering) group.settings.bandSteering = true;
        if (group.settings.passwordMode === 'shared' && !keys.includes('shared_password')) group.settings.sharedPassword = password;
    }
    return validateWifiProfileBackup({ app: 'wifi-studio', version: 1, profiles: [...groups.values()].map((group, i) => {
        if (group.settings.passwordMode === 'shared' && [...group.passwordEdits.keys()].some(key => key !== 'Guest')) {
            for (const key of ['24', '5', 'Mlo']) group.settings['password' + key] = group.settings.sharedPassword;
            group.settings.passwordMode = 'separate';
        }
        for (const [key, password] of group.passwordEdits) group.settings['password' + key] = password;
        return { id: group.id || `csv-${i}`, name: group.name, updatedAt: group.updatedAt || new Date().toISOString(), settings: group.settings };
    }) });
}
