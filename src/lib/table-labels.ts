// Markdown'dan gelen tablolarda her <td>'ye sütun başlığını data-label olarak ekler;
// dar ekranda satırlar etiketli kartlara dönüşebilsin diye (bkz. LegalLayout).
// Girdi kendi yazdığımız yasal metinlerdir; basit tablo yapısını varsayar.

const strip = (html: string) => html.replace(/<[^>]+>/g, '').trim().replace(/"/g, '&quot;');

export function addTableLabels(html: string): string {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (table) => {
    const head = table.match(/<thead>([\s\S]*?)<\/thead>/);
    if (!head) return table;
    const labels = [...head[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => strip(m[1]));
    return table.replace(/<tr>([\s\S]*?)<\/tr>/g, (row) => {
      let i = 0;
      return row.replace(/<td(\s[^>]*)?>/g, (td, attrs = '') => {
        const label = labels[i++];
        return label ? `<td${attrs} data-label="${label}">` : td;
      });
    });
  });
}
