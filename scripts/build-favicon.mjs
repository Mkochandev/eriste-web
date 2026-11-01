import fs from 'node:fs/promises';
import sharp from 'sharp';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../public');
// Kelime logosu yerine 16 px'de de seçilen kâse + tek erişte teli.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#15131a"/><path d="M6 18h20c-1 7-5 10-10 10S7 25 6 18Z" fill="#ffc53d"/><path d="M13 14c-7-6 7-3 4-9" fill="none" stroke="#ffc53d" stroke-width="3.5" stroke-linecap="round"/></svg>`;
await fs.writeFile(path.join(root,'favicon-bowl.svg'),svg);
await fs.writeFile(path.join(root,'favicon.svg'),svg);
for (const size of [16,32]) {
  const png = await sharp(Buffer.from(svg)).resize(size,size).png().toBuffer();
  await fs.writeFile(path.join(root,`favicon-bowl-${size}.png`),png);
  if(size===32) await fs.writeFile(path.join(root,'favicon-32.png'),png);
}
console.log('Bowl favicon: SVG, 16px and 32px PNG ready.');
