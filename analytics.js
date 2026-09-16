/* The public Website ID is configured only after the site's tracking snippet is provided. */
window.ATLES_ANALYTICS_CONFIG={websiteId:'c5eed7b4-95ba-414f-b02d-f2c11f8a60e3',scriptUrl:'https://cloud.umami.is/script.js'};
window.AtlesAnalytics=(()=>{
  'use strict';
  const cfg=window.ATLES_ANALYTICS_CONFIG;
  const key='atles-analytics-excluded';
  const configured=()=>/^[0-9a-f-]{36}$/i.test(cfg.websiteId)&&/^https:\/\//.test(cfg.scriptUrl);
  const excluded=()=>{try{return localStorage.getItem(key)==='1'}catch{return true}};
  const allowed=()=>configured()&&location.hostname==='mavillier.github.io'&&!excluded()&&navigator.doNotTrack!=='1'&&!navigator.globalPrivacyControl;
  function route(){
    if(location.pathname.endsWith('mapa-o11y-atos.html'))return 'mapa';
    const h=location.hash.slice(1).split('?')[0];
    const parts=h.split('/');
    if(parts[0]==='relations'){const focus=new URLSearchParams(location.hash.split('?')[1]||'').get('focus');return 'relations'+(window.ATLES_DATA?.cards.some(c=>c.id===focus)?'/'+focus:'');}
    if(parts[0]==='context'&&['actors','processes','coverage','guide','architecture'].includes(parts[1])){
      const known=parts[1]==='actors'?window.ATLES_MODEL?.roles:parts[1]==='processes'?window.ATLES_MODEL?.processes:[];
      return 'context/'+parts[1]+(parts[2]&&known?.some(x=>x.id===parts[2])?'/'+parts[2]:'');
    }
    return /^(home|atlas(?:\/[A-G])?|architecture|sources|selection|about|scope|guide|(?:card|meeting)\/[A-G][1-8])$/.test(h)?h:'home';
  }
  const path=()=>route()==='mapa'?'/o11y-atos-ctti/mapa-o11y-atos.html':'/o11y-atos-ctti/#'+route();
  const title=()=>route()==='mapa'?'MapaO11yAtos':'Atles O11y · '+route();
  window.atlesBeforeSend=(type,payload)=>{
    if(!allowed()||type!=='event')return false;
    // Allowlisted routes and properties only. Notes, scores, searches and query parameters never leave the browser.
    let ref='';try{const u=new URL(document.referrer);if(u.origin!==location.origin)ref=u.origin}catch{}
    return {...payload,url:path(),title:title(),referrer:ref};
  };
  function event(name,data={}){if(!allowed()||!window.umami)return;try{Promise.resolve(window.umami.track(name,data)).catch(()=>{})}catch{}}
  let last='';
  function page(){if(!allowed()||!window.umami)return;const r=route();if(r===last)return;last=r;try{Promise.resolve(window.umami.track(p=>({...p,url:path(),title:title()}))).catch(()=>{})}catch{}}
  function load(){
    if(!allowed()||document.querySelector('#atles-umami'))return;
    const script=document.createElement('script');script.id='atles-umami';script.src=cfg.scriptUrl;script.defer=true;
    for(const [k,v] of Object.entries({'website-id':cfg.websiteId,'auto-track':'false','domains':'mavillier.github.io','exclude-search':'true','do-not-track':'true','before-send':'atlesBeforeSend'}))script.setAttribute('data-'+k,v);
    script.onload=page;document.head.append(script);
  }
  function optout(){try{localStorage.setItem(key,excluded()?'0':'1')}catch{}last='';load();return excluded()}
  document.addEventListener('click',e=>{
    const el=e.target.closest('a,button,[data-action]');if(!el)return;
    const a=el.dataset.action;
    if(['export-brief','export-session'].includes(a))event(a==='export-brief'?'exporta_proposta':'exporta_sessio');
    if(el.dataset.tab&&['idea','pilot','evidence','tender','session'].includes(el.dataset.tab))event('consulta_apartat',{fitxa:route().split('/')[1]||'',apartat:el.dataset.tab});
    if(el.dataset.filter&&/^(all|[A-G])$/.test(el.dataset.filter))event('filtra_ambit',{ambit:el.dataset.filter});
    if(el.dataset.copy)event('copia_proposta',{fitxa:el.dataset.copy});
    if(el.id==='fullscreen'||el.id==='rel-fullscreen')event('pantalla_completa');
    if(el.hasAttribute('data-rel-project'))event('projecta_relacions');
    if(el.tagName!=='A')return;
    try{const u=new URL(el.href,location.href);
      if(/Atles_O11y_CTTI_v[23]\.pdf$/.test(u.pathname))event('descarrega_pdf');
      else if(u.pathname.endsWith('mapa-o11y-atos.html'))event('obre_mapa');
      else if(u.protocol==='https:'&&u.hostname!==location.hostname)event('consulta_font',{domini:u.hostname});
    }catch{}
  });
  window.addEventListener('hashchange',page);load();
  return {event,page,configured,excluded,optout};
})();
