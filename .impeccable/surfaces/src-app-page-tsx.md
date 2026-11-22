---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

## Scope and visitor mode

Experience. Whole public homepage (`/`) composed of Hero/Profile, About (new), Skills, Experience, Projects, Applied AI (new, carved from existing Projects/Experience data), Honors, Contact — plus the existing `/projects/[slug]` case-study detail route, which inherits this world. Audience: recruiters/hiring managers and founder/client prospects, equally weighted, deciding whether this person ships real production AI + full-stack work.

## Direction contract

THESIS: The site reads as an engineer's production dossier — case files and a verifiable ledger of shipped full-stack + applied-AI work — never as a SaaS-marketing landing page. It explicitly refuses the violet/fuchsia glow-and-glass bento grid the current implementation (and most AI-generated portfolios) converge on: radial blur orbs behind every section, identical `corner-frame` glass cards repeated for skills/honors/education/experience, gradient-clipped headline text, and infinite micro-bob/rotate loops on every icon.

OWN-WORLD: Deep charcoal ground (near-black with a cool-neutral undertone, not pure #000 and not the incumbent's violet-tinted near-black), one emerald accent (a single precise hex carrying 10-20% of a view — underlines, rules, the one CTA, numerals — never a glow or drop-shadow halo). Hairline 1px borders replace blurred glass panels; no backdrop-blur, no repeated corner-bracket motif, no radial gradient hover-glow copy-pasted across every card. Editorial display face for headlines paired with a quiet grotesk for body/UI text (not a template default — see craft-floor for face selection discipline); type carries hierarchy through scale/weight/tracking, never through a gradient clip. Grids are asymmetric and vary per section (ledger/index rows, split columns, offset case-study blocks) rather than one repeated symmetric card grid reused for every data type. Motion is a single restrained reveal-once grammar (fade/rise on scroll) with `prefers-reduced-motion` respected; no infinite floating, bobbing, or rotating idle animations.

STORY: A first-time visitor understands within seconds, from the hero alone, that this is a full-stack engineer who ships production AI/LLM features (RAG, agentic workflows), not demos. They believe it because the proof is specific and real: current-role language about architecting RAG pipelines (Funavry Technologies), named shipped projects (TalentedXpert, WA-Construct AI, Teachlytics, AgriTech) with their real stack, and existing metrics already in the data (e.g. the 2.4→3.4 app-store rating lift, the 30% productivity figure) — never invented numbers. They act via one unambiguous primary path (view case studies / get in touch) that stays reachable without competing CTAs.

FIRST VIEWPORT: Asymmetric split, not a centered hero. Upper-left ~two-thirds: an editorial-scale headline stating name + the one-sentence positioning (full-stack engineer who ships production AI features), set in the display face at a scale that dominates the fold. Lower-right or a adjoining narrow column: a compact "ledger" proof strip — 2-3 real facts pulled from existing data (current role/company, one flagship AI project name, years/roles count) — set as small-caps labels over hairline-divided rows, not stat-tile cards. Portrait photo, if kept, is small, cropped, and secondary (e.g. a duotone or desaturated treatment matching the charcoal/emerald world), never the large glowing centerpiece the incumbent hero uses. One primary CTA only, placed with clear hierarchy; the theme toggle and nav stay quiet utilities, not competing visual weight.

FORM: seed: none (pinned) — "Premium dark editorial aesthetic. Deep charcoal backgrounds. Emerald green as the primary accent. Sophisticated typography and whitespace. Strong visual hierarchy. Asymmetric layouts where appropriate. Subtle gradients and restrained visual effects. Consistent spacing, borders, radii and shadows." Avoid list pinned alongside it: "generic AI-generated portfolio designs; excessive glowing effects; too many gradient backgrounds; repetitive cards everywhere; unnecessary animations; overloaded hero sections; fake statistics and invented achievements."

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Audience, job, action, proof, constraints

Audience: technical recruiters/hiring managers and founders/clients, equally weighted (confirmed in PRODUCT.md). Job: decide whether to contact/shortlist this engineer. Action: view a project case study, download CV, or send a message. Proof: real CMS-backed project/experience/honor data only — see PRODUCT.md Evidence on Hand; no fabricated stats or testimonials. Constraints: must keep reading from existing hooks/API (`useProjects`, `useExperience`, etc.) and the admin-editable data model; Applied AI section must be assembled from data that already states real AI/RAG/agent work (TalentedXpert, WA-Construct AI, Teachlytics, AgriTech, Funavry Technologies role) rather than a new unbacked taxonomy value; respect `prefers-reduced-motion`; preserve all working functionality (contact form, theme toggle, nav, project detail routing, SEO/JSON-LD/sitemap).

## Chosen direction and memorable moment

Dark editorial dossier: asymmetric hero pairing an oversized identity statement with a factual ledger strip; project case studies presented as numbered dossier entries with real metrics in hairline-divided rows instead of glowing glass cards; a dedicated Applied AI section surfacing the four real AI projects/role as a distinct "specialization" ledger, visually related to but distinct from the general Projects section. The memorable moment: the hero's ledger strip — plain, confident, unglamorous proof instead of a gradient hero graphic — is what a visitor would describe an hour later.

## Unresolved decisions

- Exact emerald hex and charcoal ground value (to be fixed during build against contrast/accessibility checks, within the pinned "deep charcoal + emerald" constraint).
- Display/body typeface pairing (to be chosen at build time per craft-floor's anti-template-default discipline, consistent with "sophisticated typography").
- Whether the Applied AI section is a new homepage section or a filtered view/anchor within the existing Projects section — recommend a distinct section per the user's Phase 3 brief, pending approval.
- Two real data-quality issues surfaced during audit that the redesign should NOT silently paper over: `Project.category` typo "Web Developement" on the CDA Citizen Portal project, and a duplicate "JavaScript" skill entry under both "Frontend" and "Languages". Flagged for the user to fix in the CMS; not invented away in the UI.
