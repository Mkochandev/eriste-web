// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eriste.app',
  output: 'static',
  // /gizlilik → gizlilik.html; Cloudflare Pages uzantısız yolu doğrudan sunar
  // CSS küçük (~7 KB gzip); satır içine almak render'ı engelleyen isteği kaldırır
  build: { format: 'file', inlineStylesheets: 'always' },
  trailingSlash: 'never',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
