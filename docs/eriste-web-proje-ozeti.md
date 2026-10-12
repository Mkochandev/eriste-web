# erişte — tanıtım sitesi proje özeti

Bu dosya, **erişte** mobil uygulamasının tanıtım sitesini (eriste.app) yapacak yeni çalışma için hazırlandı. Uygulama ayrı bir repoda geliştiriliyor; site **ayrı bir repoda** (`eriste-web`) yapılacak. Burada projenin ne olduğu, marka kimliği, sitenin kapsamı, yasal sayfalar için veri envanteri ve teknik kararlar var.

`TODO:` ile işaretli yerler henüz kesinleşmedi; uydurma, bana sor ya da yer tutucu bırak.

---

## 1. Proje kısaca

- **Uygulama:** erişte (App Store adı: "Erişte: Abonelik Takip")
- **Slogan:** Bütün aboneliklerin tek kâsede.
- **Ne yapar:** Türkiye'deki kullanıcıların dijital aboneliklerini (Netflix, Spotify, YouTube Premium, ChatGPT, iCloud vb.) tek yerde takip etmesini sağlar. Kullanıcı fiyatı elle girmez: katalogdan uygulamayı ve planı seçer, fiyatlar resmi fiyat sayfalarından otomatik taranır ve zam olunca listesi kendiliğinden güncellenir.
- **Hedef kitle:** Çok sayıda aboneliği olan öğrenciler ve beyaz yakalılar (Türkiye).
- **Geliştirici:** Muhammed Koçhan, bireysel geliştirici (şirket yok). Malatya.
- **Platform:** iOS ilk sürüm (App Store), Android sonra.
- **Maskot:** Kıvırık, kâsenin içinden çıkan sarı, kıvırcık bir erişte teli. Uygulamada soruları o soruyor, sitede de rehber karakter olacak.
- **Ton:** Samimi, esprili ama abartısız; "sen" diye hitap. Kısa cümleler.

### Ana özellikler (sitede anlatılacak)

1. **Katalogdan seç:** Popüler servisler ve planları hazır; fiyat yazmak yok.
2. **Otomatik fiyat takibi:** Fiyatlar düzenli olarak resmi sayfalardan taranır, zamlar listene yansır.
3. **Kıvırık sorar:** Abonelik eklerken maskot birkaç kısa soru sorar (ne sıklıkla kullanıyorsun, ödeme günü ne zaman).
4. **Aylık/yıllık toplam gider, kategori dağılımı, yaklaşan ödemeler.**
5. **Dolar fiyatlı abonelikler TL'ye çevrilir.**
6. **Misafir modu:** Hesap açmadan 5 aboneliğe kadar cihazda dene.
7. **Gizlilik:** Banka hesabı bağlamak yok, reklam yok, izleme yok.

### Ücretsiz ve Premium

- **Ücretsiz:** 5 aboneliğe kadar takip.
- **Premium:** Sınırsız abonelik. Aylık ve yıllık seçenek, App Store üzerinden otomatik yenilenen abonelik.
- `TODO:` Premium fiyatları (aylık / yıllık TL). Kesinleşene kadar fiyat yazma, "Premium" bölümünü fiyatsız tasarla.

---

## 2. Marka kimliği

### Renkler

| Ad | Değer | Kullanım |
| --- | --- | --- |
| ink | `#15131A` | Ana koyu renk, koyu zemin, butonlar |
| safran | `#FFC53D` | Kıvırık, erişte telleri, vurgu |
| biber | `#C8312A` | Marka kırmızısı, vurgu |
| biberYazi | `#B4271F` | Açık zeminde kırmızı yazı (kontrast için) |
| krem | `#F6EEDC` | Sıcak açık zemin |
| mandalina | `#FF8A3D` | Kıvırık'ın yanakları |
| odun | `#E2B07A` | Yemek çubukları |
| tel-koyu | `#EDA82A` | Krem zeminde teller |

Nötrler: açık zemin `#F2F1F4`, kart `#FFFFFF`, ikincil metin `#5F5B66`, ayraç `#E6E4EA`. Koyu: zemin `#0F0E13`, kart `#1C1A22`, metin `#F5F3F7`, ikincil `#A9A5B0`.

Site hem açık hem koyu temayı (`prefers-color-scheme`) desteklesin. Hero bölümü iki temada da koyu (`#15131A`) zeminli olabilir.

### Yazı tipi

- Başlıklar, rakamlar, butonlar: **Bricolage Grotesque** 600/700/800 (Google Fonts veya self-host; tercihen self-host, harici istek olmasın).
- Gövde: sistem fontu (`-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`).
- Büyük başlıklarda sıkı harf aralığı (yaklaşık `-0.03em`), satır yüksekliği ~1.

### Logo (C6): "erişte" yazısı + yemek çubukları + arkada erişte telleri

512×512 viewBox. Varyantlar:

| varyant | zemin | teller | parlama | yazı | çubuk |
| --- | --- | --- | --- | --- | --- |
| gece | `#15131A` | `#FFC53D` | `#FFE08A` | `#F5F3F7` | `#E2B07A` |
| biber | `#C8312A` | `#FFC53D` | `#FFE08A` | `#FFF6DC` | `#F6EEDC` |
| kagit | `#F6EEDC` | `#EDA82A` | `#FFD873` | `#C8312A` | `#15131A` |

Çizim sırası:
1. Zemin dikdörtgeni (uygulama ikonu için köşe yarıçapı `size * 0.2237`).
2. Aşağıdaki `NOODLES` tellerinin hepsi, teller renginde, verilen kalınlıkta; `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`.
3. Aynı teller parlama renginde, kalınlık `max(2.5, round(w*0.28))`, `opacity 0.75`, `transform="translate(-2 -2)"`.
4. "erişte" yazısı: `x=256 y=318`, `text-anchor="middle"`, Bricolage Grotesque 800, `font-size 128`, `textLength="396" lengthAdjust="spacingAndGlyphs"`, yazı rengi; `stroke` = zemin rengi, `stroke-width 30`, `stroke-linejoin="round"`, `paint-order="stroke"`.
5. Çubuklar: önce zemin renginde 30 kalınlık, sonra çubuk renginde 14 kalınlık, yuvarlak uç: `M96 150 L452 92` ve `M104 178 L462 122`.

Sadece yazı + çubuk (tellerin olmadığı, header'da kullanılabilecek yatay işaret), koyu zemin örneği:

```html
<svg width="420" height="270" viewBox="50 70 420 270" fill="none" role="img" aria-label="erişte">
  <text x="256" y="318" text-anchor="middle" textLength="396" lengthAdjust="spacingAndGlyphs"
        fill="#F5F3F7" stroke="#15131A" stroke-width="30" stroke-linejoin="round" paint-order="stroke"
        style="font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:128px">erişte</text>
  <path d="M96 150 L452 92" stroke="#15131A" stroke-width="30" stroke-linecap="round"/>
  <path d="M104 178 L462 122" stroke="#15131A" stroke-width="30" stroke-linecap="round"/>
  <path d="M96 150 L452 92" stroke="#E2B07A" stroke-width="14" stroke-linecap="round"/>
  <path d="M104 178 L462 122" stroke="#E2B07A" stroke-width="14" stroke-linecap="round"/>
</svg>
```

Açık zeminde: yazı `#C8312A`, kontur rengi = zemin rengi, çubuk `#15131A`.

> Logoyu sitede metin olarak kullanırken font yüklenmeden görünmesin diye, yayına almadan önce logoyu yazıyı path'e çevrilmiş tek bir SVG olarak üret (ör. `opentype.js` ile) ve `public/brand/` altına koy.

### Erişte telleri deseni (arka plan)

512×512'lik desen; istenen boyuta ölçeklenip (ör. 380–400px) yatay ve dikey döşenir. Krem zeminde `#EDA82A` ve `opacity 0.4`; koyu zeminde `#FFC53D` ve `opacity 0.18`. Kalınlıklar ~1.4 ile çarpılır. Arka plan, içeriğin okunurluğunu bozmamalı.

```js
export const NOODLES = [
  ["M-20 60 C60 30 120 100 200 70 C280 40 340 110 420 80 C470 62 500 90 540 70", 12],
  ["M-20 128 C70 158 130 98 210 138 C290 178 360 108 440 148 C490 170 520 138 540 148", 11],
  ["M-20 432 C80 402 150 472 230 442 C310 412 370 482 450 447 C500 427 520 462 540 452", 12],
  ["M-20 486 C60 506 140 456 220 491 C300 526 380 461 460 496 C500 511 520 486 540 496", 11],
  ["M40 540 C70 460 10 400 50 320 C80 260 20 200 60 120 C80 70 40 30 60 -20", 12],
  ["M470 540 C440 470 500 400 460 330 C430 270 490 210 455 140 C440 90 480 40 460 -20", 12],
  ["M120 540 C142 496 98 468 128 416 C146 386 120 364 132 340", 11],
  ["M392 540 C370 494 412 468 386 418 C372 390 396 368 384 344", 11],
  ["M-20 300 C60 250 100 340 160 300 C200 272 180 222 140 232 C112 240 118 276 146 274", 11],
  ["M540 262 C460 302 430 222 372 262 C334 290 352 340 390 330 C414 322 406 296 384 300", 11],
  ["M204 -20 C182 30 222 62 200 112", 10],
  ["M334 -20 C356 30 312 72 336 118", 10],
  ["M264 -20 C250 20 286 40 270 78", 9],
  ["M-20 372 C40 352 70 392 112 368 C150 346 170 380 200 372", 10],
  ["M540 398 C480 380 450 420 404 396 C368 378 344 404 320 396", 10],
  ["M186 540 C200 498 236 512 246 470 C254 440 284 452 296 430", 10],
  ["M-20 210 C30 190 50 230 90 214", 9],
  ["M540 196 C496 180 476 216 436 204", 9]
];
```

Performans için deseni bir kez `noodles-tile.svg` olarak üretip CSS `background-image` + `background-size` ile döşemek yeterli; sayfaya yüzlerce path basma.

### Kıvırık (maskot) SVG

viewBox `0 0 240 230`. Ruh hâlleri: `selam` (el sallar), `mutlu` (gözler kavis), `sasirmis` (iki kol havada). Kâse: `krem` (gövde `#F5F3F7`, ağız `#DCD9E0`, şerit `#C8312A`) veya `gece` (gövde `#15131A`, ağız `#2A2733`, şerit `#FFC53D`). Açık zeminde `gece` kâse, koyu zeminde `krem` kâse kullan.

```
// her zaman: tepedeki kıvrım
<path d="M120 54 C110 36 126 20 140 28 C152 35 145 51 133 47" stroke="#FFC53D" stroke-width="11" stroke-linecap="round"/>
// selam: sağ kol el sallıyor
<path d="M178 104 C192 96 200 82 196 68" stroke="#FFC53D" stroke-width="12" stroke-linecap="round"/>
// sasirmis: iki kol havada
<path d="M62 108 C46 96 42 78 50 64" stroke="#FFC53D" stroke-width="12" stroke-linecap="round"/>
<path d="M178 108 C194 96 198 78 190 64" stroke="#FFC53D" stroke-width="12" stroke-linecap="round"/>
// gövde
<ellipse cx="120" cy="104" rx="64" ry="56" fill="#FFC53D"/>
<path d="M74 86 C84 79 94 92 104 85" stroke="#E9A321" stroke-width="5" stroke-linecap="round"/>
<path d="M136 76 C146 69 156 82 166 75" stroke="#E9A321" stroke-width="5" stroke-linecap="round"/>
// gözler — selam
<circle cx="100" cy="106" r="9.5" fill="#15131A"/><circle cx="103.5" cy="102.5" r="3.2" fill="#FFFFFF"/>
<circle cx="140" cy="106" r="9.5" fill="#15131A"/><circle cx="143.5" cy="102.5" r="3.2" fill="#FFFFFF"/>
// gözler — mutlu
<path d="M90 108 Q100 96 110 108" stroke="#15131A" stroke-width="5.5" stroke-linecap="round"/>
<path d="M130 108 Q140 96 150 108" stroke="#15131A" stroke-width="5.5" stroke-linecap="round"/>
// gözler — sasirmis
<circle cx="100" cy="104" r="12" fill="#FFFFFF"/><circle cx="100" cy="105" r="6.5" fill="#15131A"/>
<circle cx="140" cy="104" r="12" fill="#FFFFFF"/><circle cx="140" cy="105" r="6.5" fill="#15131A"/>
// yanaklar
<ellipse cx="85" cy="124" rx="9" ry="5.5" fill="#FF8A3D" opacity="0.6"/>
<ellipse cx="155" cy="124" rx="9" ry="5.5" fill="#FF8A3D" opacity="0.6"/>
// ağız — selam ve mutlu
<path d="M108 122 Q120 135 132 122" stroke="#15131A" stroke-width="5" stroke-linecap="round"/>
// ağız — sasirmis
<ellipse cx="120" cy="128" rx="7" ry="9" fill="#15131A"/>
// kâse
<path d="M26 144 H214 C214 194 172 222 120 222 C68 222 26 194 26 144 Z" fill="{kaseGovde}"/>
<ellipse cx="120" cy="144" rx="94" ry="11" fill="{kaseAgiz}"/>
<path d="M62 146 C66 158 56 164 61 176" stroke="#FFC53D" stroke-width="9" stroke-linecap="round"/>
<path d="M176 146 C172 156 182 162 178 172" stroke="#FFC53D" stroke-width="9" stroke-linecap="round"/>
<path d="M74 186 C88 176 102 196 116 186 C130 176 144 196 158 186 C162 183 166 183 168 185" stroke="{serit}" stroke-width="6" stroke-linecap="round"/>
```

Tüm path'lerde `fill="none"` (dolgulu şekiller hariç).

### Konuşma balonu

Kıvırık'ın konuşma balonu: zemin `#15131A` (koyu temada `#26232D`), metin `#F5F3F7`, üstte küçük "Kıvırık" etiketi `#FFC53D` 700. Köşeler 20px, kuyruk tarafındaki köşe 6px. Sitede SSS ve "Nasıl çalışır" bölümlerinde kullanılabilir.

### Görsel üslup

- Kenarlıklar az, yumuşak gölgeler, büyük yuvarlak köşeler (kart 24–32px, buton tam yuvarlak/pill).
- Etiket ("pill") kullanımı: ör. `rgba(200,49,42,0.1)` zemin + `#B4271F` yazı.
- Telefon ekran görüntüleri hafif döndürülmüş kartlarla ve Kıvırık ile birlikte; App Store görselleriyle aynı dil.
- Hazır tasarımlar (App Store ekran görüntüleri, sosyal medya kartları) ayrı bir tasarım panosunda var; PNG olarak dışa aktarılıp `public/images/` altına konacak. `TODO:` Görseller gelene kadar gri yer tutucu kullan.

---

## 3. Sitenin kapsamı

Dil: **Türkçe** (İngilizce daha sonra; yapıyı `/en` eklemeye uygun kur ama şimdi yapma).

### Sayfalar

| Yol | Sayfa | Not |
| --- | --- | --- |
| `/` | Ana sayfa (tanıtım) | Aşağıdaki bölümler |
| `/gizlilik` | Gizlilik Politikası | **App Store için zorunlu** (Privacy Policy URL) |
| `/kvkk` | KVKK Aydınlatma Metni | 6698 sayılı Kanun md. 10 |
| `/kosullar` | Kullanım Koşulları | Abonelik / otomatik yenileme maddeleri dahil |
| `/destek` | Destek ve SSS | **App Store için zorunlu** (Support URL); iletişim e-postası |
| `/hesap-silme` | Hesabını silme | Uygulama içinden nasıl silinir + e-posta ile talep |
| `/404` | Bulunamadı | Kıvırık `sasirmis` ile |

Footer'da tüm yasal sayfalar, iletişim e-postası, © yıl erişte.

### Ana sayfa bölümleri

1. **Hero** (koyu zemin + teller deseni): başlık "Bütün aboneliklerin tek kâsede.", alt metin (ör. "Netflix'ten ChatGPT'ye bütün aboneliklerin tek listede. Fiyatlar kendiliğinden güncellenir, zamları sen kovalamazsın."), App Store rozeti, Kıvırık `selam`, telefon görseli.
   - `TODO:` App Store linki. Uygulama yayına girene kadar rozetin yerinde "Yakında App Store'da" yazsın; link tek bir config değişkeninden (`APP_STORE_URL`) gelsin.
2. **Nasıl çalışır (3 adım):** Seç → Kıvırık birkaç şey sorar → Takip et.
3. **Özellikler:** Otomatik fiyat takibi ("Zamları sen takip etme. Kıvırık etsin."), toplam gider ve kategoriler, yaklaşan ödemeler, dolar → TL çevirisi, misafir modu.
4. **Gizlilik vurgusu:** Banka bağlamak yok, reklam yok, izleme yok.
5. **Ücretsiz vs Premium:** İki kart (fiyatlar `TODO`).
6. **SSS (kısa):** Ücretsiz mi? Banka bilgimi istiyor mu? Fiyatlar nereden geliyor? Android var mı? (Yakında) Hesabımı nasıl silerim?
7. **Son çağrı:** Kıvırık `mutlu` + indirme butonu.

### Uygulama içi bağlantı (şimdiden düşün)

- `/.well-known/apple-app-site-association` için yer ayır (ileride şifre sıfırlama gibi linklerin uygulamada açılması için). Şimdilik boş bırak veya yorum olarak not düş. Bundle ID: `com.mkochandev.aboneliktakip`.
- `TODO:` Şifre sıfırlama sayfası (`/sifre-sifirla`) backend'in kendi Auth'una geçişinden sonra eklenecek; şimdi yapma.

---

## 4. Yasal sayfalar için veri envanteri

Gizlilik politikası ve KVKK metni **bu envantere göre** yazılsın, olmayan bir veri işleme eklenmesin. Metinler taslaktır; yayından önce bir hukukçuya gösterilmesi önerilir (sayfanın kendisinde bunu yazma).

**Veri sorumlusu:** Muhammed Koçhan (bireysel geliştirici). `TODO:` Adres bilgisinin metinde yer alıp almayacağı; iletişim e-postası `destek@eriste.app` (Cloudflare Email Routing ile kişisel kutuya yönlenecek).

**Toplanan veriler:**

| Veri | Neden | Nerede |
| --- | --- | --- |
| E-posta adresi, şifre (hash'li) | Hesap oluşturma ve giriş | Sunucu veritabanı |
| Takip edilen abonelikler: servis, plan, fiyat, para birimi, ödeme günü, kullanım sıklığı, isteğe bağlı "neden" cevabı, fiyat bildirimi tercihi | Uygulamanın temel işlevi | Sunucu veritabanı |
| Misafir modunda girilen abonelikler (en fazla 5) | Hesapsız deneme | **Sadece cihazda**; hesap açılınca isteğe bağlı olarak hesaba aktarılır |
| Premium satın alma durumu (abonelik aktif mi, hangi plan, bitiş tarihi) | Premium özelliklerin açılması | Apple + RevenueCat; **kart veya ödeme bilgisi bize gelmez** |
| Uygulama içi anonim kullanıcı kimliği (RevenueCat) | Satın almaların hesapla eşleştirilmesi | RevenueCat |
| Bildirim izni / cihaz bildirim belirteci | Fiyat değişikliği ve ödeme hatırlatma bildirimleri | `TODO:` Push bildirimleri 1.0'da var mı netleşecek; yoksa bu satırı kaldır |

**Toplanmayanlar:** Banka/kart bilgisi, konum, rehber, reklam kimliği (IDFA), üçüncü taraf reklam veya analitik SDK'sı. Uygulamada ve sitede **izleme yok**.

**Üçüncü taraflar (veri işleyenler / aktarım):**

| Hizmet | Amaç | Konum |
| --- | --- | --- |
| Apple (App Store) | Uygulama dağıtımı ve ödeme | ABD / global |
| RevenueCat | Abonelik durumu yönetimi | ABD |
| Sunucu barındırma: şu an Supabase; yakında Hetzner (kendi sunucumuz) | Veritabanı, kimlik doğrulama, API | AB (Almanya) `TODO:` taşınma sonrası kesinleşecek |
| Cloudflare | DNS, güvenlik, site barındırma (Pages), yedek depolama (R2) | Global |
| Logo.dev | Servis logolarının gösterilmesi (cihaz logoyu Logo.dev'den yükler; IP adresi görülebilir, hesap bilgisi gönderilmez) | ABD |
| Anthropic (Claude API) | Katalogdaki **herkese açık fiyat sayfalarının** okunması; **kullanıcı verisi gönderilmez** | ABD |
| E-posta gönderimi (Resend, planlanıyor) | Şifre sıfırlama e-postaları | ABD/AB `TODO` |

KVKK metninde yurt dışına aktarım (md. 9), hukuki sebepler (sözleşmenin ifası, açık rıza gereken yerler), saklama süresi ve ilgili kişi hakları (md. 11) ile başvuru yolu yer almalı.

**Saklama ve silme:** Kullanıcı hesabını uygulama içinden silebilir (`TODO:` uygulamadaki menü yolu, ör. Profil → Hesabı sil); hesap silinince hesap ve abonelik verileri silinir. Yedeklerden en geç `TODO` gün içinde düşer. Apple aboneliği hesap silmekle iptal olmaz; iptal **iPhone Ayarlar → Apple Kimliği → Abonelikler** üzerinden yapılır. Bunu `/hesap-silme` ve `/kosullar`'da açıkça yaz.

**Çocuklar:** Uygulama 13 yaş altına yönelik değildir.

### Kullanım koşulları için abonelik maddeleri (Apple'ın beklediği)

- Ödeme, satın alma onayında Apple Kimliği hesabından alınır.
- Abonelik, dönem bitiminden en az 24 saat önce kapatılmazsa otomatik yenilenir; yenileme ücreti dönem bitiminden önceki 24 saat içinde tahsil edilir.
- Abonelik ve otomatik yenileme App Store hesap ayarlarından yönetilebilir/iptal edilebilir.
- İade talepleri Apple'ın politikalarına tabidir.
- Uygulamadaki fiyat bilgileri bilgilendirme amaçlıdır; servislerin güncel fiyatlarıyla farklılık olabilir, kesin fiyat için ilgili servisin sitesi esastır. (Önemli: otomatik taranan fiyatlar için sorumluluk sınırlaması.)
- Apple'ın Standart EULA'sına link: `https://www.apple.com/legal/internet-services/itunes/dev/stdeula/`

---

## 5. Teknik kararlar

- **Repo:** ayrı repo, `eriste-web` (GitHub, Mkochandev hesabı).
- **Çatı:** **Astro** (statik çıktı, `output: 'static'`), sıfır/az JavaScript. Ağır bir UI kütüphanesi yok. Stil için düz CSS + CSS değişkenleri (marka token'ları tek dosyada: `src/styles/tokens.css`).
  - Alternatif: düz HTML/CSS da kabul. Ama yasal sayfalar Markdown/MDX olarak yazılabilsin, bu yüzden Astro tercih.
- **Barındırma:** **Cloudflare Pages**, GitHub reposuna bağlı, `main`'e push = yayın. Ücretsiz.
- **Alan adı:** `eriste.app` (Cloudflare'de). `.app` alan adları HSTS preload listesinde: **sadece HTTPS** çalışır, Cloudflare bunu kendisi sağlıyor. `www.eriste.app` → `eriste.app` yönlendirmesi.
- **Alt alan adları (bilgi):** `api.eriste.app` = backend (Hetzner, ayrı iş), `eriste.app` = bu site. Sitenin backend'e bağımlılığı yok.
- **Analitik:** Varsayılan olarak yok. İstenirse yalnızca çerezsiz **Cloudflare Web Analytics**; çerez banner'ı gerektirecek hiçbir şey ekleme.
- **Fontlar:** Bricolage Grotesque self-host (`@fontsource/bricolage-grotesque` veya woff2), harici font isteği yok.
- **SEO ve paylaşım:** Her sayfaya `title`/`description`, Open Graph ve Twitter kartı (1200×630 OG görseli: krem zemin, teller, logo, Kıvırık), `sitemap.xml`, `robots.txt`, favicon seti (logo `gece` varyantından), `lang="tr"`.
- **App Store bağlantısı:** `<meta name="apple-itunes-app" content="app-id=TODO">` (Safari akıllı uygulama bandı), App ID yayın sonrası eklenecek.
- **Erişilebilirlik:** Kontrast AA, SVG'lerde `aria-label`/`aria-hidden`, klavye ile gezinme, `prefers-reduced-motion`'a saygı.
- **Mobil öncelikli:** Ziyaretçilerin çoğu telefondan gelecek (sosyal medya). 360px genişlikte kusursuz olmalı.
- **Performans hedefi:** Lighthouse 95+ (mobil). Görseller WebP/AVIF, `loading="lazy"`.
- **Gizli bilgi:** Repoda API anahtarı, şifre vs. olmayacak (sitenin buna ihtiyacı da yok).

### Önerilen klasör yapısı

```
eriste-web/
  public/
    brand/        # logo SVG'leri, favicon, noodles-tile.svg, kivirik-*.svg
    images/       # ekran görüntüleri, OG görseli
    .well-known/  # ileride apple-app-site-association
  src/
    components/   # Header, Footer, Kivirik, Bubble, PhoneShot, FeatureCard, AppStoreBadge
    layouts/      # BaseLayout, LegalLayout
    pages/        # index, gizlilik, kvkk, kosullar, destek, hesap-silme, 404
    content/      # yasal metinler (md)
    styles/       # tokens.css, global.css
    config.ts     # APP_STORE_URL, SUPPORT_EMAIL, PREMIUM_PRICES (TODO)
```

---

## 6. Öncelik sırası

1. Yasal sayfalar + destek sayfası (App Store başvurusu için **ilk bunlar** gerekiyor) ve iskelet: layout, header, footer.
2. Ana sayfa.
3. OG görselleri, favicon, SEO dosyaları.
4. Cloudflare Pages kurulumu ve `eriste.app` bağlantısı.

## 7. Çalışma kuralları

- Önce bu dosyayı oku, bir plan çıkar, sonra başla.
- `TODO:` olan bilgileri uydurma: yer tutucu bırak ve listesini sonunda ver.
- Metinleri Türkçe karakterlerle doğru yaz (ı, ğ, ş, ç, ö, ü, İ). "kâse" şapkalı.
- Rakip uygulamaların adını sitede kullanma.
- Kullanıcıya verilen sözler (reklam yok, izleme yok, banka bağlamak yok) sitede de birebir doğru olmalı; site bu sözleri bozacak hiçbir üçüncü taraf script içermemeli.
