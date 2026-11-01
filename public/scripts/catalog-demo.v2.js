import { normalizeCatalog, catalogTotals } from './catalog-data.v2.mjs';
const dialog = document.querySelector('#catalog-demo');
const openButton = document.querySelector('#open-catalog');
const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY'}).format(n);
const el = (tag, text, cls) => { const node=document.createElement(tag); if(text!==undefined) node.textContent=text; if(cls) node.className=cls; return node; };
let catalog=[], category='Tümü', loaded=false, loading=false;
const selected=new Map();
function show(screen) {
  for(const name of ['catalog','plan','list']) $(`${name}-screen`).hidden=name!==screen;
  dialog.setAttribute('aria-labelledby',screen==='plan'?'plan-title':screen==='list'?'list-title':'catalog-title');
  dialog.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===(screen==='plan'?'catalog':screen))));
}
function totals() {
  const result=catalogTotals([...selected.values()]);
  $('demo-monthly').textContent=money(result.monthly); $('demo-yearly').textContent=money(result.yearly); $('list-count').textContent=String(selected.size);
}
function renderList() {
  const list=$('selected-items'); list.replaceChildren();
  if(!selected.size) list.append(el('p','Henüz abonelik eklemedin. Katalogdan bir servis ve plan seç.','hint'));
  selected.forEach((p,name)=>{
    const row=el('div',undefined,'selected-row'), copy=el('div',undefined,'copy');
    copy.append(el('strong',name),el('small',`${p.name} · ${money(p.price)} / ${p.period==='yearly'?'yıl':'ay'}`));
    const remove=el('button','✕'); remove.type='button'; remove.setAttribute('aria-label',`${name} aboneliğini kaldır`);
    remove.addEventListener('click',()=>{selected.delete(name); totals(); renderList(); if(loaded) renderCatalog(); $('list-title').focus();});
    row.append(copy,remove); list.append(row);
  });
}
function plans(app) {
  const list=$('plan-items'); list.replaceChildren(); $('plan-title').textContent=app.name;
  app.plans.forEach(p=>{
    const card=el('div',undefined,'plan-card'), button=el('button',undefined,'plan-row'), copy=el('div',undefined,'copy'); button.type='button';
    copy.append(el('strong',p.name),el('small',`${p.currency==='USD'?'Yaklaşık ':''}${money(p.price)} / ${p.period==='yearly'?'yıl':'ay'}`));
    button.append(copy,el('span',selected.get(app.name)?.id===p.id?'✓':'+','plus'));
    button.setAttribute('aria-label',`${app.name} ${p.name}, ${money(p.price)} ${p.period==='yearly'?'yıllık':'aylık'}, listeye ekle`);
    button.addEventListener('click',()=>{selected.set(app.name,p); totals(); renderList(); renderCatalog(); show('list'); $('list-title').focus();});
    const date=new Date(p.checked); const label=p.checked && Number.isFinite(date.valueOf())?`Son kontrol: ${date.toLocaleDateString('tr-TR')} · Kaynak ↗`:'Kontrol tarihi yok · Kaynak ↗';
    card.append(button);
    if(p.source) {const source=el('a',label,'source'); source.href=p.source; source.target='_blank'; source.rel='noopener noreferrer'; card.append(source);}
    list.append(card);
  });
  show('plan'); $('plan-title').focus();
}
function renderCatalog() {
  const list=$('catalog-items'); list.replaceChildren();
  const query=$('catalog-search').value.trim().toLocaleLowerCase('tr');
  const apps=catalog.filter(a=>a.name.toLocaleLowerCase('tr').includes(query) && (category==='Tümü'||a.plans.some(p=>p.category===category)));
  apps.forEach(app=>{
    const button=el('button',undefined,'service-row'); button.type='button';
    const copy=el('span',undefined,'copy'); copy.append(el('strong',app.name),el('small',app.plans[0].category));
    button.append(el('span',app.name.slice(0,1),'symbol'),copy,el('span',selected.has(app.name)?'✓':'+','plus'));
    button.setAttribute('aria-label',`${app.name} planlarını seç`); button.addEventListener('click',()=>plans(app)); list.append(button);
  });
  $('catalog-status').textContent=apps.length?'':'Bu aramayla eşleşen servis yok.';
}
async function loadCatalog() {
  if(loading) return; loading=true; $('catalog-retry').hidden=true; $('catalog-status').textContent='Katalog yükleniyor…';
  const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),12000);
  try {
    const response=await fetch('https://api.eriste.app/api/catalog',{credentials:'omit',referrerPolicy:'no-referrer',signal:controller.signal});
    if(!response.ok) throw new Error('Katalog alınamadı');
    catalog=normalizeCatalog(await response.json()); if(!catalog.length) throw new Error('Katalog boş');
    loaded=true;
    const filters=$('catalog-filters'); filters.replaceChildren();
    const categories=['Tümü',...new Set(catalog.flatMap(a=>a.plans.map(p=>p.category)))];
    categories.forEach(name=>{const button=el('button',name); button.type='button'; button.setAttribute('aria-pressed',String(name===category)); button.addEventListener('click',()=>{category=name; filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button))); renderCatalog();}); filters.append(button);});
    renderCatalog();
  } catch { $('catalog-status').textContent='Kataloğa şu an ulaşılamıyor. Yeniden deneyebilir veya uygulamada devam edebilirsin.'; $('catalog-retry').hidden=false; }
  finally {clearTimeout(timeout); loading=false;}
}
if(dialog instanceof HTMLDialogElement && openButton) {
  openButton.disabled=false;
  let previousOverflow='';
  openButton.addEventListener('click',()=>{previousOverflow=document.body.style.overflow; dialog.showModal(); document.body.style.overflow='hidden'; if(!loaded) loadCatalog();});
  $('close-catalog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow; openButton.focus();});
  $('catalog-retry').addEventListener('click',loadCatalog);
  $('catalog-search').addEventListener('input',()=>{if(loaded) renderCatalog();});
  $('back-catalog').addEventListener('click',()=>{show('catalog'); $('catalog-search').focus();});
  $('add-more').addEventListener('click',()=>{show('catalog'); $('catalog-search').focus();});
  dialog.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{renderList(); show(b.dataset.tab);}));
  renderList();
}
