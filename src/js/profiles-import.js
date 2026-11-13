function profilesFromWifiWorksheet(sheet) {
    if (!sheet || !sheet['!ref']) throw new Error('Empty worksheet');
    const range = XLSX.utils.decode_range(sheet['!fullref'] || sheet['!ref']);
    if (range.e.r > 801 || range.e.c > 63) throw new Error('Worksheet too large');
    // Use formatted values so text cells and explicit leading-zero formats survive.
    const csv = XLSX.utils.sheet_to_csv(sheet, { blankrows: false, FS: ',', RS: '\r\n' });
    return wifiProfilesFromCsv(csv);
}

const chooseWifiWorksheet = (() => {
    const dialog = document.getElementById('worksheetDialog');
    const options = document.getElementById('worksheetOptions');
    const preview = document.getElementById('worksheetPreview');
    const confirm = document.getElementById('confirmWorksheet');
    const feedback = document.getElementById('worksheetStatus');
    let pending = null;
    let book = null;
    let result = null;
    function finish(value) {
        const resolve = pending;
        pending = null; book = null; result = null;
        options.replaceChildren(); preview.replaceChildren();
        if (dialog.open) dialog.close();
        resolve?.(value);
    }
    document.getElementById('cancelWorksheet').addEventListener('click', () => finish(null));
    dialog.addEventListener('cancel', event => { event.preventDefault(); finish(null); });
    confirm.addEventListener('click', () => { if (result) finish(result); });
    options.addEventListener('change', event => {
        if (!event.target.matches('input[name="worksheet"]')) return;
        preview.replaceChildren(); result = null; confirm.disabled = true;
        try {
            result = profilesFromWifiWorksheet(book.Sheets[event.target.value]);
            feedback.textContent = t('可匯入 {count} 組設定。', { count: result.length });
            const table = document.createElement('table'); table.className = 'worksheet-preview-table';
            const header = document.createElement('tr');
            for (const label of ['設定名稱', 'SSID', '連線密碼']) { const th = document.createElement('th'); th.textContent = t(label); header.append(th); }
            const head = document.createElement('thead'); head.append(header); table.append(head);
            const body = document.createElement('tbody');
            for (const profile of result.slice(0, 3)) {
                const row = document.createElement('tr');
                const s = profile.settings;
                for (const text of [profile.name, [s.ssid24, s.ssid5, s.ssidMlo, s.ssidGuest].filter(Boolean).join(' / '), '••••••••']) {
                    const cell = document.createElement('td'); cell.textContent = text; row.append(cell);
                }
                body.append(row);
            }
            table.append(body); preview.append(table); confirm.disabled = false;
        } catch (_) { feedback.textContent = t('此工作表無法匯入，請確認包含 ssid、password 欄位。'); }
    });
    return (workbook, filename) => new Promise(resolve => {
        if (pending) finish(null);
        pending = resolve; book = workbook; result = null;
        document.getElementById('worksheetFilename').textContent = filename;
        feedback.textContent = t('請先選擇一個工作表。'); confirm.disabled = true;
        options.replaceChildren(); preview.replaceChildren();
        workbook.SheetNames.forEach((name, index) => {
            const label = document.createElement('label'); label.className = 'worksheet-option';
            const input = document.createElement('input'); input.type = 'radio'; input.name = 'worksheet'; input.value = name;
            const marker = document.createElement('span'); marker.className = 'worksheet-radio'; marker.setAttribute('aria-hidden', 'true');
            const title = document.createElement('span'); title.textContent = name;
            label.append(input, marker, title); options.append(label);
        });
        dialog.showModal();
    });
})();

async function readWifiProfileFile(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls', 'xlx', 'numbers'].includes(extension)) throw new Error('Unsupported file type');
    if (file.size > (extension === 'csv' ? 2 : 10) * 1024 * 1024) throw new Error('File too large');
    if (extension === 'csv') return wifiProfilesFromCsv(await file.text());
    const book = XLSX.read(await file.arrayBuffer(), { type: 'array', cellFormula: false, cellHTML: false, cellText: true, sheetRows: 802 });
    if (!book.SheetNames.length || book.SheetNames.length > 100) throw new Error('Invalid workbook');
    if (book.SheetNames.length > 1) return chooseWifiWorksheet(book, file.name);
    return profilesFromWifiWorksheet(book.Sheets[book.SheetNames[0]]);
}
