// Özgün vektör şemalar: kaynak bu dosyadır; gerçek platform fiyatı içermez.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const out = 'public/images/blog';
await fs.mkdir(out, { recursive:true });
const text = (x,y,value,size=32,color='#15131a') => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="700" fill="${color}">${value}</text>`;
const box = (x,y,w,h,fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${fill}"/>`;
const defs = {
  butce: { title:'Küçük ödemeler. Büyük toplam.', subtitle:'Aylık ortalama ile ödeme takvimini ayrı gör.', alt:'Temsilî bütçe: 150 TL müzik, 250 TL video ve yıllık 1.200 TL araç aboneliği aylık ortalamada 500 TL eder.', art:
    box(64,230,480,280,'#ffffff') + text(96,295,'Müzik / ay',28)+text(400,295,'150 ₺',28)+text(96,365,'Video / ay',28)+text(400,365,'250 ₺',28)+text(96,435,'Araç / yıl',28)+text(365,435,'1.200 ₺',28)+
    box(580,230,556,280,'#15131a')+text(620,300,'AYLIK ORTALAMA',26,'#ffc53d')+text(620,405,'500 ₺',88,'#f6eedc')+text(620,466,'150 + 250 + (1.200 ÷ 12)',28,'#f6eedc') },
  yillik: { title:'Yıllık plan ne zaman avantajlı?', subtitle:'İndirim oranından önce kullanım sürene bak.', alt:'Temsilî karşılaştırma: aylık 100 TL ve yıllık 900 TL plan dokuz ayda eşitlenir; altı ayda aylık, on iki ayda yıllık plan daha ucuzdur.', art:
    box(64,230,330,280,'#ffffff')+text(96,290,'6 AY',30)+text(96,365,'600 ₺',64)+text(96,448,'Aylık daha düşük',25)+
    box(435,230,330,280,'#ffc53d')+text(467,290,'9 AY',30)+text(467,365,'900 ₺',64)+text(467,448,'Maliyetler eşit',25)+
    box(806,230,330,280,'#15131a')+text(838,290,'12 AY',30,'#ffc53d')+text(838,365,'1.200 ₺',58,'#f6eedc')+text(838,448,'Yıllık plan: 900 ₺',25,'#f6eedc') },
  ogrenci: { title:'Öğrenci planı: dört kontrol.', subtitle:'İndirim, yalnızca düşük fiyat demek değil.', alt:'Öğrenci aboneliği seçiminde dört kontrol: uygun okul, doğrulama, dahil olan özellikler ve yeniden doğrulama tarihi.', art:
    box(64,230,520,130,'#ffffff')+text(96,285,'01 / Uygun okul',34)+text(96,330,'Kayıt formunda kontrol et.',24)+
    box(616,230,520,130,'#ddd6ff')+text(648,285,'02 / Doğrulama',34)+text(648,330,'Onaydan sonra planı kontrol et.',24)+
    box(64,388,520,130,'#cdf1e1')+text(96,443,'03 / Özellikler',34)+text(96,488,'Gerçekten ne kullanıyorsun?',24)+
    box(616,388,520,130,'#ffc53d')+text(648,443,'04 / Yenileme',34)+text(648,488,'Doğrulama tarihini kaydet.',24) },
  unutulan: { title:'Bir liste, dört farklı iz.', subtitle:'Tek bir mağaza ekranı bütün aboneliklerini göstermez.', alt:'Unutulan abonelikleri bulmak için dört kaynak birleştirilir: Apple, Google Play, e-posta makbuzları ve ödeme kayıtları.', art:
    box(64,230,250,110,'#ffffff')+text(92,295,'Apple',36)+box(64,388,250,110,'#ddd6ff')+text(92,453,'Google Play',30)+
    box(370,230,300,110,'#cdf1e1')+text(398,295,'E-posta',36)+box(370,388,300,110,'#ffe0c7')+text(398,453,'Ödeme kaydı',30)+
    `<path d="M700 360H770m-24-24 24 24-24 24" fill="none" stroke="#15131a" stroke-width="8"/>`+
    box(806,230,330,268,'#15131a')+text(840,303,'TEK LİSTE',32,'#ffc53d')+text(840,370,'Hizmet · Hesap',26,'#f6eedc')+text(840,418,'Tutar · Tarih',26,'#f6eedc')+text(840,463,'Ödeme kanalı',26,'#f6eedc') }
};
const manifest = {};
for (const [key, d] of Object.entries(defs)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${box(0,0,1200,630,'#f6eedc')}${text(64,70,'erişte / abonelik notları',24,'#b4271f')}${text(64,141,d.title,49)}${text(64,190,d.subtitle,26)}${d.art}${text(64,584,key==='butce'||key==='yillik'?'Örnek hesap • Güncel platform fiyatı değildir.':'erişte tarafından hazırlanan kontrol şeması',23,'#5f5b66')}</svg>`;
  const hash = createHash('sha256').update(svg).digest('hex').slice(0,10);
  const base = `${key}-${hash}`;
  await sharp(Buffer.from(svg)).png().toFile(`${out}/${base}.png`);
  await sharp(Buffer.from(svg)).webp({quality:85}).toFile(`${out}/${base}.webp`);
  await sharp(Buffer.from(svg)).resize(600).webp({quality:85}).toFile(`${out}/${base}-600.webp`);
  manifest[key] = { src:`/images/blog/${base}.webp`, small:`/images/blog/${base}-600.webp`, og:`/images/blog/${base}.png`, alt:d.alt };
}
await fs.mkdir('src/data', {recursive:true});
await fs.writeFile('src/data/blog-covers.json', JSON.stringify(manifest,null,2)+'\n');
console.log('4 original diagrams, responsive WebP and PNG sharing images generated.');
