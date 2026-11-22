import {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import c from './config.json';
import raw from './published-insights.json';
import './insights-v14.css';
type Article={slug:string;title:string;category:string;summary:string;related:string[];sections:{title:string;body:string}[];date:string;authorSlug?:string};
const articles=(raw.articles as Article[]).slice().sort((a,b)=>b.date.localeCompare(a.date));
const themes=raw.themes;
const base=import.meta.env.BASE_URL;
const href=(p:string)=>base+p+'/';
const isA=c.key==='avenor';
const label=isA?'Insights':'Perspectives';
export const hasInsights=(route:string)=>route==='insights'||articles.some(a=>route==='insights/'+a.slug);
const formatDate=(s:string)=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(s+'T00:00:00Z'));
function Entry({item}:{item:Article}){return <a className="ins-entry" href={href('insights/'+item.slug)}><div><p className="ins-kicker">{item.category} · {formatDate(item.date)}</p><h2>{item.title}</h2><p>{item.summary}</p></div><ArrowUpRight aria-hidden="true" size={22}/></a>}
function Themes(){return <section className="ins-themes"><h2>{isA?'Areas of inquiry':'Themes of our work'}</h2><div>{themes.map(t=><a key={t.path} href={href(t.path)}><h3>{t.title}<ArrowUpRight aria-hidden="true" size={18}/></h3><p>{t.description}</p></a>)}</div></section>}
function Listing(){const [category,setCategory]=useState('All');const cats=['All',...Array.from(new Set(articles.map(a=>a.category)))];const selected=articles.filter(a=>category==='All'||a.category===category);return <><section className="ins-mast"><p className="ins-kicker">{label}</p><h1>{isA?'Perspectives on real assets.':'Property law and regulation.'}</h1><p>{isA?'Investment thinking, property economics and the discipline of ownership.':'Commentary on property transactions, development agreements, land use and regulatory matters.'}</p></section>{articles.length>0&&<section className="ins-list"><div className="ins-controls" aria-label="Filter articles">{cats.map(k=><button key={k} type="button" aria-pressed={k===category} onClick={()=>setCategory(k)}>{k}</button>)}</div>{selected.map(item=><Entry key={item.slug} item={item}/>)}</section>}<Themes/></>}
function Detail({item}:{item:Article}){const author=c.leadership.find(p=>p.slug===item.authorSlug);return <><section className="ins-mast ins-article-head"><a href={href('insights')}>← {label}</a><p className="ins-kicker">{item.category} · {formatDate(item.date)}</p><h1>{item.title}</h1><p>{item.summary}</p>{author&&<a className="ins-author" href={href('team/'+author.slug)}>{author.name} · {author.role}</a>}</section><div className="ins-reading">{item.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.body}</p></section>)}<section className="ins-related"><h2>{isA?'Related investment expertise':'Related practice areas'}</h2>{item.related.map(p=><a key={p} href={href(p)}>{c.services.find(s=>s.slug===p)?.title||p.split('/').pop()?.replace(/-/g,' ')} <ArrowUpRight aria-hidden="true" size={16}/></a>)}</section><a href={href('insights')}>← All {label.toLowerCase()}</a></div></>}
export default function Insights({route}:{route:string}){const item=articles.find(a=>route==='insights/'+a.slug);return <article className={'ins-v14 '+(isA?'ins-a':'ins-c')}>{item?<Detail item={item}/>:<Listing/>}</article>}
