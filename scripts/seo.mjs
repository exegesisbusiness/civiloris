// V16 — route-specific metadata, safe preview builds and canonical production URLs.
import fs from 'node:fs';
import path from 'node:path';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const c=read('src/config.json'), a=c.key==='norvelian';
const expertise=read('src/expertise-v13.json'), published=read('src/published-insights.json');
const routes=new Map();
function add(p,t,d){if(p!==''&&!/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(p))throw Error('Invalid route: '+p);routes.set(p,[String(t),String(d||c.intro)]);}
add('','Home',c.intro);add('about',a?'Our firm':'The firm',c.intro);add('team','Our people',`Meet the professionals at ${c.name}.`);
for(const p of c.leadership)add('team/'+p.slug,p.name,`${p.name} — ${p.role} at ${c.name}.`);
if(!a)add('services','Our practice',c.intro);
for(const s of c.services)add(s.slug,s.title,s.description);
if(a){add('portfolio','Portfolio','Norvelian’s real estate investment sectors and asset perspectives.');add('investor-relations','Investor relations','Institutional and strategic partnership enquiries.');}
for(const [p,d] of Object.entries(expertise.pages))add(p,d.title,d.intro);
add('insights',a?'Insights':'Perspectives',a?'Perspectives on real estate investment and asset stewardship.':'Perspectives on property law, regulation and development.');
for(const item of published.articles)add('insights/'+item.slug,item.title,item.summary);
add('careers','Careers',`Career information at ${c.name}.`);add('contact','Contact',`Office and correspondence details for ${c.name}.`);add('privacy','Privacy Policy',`Information handling and website privacy at ${c.name}.`);add('disclaimer','Disclaimer',`Website information and professional scope at ${c.name}.`);
const raw=(process.env.SITE_URL||c.siteUrl||'').trim();let origin=''; // Production indexing requires explicit SITE_URL at build time.
if(raw){let u;try{u=new URL(raw)}catch{throw Error('Invalid SITE_URL');}const host=u.hostname.toLowerCase();const reserved=host==='localhost'||host.endsWith('.localhost')||/\.(example|invalid|test|local)$/.test(host)||/^example\.(com|net|org)$/.test(host)||!host.includes('.')||/^\d+\.\d+\.\d+\.\d+$/.test(host)||host.includes(':');if(!reserved){if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)throw Error('SITE_URL must be a public HTTPS website URL without credentials, queries or fragments');const base=process.env.VITE_BASE_PATH||'/';if(!base.startsWith('/')||!base.endsWith('/')||u.pathname.replace(/\/$/,'')!==base.replace(/\/$/,''))throw Error('SITE_URL path must match VITE_BASE_PATH');origin=u.href.replace(/\/$/,'');}}
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const shell=fs.readFileSync('dist/index.html','utf8');if(!/<title>.*?<\/title>/s.test(shell))throw Error('Missing HTML title');
const url=p=>origin+'/'+(p?p+'/':'');
function html(p,t,d,notFound=false){const title=t+' | '+c.name;const canonical=origin&&!notFound?`<link rel="canonical" href="${esc(url(p))}"/><meta property="og:url" content="${esc(url(p))}"/><meta property="og:image" content="${esc(origin+'/social.svg')}"/>`:'';return shell.replace(/<title>.*?<\/title>/s,`<title>${esc(title)}</title><meta name="description" content="${esc(d)}"/><meta name="robots" content="${origin&&!notFound?'index,follow':'noindex,follow'}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(d)}"/><meta property="og:type" content="${p.startsWith('insights/')?'article':'website'}"/>${canonical}<meta name="twitter:card" content="summary_large_image"/>`);}
for(const [p,[t,d]] of routes){const file=path.join('dist',p,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html(p,t,d));}
fs.writeFileSync('dist/404.html',html('404','Page not found','The requested page could not be found.',true));
// Keep previously supported aliases only where the app explicitly recognizes them.
const main=fs.readFileSync('src/main.tsx','utf8');for(const [old,target] of (a?[['team/meera-iyer','team/shreya-iyer']]:[['team/ananya-desai','team/anuradha-desai']])){if(routes.has(old)||!routes.has(target)||!main.includes("route==='"+old+"'"))continue;const [t,d]=routes.get(target);const aliasHtml=html(target,t,d).replace('content="index,follow"','content="noindex,follow"');const f=path.join('dist',old,'index.html');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,aliasHtml);}
if(origin){fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...routes.keys()].map(p=>`<url><loc>${esc(url(p))}</loc></url>`).join('')+'</urlset>');}else fs.rmSync('dist/sitemap.xml',{force:true});
fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\n'+(origin?`Sitemap: ${origin}/sitemap.xml\n`:''));fs.writeFileSync('dist/.nojekyll','');
console.log(`V16 SEO: ${routes.size} routes; ${origin?'production '+origin:'preview (noindex; no sitemap)'}`);
