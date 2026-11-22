import {ArrowUpRight, ArrowLeft} from 'lucide-react';
import c from './config.json';
import portraitMap from './portraits.json';
type Person = typeof c.leadership[number];
const base = import.meta.env.BASE_URL;
const portraits: Record<string, string> = portraitMap;
const profileUrl = (p: Person) => base + 'team/' + p.slug + '/';
function Portrait({person:p, eager=false}: {person:Person; eager?:boolean}) {
  return <div className="v4-portrait">{portraits[p.slug] ? <img src={base+portraits[p.slug]} alt={p.name} loading={eager?'eager':'lazy'} decoding="async"/> : <span aria-hidden="true">{p.initials}</span>}</div>;
}

function teamTier(p:Person) {
  if (/managing partner/i.test(p.role)) return 0;
  if (/\bpartner\b/i.test(p.role)) return 1;
  if (/\bcounsel\b/i.test(p.role)) return 2;
  if (/\bdirector\b/i.test(p.role)) return 3;
  return 4;
}
export function Team(){
  const tiers=['Managing partner','Partners','Counsel','Advisory directors','Associates'];
  return <section className="cv4-directory cv7-directory"><div className="cv4-dir-heading"><p className="eyebrow">THE PEOPLE BEHIND THE ADVICE</p><h2>Our lawyers and<br/>advisory professionals.</h2><p>The team brings together legal, planning, finance and development expertise.</p></div>{tiers.map((label,i)=>{const members=c.leadership.filter(p=>teamTier(p)===i);return members.length>0&&<section className={'cv7-tier cv7-tier-'+i} key={label}><h3 className="cv7-tier-heading">{label}</h3><div className="cv4-list">{members.map(p=><a className="cv4-person" href={profileUrl(p)} key={p.slug}><Portrait person={p}/><div className="cv4-person-copy"><p className="cv4-role">{p.role}</p><h4>{p.name}</h4>{i<=1&&<p>{p.summary}</p>}<span className="cv4-link">Read biography <ArrowUpRight size={17}/></span></div></a>)}</div></section>})}</section>;
}
// V6: education prose is derived from editable profile records, with individual phrasing.
function educationProse(p:Person) {
  const clean = (value:string) => value
    .replace(/Master of Business Administration\s*\(MBA\)/gi, 'MBA')
    .replace(/Doctor of Philosophy\s*\(PhD\)/gi, 'PhD')
    .replace(/\s*\((?:NYU|UPenn|UPENN|IIMB|IIM Bangalore|ICAI|B\.Com\.?|B\.Tech\.?|M\.Tech\.?|B\.A\.?|M\.A\.?|B\.Plan\.?|M\.Stat\.?|PGDM|PGDBM|MMS|CA)\)/gi, '')
    .replace(/\s*\((?:Hons\.?|Honours|Honors)\)/gi, ' with honours')
    .replace(/\s*\(formerly University of Pune\)/gi, '')
    .replace(/\s+/g, ' ').trim();
  const qualifications = p.education.map(clean).filter(Boolean).map(value => {
    const parts = value.split(/\s+[—–-]\s+/);
    let degree = parts[0].replace(/,\s*(finance|marketing|operations) focus$/i, ' with a focus on $1')
      .replace(/^Chartered Accountancy, professional qualification$/i, 'professional qualification in Chartered Accountancy');
    if (!/^(?:a |an |the )/i.test(degree)) {
      const article = /^(?:MBA\b|M\.Tech\b|M\.A\b|M\.Stat\b|M\.Plan\b|LL\.?B\b|[aeiou])/i.test(degree) ? 'an ' : 'a ';
      degree = article + degree;
    }
    const institution = parts.slice(1).join(' — ');
    const named = /^(?:University of |Indian Institute of |Institute of |School of |Faculty of |National Law University,|Gujarat National Law University,|Hidayatullah National Law University,)/i.test(institution) ? 'the ' + institution : institution;
    return degree + (named ? ' from ' + named : '');
  });
  if (!qualifications.length) return '';
  const join = (items:string[]) => items.length < 2 ? (items[0] || '') : items.length === 2 ? items.join(' and ') : items.slice(0,-1).join('; ') + '; and ' + items[items.length-1];
  const first = p.name.trim().split(/\s+/)[0];
  const split = qualifications.map(q => q.split(' from '));
  const all = split.length > 1 && split.every(q => q.length === 2 && q[1] === split[0][1])
    ? join(split.map(q => q[0])) + ' from ' + split[0][1]
    : join(qualifications);
  const rest = join(qualifications.slice(1));
  const two = (opening:string, follow:string) => qualifications.length > 1 ? opening + qualifications[0] + '. ' + follow + rest + '.' : opening + qualifications[0] + '.';
  switch (p.slug) {
    case 'arjun-mehra': return `${first} earned ${all}.`;
    case 'nandita-rao': return two(`${first} completed `, 'She also holds ');
    case 'vikram-shah': return `His formal education includes ${all}.`;
    case 'siddharth-bansal': return qualifications.length >= 4 ? `${first} holds ${join(qualifications.slice(0,2))}. He also earned ${join(qualifications.slice(2))}.` : `${first} holds ${all}.`;
    case 'rohan-kapoor': return `${first}'s engineering education includes ${all}.`;
    case 'shreya-iyer': return two(`She graduated with `, 'She also completed ');
    case 'kabir-sethi': return two(`${first} earned `, 'He also holds ');
    case 'priya-narayanan': return `Her training in statistics includes ${all}.`;
    case 'dev-malhotra': return `${first}'s technical background is supported by ${all}.`;
    case 'tara-khanna': return two(`${first} holds `, 'She also earned ');
    case 'ananya-menon': return `She pursued her economics education through ${all}.`;
    case 'aditi-malhotra': return `${first}'s academic background spans law, management and economics. She holds ${all.replace('with honours', '(Hons.)').replace('the National Law University', 'National Law University').replace(/;/g, ',')}.`;
    case 'dhruv-sinha': return `He graduated with ${all}.`;
    case 'kavya-rotta': case 'kavya-rao': return `${first}'s legal training includes ${all}.`;
    case 'raghav-menon': return `${first} completed ${all}.`;
    case 'naina-kapoor': return `She holds ${all}.`;
    case 'armaan-sharoon': case 'armaan-shah': return `His legal education includes ${all}.`;
    case 'meera-iyer': return `Her planning education comprises ${all}.`;
    case 'anuradha-desai': return two(`${first} graduated with `, 'She also earned ');
    case 'vikram-bhatia': return `He pursued his engineering studies through ${all}.`;
    default: return `${first} holds ${all}.`;
  }
}
function Biography({person:p}:{person:Person}) {
  const bio = p.bio
    .replace('He also holds an MBA from New York University (NYU) and a PhD in Finance from Boston University.', '')
    .replace('She also holds an MBA from the Indian Institute of Management Bangalore (IIMB) and a PhD in Economics from the University of Pennsylvania (UPenn).', '')
    .replace('He also holds an MBA from New York University and a PhD in Finance from Boston University.', '')
    .replace('She also holds an MBA from the Indian Institute of Management Bangalore and a PhD in Economics from the University of Pennsylvania.', '')
    .trim();
  const education = educationProse(p);
  return <div className="v5-biography">{bio && <p>{bio}</p>}{education && <p>{education}</p>}</div>;
}
export function Profile({person:p}:{person:Person}){return <article className="cv4-profile cv5-profile"><div className="cv4-top"><a className="v4-back" href={base+'team/'}><ArrowLeft size={16}/> Our people</a></div><section className="cv4-intro cv5-intro"><Portrait person={p} eager/><div className="cv4-intro-copy"><h1>{p.name}</h1><p className="cv4-role">{p.role}</p><div className="cv4-rule"/><p className="cv4-summary">{p.summary}</p><Biography person={p}/></div></section><div className="cv4-bottom"><a className="v4-back" href={base+'team/'}><ArrowLeft size={16}/> All people</a><a className="v4-back" href={base+'contact/'}>Contact the firm <ArrowUpRight size={17}/></a></div></article>}
