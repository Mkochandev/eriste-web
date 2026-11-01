export function normalizeCatalog(data) {
  if (!Array.isArray(data?.catalog)) throw new Error('Geçersiz katalog');
  return data.catalog.filter(app=>app && typeof app.app_name==='string' && Array.isArray(app.plans)).map(app=>({
    name:app.app_name,
    plans:app.plans.filter(p=>p && typeof p.id==='string' && typeof p.plan_name==='string' && ['monthly','yearly'].includes(p.billing_cycle) && ['TRY','USD'].includes(p.currency) && p.current_price_try !== null && p.current_price_try !== '' && Number.isFinite(Number(p.current_price_try)) && Number(p.current_price_try)>=0).map(p=>({
      id:p.id, name:p.plan_name, price:Number(p.current_price_try), period:p.billing_cycle, currency:p.currency,
      category:typeof p.category==='string'?p.category:'Diğer', checked:typeof p.last_checked_at==='string'?p.last_checked_at:null,
      source:typeof p.source_url==='string' && /^https:\/\//i.test(p.source_url)?p.source_url:null,
    })),
  })).filter(app=>app.plans.length).sort((a,b)=>a.name.localeCompare(b.name,'tr'));
}
export function catalogTotals(selections) {
  const monthly = selections.reduce((sum,p)=>sum+p.price/(p.period==='yearly'?12:1),0);
  return {monthly,yearly:monthly*12};
}
