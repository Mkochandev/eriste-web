# eriste-web

[eriste.app](https://eriste.app) tanıtım sitesi. Astro, statik çıktı; gider hesaplayıcısı ve şifre sıfırlama için küçük istemci betikleri.
Proje özeti ve marka kuralları: `docs/eriste-web-proje-ozeti.md`.

## Komutlar

| Komut | Ne yapar |
| --- | --- |
| `npm install` | Bağımlılıkları kurar |
| `npm run dev` | Geliştirme sunucusu (`localhost:4321`) |
| `npm run build` | `dist/` altına statik çıktı |
| `npm run preview` | Derlenmiş çıktıyı yerelde sunar |
| `npm run brand` | Logo path'leri, teller deseni, favicon seti ve OG görselini yeniden üretir (`public/brand`, `public/images/og.png`, `src/brand/paths.ts`) |

## Ayarlar

Ana sayfadaki kompakt katalog demosu açıldığında `https://api.eriste.app/api/catalog` üzerinden uygulamanın herkese açık planlarını okur. Servis → plan → liste akışında fiyat elle girilmez. Seçimler yalnızca sayfanın belleğindedir; API'ye gönderilmez veya uygulamaya aktarılmaz. Katalog hatasında yeniden deneme gösterilir, fiyat uydurulmaz. Ana sayfanın CSP kuralı bu API'ye izin verir; ek dış logo servisi kullanılmaz. Doğrulama: build sonrasında `npm run check:calculator`. Sekme ikonunu tek başına üretmek için `npm run favicon`; `npm run brand` de aynı sade ikonu korur. Apple/PWA ikonları mevcut marka logosunu kullanır.

TODO olan değerler (`APP_STORE_URL`, `APP_STORE_ID`, `PREMIUM_PRICES`) `src/config.ts` içinde.
Yasal metinler `src/content/yasal/*.md`; yer tutucular sayfada sarı `TODO` etiketiyle görünür.

## Blog ve SEO

- İçerikler `src/content/blog/*.md`; alanlar `src/content.config.ts` içinde doğrulanır.
- Yeni içerik varsayılan olarak taslaktır. Yayımlanacak içerikte `draft: false` ve geçmiş/bugünkü `published` tarihi gerekir. Taslaklar ve gelecekteki yazılar sayfa, kart ve sitemap üretmez.
- `updated` yalnızca kaynak kontrolü veya gerçek içerik değişikliği yapıldığında güncellenir.
- `sources` resmî kaynakları, `related` uzantısız yazı kimliklerini içerir. Başlık en fazla 60, açıklama 155 karakterdir; başlık için sitede eklenen ` · erişte` payını bırak.
- Doğrulama: `npm run build`, ardından `npm run check:seo`.
- İçerik planı ve ölçüm yaklaşımı: `docs/seo-plan.md`. Haber otomasyonu henüz etkin değildir.
- İptal dışındaki içerik araştırması ve kullanıcı görevleri: `docs/seo-roadmap.md`.
- `category` blog konu grubunu, `cover` özgün şemayı seçer. Yeni kapak üretimi: `npm run blog:images`; kaynak `scripts/build-blog-images.mjs`, görsel haritası `src/data/blog-covers.json`. Üretilen dosyaları da commit et.

## Cloudflare Pages — yayına alma

- Build komutu: `npm run build`, çıktı klasörü: `dist`, Node 22.
- Güvenlik başlıkları ve CSP: `public/_headers`. Siteye harici bir kaynak eklenirse CSP'yi güncelle.
- `www.eriste.app` → `eriste.app` yönlendirmesi Pages'te değil, Cloudflare panelinde bir Redirect Rule ile yapılır.
