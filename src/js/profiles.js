const WIFI_PROFILE_KEY = 'wifi-qr-profiles-v1';
const WIFI_PROFILE_LIMIT = 200;
const WIFI_PROFILE_FIELDS = {
    wifiTitle: 'wifiTitleInput', wifiNote: 'wifiNoteInput', internalNote: 'internalNoteInput',
    ssid24: 'ssid24Input', ssid5: 'ssid5Input', ssidMlo: 'ssidMloInput', ssidGuest: 'ssidGuestInput',
    sharedPassword: 'sharedPwInput', password24: 'pw24Input', password5: 'pw5Input',
    passwordMlo: 'pwMloInput', passwordGuest: 'pwGuestInput'
};
const WIFI_PROFILE_SWITCHES = ['enable24', 'enable5', 'enableMlo', 'enableGuest', 'bandSteering'];

function captureWifiProfile() {
    const settings = {};
    for (const [key, id] of Object.entries(WIFI_PROFILE_FIELDS)) settings[key] = document.getElementById(id).value;
    for (const key of WIFI_PROFILE_SWITCHES) settings[key] = document.getElementById(key).checked;
    settings.passwordMode = getPasswordMode();
    settings.printOptions = getPrintOptions();
    return settings;
}

function validateWifiProfileSettings(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid settings');
    const settings = {};
    for (const key of Object.keys(WIFI_PROFILE_FIELDS)) {
        if (key === 'internalNote' && value[key] === undefined) { settings[key] = ''; continue; }
        if (typeof value[key] !== 'string' || value[key].length > 4096) throw new Error('Invalid field');
        settings[key] = value[key];
    }
    if (settings.wifiTitle.length > 50 || settings.wifiNote.length > 240 || settings.internalNote.length > 2000) throw new Error('Invalid title or note');
    for (const key of WIFI_PROFILE_SWITCHES) {
        if (typeof value[key] !== 'boolean') throw new Error('Invalid switch');
        settings[key] = value[key];
    }
    if (!['shared', 'separate'].includes(value.passwordMode)) throw new Error('Invalid password mode');
    settings.passwordMode = value.passwordMode;
    const options = value.printOptions;
    if (!options || !['a4', 'single-a5', 'a5'].includes(options.paper) || !['L', 'M', 'Q', 'H'].includes(options.correction)) throw new Error('Invalid print settings');
    settings.printOptions = { paper: options.paper, correction: options.correction };
    for (const key of ['separateEach', 'separateMlo', 'separateGuest']) {
        if (typeof options[key] !== 'boolean') throw new Error('Invalid print switch');
        settings.printOptions[key] = options[key];
    }
    return settings;
}

function validateWifiProfileBackup(value) {
    if (!value || value.app !== 'wifi-studio' || value.version !== 1 || !Array.isArray(value.profiles) || value.profiles.length > WIFI_PROFILE_LIMIT) throw new Error('Invalid backup');
    return value.profiles.map(profile => {
        if (!profile || typeof profile.id !== 'string' || !profile.id || profile.id.length > 100
            || typeof profile.name !== 'string' || !profile.name.trim() || profile.name.length > 80
            || typeof profile.updatedAt !== 'string' || !Number.isFinite(Date.parse(profile.updatedAt))) throw new Error('Invalid profile');
        return { id: profile.id, name: profile.name.trim(), updatedAt: profile.updatedAt, settings: validateWifiProfileSettings(profile.settings) };
    });
}

(() => {
    const byId = id => document.getElementById(id);
    const dialog = byId('profileDialog');
    const nameInput = byId('profileName');
    const list = byId('profileList');
    let profiles = [];
    let activeId = null;
    let undo = null;
    let message = null;
    let storageError = false;
    let selectedId = null;
    let passwordsVisible = false;
    let sortKey = 'updatedAt';
    let sortDirection = -1;
    const makeId = () => window.crypto?.randomUUID?.() || `wifi-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const equal = (a, b) => JSON.stringify(validateWifiProfileSettings(a)) === JSON.stringify(validateWifiProfileSettings(b));
    function read() {
        const raw = localStorage.getItem(WIFI_PROFILE_KEY);
        return raw ? validateWifiProfileBackup(JSON.parse(raw)) : [];
    }
    function persist(next) {
        if (next.length > WIFI_PROFILE_LIMIT) throw new Error('Profile limit');
        localStorage.setItem(WIFI_PROFILE_KEY, JSON.stringify({ app: 'wifi-studio', version: 1, profiles: next }));
        profiles = next;
        storageError = false;
    }
    function notify(source, values = {}) {
        message = { source, values };
        byId('profileStatus').textContent = byId('managerStatus').textContent = t(source, values);
    }
    function showManager(open) {
        byId('profilesManager').hidden = !open;
        byId('printWorkspace').hidden = open;
        byId('profileInspector').hidden = !open;
        document.querySelector('.workspace').classList.toggle('is-managing', open);
        byId('manageProfiles').setAttribute('aria-expanded', String(open));
        if (open) {
            render();
            byId('managerTitle').focus({ preventScroll: true });
            byId('profilesManager').scrollIntoView({ block: 'start', behavior: 'smooth' });
        } else {
            byId('manageProfiles').focus({ preventScroll: true });
        }
    }
    function enabledRows(settings) {
        const rows = [
            ['24', settings.bandSteering ? '2.4 / 5 GHz' : '2.4 GHz', settings.enable24],
            ['5', '5 GHz', settings.enable5 && !settings.bandSteering],
            ['Mlo', 'MLO', settings.enableMlo], ['Guest', t('訪客'), settings.enableGuest]
        ].filter(row => row[2]);
        return rows.length ? rows : [['', t('尚未啟用任何網路'), false]];
    }
    function password(settings, key) {
        return key === 'Guest' ? settings.passwordGuest : settings.passwordMode === 'shared' ? settings.sharedPassword : settings['password' + key];
    }
    function displayedPassword(value) { return value ? passwordsVisible ? value : '••••••••' : '—'; }
    function loadProfile(profile) {
        const previous = captureWifiProfile(); const previousId = activeId;
        apply(profile.settings); activeId = profile.id;
        setUndo(() => { apply(previous); activeId = previousId; notify('已還原載入前設定。'); render(); }, '還原載入前設定');
        notify('已載入「{name}」。', { name: profile.name }); showManager(false);
    }
    function deleteProfile(profile) {
        try {
            persist(read().filter(item => item.id !== profile.id));
            if (activeId === profile.id) activeId = null;
            setUndo(() => {
                const current = read();
                if (!current.some(item => item.id === profile.id)) persist([...current, profile]);
                notify('已還原刪除的設定。'); render();
            }, '還原刪除');
            notify('已刪除「{name}」。', { name: profile.name }); render();
        } catch (_) { notify('無法儲存，請確認瀏覽器允許本機儲存或先匯出備份。'); }
    }
    function selectProfile(profile) {
        selectedId = profile.id;
        list.querySelectorAll('tbody').forEach(body => body.classList.toggle('is-selected', body.dataset.profileId === selectedId));
        renderInspector();
    }
    function renderInspector() {
        const target = byId('profileInspectorBody'); target.replaceChildren();
        const profile = profiles.find(item => item.id === selectedId);
        if (!profile) { const hint = document.createElement('p'); hint.className = 'profile-empty'; hint.textContent = t('點選表格中的項目，查看完整參數。'); target.append(hint); return; }
        const title = document.createElement('h2'); title.textContent = profile.name; target.append(title);
        const load = document.createElement('button'); load.type = 'button'; load.className = 'inspector-load'; load.textContent = t('載入並預覽'); load.addEventListener('click', () => loadProfile(profile)); target.append(load);
        const reveal = document.createElement('button'); reveal.type = 'button'; reveal.className = 'inspector-reveal'; reveal.textContent = t(passwordsVisible ? '隱藏密碼' : '顯示密碼');
        reveal.addEventListener('click', () => { passwordsVisible = !passwordsVisible; render(); }); target.append(reveal);
        const section = (heading, pairs) => {
            const group = document.createElement('section'); group.className = 'inspector-section';
            const h = document.createElement('h3'); h.textContent = t(heading); group.append(h);
            const dl = document.createElement('dl');
            for (const [key, value, secret] of pairs) {
                const dt = document.createElement('dt'); dt.textContent = t(key);
                const dd = document.createElement('dd'); dd.textContent = secret ? displayedPassword(value) : value || '—'; if (secret) dd.className = 'inspector-password';
                dl.append(dt, dd);
            }
            group.append(dl); target.append(group);
        };
        const s = profile.settings; const yes = t('開啟'); const no = t('關閉');
        section('一般設定', [['WiFi 標題（選填）', s.wifiTitle], ['說明備註（選填）', s.wifiNote], ['智慧混合（Band Steering）', s.bandSteering ? yes : no], ['內部網路密碼', t(s.passwordMode === 'shared' ? '密碼相同' : '分開設定')], ['共用 WiFi 密碼', s.sharedPassword, true]]);
        section('內部備註（不列印）', [['內部備註（不列印）', s.internalNote]]);
        for (const [key, label] of [['24', '2.4 GHz'], ['5', '5 GHz'], ['Mlo', 'MLO'], ['Guest', t('訪客')]]) {
            section(label, [['狀態', s['enable' + key] ? yes : no], ['SSID', s['ssid' + key]], ['連線密碼', password(s, key), true]]);
        }
        section('列印設定', [['紙張', t({ a4: 'A4 單張', 'single-a5': 'A5 單張', a5: 'A4 印兩份 A5' }[s.printOptions.paper])], ['所有網路各自獨立', s.printOptions.separateEach ? yes : no], ['MLO 獨立列印', s.printOptions.separateMlo ? yes : no], ['訪客網路獨立列印', s.printOptions.separateGuest ? yes : no], ['QR Code 容錯等級', s.printOptions.correction]]);
    }
    function render() {
        byId('profileCount').textContent = t('已儲存 {count} 組', { count: profiles.length });
        byId('exportProfiles').disabled = !profiles.length || storageError;
        byId('toggleProfilePasswords').textContent = t(passwordsVisible ? '隱藏密碼' : '顯示密碼');
        byId('toggleProfilePasswords').setAttribute('aria-checked', String(passwordsVisible));
        list.replaceChildren();
        const query = byId('profileSearch').value.trim().toLocaleLowerCase();
        const matches = profiles.filter(profile => [profile.name, profile.settings.ssid24, profile.settings.ssid5, profile.settings.ssidMlo, profile.settings.ssidGuest, profile.settings.internalNote]
            .some(value => value.toLocaleLowerCase().includes(query)));
        matches.sort((a, b) => sortDirection * (sortKey === 'name' ? a.name.localeCompare(b.name, wifiLanguage) : Date.parse(a.updatedAt) - Date.parse(b.updatedAt)));
        byId('profileTableCount').textContent = t('已儲存 {count} 組', { count: matches.length });
        if (!profiles.some(profile => profile.id === selectedId)) selectedId = matches[0]?.id || null;
        if (!matches.length) {
            const empty = document.createElement('p'); empty.className = 'profile-empty';
            empty.textContent = t(profiles.length ? '找不到符合的設定。' : '尚無常用設定，先按「儲存目前設定」建立第一組。'); list.append(empty);
        } else {
            const table = document.createElement('table'); table.className = 'profile-table'; table.setAttribute('aria-label', t('常用 WiFi 管理'));
            const thead = document.createElement('thead'); const header = document.createElement('tr');
            for (const [label, key] of [['設定名稱','name'], ['頻段',''], ['SSID',''], ['連線密碼',''], ['更新時間','updatedAt'], ['操作','']]) {
                const th = document.createElement('th'); th.scope = 'col';
                if (key) {
                    const button = document.createElement('button'); button.type = 'button'; button.textContent = t(label) + (sortKey === key ? sortDirection === 1 ? ' ↑' : ' ↓' : '');
                    button.addEventListener('click', () => { sortDirection = sortKey === key ? -sortDirection : 1; sortKey = key; render(); }); th.append(button);
                    th.setAttribute('aria-sort', sortKey === key ? sortDirection === 1 ? 'ascending' : 'descending' : 'none');
                } else th.textContent = t(label);
                header.append(th);
            }
            thead.append(header); table.append(thead);
            for (const profile of matches) {
                const body = document.createElement('tbody'); body.dataset.profileId = profile.id; body.classList.toggle('is-selected', profile.id === selectedId);
                const rows = enabledRows(profile.settings);
                rows.forEach(([key, label], index) => {
                    const tr = document.createElement('tr'); tr.tabIndex = 0;
                    tr.setAttribute('aria-label', profile.name + ' · ' + label);
                    tr.addEventListener('click', () => selectProfile(profile));
                    tr.addEventListener('keydown', event => {
                        if (event.target !== tr) return;
                        if (['Enter',' '].includes(event.key)) { event.preventDefault(); selectProfile(profile); }
                        if (['ArrowDown','ArrowUp'].includes(event.key)) {
                            event.preventDefault();
                            const all = [...table.querySelectorAll('tbody tr')];
                            const next = all[all.indexOf(tr) + (event.key === 'ArrowDown' ? 1 : -1)];
                            if (next) { next.focus(); next.click(); }
                        }
                    });
                    if (!index) {
                        const cell = document.createElement('th'); cell.scope = 'rowgroup'; cell.rowSpan = rows.length;
                        const title = document.createElement('span'); title.className = 'profile-table-name'; title.textContent = profile.name; cell.append(title);
                        if (activeId === profile.id) { const badge = document.createElement('span'); badge.className = 'profile-badge'; badge.textContent = t(equal(profile.settings, captureWifiProfile()) ? '已載入' : '有未儲存變更'); cell.append(badge); }
                        tr.append(cell);
                    }
                    const band = document.createElement('td'); const chip = document.createElement('span'); chip.className = 'profile-band'; chip.textContent = label; band.append(chip);
                    const ssid = document.createElement('td'); ssid.className = 'profile-cell-ssid'; ssid.textContent = key ? profile.settings['ssid' + key] || '—' : '—';
                    const pass = document.createElement('td'); pass.className = 'profile-cell-password'; pass.textContent = key ? displayedPassword(password(profile.settings, key)) : '—'; tr.append(band, ssid, pass);
                    if (!index) {
                        const date = document.createElement('td'); date.className = 'profile-cell-date'; date.rowSpan = rows.length; date.textContent = new Intl.DateTimeFormat(wifiLanguage, { dateStyle:'medium', timeStyle:'short' }).format(new Date(profile.updatedAt));
                        const actions = document.createElement('td'); actions.rowSpan = rows.length; actions.className = 'profile-table-actions';
                        const load = document.createElement('button'); load.type = 'button'; load.textContent = t('載入並預覽'); load.addEventListener('click', event => { event.stopPropagation(); loadProfile(profile); });
                        const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'profile-delete'; remove.textContent = t('刪除'); remove.setAttribute('aria-label', t('刪除「{name}」', {name:profile.name})); remove.addEventListener('click', event => { event.stopPropagation(); deleteProfile(profile); });
                        actions.append(load, remove); tr.append(date, actions);
                    }
                    body.append(tr);
                }); table.append(body);
            }
            list.append(table);
        }
        renderInspector();
        if (message) notify(message.source, message.values);
    }
    function setUndo(action, label) {
        undo = action;
        byId('undoProfileLoad').hidden = false;
        byId('undoProfileLoad').textContent = t(label);
        byId('undoProfileLoad').dataset.label = label;
    }
    function apply(settings) {
        applyPrintOptions(settings.printOptions);
        applyInitialValues(settings);
        clearInputErrors();
        saveStateToStorage(settings);
        window.dispatchEvent(new Event('settingsloaded'));
    }
    function updateDialog() {
        nameInput.setCustomValidity('');
        nameInput.removeAttribute('aria-invalid');
        byId('profileNameError').textContent = '';
        const existing = profiles.find(profile => profile.name.toLocaleLowerCase() === nameInput.value.trim().toLocaleLowerCase());
        byId('confirmProfile').textContent = t(existing ? '更新同名設定' : '儲存');
        byId('profileSaveHelp').textContent = t(existing ? '此名稱已存在，儲存將更新該組設定。' : '保存網路、密碼、標題備註與列印設定。');
    }
    function openSave() {
        try { profiles = read(); } catch (_) { notify('無法讀取已儲存設定，請先匯出備份或檢查瀏覽器儲存空間。'); return; }
        nameInput.value = profiles.find(profile => profile.id === activeId)?.name || '';
        updateDialog(); dialog.showModal(); nameInput.focus(); nameInput.select();
    }
    byId('saveProfile').addEventListener('click', openSave);
    byId('managerSaveProfile').addEventListener('click', openSave);
    byId('cancelProfile').addEventListener('click', () => dialog.close());
    nameInput.addEventListener('input', updateDialog);
    byId('profileForm').addEventListener('submit', event => {
        event.preventDefault();
        const name = nameInput.value.trim();
        if (!name || name.length > 80) {
            nameInput.setAttribute('aria-invalid', 'true');
            byId('profileNameError').textContent = t('請輸入設定名稱。');
            nameInput.focus(); return;
        }
        try {
            const current = read();
            const existing = current.find(profile => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase());
            const profile = { id: existing?.id || makeId(), name, updatedAt: new Date().toISOString(), settings: validateWifiProfileSettings(captureWifiProfile()) };
            persist(existing ? current.map(item => item.id === existing.id ? profile : item) : [...current, profile]);
            activeId = profile.id; selectedId = profile.id; dialog.close(); notify('已儲存「{name}」。', { name }); render();
        } catch (_) { byId('profileSaveHelp').textContent = t('無法儲存，請確認瀏覽器允許本機儲存或先匯出備份。'); }
    });
    byId('manageProfiles').addEventListener('click', () => showManager(true));
    byId('closeProfiles').addEventListener('click', () => showManager(false));
    byId('manageProfiles').setAttribute('aria-controls', 'profilesManager');
    byId('manageProfiles').setAttribute('aria-expanded', 'false');
    byId('profileSearch').addEventListener('input', render);
    byId('toggleProfilePasswords').addEventListener('click', () => { passwordsVisible = !passwordsVisible; render(); });
    byId('undoProfileLoad').addEventListener('click', () => {
        try { const action = undo; undo = null; byId('undoProfileLoad').hidden = true; action?.(); }
        catch (_) { notify('無法儲存，請確認瀏覽器允許本機儲存或先匯出備份。'); }
    });
    byId('exportProfiles').addEventListener('click', () => {
        try {
            const current = read(); const url = URL.createObjectURL(new Blob([wifiProfileCsv(current)], {type:'text/csv;charset=utf-8'}));
            const link = document.createElement('a'); link.href = url; link.download = `WiFi-Profiles-${new Date().toISOString().slice(0,10)}.csv`;
            document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url),10000);
            notify('已匯出 {count} 組設定。', {count:current.length});
        } catch (_) { notify('無法匯出備份，請重試。'); }
    });
    byId('importProfiles').addEventListener('click', () => byId('profileFile').click());
    byId('profileFile').addEventListener('change', async event => {
        const file = event.target.files[0];
        if (!file) return;
        try {
            const incoming = await readWifiProfileFile(file);
            if (!incoming) return;
            const next = read(); let added = 0;
            for (const profile of incoming) {
                if (next.some(item => item.name === profile.name && equal(item.settings, profile.settings))) continue;
                const base = profile.name; let name = base; let suffix = 2;
                while (next.some(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase())) name = `${base.slice(0, 70)} (${suffix++})`;
                next.push({ ...profile, id: makeId(), name }); added++;
            }
            persist(next); render();
            notify('已匯入 {count} 組，保留原有設定。', { count: added });
        } catch (_) { notify('匯入失敗。請確認檔案格式及欄位；CSV 上限 2 MB、Excel／Numbers 上限 10 MB，最多 200 組。原有紀錄未變更。'); }
        finally { event.target.value = ''; }
    });
    document.querySelector('.control-panel').addEventListener('input', event => {
        if (!event.target.closest('.profile-library')) render();
    });
    document.querySelector('.print-settings-panel').addEventListener('change', () => {
        saveStateToStorage(getState()); render();
    });
    window.addEventListener('languagechange', () => {
        render(); if (dialog.open) updateDialog();
        if (undo) byId('undoProfileLoad').textContent = t(byId('undoProfileLoad').dataset.label);
    });
    window.addEventListener('storage', event => {
        if (event.key !== WIFI_PROFILE_KEY) return;
        try { profiles = read(); storageError = false; render(); } catch (_) { storageError = true; }
    });
    try { profiles = read(); }
    catch (_) { storageError = true; notify('無法讀取已儲存設定，請先匯出備份或檢查瀏覽器儲存空間。'); }
    render();
})();
