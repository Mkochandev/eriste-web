import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const files = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const sitemap = fs.readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
let checked = 0;
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const noindex = /name="robots" content="noindex"/.test(html);
  const pathname = '/' + file.replaceAll('\\', '/').replace(/(index)?\.html$/, '');
  if (!noindex) {
    assert(html.includes(`rel="canonical" href="https://eriste.app${pathname}"`), `Canonical: ${file}`);
    assert(sitemap.includes(`https://eriste.app${pathname}</loc>`), `Sitemap: ${file}`);
  }
  // Şifre sıfırlama gibi noindex uygulama ekranları birden fazla gizli durum içerir.
  if (!noindex) assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `H1: ${file}`);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (href.startsWith('//')) continue;
    const local = path.join(root, decodeURIComponent(href));
    assert(fs.existsSync(local) || fs.existsSync(local + '.html') || fs.existsSync(path.join(local, 'index.html')), `Broken link: ${file} → ${href}`);
  }
  if (pathname.startsWith('/blog')) {
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = html.match(/name="description" content="([^"]*)"/)?.[1];
    assert(title && title.length <= 60, `Title length: ${file}: ${title?.length}`);
    assert(description && description.length <= 155, `Description length: ${file}: ${description?.length}`);
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`), `Missing anchor: ${file}#${id}`);
    checked++;
  }
}
assert(!sitemap.includes('/sifre-sifirla'), 'Password reset in sitemap');
assert(checked >= 7, 'Blog pages missing');
console.log(`${files.length} pages: canonical, sitemap, H1, JSON-LD and internal links OK; ${checked} blog pages: metadata and anchors OK.`);
