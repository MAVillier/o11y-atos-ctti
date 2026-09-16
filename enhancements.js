window.AtlesExtras=(()=>{
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels=['Benefici','Facilitat','Control del risc','Urgència','Independència','Encaix CTTI'];
  const full=['benefici esperat','facilitat d’execució','control del risc','urgència','independència d’altres idees','encaix amb el CTTI'];
  const valid=v=>Number.isFinite(v)&&v>=1&&v<=10;
  function conclusion(raw=[]){
    const v=labels.map((_,i)=>valid(raw[i])?raw[i]:null),n=v.filter(x=>x!==null).length;
    if(!n)return 'Puntua els sis eixos per dibuixar el perfil de la idea.';
    if(n<6)return `Perfil encara parcial: ${n} de 6 eixos valorats. Falten dades per fer-ne una lectura conjunta.`;
    if(v[2]<=4)return 'El control del risc demana més treball abans d’ampliar l’abast del pilot.';
    if(v[5]<=4)return 'Cal aclarir l’encaix amb el CTTI abans de prioritzar aquesta idea.';
    if(v[0]>=7&&v[1]<=4)return 'Benefici atractiu, amb execució exigent: convé començar amb un pilot acotat.';
    if(v[4]<=4)return 'La idea depèn d’altres peces: cal ordenar-les abans de fixar el desplegament.';
    if(v.every(x=>x>=7))return 'Perfil favorable en els sis eixos. Bon candidat per contrastar amb un pilot.';
    if(v[0]<=4)return 'El benefici encara no convenç: cal concretar quin problema resoldria.';
    if(v[3]<=4&&v[0]>=7)return 'Aporta valor, però no sembla urgent. Es pot preparar sense avançar-ne el desplegament.';
    const min=Math.min(...v),weak=full.filter((_,i)=>v[i]===min);
    if(Math.max(...v)-min<=2)return 'Perfil equilibrat. El pilot ha d’aportar evidències per confirmar aquesta valoració.';
    return `Cal aprofundir en ${weak.slice(0,2).join(' i ')} abans de decidir el següent pas.`;
  }
  function radar(raw=[],id='idea'){
    const v=labels.map((_,i)=>valid(raw[i])?raw[i]:null),done=v.every(x=>x!==null);
    const xy=(i,value)=>{const a=-Math.PI/2+i*Math.PI/3;return [180+90*value/10*Math.cos(a),153+90*value/10*Math.sin(a)]};
    const pt=(i,x)=>xy(i,x).map(v=>v.toFixed(2)).join(',');
    const uid='radar-'+id.replace(/[^\w-]/g,'');
    const ring=[2,4,6,8,10].map(n=>`<polygon points="${labels.map((_,i)=>pt(i,n)).join(' ')}" fill="none" stroke="#cfd9df" stroke-width="${n===10?1.2:.7}"/>`).join('');
    const spokes=labels.map((_,i)=>`<line x1="180" y1="153" x2="${xy(i,10)[0]}" y2="${xy(i,10)[1]}" stroke="#cfd9df" stroke-width=".7"/>`).join('');
    const positions=[[180,34,'middle'],[278,100,'start'],[278,213,'start'],[180,278,'middle'],[82,213,'end'],[82,100,'end']];
    const captions=positions.map(([x,y,a],i)=>`<text x="${x}" y="${y}" text-anchor="${a}" fill="#586876" font-size="11">${esc(labels[i])}<tspan x="${x}" dy="16" font-size="13" font-weight="600" fill="#182a38">${v[i]??'—'}</tspan></text>`).join('');
    const polygon=done?`<polygon class="radar-value" points="${v.map((n,i)=>pt(i,n)).join(' ')}" fill="#0073e6" fill-opacity="0.1" stroke="#0073e6" stroke-width="2"/>`:'';
    const partial=!done?v.map((n,i)=>n!==null&&v[(i+1)%6]!==null?`<line x1="${xy(i,n)[0]}" y1="${xy(i,n)[1]}" x2="${xy((i+1)%6,v[(i+1)%6])[0]}" y2="${xy((i+1)%6,v[(i+1)%6])[1]}" stroke="#0073e6" stroke-width="2"/>`:'').join(''):'';
    const dots=v.map((n,i)=>n!==null?`<circle cx="${xy(i,n)[0]}" cy="${xy(i,n)[1]}" r="3.5" fill="#0073e6"/>`:'').join('');
    return `<svg class="radar" viewBox="0 0 360 312" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">Valoració de ${esc(id)}: gràfica d’aranya</title><desc id="${uid}-desc">${labels.map((s,i)=>`${s}: ${v[i]??'sense valorar'}`).join('. ')}. Escala de zero a deu; les puntuacions comencen a u. Els eixos sense valorar no es dibuixen com a zero.</desc>${ring}${spokes}<text x="185" y="150" font-size="9" fill="#586876">0</text><text x="185" y="69" font-size="9" fill="#586876">10</text>${polygon}${partial}${dots}${captions}</svg>`;
  }
  const links=ids=>`<div class="dep-links">${ids.map(id=>`<a href="#card/${esc(id)}">${esc(id)}</a>`).join('')}</div>`;
  function scopeForCard(id){const text=window.ATLES_CONTEXT?.scope?.cardNotes?.[id];return text?`<section class="content-section scope-card"><h2>On encaixa en l’abast del CTTI</h2><p>${esc(text)}</p><a class="link" href="#scope">Consulta el mapa d’actors i cobertura →</a></section>`:''}
  function scope(){const d=window.ATLES_CONTEXT?.scope;if(!d)return '';return `<div class="wrap"><div class="section-head"><div><p class="eyebrow">L’abast del CTTI</p><h1>De l’actor al servei observat</h1><p>${esc(d.intro)}</p></div><a class="link" href="#architecture">Com encaixen les peces →</a></div><p class="actor-relation">${esc(d.relation)}</p><div class="actor-flow">${d.actors.map(a=>`<article><h2>${esc(a.name)}</h2><p>${esc(a.role)}</p></article>`).join('')}</div><p class="notice-inline">${esc(d.limit)}</p><div class="section-head"><div><p class="eyebrow">Cobertura de la proposta</p><h2>Què observaríem, i amb què</h2><p>Les fitxes enllaçades concreten la solució d’Atos per a cada àmbit.</p></div></div><div class="scope-grid">${d.domains.map(x=>`<article class="scope-domain"><span class="eyebrow">${esc(x.code)}</span><h2>${esc(x.name)}</h2><p><b>Abast documentat.</b> ${esc(x.assets)}</p><p><b>Actors.</b> ${esc(x.actors)}</p><p><b>Atos proposa.</b> ${esc(x.observation)}</p>${links(x.cards)}<p class="note">Per comprovar: ${esc(x.check)}</p></article>`).join('')}</div><div class="methodology"><h2>Com comprovaríem la cobertura real</h2><p>${esc(d.validation)}</p><p class="note">${esc(d.source)}</p></div></div>`}
  function guide(){const d=window.ATLES_CONTEXT?.guide;if(!d)return '';return `<div class="wrap"><div class="section-head"><div><p class="eyebrow">Guia inicial</p><h1>${esc(d.title)}</h1><p>${esc(d.intro)}</p></div><a class="link" href="#atlas">Explora les 34 fitxes →</a></div><div class="guide-grid">${d.steps.map((s,i)=>`<article><span class="index">0${i+1} / ORIENTACIÓ ATOS</span><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p>${links(s.cards)}<p><a class="link" href="#relations?entry=initiative&initiative=${['alta','canvi','tramit','agent'][i]}">Veure el recorregut al mapa →</a></p></article>`).join('')}</div><p class="notice-inline">${esc(d.limit)}</p><div class="methodology">${d.sections.map(s=>`<h2>${esc(s.title)}</h2><p>${esc(s.text)}</p>`).join('')}<h2>Fonts d’aquesta lectura</h2>${d.sources.map(s=>`<p>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`:esc(s.title)}<br><span class="note">${esc(s.note)}</span></p>`).join('')}</div></div>`}
  return {radar,conclusion,scopeForCard,scope,guide};
})();
