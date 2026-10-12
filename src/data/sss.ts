// Sıkça sorulan sorular. `home: true` olanlar ana sayfada da görünür.
// Cevaplar güvenilir, elle yazılmış HTML'dir (set:html ile basılır).

export interface Soru {
  q: string;
  a: string;
  home?: boolean;
}

export const SSS: Soru[] = [
  {
    q: 'erişte ücretsiz mi?',
    a: 'Evet. 5 aboneliğe kadar ücretsiz takip edebilirsin. Daha fazlası için Premium var: sınırsız abonelik, aylık ya da yıllık seçenekle, App Store üzerinden.',
    home: true,
  },
  {
    q: 'Banka bilgimi istiyor mu?',
    a: 'Hayır. Banka hesabı ya da kart bağlamak yok. Aboneliklerini katalogdan seçersin, o kadar. Premium ödemesi de Apple üzerinden yapılır; kart bilgin bize hiç gelmez.',
    home: true,
  },
  {
    q: 'Fiyatlar nereden geliyor?',
    a: 'Servislerin resmi, herkese açık fiyat sayfalarından. Bu sayfalar düzenli olarak taranır; zam olunca listen kendiliğinden güncellenir. Yine de kesin fiyat için servisin kendi sitesi esastır.',
    home: true,
  },
  {
    q: 'Hesap açmam gerekiyor mu?',
    a: 'Hayır. Misafir modunda, hesap açmadan 5 aboneliğe kadar cihazında deneyebilirsin. Sonra hesap açarsan, istersen listeni hesabına aktarırsın.',
  },
  {
    q: 'Dolar fiyatlı aboneliklerim ne olacak?',
    a: 'Dolar fiyatlı abonelikler TL’ye çevrilerek gösterilir; toplamın tek para biriminde kalır.',
  },
  {
    q: 'Android var mı?',
    a: 'Şimdilik yalnızca iPhone’da. Android sürümü yakında.',
    home: true,
  },
  {
    q: 'Hesabımı nasıl silerim?',
    a: 'Uygulama içinden ya da e-postayla silebilirsin. Adımlar <a href="/hesap-silme">Hesap silme</a> sayfasında. Premium aboneliğin varsa onu ayrıca iPhone <strong>Ayarlar → Apple Kimliği → Abonelikler</strong> bölümünden iptal etmeyi unutma.',
    home: true,
  },
  {
    q: 'Premium’u nasıl iptal ederim?',
    a: 'iPhone’unda <strong>Ayarlar → Apple Kimliği → Abonelikler</strong> bölümünden erişte’yi seçip iptal edebilirsin. Dönem bitiminden en az 24 saat önce iptal edersen sonraki dönem için ücret alınmaz.',
  },
  {
    q: 'Yanlış bir fiyat gördüm, ne yapayım?',
    a: 'Bize <a href="mailto:destek@eriste.app">destek@eriste.app</a> adresinden yaz; hangi servis ve plan olduğunu belirtmen yeterli.',
  },
];
