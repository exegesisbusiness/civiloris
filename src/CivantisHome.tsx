import {ArrowUpRight, ArrowRight} from 'lucide-react';
import c from './config.json';
import './home-v8.css';
const base = import.meta.env.BASE_URL;
const link = (s:string) => base+s+'/';
export default function CivantisHome(){
  const lead = c.leadership.find(p=>p.slug==='aditi-malhotra');
  const partners = c.leadership.filter(p=>p.slug!=='aditi-malhotra' && /\bpartner\b/i.test(p.role));
  return <div className="v8-civantis">
    <section className="cv8-opening" aria-labelledby="cv8-title">
      <figure className="cv8-hero-photo"><img src={base+'images/courtyard-v17.webp'} alt="Sandstone colonnade and courtyard, an architectural concept" fetchPriority="high" decoding="async"/><figcaption>Architectural concept</figcaption></figure>
      <p className="cv8-side">Real estate &amp;<br/>regulatory law</p>
      <div className="cv8-opening-copy"><h1 id="cv8-title">Property is complex.<br/>Counsel should<br className="cv8-wide-break"/> be clear.</h1><p>{c.intro}</p><a className="cv8-link" href={link('services')}>Explore our practice <ArrowUpRight size={20}/></a></div>
    </section>
    <section className="cv8-intro" aria-labelledby="cv8-intro-title"><p className="cv8-label">The firm</p><div><h2 id="cv8-intro-title">Real estate and regulatory law.</h2><p>Property matters bring together ownership, agreements, statutory requirements and commercial objectives. We examine these relationships to help clients understand the legal position and the decisions ahead.</p><a className="cv8-link" href={link('about')}>About Civantis <ArrowRight size={18}/></a></div></section>
    <section className="cv8-practice" aria-labelledby="cv8-practice-title"><div><p className="cv8-label">Expertise</p><h2 id="cv8-practice-title">Areas of practice</h2><p>From transaction documentation to regulatory matters and property disputes.</p></div><div className="cv8-practice-list">{c.services.map(s=><a key={s.slug} href={link(s.slug)}><div><h3>{s.title}</h3><p>{s.description}</p></div><ArrowUpRight size={22}/></a>)}</div></section>
    <figure className="cv8-city"><img src={base+'images/noida-residential-v17.webp'} alt="Residential buildings in Noida" loading="lazy" decoding="async"/><figcaption>Residential architecture, Noida</figcaption></figure>
    <section className="cv8-context" aria-labelledby="cv8-context-title"><p className="cv8-label">Our approach</p><div><h2 id="cv8-context-title">Documents, rights and obligations.</h2><p>Our analysis considers the relevant agreements, statutory requirements and development constraints, alongside the commercial objectives of the parties.</p><a className="cv8-link" href={link('about')}>Discover our approach <ArrowUpRight size={18}/></a></div></section>
    <section className="cv8-people" aria-labelledby="cv8-people-title"><div><p className="cv8-label">Our people</p><h2 id="cv8-people-title">Our partners.</h2><p>Meet the partners and explore the legal and advisory backgrounds of the wider team.</p><a className="cv8-link" href={link('team')}>Meet our people <ArrowUpRight size={18}/></a></div><div className="cv8-partners">{[...(lead?[lead]:[]),...partners].map(p=><a href={link('team/'+p.slug)} key={p.slug}><div><h3>{p.name}</h3><p>{p.role}</p></div><ArrowUpRight size={19}/></a>)}</div></section>
    <section className="cv8-contact"><h2>Discuss your matter.</h2><a className="cv8-link" href={link('contact')}>Contact Civantis <ArrowUpRight size={20}/></a></section>
  </div>;
}
