export function calculateSubscriptions(items) {
  let monthly = 0;
  let removableMonthly = 0;
  for (const item of items) {
    if (!Number.isFinite(item.amount) || item.amount < 0 || item.amount > 1000000) throw new RangeError('Geçerli bir tutar gir.');
    if (!['monthly', 'yearly'].includes(item.period)) throw new RangeError('Geçerli bir dönem seç.');
    const normalized = item.period === 'yearly' ? item.amount / 12 : item.amount;
    monthly += normalized;
    if (item.removable) removableMonthly += normalized;
  }
  return { monthly, yearly: monthly * 12, removableYearly: removableMonthly * 12 };
}
