// Marka varlıklarını üretir: path'e çevrilmiş logo, teller deseni, favicon seti.
// Çalıştırma: npm run brand  (çıktılar repoya eklenir; build sırasında çalışmaz)
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const fontDir = path.join(root, 'node_modules/@fontsource/bricolage-grotesque/files');
const brandDir = path.join(root, 'public/brand');
const srcBrandDir = path.join(root, 'src/brand');
fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(srcBrandDir, { recursive: true });

// Dokümandaki NOODLES (512x512 desen)
const NOODLES = [
  ['M-20 60 C60 30 120 100 200 70 C280 40 340 110 420 80 C470 62 500 90 540 70', 12],
  ['M-20 128 C70 158 130 98 210 138 C290 178 360 108 440 148 C490 170 520 138 540 148', 11],
  ['M-20 432 C80 402 150 472 230 442 C310 412 370 482 450 447 C500 427 520 462 540 452', 12],
  ['M-20 486 C60 506 140 456 220 491 C300 526 380 461 460 496 C500 511 520 486 540 496', 11],
  ['M40 540 C70 460 10 400 50 320 C80 260 20 200 60 120 C80 70 40 30 60 -20', 12],
  ['M470 540 C440 470 500 400 460 330 C430 270 490 210 455 140 C440 90 480 40 460 -20', 12],
  ['M120 540 C142 496 98 468 128 416 C146 386 120 364 132 340', 11],
  ['M392 540 C370 494 412 468 386 418 C372 390 396 368 384 344', 11],
  ['M-20 300 C60 250 100 340 160 300 C200 272 180 222 140 232 C112 240 118 276 146 274', 11],
  ['M540 262 C460 302 430 222 372 262 C334 290 352 340 390 330 C414 322 406 296 384 300', 11],
  ['M204 -20 C182 30 222 62 200 112', 10],
  ['M334 -20 C356 30 312 72 336 118', 10],
  ['M264 -20 C250 20 286 40 270 78', 9],
  ['M-20 372 C40 352 70 392 112 368 C150 346 170 380 200 372', 10],
  ['M540 398 C480 380 450 420 404 396 C368 378 344 404 320 396', 10],
  ['M186 540 C200 498 236 512 246 470 C254 440 284 452 296 430', 10],
  ['M-20 210 C30 190 50 230 90 214', 9],
  ['M540 196 C496 180 476 216 436 204', 9],
];

// ---------- 1. "erişte" yazısını path'e çevir ----------
const load = (f) => opentype.parse(fs.readFileSync(path.join(fontDir, f)).buffer);
const latin = load('bricolage-grotesque-latin-800-normal.woff');
const latinExt = load('bricolage-grotesque-latin-ext-800-normal.woff');

// Metni Bricolage 800 glifleriyle path'e çevirir. Türkçe harfler latin-ext alt kümesinden gelir.
// width verilirse SVG textLength + lengthAdjust="spacingAndGlyphs" gibi yatay ölçekler.
function textPath(str, { size, baseline, x = 0, width, anchor = 'start' }) {
  const glyphs = [];
  let adv = 0;
  for (const ch of str) {
    const font = latin.charToGlyph(ch).index ? latin : latinExt;
    const g = font.charToGlyph(ch);
    glyphs.push({ g, x: adv });
    adv += (g.advanceWidth / font.unitsPerEm) * size;
  }
  const sx = width ? width / adv : 1;
  const total = adv * sx;
  const offset = anchor === 'middle' ? x - total / 2 : x;
  const fmt = (n) => +n.toFixed(2);
  const X = (v) => fmt(offset + v * sx);
  const Y = (v) => fmt(v);
  const out = [];
  for (const { g, x: gx } of glyphs) {
    for (const c of g.getPath(gx, baseline, size).commands) {
      if (c.type === 'M') out.push(`M${X(c.x)} ${Y(c.y)}`);
      else if (c.type === 'L') out.push(`L${X(c.x)} ${Y(c.y)}`);
      else if (c.type === 'Q') out.push(`Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`);
      else if (c.type === 'C') out.push(`C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`);
      else if (c.type === 'Z') out.push('Z');
    }
  }
  return out.join('');
}

// Logo: x=256 y=318, middle, font-size 128, textLength 396
const wordmarkPath = () => textPath('erişte', { size: 128, baseline: 318, x: 256, width: 396, anchor: 'middle' });

const WORDMARK = wordmarkPath();
const MARK_VIEWBOX = '58 82 414 270';
const CHOPSTICKS = ['M96 150 L452 92', 'M104 178 L462 122'];

fs.writeFileSync(
  path.join(srcBrandDir, 'paths.ts'),
  `// scripts/build-brand.mjs tarafından üretildi; elle düzenleme.\n` +
    `export const WORDMARK = ${JSON.stringify(WORDMARK)};\n` +
    `export const CHOPSTICKS = ${JSON.stringify(CHOPSTICKS)};\n` +
    `export const MARK_VIEWBOX = ${JSON.stringify(MARK_VIEWBOX)};\n`,
);

const variants = {
  gece: { bg: '#15131A', tel: '#FFC53D', glow: '#FFE08A', text: '#F5F3F7', stick: '#E2B07A' },
  biber: { bg: '#C8312A', tel: '#FFC53D', glow: '#FFE08A', text: '#FFF6DC', stick: '#F6EEDC' },
  kagit: { bg: '#F6EEDC', tel: '#EDA82A', glow: '#FFD873', text: '#C8312A', stick: '#15131A' },
};

const noodleStrokes = (tel, glow, mul = 1, glowOpacity = 0.75) =>
  NOODLES.map(([d, w]) => `<path d="${d}" stroke="${tel}" stroke-width="${+(w * mul).toFixed(1)}"/>`).join('') +
  (glow
    ? `<g opacity="${glowOpacity}" transform="translate(-2 -2)">` +
      NOODLES.map(([d, w]) => `<path d="${d}" stroke="${glow}" stroke-width="${Math.max(2.5, Math.round(w * mul * 0.28))}"/>`).join('') +
      '</g>'
    : '');

const wordmarkSvg = (v) =>
  `<path d="${WORDMARK}" fill="${v.text}" stroke="${v.bg}" stroke-width="30" stroke-linejoin="round" paint-order="stroke"/>` +
  CHOPSTICKS.map((d) => `<path d="${d}" stroke="${v.bg}" stroke-width="30"/>`).join('') +
  CHOPSTICKS.map((d) => `<path d="${d}" stroke="${v.stick}" stroke-width="14"/>`).join('');

const icon = (v, radius = true) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
  `<rect width="512" height="512" ${radius ? `rx="${(512 * 0.2237).toFixed(1)}"` : ''} fill="${v.bg}"/>` +
  noodleStrokes(v.tel, v.glow) +
  wordmarkSvg(v) +
  `</svg>`;

// ---------- 2. Logo SVG'leri ----------
for (const [name, v] of Object.entries(variants)) {
  fs.writeFileSync(path.join(brandDir, `logo-${name}.svg`), icon(v));
}
// Yatay işaret (tellersiz): açık ve koyu zemin
const mark = (text, stroke, stick) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}" fill="none" stroke-linecap="round" role="img" aria-label="erişte">` +
  `<path d="${WORDMARK}" fill="${text}" stroke="${stroke}" stroke-width="30" stroke-linejoin="round" paint-order="stroke"/>` +
  CHOPSTICKS.map((d) => `<path d="${d}" stroke="${stroke}" stroke-width="30"/>`).join('') +
  CHOPSTICKS.map((d) => `<path d="${d}" stroke="${stick}" stroke-width="14"/>`).join('') +
  `</svg>`;
fs.writeFileSync(path.join(brandDir, 'wordmark-acik.svg'), mark('#C8312A', '#F2F1F4', '#15131A'));
fs.writeFileSync(path.join(brandDir, 'wordmark-koyu.svg'), mark('#F5F3F7', '#15131A', '#E2B07A'));

// ---------- 3. Teller deseni (döşeme) ----------
const tile = (color, opacity) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
  `<g opacity="${opacity}">` +
  NOODLES.map(([d, w]) => `<path d="${d}" stroke="${color}" stroke-width="${+(w * 1.4).toFixed(1)}"/>`).join('') +
  `</g></svg>`;
fs.writeFileSync(path.join(brandDir, 'noodles-tile-krem.svg'), tile('#EDA82A', 0.4));
fs.writeFileSync(path.join(brandDir, 'noodles-tile-koyu.svg'), tile('#FFC53D', 0.18));

// ---------- 4. Favicon seti (gece varyantı) ----------
const gece = variants.gece;
fs.writeFileSync(path.join(root, 'public/favicon.svg'), icon(gece));
const png = (svg, size, file) =>
  sharp(Buffer.from(svg), { density: Math.ceil((72 * size) / 512) * 2 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public', file));
await png(icon(gece, false), 180, 'apple-touch-icon.png'); // iOS köşeyi kendisi yuvarlar
await png(icon(gece), 192, 'brand/icon-192.png');
await png(icon(gece), 512, 'brand/icon-512.png');
// favicon.ico yerine 32px PNG (tüm modern tarayıcılar destekler)
await png(icon(gece), 32, 'favicon-32.png');

// ---------- 5. OG görseli (1200x630): krem zemin, teller, logo, Kıvırık ----------
const KIVIRIK_SELAM = `
  <path d="M120 54 C110 36 126 20 140 28 C152 35 145 51 133 47" stroke="#FFC53D" stroke-width="11"/>
  <path d="M178 104 C192 96 200 82 196 68" stroke="#FFC53D" stroke-width="12"/>
  <ellipse cx="120" cy="104" rx="64" ry="56" fill="#FFC53D"/>
  <path d="M74 86 C84 79 94 92 104 85" stroke="#E9A321" stroke-width="5"/>
  <path d="M136 76 C146 69 156 82 166 75" stroke="#E9A321" stroke-width="5"/>
  <circle cx="100" cy="106" r="9.5" fill="#15131A"/><circle cx="103.5" cy="102.5" r="3.2" fill="#FFFFFF"/>
  <circle cx="140" cy="106" r="9.5" fill="#15131A"/><circle cx="143.5" cy="102.5" r="3.2" fill="#FFFFFF"/>
  <ellipse cx="85" cy="124" rx="9" ry="5.5" fill="#FF8A3D" opacity="0.6"/>
  <ellipse cx="155" cy="124" rx="9" ry="5.5" fill="#FF8A3D" opacity="0.6"/>
  <path d="M108 122 Q120 135 132 122" stroke="#15131A" stroke-width="5"/>
  <path d="M26 144 H214 C214 194 172 222 120 222 C68 222 26 194 26 144 Z" fill="#15131A"/>
  <ellipse cx="120" cy="144" rx="94" ry="11" fill="#2A2733"/>
  <path d="M62 146 C66 158 56 164 61 176" stroke="#FFC53D" stroke-width="9"/>
  <path d="M176 146 C172 156 182 162 178 172" stroke="#FFC53D" stroke-width="9"/>
  <path d="M74 186 C88 176 102 196 116 186 C130 176 144 196 158 186 C162 183 166 183 168 185" stroke="#FFC53D" stroke-width="6"/>`;

const krem = '#F6EEDC';
const slogan1 = textPath('Bütün aboneliklerin', { size: 64, baseline: 0, x: 0 });
const slogan2 = textPath('tek kâsede.', { size: 64, baseline: 70, x: 0 });
const og =
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
  `<defs><pattern id="tel" width="380" height="380" patternUnits="userSpaceOnUse">` +
  `<g transform="scale(${380 / 512})" opacity="0.4">` +
  NOODLES.map(([d, w]) => `<path d="${d}" stroke="#EDA82A" stroke-width="${+(w * 1.4).toFixed(1)}"/>`).join('') +
  `</g></pattern></defs>` +
  `<rect width="1200" height="630" fill="${krem}"/><rect width="1200" height="630" fill="url(#tel)"/>` +
  // Logo (kagit varyantı), yazı zemin renginde konturla telleri keser
  `<g transform="translate(20 20) scale(1.2)">` +
  `<path d="${WORDMARK}" fill="#C8312A" stroke="${krem}" stroke-width="30" paint-order="stroke"/>` +
  CHOPSTICKS.map((d) => `<path d="${d}" stroke="${krem}" stroke-width="30"/>`).join('') +
  CHOPSTICKS.map((d) => `<path d="${d}" stroke="#15131A" stroke-width="14"/>`).join('') +
  `</g>` +
  `<g transform="translate(96 500)">` +
  `<path d="${slogan1}" fill="#15131A" stroke="${krem}" stroke-width="18" paint-order="stroke"/>` +
  `<path d="${slogan2}" fill="#15131A" stroke="${krem}" stroke-width="18" paint-order="stroke"/>` +
  `</g>` +
  `<g transform="translate(700 70) scale(2.05)">${KIVIRIK_SELAM}</g>` +
  `</svg>`;
fs.mkdirSync(path.join(root, 'public/images'), { recursive: true });
await sharp(Buffer.from(og), { density: 72 })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(path.join(root, 'public/images/og.png'));

console.log('Marka varlıkları üretildi.');
