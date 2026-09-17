window.AtlesRelations=(()=>{
  'use strict';
  const cards=window.ATLES_DATA.cards, model=window.ATLES_MODEL, context=window.ATLES_CONTEXT;
  const byId=Object.fromEntries(cards.map(c=>[c.id,c])), fits=Object.fromEntries(model.cards.map(c=>[c.id,c]));
  const roles=Object.fromEntries(model.roles.map(r=>[r.id,r])), processes=Object.fromEntries(model.processes.map(p=>[p.id,p]));
  const keys=['alta','canvi','tramit','agent'];
  const initiatives=context.guide.steps.map((s,i)=>({...s,id:keys[i]}));
  const colors={A:'#0757ed',B:'#2446a5',C:'#6741ac',D:'#007873',E:'#916313',F:'#a05931',G:'#677a44'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const related=id=>cards.filter(c=>['coordinator','executors','validators'].some(k=>fits[c.id][k].includes(id))).map(c=>c.id);
  let current=null,observer=null,inspected=null,returnFocus=null,pendingFocus=null,lastRoute='#relations';
  function parse(params){
    const entry=['initiative','actor','card'].includes(params.get('entry'))?params.get('entry'):params.has('actor')?'actor':params.has('focus')&&!params.has('initiative')?'card':'initiative';
    const initiative=keys.includes(params.get('initiative'))?params.get('initiative'):'canvi';
    const actor=roles[params.get('actor')]?params.get('actor'):'cdc';
    const group=initiatives.find(x=>x.id===initiative);
    const cohort=entry==='initiative'?group.cards:entry==='actor'?related(actor):cards.map(c=>c.id);
    const home=byId[params.get('home')]&&cohort.includes(params.get('home'))?params.get('home'):cohort[0];
    const focus=byId[params.get('focus')]?params.get('focus'):home;
    return {entry,initiative,actor,group,cohort,home,focus,projection:params.get('project')==='1'};
  }
  function url(next={}){
    const s={...current,...next},p=new URLSearchParams();p.set('entry',s.entry);
    if(s.entry==='initiative')p.set('initiative',s.initiative);if(s.entry==='actor')p.set('actor',s.actor);
    if(s.focus)p.set('focus',s.focus);if(s.home&&s.entry!=='card')p.set('home',s.home);if(s.projection)p.set('project','1');
    return '#relations?'+p;
  }
  function switcher(active,actor=''){
    const selected=active==='relations'&&current.entry==='actor'?current.actor:actor;
    const catalog=roles[selected]?'#atlas?actor='+selected:'#atlas';
    const remembered=new URLSearchParams(lastRoute.split('?')[1]||'');
    const map=active==='relations'?url():roles[actor]&&remembered.get('actor')!==actor?'#relations?entry=actor&actor='+actor:lastRoute;
    return `<nav class="atlas-views" aria-label="Vista de l’Atles"><a href="${catalog}" ${active==='cards'?'aria-current="page"':''}>Fitxes</a><a href="${map}" ${active==='relations'?'aria-current="page"':''}>Relacions</a></nav>`;
  }
  function modeLink(entry,label){const defaults={initiative:{initiative:'canvi',focus:'A4',home:'A4'},actor:{actor:'cdc',focus:related('cdc')[0],home:related('cdc')[0]},card:{focus:current.focus,home:''}};return `<a href="${current.entry===entry?url():url({entry,...defaults[entry]})}" ${current.entry===entry?'aria-current="page"':''}>${label}</a>`;}
  function restoreFocus(){if(!pendingFocus)return false;const saved=pendingFocus;pendingFocus=null;const target=document.querySelector(saved.selector);if(!target)return false;if(target.tagName!=='SELECT')target.tabIndex=-1;target.focus({preventScroll:true});window.scrollTo(0,saved.y);return true;}

  function options(list,value){return list.map(x=>`<option value="${esc(x.id)}" ${x.id===value?'selected':''}>${esc(x.label)}</option>`).join('');}
  function selectors(){
    const s=current;let list,label,value;
    if(s.entry==='initiative'){label='Iniciativa proposada per Atos';value=s.initiative;list=initiatives.map(x=>({id:x.id,label:x.title}));}
    else if(s.entry==='actor'){label='Actor';value=s.actor;list=model.roles.map(x=>({id:x.id,label:x.name}));}
    else{label='Fitxa';value=s.focus;list=cards.map(x=>({id:x.id,label:x.id+' · '+x.title}));}
    return `<div class="rel-controls"><nav class="rel-entry" aria-label="Entra al mapa per">${modeLink('initiative','Iniciativa')}${modeLink('actor','Actor')}${modeLink('card','Fitxa')}</nav><label class="rel-picker">${label}<select id="rel-entry-value">${options(list,value)}</select></label>${s.entry==='actor'?`<label class="rel-picker rel-focus-picker">Fitxes relacionades · ${s.cohort.length}<select id="rel-focus">${!s.cohort.includes(s.focus)?`<option value="${s.focus}" selected>${esc(s.focus+' · '+byId[s.focus].title)} · Fora de la selecció</option>`:''}${options(s.cohort.map(id=>({id,label:id+' · '+byId[id].title})),s.focus)}</select></label>`:''}</div>`;
  }
  function itinerary(){const s=current;if(s.entry!=='initiative')return '';return `<nav class="rel-itinerary" aria-label="Fitxes d’aquesta iniciativa">${s.cohort.map((id,i)=>`<a href="${url({focus:id,home:id})}" ${id===s.focus?'aria-current="step"':''}><span class="rel-step-code">${id}</span><span>${esc(byId[id].title)}</span></a>`).join('')}</nav>`;}
  function actorGroup(key,label){const a=fits[current.focus];return `<section class="rel-actor-group" data-rel-group="${key}"><h3>${label}</h3><div>${a[key].map(id=>`<button type="button" class="rel-actor ${current.entry==='actor'&&current.actor===id?'is-entry':''}" data-rel-actor="${id}" aria-pressed="false">${esc(roles[id].name)}</button>`).join('')}</div></section>`;}
  function cardNode(id){const mutual=byId[current.focus].dependencies.includes(id)&&byId[id].dependencies.includes(current.focus);return `<a class="rel-card-node" href="${url({focus:id})}" data-rel-connection="${id}" style="--node-color:${colors[id[0]]}"><span>${id}</span><span>${esc(byId[id].title)}${mutual?'<small>Suport recíproc</small>':''}</span><span aria-hidden="true">↗</span></a>`;}
  function connectionGroup(ids,type,title){return `<section class="rel-connections" data-rel-group="${type}"><h3>${title} <span>${ids.length}</span></h3>${ids.length?ids.slice(0,3).map(cardNode).join(''):'<p class="rel-empty">Cap relació explícita en aquest sentit.</p>'}${ids.length>3?`<details class="rel-more"><summary>Veure ${ids.length-3} ${ids.length===4?'fitxa més':'fitxes més'}</summary>${ids.slice(3).map(cardNode).join('')}</details>`:''}</section>`;}
  function platforms(){const catalog=window.ATLES_RELATION_PLATFORMS||[];return catalog.filter(p=>p.cards.some(x=>x.id===current.focus));}
  function platformStrip(){const items=platforms(),tech=byId[current.focus].technology;return `<section class="rel-platforms"><h3>${items.length?'Base corporativa relacionada':'Opcions tecnològiques de la fitxa'}</h3><div>${items.length?items.map(p=>`<button class="rel-platform" data-rel-platform="${esc(p.id)}" aria-pressed="false"><span>${esc(p.name)}</span><small>${esc(p.label)}</small></button>`).join(''):tech.map((t,i)=>`<button class="rel-platform" data-rel-tech="${i}" aria-pressed="false"><span>${esc(t.name)}</span><small>Opció d’implementació</small></button>`).join('')}</div></section>`;}
  function defaultInsight(){const c=byId[current.focus];return `<div><p class="rel-kicker">La prova del resultat</p><p>${esc(fits[c.id].evidence)}</p></div><a class="link" href="./#card/${c.id}?tab=pilot" target="atles-detail" data-rel-open>Obre el pilot ↗</a>`;}
  function render(params){
    current=parse(params);lastRoute=url();inspected=null;const s=current,c=byId[s.focus],a=fits[s.focus],outside=!s.cohort.includes(s.focus);
    const reverse=cards.filter(x=>x.dependencies.includes(c.id)).map(x=>x.id);
    const contextTitle=s.entry==='initiative'?s.group.title:s.entry==='actor'?roles[s.actor].name:'Les 34 fitxes';
    return `<div class="wrap rel-page" id="relations-root" style="--rel-color:${colors[c.id[0]]}"><div class="rel-heading"><div><p class="eyebrow">Atles O11y · Atos per al CTTI</p><h1>Mapa de relacions</h1></div><div class="rel-heading-actions"><a class="btn ghost" href="${url({projection:!s.projection})}" data-rel-project>${s.projection?'Torna a explorar':'Vista per projectar'} ${s.projection?'↙':'↗'}</a>${s.projection?'<button class="btn ghost" type="button" id="rel-fullscreen">Pantalla completa</button>':''}</div></div>${switcher('relations')}${selectors()}<div class="rel-context-line"><span>${s.entry==='initiative'?'Iniciativa Atos':s.entry==='actor'?'Actor seleccionat':'Exploració per fitxa'} · <strong>${esc(contextTitle)}</strong></span><span>${c.id}${s.entry==='initiative'&&!outside?' · '+(s.cohort.indexOf(c.id)+1)+' de '+s.cohort.length:''}</span></div>${itinerary()}${outside?`<div class="rel-outside"><span>${c.id} és una connexió fora ${s.entry==='initiative'?'d’aquest recorregut':'de la selecció d’aquest actor'}.</span><a href="${url({focus:s.home})}">Torna a ${esc(s.home)} →</a></div>`:''}<div class="rel-stage"><svg class="rel-wires" aria-hidden="true"></svg><section class="rel-focus-column"><h2>La idea i el procés</h2><div class="rel-focus-node"><span class="rel-focus-code">${c.id}</span><h3>${esc(c.title)}</h3><p>${esc(c.subtitle)}</p><div class="rel-process"><span>Procés que millora</span><a href="./#context/processes/${a.processId}" target="atles-detail" data-rel-open>${esc(processes[a.processId].name)} ↗</a></div><a class="btn primary" href="./#card/${c.id}" target="atles-detail" data-rel-open aria-label="Obre la fitxa ${c.id} en una altra pestanya">Obre la fitxa ↗</a></div><p class="rel-state">Atos proposa aquesta participació i aquestes connexions.</p></section><div class="rel-actors"><h2>Qui hi treballaria</h2>${actorGroup('coordinator','Coordina')}${actorGroup('executors','Executa i manté')}${actorGroup('validators','Valida segons abast')}</div><div class="rel-support"><h2>Com connecta amb altres idees</h2>${connectionGroup(c.dependencies,'needs','Aquesta fitxa es recolza en')}${connectionGroup(reverse,'supports','Aquestes fitxes s’hi recolzen')}</div></div>${platformStrip()}<aside class="rel-inspect" id="rel-inspect" aria-label="Detall de la selecció" aria-live="polite">${defaultInsight()}</aside><div class="rel-bottom"><p>Relacions de la proposta. No són un ordre d’implantació ni dependències tècniques comprovades.</p><a class="link" href="mapa-o11y-atos.html?v=20260917-market1" target="atles-map" rel="noopener">Mapa resum de les 34 fitxes ↗</a></div><p class="visually-hidden" id="rel-announcement" role="status">${esc(contextTitle)}. Fitxa ${c.id}: ${esc(c.title)}.</p></div>`;
  }
  function draw(){
    const stage=document.querySelector('.rel-stage'),svg=stage?.querySelector('svg'),focus=stage?.querySelector('.rel-focus-node');if(!svg||!focus)return;
    if(window.innerWidth<=900){svg.innerHTML='';return;}
    const b=stage.getBoundingClientRect(),f=focus.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${b.width} ${b.height}`);
    const path=(x1,y1,x2,y2,active,reverse=false)=>{const mid=(x1+x2)/2;return `<path d="M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}" class="${active?'is-highlighted':''}" ${reverse?'marker-start="url(#rel-arrow)"':'marker-end="url(#rel-arrow)"'}/>`;};
    let lines='';['coordinator','executors','validators'].forEach((key,i)=>{const el=stage.querySelector(`[data-rel-group="${key}"]`),r=el.getBoundingClientRect();const selected=inspected?.type==='actor'&&fits[current.focus][key].includes(inspected.id);lines+=path(r.right-b.left+6,r.top+r.height/2-b.top,f.left-b.left-9,f.top+f.height*(.25+i*.25)-b.top,selected);});
    ['needs','supports'].forEach((key,i)=>{const el=stage.querySelector(`[data-rel-group="${key}"]`);if(!el.querySelector('.rel-card-node'))return;const r=el.getBoundingClientRect();lines+=path(f.right-b.left+8,f.top+f.height*(.32+i*.4)-b.top,r.left-b.left-8,r.top+r.height/2-b.top,false,i===1);});
    svg.innerHTML='<defs><marker id="rel-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L6,3 L0,6" fill="#8093a5" stroke="none"/></marker></defs>'+lines;
  }
  function mount(){observer?.disconnect();const stage=document.querySelector('.rel-stage');if(!stage)return;observer=new ResizeObserver(draw);observer.observe(stage);stage.querySelectorAll('[data-rel-group],.rel-focus-node').forEach(el=>observer.observe(el));requestAnimationFrame(draw);}
  function inspect(type,id,button){
    const panel=document.querySelector('#rel-inspect');if(!panel)return;inspected={type,id};returnFocus=button;
    document.querySelectorAll('[data-rel-actor],[data-rel-platform],[data-rel-tech]').forEach(b=>b.setAttribute('aria-pressed',String(b===button||type==='actor'&&b.dataset.relActor===id)));
    let title,body,link,label,state,references;
    if(type==='actor'){const r=roles[id];title=r.name;body=r.role;link='./#context/actors/'+id;label='Obre el context de l’actor';state=(r.sources.some(s=>s.state==='documentat')?'Rol documentat':'Rol segons el model de servei')+' · Participació proposada per Atos';}
    else if(type==='platform'){const p=platforms().find(x=>x.id===id),edge=p.cards.find(x=>x.id===current.focus);title=p.name;body=edge.use;link='./#sources?source='+edge.sourceId;label='Consulta la base documental';state=p.label+' · Encaix proposat a '+current.focus;references=edge.references;}
    else{const t=byId[current.focus].technology[Number(id)];title=t.name;body=t.role;link='./#card/'+current.focus;label='Consulta les opcions de la fitxa';state='Opció d’implementació';}
    panel.innerHTML=`<div><p class="rel-kicker">${esc(state)}</p><h2>${esc(title)}</h2><p>${esc(body)}</p></div><div class="rel-inspect-actions">${references?references.map(r=>`<a class="link rel-source-link" href="./#sources?source=${esc(r.sourceId)}" target="atles-detail" data-rel-open>${esc(r.document)} ↗<small>${esc(r.locator)}</small></a>`).join(''):`<a class="link" href="${esc(link)}" target="atles-detail" data-rel-open>${esc(label)} ↗</a>`}<button class="btn small ghost" data-rel-close>Tanca el detall</button></div>`;draw();
  }
  document.addEventListener('change',e=>{if(!document.querySelector('#relations-root'))return;const t=e.target;if(t.id==='rel-entry-value'||t.id==='rel-focus')pendingFocus={selector:'#'+t.id,y:scrollY};if(t.id==='rel-entry-value'){
    if(current.entry==='initiative'){const group=initiatives.find(x=>x.id===t.value);location.hash=url({initiative:group.id,focus:group.cards[0],home:group.cards[0]});}
    else if(current.entry==='actor'){const id=related(t.value)[0];location.hash=url({actor:t.value,focus:id,home:id});}
    else location.hash=url({focus:t.value});
  }else if(t.id==='rel-focus')location.hash=url({focus:t.value,home:t.value});});
  document.addEventListener('click',async e=>{
    if(e.target.closest('[data-rel-connection],.rel-itinerary a,.rel-outside a'))pendingFocus={selector:'.rel-focus-node h3',y:scrollY};
    const b=e.target.closest('[data-rel-actor],[data-rel-platform],[data-rel-tech],[data-rel-close],[data-rel-open],#rel-fullscreen');if(!b)return;
    if(b.dataset.relActor)inspect('actor',b.dataset.relActor,b);else if(b.dataset.relPlatform)inspect('platform',b.dataset.relPlatform,b);else if(b.hasAttribute('data-rel-tech'))inspect('tech',b.dataset.relTech,b);
    else if(b.hasAttribute('data-rel-close')){inspected=null;document.querySelector('#rel-inspect').innerHTML=defaultInsight();document.querySelectorAll('.rel-stage [aria-pressed],.rel-platform[aria-pressed]').forEach(x=>x.setAttribute('aria-pressed','false'));returnFocus?.focus();draw();}
    else if(b.id==='rel-fullscreen'){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{b.textContent='Vista ampliada activa';}}
    else if(b.hasAttribute('data-rel-open')){if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();const u=new URL(b.href,location.href);if(u.origin!==location.origin)return;const other=window.open(u.href,'atles-detail');if(other)other.opener=null;else location.href=u.href;}
  });
  document.addEventListener('keydown',e=>{if(!document.querySelector('#relations-root')||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='Escape'&&inspected){e.preventDefault();document.querySelector('[data-rel-close]')?.click();}else if(e.key==='Escape'&&current.projection&&!document.fullscreenElement){location.hash=url({projection:false});}});
  document.addEventListener('fullscreenchange',()=>{const b=document.querySelector('#rel-fullscreen');if(b)b.textContent=document.fullscreenElement?'Surt de pantalla completa':'Pantalla completa';});
  return {render,mount,parse,switcher,related,initiatives,restoreFocus};
})();
