export interface StepNav {
  prevLabel?: string;
  prevStep?: number;
  nextLabel?: string;
  nextStep?: number;
  backToWork?: boolean;
}

export interface CalloutBlock {
  type: 'callout';
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  html: string;
}

export interface InsightItem {
  strong?: string;
  text: string;
}

export interface InsightListBlock {
  type: 'insightList';
  items: InsightItem[];
}

export interface OutcomeItem {
  stat: string;
  label: string;
}

export interface OutcomeGridBlock {
  type: 'outcomeGrid';
  items: OutcomeItem[];
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  position?: string;       // CSS object-position, e.g. "center 30%"
  aspectRatio?: string;    // CSS aspect-ratio, e.g. "16 / 10"
}

export type ContentBlock =
  | CalloutBlock
  | ParagraphBlock
  | InsightListBlock
  | OutcomeGridBlock
  | ImageBlock;

export interface Step {
  number: string;
  heading: string;
  body: ContentBlock[];
  nav: StepNav;
}

export interface CaseStudyMeta {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  meta: CaseStudyMeta[];
  tabs: string[];
  steps: Step[];
}

export interface CaseStudyCard {
  slug: string;
  tag: string;
  title: string;
  description: string;
  bgColor: string;
  visualType: 'window' | 'emoji' | 'chat' | 'board' | 'icons' | 'chart';
  layout: 'left' | 'right';
  image?: { src: string; alt: string; position?: string };
}

export const CASE_STUDY_CARDS: CaseStudyCard[] = [
  {
    slug: 'omni',
    tag: 'Banking · OMNI Channel · Multi-Market · Inlaks',
    title: 'One banking suite, five countries — retail, corporate, WhatsApp, voice and CRM.',
    description:
      "I own the OMNI Channel banking suite at Inlaks: retail and corporate internet banking, WhatsApp banking, voice banking, paperless branch operations and CRM, delivered to banks in Nigeria, Kenya, Tanzania, Liberia and Sierra Leone as a single platform. That means strategy, roadmap and pricing across six product lines — plus multi-bank and multi-currency localisation, core banking integration, and the adoption work that decides whether any of it actually gets used.",
    bgColor: '#102a43',
    visualType: 'board',
    layout: 'left',
  },
  {
    slug: 'pierflow',
    tag: 'Healthtech · API Platform · 0→1 · West Africa',
    title: 'Building the connectivity layer for healthcare in Africa.',
    description:
      "Joined Pierflow as API Product Manager to architect an API-first, AI-native platform connecting hospitals, payers, suppliers, and patients across Nigeria and West Africa. Designed the Paper-to-Digital Engine (6,000 FHIR-ready records/day), the HMS Integration API, and an embedded insurance distribution model. Led partnership development at World Health Expo Lagos 2026 — opening active conversations with LinkHMS, Healthcare Federation of Nigeria, GE Healthcare, PharmAccess, and Africa CDC.",
    bgColor: '#0f2a3c',
    visualType: 'icons',
    layout: 'left',
    image: {
      src: '/assets/Pierflow Team WHX.jpeg.PNG',
      alt: 'Pierflow team at World Health Expo Lagos 2026',
      position: 'center 35%',
    },
  },
  {
    slug: 'taxspire',
    tag: 'Regtech · Fintech · 0→1 · Nigeria',
    title: "From tax filing to full corporate compliance — Nigeria's first digital-first tax platform.",
    description:
      "Joined SpireCore as founding product lead to build Taxspire — Nigeria's first accessible, digital-first tax compliance platform for entrepreneurs and small businesses. In six months, with two engineers, we shipped five modules across tax registration, invoicing, advisory and tax clearance. I then expanded the business model beyond tax filing into know-your-business (KYB) services for corporates — adding Corporate Affairs Commission company registration and statutory filings, which became the platform's fastest-growing revenue line in its first months of trading.",
    bgColor: '#fce8d5',
    visualType: 'window',
    layout: 'right',
    image: { src: '/assets/Taxspire Team.jpeg', alt: 'Taxspire team' },
  },
  {
    slug: 'cpay',
    tag: 'Fintech · Government · West Africa',
    title: 'A payment platform that crossed borders — and changed behaviour.',
    description:
      "Led CPay from concept to live deployment across Liberia and Sierra Leone — expanding into five new government ministries, departments and agencies (MDAs) and generating over $1M in revenue. The real challenge wasn't the build; it was getting institutions to change how they moved money. I drove the adoption strategy alongside the product.",
    bgColor: '#d4edda',
    visualType: 'window',
    layout: 'left',
    image: { src: '/assets/CPay.jpeg', alt: 'CPay product launch', position: 'center center' },
  },
  {
    slug: 'amis',
    tag: 'Government · SaaS · Financial Oversight',
    title: 'Turning a one-off government tool into a $30M SaaS platform.',
    description:
      'Designed an Audit Management Information System for the Sierra Leone Government — then repositioned it as a multi-tenant SaaS product. Defined the product vision, mapped the customer journey from manual audit workflows to a digitised system, and aligned a cross-functional team on a roadmap targeting $30M in recurring revenue over five years.',
    bgColor: '#e8eaf6',
    visualType: 'emoji',
    layout: 'right',
    image: { src: '/assets/Audit Followup - Sierra LEone.jpeg', alt: 'Audit follow-up session in Sierra Leone' },
  },
  {
    slug: 'sunu',
    tag: 'Healthtech · Insurance · Africa',
    title: 'Health insurance that actually works for the people using it.',
    description:
      'Built a health insurance management suite for SUNU Health, serving operations across 17 countries. The focus was never just the software — it was redesigning the operational experience so that customer-facing teams could serve better, faster, and with less friction. Deep stakeholder mapping drove the product requirements.',
    bgColor: '#fff8e1',
    visualType: 'chat',
    layout: 'left',
    image: { src: '/assets/SUNU Health Insurance.jpeg', alt: 'SUNU Health Insurance team', position: 'right center' },
  },
  {
    slug: 'hmis',
    tag: 'HMIS · Compliance · CI/CD',
    title: 'A health information system shipped 40% faster — without cutting corners.',
    description:
      'Owned the full product lifecycle for a Health Management Information System at Vatebra — from discovery through compliance sign-off and launch. Introduced CI/CD with Jenkins, reducing release turnaround by 40%. Managed legal, clinical, and engineering stakeholders to ensure the roadmap stayed compliant and customer-centric throughout.',
    bgColor: '#e3f2fd',
    visualType: 'board',
    layout: 'right',
  },
  {
    slug: 'bban',
    tag: 'Payment Infrastructure · Central Bank · API Product',
    title: "The account-validation layer a central bank now runs on.",
    description:
      "Designed Account Mapper, the national account-validation and BBAN layer adopted by the Central Bank of Liberia under the World Bank-funded LIFT-P programme. I defined the Ingress and Name Enquiry API contracts, versioning and acceptance testing, drove integration across nine commercial banks, and had the architecture reviewed against digital public infrastructure standards — closing $400,000 of revenue leakage from payment errors and fraud along the way.",
    bgColor: '#f3e5f5',
    visualType: 'chart',
    layout: 'left',
    image: { src: '/assets/CPay Brainstorming.jpeg', alt: 'CPay team brainstorming session' },
  },
  {
    slug: 'innkorp',
    tag: 'RegTech · KYB · API Platform · 0→1',
    title: 'Register once, verify everywhere — KYB infrastructure for African businesses.',
    description:
      "As embedded Head of Product at Innkorp, I lead a know-your-business platform that registers companies with Nigeria's Corporate Affairs Commission and stores the resulting records in a vault the business owns — reusable for bank and fintech onboarding under itemised, revocable consent. I own the partner API surface: handoff contracts, payload encryption, webhook delivery guarantees, request logging and an embeddable verification widget, plus the commercial packaging that took it to fintech platforms including PiggyVest.",
    bgColor: '#e8f5e9',
    visualType: 'icons',
    layout: 'right',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'omni',
    tag: 'Banking · OMNI Channel · Multi-Market · Inlaks Limited',
    title: 'One banking suite, five countries — retail, corporate, WhatsApp, voice and CRM.',
    summary:
      'The OMNI Channel suite is how a bank meets its customers everywhere at once: retail and corporate internet banking, WhatsApp banking, voice banking, paperless branch operations and CRM, running on one platform rather than five separate procurements. I own strategy, roadmap and pricing across the portfolio, and the multi-market rollout into banks in Nigeria, Kenya, Tanzania, Liberia and Sierra Leone.',
    meta: [
      { label: 'Role', value: 'Lead, Banking Product Management & User Experience' },
      { label: 'Company', value: 'Inlaks Limited · 2020–Present' },
      { label: 'Focus Areas', value: 'Portfolio Strategy · Pricing · Roadmap Management · Core Banking Integration' },
      { label: 'Scope', value: '6 product lines · 5 countries · teams of up to 20' },
    ],
    tabs: ['01 · Context', '02 · Problem Framing', '03 · The Suite', '04 · Pricing & Roadmap', '05 · Adoption', '06 · Outcomes'],
    steps: [
      { number: 'Step 01 — Context', heading: 'Banks were buying channels one at a time — and paying for it twice.', body: [{ type: 'paragraph', html: 'A bank buys internet banking from one vendor, a mobile app from another, a CRM from a third, and a chatbot from whoever pitched last. Each arrives with its own integration into core banking, its own authentication, its own audit trail and its own release cycle. The customer feels the seams immediately: a limit changed on the web does not show up on WhatsApp.' }, { type: 'callout', text: 'The cost of fragmentation is not the licence fees. It is that every channel has to be separately integrated, separately secured, and separately explained to a regulator.' }], nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 } },
      { number: 'Step 02 — Problem Framing', heading: 'One core integration, many front doors.', body: [{ type: 'paragraph', html: 'I framed the portfolio around a single question: what if the bank integrated once and gained every channel? That reframes the product from a collection of apps into a platform with shared integration, shared entitlements and shared audit — and it changes the commercial conversation from per-product licensing to platform adoption.' }, { type: 'callout', text: 'How might a bank serve retail and corporate customers across web, mobile, WhatsApp, voice and branch — from one integration into core banking, with one set of limits, entitlements and audit trails?' }], nav: { prevLabel: '← Context', prevStep: 0, nextLabel: 'Next: The Suite →', nextStep: 2 } },
      { number: 'Step 03 — The Suite', heading: 'Six product lines that share a spine.', body: [{ type: 'insightList', items: [{ strong: 'Retail internet and mobile banking:', text: 'Everyday transfers, bills and self-service for individual customers.' }, { strong: 'Corporate internet banking:', text: 'Multi-level payment authorisation, bulk payments and mandate structures that mirror how a company actually approves money leaving the building.' }, { strong: 'WhatsApp banking:', text: 'Conversational balance, transfers and support on the channel customers already live in, with no app install required.' }, { strong: 'Voice banking:', text: 'Reaching customers on feature phones and low-bandwidth connections, which is still how a large share of the market banks.' }, { strong: 'Paperless branch operations:', text: 'Digitising in-branch account opening and request workflows so the branch stops being the slow path.' }, { strong: 'CRM:', text: 'One customer view across every channel, so a complaint raised on WhatsApp is visible to the branch officer.' }] }, { type: 'callout', text: 'The hardest design work was entitlements. A corporate approval chain has to behave identically whether the approver is on web, mobile or WhatsApp — otherwise the channel becomes a compliance hole rather than a convenience.' }], nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Pricing & Roadmap →', nextStep: 3 } },
      { number: 'Step 04 — Pricing & Roadmap', heading: 'Packaging the platform so a tier-3 bank and a tier-1 bank can both buy it.', body: [{ type: 'paragraph', html: 'I own pricing and the multi-year roadmap across the portfolio. Banks in these five markets differ enormously in size, regulatory regime and currency, so a single price list fails immediately. I set commercial packaging by bank tier and market, and sequenced the roadmap so shared platform work landed before channel-specific features.' }, { type: 'insightList', items: [{ strong: 'Tiered packaging:', text: 'Channel bundles priced so a smaller bank can start with retail and WhatsApp and add corporate later, without re-platforming.' }, { strong: 'Localisation as capability, not custom work:', text: 'Multi-currency, language and regulatory variance treated as platform capability rather than per-deal bespoke build.' }, { strong: 'Shared-spine sequencing:', text: 'Entitlements, audit and core banking integration prioritised ahead of individual channel features, because every channel depends on them.' }] }], nav: { prevLabel: '← The Suite', prevStep: 2, nextLabel: 'Next: Adoption →', nextStep: 4 } },
      { number: 'Step 05 — Adoption', heading: 'The deployment is not finished when it goes live.', body: [{ type: 'paragraph', html: 'Across every market the pattern held: the technical rollout was the easy half. What determined whether a bank actually moved its customers onto the suite was the adoption programme — and I built that alongside the product rather than after it.' }, { type: 'insightList', items: [{ strong: 'Super-user networks:', text: 'One trained advocate inside each bank before wider launch, acting as the internal help desk and the proof point for colleagues.' }, { strong: 'Onboarding on real transactions:', text: 'Training run on the transaction types staff actually process, never on hypothetical demo data.' }, { strong: '30-day post-launch cycles:', text: 'Structured check-ins that surface friction while it is still cheap to fix.' }] }, { type: 'callout', text: 'User acceptance testing with the bank is where product decisions get made honestly. It is the first time anyone outside the project sees the thing under real conditions.' }], nav: { prevLabel: '← Pricing & Roadmap', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 } },
      { number: 'Step 06 — Outcomes', heading: 'Five countries, one platform, six channels.', body: [{ type: 'outcomeGrid', items: [{ stat: '5', label: 'Countries live: Nigeria, Kenya, Tanzania, Liberia, Sierra Leone' }, { stat: '6', label: 'Product lines owned on a shared platform spine' }, { stat: '1', label: 'Core banking integration per bank, serving every channel' }, { stat: '20', label: 'Cross-functional team members directed at peak, with very low turnover' }] }, { type: 'paragraph', html: 'The portfolio view is what makes this compound. Every market deployment improves the localisation capability the next one inherits, and every channel added to the shared spine costs less than the one before it.' }], nav: { prevLabel: '← Adoption', prevStep: 4, backToWork: true } },
    ],
  },
  {
    slug: 'pierflow',
    tag: 'Healthtech · API Platform · 0→1 · Pierflow',
    title:
      'The connectivity layer for healthcare in Africa — building the API platform hospitals, payers, and patients can plug into.',
    summary:
      'Pierflow is an API-first, AI-native platform that connects hospitals, payers, suppliers, and patients into a single interoperable network across Nigeria and West Africa. I joined as API Product Manager — owning the API surface, the technical roadmap, and the partnership development that turns a platform into an ecosystem. In six months, I authored the Paper-to-Digital (P2D) Engine architecture capable of processing 6,000 FHIR-ready records per day, designed the HMS Integration API for partners like LinkHMS, defined the embedded insurance distribution model, and opened active conversations with 10+ institutional and technology partners at World Health Expo Lagos 2026.',
    meta: [
      { label: 'Role', value: 'API Product Manager' },
      { label: 'Company', value: 'Pierflow · 2026–Present' },
      { label: 'Focus Areas', value: 'API Product · FHIR R4 Interoperability · AI/ML Pipelines · Ecosystem Partnerships' },
      { label: 'Outcome', value: '6,000 records/day · 10+ active partnerships · Africa CDC accelerator applied' },
    ],
    tabs: [
      '01 · Context & Mandate',
      '02 · Problem Framing',
      '03 · Architecture',
      '04 · Partner API',
      '05 · Ecosystem & GTM',
      '06 · Outcomes',
    ],
    steps: [
      {
        number: 'Step 01 — Context & Mandate',
        heading: "An API-first platform needs a product manager who can think in endpoints, schemas, and ecosystems.",
        body: [
          { type: 'paragraph', html: 'Pierflow is positioned as <em>the connectivity layer for healthcare in Africa</em> — an interoperable network where hospitals, payers, suppliers, and patients can exchange data through a single, standardised API surface. Built in Lagos, designed for West Africa, modelled on the developer-platform DNA of companies like Stripe and Twilio.' },
          { type: 'paragraph', html: 'The mandate when I joined was clear: every part of the product is an API. Every workflow has a developer-readable contract. Every partnership is a technical integration, not a slide deck. My job was to own that surface — the documentation, the schemas, the versioning, the developer experience — and translate it into commercial traction with the institutions that move African healthcare.' },
          { type: 'callout', text: 'African healthcare is fragmented by design. Every hospital runs its own HMS. Every HMO uses its own claims schema. Every supplier has its own catalogue. Pierflow\'s thesis is that the network effect comes from standardising the connectivity, not the systems.' },
          { type: 'paragraph', html: 'Core stack: FHIR R4, REST APIs, OAuth 2.0, multimodal LLMs (Claude and GPT-4o), OCR fallback chains, OpenCV-based image enhancement, NDPR-compliant data handling. The platform speaks the international standards (FHIR, ICD-10, LOINC, ATC) but is tuned to the realities of how data actually moves in Nigerian hospitals — paper, scans, WhatsApp, fragmented spreadsheets, and inconsistent identifiers.' },
        ],
        nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 },
      },
      {
        number: 'Step 02 — Problem Framing',
        heading: 'Paper records are the silent reason every HMS roll-out stalls.',
        body: [
          { type: 'paragraph', html: 'At World Health Expo Lagos 2026, I sat down with LinkHMS — one of Nigeria\'s leading hospital management systems. They had a clear sales pitch, real customers, and a working product. What they didn\'t have was a way to onboard new hospital clients quickly. Every prospect came with the same blocker: decades of paper records that nobody had the time or budget to digitise.' },
          { type: 'paragraph', html: 'That conversation became the commission for what would become the Paper-to-Digital (P2D) Engine. The framing wasn\'t "build an OCR tool." It was "remove the single biggest barrier between Nigerian hospitals and modern HMS adoption." Same outcome, very different product.' },
          {
            type: 'insightList',
            items: [
              { strong: 'The hardware reality:', text: 'Hospitals scan documents through a wild mix of devices — eSCL/AirScan multifunction printers, TWAIN/WIA-driven flatbeds, ISIS-driven production scanners, plus scan-to-email, scan-to-folder, SFTP, and mobile phone capture. The ingestion layer had to meet every one of those, not pick a favourite.' },
              { strong: 'The data reality:', text: 'Handwriting, poor lighting, faded ink, multi-language notes, inconsistent formats. No single OCR engine handles all of it well. The pipeline needed redundancy — multimodal LLMs as primary, OCR as fallback, human review as the safety net.' },
              { strong: 'The compliance reality:', text: 'NDPR is non-negotiable. Every record processed had to be standardised, validated, and auditable end-to-end. No "we\'ll add governance later." The validation engine had to ship in v1.' },
              { strong: 'The commercial reality:', text: 'LinkHMS needed a clean handoff — a versioned API contract, an Import Package, an acknowledgement flow. Not a Google Drive folder of CSVs. The product had to feel like Stripe sending webhooks, not like a consultancy delivering files.' },
            ],
          },
          { type: 'callout', text: 'How might we turn decades of paper records into FHIR R4 patient bundles that an HMS partner can import in a single API call — with the confidence that the data is clean, standardised, and compliant?' },
        ],
        nav: { prevLabel: '← Context & Mandate', prevStep: 0, nextLabel: 'Next: Architecture →', nextStep: 2 },
      },
      {
        number: 'Step 03 — Architecture',
        heading: 'A 17-section technical specification for an AI-native digitisation pipeline.',
        body: [
          { type: 'paragraph', html: 'I authored the full P2D Engine architectural design document — 17 sections covering the scanner integration layer, the Pierflow Scan Agent, the Document Ingestion API, the AI pre-processing pipeline, the LLM extraction engine, the FHIR R4 standardisation layer, patient deduplication via a Master Patient Index, the validation engine, the human review portal, and the HMS Integration API.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Scanner ingestion (the entry point):', text: 'Pierflow Scan Agent — a lightweight client that bridges all four major scanner protocols (eSCL/AirScan, TWAIN, WIA, ISIS) plus scan-to-email, scan-to-folder, SFTP, and mobile capture into a single uploader hitting the Document Ingestion API. One contract, many devices.' },
              { strong: 'AI pre-processing:', text: 'OpenCV-based image enhancement (deskew, denoise, contrast normalisation), automatic document classification (lab result vs. prescription vs. discharge summary vs. clinical note), and region segmentation so the extraction stage knows what kind of structure it\'s reading.' },
              { strong: 'LLM extraction engine:', text: 'Multimodal Claude and GPT-4o as primary extractors — they read the document visually, understand handwriting context, and emit structured JSON. Google Document AI and AWS Textract sit underneath as OCR fallbacks for low-confidence or cost-sensitive cases.' },
              { strong: 'FHIR R4 standardisation:', text: 'Extracted data is mapped into 12 FHIR resource types — Patient, Practitioner, Encounter, Observation, Condition, MedicationRequest, AllergyIntolerance, Immunization, DiagnosticReport, Procedure, DocumentReference, and Bundle. Drug codes get standardised against ATC; diagnoses against ICD-10; labs against LOINC.' },
              { strong: 'Patient deduplication (the Master Patient Index):', text: 'A separate index reconciles records that belong to the same patient across documents — fuzzy match on name, NIN, DOB, phone — and assigns a stable Pierflow Patient ID. Without this, "John Adebayo" appears as 12 different patients in the HMS. Critical for downstream interoperability.' },
              { strong: 'Validation engine:', text: 'Schema validation, required-field checks, value-range checks (no diastolic pressure of 350), and confidence-score thresholding. Anything below confidence threshold gets routed to the Human Review Portal — a queue UI for trained reviewers to correct and approve in seconds.' },
              { strong: 'Output:', text: 'Validated FHIR R4 patient bundles, ready for any standards-compliant HMS to consume. Target throughput: up to 6,000 records per day at production scale.' },
            ],
          },
          { type: 'callout', text: 'The architectural decision I am most proud of: making LLMs the primary extractors and OCR the fallback — not the other way round. In African handwriting contexts, multimodal LLMs outperform OCR by a meaningful margin. Most teams default to OCR because that\'s how the field worked five years ago. We chose what works now.' },
        ],
        nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Partner API →', nextStep: 3 },
      },
      {
        number: 'Step 04 — Partner API',
        heading: 'The HMS Integration API: what it feels like to consume Pierflow as a developer.',
        body: [
          { type: 'paragraph', html: 'The architecture only matters if partners can actually plug into it. I designed the HMS Integration API as a complete RESTful surface — versioned, OAuth 2.0-protected, fully documented — that an HMS partner like LinkHMS could integrate with in a single sprint.' },
          {
            type: 'image',
            src: '/assets/Pierflow Endoscope Booth.jpeg.PNG',
            alt: 'Partner conversation at the GAR Medical Endoscope booth, WHX Lagos 2026',
            caption: 'Live partnership conversation at the GAR Medical booth — every endpoint in the API started with someone telling us what they actually needed.',
          },
          {
            type: 'insightList',
            items: [
              { strong: 'OAuth 2.0 client credentials:', text: 'Every partner gets a client_id and client_secret. They exchange those for short-lived access tokens, scoped to the data they\'re allowed to read. Clean, standard, boring — exactly what good API security should be.' },
              { strong: 'Provider and Patient endpoints:', text: '/providers and /patients support pagination, filtering, and incremental sync via updated_since. No surprises for anyone who has integrated a modern SaaS API.' },
              { strong: 'FHIR R4 Bundle retrieval:', text: 'GET /patients/{id}/bundle returns a complete FHIR R4 Bundle for that patient — every observation, condition, medication, encounter — pre-standardised so the HMS doesn\'t need to do its own mapping.' },
              { strong: 'Bulk Import Packages:', text: 'For large onboarding batches, partners can request an Import Package — a signed ZIP with a SHA-256 checksum containing thousands of FHIR Bundles plus a manifest. Designed for off-peak ingestion, with a download-once URL and a confirmation flow.' },
              { strong: 'Acknowledgement flow:', text: 'After import, the partner POSTs an acknowledgement payload listing accepted, rejected, and partially-imported records. This closes the audit loop — Pierflow knows exactly what landed where, and we can trigger re-syncs for anything that failed.' },
              { strong: 'Webhook notifications:', text: 'Three core webhook events — package.ready, patient.validated, batch.processing_complete — let the partner react in near-real-time rather than polling. Standard signature verification, retry-with-backoff, dead-letter queue. Same patterns Stripe and GitHub use, because they work.' },
              { strong: 'Documentation discipline:', text: 'Every endpoint shipped with request/response schemas, error codes, rate limits, and a versioning strategy. The thing developers love about Stripe isn\'t the product. It\'s the docs.' },
            ],
          },
          { type: 'callout', text: 'The test I held myself to throughout the design: could a competent backend engineer integrate this API on a Friday afternoon and have data flowing on Monday morning? If the answer was no, the design wasn\'t done.' },
        ],
        nav: { prevLabel: '← Architecture', prevStep: 2, nextLabel: 'Next: Ecosystem & GTM →', nextStep: 4 },
      },
      {
        number: 'Step 05 — Ecosystem & GTM',
        heading: "A platform doesn't grow on roadmaps. It grows on partnerships.",
        body: [
          { type: 'paragraph', html: 'World Health Expo Lagos 2026 was the most important week of Pierflow\'s commercial development to date. I treated it as a product launch — researched, scripted, and tracked end to end.' },
          {
            type: 'image',
            src: '/assets/Pierflow SICURO Booth.jpeg.PNG',
            alt: 'Pierflow team partnership meeting at the SICURO booth, WHX Lagos 2026',
            caption: 'On the floor at WHX Lagos 2026 — the playbook said visit 50 companies. We left with active conversations from 10 of them.',
          },
          {
            type: 'insightList',
              items: [
              { strong: 'The Partnership Playbook:', text: 'I researched 150+ exhibitors across six halls and produced a 50-company partnership playbook — a professionally designed Word document where each entry contained company research, alignment rationale, key talking points, a word-for-word pitch script, and a specific ask (LOI, pilot, MOU). Organised by hall for navigation efficiency, with a recommended visit order ranked by partnership density.' },
              { strong: 'The CRM tracker:', text: 'A custom Excel-based partnership CRM tracker built from scratch — 23 columns covering contact info, tier, stage (nine stages from New Contact to Active Partner), discussion summary, pain point, value prop presented, reaction, next action, days-since-contact, and an overdue flag. Backed by a Pipeline Summary sheet with live counts and a Legend & Guide sheet for the team. Pre-loaded with 15 WHX contacts on day one.' },
              { strong: 'Pitch deck and brand discipline:', text: 'A 9-slide deck rendered programmatically with pptxgenjs — design language extracted directly from pierflow.com (dark navy backgrounds, teal and green accents, terminal/code elements, developer-platform aesthetic in the spirit of Stripe and Twilio). Slides covered Cover, Problem, Vision, Solution, Platform, Records API deep-dive, Insurance Distribution, Market & Traction, and The Ask.' },
              { strong: 'Insurance distribution strategy:', text: 'Beyond the Records platform, I designed Pierflow\'s embedded insurance distribution model — a three-step API product (Discover, Enroll, Activate) that places affordable HMO plans natively inside fintech and banking apps Nigerians already use daily. I presented this concept in our applications to Africa Health-Tech Accelerator (co-hosted by Africa CDC) and Accelerate Africa.' },
            ],
          },
          { type: 'callout', text: "Active conversations opened at WHX Lagos 2026: LinkHMS (active P2D pilot scoping), Healthcare Federation of Nigeria, SYNLAB Nigeria, GE Healthcare West Africa, PharmAccess Foundation, SANeForce, Nigeria Health Watch (data partnership + Abuja Hackathon invite), West Africa Private Healthcare Federation, AMCE, and ABC Health." },
        ],
        nav: { prevLabel: '← Partner API', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 },
      },
      {
        number: 'Step 06 — Outcomes',
        heading: 'Six months. A platform architected. An ecosystem in motion.',
        body: [
          {
            type: 'outcomeGrid',
            items: [
              { stat: '6,000', label: 'FHIR-ready patient records/day target throughput in the P2D Engine' },
              { stat: '10+', label: 'Active partnership conversations opened at WHX Lagos 2026' },
              { stat: '12', label: 'FHIR R4 resource types standardised across the data pipeline' },
              { stat: '50', label: 'Partner playbook entries researched, scripted, and tracked end to end' },
            ],
          },
          { type: 'paragraph', html: 'The headline outcome is the partnership pipeline. LinkHMS is actively scoping a Paper-to-Digital pilot for multiple hospital clients. Nigeria Health Watch has invited us to their Abuja Hackathon in July 2026 with a data partnership in active discussion. Conversations with Healthcare Federation of Nigeria, SYNLAB, GE Healthcare, PharmAccess, and SANeForce are all live. Our application to the Africa Health-Tech Accelerator — co-hosted by Africa CDC — is in.' },
          { type: 'paragraph', html: 'The lesson from this work: in a market like African healthcare, building the right API is necessary but not sufficient. Distribution is the product. The Records API is real because LinkHMS has a real pain. The Insurance API is real because Nigerians already live inside fintech apps every day. Every endpoint should answer a question someone has already asked you in person.' },
          { type: 'callout', text: "Next: launch the P2D pilot with LinkHMS, sign the first MOUs from the WHX pipeline, and ship the Insurance Distribution API to the first fintech partner. Pierflow's network effect is only beginning." },
        ],
        nav: { prevLabel: '← Ecosystem & GTM', prevStep: 4, backToWork: true },
      },
    ],
  },
  {
    slug: 'taxspire',
    tag: 'Regtech · Fintech · 0→1 · SpireCore',
    title:
      "From tax filing to full corporate compliance — building Nigeria's first digital-first tax platform.",
    summary:
      "Taxspire is SpireCore's flagship product: a Nigerian-first platform that automates tax compliance, business registration, and financial advisory for entrepreneurs, freelancers, and SMEs. I joined as the founding product lead — not just as a PM, but as a builder, strategist, and growth driver. In six months, with a team of two engineers, we launched multiple product modules, generated our first revenue within weeks, and built a growth engine that compounded from day one.",
    meta: [
      { label: 'Role', value: 'Head of Product & Growth (Founding)' },
      { label: 'Company', value: 'SpireCore (Taxspire) · 2025–2026' },
      { label: 'Focus Areas', value: '0→1 Product · Growth Strategy · CX Design · Regulatory Navigation' },
      { label: 'Outcome', value: '5 live modules · KYB expansion · Two-engineer team' },
    ],
    tabs: [
      '01 · Context & Entry',
      '02 · Problem Framing',
      '03 · User Journey',
      '04 · Product & Growth',
      '05 · Team & Delivery',
      '06 · Outcomes',
    ],
    steps: [
      {
        number: 'Step 01 — Context & Entry',
        heading: "I wasn't recruited to fill a role. I joined to help build a company.",
        body: [
          { type: 'paragraph', html: 'Lydia — a long-standing friend and co-founder — reached out looking for a product manager for SpireCore\'s founding product. She was building in the Nigerian regulatory-fintech space and needed someone who understood both the product craft and the Nigerian market deeply. After reviewing the opportunity, I decided to put myself forward rather than recommend someone else.' },
          { type: 'paragraph', html: 'The reason was simple: the product required more than product management. It required the energy and judgement of a founder. Someone who could help shape the idea, navigate Nigerian regulatory realities, build a team from scratch, and drive both product and revenue simultaneously. I negotiated a scope that reflected that — and I came in as more than a PM.' },
          { type: 'callout', text: 'The founding team was diaspora-led: brilliant, motivated, and deeply Nigerian in identity — but not beat-by-beat familiar with how Nigerian users, regulators, and informal markets actually behave. That gap was where I added the most immediate value.' },
          { type: 'paragraph', html: "My first contribution wasn't a product spec. It was helping the team understand the user they were building for — an average Nigerian who doesn't want to think about taxes, doesn't trust government systems, and is looking for any reason to postpone compliance." },
        ],
        nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 },
      },
      {
        number: 'Step 02 — Problem Framing',
        heading: "Nobody wakes up excited to pay taxes. That's the real product problem.",
        body: [
          { type: 'paragraph', html: 'The founding vision was "TurboTax for Nigeria" — a compelling benchmark, but one that needed significant localisation. The US model assumes users are already in the tax system, already motivated to file, and already have a relationship with financial data. Nigeria in 2025 was different on every dimension.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Policy tailwind:', text: "Nigeria's 2025 tax reforms substantially expanded the tax net — bringing millions of formally-employed Nigerians into filing obligations for the first time. The government had created the demand. Our job was to meet it." },
              { strong: 'Reluctance as the UX problem:', text: "Users didn't resist tax compliance because they opposed it in principle — they resisted because the process was opaque, bureaucratic, and historically unpleasant. The product had to make compliance feel effortless, not dutiful." },
              { strong: 'Big Four blind spot:', text: "KPMG, PwC, Deloitte and the rest dominated enterprise tax advisory. Nobody was serving entrepreneurs, freelancers, consultants, and SMEs with an accessible, affordable, digital-first option. That was our market." },
            ],
          },
          { type: 'callout', text: 'How might we make tax compliance so frictionless and useful that users think of Taxspire as a business management partner — not a tax obligation?' },
          { type: 'paragraph', html: 'This framing shifted the product strategy from "tax filing tool" to "compliance lifecycle platform" — and that shift unlocked the business model, the GTM, and ultimately the revenue architecture.' },
        ],
        nav: { prevLabel: '← Context & Entry', prevStep: 0, nextLabel: 'Next: User Journey →', nextStep: 2 },
      },
      {
        number: 'Step 03 — User Journey',
        heading: 'We mapped the full compliance life of a Nigerian — then built the platform around it.',
        body: [
          { type: 'paragraph', html: "Through stakeholder interviews, user research, and deep knowledge of Nigerian regulatory processes, I mapped a compliance journey that spanned every stage from a person's first job to owning and running a business. This became the product architecture." },
          {
            type: 'insightList',
            items: [
              { strong: 'Tax profile registration:', text: "Every compliant Nigerian needs a tax identity — registered with their state's internal revenue service. For Lagos-based users, that's LIRS. We automated this first-touch interaction, turning a traditionally manual process into a self-serve digital flow." },
              { strong: 'Business registration as a gateway:', text: 'For corporate users, you cannot legally file taxes before registering your business with the Corporate Affairs Commission. We identified this as both a prerequisite and a growth lever — business registration brought in users who would then need tax filing, advisory, and invoicing. We built it as a full-service module, not just a referral link.' },
              { strong: 'Tax filing and advisory:', text: 'Core filing for individuals and SMEs, paired with advisory from a certified tax professional I recruited specifically for this role — after an extensive search and structured interviews.' },
              { strong: 'Invoicing with compliance built in:', text: 'Invoices on Taxspire automatically incorporate TIN, withholding receipting, and VAT — turning a routine business task into a compliance touchpoint. Users manage their businesses and stay compliant at the same time.' },
              { strong: 'Tax Clearance Certificate (TCC) retrieval:', text: 'Required for visa applications, government contracts, and other obligations. We surfaced this as a user-facing feature, not buried in a settings menu.' },
            ],
          },
          { type: 'callout', text: "Each module in the platform wasn't designed independently — it was designed as a stage in a journey. The goal was that a user who came to register a business would still be on the platform two years later, filing taxes, generating invoices, and consulting our advisors." },
        ],
        nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Product & Growth →', nextStep: 3 },
      },
      {
        number: 'Step 04 — Product & Growth',
        heading: "Growth wasn't a phase after launch. It was designed into the product from day one.",
        body: [
          { type: 'paragraph', html: 'I operated simultaneously as product lead and growth lead — and I was deliberate about building those two functions together rather than sequentially. Every product decision had a growth dimension.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Prototype-first development:', text: 'Before any engineer wrote a line of code, we simulated user experiences using design tools and LLM-assisted prototyping. Prototypes went to stakeholders for review, feedback was incorporated, and only then did development begin. This dramatically shortened the gap between idea and validated product.' },
              { strong: 'Business registration as a revenue seed:', text: 'I identified that we could generate immediate revenue from business registration before the tax filing product was fully live — by leveraging my professional network and a key partnership with a certified accountant I sourced and onboarded. We used Taxspire itself as our first client and immediately generated our first registration revenue within weeks of launch.' },
              { strong: 'Closing the WhatsApp loop:', text: "Users naturally tried to interact via WhatsApp — it's the default Nigerian B2C channel. We designed a deliberate migration: after completing a service, users were directed to the platform to retrieve their certificates and documents. This forced first-party engagement and enabled product discovery at the moment of highest trust." },
              { strong: 'Google Calendar integration:', text: 'Advisory bookings were integrated directly into the product flow, tied to relevant modules. A user filing taxes could book a session mid-flow. A user registering a business got a post-registration advisory nudge. Cross-sell at every journey stage.' },
              { strong: 'Microsoft Clarity for behaviour analytics:', text: "Standard traffic analytics weren't enough. I implemented Microsoft Clarity to capture heatmaps and session recordings — understanding not just where users came from, but what they actually did: which CTAs they clicked, where they dropped off, what they scrolled past. Every week, this fed directly into product iterations." },
              { strong: 'Whole-team growth culture:', text: "I instilled the principle that growth is not the marketing team's job alone. Every team member — engineers, support, advisors — was expected to engage with the product's growth. Reposts, referrals, feedback loops. This created compounding word-of-mouth in a product category where trust is the primary conversion driver." },
              { strong: 'Email marketing and live chat:', text: 'Implemented to reduce bounce and increase conversion — live chat specifically designed to intercept intent before it left the platform.' },
            ],
          },
        ],
        nav: { prevLabel: '← User Journey', prevStep: 2, nextLabel: 'Next: Team & Delivery →', nextStep: 4 },
      },
      {
        number: 'Step 05 — Team & Delivery',
        heading: 'A full product platform. Two engineers. Six months.',
        body: [
          { type: 'paragraph', html: "One of the things I'm most proud of about this project is what we shipped with, not just what we shipped. The entire platform — tax profiling, business registration, invoicing, advisory booking, TCC retrieval — was built by a single frontend engineer and a single backend engineer, augmented by AI tooling and automation platforms I sourced and integrated into the workflow." },
          {
            type: 'insightList',
            items: [
              { strong: 'Team building from scratch:', text: 'I was involved in every hire — UI/UX designers, the product manager I later brought in, the tax advisor, and the accountant partner for business registration. I ran searches, conducted interviews, structured onboarding, and in some cases drafted the partnership agreements myself (with legal review).' },
              { strong: 'Scrum at speed:', text: "Ran structured sprint cycles with the engineering team — daily standups, weekly reviews, fortnightly roadmap sessions with management. I was running scrum on a product that didn't exist six months ago and shipping features on a weekly cadence." },
              { strong: '360-degree product involvement:', text: 'Beyond product and growth, I was advising management daily — typically two hours of strategic calls per day. On documentation, process design, compliance architecture, internal tooling, role-based access controls for the admin platform, and roadmap prioritisation for features like payroll and fintech API integrations on the horizon.' },
              { strong: 'Mentoring as a delivery multiplier:', text: 'I spent deliberate time unblocking team members — not just resolving immediate blockers, but helping each person understand the product vision deeply enough to make good decisions without me in the room. A team that understands the "why" ships better and faster.' },
            ],
          },
          { type: 'callout', text: "The engineering constraint wasn't a limitation — it was a forcing function. It made us ruthlessly prioritise, prototype before building, and automate wherever we could. The product we shipped is leaner and more focused because of it." },
        ],
        nav: { prevLabel: '← Product & Growth', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 },
      },
      {
        number: 'Step 06 — Outcomes',
        heading: 'From tax tool to compliance platform — and still accelerating.',
        body: [
          {
            type: 'outcomeGrid',
            items: [
              { stat: 'KYB', label: 'Corporate registration and filings became the fastest-growing revenue line' },
              { stat: '6 mo.', label: 'From blank page to live multi-module platform with paying customers' },
              { stat: '2 eng.', label: 'Full platform shipped by one frontend and one backend engineer' },
              { stat: '5+', label: 'Live product modules: tax profile, business registration, invoicing, advisory, TCC' },
            ],
          },
          { type: 'paragraph', html: 'The commercial result mattered less than what it proved: the journey model worked. Users who came for business registration discovered tax filing. Users who filed taxes booked advisory sessions. The cross-sell loops we designed into the product were converting from week one — and the KYB expansion gave corporates a reason to arrive in the first place.' },
          { type: 'paragraph', html: "The platform is actively growing. Near-term roadmap includes direct API integrations with Nigerian fintechs — enabling KYC document fulfilment as an embedded service within third-party platforms — and a payroll module that extends Taxspire further into the SME compliance lifecycle. The ambition is Stripe for African compliance infrastructure: not a tax tool, but the compliance layer that every Nigerian business runs on." },
          { type: 'callout', text: "The lesson from this project: in a market where nobody wants your product category, the route to adoption is making the journey so useful at every step that compliance becomes incidental to value. We didn't build a tax app. We built a business companion that happens to keep you compliant." },
        ],
        nav: { prevLabel: '← Team & Delivery', prevStep: 4, backToWork: true },
      },
    ],
  },
  {
    slug: 'cpay',
    tag: 'Fintech · Government · West Africa · Inlaks Limited',
    title: 'A payment platform that crossed borders — and changed behaviour.',
    summary:
      'CPay started as a single-country payment solution. I led its evolution into a cross-border government payment platform across Liberia and Sierra Leone — expanding into five new government ministries, departments and agencies (MDAs) and generating over $1M in revenue. The hardest part wasn\'t the build. It was getting entrenched institutions to change how they moved public money.',
    meta: [
      { label: 'Role', value: 'Senior Product Manager' },
      { label: 'Timeline', value: '2020 – Present' },
      { label: 'Focus Areas', value: 'Product Strategy · Change Management · Adoption' },
      { label: 'Outcome', value: '$1M+ revenue · 5 new MDAs' },
    ],
    tabs: [
      '01 · Discovery',
      '02 · Problem Framing',
      '03 · Stakeholder Mapping',
      '04 · Product Design',
      '05 · Adoption Strategy',
      '06 · Outcomes',
    ],
    steps: [
      {
        number: 'Step 01 — Discovery',
        heading: 'Understanding the landscape before touching the product.',
        body: [
          { type: 'paragraph', html: 'Before scoping a single feature, I spent time embedded with the users — government finance officers, MDA cashiers, and central bank liaisons across Liberia and Sierra Leone. I conducted structured interviews, shadowed existing payment workflows, and analysed failure logs from the legacy system.' },
          { type: 'paragraph', html: "What I found wasn't a technology problem. The existing infrastructure was adequate. The real issues were trust, habit, and institutional resistance. Government staff had been managing payments manually for years. The risk wasn't that CPay wouldn't work — it was that it would work and nobody would use it." },
          { type: 'callout', text: '"The biggest discovery insight: the people who processed payments weren\'t afraid of the technology. They were afraid of accountability. Digital payments created an audit trail their manual systems didn\'t."' },
          { type: 'paragraph', html: 'I also mapped the external landscape — competing internal systems, political sensitivities between MDAs, and the compliance requirements tied to World Bank funding conditions. This informed both the product scope and the stakeholder engagement strategy.' },
        ],
        nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 },
      },
      {
        number: 'Step 02 — Problem Framing',
        heading: 'Three problems disguised as one.',
        body: [
          { type: 'paragraph', html: 'Discovery surfaced three distinct problem layers that had been treated as one. Separating them was critical to building the right product and the right change programme around it.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Workflow mismatch:', text: "CPay's original flow was designed around a bank's mental model, not a government MDA's. Payment authorisation chains in MDAs have multiple approvers, budget codes, and ministry-specific compliance steps — none of which the product accommodated." },
              { strong: 'Fragile trust:', text: 'Previous technology pilots by other vendors had failed visibly. Staff were sceptical and senior officials were politically exposed if another rollout failed publicly.' },
              { strong: 'No adoption plan:', text: 'The product had been sold to procurement. No one had a plan for getting the actual users — 200+ front-line finance officers — to change their daily behaviour.' },
            ],
          },
          { type: 'callout', text: 'How might we design a payment platform that government staff choose to use — not because they\'re told to, but because it makes their job easier and their work more defensible?' },
        ],
        nav: { prevLabel: '← Discovery', prevStep: 0, nextLabel: 'Next: Stakeholder Mapping →', nextStep: 2 },
      },
      {
        number: 'Step 03 — Stakeholder Mapping',
        heading: 'Knowing who to move, and in what order.',
        body: [
          { type: 'paragraph', html: 'I built a full stakeholder map across three tiers — executive sponsors, operational gatekeepers, and end users. Each group had different motivations, different risk tolerances, and different definitions of success.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Ministry Finance Directors:', text: 'Cared about audit compliance and reduced reconciliation time. Needed proof of concept before committing their teams.' },
              { strong: 'MDA Cashiers & Payment Officers:', text: 'Cared about not being blamed if a transaction failed. Needed a system that was forgiving, transparent, and gave them a clear paper trail.' },
              { strong: 'Central Bank Liaisons:', text: 'Cared about interoperability and CBL compliance. Needed technical confidence in the validation layer.' },
              { strong: 'Inlaks Leadership:', text: 'Cared about revenue, market expansion, and reputational risk from any public failure.' },
            ],
          },
          { type: 'paragraph', html: 'I used this map to sequence the rollout — starting with the MDA that had the most progressive Finance Director as a visible early win, then using that success story to bring resistant MDAs onboard. Sequencing the adoption deliberately, rather than launching to everyone at once, was one of the most important decisions of the project.' },
        ],
        nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Product Design →', nextStep: 3 },
      },
      {
        number: 'Step 04 — Product Design',
        heading: 'Rebuilding the flow around how government actually works.',
        body: [
          { type: 'paragraph', html: "Armed with the research, I led a redesign of CPay's core payment authorisation flow. The key changes were driven entirely by user insight, not technical preference." },
          {
            type: 'insightList',
            items: [
              { text: 'Introduced configurable multi-level approval chains, allowing each MDA to map their existing authorisation hierarchy into the system — no change to their governance structure required.' },
              { text: 'Added real-time payment status visibility for all approvers in the chain, eliminating the "where is this transaction?" question that generated most support calls.' },
              { text: 'Built audit-ready export functions so finance officers could produce reconciliation reports in their existing formats — reducing the perceived disruption to month-end processes.' },
              { text: 'Simplified the error messaging language — replacing technical codes with plain-language descriptions and suggested remediation steps written for non-technical users.' },
            ],
          },
          { type: 'paragraph', html: "I ran two rounds of usability testing with actual MDA finance staff before finalising the design, iterating on the approval flow after observing where users paused or backtracked. The product decisions weren't about elegance — they were about reducing the cost of adoption for the user." },
        ],
        nav: { prevLabel: '← Stakeholder Mapping', prevStep: 2, nextLabel: 'Next: Adoption Strategy →', nextStep: 4 },
      },
      {
        number: 'Step 05 — Adoption Strategy',
        heading: 'Deployment is day one. Adoption is the actual goal.',
        body: [
          { type: 'paragraph', html: 'I designed a structured adoption programme running in parallel with the technical deployment. It was built around three principles: show before tell, celebrate early wins publicly, and make it easy to ask for help without embarrassment.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Super-user programme:', text: 'Identified one enthusiastic early adopter per MDA and trained them intensively before wider rollout. They became the internal help desk and the proof point for their colleagues.' },
              { strong: 'Guided onboarding sessions:', text: 'Rather than training manuals, I ran live walkthroughs of the exact transaction types each team processed daily — no hypothetical scenarios.' },
              { strong: '30-day check-in cadence:', text: 'Scheduled structured feedback calls at week 1, week 2, and day 30 post-launch to surface friction before it became resistance.' },
              { strong: 'Usage dashboards for leadership:', text: 'Provided Ministry Directors a simple weekly report on adoption rates by team — turning visibility into internal accountability without top-down mandates.' },
            ],
          },
          { type: 'callout', text: 'The super-user model proved to be the highest-leverage investment. Peer-to-peer credibility moved faster than any official communication could.' },
        ],
        nav: { prevLabel: '← Product Design', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 },
      },
      {
        number: 'Step 06 — Outcomes',
        heading: 'What changed, and what it proved.',
        body: [
          {
            type: 'outcomeGrid',
            items: [
              { stat: '$1M+', label: 'Revenue generated through CPay adoption' },
              { stat: '5', label: 'New MDAs onboarded beyond original scope' },
              { stat: '2', label: 'Countries: Liberia and Sierra Leone' },
              { stat: '0', label: 'Major post-launch rollbacks or compliance incidents' },
            ],
          },
          { type: 'paragraph', html: "The expansion into five additional MDAs wasn't part of the original contract — it was earned. When the first MDA's Finance Director publicly credited CPay with improving their audit readiness at a Ministry-wide review meeting, three other MDAs requested onboarding within a month." },
          { type: 'paragraph', html: "The lesson this project reinforced: product success in institutional contexts is measured by sustained use, not deployment date. Building the adoption programme into the product strategy — not as an afterthought — was what made the difference." },
          { type: 'callout', text: "What I'd do differently: instrument adoption metrics from day one. We tracked revenue and transactions, but tracking per-user engagement earlier would have let us intervene faster with lagging MDAs." },
        ],
        nav: { prevLabel: '← Adoption Strategy', prevStep: 4, backToWork: true },
      },
    ],
  },
  {
    slug: 'amis',
    tag: 'Government · SaaS · Financial Oversight · Inlaks Limited',
    title: 'Turning a one-off government tool into a $30M SaaS platform.',
    summary:
      "What began as a custom Audit Management Information System for the Sierra Leone Government became the blueprint for a multi-tenant SaaS product. I led the pivot — defining the vision, mapping the customer journey from fragmented manual audit workflows to a digitised platform, and building the roadmap to $30M in recurring revenue over five years.",
    meta: [
      { label: 'Role', value: 'Senior Product Manager' },
      { label: 'Client', value: 'Sierra Leone Government' },
      { label: 'Focus Areas', value: 'Product Strategy · SaaS Pivot · CX Design' },
      { label: 'Target', value: '$30M recurring revenue (5-year roadmap)' },
    ],
    tabs: [
      '01 · Discovery',
      '02 · Problem Framing',
      '03 · Journey Mapping',
      '04 · SaaS Pivot',
      '05 · Roadmap',
      '06 · Outcomes',
    ],
    steps: [
      {
        number: 'Step 01 — Discovery',
        heading: 'Auditors were drowning in paper — and nobody had mapped the whole process.',
        body: [
          { type: 'paragraph', html: 'The Sierra Leone Audit Service was managing a national audit function across dozens of ministries using a combination of spreadsheets, paper files, and email chains. Finding, tracking, and resolving audit findings could take months — not because the auditors weren\'t capable, but because the process architecture was broken.' },
          { type: 'paragraph', html: 'I conducted discovery sessions with Audit Officers, Senior Auditors, and the Auditor General\'s office. I also reviewed historical audit reports to understand the volume, nature, and resolution patterns of findings. I mapped every handoff in the process — from finding identification to final sign-off — and counted the manual steps.' },
          { type: 'callout', text: 'The average time from audit finding to documented resolution was 14 weeks. Most of that time was lost not in the actual work, but in chasing confirmations, locating files, and managing email threads across ministries.' },
          { type: 'paragraph', html: 'The discovery also revealed something commercially important: the same workflow problems existed in every African government audit office I researched. This was not a Sierra Leone problem. It was a sector-wide problem with no modern solution.' },
        ],
        nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 },
      },
      {
        number: 'Step 02 — Problem Framing',
        heading: 'A custom build would solve one client\'s pain. A platform could solve a continent\'s.',
        body: [
          { type: 'paragraph', html: 'The original brief was to build a custom system for Sierra Leone. I challenged that framing with data from the discovery phase, presenting a business case to Inlaks leadership for a platform architecture that could be configured per government client — rather than rebuilt from scratch each time.' },
          {
            type: 'insightList',
            items: [
              { text: 'The core audit workflow (plan → fieldwork → findings → response → resolution → reporting) was structurally identical across all public sector audit bodies I reviewed.' },
              { text: 'Each country had its own compliance terminology and report formats — but these were configuration problems, not architecture problems.' },
              { text: 'A SaaS model would create recurring revenue versus one-time project fees, changing the commercial profile of the product entirely.' },
            ],
          },
          { type: 'callout', text: 'How might we build an audit management system so configurable that deploying it for a new government client takes weeks, not months — and every new client makes the platform stronger?' },
        ],
        nav: { prevLabel: '← Discovery', prevStep: 0, nextLabel: 'Next: Journey Mapping →', nextStep: 2 },
      },
      {
        number: 'Step 03 — Journey Mapping',
        heading: 'Mapping the full audit lifecycle — from planning to accountability.',
        body: [
          { type: 'paragraph', html: 'I created end-to-end journey maps for four distinct user roles: the Audit Officer, the Senior Auditor, the Ministry Respondent, and the Auditor General. Each had a different touchpoint set, different pain profile, and different definition of success.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Audit Officers', text: 'needed fast finding capture in the field — including offline capability, since many audit locations had unreliable internet.' },
              { strong: 'Senior Auditors', text: 'needed a consolidated view of all open findings across their portfolio, with status and age visible at a glance.' },
              { strong: 'Ministry Respondents', text: 'needed a simple interface to review, respond to, and escalate findings — without needing audit expertise to navigate the system.' },
              { strong: 'The Auditor General', text: 'needed executive dashboards: resolution rates, outstanding risk items, time-to-close by ministry, and report generation with one click.' },
            ],
          },
          { type: 'paragraph', html: "The journey maps revealed that the most painful friction wasn't in the auditors' workflow — it was in the Ministry Respondent experience. They were the bottleneck. Simplifying their interface and introducing email-based response notifications (without requiring them to log in) cut the average response time significantly in early testing." },
        ],
        nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: SaaS Pivot →', nextStep: 3 },
      },
      {
        number: 'Step 04 — SaaS Pivot',
        heading: 'Designing for the second client before the first one was live.',
        body: [
          { type: 'paragraph', html: 'I worked with the engineering team to define the multi-tenancy architecture requirements from the ground up — separating tenant-specific configuration from the core platform logic. This required difficult conversations about short-term scope versus long-term scalability.' },
          { type: 'paragraph', html: 'Key product decisions that enabled the SaaS pivot:' },
          {
            type: 'insightList',
            items: [
              { text: 'All audit terminology, report templates, and workflow stage names stored as configurable metadata — not hardcoded strings.' },
              { text: 'Country-specific compliance rules implemented as configurable rule sets, not embedded logic.' },
              { text: 'A modular permission model that allowed each government client to define their own approval hierarchy without engineering involvement.' },
              { text: "A white-label layer so each deployment could carry the client government's branding — critical for institutional trust and adoption." },
            ],
          },
          { type: 'paragraph', html: "I presented the SaaS architecture decision to Inlaks leadership with a 5-year financial model showing the delta between per-project billing and SaaS recurring revenue. The platform approach was approved, and we built accordingly from day one." },
        ],
        nav: { prevLabel: '← Journey Mapping', prevStep: 2, nextLabel: 'Next: Roadmap →', nextStep: 4 },
      },
      {
        number: 'Step 05 — Roadmap',
        heading: 'A 5-year roadmap built backwards from the revenue target.',
        body: [
          { type: 'paragraph', html: 'With the platform architecture confirmed, I built the product roadmap in three phases designed around the $30M recurring revenue target.' },
          {
            type: 'insightList',
            items: [
              { strong: 'Phase 1 — Core Deployment (Year 1):', text: 'Sierra Leone Audit Service live. Full audit lifecycle management, offline field capture, and executive reporting dashboard. Establish reference client credentials and case study.' },
              { strong: 'Phase 2 — Platform Expansion (Year 2–3):', text: 'Two additional West African government audit bodies onboarded. Introduce API integrations with existing government financial management systems. Refine configuration tooling based on real onboarding experience.' },
              { strong: 'Phase 3 — Scale (Year 4–5):', text: 'Self-service configuration portal allowing new government clients to onboard without Inlaks professional services. Introduce analytics module with cross-country benchmarking. Target 8 active government clients for $30M ARR.' },
            ],
          },
          { type: 'callout', text: "The roadmap was written as a strategic narrative, not just a feature list — each phase had a hypothesis about market behaviour and a clear success metric. This made it a living planning document, not a contract." },
        ],
        nav: { prevLabel: '← SaaS Pivot', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 },
      },
      {
        number: 'Step 06 — Outcomes',
        heading: 'From a one-client project to a platform with a commercial future.',
        body: [
          {
            type: 'outcomeGrid',
            items: [
              { stat: '$30M', label: 'Targeted recurring revenue over 5-year roadmap' },
              { stat: '1→N', label: 'Architecture designed for multi-government deployment' },
              { stat: '14wk', label: 'Average finding-to-resolution time targeted for reduction' },
              { stat: '4', label: 'Distinct user roles mapped with full journey blueprints' },
            ],
          },
          { type: 'paragraph', html: "The Sierra Leone deployment gave Inlaks a referenceable government client in a market with no comparable solution. The platform architecture means every subsequent deployment is faster and more profitable. The five-year roadmap is a live document — updated quarterly as new market intelligence comes in." },
          { type: 'paragraph', html: "The deeper outcome: this project proved that a product mindset applied to government technology — specifically, the discipline of mapping user journeys before writing requirements — can turn a consultancy engagement into a scalable software business." },
        ],
        nav: { prevLabel: '← Roadmap', prevStep: 4, backToWork: true },
      },
    ],
  },
  {
    slug: 'sunu',
    tag: 'Healthtech · Insurance · Africa · SUNU Health',
    title: 'Health insurance that actually works for the people using it.',
    summary: 'Built a health insurance management suite for SUNU Health, serving operations across 17 countries. The focus was never just the software — it was redesigning the operational experience so that customer-facing teams could serve better, faster, and with less friction.',
    meta: [
      { label: 'Role', value: 'Senior Product Manager' },
      { label: 'Company', value: 'SUNU Health' },
      { label: 'Focus Areas', value: 'CX Design · Stakeholder Mapping · Ops Redesign' },
      { label: 'Scope', value: '17-country Africa deployment' },
    ],
    tabs: ['01 · Discovery', '02 · Problem Framing', '03 · Stakeholder Mapping', '04 · Product Design', '05 · Delivery', '06 · Outcomes'],
    steps: [
      { number: 'Step 01 — Discovery', heading: 'Insurance operations running on memory and manual workarounds.', body: [{ type: 'paragraph', html: 'SUNU Health\'s customer-facing teams were managing claims, enrolments, and policy queries across several African markets with fragmented tooling — a mix of spreadsheets, legacy systems, and undocumented manual steps. Customers experienced delays and inconsistencies that had nothing to do with insurance coverage and everything to do with operational design.' }, { type: 'callout', text: 'The root issue wasn\'t the people or the processes individually — it was that the tools didn\'t reflect how the work actually happened. Staff were compensating for system gaps every day.' }], nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 } },
      { number: 'Step 02 — Problem Framing', heading: 'The product gap was an operations gap in disguise.', body: [{ type: 'paragraph', html: 'The brief was to build a claims management system. Discovery revealed that was too narrow — claims were slow because enrolment data was incomplete, enrolment was incomplete because the onboarding flow was broken, and the onboarding flow was broken because it had been designed by engineers without ops input.' }, { type: 'callout', text: 'How might we design a system that reflects how SUNU\'s operational teams actually work — so they can serve customers faster, with less back-and-forth, and without needing to compensate for software gaps?' }], nav: { prevLabel: '← Discovery', prevStep: 0, nextLabel: 'Next: Stakeholder Mapping →', nextStep: 2 } },
      { number: 'Step 03 — Stakeholder Mapping', heading: 'Seven user types. One system. Competing priorities.', body: [{ type: 'paragraph', html: 'I mapped seven distinct user types across the SUNU operations: customer-facing agents, claims assessors, medical network liaisons, compliance officers, country managers, central operations, and the executive team. Each had a different use of the system and a different pain point.' }, { type: 'callout', text: 'The most valuable insight from the stakeholder work: the people who validated claims were not the same people who entered claim data — but they were using the same screens. Separating those workflows was the highest-impact design decision.' }], nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Product Design →', nextStep: 3 } },
      { number: 'Step 04 — Product Design', heading: 'Designed around the work, not around the data model.', body: [{ type: 'paragraph', html: 'I led the design of the core insurance management modules: enrolment, claims intake, claims assessment, provider network management, and reporting. Every screen was tested with the actual operational staff who would use it — not their managers.' }, { type: 'insightList', items: [{ text: 'Enrolment redesigned to capture complete policyholder data upfront, with validation logic preventing incomplete submissions that caused downstream claims delays.' }, { text: 'Claims intake built with guided step-by-step flows rather than a single complex form — reducing input errors and training time for new staff.' }, { text: 'Claims assessment dashboard giving assessors a prioritised queue with all required information visible on a single screen — no tab-switching, no file lookup.' }] }], nav: { prevLabel: '← Stakeholder Mapping', prevStep: 2, nextLabel: 'Next: Delivery →', nextStep: 4 } },
      { number: 'Step 05 — Delivery', heading: 'Cross-country rollout with zero downtime on live operations.', body: [{ type: 'paragraph', html: 'SUNU Health could not pause operations for a system migration. The rollout was designed as a parallel-run phased transition — new system live alongside legacy, with data migrated progressively, and staff trained in cohorts to avoid operational gaps.' }, { type: 'callout', text: 'The phased approach meant feedback from the first country shaped the configuration for every subsequent deployment. The system improved with each rollout.' }], nav: { prevLabel: '← Product Design', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 } },
      { number: 'Step 06 — Outcomes', heading: 'Faster operations. Better customer experience. A platform that scales.', body: [{ type: 'outcomeGrid', items: [{ stat: '7', label: 'User roles mapped and served by a single unified system' }, { stat: 'Multi', label: 'African markets deployed without operational downtime' }, { stat: '↓', label: 'Claims processing time reduced through workflow redesign' }, { stat: '0', label: 'Rollback events across any country deployment' }] }, { type: 'paragraph', html: "The deeper outcome of this project was cultural as much as technical. SUNU's operations teams became advocates for the system because it had been built around their real work. Adoption didn't need to be mandated — the product was visibly better than the alternative." }], nav: { prevLabel: '← Delivery', prevStep: 4, backToWork: true } },
    ],
  },
  {
    slug: 'hmis',
    tag: 'HMIS · Compliance · CI/CD · Vatebra',
    title: 'A health information system shipped 40% faster — without cutting corners.',
    summary: 'Owned the full product lifecycle for a Health Management Information System at Vatebra — from discovery through compliance sign-off and launch. Introduced CI/CD with Jenkins, reducing release turnaround by 40%.',
    meta: [
      { label: 'Role', value: 'Product Manager' },
      { label: 'Company', value: 'Vatebra' },
      { label: 'Focus Areas', value: 'Compliance · CI/CD · Cross-functional Delivery' },
      { label: 'Outcome', value: '40% faster release turnaround' },
    ],
    tabs: ['01 · Discovery', '02 · Compliance Mapping', '03 · Engineering Process', '04 · Stakeholder Alignment', '05 · Launch', '06 · Outcomes'],
    steps: [
      { number: 'Step 01 — Discovery', heading: 'A health system where release cycles were the biggest clinical risk.', body: [{ type: 'paragraph', html: 'The HMIS at Vatebra was a critical system — used for patient data management and clinical reporting across healthcare facilities. The core product was solid. The problem was delivery: releases took weeks, bugs accumulated between cycles, and compliance sign-offs were a manual bottleneck that no one had formally addressed.' }, { type: 'callout', text: 'The longest release cycle I inherited was 11 weeks. Every week of delay was a week of accumulated risk in a clinical context.' }], nav: { nextLabel: 'Next: Compliance Mapping →', nextStep: 1 } },
      { number: 'Step 02 — Compliance Mapping', heading: 'Compliance wasn\'t a blocker. It was an input we hadn\'t designed for.', body: [{ type: 'paragraph', html: 'The compliance bottleneck existed because legal and clinical sign-off had been placed at the end of the release process — after development, after QA, as a final gate. I reframed compliance as a design input: requirements that shaped how features were built, not a checklist at the end.' }, { type: 'insightList', items: [{ text: 'Mapped all applicable data protection, clinical accuracy, and audit requirements at the start of each sprint, not the end.' }, { text: 'Created a compliance checklist embedded into the feature definition template — so every story had compliance acceptance criteria alongside functional ones.' }, { text: 'Introduced a monthly compliance review with the legal team to address accumulated queries rather than ad hoc firefighting.' }] }], nav: { prevLabel: '← Discovery', prevStep: 0, nextLabel: 'Next: Engineering Process →', nextStep: 2 } },
      { number: 'Step 03 — Engineering Process', heading: 'Introducing CI/CD in an environment that had never used it.', body: [{ type: 'paragraph', html: 'The engineering team at Vatebra had never deployed CI/CD tooling. Releases were manual, environment parity was poor, and test coverage was inconsistent. I led the introduction of Jenkins for continuous integration, working alongside the engineering lead to define the pipeline architecture.' }, { type: 'insightList', items: [{ strong: 'Automated test runs on every PR:', text: 'Caught regressions within minutes rather than discovering them in staging two weeks later.' }, { strong: 'Parallel environment deployment:', text: 'Dev, staging, and production environments kept in parity — eliminating the "works on my machine" class of release failures.' }, { strong: 'Release gates:', text: 'Automated compliance checklist validation before any staging deployment, making compliance a code-level check rather than a human one.' }] }, { type: 'callout', text: 'The CI/CD implementation didn\'t just speed up releases — it changed the engineering team\'s relationship with quality. Bugs caught early stopped being someone\'s fault and started being the system\'s job.' }], nav: { prevLabel: '← Compliance Mapping', prevStep: 1, nextLabel: 'Next: Stakeholder Alignment →', nextStep: 3 } },
      { number: 'Step 04 — Stakeholder Alignment', heading: 'Clinical, legal, and engineering — three teams with three definitions of "done".', body: [{ type: 'paragraph', html: 'The three stakeholder groups — clinical advisors, legal compliance, and engineering — had never operated from a shared definition of a successful release. I established a monthly cross-functional review that brought all three groups around a single roadmap, with shared release criteria.' }, { type: 'callout', text: 'The most important outcome of the cross-functional reviews wasn\'t the decisions made — it was the shared language that developed. Clinical staff started understanding why engineering needed lead time. Engineers started understanding what "compliant" actually meant in practice.' }], nav: { prevLabel: '← Engineering Process', prevStep: 2, nextLabel: 'Next: Launch →', nextStep: 4 } },
      { number: 'Step 05 — Launch', heading: 'Shipped on schedule. Zero compliance incidents.', body: [{ type: 'paragraph', html: 'The HMIS launched on schedule — with full clinical compliance sign-off, no rollback required, and a post-launch support ticket volume 60% lower than the previous major release. The CI/CD pipeline continued running, with releases moving from quarterly to monthly within six months of the initial launch.' }], nav: { prevLabel: '← Stakeholder Alignment', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 } },
      { number: 'Step 06 — Outcomes', heading: '40% faster. Fully compliant. A model the team repeated.', body: [{ type: 'outcomeGrid', items: [{ stat: '40%', label: 'Reduction in release turnaround time after CI/CD implementation' }, { stat: '0', label: 'Compliance incidents at launch or post-launch' }, { stat: '11wk→', label: 'Release cycle compressed to under 7 weeks, then monthly' }, { stat: '3', label: 'Stakeholder groups aligned on shared release criteria' }] }, { type: 'paragraph', html: "The deeper lesson: delivery speed and compliance aren't in tension — they're in tension when compliance is treated as a gate. When it's treated as a design input, it accelerates delivery by eliminating late-stage surprises." }], nav: { prevLabel: '← Launch', prevStep: 4, backToWork: true } },
    ],
  },
  {
    slug: 'innkorp',
    tag: 'RegTech · KYB · API Platform · Innkorp',
    title: 'Register once, verify everywhere — KYB infrastructure for African businesses.',
    summary:
      "Innkorp registers businesses with Nigeria's Corporate Affairs Commission and stores the resulting records in a vault the business owns, so a company proves itself once and reuses that proof everywhere. As embedded Head of Product I own the roadmap, the partner API surface and the commercial packaging that puts verified business identity inside banks and fintechs.",
    meta: [
      { label: 'Role', value: 'Head of Product (Embedded)' },
      { label: 'Company', value: 'Innkorp · 2026–Present' },
      { label: 'Focus Areas', value: 'API Product · KYB & Consent · Developer Experience · Partnerships' },
      { label: 'Outcome', value: 'Partner API live · PiggyVest integration · Merchant-bank pipeline' },
    ],
    tabs: ['01 · Context', '02 · Problem Framing', '03 · Product Design', '04 · Partner API', '05 · Distribution', '06 · Outcomes'],
    steps: [
      { number: 'Step 01 — Context', heading: 'Every African business proves itself from scratch, every single time.', body: [{ type: 'paragraph', html: 'A Nigerian business that wants a corporate bank account, a payment gateway and a lending product uploads the same certificate of incorporation, tax identification number, director details and proof of address three separate times. Each institution re-verifies the same documents independently, and the business waits each time.' }, { type: 'callout', text: 'The documents are not the problem. The absence of a reusable, consented record of verification is the problem.' }], nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 } },
      { number: 'Step 02 — Problem Framing', heading: 'Not a document store. A consent layer.', body: [{ type: 'paragraph', html: 'The obvious build is a document locker. I argued against it: a locker moves the storage problem without touching the trust problem. What banks and fintechs actually need is a verified record they can request, and what businesses need is control over who sees what, and for how long.' }, { type: 'callout', text: 'How might a business register once, hold its own verified records, and grant a bank or fintech itemised access it can review and revoke — without re-uploading anything?' }], nav: { prevLabel: '← Context', prevStep: 0, nextLabel: 'Next: Product Design →', nextStep: 2 } },
      { number: 'Step 03 — Product Design', heading: 'Registration and vault as one journey, not two products.', body: [{ type: 'paragraph', html: 'Innkorp registers the business with the Corporate Affairs Commission — business names, private limited companies and incorporated trustees — and the artefacts of that registration land directly in the vault. The verification record is a by-product of a job the customer already wanted done, which is why the vault fills up at all.' }, { type: 'insightList', items: [{ strong: 'Business-owned vault:', text: 'Certificate of incorporation, tax identification number, director details and proof of address, held against the business rather than against any one institution.' }, { strong: 'Itemised consent:', text: 'A partner requests specific items, not blanket access. The business reviews each request and can revoke it later.' }, { strong: 'Short-lived access:', text: 'Signed links expire, so a granted permission does not quietly become permanent.' }] }], nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Partner API →', nextStep: 3 } },
      { number: 'Step 04 — Partner API', heading: 'The integration has to feel like Stripe, not like a data request.', body: [{ type: 'paragraph', html: 'I own the partner-facing surface end to end. The test I hold it to: a partner engineer should be able to integrate from the documentation alone, without a call.' }, { type: 'insightList', items: [{ strong: 'Handoff contract:', text: 'A versioned contract defining exactly what a partner sends, what it receives, and what every verification state means.' }, { strong: 'Payload encryption and audit:', text: 'Partner payloads encrypted, with request logging that makes every access attributable after the fact.' }, { strong: 'Webhook delivery guarantees:', text: 'Delivery attempts tracked and retried, so a partner never silently misses a verification result.' }, { strong: 'Embeddable widget:', text: 'A drop-in Verify with Innkorp component for partners who want the flow without building it.' }] }], nav: { prevLabel: '← Product Design', prevStep: 2, nextLabel: 'Next: Distribution →', nextStep: 4 } },
      { number: 'Step 05 — Distribution', heading: 'Verified business identity is worth most where onboarding hurts most.', body: [{ type: 'paragraph', html: 'The platforms that feel this pain hardest are the ones onboarding businesses at volume. I drove the integration and commercial packaging with fintech platforms including PiggyVest — from first proposal through a signed service-level agreement and a working demo runbook — and took the platform to merchant banking partners.' }, { type: 'callout', text: 'Pricing mattered as much as the API. Verification only gets adopted at volume if the per-request cost sits below the manual review it replaces.' }], nav: { prevLabel: '← Partner API', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 } },
      { number: 'Step 06 — Outcomes', heading: 'A live partner API and a reusable business identity.', body: [{ type: 'outcomeGrid', items: [{ stat: 'API', label: 'Versioned partner API live, with encryption, webhooks and request logging' }, { stat: 'SLA', label: 'PiggyVest taken from proposal to signed service-level agreement' }, { stat: '3', label: 'Registration types supported: business name, limited company, incorporated trustees' }, { stat: '0', label: 'Re-uploads required once a business holds its own verified vault' }] }, { type: 'paragraph', html: 'The strategic bet is that business identity becomes infrastructure. Registration is the wedge that earns the data, the consent layer is what makes it reusable, and the API is what makes it valuable to everyone else.' }], nav: { prevLabel: '← Distribution', prevStep: 4, backToWork: true } },
    ],
  },
  {
    slug: 'bban',
    tag: 'Payment Infrastructure · Central Bank · API Product · Inlaks Limited',
    title: "The account-validation layer a central bank now runs on.",
    summary: "Account Mapper is the national account-validation and BBAN layer adopted by the Central Bank of Liberia under the World Bank-funded LIFT-P programme. I owned the API product — Ingress and Name Enquiry contracts, versioning, acceptance testing — and drove integration across nine commercial banks, with the architecture reviewed against digital public infrastructure standards.",
    meta: [
      { label: 'Role', value: 'Senior Product Manager' },
      { label: 'Client', value: 'Central Bank of Liberia' },
      { label: 'Focus Areas', value: 'API Product · Payment Validation · Bank Integration · DPI Architecture' },
      { label: 'Outcome', value: '9 banks integrated · $400K leakage closed' },
    ],
    tabs: ['01 · Discovery', '02 · Problem Framing', '03 · Solution Design', '04 · Validation', '05 · Contract', '06 · Outcomes'],
    steps: [
      { number: 'Step 01 — Discovery', heading: 'Recurring payment failures that nobody had traced to their root cause.', body: [{ type: 'paragraph', html: "CPay was processing government payments across Liberia when a pattern emerged in the support data: a disproportionate number of failed or misdirected payments were linked to account number entry. Staff were manually entering Basic Bank Account Numbers (BBANs), and the system had no validation layer to catch errors before processing." }, { type: 'callout', text: "The support tickets described the symptom — payment failed, payment went to wrong account — but nobody had traced the root cause. I pulled three months of failure logs and found that 68% of payment errors were attributable to BBAN entry mistakes." }], nav: { nextLabel: 'Next: Problem Framing →', nextStep: 1 } },
      { number: 'Step 02 — Problem Framing', heading: 'Not a user error problem. A missing validation layer.', body: [{ type: 'paragraph', html: "The instinct in the team was to frame this as a training problem — staff needed to be more careful when entering account numbers. I challenged that framing. In a high-volume payment environment, human error rates don't improve through training; they improve through system design." }, { type: 'callout', text: "How might we make it structurally impossible to submit a payment to an invalid or unresolvable account — without adding friction to the payment flow for valid transactions?" }], nav: { prevLabel: '← Discovery', prevStep: 0, nextLabel: 'Next: Solution Design →', nextStep: 2 } },
      { number: 'Step 03 — Solution Design', heading: 'A validation layer that mapped BBANs to verified account identities.', body: [{ type: 'paragraph', html: "I designed a BBAN Validator and Account Mapper feature that sat between entry and submission in the payment flow. When a user entered an account number, the system would validate the BBAN format against the Central Bank's account structure rules, then resolve it to a verified account holder name for human confirmation before submission." }, { type: 'insightList', items: [{ strong: 'Real-time BBAN format validation:', text: 'Checked structure and check digits against CBL account number rules, flagging malformed entries instantly.' }, { strong: 'Account name resolution:', text: 'Resolved valid BBANs to verified account holder names via CBL API integration — allowing payment officers to visually confirm the recipient before submission.' }, { strong: 'Audit trail generation:', text: 'Every validation event logged with timestamp, operator ID, and resolution result — creating a full fraud-audit trail for compliance purposes.' }] }], nav: { prevLabel: '← Problem Framing', prevStep: 1, nextLabel: 'Next: Validation →', nextStep: 3 } },
      { number: 'Step 04 — Validation', heading: 'Tested against real failure data before a line of code was written.', body: [{ type: 'paragraph', html: "Before engineering began, I ran the proposed validation logic against the three months of historical failure data. 94% of the previously-failed transactions would have been caught and corrected by the validator before submission." }, { type: 'callout', text: "The validation test also revealed something unexpected: 12% of the 'failed payment' logs were not user errors — they were attempted fraud. The account name resolution step would have caught these too, because the resolved name didn't match what the submitter claimed." }], nav: { prevLabel: '← Solution Design', prevStep: 2, nextLabel: 'Next: Contract →', nextStep: 4 } },
      { number: 'Step 05 — Contract', heading: "A central bank mandate we didn't have to pitch.", body: [{ type: 'paragraph', html: "I presented the BBAN validator findings and design to the CPay programme team. The product director shared the analysis with Central Bank of Liberia stakeholders during a quarterly review. Within three weeks, the CBL had initiated a $400,000 contract to implement the feature as a mandatory validation layer across all government payment flows — later formalised under the World Bank-funded LIFT-P programme and rolled out across nine commercial banks." }, { type: 'callout', text: "The contract came because we had quantified the problem before proposing the solution. The CBL's response wasn't 'interesting idea' — it was 'we've been looking for someone to solve this for two years.'" }], nav: { prevLabel: '← Validation', prevStep: 3, nextLabel: 'See Outcomes →', nextStep: 5 } },
      { number: 'Step 06 — Outcomes', heading: 'Nine banks. A national validation layer. Zero misdirected payments.', body: [{ type: 'outcomeGrid', items: [{ stat: '9', label: 'Commercial banks integrated into the national validation layer' }, { stat: '94%', label: 'Of historical failed payments would have been caught by validator' }, { stat: '68%', label: 'Of payment errors attributable to BBAN entry — the root cause nobody had named' }, { stat: '12%', label: 'Of failure logs identified as attempted fraud, not user error' }] }, { type: 'paragraph', html: "The lesson this project crystallised: the most valuable product work is often identifying the problem nobody has named yet. The BBAN validator wasn't on any roadmap. It wasn't requested by any stakeholder. It came from reading support data until a pattern became undeniable — and then quantifying it before anyone asked." }], nav: { prevLabel: '← Contract', prevStep: 4, backToWork: true } },
    ],
  },
];
