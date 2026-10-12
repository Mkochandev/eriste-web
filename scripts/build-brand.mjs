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

// ---------- 3. Kenar şeritleri: bölümlerin üstünden/altından sarkan teller ----------
// Karo deseni yerine yalnızca yatayda tekrar eden geniş şeritler. Yatay teller periyodik
// (frekanslar şerit genişliğinin tam katı), bu yüzden tekrar noktasında ek yeri görünmez.
const BAND_W = 1600;
const BAND_H = 260;
const f1 = (n) => +n.toFixed(1);

// Noktalardan Catmull-Rom ile yumuşak kübik Bézier
function smooth(pts) {
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d;
}

// Yatay tel: y = y0 + a1·sin(2πk1x/W + p1) + a2·sin(2πk2x/W + p2), k tam sayı → periyodik
function wave({ y0, a1, k1, p1 = 0, a2 = 0, k2 = 1, p2 = 0 }) {
  const pts = [];
  for (let x = -80; x <= BAND_W + 80; x += 20) {
    const t = (2 * Math.PI * x) / BAND_W;
    pts.push([x, y0 + a1 * Math.sin(k1 * t + p1) + a2 * Math.sin(k2 * t + p2)]);
  }
  return smooth(pts);
}

// Sarkan tel: kenardan girip hafifçe kıvrılarak iner, ucu Kıvırık'ın tepesi gibi kıvrılır
function drip({ x, len, sway = 18, phase = 0, curl = 1, from = 'top' }) {
  const pts = [];
  for (let y = -30; y <= len; y += 18) {
    pts.push([x + sway * Math.sin((y / len) * Math.PI * 1.6 + phase), y]);
  }
  let d = smooth(pts);
  if (curl) {
    const [ex, ey] = pts[pts.length - 1];
    const s = curl; // 1: sağa, -1: sola kıvrılır
    d += ` C${f1(ex)} ${f1(ey + 22)} ${f1(ex + 30 * s)} ${f1(ey + 28)} ${f1(ex + 34 * s)} ${f1(ey + 8)}` +
      ` C${f1(ex + 37 * s)} ${f1(ey - 8)} ${f1(ex + 18 * s)} ${f1(ey - 12)} ${f1(ex + 14 * s)} ${f1(ey)}`;
  }
  if (from === 'bottom') {
    // Dikeyde aynala: alttan yükselen tel
    d = d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, X, Y) => `${X} ${f1(BAND_H - +Y)}`);
  }
  return d;
}

const TOP = [
  [wave({ y0: 26, a1: 12, k1: 3, p1: 0.4, a2: 6, k2: 7, p2: 1.1 }), 13],
  [wave({ y0: 70, a1: 16, k1: 2, p1: 2.2, a2: 7, k2: 5, p2: 0.3 }), 11],
  [wave({ y0: 118, a1: 13, k1: 4, p1: 4.0, a2: 5, k2: 9, p2: 2.0 }), 10],
  [drip({ x: 190, len: 190, phase: 0.2, curl: 1 }), 11],
  [drip({ x: 560, len: 150, sway: 14, phase: 1.8, curl: 0 }), 10],
  [drip({ x: 905, len: 205, phase: 3.1, curl: -1 }), 11],
  [drip({ x: 1300, len: 165, sway: 16, phase: 0.9, curl: 1 }), 10],
];
const BOTTOM = [
  [wave({ y0: BAND_H - 24, a1: 12, k1: 3, p1: 2.6, a2: 6, k2: 8, p2: 0.5 }), 13],
  [wave({ y0: BAND_H - 68, a1: 15, k1: 2, p1: 0.9, a2: 7, k2: 6, p2: 2.4 }), 11],
  [wave({ y0: BAND_H - 114, a1: 12, k1: 5, p1: 3.3, a2: 4, k2: 3, p2: 1.2 }), 10],
  [drip({ x: 380, len: 175, phase: 2.4, curl: -1, from: 'bottom' }), 11],
  [drip({ x: 760, len: 140, sway: 14, phase: 0.6, curl: 0, from: 'bottom' }), 10],
  [drip({ x: 1120, len: 195, phase: 1.5, curl: 1, from: 'bottom' }), 11],
  [drip({ x: 1480, len: 150, sway: 15, phase: 3.6, curl: 0, from: 'bottom' }), 10],
];

const band = (strands, tel, glow, opacity) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BAND_W} ${BAND_H}" width="${BAND_W}" height="${BAND_H}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
  `<g opacity="${opacity}">` +
  strands.map(([d, w]) => `<path d="${d}" stroke="${tel}" stroke-width="${w}"/>`).join('') +
  `<g opacity="0.7" transform="translate(-1.5 -1.5)">` +
  strands.map(([d, w]) => `<path d="${d}" stroke="${glow}" stroke-width="${Math.max(2.5, Math.round(w * 0.28))}"/>`).join('') +
  `</g></g></svg>`;

const BANDS = {
  krem: ['#EDA82A', '#FFD873', 0.42],
  koyu: ['#FFC53D', '#FFE08A', 0.2],
};
for (const [name, [tel, glow, op]] of Object.entries(BANDS)) {
  fs.writeFileSync(path.join(brandDir, `noodles-top-${name}.svg`), band(TOP, tel, glow, op));
  fs.writeFileSync(path.join(brandDir, `noodles-bottom-${name}.svg`), band(BOTTOM, tel, glow, op));
}
for (const old of ['noodles-tile-krem.svg', 'noodles-tile-koyu.svg']) fs.rmSync(path.join(brandDir, old), { force: true });

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
  `<rect width="1200" height="630" fill="${krem}"/>` +
  `<g transform="translate(-180 -40) scale(1)">${band(TOP, '#EDA82A', '#FFD873', 0.42).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>` +
  `<g transform="translate(-520 410) scale(1)">${band(BOTTOM, '#EDA82A', '#FFD873', 0.42).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>` +
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
