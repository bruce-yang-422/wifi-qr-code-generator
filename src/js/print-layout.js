function planPrintGroups(active, separateEach, separateMlo, separateGuest) {
    if (separateEach) return active.map(i => [i]);
    const independent = active.filter(i => (i === 2 && separateMlo) || (i === 3 && separateGuest));
    const merged = active.filter(i => !independent.includes(i));
    return [...(merged.length ? [merged] : []), ...independent.map(i => [i])];
}

// Keep rendered copies, including QR canvas pixels, without duplicate IDs.
(() => {
    const source = document.getElementById('printPage');
    const stage = source.parentElement;
    const viewport = document.createElement('div');
    viewport.className = 'preview-scroll';
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', '列印紙張預覽，可捲動查看各頁');
    viewport.tabIndex = 0;
    stage.before(viewport);
    viewport.append(stage);
    const sheet = document.createElement('div');
    sheet.className = 'print-sheet';
    sheet.classList.add('source-sheet');
    source.before(sheet);
    sheet.append(source);
    const pageStyle = document.createElement('style');
    document.head.append(pageStyle);
    let copy;
    function fitPreview() {
        const width = document.body.classList.contains('single-a5') ? 148
            : document.body.classList.contains('two-a5') ? 297 : 210;
        const scale = Math.min(1, Math.max(0.1, (stage.clientWidth - 24) / (width * 96 / 25.4)));
        stage.style.setProperty('--a5-preview-scale', scale);
        stage.style.setProperty('--preview-scale', scale);
    }
    new ResizeObserver(fitPreview).observe(stage);
    fitPreview();

    function syncCopy() {
        if (copy) copy.remove();
        stage.querySelectorAll('.network-sheet').forEach(node => node.remove());
        const cards = [...source.querySelectorAll('.wifi-card')];
        const separateEach = document.getElementById('networkLayoutSwitch').checked;
        const separateGuest = document.getElementById('guestLayoutSwitch').checked;
        const separateMlo = document.getElementById('mloLayoutSwitch').checked;
        const active = cards.map((card, i) => card.classList.contains('hidden') ? -1 : i).filter(i => i >= 0);
        const groups = planPrintGroups(active, separateEach, separateMlo, separateGuest);
        updateSummary(cards, groups, active, separateEach);
        const split = groups.length > 1;
        document.body.classList.toggle('separate-networks', split);
        if (split) {
            stage.style.setProperty('--sheet-count', Math.max(1, groups.length));
            groups.forEach((indices, pageIndex) => {
                const nextSheet = document.createElement('div');
                nextSheet.className = 'print-sheet network-sheet';
                nextSheet.style.setProperty('--sheet-index', pageIndex);
                const page = clonePage();
                page.querySelectorAll('.wifi-card').forEach((card, i) => {
                    if (!indices.includes(i)) card.remove();
                });
                page.querySelector('.wifi-cards').dataset.count = String(indices.length);
                page.querySelectorAll('.pbg-item').forEach((item, i) => {
                    if (!indices.includes(i)) item.remove();
                });
                page.querySelector('.print-footer').textContent = indices.map(i => cards[i].querySelector('.ssid-name').textContent).join(' / ');
                nextSheet.append(page);
                if (document.querySelector('input[name="printLayout"]:checked').value === 'a5') {
                    const second = page.cloneNode(true);
                    second.classList.add('print-copy');
                    const canvases = page.querySelectorAll('canvas');
                    second.querySelectorAll('canvas').forEach((canvas, i) => canvas.getContext('2d').drawImage(canvases[i], 0, 0));
                    nextSheet.append(second);
                }
                stage.append(nextSheet);
            });
            return;
        }
        stage.style.setProperty('--sheet-count', 1);
        if (document.querySelector('input[name="printLayout"]:checked').value !== 'a5') return;
        copy = clonePage();
        copy.classList.add('print-copy');
        sheet.append(copy);
    }

    function updateSummary(cards, groups, active, separateEach) {
        const layout = document.querySelector('input[name="printLayout"]:checked').value;
        const doubled = layout === 'a5';
        const paper = layout === 'single-a5' ? 'A5' : 'A4';
        document.getElementById('paperHelp').textContent = doubled
            ? t('每張橫向 A4 左右放相同內容各一份，裁開後得到兩張 A5；中央附裁切線。')
            : t('每張直式 {paper} 放一份內容。', { paper });
        for (const [id, index] of [['mloLayout', 2], ['guestLayout', 3]]) {
            const available = active.includes(index);
            const control = document.getElementById(id);
            control.querySelectorAll('input').forEach(input => { input.disabled = separateEach || !available; });
            control.classList.toggle('is-unavailable', separateEach || !available);
            control.title = !available ? t('請先啟用此網路') : separateEach ? t('目前所有網路皆獨立列印') : '';
        }
        document.getElementById('groupHelp').textContent = separateEach
            ? t('目前每個啟用的網路各自獨立列印，包含 MLO 與訪客網路。')
            : t('開啟：獨立一張；關閉：隨其他網路合併。未啟用的網路不列印。');
        document.getElementById('printSummaryTitle').textContent = groups.length
            ? t('預計 {count} 張 {paper}', { count: groups.length, paper }) + (doubled ? t('，裁開共 {count} 張 A5', { count: groups.length * 2 }) : '')
            : t('尚未啟用任何網路');
        const list = document.getElementById('printSummaryPages');
        list.replaceChildren();
        groups.forEach(indices => {
            const item = document.createElement('li');
            item.textContent = indices.map(i => cards[i].querySelector('.band-tag').textContent).join(' ＋ ') + (doubled ? t('（相同內容兩份）') : '');
            list.append(item);
        });
    }

    function clonePage() {
        const copy = source.cloneNode(true);
        copy.removeAttribute('id');
        copy.setAttribute('aria-hidden', 'true');
        copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        const originals = source.querySelectorAll('canvas');
        copy.querySelectorAll('canvas').forEach((canvas, i) => {
            canvas.getContext('2d').drawImage(originals[i], 0, 0);
        });
        return copy;
    }

    document.getElementById('networkLayout').addEventListener('change', event => {
        syncCopy();
    });
    document.getElementById('guestLayout').addEventListener('change', syncCopy);
    document.getElementById('mloLayout').addEventListener('change', syncCopy);
    document.getElementById('qrCorrection').addEventListener('change', () => {
        renderQrCodes();
        syncCopy();
    });

    document.getElementById('printLayout').addEventListener('change', event => {
        const single = event.target.value === 'single-a5';
        const two = event.target.value === 'a5' || single;
        document.body.classList.toggle('two-a5', two);
        document.body.classList.toggle('single-a5', single);
        pageStyle.textContent = single ? '@page { size: A5 portrait; margin: 0; }' : two ? '@page { size: A4 landscape; margin: 0; }' : '';
        fitPreview();
        syncCopy();
    });
    new MutationObserver(syncCopy).observe(source, {
        subtree: true, childList: true, characterData: true, attributes: true
    });
    // QR libraries may finish image rendering after the DOM mutation.
    source.addEventListener('load', syncCopy, true);
    window.addEventListener('beforeprint', syncCopy);
    window.addEventListener('languagechange', syncCopy);
    syncCopy();
})();
