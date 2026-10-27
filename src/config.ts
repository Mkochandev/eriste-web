// Sitenin tek ayar dosyası. TODO olan değerler kesinleşince buradan girilir.

export const SITE_URL = 'https://eriste.app';
export const SITE_NAME = 'erişte';
export const SLOGAN = 'Bütün aboneliklerin tek kâsede.';
export const SUPPORT_EMAIL = 'destek@eriste.app';

/** App Store App ID (yalnızca rakamlar). Safari akıllı uygulama bandı ve JSON-LD buradan okur. */
export const APP_STORE_ID = '6820681829';

/** App Store linki. Bütün indirme düğmeleri buradan okur; linki başka yere elle yazma. */
export const APP_STORE_URL = `https://apps.apple.com/tr/app/id${APP_STORE_ID}`;

/** TODO: Premium fiyatları (ör. '49,99 ₺'). null iken fiyat gösterilmez. */
export const PREMIUM_PRICES: { monthly: string; yearly: string } | null = null;

export const FREE_LIMIT = 5;

/** Yasal sayfalardaki "Son güncelleme" tarihi. Yayın günü güncellenecek. */
export const LEGAL_UPDATED = '12 Ekim 2026';

export const LEGAL_PAGES = [
  { href: '/gizlilik', label: 'Gizlilik Politikası' },
  { href: '/kvkk', label: 'KVKK Aydınlatma Metni' },
  { href: '/kosullar', label: 'Kullanım Koşulları' },
  { href: '/destek', label: 'Destek' },
  { href: '/hesap-silme', label: 'Hesap silme' },
] as const;
