// Site information and privacy policy dialogs.
// Update WIFI_SITE_META.updated (and version) whenever a release is published.
const WIFI_SITE_META = {
    version: '2026.11.13',
    updated: '2026-11-13',
    privacyUpdated: '2026-11-13',
    author: 'Bruce Yang',
    authorUrl: 'https://github.com/bruce-yang-422',
    repo: 'https://github.com/bruce-yang-422/wifi-qr-code-generator',
    issues: 'https://github.com/bruce-yang-422/wifi-qr-code-generator/issues',
    site: 'https://wifiqr.stack-base.com/'
};

// Component names and licences are not translated.
const WIFI_SITE_COMPONENTS = [
    ['qrcodejs', 'MIT', 'src/vendor/qrcode.LICENSE'],
    ['SheetJS Community Edition (xlsx)', 'Apache-2.0', 'src/vendor/xlsx.LICENSE'],
    ['Google Fonts: Outfit, Noto Sans TC, JetBrains Mono', 'SIL Open Font License 1.1', 'https://fonts.google.com/attribution']
];
const WIFI_SITE_POLICIES = [
    ['GitHub', 'https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement'],
    ['Cloudflare', 'https://www.cloudflare.com/privacypolicy/'],
    ['Google', 'https://policies.google.com/privacy']
];

const WIFI_SITE_TEXT = {
    'zh-TW': {
        info: '網站資訊', privacy: '隱私權政策', close: '關閉視窗',
        name: '名稱', appName: 'WiFi QR Code 產生器（WiFi Studio）', version: '版本', updated: '最後更新',
        author: '作者', website: '網址', source: '原始碼', license: '授權', licenseValue: 'MIT 授權',
        hosting: '託管', hostingValue: 'GitHub Pages，經 Cloudflare 傳送', browsers: '瀏覽器支援',
        browsersValue: '近期版本的 Chrome、Edge、Firefox、Safari', feedback: '問題回報', feedbackValue: 'GitHub Issues',
        componentsTitle: '第三方元件',
        effective: '生效日期',
        sections: [
            ['摘要', '本網站不需註冊，也不使用 Cookie、分析或廣告追蹤。你輸入的 SSID、密碼與備註只在瀏覽器中處理，應用程式不會上傳到任何伺服器。'],
            ['本機儲存', '為方便下次使用，以下資料會以明文存放在此瀏覽器的 localStorage：目前輸入內容與列印設定、常用 WiFi 紀錄、介面語言、手機版模式與向量下載開關。離線功能另會快取網站程式檔，不包含你的資料。'],
            ['刪除資料', '點選「清除目前記憶」可清除目前輸入；常用 WiFi 可在管理頁刪除；清除瀏覽器的網站資料則會移除全部內容。在公用電腦上使用後，請記得清除。'],
            ['第三方服務', '網站由 GitHub Pages 託管並經 Cloudflare 傳送，這些服務可能為安全與運作記錄 IP 位址等連線資訊。字型由 Google Fonts 提供，載入時 Google 會收到你的 IP 位址與瀏覽器資訊。各服務的隱私權政策另行適用。'],
            ['匯出與分享', '下載的 PNG、SVG、EPS、PDF 與 CSV 備份可能包含 WiFi 密碼，存放與分享方式由你決定。使用系統分享時，圖片會交由你選擇的 App 處理。'],
            ['政策變更', '本政策若有更新，會修改本頁的生效日期。'],
            ['聯絡方式', '如有疑問，請透過 GitHub Issues 聯絡作者。']
        ],
        policiesTitle: '第三方隱私權政策'
    },
    'zh-CN': {
        info: '网站信息', privacy: '隐私政策', close: '关闭窗口',
        name: '名称', appName: 'WiFi QR Code 生成器（WiFi Studio）', version: '版本', updated: '最后更新',
        author: '作者', website: '网址', source: '源代码', license: '许可证', licenseValue: 'MIT 许可证',
        hosting: '托管', hostingValue: 'GitHub Pages，经 Cloudflare 传送', browsers: '浏览器支持',
        browsersValue: '近期版本的 Chrome、Edge、Firefox、Safari', feedback: '问题反馈', feedbackValue: 'GitHub Issues',
        componentsTitle: '第三方组件',
        effective: '生效日期',
        sections: [
            ['摘要', '本网站无需注册，也不使用 Cookie、分析或广告追踪。你输入的 SSID、密码与备注只在浏览器中处理，应用程序不会上传到任何服务器。'],
            ['本地存储', '为方便下次使用，以下数据会以明文保存在此浏览器的 localStorage：当前输入与打印设置、常用 WiFi 记录、界面语言、手机版模式与矢量下载开关。离线功能另会缓存网站程序文件，不包含你的数据。'],
            ['删除数据', '点击“清除当前记录”可清除当前输入；常用 WiFi 可在管理页删除；清除浏览器的网站数据会移除全部内容。在公用电脑上使用后，请记得清除。'],
            ['第三方服务', '网站由 GitHub Pages 托管并经 Cloudflare 传送，这些服务可能为安全与运行记录 IP 地址等连接信息。字体由 Google Fonts 提供，加载时 Google 会收到你的 IP 地址与浏览器信息。各服务的隐私政策另行适用。'],
            ['导出与分享', '下载的 PNG、SVG、EPS、PDF 与 CSV 备份可能包含 WiFi 密码，保存与分享方式由你决定。使用系统分享时，图片会交由你选择的应用处理。'],
            ['政策变更', '本政策如有更新，会修改本页的生效日期。'],
            ['联系方式', '如有疑问，请通过 GitHub Issues 联系作者。']
        ],
        policiesTitle: '第三方隐私政策'
    },
    en: {
        info: 'Site information', privacy: 'Privacy policy', close: 'Close',
        name: 'Name', appName: 'WiFi QR Code Generator (WiFi Studio)', version: 'Version', updated: 'Last updated',
        author: 'Author', website: 'Website', source: 'Source code', license: 'License', licenseValue: 'MIT License',
        hosting: 'Hosting', hostingValue: 'GitHub Pages, delivered through Cloudflare', browsers: 'Browser support',
        browsersValue: 'Recent Chrome, Edge, Firefox and Safari', feedback: 'Feedback', feedbackValue: 'GitHub Issues',
        componentsTitle: 'Third-party components',
        effective: 'Effective date',
        sections: [
            ['Summary', 'No sign-up, cookies, analytics or advertising trackers. The SSIDs, passwords and notes you enter are processed only in your browser; the app never uploads them to a server.'],
            ['Local storage', 'For convenience, the following is stored in plain text in this browser’s localStorage: current inputs and print settings, saved WiFi records, interface language, phone layout mode and the vector download switch. The offline cache stores the site’s program files only, never your data.'],
            ['Deleting data', 'Use “Clear current data” to remove current inputs, delete saved WiFi in the manager, or clear this site’s data in your browser to remove everything. Clear it after using a shared computer.'],
            ['Third-party services', 'The site is hosted on GitHub Pages and delivered through Cloudflare, which may log connection details such as IP addresses for security and operation. Fonts come from Google Fonts, so Google receives your IP address and browser details when they load. Each provider’s privacy policy applies.'],
            ['Exports and sharing', 'Downloaded PNG, SVG, EPS, PDF and CSV backups may contain WiFi passwords; you decide how to store and share them. When you use system sharing, the image is handled by the app you choose.'],
            ['Changes', 'If this policy changes, the effective date on this page will be updated.'],
            ['Contact', 'For questions, contact the author through GitHub Issues.']
        ],
        policiesTitle: 'Third-party privacy policies'
    },
    ja: {
        info: 'サイト情報', privacy: 'プライバシーポリシー', close: '閉じる',
        name: '名称', appName: 'WiFi QRコード作成（WiFi Studio）', version: 'バージョン', updated: '最終更新',
        author: '作者', website: 'URL', source: 'ソースコード', license: 'ライセンス', licenseValue: 'MITライセンス',
        hosting: 'ホスティング', hostingValue: 'GitHub Pages（Cloudflare経由で配信）', browsers: '対応ブラウザー',
        browsersValue: '最近のChrome、Edge、Firefox、Safari', feedback: 'お問い合わせ', feedbackValue: 'GitHub Issues',
        componentsTitle: 'サードパーティ製コンポーネント',
        effective: '施行日',
        sections: [
            ['概要', '登録は不要で、Cookie、アクセス解析、広告トラッキングは使用しません。入力したSSID、パスワード、メモはブラウザー内でのみ処理され、サーバーへ送信されることはありません。'],
            ['ローカル保存', '次回の利用に備え、次のデータをこのブラウザーのlocalStorageに平文で保存します：現在の入力と印刷設定、保存済みWiFi、表示言語、スマホ表示モード、ベクター保存の設定。オフライン用キャッシュにはサイトのプログラムのみを保存し、入力データは含みません。'],
            ['データの削除', '「現在の記憶を削除」で現在の入力を、管理画面で保存済みWiFiを削除できます。ブラウザーのサイトデータを削除するとすべて消去されます。共用パソコンでは利用後に削除してください。'],
            ['外部サービス', 'サイトはGitHub Pagesでホストされ、Cloudflare経由で配信されます。これらのサービスは安全な運用のためIPアドレスなどの接続情報を記録する場合があります。フォントはGoogle Fontsから読み込むため、GoogleにIPアドレスとブラウザー情報が送信されます。各社のプライバシーポリシーが適用されます。'],
            ['書き出しと共有', '保存したPNG、SVG、EPS、PDF、CSVバックアップにはWiFiパスワードが含まれる場合があります。保管・共有方法はご自身でご判断ください。システム共有では、選択したアプリが画像を扱います。'],
            ['ポリシーの変更', '本ポリシーを変更した場合は、このページの施行日を更新します。'],
            ['お問い合わせ', 'ご質問はGitHub Issuesから作者へご連絡ください。']
        ],
        policiesTitle: '外部サービスのプライバシーポリシー'
    },
    ko: {
        info: '사이트 정보', privacy: '개인정보 처리방침', close: '닫기',
        name: '이름', appName: 'WiFi QR 코드 생성기 (WiFi Studio)', version: '버전', updated: '최종 업데이트',
        author: '제작자', website: '주소', source: '소스 코드', license: '라이선스', licenseValue: 'MIT 라이선스',
        hosting: '호스팅', hostingValue: 'GitHub Pages, Cloudflare를 통해 제공', browsers: '지원 브라우저',
        browsersValue: '최신 Chrome, Edge, Firefox, Safari', feedback: '문의', feedbackValue: 'GitHub Issues',
        componentsTitle: '서드파티 구성 요소',
        effective: '시행일',
        sections: [
            ['요약', '가입이 필요 없으며 쿠키, 분석 도구, 광고 추적을 사용하지 않습니다. 입력한 SSID, 비밀번호, 메모는 브라우저에서만 처리되며 서버로 전송되지 않습니다.'],
            ['로컬 저장', '다음 사용을 위해 아래 정보가 이 브라우저의 localStorage에 평문으로 저장됩니다: 현재 입력과 인쇄 설정, 저장된 WiFi, 인터페이스 언어, 모바일 모드, 벡터 다운로드 설정. 오프라인 캐시에는 사이트 프로그램 파일만 저장되며 사용자 데이터는 포함되지 않습니다.'],
            ['데이터 삭제', '“현재 기록 지우기”로 현재 입력을, 관리 화면에서 저장된 WiFi를 삭제할 수 있습니다. 브라우저의 사이트 데이터를 지우면 모두 삭제됩니다. 공용 컴퓨터에서는 사용 후 꼭 지우세요.'],
            ['외부 서비스', '사이트는 GitHub Pages에서 호스팅되고 Cloudflare를 통해 제공되며, 이들 서비스는 보안과 운영을 위해 IP 주소 등 접속 정보를 기록할 수 있습니다. 글꼴은 Google Fonts에서 불러오므로 Google이 IP 주소와 브라우저 정보를 받습니다. 각 서비스의 개인정보 처리방침이 적용됩니다.'],
            ['내보내기와 공유', '다운로드한 PNG, SVG, EPS, PDF, CSV 백업에는 WiFi 비밀번호가 포함될 수 있으므로 보관과 공유는 직접 판단하세요. 시스템 공유를 사용하면 선택한 앱이 이미지를 처리합니다.'],
            ['방침 변경', '이 방침이 변경되면 이 페이지의 시행일을 갱신합니다.'],
            ['문의', '궁금한 점은 GitHub Issues로 제작자에게 문의하세요.']
        ],
        policiesTitle: '외부 서비스 개인정보 처리방침'
    },
    fr: {
        info: 'Informations sur le site', privacy: 'Politique de confidentialité', close: 'Fermer',
        name: 'Nom', appName: 'Générateur de QR code WiFi (WiFi Studio)', version: 'Version', updated: 'Dernière mise à jour',
        author: 'Auteur', website: 'Site', source: 'Code source', license: 'Licence', licenseValue: 'Licence MIT',
        hosting: 'Hébergement', hostingValue: 'GitHub Pages, diffusé via Cloudflare', browsers: 'Navigateurs',
        browsersValue: 'Versions récentes de Chrome, Edge, Firefox et Safari', feedback: 'Signaler un problème', feedbackValue: 'GitHub Issues',
        componentsTitle: 'Composants tiers',
        effective: 'Date d’effet',
        sections: [
            ['Résumé', 'Aucune inscription, aucun cookie, aucune mesure d’audience ni publicité. Les SSID, mots de passe et notes saisis sont traités uniquement dans votre navigateur ; l’application ne les envoie à aucun serveur.'],
            ['Stockage local', 'Pour votre confort, les éléments suivants sont enregistrés en clair dans le localStorage de ce navigateur : saisie et réglages d’impression actuels, WiFi enregistrés, langue, mode mobile et option de téléchargement vectoriel. Le cache hors ligne ne contient que les fichiers du site, jamais vos données.'],
            ['Suppression', '« Effacer la saisie actuelle » supprime la saisie en cours ; les WiFi enregistrés se suppriment dans le gestionnaire ; effacer les données du site dans le navigateur supprime tout. Pensez-y sur un ordinateur partagé.'],
            ['Services tiers', 'Le site est hébergé par GitHub Pages et diffusé via Cloudflare, qui peuvent enregistrer des informations de connexion comme l’adresse IP pour la sécurité et le fonctionnement. Les polices proviennent de Google Fonts : Google reçoit votre adresse IP et des informations sur le navigateur lors de leur chargement. La politique de chaque fournisseur s’applique.'],
            ['Exports et partage', 'Les PNG, SVG, EPS, PDF et sauvegardes CSV téléchargés peuvent contenir des mots de passe WiFi ; vous décidez de leur conservation et de leur partage. Avec le partage système, l’image est traitée par l’application choisie.'],
            ['Modifications', 'En cas de modification, la date d’effet de cette page sera mise à jour.'],
            ['Contact', 'Pour toute question, contactez l’auteur via GitHub Issues.']
        ],
        policiesTitle: 'Politiques de confidentialité des tiers'
    },
    de: {
        info: 'Website-Informationen', privacy: 'Datenschutzerklärung', close: 'Schließen',
        name: 'Name', appName: 'WLAN-QR-Code-Generator (WiFi Studio)', version: 'Version', updated: 'Zuletzt aktualisiert',
        author: 'Autor', website: 'Website', source: 'Quellcode', license: 'Lizenz', licenseValue: 'MIT-Lizenz',
        hosting: 'Hosting', hostingValue: 'GitHub Pages, ausgeliefert über Cloudflare', browsers: 'Browser',
        browsersValue: 'Aktuelle Versionen von Chrome, Edge, Firefox und Safari', feedback: 'Feedback', feedbackValue: 'GitHub Issues',
        componentsTitle: 'Komponenten von Drittanbietern',
        effective: 'Gültig ab',
        sections: [
            ['Zusammenfassung', 'Keine Registrierung, keine Cookies, keine Analyse- oder Werbe-Tracker. Eingegebene SSIDs, Passwörter und Notizen werden nur im Browser verarbeitet; die App sendet sie an keinen Server.'],
            ['Lokale Speicherung', 'Zur Bequemlichkeit werden folgende Daten im Klartext im localStorage dieses Browsers gespeichert: aktuelle Eingaben und Druckeinstellungen, gespeicherte WLANs, Sprache, Handy-Modus und die Einstellung für Vektordownloads. Der Offline-Cache enthält nur die Programmdateien der Website, nie Ihre Daten.'],
            ['Daten löschen', '„Aktuelle Daten löschen“ entfernt die aktuellen Eingaben, gespeicherte WLANs lassen sich in der Verwaltung löschen, und das Löschen der Websitedaten im Browser entfernt alles. Auf gemeinsam genutzten Computern bitte nach der Nutzung löschen.'],
            ['Drittanbieter', 'Die Website wird über GitHub Pages gehostet und über Cloudflare ausgeliefert; diese Dienste können zu Sicherheits- und Betriebszwecken Verbindungsdaten wie IP-Adressen protokollieren. Schriften stammen von Google Fonts, daher erhält Google beim Laden Ihre IP-Adresse und Browserangaben. Es gelten die Datenschutzerklärungen der jeweiligen Anbieter.'],
            ['Export und Teilen', 'Heruntergeladene PNG-, SVG-, EPS-, PDF- und CSV-Sicherungen können WLAN-Passwörter enthalten; Aufbewahrung und Weitergabe liegen bei Ihnen. Bei der Systemfreigabe verarbeitet die gewählte App das Bild.'],
            ['Änderungen', 'Bei Änderungen dieser Erklärung wird das Datum auf dieser Seite aktualisiert.'],
            ['Kontakt', 'Fragen bitte über GitHub Issues an den Autor richten.']
        ],
        policiesTitle: 'Datenschutzerklärungen der Drittanbieter'
    },
    es: {
        info: 'Información del sitio', privacy: 'Política de privacidad', close: 'Cerrar',
        name: 'Nombre', appName: 'Generador de códigos QR WiFi (WiFi Studio)', version: 'Versión', updated: 'Última actualización',
        author: 'Autor', website: 'Sitio web', source: 'Código fuente', license: 'Licencia', licenseValue: 'Licencia MIT',
        hosting: 'Alojamiento', hostingValue: 'GitHub Pages, servido a través de Cloudflare', browsers: 'Navegadores',
        browsersValue: 'Versiones recientes de Chrome, Edge, Firefox y Safari', feedback: 'Comentarios', feedbackValue: 'GitHub Issues',
        componentsTitle: 'Componentes de terceros',
        effective: 'Fecha de vigencia',
        sections: [
            ['Resumen', 'Sin registro, cookies, analítica ni rastreadores publicitarios. Los SSID, contraseñas y notas que introduces se procesan solo en tu navegador; la aplicación nunca los envía a un servidor.'],
            ['Almacenamiento local', 'Por comodidad, se guarda en texto plano en el localStorage de este navegador: la entrada y los ajustes de impresión actuales, las WiFi guardadas, el idioma, el modo móvil y la opción de descargas vectoriales. La caché sin conexión solo contiene los archivos del sitio, nunca tus datos.'],
            ['Borrar datos', '«Borrar datos actuales» elimina la entrada actual; las WiFi guardadas se eliminan en el gestor; borrar los datos del sitio en el navegador lo elimina todo. Hazlo después de usar un equipo compartido.'],
            ['Servicios de terceros', 'El sitio está alojado en GitHub Pages y se sirve a través de Cloudflare, que pueden registrar datos de conexión como la dirección IP por seguridad y funcionamiento. Las fuentes provienen de Google Fonts, por lo que Google recibe tu dirección IP y datos del navegador al cargarlas. Se aplica la política de cada proveedor.'],
            ['Exportar y compartir', 'Los PNG, SVG, EPS, PDF y copias CSV descargados pueden contener contraseñas WiFi; tú decides cómo guardarlos y compartirlos. Al usar el menú de compartir del sistema, la imagen la gestiona la aplicación que elijas.'],
            ['Cambios', 'Si esta política cambia, se actualizará la fecha de vigencia de esta página.'],
            ['Contacto', 'Para cualquier consulta, contacta con el autor a través de GitHub Issues.']
        ],
        policiesTitle: 'Políticas de privacidad de terceros'
    }
};

(() => {
    const dialogs = {
        info: document.getElementById('siteInfoDialog'),
        privacy: document.getElementById('privacyDialog')
    };
    const text = () => WIFI_SITE_TEXT[wifiLanguage] || WIFI_SITE_TEXT.en;
    const formatDate = value => new Intl.DateTimeFormat(wifiLanguage, { dateStyle: 'long' })
        .format(new Date(`${value}T00:00:00`));

    function element(tag, content, className) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (content !== undefined) node.textContent = content;
        return node;
    }
    function link(label, href) {
        const anchor = element('a', label);
        anchor.href = href;
        if (/^https?:/.test(href)) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
        return anchor;
    }
    function list(items) {
        const ul = element('ul');
        items.forEach(item => {
            const li = element('li');
            if (typeof item === 'string') li.textContent = item; else li.append(...item);
            ul.append(li);
        });
        return ul;
    }

    function renderInfo(body) {
        const s = text();
        const dl = element('dl', undefined, 'site-info-list');
        const rows = [
            [s.name, s.appName],
            [s.version, WIFI_SITE_META.version],
            [s.updated, formatDate(WIFI_SITE_META.updated)],
            [s.author, link(WIFI_SITE_META.author, WIFI_SITE_META.authorUrl)],
            [s.website, link(WIFI_SITE_META.site.replace(/^https:\/\/|\/$/g, ''), WIFI_SITE_META.site)],
            [s.source, link('GitHub', WIFI_SITE_META.repo)],
            [s.license, link(s.licenseValue, 'LICENSE')],
            [s.hosting, s.hostingValue],
            [s.browsers, s.browsersValue],
            [s.feedback, link(s.feedbackValue, WIFI_SITE_META.issues)]
        ];
        for (const [label, value] of rows) {
            const dd = element('dd');
            if (typeof value === 'string') dd.textContent = value; else dd.append(value);
            dl.append(element('dt', label), dd);
        }
        body.append(dl,
            element('h3', s.componentsTitle),
            list(WIFI_SITE_COMPONENTS.map(([name, licence, href]) => [`${name} — `, link(licence, href)])));
    }

    function renderPrivacy(body) {
        const s = text();
        const colon = /^(zh|ja)/.test(wifiLanguage) ? '：' : ': ';
        body.append(element('p', `${s.effective}${colon}${formatDate(WIFI_SITE_META.privacyUpdated)}`, 'site-info-date'));
        for (const [heading, paragraph] of s.sections) body.append(element('h3', heading), element('p', paragraph));
        body.append(element('h3', s.policiesTitle), list(WIFI_SITE_POLICIES.map(([name, href]) => [link(name, href)])));
    }

    function render(kind) {
        const dialog = dialogs[kind];
        const s = text();
        dialog.querySelector('h2').textContent = kind === 'info' ? s.info : s.privacy;
        dialog.querySelector('[data-close-dialog]').textContent = s.close;
        const body = dialog.querySelector('.site-info-body');
        body.replaceChildren();
        (kind === 'info' ? renderInfo : renderPrivacy)(body);
    }

    for (const [kind, dialog] of Object.entries(dialogs)) {
        document.getElementById(kind === 'info' ? 'openSiteInfo' : 'openPrivacy').addEventListener('click', () => {
            render(kind);
            dialog.showModal();
            dialog.querySelector('.site-info-body').scrollTop = 0;
        });
        dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
        // Clicking the dimmed backdrop closes the dialog; clicks on its own padding do not.
        dialog.addEventListener('click', event => {
            if (event.target !== dialog) return;
            const box = dialog.getBoundingClientRect();
            const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
            if (!inside) dialog.close();
        });
    }
    window.addEventListener('languagechange', () => {
        for (const [kind, dialog] of Object.entries(dialogs)) if (dialog.open) render(kind);
    });
})();
