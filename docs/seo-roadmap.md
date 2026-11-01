# erişte: içerik ve SEO yol haritası

Araştırma tarihi: 1 Kasım 2026. Hedef: Türkiye, Türkçe, dijital abonelik kullanan kişiler. Bu plan mevcut `seo-plan.md` dosyasını tamamlar. Haber otomasyonu kullanıcının tercihiyle kapalıdır.

## Araştırmanın söylediği ve söylemediği

Türkçe arama sonuçlarında fiyat/plan karşılaştırmaları, öğrenci indirimleri ve abonelik takip uygulamaları için farklı yayıncıların içerikleri görüldü. Bu, konu varlığını gösterir; aylık arama hacmini göstermez. Keyword Planner, Search Console veya ücretli bir hacim aracına erişilmedi. Aşağıdaki sıra “en çok arananlar” sırası değil, erişte ile ilgisi, kullanıcıya sağlayabileceğimiz özgün katkı ve güncel tutulabilirliği temel alan editoryal önceliktir.

Aranan sorgular: “abonelik takip uygulaması aylık abonelik giderleri Türkiye”, “Netflix Spotify YouTube Premium öğrenci aile yıllık abonelik tasarruf”, “dijital abonelik bütçesi unutulan abonelikler nasıl bulunur”.

Pazar örnekleri: [Hanory fiyat içeriği](https://hanory.app/tr/abonelik-fiyatlari-2026), [PaySub](https://paysub.com.tr/), [öğrenci indirimleri konu sayfası](https://abonelikfiyatlari.com/ogrenci-indirimleri), [dijital platform fiyat karşılaştırması](https://pikselkarga.com/dijital-platform-fiyatlari). Bunlar sıralaması doğrulanmış ilk sonuçlar veya yayımladığımız yazıların fiyat kaynağı değildir.

## Eklenen dört özgün içerik

| Konu ve hedef sorgu | Özgün katkı | Adres |
| --- | --- | --- |
| Abonelik bütçesi / aylık abonelik gideri | Aylık ortalama ile gerçek ödeme ayını ayıran 500 TL–1.600 TL örneği, kullanım başına maliyet | `/blog/abonelik-butcesi-hesaplama` |
| Aylık mı yıllık mı abonelik? | 6, 9 ve 12 ay senaryoları, eşik hesabı, kampanyalı ilk ayların etkisi | `/blog/aylik-mi-yillik-mi-abonelik` |
| Spotify / YouTube öğrenci aboneliği | Uygunluk, gerçek kullanım ve yeniden doğrulama takvimi; eski fiyat tablosuna bağımlı değil | `/blog/ogrenci-abonelikleri-karsilastirma` |
| Unutulan abonelikler nasıl bulunur? | Apple, Google Play, e-posta ve ödeme kaydını eşleştirme; aynı işlemi iki kere saymama | `/blog/unutulan-abonelikleri-bulma` |

Resmî belgeler yazıların sonunda yer alır. Hesaplar ve kontrol yöntemleri özgün editoryal örneklerdir; güncel fiyat, hukuki hak veya garanti tasarruf iddiası taşımaz.

## Görsel kararı

Dört yazıya özgün anlatım şeması eklendi. Rastgele stok görsel veya platformların gerçek ekranıymış gibi sunulan yapay ekran kullanılmadı. Yeni görseller 1200×630; sayfada 600/1200 piksel WebP seçenekleri, sosyal paylaşımda PNG kullanılıyor. WebP dosyaları yaklaşık 13–39 KB. Boyut ve alternatif metin tanımlı; kart görselleri gecikmeli yükleniyor. Dosya adı içerik değiştiğinde değişir, eski önbellek sorunu azaltılır.

Google için görünür görsel, açıklayıcı alternatif metin, `og:image`, makale görseli ve büyük görsel önizleme izni eklendi. Bunlar [Google görsel rehberine](https://developers.google.com/search/docs/appearance/google-images) uygun hazırlıklardır; Discover görünümü veya sıralama garantisi değildir.

## Senin yapacakların: ilk hafta

1. **Yazıları ürün sahibi olarak oku.** Özellikle erişte'nin ne yaptığına ilişkin cümleleri doğrula. Gerçek kullanımından anonim bir örnek eklemek için iyi yerler bütçe ve unutulan abonelikler yazıları.
2. **Değişiklikleri yayımla.** Mevcut Git/Cloudflare akışında commit/push sonrası başarılı dağıtımı kontrol et. Bu oturum değişiklikleri canlıya göndermedi.
3. **Google Search Console mülkünü doğrula.** `eriste.app` için alan adı mülkü seç; Google'ın verdiği TXT kaydını Cloudflare DNS'e ekle. Verilen doğrulama değerini aynen kullan. [Resmî doğrulama açıklaması](https://support.google.com/webmasters/answer/9008080).
4. **Site haritasını gönder.** Search Console → Site Haritaları: `https://eriste.app/sitemap-index.xml`. [Site haritası raporu](https://support.google.com/webmasters/answer/7451001).
5. **Öncelikli sayfaları denetle.** Ana sayfa, blog ve dört yeni yazıyı URL Denetimi ile kontrol et. Yayında olan URL'ler için gerekiyorsa indeksleme iste; sürekli yeniden göndermek gerekmez. [URL Denetimi](https://support.google.com/webmasters/answer/9012289).
6. **Marka bağlantılarını tutarlı yap.** Instagram ve TikTok profilinden siteye, sitenin sosyal bağlantılarından doğru hesaplara git. App Store açıklaması ve destek/site adresleriyle aynı ürün adını kullan.

Başarı ölçütü: site haritasının okunması, sayfaların erişilebilir olması, indeksleme durumunun görünmesi. İlk hafta için ziyaretçi veya sıra hedefi vaat etmiyoruz.

## 2–4. haftalar: gerçek aramaları öğren

- Search Console performansında Türkiye filtresiyle sayfa ve sorguları incele. Yeni içerikler için veri oluşmamışsa bunu sıfır talep diye yorumlama.
- Haftada bir tarih, URL, sorgu, gösterim, tıklama, CTR ve ortalama konumu kaydet. Kullanıcı bilgileri gerekmez.
- Aynı konumdaki benzer sorgularda çok gösterilip az tıklanan sayfaları başlık testi için aday yap. Her seferinde tek değişken değiştir; bir günün sonucunu yeterli sayma.
- İçeriği Instagram/TikTok'ta gerçekten anlat: örneğin “yıllık planın 9 ay eşiği”. İnsanları ilgili yazıya yönlendir. Sosyal paylaşımları doğrudan Google sıra artışı olarak ölçme.
- Bir veya iki yeni yazı ekle; sırf yayın takvimi dolsun diye ince, birbirine benzeyen sayfalar üretme.

## 2. ay: konuları derinleştir

Öncelik sırası gerçek sorgularla güncellenecek:

1. **Spotify mı YouTube Music mi?** Özellik listesi kopyalamak yerine aynı cihazlarda gerçek kullanım karşılaştırması. Senin gerçek denemen ve izinli ekran görüntülerin gerekir; denemeden “test ettik” yazılmamalı.
2. **Aile planı mı bireysel plan mı?** Uygun hane/üyelik şartlarını resmî kaynaklarla doğrula. Plan ücretini koşullara uymayan kişi sayısına bölüp yanıltıcı “kişi başı” fiyat verme.
3. **Türkiye abonelik fiyatları.** Talep adayı güçlü ama güncelleme yükü yüksek. Ülke, plan, ödeme kanalı, vergi ve fiyat kontrol tarihi kaydedilebiliyorsa hazırlanmalı. Bir sonraki ay kontrol edilmeyecek fiyat listesi açma.
4. **iCloud depolaması dolduğunda plan seçimi.** Depolama ihtiyacı, yedekleme ve plan düşürmenin sonuçlarını ayrıca doğrula.

Her yeni yazı bir kullanıcı kararını tamamlasın ve en az iki ilgili mevcut yazıya doğal bağlantı versin. Aynı sorguya aynı cevabı veren ikinci sayfayı açmak yerine mevcut sayfayı geliştir.

## 3. ay: ölç ve iyileştir

- Gösterim alan ama az fayda sunan yazıları gerçek sorularla genişlet.
- İndekslenmeyen sayfalarda teknik erişimi, kanonik adresi ve içeriğin benzerliğini incele; sırf tarih değiştirerek tekrar yayımlama.
- Search Console üzerinden mobil deneyim/Core Web Vitals verisi oluştuysa değerlendir. Build kontrolü gerçek kullanıcı performans ölçümü değildir.
- Gerçek kullanıcı yorumu ve bağımsız ürün incelemesi iste; satın alınmış backlink, sahte kullanıcı yorumu veya uydurma ödül kullanma.
- Uygulama indirmelerine katkıyı ölçmek istersen App Store Connect kampanya bağlantılarını ayrı bir çalışma olarak kur. Bu değişiklikte çerez veya izleme kodu eklenmedi.

## Henüz yapılmayanlar

Canlıya yayın, Search Console/DNS işlemi, doğrulanmış anahtar kelime hacmi ölçümü, gerçek cihazlarla ürün karşılaştırması ve haber otomasyonu yapılmadı. İlk iki iş senin yayın ve hesap erişiminle tamamlanabilir. Hacim için daha sonra Türkiye/Türkçe ayarlı Keyword Planner çıktısı veya Search Console sorgu verisi kullanılabilir; Google Trends'in göreli ilgisi aylık arama sayısı değildir.
