// Sitenin tek ayar dosyası. TODO olan değerler kesinleşince buradan girilir.

export const SITE_URL = 'https://eriste.app';
export const SITE_NAME = 'erişte';
export const SLOGAN = 'Bütün aboneliklerin tek kâsede.';
export const SUPPORT_EMAIL = 'destek@eriste.app';

/** TODO: Uygulama yayına girince App Store linki. null iken "Yakında App Store'da" görünür. */
export const APP_STORE_URL: string | null = null;

/** TODO: App Store App ID (yalnızca rakamlar). Girilince Safari akıllı uygulama bandı eklenir. */
export const APP_STORE_ID: string | null = null;

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
