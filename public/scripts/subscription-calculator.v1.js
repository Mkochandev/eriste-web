import { calculateSubscriptions } from './subscription-math.v1.mjs';
const form = document.querySelector('#subscription-calculator');
if (form instanceof HTMLFormElement) {
  const result = document.querySelector('#subscription-result');
  const status = document.querySelector('#subscription-status');
  const rows = [...form.querySelectorAll('[data-service]')];
  const money = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 });
  const sync = () => {
    rows.forEach(row => {
      const enabled = row.querySelector('[data-enabled]').checked;
      row.querySelectorAll('[data-detail]').forEach(field => { field.disabled = !enabled; });
    });
    result.hidden = true;
    status.textContent = '';
  };
  form.querySelector('[type=submit]').disabled = false;
  form.querySelector('[type=reset]').disabled = false;
  form.addEventListener('input', sync);
  form.addEventListener('change', sync);
  form.addEventListener('reset', () => setTimeout(sync, 0));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const selected = rows.filter(row => row.querySelector('[data-enabled]').checked);
    if (!selected.length) { status.textContent = 'Önce en az bir abonelik seç ve ödediğin tutarı gir.'; return; }
    if (!form.reportValidity()) return;
    try {
      const totals = calculateSubscriptions(selected.map(row => ({
        amount: row.querySelector('[data-amount]').valueAsNumber,
        period: row.querySelector('[data-period]').value,
        removable: row.querySelector('[data-removable]').checked,
      })));
      result.querySelector('[data-monthly]').textContent = money.format(totals.monthly);
      result.querySelector('[data-yearly]').textContent = money.format(totals.yearly);
      result.querySelector('[data-saving]').textContent = money.format(totals.removableYearly);
      result.querySelector('[data-saving-line]').hidden = !selected.some(row => row.querySelector('[data-removable]').checked);
      result.hidden = false;
      status.textContent = `${selected.length} abonelik için aylık ortalama ${money.format(totals.monthly)}, yıllık karşılık ${money.format(totals.yearly)}.`;
    } catch { status.textContent = 'Tutarları ve ödeme dönemlerini kontrol et.'; }
  });
  sync();
}
