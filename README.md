# eriste-web

[eriste.app](https://eriste.app) tanıtım sitesi. Astro, statik çıktı, sıfır JavaScript.
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

TODO olan değerler (`APP_STORE_URL`, `APP_STORE_ID`, `PREMIUM_PRICES`) `src/config.ts` içinde.
Yasal metinler `src/content/yasal/*.md`; yer tutucular sayfada sarı `TODO` etiketiyle görünür.

## Cloudflare Pages

- Build komutu: `npm run build`, çıktı klasörü: `dist`, Node 22.
- Güvenlik başlıkları ve CSP: `public/_headers`. Siteye harici bir kaynak eklenirse CSP'yi güncelle.
- `www.eriste.app` → `eriste.app` yönlendirmesi Pages'te değil, Cloudflare panelinde bir Redirect Rule ile yapılır.
