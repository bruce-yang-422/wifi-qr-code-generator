// Order: Traditional Chinese, Simplified Chinese, English, Japanese, Korean,
// French, German, Spanish. User-entered network data is never translated.
const WIFI_LANGUAGES = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'fr', 'de', 'es'];
const WIFI_TRANSLATIONS = Object.create(null);
const WIFI_TRANSLATION_ROWS = `
WiFi QR Code 產生器|WiFi QR Code 生成器|WiFi QR Code Generator|WiFi QRコード作成|WiFi QR 코드 생성기|Générateur de QR code WiFi|WLAN-QR-Code-Generator|Generador de códigos QR WiFi
設定網路、安排版面，輕鬆分享連線。|设置网络、安排版面，轻松分享连接。|Set up, print and share your WiFi.|WiFiを設定・印刷して共有。|WiFi를 설정하고 인쇄하여 공유하세요.|Configurez, imprimez et partagez votre WiFi.|WLAN einrichten, drucken und teilen.|Configura, imprime y comparte tu WiFi.
安裝|安装|Install|インストール|설치|Installer|Installieren|Instalar
WiFi 設定|WiFi 设置|WiFi settings|WiFi設定|WiFi 설정|Réglages WiFi|WLAN-Einstellungen|Ajustes de WiFi
WiFi 設定欄位|WiFi 设置字段|WiFi settings fields|WiFi設定項目|WiFi 설정 항목|Champs de réglage WiFi|WLAN-Eingabefelder|Campos de ajustes WiFi
設定要分享的網路|设置要分享的网络|Networks to share|共有するネットワーク|공유할 네트워크|Réseaux à partager|Netzwerke zum Teilen|Redes para compartir
啟用需要的網路，填寫名稱與密碼，再到右側安排列印。|启用需要的网络，填写名称与密码，再安排打印。|Enable networks, enter names and passwords, then choose print settings.|ネットワークを有効にし、名前とパスワードを入力して印刷を設定します。|네트워크를 켜고 이름과 비밀번호를 입력한 후 인쇄를 설정하세요.|Activez les réseaux, saisissez les identifiants, puis réglez l’impression.|Netzwerke aktivieren, Zugangsdaten eingeben und Druck einrichten.|Activa las redes, introduce los datos y configura la impresión.
自訂標題與說明|自定义标题与说明|Custom title and notes|タイトルと説明|제목 및 설명|Titre et notes|Titel und Hinweise|Título y notas
選填|选填|Optional|任意|선택 사항|Facultatif|Optional|Opcional
WiFi 標題（選填）|WiFi 标题（选填）|WiFi title (optional)|WiFiタイトル（任意）|WiFi 제목 (선택)|Titre WiFi (facultatif)|WLAN-Titel (optional)|Título WiFi (opcional)
說明備註（選填）|说明备注（选填）|Notes (optional)|説明・備考（任意）|설명 및 메모 (선택)|Notes (facultatif)|Hinweise (optional)|Notas (opcional)
網路名稱|网络名称|Network names|ネットワーク名|네트워크 이름|Noms des réseaux|Netzwerknamen|Nombres de red
只列印已啟用的網路|仅打印已启用的网络|Only enabled networks are printed|有効なネットワークのみ印刷|켜진 네트워크만 인쇄|Seuls les réseaux activés sont imprimés|Nur aktive Netzwerke werden gedruckt|Solo se imprimen las redes activas
智慧混合（Band Steering）|智能混合（Band Steering）|Band steering|バンドステアリング|밴드 스티어링|Band steering|Band-Steering|Selección automática de banda
開啟後 2.4 / 5 GHz 共用同一 SSID，只產生一個 QR Code|开启后 2.4 / 5 GHz 共用同一 SSID，仅生成一个 QR Code|Share one SSID and QR code for 2.4 / 5 GHz.|2.4 / 5 GHzでSSIDとQRコードを共用します。|2.4 / 5 GHz에서 SSID와 QR 코드를 공유합니다.|Un seul SSID et QR code pour les bandes 2,4 / 5 GHz.|Eine SSID und ein QR-Code für 2,4 / 5 GHz.|Un único SSID y QR para 2,4 / 5 GHz.
2.4／5 GHz 共用 SSID|2.4／5 GHz 共用 SSID|Shared 2.4 / 5 GHz SSID|2.4 / 5 GHz共通SSID|2.4 / 5 GHz 공용 SSID|SSID commun 2,4 / 5 GHz|Gemeinsame SSID für 2,4 / 5 GHz|SSID compartido de 2,4 / 5 GHz
訪客 SSID|访客 SSID|Guest SSID|ゲストSSID|게스트 SSID|SSID invité|Gast-SSID|SSID de invitados
連線密碼|连接密码|Password|接続パスワード|연결 비밀번호|Mot de passe|Passwort|Contraseña
訪客密碼獨立設定|访客密码独立设置|Guest password is separate|ゲスト用パスワードは個別設定|게스트 비밀번호는 별도 설정|Mot de passe invité distinct|Separates Gastpasswort|Contraseña de invitados independiente
內部網路密碼|内部网络密码|Internal network passwords|内部ネットワークのパスワード|내부 네트워크 비밀번호|Mots de passe internes|Interne Netzwerkpasswörter|Contraseñas de redes internas
密碼相同|密码相同|Shared password|共通パスワード|공통 비밀번호|Mot de passe commun|Gleiches Passwort|Contraseña común
分開設定|分别设置|Separate passwords|個別に設定|개별 비밀번호|Mots de passe distincts|Separate Passwörter|Contraseñas distintas
共用 WiFi 密碼|共用 WiFi 密码|Shared WiFi password|共通WiFiパスワード|공용 WiFi 비밀번호|Mot de passe WiFi commun|Gemeinsames WLAN-Passwort|Contraseña WiFi común
訪客密碼|访客密码|Guest password|ゲスト用パスワード|게스트 비밀번호|Mot de passe invité|Gastpasswort|Contraseña de invitados
已選網路摘要|已选网络摘要|Selected networks|選択したネットワーク|선택한 네트워크|Réseaux sélectionnés|Ausgewählte Netzwerke|Redes seleccionadas
未填寫 SSID|未填写 SSID|SSID missing|SSID未入力|SSID 미입력|SSID manquant|SSID fehlt|Falta el SSID
訪客|访客|Guest|ゲスト|게스트|Invité|Gast|Invitados
產生 QR Code|生成 QR Code|Generate QR codes|QRコードを作成|QR 코드 생성|Générer les QR codes|QR-Codes erstellen|Generar códigos QR
🗑️ 清除記憶|🗑️ 清除记录|Clear saved data|保存データを削除|저장 데이터 지우기|Effacer les données|Gespeicherte Daten löschen|Borrar datos guardados
確定要清除所有記憶的輸入嗎？此操作無法復原。|确定要清除所有保存的输入吗？此操作无法撤销。|Clear all saved inputs? This cannot be undone.|保存した入力をすべて削除しますか？元に戻せません。|저장된 입력을 모두 지울까요? 되돌릴 수 없습니다.|Effacer toutes les saisies enregistrées ? Cette action est irréversible.|Alle gespeicherten Eingaben löschen? Dies kann nicht rückgängig gemacht werden.|¿Borrar todos los datos guardados? Esta acción no se puede deshacer.
🔒 密碼只在本機瀏覽器處理，不會送到伺服器。QR Code 會隨輸入即時更新。|🔒 密码仅在本机浏览器处理，不会发送至服务器。修改 SSID 或密码后会同步更新二维码。|🔒 Passwords stay in this browser. QR codes update when names or passwords change.|🔒 パスワードはブラウザー内で処理します。名前やパスワードを変更するとQRコードも更新されます。|🔒 비밀번호는 브라우저에서만 처리됩니다. 이름이나 비밀번호를 바꾸면 QR 코드도 갱신됩니다.|🔒 Les mots de passe restent dans ce navigateur. Les QR codes suivent vos modifications.|🔒 Passwörter bleiben in diesem Browser. QR-Codes werden bei Änderungen aktualisiert.|🔒 Las contraseñas se procesan en este navegador. Los QR se actualizan con los cambios.
列印工作區|打印工作区|Print workspace|印刷ワークスペース|인쇄 작업 공간|Espace d’impression|Druckbereich|Área de impresión
紙張預覽|纸张预览|Print preview|印刷プレビュー|인쇄 미리보기|Aperçu avant impression|Druckvorschau|Vista previa
依列印設定即時更新。|根据打印设置实时更新。|Updates with your print settings.|印刷設定に合わせて更新。|인쇄 설정에 따라 갱신됩니다.|Mise à jour selon vos réglages.|Wird an die Druckeinstellungen angepasst.|Se actualiza según los ajustes.
請填寫此網路的 SSID 與密碼|请填写此网络的 SSID 与密码|Enter this network’s SSID and password.|SSIDとパスワードを入力してください。|이 네트워크의 SSID와 비밀번호를 입력하세요.|Saisissez le SSID et le mot de passe de ce réseau.|SSID und Passwort dieses Netzwerks eingeben.|Introduce el SSID y la contraseña de esta red.
連線小提醒|连接小提示|Connection tips|接続のヒント|연결 안내|Conseils de connexion|Verbindungshinweise|Consejos de conexión
開啟手機相機掃描 QR Code，依畫面提示加入 WiFi。若無法掃描，可在 WiFi 設定中選擇上方網路名稱並輸入密碼。如仍無法連線，請聯絡網路管理者。|打开手机相机扫描二维码，按提示加入 WiFi。如无法扫描，可在 WiFi 设置中选择上述网络并输入密码。如仍无法连接，请联系网络管理员。|Scan the QR code with your camera and follow the prompts. Alternatively, select the network in WiFi settings and enter the password. If connection fails, contact your network administrator.|カメラでQRコードを読み取り、案内に従って接続してください。読み取れない場合はWiFi設定で上記のネットワークを選び、パスワードを入力してください。接続できない場合はネットワーク管理者にお問い合わせください。|카메라로 QR 코드를 스캔하고 안내를 따르세요. 스캔할 수 없으면 WiFi 설정에서 위 네트워크를 선택하고 비밀번호를 입력하세요. 연결되지 않으면 네트워크 관리자에게 문의하세요.|Scannez le QR code avec votre appareil photo et suivez les instructions. Sinon, sélectionnez le réseau dans les réglages WiFi et saisissez le mot de passe. En cas d’échec, contactez l’administrateur réseau.|QR-Code mit der Kamera scannen und den Anweisungen folgen. Alternativ das Netzwerk in den WLAN-Einstellungen wählen und das Passwort eingeben. Bei Problemen den Netzwerkadministrator kontaktieren.|Escanea el QR con la cámara y sigue las instrucciones. También puedes elegir la red en los ajustes WiFi e introducir la contraseña. Si no conecta, contacta con el administrador de red.
適合一般上網與較遠距離使用|适合一般上网与较远距离使用|For everyday browsing and longer range|通常の閲覧や離れた場所での利用に|일반 인터넷 및 먼 거리 사용에 적합|Navigation courante et portée étendue|Für normales Surfen und größere Reichweite|Para navegar y mayor alcance
適合影音觀看，靠近基地台使用較佳|适合观看影音，靠近路由器使用更佳|For streaming, preferably near the router|動画視聴向け。ルーターの近くでの利用を推奨|영상 시청에 적합하며 공유기 근처에서 사용 권장|Pour le streaming, de préférence près du routeur|Für Streaming, möglichst nahe am Router|Para vídeos, preferiblemente cerca del router
需相容裝置；無法連線時請選其他網路|需要兼容设备；无法连接时请选择其他网络|Requires a compatible device; otherwise choose another network|対応端末が必要です。接続できない場合は別のネットワークを選択|호환 기기가 필요합니다. 연결되지 않으면 다른 네트워크를 선택하세요.|Appareil compatible requis ; sinon choisissez un autre réseau|Kompatibles Gerät nötig; andernfalls anderes Netzwerk wählen|Requiere un dispositivo compatible; si no conecta, elige otra red
選擇此網路即可，裝置會自動切換頻段|选择此网络即可，设备会自动切换频段|Your device switches bands automatically|端末が自動で周波数帯を切り替えます|기기가 자동으로 주파수 대역을 전환합니다.|Votre appareil change de bande automatiquement|Das Gerät wechselt das Frequenzband automatisch|El dispositivo cambia de banda automáticamente
列印設定|打印设置|Print settings|印刷設定|인쇄 설정|Réglages d’impression|Druckeinstellungen|Ajustes de impresión
1 · 紙張與份數|1 · 纸张与份数|1 · Paper and copies|1 · 用紙と部数|1 · 용지 및 부수|1 · Papier et copies|1 · Papier und Kopien|1 · Papel y copias
A4 單張|A4 单张|A4 portrait|A4縦|A4 세로|A4 portrait|A4 Hochformat|A4 vertical
A5 單張|A5 单张|A5 portrait|A5縦|A5 세로|A5 portrait|A5 Hochformat|A5 vertical
A4 印兩份 A5|A4 打印两份 A5|Two A5 copies on A4|A4にA5を2部|A4에 A5 두 부|Deux A5 sur A4|Zwei A5-Kopien auf A4|Dos copias A5 en A4
2 · 獨立列印|2 · 独立打印|2 · Separate pages|2 · 個別印刷|2 · 개별 인쇄|2 · Pages séparées|2 · Separate Seiten|2 · Páginas separadas
所有網路各自獨立|所有网络各自独立|Separate every network|全ネットワークを個別印刷|모든 네트워크 개별 인쇄|Séparer chaque réseau|Jedes Netzwerk einzeln|Separar todas las redes
MLO 獨立列印|MLO 独立打印|Print MLO separately|MLOを個別印刷|MLO 개별 인쇄|Imprimer MLO séparément|MLO separat drucken|Imprimir MLO por separado
訪客網路獨立列印|访客网络独立打印|Print guest network separately|ゲストを個別印刷|게스트 네트워크 개별 인쇄|Imprimer le réseau invité séparément|Gastnetz separat drucken|Imprimir invitados por separado
目前每個啟用的網路各自獨立列印，包含 MLO 與訪客網路。|当前每个已启用的网络各自独立打印，包括 MLO 与访客网络。|Every enabled network gets its own page, including MLO and guests.|MLO・ゲストを含め、有効な各ネットワークを個別に印刷します。|MLO와 게스트를 포함하여 켜진 모든 네트워크를 개별 인쇄합니다.|Chaque réseau activé a sa page, y compris MLO et invités.|Jedes aktive Netzwerk erhält eine eigene Seite, auch MLO und Gäste.|Cada red activa tiene su propia página, incluidas MLO e invitados.
開啟：獨立一張；關閉：隨其他網路合併。未啟用的網路不列印。|开启：独立一张；关闭：与其他网络合并。未启用的网络不打印。|On: separate page. Off: merge with other networks. Disabled networks are not printed.|オン：個別印刷。オフ：他とまとめて印刷。無効なネットワークは印刷されません。|켬: 개별 페이지. 끔: 다른 네트워크와 합침. 꺼진 네트워크는 인쇄하지 않습니다.|Activé : page séparée. Désactivé : regroupement. Les réseaux inactifs ne sont pas imprimés.|Ein: eigene Seite. Aus: zusammen drucken. Inaktive Netzwerke werden nicht gedruckt.|Activado: página propia. Desactivado: combinar. No se imprimen redes inactivas.
請先啟用此網路|请先启用此网络|Enable this network first|先にネットワークを有効にしてください|먼저 네트워크를 켜세요.|Activez d’abord ce réseau|Dieses Netzwerk zuerst aktivieren|Activa primero esta red
目前所有網路皆獨立列印|当前所有网络均独立打印|All networks are already separate|全ネットワークが個別印刷に設定されています|모든 네트워크가 이미 개별 인쇄됩니다.|Tous les réseaux sont déjà séparés|Alle Netzwerke werden bereits einzeln gedruckt|Todas las redes ya se imprimen por separado
尚未啟用任何網路|尚未启用任何网络|No networks enabled|ネットワークが有効になっていません|켜진 네트워크 없음|Aucun réseau activé|Keine Netzwerke aktiviert|No hay redes activas
3 · QR Code 容錯率|3 · QR Code 容错率|3 · QR error correction|3 · QR誤り訂正|3 · QR 오류 정정|3 · Correction d’erreurs QR|3 · QR-Fehlerkorrektur|3 · Corrección de errores QR
QR Code 容錯等級|QR Code 容错等级|QR error correction level|QR誤り訂正レベル|QR 오류 정정 수준|Niveau de correction QR|QR-Fehlerkorrekturstufe|Nivel de corrección QR
低|低|Low|低|낮음|Faible|Niedrig|Bajo
標準|标准|Standard|標準|표준|Standard|Standard|Estándar
較高|较高|Higher|やや高|높음|Élevé|Höher|Alto
高|高|High|高|최고|Maximum|Hoch|Máximo
容錯越高，較能承受污損，但圖案也可能更密集。低於 H 時隱藏中央圖示，保留辨識空間。|容错越高越能承受污损，但图案可能更密集。低于 H 时隐藏中央图标。|Higher correction tolerates more damage but may create denser codes. Below H, the center icon is hidden.|訂正レベルが高いほど汚れに強くなりますが、模様は細かくなる場合があります。H未満では中央アイコンを非表示にします。|정정 수준이 높으면 손상에 강하지만 코드가 복잡해질 수 있습니다. H 미만에서는 중앙 아이콘을 숨깁니다.|Une correction élevée tolère plus de dommages, mais peut densifier le code. Sous H, l’icône centrale est masquée.|Höhere Korrektur verträgt mehr Schäden, kann aber dichtere Codes erzeugen. Unter H wird das mittige Symbol ausgeblendet.|Más corrección tolera más daños, pero puede generar códigos más densos. Por debajo de H se oculta el icono central.
🖨️ 列印 / 儲存為 PDF|🖨️ 打印 / 保存为 PDF|Print / Save PDF|印刷 / PDF保存|인쇄 / PDF 저장|Imprimer / PDF|Drucken / PDF speichern|Imprimir / Guardar PDF
分享圖片|分享图片|Share images|画像を共有|이미지 공유|Partager des images|Bilder teilen|Compartir imágenes
每個網路獨立下載 1200 × 1600 PNG（3:4），可傳送至 LINE 或其他 App。|各网络独立下载 1200 × 1600 PNG（3:4），可分享到 LINE 等应用。|Download each network as a 1200 × 1600 PNG (3:4) to share in LINE or other apps.|各ネットワークを1200 × 1600のPNG（3:4）で保存し、LINEなどで共有できます。|각 네트워크를 1200 × 1600 PNG(3:4)로 다운로드하여 LINE 등으로 공유하세요.|Téléchargez chaque réseau en PNG 1200 × 1600 (3:4), à partager sur LINE ou ailleurs.|Jedes Netzwerk als PNG mit 1200 × 1600 (3:4) herunterladen und teilen.|Descarga cada red como PNG de 1200 × 1600 (3:4) para compartir en LINE u otras apps.
正在準備圖片…|正在准备图片…|Preparing image…|画像を準備中…|이미지 준비 중…|Préparation de l’image…|Bild wird vorbereitet…|Preparando imagen…
圖片下載失敗，請縮短網路資料後重試。|图片下载失败，请缩短网络资料后重试。|Image export failed. Try shorter network details.|画像の保存に失敗しました。入力を短くしてお試しください。|이미지 저장 실패. 네트워크 정보를 줄이고 다시 시도하세요.|Échec de l’export. Essayez des identifiants plus courts.|Bildexport fehlgeschlagen. Kürzere Netzwerkdaten versuchen.|Error al exportar. Prueba con datos de red más cortos.
掃描連線|扫描连接|Scan to connect|スキャンして接続|스캔하여 연결|Scanner pour se connecter|Scannen und verbinden|Escanea para conectar
開啟相機掃描，即可加入網路|打开相机扫描，即可加入网络|Scan with your camera to connect|カメラで読み取って接続|카메라로 스캔하여 연결|Scannez avec l’appareil photo|Mit der Kamera scannen und verbinden|Escanea con la cámara para conectar
掃描加入 {ssid}|扫描加入 {ssid}|Scan to join {ssid}|スキャンして {ssid} に接続|스캔하여 {ssid} 연결|Scannez pour rejoindre {ssid}|Scannen, um {ssid} beizutreten|Escanea para unirte a {ssid}
等待產生 {band} QR Code|等待生成 {band} QR Code|Waiting for {band} QR code|{band} QRコード待機中|{band} QR 코드 대기 중|En attente du QR code {band}|Warte auf QR-Code für {band}|Esperando QR de {band}
下載 {band} PNG|下载 {band} PNG|Download {band} PNG|{band} PNGを保存|{band} PNG 다운로드|Télécharger PNG {band}|{band}-PNG herunterladen|Descargar PNG de {band}
已下載：{file}|已下载：{file}|Downloaded: {file}|保存済み：{file}|다운로드 완료: {file}|Téléchargé : {file}|Heruntergeladen: {file}|Descargado: {file}
每張直式 {paper} 放一份內容。|每张竖向 {paper} 放一份内容。|One copy per portrait {paper} sheet.|縦向き{paper}に1部ずつ印刷します。|{paper} 세로 용지당 한 부를 인쇄합니다.|Une copie par feuille {paper} portrait.|Eine Kopie pro {paper}-Blatt im Hochformat.|Una copia por hoja {paper} vertical.
每張橫向 A4 左右放相同內容各一份，裁開後得到兩張 A5；中央附裁切線。|每张横向 A4 左右放相同内容各一份，裁开后得到两张 A5，中间有裁切线。|Two identical A5 copies per landscape A4 sheet, with a center cut line.|A4横に同じ内容を2部配置。中央の裁断線で切るとA5が2枚になります。|A4 가로에 같은 내용의 A5 두 부를 배치하며 중앙 재단선이 있습니다.|Deux copies A5 identiques sur une A4 paysage, avec ligne de coupe.|Zwei gleiche A5-Kopien auf A4 quer, mit Schnittlinie in der Mitte.|Dos copias A5 iguales en una A4 horizontal, con línea de corte central.
預計 {count} 張 {paper}|预计 {count} 张 {paper}|{count} {paper} sheets|{paper} {count}枚|{paper} {count}장|{count} feuilles {paper}|{count} Blatt {paper}|{count} hojas {paper}
，裁開共 {count} 張 A5|，裁开共 {count} 张 A5|, cut into {count} A5 copies|、裁断後A5 {count}枚|, 재단 후 A5 {count}장|, soit {count} A5 après découpe|, nach Zuschnitt {count} A5-Kopien|, {count} copias A5 al cortar
（相同內容兩份）|（相同内容两份）| (two identical copies)|（同じ内容を2部）| (동일 내용 두 부)| (deux copies identiques)| (zwei gleiche Kopien)| (dos copias iguales)
（獨立密碼）|（独立密码）| (separate password)|（個別パスワード）| (개별 비밀번호)| (mot de passe distinct)| (separates Passwort)| (contraseña independiente)
約 {percent}%|约 {percent}%|About {percent}%|約{percent}%|약 {percent}%|Env. {percent}%|Ca. {percent}%|Aprox. {percent}%
預設|默认|Default|既定|기본값|Par défaut|Standard|Predeterminado
啟用 {name}|启用 {name}|Enable {name}|{name}を有効化|{name} 켜기|Activer {name}|{name} aktivieren|Activar {name}
{band} 密碼|{band} 密码|{band} password|{band}のパスワード|{band} 비밀번호|Mot de passe {band}|{band}-Passwort|Contraseña de {band}
輸入 {band} 密碼|输入 {band} 密码|Enter {band} password|{band}のパスワードを入力|{band} 비밀번호 입력|Saisissez le mot de passe {band}|{band}-Passwort eingeben|Introduce la contraseña de {band}
顯示或隱藏{band}密碼|显示或隐藏{band}密码|Show or hide {band} password|{band}のパスワードを表示・非表示|{band} 비밀번호 표시/숨기기|Afficher ou masquer le mot de passe {band}|{band}-Passwort anzeigen/verbergen|Mostrar u ocultar contraseña de {band}
例如：{value}|例如：{value}|Example: {value}|例：{value}|예: {value}|Exemple : {value}|Beispiel: {value}|Ejemplo: {value}
`;
WIFI_TRANSLATION_ROWS.trim().split('\n').forEach(row => {
    const cells = row.split('|');
    WIFI_TRANSLATIONS[cells[0]] = cells;
});
function addWifiAlias(source, template, values = {}) {
    WIFI_TRANSLATIONS[source] = WIFI_TRANSLATIONS[template].map((value, index) => value.replace(/\{(\w+)\}/g,
        (match, key) => WIFI_TRANSLATIONS[values[key]]?.[index] || values[key] || match));
    WIFI_TRANSLATIONS[source][0] = source;
}
for (const band of ['2.4 GHz', '5 GHz', 'MLO']) {
    addWifiAlias(`${band} 密碼`, '{band} 密碼', { band });
    addWifiAlias(`輸入 ${band} 密碼`, '輸入 {band} 密碼', { band });
    addWifiAlias(`顯示或隱藏 ${band} 密碼`, '顯示或隱藏{band}密碼', { band });
    addWifiAlias(`等待產生 ${band} QR Code`, '等待產生 {band} QR Code', { band });
}
addWifiAlias('等待產生訪客 QR Code', '等待產生 {band} QR Code', { band: '訪客' });
for (const percent of [7, 15, 25, 30]) addWifiAlias(`約 ${percent}%`, '約 {percent}%', { percent: String(percent) });
WIFI_TRANSLATIONS['約 30% · 預設'] = WIFI_TRANSLATIONS['約 30%'].map((value, i) => value + ' · ' + WIFI_TRANSLATIONS['預設'][i]);
for (const [source, key] of [
    ['訪客 Guest', '訪客'], ['PASSWORD', '連線密碼'], ['訪客 WiFi 密碼', '訪客密碼'],
    ['清除瀏覽器記憶的所有輸入', '🗑️ 清除記憶'],
    ['請先填寫此網路的 SSID 與密碼', '請填寫此網路的 SSID 與密碼'],
    ['輸入 SSID 與密碼後，按下產生 QR Code', '請填寫此網路的 SSID 與密碼'],
    ['輸入三組 WiFi 共用密碼', '共用 WiFi 密碼'],
    ['顯示或隱藏共用密碼', '共用 WiFi 密碼'], ['顯示或隱藏訪客密碼', '訪客密碼'],
    ['啟用智慧混合', '智慧混合（Band Steering）'],
    ['可將 MLO、訪客網路獨立成頁，依使用對象分開提供。', '開啟：獨立一張；關閉：隨其他網路合併。未啟用的網路不列印。'],
    ['每張 A4 放一份內容。', 'A4 單張'],
    ['A4 橫向，左右兩張 A5，含中央裁切線', '每張橫向 A4 左右放相同內容各一份，裁開後得到兩張 A5；中央附裁切線。']
]) {
    WIFI_TRANSLATIONS[source] = [...WIFI_TRANSLATIONS[key]];
    WIFI_TRANSLATIONS[source][0] = source;
}
const WIFI_EXTRA_ROWS = `
WiFi 分享工具說明|免费在线把 WiFi 名称与密码做成二维码，手机相机一扫即可连接。支持 2.4／5 GHz、MLO 与访客网络，可打印 A4／A5、下载 PNG／SVG／EPS 并管理常用 WiFi；密码仅在浏览器处理，可离线使用。|Free WiFi QR code generator: phones join with one camera scan. 2.4/5 GHz, MLO and guest networks, A4/A5 printing, PNG/SVG/EPS. Passwords stay in your browser.|無料のWiFi QRコード作成ツール。スマホのカメラで読み取るだけで接続できます。2.4/5 GHz、MLO、ゲストネットワーク、A4/A5印刷、PNG/SVG/EPS保存、WiFi管理に対応。パスワードはブラウザー内で処理し、オフラインでも使えます。|무료 WiFi QR 코드 생성기. 휴대폰 카메라로 스캔하면 바로 연결됩니다. 2.4/5 GHz, MLO, 게스트 네트워크, A4/A5 인쇄, PNG/SVG/EPS 다운로드와 WiFi 관리를 지원하며 비밀번호는 브라우저에서만 처리되고 오프라인에서도 사용할 수 있습니다.|Générateur gratuit de QR code WiFi : un scan avec l’appareil photo suffit pour se connecter. 2,4/5 GHz, MLO, réseau invité, impression A4/A5, export PNG/SVG/EPS et réseaux enregistrés. Les mots de passe restent dans le navigateur ; fonctionne hors ligne.|Kostenloser WLAN-QR-Code-Generator: mit der Handykamera scannen und verbinden. 2,4/5 GHz, MLO, Gastnetz, A4/A5-Druck, PNG/SVG/EPS-Export und gespeicherte Netzwerke. Passwörter bleiben im Browser; funktioniert offline.|Generador gratuito de códigos QR WiFi: escanea con la cámara del móvil para conectarte. 2,4/5 GHz, MLO, red de invitados, impresión A4/A5, descarga PNG/SVG/EPS y redes guardadas. Las contraseñas no salen del navegador; funciona sin conexión.
SEO 標題副題|免费制作、A4／A5 打印、PNG／SVG 下载|Free, Print A4/A5, PNG/SVG Downloads|無料作成・A4/A5印刷・PNG/SVG保存|무료 생성·A4/A5 인쇄·PNG/SVG 다운로드|Gratuit, impression A4/A5, PNG/SVG|Kostenlos, A4/A5-Druck, PNG/SVG|Gratis, impresión A4/A5, PNG/SVG
例如：訪客無線網路／會議室 WiFi／公共上網區|例如：访客无线网络／会议室 WiFi／公共上网区|Example: Guest WiFi / Meeting room|例：ゲストWiFi／会議室|예: 게스트 WiFi / 회의실|Exemple : WiFi invité / Salle de réunion|Beispiel: Gäste-WLAN / Besprechungsraum|Ejemplo: WiFi de invitados / Sala de reuniones
備註範例|备注示例|Hours: 09:00–18:00; Location: Lobby; Access: Internet only|利用時間：09:00–18:00、場所：ロビー、利用範囲：インターネットのみ|이용 시간: 09:00–18:00, 위치: 로비, 권한: 인터넷 전용|Horaires : 09:00–18:00 ; Lieu : Hall ; Accès : Internet uniquement|Zeiten: 09:00–18:00; Ort: Empfang; Zugang: Nur Internet|Horario: 09:00–18:00; Ubicación: Vestíbulo; Acceso: Solo Internet
`;
WIFI_EXTRA_ROWS.trim().split('\n').forEach(row => { const cells = row.split('|'); WIFI_TRANSLATIONS[cells[0]] = cells; });
const WIFI_PROFILE_ROWS = `
檢查並預覽|检查并预览|Check and preview|確認してプレビュー|확인 및 미리보기|Vérifier et prévisualiser|Prüfen und Vorschau|Comprobar y previsualizar
網路與密碼|网络与密码|Networks and passwords|ネットワークとパスワード|네트워크 및 비밀번호|Réseaux et mots de passe|Netzwerke und Passwörter|Redes y contraseñas
請至少啟用一個網路。|请至少启用一个网络。|Enable at least one network.|ネットワークを1つ以上有効にしてください。|네트워크를 하나 이상 켜세요.|Activez au moins un réseau.|Mindestens ein Netzwerk aktivieren.|Activa al menos una red.
請填寫「{field}」。|请填写“{field}”。|Please fill in “{field}”.|「{field}」を入力してください。|'{field}' 항목을 입력하세요.|Veuillez renseigner « {field} ».|Bitte „{field}“ ausfüllen.|Rellena «{field}».
WPA 密碼需為 8～63 個字元（目前 {count} 個），否則裝置可能無法連線。|WPA 密码需为 8～63 个字符（当前 {count} 个），否则设备可能无法连接。|WPA passwords need 8–63 characters (currently {count}); devices may fail to connect.|WPAパスワードは8～63文字が必要です（現在{count}文字）。接続できない場合があります。|WPA 비밀번호는 8~63자여야 합니다(현재 {count}자). 연결되지 않을 수 있습니다.|Le mot de passe WPA doit comporter 8 à 63 caractères (actuellement {count}) ; la connexion peut échouer.|WPA-Passwörter brauchen 8–63 Zeichen (derzeit {count}); die Verbindung kann sonst fehlschlagen.|La contraseña WPA debe tener 8–63 caracteres (ahora {count}); la conexión podría fallar.
WiFi 連線|WiFi 连接|WiFi Access|WiFi接続|WiFi 접속|Accès WiFi|WLAN-Zugang|Acceso WiFi
WiFi 連線資訊|WiFi 连接信息|WiFi network sheet|WiFi接続情報|WiFi 연결 정보|Fiche WiFi|WLAN-Infoblatt|Ficha de WiFi
開啟系統分享|打开系统分享|Open share sheet|共有メニューを開く|시스템 공유 열기|Ouvrir le partage|Systemfreigabe öffnen|Abrir menú de compartir
下載 PNG|下载 PNG|Download PNG|PNGを保存|PNG 다운로드|Télécharger PNG|PNG herunterladen|Descargar PNG
圖片已準備，可分享或下載。|图片已准备好，可以分享或下载。|Image ready to share or download.|画像を共有または保存できます。|이미지를 공유하거나 다운로드할 수 있습니다.|Image prête à partager ou télécharger.|Bild zum Teilen oder Herunterladen bereit.|Imagen lista para compartir o descargar.
無法開啟分享，請使用下載 PNG。|无法打开分享，请使用下载 PNG。|Sharing is unavailable. Use Download PNG.|共有できません。「PNGを保存」をお使いください。|공유할 수 없습니다. PNG 다운로드를 이용하세요.|Partage indisponible. Utilisez Télécharger PNG.|Teilen nicht verfügbar. PNG herunterladen verwenden.|No se puede compartir. Usa Descargar PNG.
WiFi 分享圖片|WiFi 分享图片|WiFi sharing image|WiFi共有画像|WiFi 공유 이미지|Image de partage WiFi|WLAN-Freigabebild|Imagen para compartir WiFi
加入主畫面|添加到主屏幕|Add to Home Screen|ホーム画面に追加|홈 화면에 추가|Sur l’écran d’accueil|Zum Home-Bildschirm|Añadir a pantalla de inicio
在 Safari 開啟此網站，點選分享，再選擇「加入主畫面」。|在 Safari 打开此网站，点按分享，然后选择“添加到主屏幕”。|Open this site in Safari, tap Share, then choose Add to Home Screen.|Safariでこのサイトを開き、共有から「ホーム画面に追加」を選択します。|Safari에서 이 사이트를 열고 공유를 누른 다음 홈 화면에 추가를 선택하세요.|Ouvrez ce site dans Safari, touchez Partager, puis Sur l’écran d’accueil.|Diese Seite in Safari öffnen, Teilen und dann Zum Home-Bildschirm wählen.|Abre este sitio en Safari, toca Compartir y elige Añadir a pantalla de inicio.
完成|完成|Done|完了|완료|Terminé|Fertig|Listo
手機功能選單|手机功能菜单|Mobile navigation|モバイルメニュー|모바일 메뉴|Navigation mobile|Mobile Navigation|Navegación móvil
輸入|输入|Input|入力|입력|Saisie|Eingabe|Datos
下載|下载|Downloads|保存|다운로드|Télécharger|Downloads|Descargas
預覽|预览|Preview|プレビュー|미리보기|Aperçu|Vorschau|Vista previa
完整版|完整版|Full mode|フル版|전체 모드|Mode complet|Vollversion|Modo completo
精簡版|精简版|Simple mode|簡易版|간편 모드|Mode simple|Einfacher Modus|Modo simple
切換至完整版|切换至完整版|Switch to full mode|フル版に切り替える|전체 모드로 전환|Passer au mode complet|Zur Vollversion wechseln|Cambiar al modo completo
切換至精簡版|切换至精简版|Switch to simple mode|簡易版に切り替える|간편 모드로 전환|Passer au mode simple|Zum einfachen Modus wechseln|Cambiar al modo simple
分享 PNG|分享 PNG|Share PNG|共有用PNG|공유용 PNG|PNG à partager|PNG zum Teilen|PNG para compartir
純 QR PNG|纯 QR PNG|QR-only PNG|QRのみPNG|QR 전용 PNG|PNG du QR seul|Nur QR als PNG|PNG solo QR
分享 PNG 是完整資訊卡；純 QR PNG 是 1200 × 1200 透明底 QR Code，供美術排版。|分享 PNG 是完整信息卡；纯 QR PNG 是 1200 × 1200 透明底二维码，供美术排版。|Share PNG is a complete info card. QR-only PNG is a transparent 1200 × 1200 code for artwork.|共有用PNGは情報カードです。QRのみPNGはデザイン用の1200 × 1200の透過画像です。|공유용 PNG는 정보 카드입니다. QR 전용 PNG는 디자인용 1200 × 1200 투명 이미지입니다.|Le PNG à partager est une carte complète. Le PNG QR seul est transparent, 1200 × 1200, pour la mise en page.|PNG zum Teilen ist die Infokarte. QR-PNG ist transparent, 1200 × 1200, für Layouts.|El PNG para compartir es una tarjeta completa. El PNG solo QR es transparente, 1200 × 1200, para diseño.
下載 {band} {format}|下载 {band} {format}|Download {band} {format}|{band}の{format}を保存|{band} {format} 다운로드|Télécharger {band} en {format}|{band} als {format} herunterladen|Descargar {band} en {format}
向量檔下載失敗，請檢查網路資料後重試。|矢量文件下载失败，请检查网络数据后重试。|Vector export failed. Check the network details and try again.|ベクターファイルの保存に失敗しました。ネットワーク情報を確認してください。|벡터 파일 저장 실패. 네트워크 정보를 확인하고 다시 시도하세요.|Échec de l’export vectoriel. Vérifiez les données réseau.|Vektorexport fehlgeschlagen. Netzwerkdaten prüfen.|Error al exportar el vector. Revisa los datos de la red.
顯示向量下載（SVG／EPS）|显示矢量下载（SVG／EPS）|Show vector downloads (SVG/EPS)|ベクター保存を表示（SVG／EPS）|벡터 다운로드 표시 (SVG/EPS)|Afficher SVG / EPS|Vektordownloads anzeigen (SVG/EPS)|Mostrar descargas vectoriales (SVG/EPS)
SVG／EPS 為純 QR Code 向量檔，適合海報排版；EPS 使用 K100 純黑，不畫白底。請在淺色背景上保留四格淨空。|SVG／EPS 为纯二维码矢量文件，适合海报排版；EPS 使用 K100 纯黑，不绘制白底。请在浅色背景上保留四格空白。|SVG/EPS contain only the vector QR code for poster layouts. EPS uses K100 black with no background. Keep a four-module quiet zone on a light surface.|SVG／EPSはポスター用のQRコードのみのベクターです。EPSはK100黒、背景なしです。明るい背景で周囲4セル分の余白を保ってください。|SVG/EPS는 포스터용 QR 코드 벡터입니다. EPS는 K100 검정이며 배경이 없습니다. 밝은 배경에서 네 모듈의 여백을 유지하세요.|SVG/EPS contient uniquement le QR vectoriel. EPS utilise le noir K100 sans fond. Gardez une marge de quatre modules sur fond clair.|SVG/EPS enthalten nur den Vektor-QR-Code. EPS nutzt K100-Schwarz ohne Hintergrund. Vier Module Rand auf hellem Grund freihalten.|SVG/EPS contiene solo el QR vectorial. EPS usa negro K100 sin fondo. Conserva un margen de cuatro módulos sobre fondo claro.
內部備註（不列印）|内部备注（不打印）|Internal notes (not printed)|内部メモ（印刷しない）|내부 메모 (인쇄 안 함)|Notes internes (non imprimées)|Interne Notizen (nicht gedruckt)|Notas internas (no se imprimen)
例如：設備位置、聯絡人、維護注意事項|例如：设备位置、联系人、维护注意事项|e.g. Equipment location, contact person, maintenance notes|例：機器の場所、連絡先、保守上の注意|예: 장비 위치, 연락처, 유지보수 주의 사항|Ex. Emplacement, contact, consignes de maintenance|Z. B. Gerätestandort, Kontakt, Wartungshinweise|Ej.: Ubicación, contacto, notas de mantenimiento
僅供管理使用，不會出現在列印、QR Code 或分享圖片。|仅供管理使用，不会出现在打印、QR Code 或分享图片中。|For management only. Excluded from printouts, QR codes and shared images.|管理用です。印刷、QRコード、共有画像には含まれません。|관리 전용입니다. 인쇄물, QR 코드 및 공유 이미지에는 포함되지 않습니다.|Gestion uniquement. Exclues des impressions, QR codes et images partagées.|Nur zur Verwaltung. Nicht in Ausdrucken, QR-Codes oder geteilten Bildern enthalten.|Solo para gestión. No aparece en impresiones, QR ni imágenes compartidas.
更多網路與管理選項|更多网络与管理选项|More networks and saved settings|その他のネットワークと管理|추가 네트워크 및 관리|Autres réseaux et gestion|Weitere Netzwerke und Verwaltung|Más redes y gestión
紙張與列印選項|纸张与打印选项|Paper and print options|用紙と印刷オプション|용지 및 인쇄 옵션|Papier et options d’impression|Papier- und Druckoptionen|Papel y opciones de impresión
查看列印預覽|查看打印预览|Show print preview|印刷プレビューを表示|인쇄 미리보기 표시|Afficher l’aperçu|Druckvorschau anzeigen|Ver vista previa
網路名稱（SSID）|网络名称（SSID）|Network name (SSID)|ネットワーク名（SSID）|네트워크 이름 (SSID)|Nom du réseau (SSID)|Netzwerkname (SSID)|Nombre de red (SSID)
匯入檔案|导入文件|Import file|ファイルを読み込む|파일 가져오기|Importer un fichier|Datei importieren|Importar archivo
選擇要匯入的工作表|选择要导入的工作表|Choose a worksheet to import|読み込むシートを選択|가져올 워크시트 선택|Choisir une feuille à importer|Tabellenblatt zum Import wählen|Elegir hoja para importar
請先選擇一個工作表。|请先选择一个工作表。|Choose one worksheet first.|先にシートを選択してください。|먼저 워크시트를 선택하세요.|Choisissez d’abord une feuille.|Zuerst ein Tabellenblatt wählen.|Elige primero una hoja.
可匯入 {count} 組設定。|可导入 {count} 组设置。|{count} sets ready to import.|{count}件を読み込めます。|{count}개 설정을 가져올 수 있습니다.|{count} réglages prêts à importer.|{count} Einstellungen bereit zum Import.|{count} ajustes listos para importar.
此工作表無法匯入，請確認包含 ssid、password 欄位。|此工作表无法导入，请确认包含 ssid、password 列。|Cannot import this sheet. Check for ssid and password columns.|このシートは読み込めません。ssidとpassword列を確認してください。|이 시트를 가져올 수 없습니다. ssid와 password 열을 확인하세요.|Import impossible. Vérifiez les colonnes ssid et password.|Dieses Blatt lässt sich nicht importieren. Spalten ssid und password prüfen.|No se puede importar esta hoja. Comprueba las columnas ssid y password.
匯入此工作表|导入此工作表|Import this worksheet|このシートを読み込む|이 워크시트 가져오기|Importer cette feuille|Dieses Blatt importieren|Importar esta hoja
SSID 與密碼建議使用文字格式，避免試算表移除開頭的 0。|SSID 和密码建议使用文本格式，避免电子表格删除开头的 0。|Use text formatting for SSIDs and passwords so spreadsheets keep leading zeros.|SSIDとパスワードは文字列形式にすると、先頭の0が保持されます。|SSID와 비밀번호는 텍스트 형식을 사용하여 앞의 0을 보존하세요.|Utilisez le format texte pour conserver les zéros initiaux des SSID et mots de passe.|SSID und Passwörter als Text formatieren, damit führende Nullen erhalten bleiben.|Usa formato de texto para conservar ceros iniciales en SSID y contraseñas.
支援 CSV、Excel 與 Numbers 匯入；多工作表會先讓您選擇。資料至少需有 ssid、password 欄位。|支持 CSV、Excel 和 Numbers 导入；多个工作表会先让您选择。数据至少需有 ssid、password 列。|Import CSV, Excel or Numbers. Choose a sheet when there are several. Data needs ssid and password columns.|CSV・Excel・Numbersを読み込めます。複数シートがある場合は選択します。ssidとpassword列が必要です。|CSV, Excel, Numbers를 가져올 수 있습니다. 시트가 여러 개면 선택합니다. ssid와 password 열이 필요합니다.|Importez CSV, Excel ou Numbers. Choisissez une feuille s’il y en a plusieurs. Colonnes ssid et password requises.|CSV, Excel oder Numbers importieren. Bei mehreren Blättern zuerst eines auswählen. Spalten ssid und password nötig.|Importa CSV, Excel o Numbers. Si hay varias hojas, elige una. Se requieren ssid y password.
匯入失敗。請確認檔案格式及欄位；CSV 上限 2 MB、Excel／Numbers 上限 10 MB，最多 200 組。原有紀錄未變更。|导入失败。请检查文件格式和列；CSV 上限 2 MB、Excel／Numbers 上限 10 MB，最多 200 组。原有记录未更改。|Import failed. Check format and columns. Limits: CSV 2 MB, Excel/Numbers 10 MB, 200 sets. Existing records are unchanged.|読み込みに失敗しました。形式と列を確認してください。上限：CSV 2 MB、Excel/Numbers 10 MB、200件。既存の記録は変更されていません。|가져오기 실패. 형식과 열을 확인하세요. 한도: CSV 2 MB, Excel/Numbers 10 MB, 200개. 기존 기록은 유지됩니다.|Échec de l’import. Vérifiez format et colonnes. Limites : CSV 2 Mo, Excel/Numbers 10 Mo, 200 réglages. Données inchangées.|Import fehlgeschlagen. Format und Spalten prüfen. Grenzen: CSV 2 MB, Excel/Numbers 10 MB, 200 Einträge. Vorhandene Daten unverändert.|Error al importar. Revisa formato y columnas. Límites: CSV 2 MB, Excel/Numbers 10 MB, 200 ajustes. Los registros no se modificaron.
匯入 CSV|导入 CSV|Import CSV|CSVを読み込む|CSV 가져오기|Importer CSV|CSV importieren|Importar CSV
匯出 CSV 完整備份|导出 CSV 完整备份|Export full CSV backup|CSVで完全バックアップ|전체 CSV 백업 내보내기|Exporter la sauvegarde CSV complète|Vollständige CSV-Sicherung exportieren|Exportar copia CSV completa
CSV 完整保留所有設定，可用 Numbers／Excel 開啟。一般 CSV 匯入至少需有 ssid、password 欄位。|CSV 完整保留所有设置，可用 Numbers／Excel 打开。普通 CSV 导入至少需有 ssid、password 列。|CSV preserves every setting and opens in Numbers or Excel. General CSV imports require ssid and password columns.|CSVは全設定を保持し、NumbersやExcelで開けます。一般のCSV読み込みにはssidとpassword列が必要です。|CSV는 모든 설정을 보존하며 Numbers나 Excel에서 열 수 있습니다. 일반 CSV 가져오기에는 ssid와 password 열이 필요합니다.|Le CSV conserve tous les réglages et s’ouvre dans Numbers ou Excel. L’import d’un CSV standard nécessite les colonnes ssid et password.|CSV enthält alle Einstellungen und lässt sich in Numbers oder Excel öffnen. Allgemeine CSV-Importe benötigen ssid und password.|El CSV conserva todos los ajustes y se abre en Numbers o Excel. Un CSV general necesita las columnas ssid y password.
設定詳細資料|设置详细信息|Record details|設定の詳細|설정 세부 정보|Détails du réglage|Eintragsdetails|Detalles del registro
點選表格中的項目，查看完整參數。|点击表格中的项目，查看完整参数。|Select a table row to inspect all settings.|表の項目を選択すると、すべての設定を確認できます。|표의 항목을 선택하여 전체 설정을 확인하세요.|Sélectionnez une ligne pour voir tous les paramètres.|Eine Tabellenzeile wählen, um alle Parameter zu sehen.|Selecciona una fila para ver todos los parámetros.
匯出 CSV|导出 CSV|Export CSV|CSVを書き出す|CSV 내보내기|Exporter CSV|CSV exportieren|Exportar CSV
匯出完整備份|导出完整备份|Export full backup|完全バックアップを書き出す|전체 백업 내보내기|Exporter la sauvegarde complète|Vollständige Sicherung exportieren|Exportar copia completa
匯入 CSV／備份|导入 CSV／备份|Import CSV / backup|CSV／バックアップを読み込む|CSV / 백업 가져오기|Importer CSV / sauvegarde|CSV / Sicherung importieren|Importar CSV / copia
顯示密碼|显示密码|Show passwords|パスワードを表示|비밀번호 표시|Afficher les mots de passe|Passwörter anzeigen|Mostrar contraseñas
隱藏密碼|隐藏密码|Hide passwords|パスワードを隠す|비밀번호 숨기기|Masquer les mots de passe|Passwörter verbergen|Ocultar contraseñas
一般設定|一般设置|General settings|一般設定|일반 설정|Réglages généraux|Allgemeine Einstellungen|Ajustes generales
狀態|状态|Status|状態|상태|État|Status|Estado
紙張|纸张|Paper|用紙|용지|Papier|Papier|Papel
開啟|开启|On|オン|켬|Activé|Ein|Activado
關閉|关闭|Off|オフ|끔|Désactivé|Aus|Desactivado
頻段|频段|Band|周波数帯|주파수 대역|Bande|Frequenzband|Banda
更新時間|更新时间|Updated|更新日時|수정 시간|Mise à jour|Aktualisiert|Actualizado
操作|操作|Actions|操作|작업|Actions|Aktionen|Acciones
CSV 可用 Numbers／Excel 開啟；匯入至少需有 ssid、password 欄位。完整備份則包含所有設定。|CSV 可用 Numbers／Excel 打开；导入至少需有 ssid、password 列。完整备份包含所有设置。|Open CSV in Numbers or Excel. Imports need at least ssid and password columns. Full backups include all settings.|CSVはNumbersやExcelで開けます。読み込みにはssidとpassword列が必要です。完全バックアップは全設定を含みます。|CSV는 Numbers나 Excel에서 열 수 있습니다. 가져오기에는 ssid와 password 열이 필요합니다. 전체 백업은 모든 설정을 포함합니다.|Ouvrez le CSV dans Numbers ou Excel. Les colonnes ssid et password sont requises. La sauvegarde complète inclut tous les réglages.|CSV lässt sich in Numbers oder Excel öffnen. Zum Import sind ssid und password nötig. Die vollständige Sicherung enthält alle Einstellungen.|Abre el CSV en Numbers o Excel. Para importar se necesitan las columnas ssid y password. La copia completa incluye todos los ajustes.
清除目前自動記憶|清除当前自动记录|Clear current auto-saved data|現在の自動保存データを削除|현재 자동 저장 데이터 지우기|Effacer la saisie automatique actuelle|Aktuelle automatisch gespeicherte Daten löschen|Borrar datos actuales guardados automáticamente
清除目前記憶|清除当前记录|Clear current data|現在の記憶を削除|현재 기록 지우기|Effacer la saisie actuelle|Aktuelle Daten löschen|Borrar datos actuales
清除目前自動記憶？|清除当前自动记录？|Clear current auto-saved data?|現在の自動保存データを削除しますか？|현재 자동 저장 데이터를 지울까요?|Effacer la saisie automatique actuelle ?|Aktuelle automatisch gespeicherte Daten löschen?|¿Borrar los datos actuales guardados automáticamente?
只清除目前輸入的自動記憶，不會刪除常用 WiFi。|只清除当前输入的自动记录，不会删除常用 WiFi。|Only the current auto-saved inputs are cleared. Saved WiFi sets are kept.|現在の入力の自動保存のみ削除します。保存済みWiFiは削除されません。|현재 입력의 자동 저장만 지웁니다. 저장된 WiFi는 유지됩니다.|Seule la saisie automatique actuelle est effacée. Les WiFi enregistrés sont conservés.|Nur die aktuellen automatischen Eingaben werden gelöscht. Gespeicherte WLANs bleiben erhalten.|Solo se borran las entradas actuales guardadas automáticamente. Se conservan las WiFi guardadas.
紀錄只存在此瀏覽器，請自行備份|记录仅保存在此浏览器，请自行备份|Saved only in this browser. Keep your own backup.|記録はこのブラウザー内のみです。バックアップを保管してください。|기록은 이 브라우저에만 저장됩니다. 직접 백업하세요.|Données conservées dans ce navigateur uniquement. Gardez une sauvegarde.|Daten nur in diesem Browser. Eigene Sicherung aufbewahren.|Los datos solo se guardan en este navegador. Conserva una copia.
清除 Cookie 與網站資料、重設或移除瀏覽器，可能一併刪除所有已儲存紀錄。請先匯出備份，並保存在安全的位置。|清除 Cookie 和网站数据、重置或卸载浏览器，可能同时删除所有已保存记录。请先导出备份并安全保存。|Clearing cookies and site data, resetting or removing the browser may delete all saved records. Export a backup first and keep it somewhere safe.|Cookie・サイトデータの削除、ブラウザーのリセットや削除で全記録が消える場合があります。事前にバックアップを書き出し、安全な場所に保管してください。|쿠키 및 사이트 데이터 삭제, 브라우저 초기화 또는 제거 시 모든 기록이 삭제될 수 있습니다. 먼저 백업을 내보내 안전하게 보관하세요.|Effacer les cookies et données de site, réinitialiser ou désinstaller le navigateur peut supprimer tous les enregistrements. Exportez d’abord une sauvegarde et conservez-la en lieu sûr.|Das Löschen von Cookies und Websitedaten sowie das Zurücksetzen oder Entfernen des Browsers kann alle Einträge löschen. Zuerst eine Sicherung exportieren und sicher aufbewahren.|Borrar cookies y datos del sitio, restablecer o eliminar el navegador puede borrar todos los registros. Exporta primero una copia y guárdala de forma segura.
例如：公司網路、家裡網路、1樓門市、辦公室A|例如：公司网络、家里网络、1楼门店、办公室A|e.g. Office, Home, Floor 1 shop, Office A|例：会社、自宅、1階店舗、オフィスA|예: 회사, 집, 1층 매장, 사무실 A|Ex. Bureau, Maison, Boutique RDC, Bureau A|Z. B. Firma, Zuhause, Laden EG, Büro A|Ej.: Empresa, Casa, Tienda planta 1, Oficina A
常用 WiFi|常用 WiFi|Saved WiFi|保存済みWiFi|저장된 WiFi|WiFi enregistrés|Gespeicherte WLANs|WiFi guardadas
依場所儲存多組網路與密碼，之後一鍵載入。|按地点保存多组网络与密码，之后一键载入。|Save networks by location and load them in one click.|場所ごとにネットワークを保存し、ワンクリックで読み込みます。|장소별로 네트워크를 저장하고 한 번에 불러오세요.|Enregistrez vos réseaux par lieu, puis chargez-les en un clic.|Netzwerke nach Standort speichern und mit einem Klick laden.|Guarda redes por lugar y cárgalas con un clic.
儲存目前設定|保存当前设置|Save current settings|現在の設定を保存|현재 설정 저장|Enregistrer les réglages|Aktuelle Einstellungen speichern|Guardar ajustes actuales
管理常用 WiFi|管理常用 WiFi|Manage saved WiFi|保存済みWiFiを管理|저장된 WiFi 관리|Gérer les WiFi|Gespeicherte WLANs verwalten|Gestionar WiFi guardadas
常用 WiFi 管理|常用 WiFi 管理|Saved WiFi manager|保存済みWiFiの管理|저장된 WiFi 관리|Gestion des WiFi|WLAN-Verwaltung|Gestión de WiFi
選擇一組設定，即可載入網路、密碼與列印安排。|选择一组设置即可载入网络、密码与打印安排。|Load a saved set of networks, passwords and print settings.|保存したネットワーク、パスワード、印刷設定を読み込みます。|저장된 네트워크, 비밀번호, 인쇄 설정을 불러오세요.|Chargez réseaux, mots de passe et réglages d’impression.|Gespeicherte Netzwerke, Passwörter und Druckeinstellungen laden.|Carga redes, contraseñas y ajustes de impresión guardados.
返回列印預覽|返回打印预览|Back to print preview|印刷プレビューに戻る|인쇄 미리보기로 돌아가기|Retour à l’aperçu|Zurück zur Druckvorschau|Volver a la vista previa
匯出備份|导出备份|Export backup|バックアップを書き出す|백업 내보내기|Exporter la sauvegarde|Sicherung exportieren|Exportar copia
匯入備份|导入备份|Import backup|バックアップを読み込む|백업 가져오기|Importer une sauvegarde|Sicherung importieren|Importar copia
搜尋設定|搜索设置|Search saved settings|保存した設定を検索|저장된 설정 검색|Rechercher des réglages|Einstellungen suchen|Buscar ajustes
搜尋名稱或 SSID|搜索名称或 SSID|Search name or SSID|名前またはSSIDで検索|이름 또는 SSID 검색|Rechercher un nom ou SSID|Name oder SSID suchen|Buscar nombre o SSID
備份檔包含 WiFi 密碼，請妥善保存。|备份文件包含 WiFi 密码，请妥善保管。|Backups contain WiFi passwords. Keep them private.|バックアップにはWiFiパスワードが含まれます。安全に保管してください。|백업에는 WiFi 비밀번호가 포함됩니다. 안전하게 보관하세요.|Les sauvegardes contiennent les mots de passe WiFi. Gardez-les privées.|Sicherungen enthalten WLAN-Passwörter. Sicher aufbewahren.|Las copias contienen contraseñas WiFi. Guárdalas de forma segura.
儲存常用 WiFi|保存常用 WiFi|Save WiFi settings|WiFi設定を保存|WiFi 설정 저장|Enregistrer le WiFi|WLAN-Einstellungen speichern|Guardar ajustes WiFi
設定名稱|设置名称|Name|設定名|설정 이름|Nom|Name|Nombre
例如：公司、家裡、店面|例如：公司、家里、门店|e.g. Office, Home, Shop|例：会社、自宅、店舗|예: 회사, 집, 매장|Ex. Bureau, Maison, Boutique|Z. B. Büro, Zuhause, Laden|Ej.: Oficina, Casa, Tienda
取消|取消|Cancel|キャンセル|취소|Annuler|Abbrechen|Cancelar
儲存|保存|Save|保存|저장|Enregistrer|Speichern|Guardar
更新同名設定|更新同名设置|Update existing settings|同名の設定を更新|같은 이름의 설정 갱신|Mettre à jour l’existant|Vorhandene Einstellungen aktualisieren|Actualizar ajustes existentes
此名稱已存在，儲存將更新該組設定。|此名称已存在，保存将更新这组设置。|This name already exists. Saving updates that set.|同じ名前が存在します。保存するとその設定を更新します。|같은 이름이 있습니다. 저장하면 해당 설정이 갱신됩니다.|Ce nom existe déjà. L’enregistrement met à jour ces réglages.|Dieser Name existiert bereits. Speichern aktualisiert diese Einstellungen.|Este nombre ya existe. Al guardar se actualizarán esos ajustes.
保存網路、密碼、標題備註與列印設定。|保存网络、密码、标题备注与打印设置。|Saves networks, passwords, title, notes and print settings.|ネットワーク、パスワード、タイトル、備考、印刷設定を保存します。|네트워크, 비밀번호, 제목, 메모, 인쇄 설정을 저장합니다.|Enregistre réseaux, mots de passe, titre, notes et impression.|Speichert Netzwerke, Passwörter, Titel, Hinweise und Druckeinstellungen.|Guarda redes, contraseñas, título, notas y ajustes de impresión.
請輸入設定名稱。|请输入设置名称。|Enter a name for these settings.|設定名を入力してください。|설정 이름을 입력하세요.|Saisissez un nom.|Einen Namen eingeben.|Introduce un nombre.
已儲存 {count} 組|已保存 {count} 组|{count} saved|{count}件保存済み|{count}개 저장됨|{count} enregistrés|{count} gespeichert|{count} guardadas
尚無常用設定，先按「儲存目前設定」建立第一組。|暂无常用设置，请先点击“保存当前设置”。|No saved settings yet. Choose “Save current settings” to start.|「現在の設定を保存」から最初の設定を作成してください。|저장된 설정이 없습니다. '현재 설정 저장'으로 시작하세요.|Aucun réglage enregistré. Commencez par enregistrer les réglages actuels.|Noch keine Einstellungen gespeichert. Zuerst aktuelle Einstellungen speichern.|Aún no hay ajustes guardados. Guarda los ajustes actuales para empezar.
找不到符合的設定。|找不到匹配的设置。|No matching settings.|該当する設定はありません。|일치하는 설정이 없습니다.|Aucun résultat.|Keine passenden Einstellungen.|No hay coincidencias.
已載入|已载入|Loaded|読み込み済み|불러옴|Chargé|Geladen|Cargada
有未儲存變更|有未保存的更改|Unsaved changes|未保存の変更あり|저장하지 않은 변경 사항|Modifications non enregistrées|Ungespeicherte Änderungen|Cambios sin guardar
載入並預覽|载入并预览|Load and preview|読み込んでプレビュー|불러오기 및 미리보기|Charger et prévisualiser|Laden und Vorschau|Cargar y previsualizar
刪除|删除|Delete|削除|삭제|Supprimer|Löschen|Eliminar
刪除「{name}」|删除“{name}”|Delete “{name}”|「{name}」を削除|'{name}' 삭제|Supprimer « {name} »|„{name}“ löschen|Eliminar «{name}»
已儲存「{name}」。|已保存“{name}”。|Saved “{name}”.|「{name}」を保存しました。|'{name}' 저장 완료.|« {name} » enregistré.|„{name}“ gespeichert.|«{name}» guardada.
已載入「{name}」。|已载入“{name}”。|Loaded “{name}”.|「{name}」を読み込みました。|'{name}' 불러옴.|« {name} » chargé.|„{name}“ geladen.|«{name}» cargada.
已刪除「{name}」。|已删除“{name}”。|Deleted “{name}”.|「{name}」を削除しました。|'{name}' 삭제 완료.|« {name} » supprimé.|„{name}“ gelöscht.|«{name}» eliminada.
還原載入前設定|还原载入前的设置|Undo load|読み込み前に戻す|불러오기 취소|Annuler le chargement|Laden rückgängig machen|Deshacer carga
已還原載入前設定。|已还原载入前的设置。|Previous settings restored.|以前の設定に戻しました。|이전 설정을 복원했습니다.|Réglages précédents restaurés.|Vorherige Einstellungen wiederhergestellt.|Ajustes anteriores restaurados.
還原刪除|撤销删除|Undo delete|削除を取り消す|삭제 취소|Annuler la suppression|Löschen rückgängig machen|Deshacer eliminación
已還原刪除的設定。|已恢复删除的设置。|Deleted settings restored.|削除した設定を復元しました。|삭제한 설정을 복원했습니다.|Réglages supprimés restaurés.|Gelöschte Einstellungen wiederhergestellt.|Ajustes eliminados restaurados.
已匯出 {count} 組設定。|已导出 {count} 组设置。|Exported {count} sets.|{count}件を書き出しました。|{count}개 내보내기 완료.|{count} réglages exportés.|{count} Einstellungen exportiert.|{count} ajustes exportados.
已匯入 {count} 組，保留原有設定。|已导入 {count} 组，保留原有设置。|Imported {count} sets. Existing settings were kept.|{count}件を読み込みました。既存の設定は保持されています。|{count}개 가져옴. 기존 설정은 유지됩니다.|{count} réglages importés. Les réglages existants sont conservés.|{count} Einstellungen importiert. Vorhandene bleiben erhalten.|{count} ajustes importados. Se conservan los existentes.
無法匯入：請選擇有效的 WiFi 備份檔（最多 2 MB、200 組）。原有設定未變更。|无法导入：请选择有效的 WiFi 备份文件（最多 2 MB、200 组）。原有设置未更改。|Import failed. Choose a valid WiFi backup (up to 2 MB and 200 sets). Existing settings are unchanged.|読み込みに失敗しました。有効なWiFiバックアップ（2 MB・200件まで）を選択してください。既存の設定は変更されていません。|가져오기 실패. 올바른 WiFi 백업(최대 2 MB, 200개)을 선택하세요. 기존 설정은 변경되지 않았습니다.|Échec de l’import. Choisissez une sauvegarde WiFi valide (2 Mo, 200 réglages maximum). Aucune modification.|Import fehlgeschlagen. Gültige WLAN-Sicherung wählen (max. 2 MB, 200 Einträge). Vorhandene Daten bleiben unverändert.|Error al importar. Elige una copia WiFi válida (máx. 2 MB y 200 ajustes). No se modificaron los datos existentes.
無法儲存，請確認瀏覽器允許本機儲存或先匯出備份。|无法保存，请确认浏览器允许本地存储或先导出备份。|Cannot save. Check browser storage permissions or export a backup.|保存できません。ブラウザーの保存設定を確認するかバックアップを書き出してください。|저장할 수 없습니다. 브라우저 저장 권한을 확인하거나 백업을 내보내세요.|Enregistrement impossible. Vérifiez le stockage du navigateur ou exportez une sauvegarde.|Speichern nicht möglich. Browserspeicher prüfen oder Sicherung exportieren.|No se puede guardar. Revisa el almacenamiento o exporta una copia.
無法讀取已儲存設定，請先匯出備份或檢查瀏覽器儲存空間。|无法读取已保存设置，请先导出备份或检查浏览器存储空间。|Cannot read saved settings. Check your browser storage.|保存した設定を読み込めません。ブラウザーの保存領域を確認してください。|저장된 설정을 읽을 수 없습니다. 브라우저 저장 공간을 확인하세요.|Lecture impossible. Vérifiez le stockage du navigateur.|Gespeicherte Einstellungen nicht lesbar. Browserspeicher prüfen.|No se pueden leer los ajustes. Revisa el almacenamiento del navegador.
無法匯出備份，請重試。|无法导出备份，请重试。|Could not export backup. Try again.|書き出せませんでした。もう一度お試しください。|백업 내보내기 실패. 다시 시도하세요.|Échec de l’export. Réessayez.|Export fehlgeschlagen. Erneut versuchen.|Error al exportar. Inténtalo de nuevo.
`;
WIFI_PROFILE_ROWS.trim().split('\n').forEach(row => { const cells = row.split('|'); WIFI_TRANSLATIONS[cells[0]] = cells; });
function resolveWifiLanguage(preferences) {
    for (const preference of preferences) {
        const tag = preference.toLowerCase();
        if (tag.startsWith('zh')) return /hant|tw|hk|mo/.test(tag) ? 'zh-TW' : 'zh-CN';
        const base = tag.split('-')[0];
        if (WIFI_LANGUAGES.includes(base)) return base;
    }
    return 'en';
}
// Each language has its own crawlable URL (?lang=xx); the bare URL auto-detects (x-default).
const WIFI_SITE_URL = 'https://wifiqr.stack-base.com/';
const wifiUrlLanguage = (() => {
    const requested = new URLSearchParams(location.search).get('lang');
    return WIFI_LANGUAGES.find(language => language.toLowerCase() === requested?.toLowerCase()) || null;
})();
let wifiLanguage = wifiUrlLanguage;
if (!wifiLanguage) {
    try { wifiLanguage = localStorage.getItem('wifi-language'); } catch (_) { /* Optional storage. */ }
}
if (!WIFI_LANGUAGES.includes(wifiLanguage)) wifiLanguage = resolveWifiLanguage(navigator.languages || [navigator.language || 'en']);
function t(source, values = {}) {
    const row = WIFI_TRANSLATIONS[source];
    return (row ? row[WIFI_LANGUAGES.indexOf(wifiLanguage)] : source)
        .replace(/\{(\w+)\}/g, (match, key) => values[key] === undefined ? match : String(values[key]));
}

// Static HTML is marked once. Dynamic content uses t() at its source.
function initWifiLanguage() {
    const selector = document.getElementById('languageSelect');
    const picker = document.getElementById('languagePicker');
    const menu = document.getElementById('languageMenu');
    const languageButtons = [...selector.options].map(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('role', 'radio');
        button.dataset.language = option.value;
        button.textContent = option.textContent;
        button.addEventListener('click', () => {
            selector.value = option.value;
            selector.dispatchEvent(new Event('change'));
            picker.open = false;
            picker.querySelector('summary').focus();
        });
        menu.append(button);
        return button;
    });
    menu.setAttribute('role', 'radiogroup');
    menu.addEventListener('keydown', event => {
        const index = languageButtons.indexOf(document.activeElement);
        if (index < 0) return;
        let next;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % languageButtons.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + languageButtons.length - 1) % languageButtons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = languageButtons.length - 1;
        if (next !== undefined) { event.preventDefault(); languageButtons[next].focus(); }
    });
    picker.addEventListener('keydown', event => {
        if (event.key === 'Escape') { picker.open = false; picker.querySelector('summary').focus(); }
    });
    document.addEventListener('click', event => { if (!picker.contains(event.target)) picker.open = false; });
    const originalNodes = [];
    const attributes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement.closest('script,style,select')) continue;
        const source = node.textContent.trim();
        if (WIFI_TRANSLATIONS[source]) originalNodes.push([node, source]);
    }
    document.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(element => {
        for (const attribute of ['placeholder', 'title', 'aria-label', 'alt']) {
            const source = element.getAttribute(attribute);
            if (source) attributes.push([element, attribute, source]);
        }
    });
    function translateAttribute(source) {
        if (source.startsWith('例如：\n')) {
            return wifiLanguage === 'zh-TW' ? source : wifiLanguage === 'zh-CN'
                ? '例如：\n开放时间：每日 09:00–18:00\nWiFi 位置：大厅\n使用权限：仅限互联网连接' : t('備註範例');
        }
        const toggle = source.match(/^顯示或隱藏\s*(.+?)\s*密碼$/);
        if (toggle) return t('顯示或隱藏{band}密碼', { band: t(toggle[1]) });
        if (WIFI_TRANSLATIONS[source]) return t(source);
        for (const [pattern, template, key] of [
            [/^啟用 (.+)$/, '啟用 {name}', 'name'],
            [/^例如：(.+)$/, '例如：{value}', 'value'],
            [/^輸入 (.+) 密碼$/, '輸入 {band} 密碼', 'band']
        ]) {
            const match = source.match(pattern);
            if (match) return t(template, { [key]: t(match[1] === '訪客網路' ? '訪客' : match[1]) });
        }
        return t(source);
    }
    // Keep the SEO title and description written in index.html for the default language.
    const seoTitle = document.title;
    const seoDescription = document.querySelector('meta[name="description"]')?.content || '';
    function apply() {
        document.documentElement.lang = wifiLanguage;
        selector.value = wifiLanguage;
        document.getElementById('languageName').textContent = selector.selectedOptions[0].textContent;
        languageButtons.forEach(button => button.setAttribute('aria-checked', String(button.dataset.language === wifiLanguage)));
        for (const [node, source] of originalNodes) if (node.isConnected) node.textContent = t(source);
        for (const [element, attribute, source] of attributes) element.setAttribute(attribute, translateAttribute(source));
        document.title = wifiLanguage === 'zh-TW' ? seoTitle : t('WiFi QR Code 產生器') + ' | ' + t('SEO 標題副題');
        const description = wifiLanguage === 'zh-TW' ? seoDescription : t('WiFi 分享工具說明');
        for (const key of ['description', 'og:description', 'twitter:description']) {
            const element = document.querySelector(`meta[name="${key}"],meta[property="${key}"]`);
            if (element) element.content = description;
        }
        for (const key of ['og:title', 'twitter:title']) document.querySelector(`meta[property="${key}"],meta[name="${key}"]`)?.setAttribute('content', document.title);
        const locales = { 'zh-TW': 'zh_TW', 'zh-CN': 'zh_CN', en: 'en_US', ja: 'ja_JP', ko: 'ko_KR', fr: 'fr_FR', de: 'de_DE', es: 'es_ES' };
        document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locales[wifiLanguage]);
        // Self-referencing canonical: a ?lang= page points to itself, the bare URL to the bare URL.
        const pageUrl = wifiUrlLanguage || new URLSearchParams(location.search).has('lang')
            ? `${WIFI_SITE_URL}?lang=${wifiLanguage}` : WIFI_SITE_URL;
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
        canonical.href = pageUrl;
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
        document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(element => element.remove());
        for (const [language, locale] of Object.entries(locales)) {
            if (language === wifiLanguage) continue;
            const alternate = document.createElement('meta'); alternate.setAttribute('property', 'og:locale:alternate'); alternate.content = locale;
            document.head.append(alternate);
        }
    }
    apply();
    selector.addEventListener('change', () => {
        wifiLanguage = selector.value;
        try { localStorage.setItem('wifi-language', wifiLanguage); } catch (_) { /* Optional storage. */ }
        // Keep the address shareable: the link reopens in the language that was chosen.
        const url = new URL(location.href);
        url.searchParams.set('lang', wifiLanguage);
        history.replaceState(history.state, '', url);
        apply();
        updatePreviewText();
        renderQrCodes();
        window.dispatchEvent(new Event('languagechange'));
    });
}
initWifiLanguage();
