const WIFI_TYPEFACES = {
    'zh-TW': { family: 'Noto Sans TC', native: '"PingFang TC", "Microsoft JhengHei"' },
    'zh-CN': { family: 'Noto Sans SC', native: '"PingFang SC", "Microsoft YaHei"' },
    ja: { family: 'Noto Sans JP', native: '"Hiragino Sans", "Yu Gothic UI", Meiryo' },
    ko: { family: 'Noto Sans KR', native: '"Apple SD Gothic Neo", "Malgun Gothic"' }
};
function getWifiTypography(language = wifiLanguage) {
    const regional = WIFI_TYPEFACES[language];
    const fallback = regional ? `"${regional.family}", ${regional.native}` : '"Segoe UI", Roboto, Arial';
    const dataFallback = regional ? `"${regional.family}", ${regional.native}` : '"Microsoft JhengHei", "Yu Gothic", "Malgun Gothic"';
    return { family: regional?.family || null,
        ui: regional ? `${fallback}, -apple-system, BlinkMacSystemFont, sans-serif` : `-apple-system, BlinkMacSystemFont, ${fallback}, sans-serif`,
        mono: `"JetBrains Mono", ${dataFallback}, ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", "Droid Sans Mono", monospace` };
}
let wifiFontStylesheet = Promise.resolve();
function applyWifiTypography() {
    const fonts = getWifiTypography();
    document.documentElement.style.setProperty('--font-ui', fonts.ui);
    document.documentElement.style.setProperty('--font-data', fonts.mono);
    let link = document.getElementById('regionalFont');
    if (!fonts.family) { link?.remove(); wifiFontStylesheet = Promise.resolve(); return; }
    const url = `https://fonts.googleapis.com/css2?family=${fonts.family.replace(/ /g, '+')}:wght@400..800&display=swap`;
    if (link?.getAttribute('href') === url) return;
    if (!link) { link = document.createElement('link'); link.id = 'regionalFont'; link.rel = 'stylesheet'; document.head.append(link); }
    wifiFontStylesheet = new Promise(resolve => {
        const finish = () => { clearTimeout(timeout); link.removeEventListener('load', finish); link.removeEventListener('error', finish); resolve(); };
        const timeout = setTimeout(finish, 2500);
        link.addEventListener('load', finish); link.addEventListener('error', finish);
    });
    link.href = url;
}
async function prepareWifiTypography(sample) {
    const fonts = getWifiTypography();
    await wifiFontStylesheet;
    if (document.fonts) {
        const loads = [document.fonts.load('600 40px "JetBrains Mono"', sample)];
        if (fonts.family) loads.push(document.fonts.load(`600 40px "${fonts.family}"`, sample));
        let timeout;
        await Promise.race([Promise.allSettled(loads), new Promise(resolve => { timeout = setTimeout(resolve, 3500); })]);
        clearTimeout(timeout);
    }
    return fonts;
}
applyWifiTypography();
window.addEventListener('languagechange', applyWifiTypography);
