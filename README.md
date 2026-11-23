# Civiloris website

Independent React + TypeScript + Vite project with Tailwind CSS and Lucide icons. The local Noida photograph is illustrative (see IMAGE-CREDITS.md); fonts load from Google Fonts. No analytics, credentials, tracking or document storage are included.

## Local development

Use Node 20.19+ or 22 LTS. Run `npm ci`, then `npm run dev`. Build with `npm run build`; inspect the result with `npm run preview`. The build type-checks source and emits individual HTML entrypoints with route metadata, sitemap.xml, robots.txt and a custom 404.html. Page bodies render with React; this is not full server-side rendering.

## Editing

Edit `src/config.json` for identity, contact details, services, client-approved leadership records, jurisdiction fields and canonical site URL. Page content and reusable components live in `src/main.tsx`; brand styling in `src/style.css`. The two sites have no runtime dependency on each other. Verify name approval, incorporation, CIN, address and all professional claims before launch. Have privacy and disclaimer content reviewed for the final client configuration. Insights are labelled sample topics; no holdings, achievements or regulatory amendments are invented.

## Enquiry delivery

With an empty `formEndpoint` and `email`, validation works but nothing is sent. Configuring only `email` opens a mailto draft; this is not delivery confirmation. For secure delivery configure an HTTPS endpoint that accepts JSON POST, returns 2xx only after accepting the message, validates and rate-limits server-side, implements spam protection and permits this origin via CORS. Store mail/API credentials only on the backend. Publish the actual processor, retention period and privacy contact before collection. Test success and failure responses against your chosen service. Document upload is deliberately unavailable until authenticated storage, access control, malware scanning and retention are implemented.

## GitHub Pages

Create a separate GitHub repository named `civiloris-website`; add these files and push to main. Under Settings → Pages choose GitHub Actions. The supplied workflow builds and deploys the `dist` artifact. For repository hosting set repository variables `VITE_BASE_PATH` to `/civiloris-website/` and `SITE_URL` to `https://YOUR-ACCOUNT.github.io/civiloris-website`. For root-domain hosting set `VITE_BASE_PATH` to `/`. GitHub Pages serves the generated directory entrypoints, including direct deep links. Never commit secrets or node_modules.

## Custom domain and HTTPS

Purchase a domain separately. Set the custom hostname in GitHub Pages settings, then use the exact current DNS records GitHub provides: normally a CNAME for a subdomain and supported apex records for the root. Verify the domain as instructed by GitHub and enable Enforce HTTPS after certificate issuance. Set `SITE_URL` to the final HTTPS origin and rebuild. Add `public/CNAME` containing the verified hostname for your GitHub Pages deployment if required. Do not point DNS at the private Sites preview. No domain purchase or DNS change has been made.

## Publishing checks

Verify every company claim and contact detail; review privacy text and third-party image/font use; replace or approve imagery; configure and test delivery; test keyboard and mobile navigation; confirm final canonical origin and social artwork. Replace the SVG social image with a branded 1200×630 PNG for broad social platform support. Portals, admin features, WhatsApp and secure uploads are future scope and have no fabricated functionality.

## People directory

Publish individual biographies only after client approval. The team directory and individual profiles are enabled for local review. Confirm that all biographical details and credentials are accurate before deployment.
