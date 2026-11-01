import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root = path.resolve('dist');
const files = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const sitemap = fs.readFileSync(path.join(root, 'sitemap-0.xml'), 'utf8');
let checked = 0;
let imageChecks = 0;
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
    const og = html.match(/property="og:image" content="https:\/\/eriste.app([^\"]+)"/)?.[1];
    if (og?.startsWith('/images/blog/')) {
      const meta = await sharp(path.join(root, og)).metadata();
      assert.equal(meta.width, 1200, `OG width: ${file}`);
      assert.equal(meta.height, 630, `OG height: ${file}`);
      assert(html.includes('max-image-preview:large'), `Image preview: ${file}`);
      const articleImage = [...html.matchAll(/<img\b[^>]*>/g)].find(([tag])=>tag.includes('/images/blog/') && !tag.includes('alt=""'))?.[0];
      assert(articleImage, `Article image needs alt text: ${file}`);
      assert(articleImage.includes('width="1200"') && articleImage.includes('height="630"'), `Image dimensions: ${file}`);
      const structured = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
      const article = structured.flatMap(s=>s['@graph'] ?? [s]).find(s=>s['@type']==='BlogPosting');
      assert.equal(article?.image, `https://eriste.app${og}`, `OG/schema image mismatch: ${file}`);
      imageChecks++;
    }
  }
  for (const [, src] of html.matchAll(/(?:src|srcset)="([^\"]+)"/g)) {
    for (const item of src.split(',')) {
      const asset = item.trim().split(/\s/)[0];
      if (asset.startsWith('/images/blog/')) assert(fs.existsSync(path.join(root,asset)), `Missing image: ${asset}`);
    }
  }
}
assert(!sitemap.includes('/sifre-sifirla'), 'Password reset in sitemap');
assert(checked >= 7, 'Blog pages missing');
assert(imageChecks >= 4, 'Illustrated articles missing');
console.log(`${files.length} pages: canonical, sitemap, H1, JSON-LD and internal links OK; ${checked} blog pages: metadata and anchors OK.`);
console.log(`${imageChecks} illustrated articles: image files, dimensions, alt text and sharing metadata OK.`);
