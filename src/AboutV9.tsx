import VisualStoryV20 from './VisualStoryV20';
import {PortraitLink} from './PortraitV19';
import {ArrowUpRight} from 'lucide-react';
import c from './config.json';
import './about-v9.css';
const base = import.meta.env.BASE_URL;
const url = (path:string) => base+path+'/';
export default function AboutV9(){
  const lead = c.leadership.find(p=>p.slug==='aditi-malhotra');
  return <article className="c9-about">
    <header className="c9-header"><a className="c9-breadcrumb" href={base}>Civiloris / The firm</a><h1>Real estate and<br/>regulatory law.</h1><p>{c.intro}</p></header>
    <figure className="c9-architecture"><img src={base+'images/noida-residential-v17.webp'} alt="Residential architecture in Noida" decoding="async" fetchPriority="high"/><figcaption>Residential architecture, Noida</figcaption></figure>
    <section className="c9-narrative"><p className="c9-label">Our practice</p><div><p className="c9-lead">A property decision is rarely a legal question in isolation.</p><p>It involves the history of the land, the rights and obligations of the parties, the regulatory framework and the commercial objectives of the transaction or development. These elements inform the legal analysis and the available options.</p><p>Our practice encompasses real estate transactions, development agreements, title and property due diligence, regulatory matters, planning law and dispute resolution. Where a matter requires a broader perspective, legal analysis can be considered alongside planning, real estate finance and development expertise.</p></div></section>
    <VisualStoryV20 route="about"/><section className="c9-method"><div className="n19-method-text"><p className="n19-method-label">The approach</p><h2>Documents.<br/>Rights.<br/>Decisions.</h2></div><div className="c9-method-copy"><p className="c9-label">How we work</p><h2>Start with the facts.<br/>Clarify the choices.</h2><div><h3>Understand the matter</h3><p>Identify the property, relevant documents, parties and questions that need to be resolved.</p></div><div><h3>Examine the legal framework</h3><p>Consider title, contractual obligations, planning controls and applicable statutory requirements together.</p></div><div><h3>Make the analysis usable</h3><p>Distinguish established facts from unresolved issues and explain the legal position and available next steps.</p></div></div></section>
    <section className="c9-index"><div><p className="c9-label">Expertise</p><h2>Across the property lifecycle.</h2></div><div>{c.services.map(s=><a href={url(s.slug)} key={s.slug}>{s.title}<ArrowUpRight size={19}/></a>)}</div></section>
    <section className="c9-people"><p className="c9-label">Our people</p><div><h2>Legal and advisory professionals.</h2><p>Explore the backgrounds of our lawyers and advisory professionals, whose areas of focus include property law, planning, development and finance.</p>{lead&&<PortraitLink person={lead} className="n19-people-lead"/>}<a className="c9-link" href={url('team')}>Our people <ArrowUpRight size={17}/></a></div></section>
    <section className="c9-end"><h2>Correspondence</h2><a className="c9-link" href={url('contact')}>Contact Civiloris <ArrowUpRight size={18}/></a></section>
  </article>;
}
