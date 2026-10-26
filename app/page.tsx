import Nav from '@/components/Nav';
import CertModal from '@/components/CertModal';
import CVModal from '@/components/CVModal';
import CaseStudies from '@/components/CaseStudies';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';

export default function Home() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero container fade-in">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__label">PRODUCT LEADER &middot; BANKING, PAYMENTS &amp; AGENTIC AI</p>
            <h1 className="hero__headline">
              I&apos;m Olabode — I don&apos;t just ship products.<br />
              I make sure <span className="underline">people actually use them.</span>
            </h1>
            <p className="hero__sub">
              12 years building banking, payments, and government technology across six African
              markets. I own the OMNI Channel banking suite at Inlaks — retail and corporate internet
              banking, WhatsApp, voice, paperless and CRM on one platform — and build the payment
              infrastructure underneath it, from government revenue collection to ACH, RTGS and
              national switch interoperability. Lately, agentic AI workflows.
            </p>
            <div className="hero__cta-row">
              <a href="#work" className="hero__cta">SEE MY WORK &rarr;</a>
              <CVModal />
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__visual-frame">
              <img src="/assets/Hero Image.png" alt="Olabode Ogunfuye" className="hero__image" />
            </div>
          </div>
        </div>

        {/* Cert badges + modal rendered together as a client component */}
        <CertModal />
      </section>

      {/* CASE STUDIES */}
      <CaseStudies />

      {/* OTHER WORK */}
      <section className="other-work container">
        <div className="other-work__grid">
          <div className="other-work__item fade-in">
            <h4>Treasury &amp; Payment Rails</h4>
            <p>Delivered Treasury Single Account systems for Sierra Leone&apos;s Ministry of Finance, linking ministries into ACH, RTGS and national switch rails — improving central financial oversight and restoring institutional confidence in reporting.</p>
          </div>
          <div className="other-work__item fade-in">
            <h4>Agentic AI Workflows</h4>
            <p>Design agentic workflows for product operations — Model Context Protocol tooling and connectors, large language model extraction pipelines with OCR fallback, confidence thresholding, and human-in-the-loop review where accuracy matters.</p>
          </div>
          <div className="other-work__item fade-in">
            <h4>Pricing &amp; Portfolio Roadmap</h4>
            <p>Own commercial packaging and the multi-year roadmap across six banking product lines — tiered by bank size and market, sequenced so shared platform work lands before channel-specific features.</p>
          </div>
          <div className="other-work__item fade-in">
            <h4>Porchplus — Proptech Product</h4>
            <p>Led product and transformation for a property management platform: multi-channel rent collection across WhatsApp, SMS, email and in-app, plus PiggyVest wallet integration to keep payments on-platform.</p>
          </div>
          <div className="other-work__item fade-in">
            <h4>Cross-functional Team Leadership</h4>
            <p>Directed teams of up to 20 — PMs, designers, and engineers — across six-year product programmes with extremely low staff turnover, plus an internship pipeline that added capacity without raising headcount cost.</p>
          </div>
          <div className="other-work__item fade-in">
            <h4>Africa Code Week — Google Grant</h4>
            <p>3&times; Google Grant Award Winner (2017–2019) as Programme Manager at Codespark Foundation, coordinating schools, government agencies, and corporate sponsors including SAP.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about container fade-in">
        <div className="about__copy">
          <h2>About me</h2>
          <p>I&apos;m Olabode — a product leader with 12 years building and commercialising banking, payments, and government technology across six African markets: Nigeria, Kenya, Tanzania, Liberia, Sierra Leone, and São Tomé and Príncipe.</p>
          <p>Day to day I own the OMNI Channel banking suite at Inlaks and the payment infrastructure beneath it — including Account Mapper, the account-validation layer the Central Bank of Liberia adopted and nine commercial banks now integrate with. Alongside that I work zero-to-one: embedded Head of Product at Innkorp building KYB infrastructure, and API product lead at Pierflow, where agentic extraction pipelines turn paper records into standards-compliant health data.</p>
          <p>What sets me apart is how I think about adoption, not just delivery. The best product in the world fails if it doesn&apos;t change how people work. So I design for behaviour change from the start — mapping journeys, engaging stakeholders early, and measuring outcomes well beyond go-live.</p>
          <p>I hold a First Class degree in Computer Science, a Lean Six Sigma Black Belt, and a Professional Scrum Master certification. I lead with data, move with urgency, and build with people in mind.</p>
        </div>
        <div className="about__skills">
          {[
            'Product Strategy', 'Roadmap Management', 'Pricing & Packaging',
            'OMNI Channel Banking', 'ACH / RTGS / Switch', 'Core Banking Integration',
            'API Product Management', 'Agentic AI Workflows', 'KYB & RegTech',
            'Agile / Scrum (PSM I)', 'Lean Six Sigma Black Belt', 'Change Management & Adoption',
            'Customer Journey Mapping', 'Cross-functional Leadership', 'JIRA · Figma · Power BI',
          ].map(skill => (
            <div key={skill} className="skill-tag">{skill}</div>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollEffects />
    </>
  );
}
