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
🔒 密碼只在本機瀏覽器處理，不會送到伺服器。若已產生 QR Code，後續修改 SSID 或密碼也會同步更新。|🔒 密码仅在本机浏览器处理，不会发送至服务器。修改 SSID 或密码后会同步更新二维码。|🔒 Passwords stay in this browser. QR codes update when names or passwords change.|🔒 パスワードはブラウザー内で処理します。名前やパスワードを変更するとQRコードも更新されます。|🔒 비밀번호는 브라우저에서만 처리됩니다. 이름이나 비밀번호를 바꾸면 QR 코드도 갱신됩니다.|🔒 Les mots de passe restent dans ce navigateur. Les QR codes suivent vos modifications.|🔒 Passwörter bleiben in diesem Browser. QR-Codes werden bei Änderungen aktualisiert.|🔒 Las contraseñas se procesan en este navegador. Los QR se actualizan con los cambios.
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
獨立 A5|独立 A5|A5 portrait|A5縦|A5 세로|A5 portrait|A5 Hochformat|A5 vertical
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
WiFi 分享工具說明|WiFi 分享工具说明|Generate WiFi QR codes, print A4 or A5 sheets, and share PNG images. Supports multiple networks and offline use.|WiFiのQRコードを作成し、A4・A5で印刷、PNG画像で共有。複数ネットワークとオフライン利用に対応。|WiFi QR 코드를 생성하고 A4·A5로 인쇄하거나 PNG로 공유하세요. 여러 네트워크와 오프라인 사용을 지원합니다.|Créez des QR codes WiFi, imprimez en A4 ou A5 et partagez des PNG. Plusieurs réseaux et utilisation hors ligne.|WLAN-QR-Codes erstellen, auf A4 oder A5 drucken und als PNG teilen. Mehrere Netzwerke und Offline-Nutzung.|Genera códigos QR WiFi, imprime en A4 o A5 y comparte PNG. Admite varias redes y uso sin conexión.
例如：訪客無線網路／會議室 WiFi／公共上網區|例如：访客无线网络／会议室 WiFi／公共上网区|Example: Guest WiFi / Meeting room|例：ゲストWiFi／会議室|예: 게스트 WiFi / 회의실|Exemple : WiFi invité / Salle de réunion|Beispiel: Gäste-WLAN / Besprechungsraum|Ejemplo: WiFi de invitados / Sala de reuniones
備註範例|备注示例|Hours: 09:00–18:00; Location: Lobby; Access: Internet only|利用時間：09:00–18:00、場所：ロビー、利用範囲：インターネットのみ|이용 시간: 09:00–18:00, 위치: 로비, 권한: 인터넷 전용|Horaires : 09:00–18:00 ; Lieu : Hall ; Accès : Internet uniquement|Zeiten: 09:00–18:00; Ort: Empfang; Zugang: Nur Internet|Horario: 09:00–18:00; Ubicación: Vestíbulo; Acceso: Solo Internet
`;
WIFI_EXTRA_ROWS.trim().split('\n').forEach(row => { const cells = row.split('|'); WIFI_TRANSLATIONS[cells[0]] = cells; });
function resolveWifiLanguage(preferences) {
    for (const preference of preferences) {
        const tag = preference.toLowerCase();
        if (tag.startsWith('zh')) return /hant|tw|hk|mo/.test(tag) ? 'zh-TW' : 'zh-CN';
        const base = tag.split('-')[0];
        if (WIFI_LANGUAGES.includes(base)) return base;
    }
    return 'en';
}
let wifiLanguage;
try { wifiLanguage = localStorage.getItem('wifi-language'); } catch (_) { /* Optional storage. */ }
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
    document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(element => {
        for (const attribute of ['placeholder', 'title', 'aria-label']) {
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
        document.title = wifiLanguage === 'zh-TW' ? seoTitle : t('WiFi QR Code 產生器') + ' | A4 / A5 · PNG';
        const description = wifiLanguage === 'zh-TW'
            ? seoDescription
            : wifiLanguage === 'zh-CN'
                ? '在线生成 WiFi QR Code，支持 A4／A5 打印、PNG 分享、多组网络与离线使用。'
                : t('WiFi 分享工具說明');
        for (const key of ['description', 'og:description', 'twitter:description']) {
            const element = document.querySelector(`meta[name="${key}"],meta[property="${key}"]`);
            if (element) element.content = description;
        }
        for (const key of ['og:title', 'twitter:title']) document.querySelector(`meta[property="${key}"],meta[name="${key}"]`)?.setAttribute('content', document.title);
        const locales = { 'zh-TW': 'zh_TW', 'zh-CN': 'zh_CN', en: 'en_US', ja: 'ja_JP', ko: 'ko_KR', fr: 'fr_FR', de: 'de_DE', es: 'es_ES' };
        document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locales[wifiLanguage]);
    }
    apply();
    selector.addEventListener('change', () => {
        wifiLanguage = selector.value;
        try { localStorage.setItem('wifi-language', wifiLanguage); } catch (_) { /* Optional storage. */ }
        apply();
        updatePreviewText();
        renderQrCodes();
        window.dispatchEvent(new Event('languagechange'));
    });
}
initWifiLanguage();
