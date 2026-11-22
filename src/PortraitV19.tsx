import c from './config.json';
import portraitMap from './portraits.json';
type Person=typeof c.leadership[number];
const portraits:Record<string,string>=portraitMap;
const base=import.meta.env.BASE_URL;
export function PortraitImage({person:p}:{person:Person}){return portraits[p.slug]?<img src={base+portraits[p.slug]} alt="" loading="lazy" decoding="async"/>:<span className="n19-portrait-fallback" aria-hidden="true">{p.initials}</span>}
export function PortraitLink({person:p,className=''}:{person:Person;className?:string}){return <a className={'n19-portrait '+className} href={base+'team/'+p.slug+'/'}><PortraitImage person={p}/><span><strong className="n19-profile-name">{p.name}</strong><span className="n19-profile-role">{p.role}</span></span></a>}
