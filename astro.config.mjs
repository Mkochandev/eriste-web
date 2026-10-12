// @ts-check
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// /sifre-sifirla'daki satır içi script'in sha256 özetini dist/_headers'taki CSP'ye yazar.
// Özet derlenmiş HTML'den alınır; script değişse de CSP elle güncellenmeden doğru kalır.
const resetScriptHash = () => ({
  name: 'reset-script-hash',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const out = fileURLToPath(dir);
      const html = fs.readFileSync(`${out}/sifre-sifirla.html`, 'utf8');
      const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
      if (scripts.length !== 1) throw new Error(`sifre-sifirla: 1 satır içi script bekleniyordu, ${scripts.length} bulundu`);
      const hash = `sha256-${createHash('sha256').update(scripts[0]).digest('base64')}`;
      const headersPath = `${out}/_headers`;
      const headers = fs.readFileSync(headersPath, 'utf8');
      if (!headers.includes('SIFRE_SIFIRLA_SCRIPT_HASH')) throw new Error('_headers: SIFRE_SIFIRLA_SCRIPT_HASH yer tutucusu yok');
      fs.writeFileSync(headersPath, headers.replaceAll('SIFRE_SIFIRLA_SCRIPT_HASH', hash));
    },
  },
});

export default defineConfig({
  site: 'https://eriste.app',
  output: 'static',
  // /gizlilik → gizlilik.html; Cloudflare Pages uzantısız yolu doğrudan sunar
  // CSS küçük (~7 KB gzip); satır içine almak render'ı engelleyen isteği kaldırır
  build: { format: 'file', inlineStylesheets: 'always' },
  trailingSlash: 'never',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/sifre-sifirla') }),
    resetScriptHash(),
  ],
});
