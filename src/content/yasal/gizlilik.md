---
title: Gizlilik Politikası
description: erişte uygulamasının hangi verileri, neden ve nerede işlediği. Banka bağlamak yok, reklam yok, izleme yok.
---

erişte, dijital aboneliklerini tek yerde takip etmen için yapılmış bir uygulama. Bu politika, uygulamayı ve **eriste.app** sitesini kullanırken hangi verilerin işlendiğini anlatır. Kısaca: işimizi yapmak için gereken kadar veri tutuyoruz, fazlasını değil. Banka hesabı bağlamak yok, reklam yok, izleme yok.

Kişisel verilerinin 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında nasıl işlendiğini ayrıca [KVKK Aydınlatma Metni](/kvkk)'nde bulabilirsin.

## Biz kimiz?

erişte'yi bireysel geliştirici **Muhammed Koçhan** geliştiriyor ve yayınlıyor. Kişisel verilerin bakımından veri sorumlusu odur.

- E-posta: [destek@eriste.app](mailto:destek@eriste.app)
- Adres: Malatya, Türkiye <span class="todo">TODO: açık adres</span>

## Topladığımız veriler

| Veri | Neden | Nerede saklanır |
| --- | --- | --- |
| E-posta adresi ve şifre (şifre yalnızca geri çevrilemez biçimde, hash'lenerek saklanır) | Hesap oluşturma ve giriş | Sunucu veritabanı |
| Takip ettiğin abonelikler: servis, plan, fiyat, para birimi, ödeme günü, kullanım sıklığı, isteğe bağlı "neden" cevabın ve fiyat bildirimi tercihin | Uygulamanın temel işlevi | Sunucu veritabanı |
| Misafir modunda girdiğin abonelikler (en fazla 5) | Hesap açmadan deneyebilmen | **Yalnızca cihazında.** Hesap açarsan, istersen hesabına aktarılır. |
| Premium satın alma durumu (abonelik aktif mi, hangi plan, bitiş tarihi) | Premium özelliklerin açılması | Apple ve RevenueCat |
| Uygulama içi anonim kullanıcı kimliği | Satın almaların hesabınla eşleştirilmesi | RevenueCat |
| Ödeme hatırlatmaları (bildirim iznini verirsen) | Ödemeden önce sana haber vermek | Ödeme hatırlatmaları cihazında planlanır, bunun için sunucuya veri gönderilmez. |

**Kart veya ödeme bilgin bize hiç gelmez.** Premium satın alımları tamamen Apple üzerinden yapılır; biz yalnızca aboneliğinin aktif olup olmadığını öğreniriz.

Bize e-posta ile yazarsan, e-posta adresin ve mesajın yalnızca sana cevap vermek için kullanılır.

## Toplamadığımız veriler

- Banka hesabı ya da kart bilgisi
- Konum
- Cihaz bildirim belirteci (hatırlatmalar yalnızca cihazında planlanır)
- Rehber (kişiler)
- Reklam kimliği (IDFA)
- Üçüncü taraf reklam veya analitik araçlarından gelen herhangi bir veri

Uygulamada da bu sitede de **izleme yok**. Uygulamada üçüncü taraf reklam veya analitik SDK'sı bulunmuyor. Bu site çerez kullanmıyor ve analitik aracı içermiyor.

## Verilerini kimlerle paylaşıyoruz?

Verilerini satmıyoruz ve reklam amacıyla kimseyle paylaşmıyoruz. Uygulamanın çalışması için aşağıdaki hizmet sağlayıcılarla çalışıyoruz:

| Hizmet | Ne için | Konum |
| --- | --- | --- |
| Apple (App Store) | Uygulamanın dağıtımı ve ödeme | ABD / global |
| RevenueCat | Abonelik durumunun yönetimi | ABD |
| Hetzner (sunucu barındırma) | Veritabanı, kimlik doğrulama, API | AB (Nürnberg, Almanya) |
| Cloudflare | DNS, güvenlik, bu sitenin barındırılması, yedek depolama | Global |
| Logo.dev | Servis logolarının gösterilmesi | ABD |
| Anthropic (Claude API) | Katalogdaki herkese açık fiyat sayfalarının okunması | ABD |
| Resend (planlanıyor) | Şifre sıfırlama e-postalarının gönderilmesi | AB |

Birkaç önemli not:

- **Logo.dev:** Servis logoları cihazına doğrudan Logo.dev'den yüklenir. Bu sırada Logo.dev IP adresini görebilir; hesap bilgilerin gönderilmez.
- **Anthropic:** Yalnızca servislerin herkese açık fiyat sayfalarını okumak için kullanılır. **Kullanıcı verisi gönderilmez.**
- **Cloudflare:** Bu siteyi ziyaret ettiğinde, siteyi sunmak ve kötüye kullanımı önlemek için IP adresin gibi teknik bilgiler Cloudflare tarafından işlenebilir.

## Verilerini ne kadar süre saklıyoruz?

Hesabın açık olduğu sürece hesap ve abonelik verilerini saklarız. Hesabını sildiğinde hesabın ve abonelik verilerin silinir; yedeklerden de en geç 30 gün içinde düşer. RevenueCat’teki kullanıcı kimliğin ve satın alma kaydın da silinir; Apple’daki satın alma geçmişin Apple’ın kendi politikalarına tabidir.

Misafir modundaki veriler yalnızca cihazında durur; uygulamayı sildiğinde onlar da silinir.

Hesabını nasıl sileceğini [Hesap silme](/hesap-silme) sayfasında anlattık.

> Hesabını silmek, Apple üzerinden aldığın Premium aboneliği **iptal etmez**. Aboneliği iPhone'unda **Ayarlar → Apple Kimliği → Abonelikler** bölümünden iptal etmen gerekir.

## Haklarının neler olduğu

Verilerine erişmek, düzeltilmesini ya da silinmesini istemek ve KVKK'nın 11. maddesindeki diğer haklarını kullanmak için [destek@eriste.app](mailto:destek@eriste.app) adresine yazabilirsin. Haklarının ayrıntısı [KVKK Aydınlatma Metni](/kvkk)'nde.

## Güvenlik

Verilerin şifreli bağlantı (HTTPS) üzerinden taşınır ve şifren düz metin olarak saklanmaz. Hiçbir sistem yüzde yüz güvenli olamaz; ama verilerini korumak için makul teknik önlemleri alıyoruz.

## Çocuklar

erişte 13 yaşın altındaki çocuklara yönelik değildir.

## Bu politikadaki değişiklikler

Bu politikayı güncellersek yeni hâlini bu sayfada yayınlar ve yukarıdaki "Son güncelleme" tarihini değiştiririz.
