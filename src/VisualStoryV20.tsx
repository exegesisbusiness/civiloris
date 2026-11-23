import './visual-story-v20.css';

type Graphic = {
  label: string;
  title: string;
  desc: string;
  terms: string[];
  photo?: string;
  alt?: string;
};
const graphics: Record<string, Graphic> = {
  "about": {
    "label": "THE PRACTICE",
    "title": "The property, the documents, the decision",
    "desc": "Legal work begins with the rights, records and circumstances of a place.",
    "terms": [
      "Property",
      "Documentation",
      "Framework"
    ],
    "photo": "c1",
    "alt": "Illustrative architectural image of a modern institutional building with a yellow entrance; not Civiloris's office"
  },
  "services": {
    "label": "AREAS OF COUNSEL",
    "title": "Property and law intersect",
    "desc": "Rights, agreements and regulation each shape the options available.",
    "terms": [
      "Title",
      "Agreements",
      "Regulation"
    ]
  },
  "zoning-land-use": {
    "label": "TRANSACTIONS",
    "title": "The legal anatomy of a transaction",
    "desc": "Documents, parties and conditions need to agree before completion.",
    "terms": [
      "Parties",
      "Agreement",
      "Completion"
    ],
    "photo": "c2",
    "alt": "Illustrative aerial image of streets, buildings and an open urban parcel"
  },
  "development-feasibility": {
    "label": "DEVELOPMENT & JOINT VENTURES",
    "title": "A development agreement is a system of obligations",
    "desc": "Different parties, shared land and sequenced responsibilities.",
    "terms": [
      "Land rights",
      "Commitments",
      "Delivery"
    ],
    "photo": "c3",
    "alt": "Illustrative image contrasting an older stone facade with modern glass architecture"
  },
  "regulatory-approvals": {
    "label": "REGULATORY MATTERS",
    "title": "A regulatory pathway",
    "desc": "Requirements, documents and procedural decisions are connected.",
    "terms": [
      "Requirements",
      "Filings",
      "Response"
    ]
  },
  "building-regulations": {
    "label": "LAND USE & PLANNING",
    "title": "Read the site in its regulatory setting",
    "desc": "Permissible use depends on the site and the applicable controls.",
    "terms": [
      "Parcel",
      "Zoning",
      "Development"
    ],
    "photo": "c2",
    "alt": "Closer editorial crop of an illustrative aerial urban neighborhood and open site"
  },
  "land-due-diligence": {
    "label": "TITLE & DUE DILIGENCE",
    "title": "Follow the chain of title",
    "desc": "Rights and encumbrances emerge through the history of documents.",
    "terms": [
      "Ownership",
      "Records",
      "Interests"
    ]
  },
  "urban-planning": {
    "label": "DISPUTE RESOLUTION",
    "title": "Understand the dispute before the response",
    "desc": "Facts, obligations and options for resolution should be distinguished.",
    "terms": [
      "Evidence",
      "Obligations",
      "Options"
    ]
  },
  "experience": {
    "label": "PROFESSIONAL SCOPE",
    "title": "The scope of property counsel",
    "desc": "Different matters call for different combinations of legal analysis.",
    "terms": [
      "Review",
      "Advice",
      "Action"
    ],
    "photo": "c4",
    "alt": "Illustrative contemporary architectural interior with natural light and a yellow wall"
  }
};
const photos: Record<string, string> = {
  "c1": "civiloris-c1-784e7bf19235.jpg",
  "c2": "civiloris-c2-75f5e82b54b2.jpg",
  "c3": "civiloris-c3-c6d2675549b2.jpg",
  "c4": "civiloris-c4-4b24b481d780.jpg"
};
const base = import.meta.env.BASE_URL;

export default function VisualStoryV20({route}:{route:string}) {
  const g = graphics[route];
  if (!g) return null;
  const photoFile = g.photo ? photos[g.photo] : undefined;
  return <section className={`v20-story v20-c v21-c v21-c--${route}`} aria-label={`${g.label.toLowerCase()} — Civiloris editorial section`}>
    <div className="v21-c-copy">
      <p className="v21-c-kicker">{g.label}</p>
      <h2>{g.title}</h2>
      <p>{g.desc}</p>
    </div>
    {photoFile ? (
      <figure className="v21-c-photo">
        <img src={base + 'images/editorial-v21/' + photoFile}
             alt={g.alt || ''} loading="lazy" decoding="async" />
      </figure>
    ) : (
      <div className="v21-c-structure" aria-label="Key considerations">
        <p className="v21-c-structure-caption">Key considerations</p>
        <ol className="v21-c-structure-list">
          {g.terms.map((term, index) => (
            <li key={term}>
              <span className="v21-c-count">{String(index + 1).padStart(2, '0')}</span>
              <span className="v21-c-term">{term}</span>
            </li>
          ))}
        </ol>
      </div>
    )}
  </section>;
}
