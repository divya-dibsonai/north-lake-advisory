import { useState, useEffect } from "react";

// ── COLOUR TOKENS (matching screenshot) ──────────────────────────────────────
// Dark navy/charcoal: #0d1117 / #131920
// Cyan accent:        #00d4e8
// Hot pink accent:    #5b9bd5
// White text:         #ffffff
// Muted text:         rgba(255,255,255,0.65)
// Card bg:            rgba(13,17,23,0.72)
// Border:             rgba(0,212,232,0.22)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg:       "#0d1117",
  bg2:      "#131920",
  cyan:     "#00d4e8",
  cyanDim:  "rgba(0,212,232,0.12)",
  cyanBdr:  "rgba(0,212,232,0.28)",
  pink:     "#5b9bd5",
  pinkDim:  "rgba(91,155,213,0.18)",
  white:    "#ffffff",
  muted:    "rgba(255,255,255,0.65)",
  faint:    "rgba(255,255,255,0.25)",
  card:     "rgba(13,17,23,0.75)",
  border:   "rgba(255,255,255,0.08)",
};

// ── Unsplash background images (office/finance themed) ───────────────────────
const BG_IMAGES = {
  home:       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  about:      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80",
  services:   "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
  onboarding: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
  contact:    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
};

// ── Global styles injected once ───────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; scroll-behavior: smooth; }
  body { background: ${C.bg}; color: ${C.white}; font-family: 'DM Sans', sans-serif; font-weight: 300; overflow-x: hidden; }
  ::selection { background: ${C.cyan}; color: ${C.bg}; }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
  input, textarea, select { font-family: 'DM Sans', sans-serif; }
  a { text-decoration: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .fade-up   { animation: fadeUp 0.65s ease both; }
  .fade-up-2 { animation: fadeUp 0.65s 0.15s ease both; }
  .fade-up-3 { animation: fadeUp 0.65s 0.28s ease both; }
  .fade-in   { animation: fadeIn 0.5s ease both; }

  /* scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.cyan}; border-radius: 3px; }
`;

// ── Reusable components ────────────────────────────────────────────────────────

function StyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

function PageBg({ page }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0,
      backgroundImage: `url(${BG_IMAGES[page]})`,
      backgroundSize: "cover", backgroundPosition: "center",
      opacity: 0.8,
      transition: "opacity 0.6s",
      pointerEvents: "none",
    }} />
  );
}

function Overlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1,
      background: `linear-gradient(135deg, rgba(50,50,55,0.55) 0%, rgba(60,60,65,0.45) 100%)`,
      pointerEvents: "none",
    }} />
  );
}

function Eyebrow({ children, style }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.75rem",
      fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase",
      color: C.cyan, marginBottom: "1rem", ...style,
    }}>
      <span style={{ width: 32, height: 1, background: C.cyan, display: "block", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function SectionTitle({ children, style }) {
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
      fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.1,
      marginBottom: "1rem", ...style,
    }}>{children}</h2>
  );
}

function Pink({ children }) {
  return (
    <span style={{
      color: C.pink,
      textShadow: `0 0 20px ${C.pinkDim}`,
      borderBottom: `3px solid ${C.pink}`,
      paddingBottom: "2px",
    }}>{children}</span>
  );
}

function BtnPrimary({ children, onClick, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cyan : "transparent",
        color: hov ? C.bg : C.cyan,
        border: `2px solid ${C.cyan}`,
        padding: "0.72rem 2rem",
        fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.14em",
        textTransform: "uppercase", transition: "all 0.22s", ...style,
      }}>{children}</button>
  );
}

function BtnPink({ children, onClick, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.pink : "transparent",
        color: hov ? C.white : C.pink,
        border: `2px solid ${C.pink}`,
        padding: "0.72rem 2rem",
        fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.14em",
        textTransform: "uppercase", transition: "all 0.22s", ...style,
      }}>{children}</button>
  );
}

function Card({ children, style, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov ? "rgba(0,212,232,0.06)" : C.card,
        border: `1px solid ${hov ? C.cyanBdr : C.border}`,
        backdropFilter: "blur(12px)",
        transition: "all 0.25s",
        ...style,
      }}>{children}</div>
  );
}

function Rule() {
  return <div style={{ height: 1, background: C.border, margin: "0 5%" }} />;
}

function Input({ label, type = "text", placeholder, as }) {
  const sharedStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: `1px solid ${C.border}`, color: C.white,
    padding: "0.75rem 1rem", fontSize: "0.88rem", fontWeight: 300,
    outline: "none", transition: "border-color 0.2s",
    marginTop: "0.4rem",
  };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted }}>{label}</label>
      {as === "textarea"
        ? <textarea placeholder={placeholder} rows={4}
            style={{ ...sharedStyle, resize: "vertical" }}
            onFocus={e => e.target.style.borderColor = C.cyan}
            onBlur={e => e.target.style.borderColor = C.border} />
        : as === "select"
        ? <select style={{ ...sharedStyle }}
            onFocus={e => e.target.style.borderColor = C.cyan}
            onBlur={e => e.target.style.borderColor = C.border}>
            <option value="">Please select</option>
            <option>Individual / Self-employed</option>
            <option>Contractor or Consultant</option>
            <option>Small or Medium Business</option>
            <option>Property Investor / Developer</option>
            <option>Start-up / Entrepreneur</option>
            <option>Other</option>
          </select>
        : <input type={type} placeholder={placeholder}
            style={sharedStyle}
            onFocus={e => e.target.style.borderColor = C.cyan}
            onBlur={e => e.target.style.borderColor = C.border} />
      }
    </div>
  );
}

// ── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  const links = ["home", "about", "services", "onboarding", "contact"];
  const labels = { home: "Home", about: "About", services: "Services", onboarding: "Joining Us", contact: "Contact" };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.1rem 5%",
      background: "rgba(13,17,23,0.92)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${C.border}`,
    }}>
      {/* Logo */}
      <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.1em", color: C.white }}>
          NORTH LAKE <span style={{ color: C.cyan }}>ADVISORY</span>
        </div>
      </div>

      {/* Links */}
      <ul style={{ display: "flex", listStyle: "none", gap: "2rem" }}>
        {links.filter(l => l !== "contact").map(l => (
          <li key={l}>
            <a onClick={() => setPage(l)} href="#"
              style={{
                fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase",
                color: page === l ? C.cyan : C.muted,
                borderBottom: page === l ? `1px solid ${C.cyan}` : "1px solid transparent",
                paddingBottom: "2px", transition: "color 0.2s",
              }}>{labels[l]}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <BtnPrimary onClick={() => setPage("contact")} style={{ fontSize: "0.72rem", padding: "0.55rem 1.3rem" }}>
        Contact
      </BtnPrimary>
    </nav>
  );
}

// ── PAGES ────────────────────────────────────────────────────────────────────


// ── HOME───────────────────────────────────

function Home({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "8rem 5% 4rem", position: "relative",
      }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow style={{ justifyContent: "center" }}>Professional Accounting &amp; Advisory — London</Eyebrow>
          <h1 className="fade-up" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
            fontWeight: 400, letterSpacing: "0.05em", lineHeight: 1.0,
            marginBottom: "1.5rem",
          }}>
            WELCOME TO NORTH LAKE<br />
            <Pink>ADVISORY</Pink>
          </h1>
          <p className="fade-up-2" style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 580, margin: "0 auto 1rem" }}>
            North Lake Advisory Ltd provides professional accounting, tax, and business advisory services to individuals, entrepreneurs, contractors, and growing businesses.
          </p>
          <p className="fade-up-2" style={{ color: C.faint, fontSize: "0.88rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 2.5rem" }}>
            We support our clients with practical financial guidance, proactive tax planning, and reliable compliance services, allowing them to focus on running and growing their businesses with confidence.
          </p>
          <div className="fade-up-3" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => setPage("contact")}>Call Us</BtnPrimary>
            <BtnPink onClick={() => setPage("services")}>Our Services</BtnPink>
          </div>
        </div>
      </section>

      {/* Principles band */}
      <div style={{
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        backdropFilter: "blur(8px)", background: "rgba(13,17,23,0.6)",
      }}>
        {[
          { t: "Clarity", b: "Clear, straightforward financial advice so you always understand your financial position." },
          { t: "Proactive Support", b: "We don't just prepare accounts — we help you plan ahead, manage risk, and identify opportunities." },
          { t: "Trusted Partnership", b: "We work closely with clients as long-term advisors, supporting personal and business financial decisions." },
        ].map((p, i) => (
          <div key={i} style={{
            padding: "2rem 2.2rem",
            borderRight: i < 2 ? `1px solid ${C.border}` : "none",
            transition: "background 0.25s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.cyanDim}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.white, marginBottom: "0.6rem" }}>{p.t}</div>
            <p style={{ fontSize: "0.82rem", color: C.muted, lineHeight: 1.7 }}>{p.b}</p>
          </div>
        ))}
      </div>

      {/* Purpose */}
      <section style={{ padding: "5rem 5%", maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <Eyebrow>Our Purpose</Eyebrow>
        <SectionTitle>Navigating Financial Complexity<br /><Pink>With Confidence</Pink></SectionTitle>
        <p className="fade-up-2" style={{ color: C.muted, fontSize: "0.88rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 2.5rem" }}>

     
          At North Lake Advisory Ltd, our purpose is to help individuals and businesses navigate financial complexity with confidence. We exist to provide trusted financial guidance, proactive tax planning, and practical business advice that enables our clients to make informed decisions, remain compliant, and build sustainable long-term success.
        </p>
        <p className="fade-up-2" style={{ color: C.faint, fontSize: "0.88rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 2.5rem" }}>
          Whether you are starting a new business, growing an existing company, or looking to switch accountants — North Lake Advisory is here to help.
        </p>
       <div className="fade-up-3" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>

          <BtnPrimary onClick={() => setPage("about")}>Learn About Us</BtnPrimary>
          <BtnPink onClick={() => setPage("onboarding")}>Join Us Today</BtnPink>
        </div>
      </section>

{/* Vision & Mission */}
<div style={{
  borderTop: `1px solid ${C.border}`,
  background: "rgba(13,17,23,0.6)",
  backdropFilter: "blur(8px)",
}}>
  <div style={{
    maxWidth: 900, margin: "0 auto",
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "4rem", padding: "5rem 5%",
  }}>

    {/* Vision */}
    <div>
      <Eyebrow>Our Vision</Eyebrow>
      <SectionTitle style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
        A Firm Built For <Pink>The Long Term</Pink>
      </SectionTitle>
      <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Our vision is to become a trusted advisory firm recognised for delivering high-quality accounting, tax, and business advisory services to entrepreneurs, professionals, and growing businesses.
      </p>
      <p style={{ color: C.faint, fontSize: "0.88rem", lineHeight: 1.8 }}>
        We aim to build long-term relationships with our clients and become their trusted financial partner throughout every stage of their business journey.
      </p>
    </div>

    {/* Mission */}
    <div>
      <Eyebrow>Our Mission</Eyebrow>
      <SectionTitle style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
        Beyond Compliance, <Pink>Real Value</Pink>
      </SectionTitle>
      <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>
        Our mission is to provide reliable, professional, and forward-thinking financial services that go beyond compliance. We strive to:
      </p>
      <ul style={{ listStyle: "none", marginBottom: "1.2rem" }}>
        {[
          "Deliver accurate and timely financial reporting",
          "Provide proactive tax planning and compliance support",
          "Offer clear and practical financial advice",
          "Help businesses improve performance and manage growth",
        ].map((item, i) => (
          <li key={i} style={{
            fontSize: "0.82rem", color: C.muted,
            padding: "0.45rem 0",
            borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", gap: "0.7rem",
          }}>
            <span style={{ color: C.cyan, flexShrink: 0 }}>›</span>
            {item}
          </li>
        ))}
      </ul>
      <p style={{ color: C.faint, fontSize: "0.85rem", lineHeight: 1.8, fontStyle: "italic" }}>
        Through our work, we aim to create clarity, confidence, and value for our clients.
      </p>
    </div>

  </div>
</div>

    </div>
  );
}



// ── ABOUT───────────────────────────────────


function About({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", padding: "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>About Us</Eyebrow>
        <SectionTitle className="fade-up">A Firm Built On <Pink>Trust &amp; Expertise</Pink></SectionTitle>
      </div>

      <Rule />



 {/* Full-width centred intro */}
      <div style={{
        textAlign: "center", padding: "3rem 10%", marginBottom: "3rem",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 660, margin: "0 auto 1.5rem" }}>
          North Lake Advisory Ltd is a professional accounting and advisory firm dedicated to helping businesses and individuals manage their finances effectively and achieve long-term success. We combine technical accounting expertise with practical commercial insight.
        </p>
        <div style={{
          fontFamily: "'Bebas Neue'", fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          letterSpacing: "0.06em", color: C.pink, lineHeight: 1.35,
        }}>
          "Technical Expertise. Practical Commercial Insight."
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
        {/* Left */}
        <div>


          {[
            { label: "Who We Work With", items: ["Small and medium-sized businesses", "Contractors and consultants", "Property investors and developers", "Entrepreneurs and start-ups"] },
            { label: "Services We Offer", items: ["Accounting and financial reporting", "Tax compliance and tax planning", "Business advisory and strategic support", "Payroll and bookkeeping services", "HMRC compliance, including CIS returns"] },
          ].map((g, i) => (
            <div key={i} style={{ marginTop: "2rem" }}>
              <Eyebrow>{g.label}</Eyebrow>
              <ul style={{ listStyle: "none" }}>
                {g.items.map((item, j) => (
                  <li key={j} style={{
                    padding: "0.55rem 0", borderBottom: `1px solid ${C.border}`,
                    fontSize: "0.85rem", color: C.muted, display: "flex", alignItems: "center", gap: "0.75rem",
                  }}>
                    <span style={{ color: C.cyan, fontSize: "0.8rem", flexShrink: 0 }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right — Values */}
        <div>
          <Eyebrow>Our Values</Eyebrow>
          <SectionTitle style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
            What Guides <Pink>Everything We Do</Pink>
          </SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
            {[
              { name: "Integrity", body: "Honesty, transparency, and professionalism. Trust is the foundation of every client relationship." },
              { name: "Excellence", body: "High-quality work and the highest professional standards in everything we do." },
              { name: "Client Focus", body: "Personalised advice tailored to each client's circumstances and financial goals." },
              { name: "Proactive Advice", body: "Beyond compliance — identifying opportunities and helping clients plan ahead." },
            ].map((v, i) => (
              <Card key={i} style={{ padding: "1.6rem 1.4rem", background: C.card }} >
                <div style={{ fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.5rem" }}>{v.name}</div>
                <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.7 }}>{v.body}</p>
              </Card>
            ))}
            <Card style={{ padding: "1.6rem 1.4rem", background: C.card, gridColumn: "1/-1" }}>
              <div style={{ fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.5rem" }}>Partnership</div>
              <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.7 }}>We work closely with our clients as trusted advisors, supporting them through every stage of their business journey.</p>
            </Card>
          </div>
        </div>
      </div>



      {/* NORTH Principles */}
      <div style={{ maxWidth: 1100, margin: "5rem auto 0" }}>
        <Rule />
        <div style={{ paddingTop: "4rem" }}>
          <Eyebrow>How We Work</Eyebrow>
          <SectionTitle>The <Pink>NORTH</Pink> Principles</SectionTitle>
          <p style={{ color: C.muted, fontSize: "0.92rem", marginBottom: "2.5rem" }}>
            Our work is guided by the NORTH Principles — the values that shape how we support our clients every day.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
            {[
              { l: "N", w: "Navigating Clarity", d: "We help clients navigate financial complexity with clear, practical, reliable advice." },
              { l: "O", w: "Ownership", d: "We take responsibility for the quality of our work, acting with accountability." },
              { l: "R", w: "Relationships", d: "Long-term partnerships built on trust, transparency and genuine collaboration." },
              { l: "T", w: "Trust", d: "Integrity and professionalism are at the heart of everything we do." },
              { l: "H", w: "High Standards", d: "Committed to delivering high-quality work and maintaining the highest standards." },
            ].map((n, i) => (
              <Card key={i} style={{ padding: "2rem 1.6rem", background: C.card, borderLeft: `3px solid transparent`, transition: "all 0.25s" }}
                hover={false}
                onMouseEnter={e => { e.currentTarget.style.background = C.cyanDim; e.currentTarget.style.borderLeftColor = C.cyan; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderLeftColor = "transparent"; }}
              >
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "3.5rem", color: C.pink, lineHeight: 1, marginBottom: "0.4rem" }}>{n.l}</div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.7rem" }}>{n.w}</div>
                <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.7 }}>{n.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div style={{ maxWidth: 1100, margin: "5rem auto 0" }}>
        <Rule />
        <div style={{ paddingTop: "4rem" }}>
          <Eyebrow>Meet the Team</Eyebrow>
          <SectionTitle>The People Behind <Pink>North Lake</Pink></SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem" }}>
            {[
              {
                name: "Matthew Sam",
                credentials: "FCCA, CPA",
                role: "Managing Partner",
                quote: "North Lake Advisory provides the financial clarity and strategic insight that businesses need to grow with confidence. Their practical approach to financial leadership and governance makes complex decisions simpler.",
              },
              {
                name: "Parveen Dookhy",
                credentials: "FCCA, CTA",
                role: "Managing Partner",
                quote: "Sound tax planning and strong financial governance are essential to long-term success. North Lake combines deep technical expertise with practical advice that clients can rely on.",
              },
            ].map((person, i) => (
              <Card key={i} style={{ padding: "2rem", background: C.card, display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                {/* Header: circle + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.3rem" }}>
                  {/* Circular photo placeholder */}
                  <div style={{
                    width: 88, height: 88, borderRadius: "50%", flexShrink: 0,
                    border: `2px dashed ${C.cyanBdr}`,
                    background: "rgba(0,212,232,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 4,
                  }}>
                    <div style={{ fontSize: "1.4rem", color: C.faint, lineHeight: 1 }}>◻</div>
                    <div style={{ fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.faint }}>Photo</div>
                  </div>
                  {/* Name block */}
                  <div>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.3rem" }}>{person.role} · North Lake Advisory</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.55rem", letterSpacing: "0.04em", color: C.white, lineHeight: 1.05, marginBottom: "0.2rem" }}>{person.name}</div>
                    <div style={{ fontSize: "0.72rem", color: C.pink, letterSpacing: "0.08em" }}>{person.credentials}</div>
                  </div>
                </div>
                {/* Divider */}
                <div style={{ height: 1, background: C.border }} />
                {/* Quote */}
                <blockquote style={{ borderLeft: `3px solid ${C.pink}`, paddingLeft: "1rem", margin: 0 }}>
                  <p style={{ fontSize: "0.85rem", color: C.muted, lineHeight: 1.8, fontStyle: "italic" }}>"{person.quote}"</p>
                  <div style={{ marginTop: "0.65rem", fontSize: "0.68rem", color: C.pink, letterSpacing: "0.08em" }}>— {person.name}, {person.credentials}</div>
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}




// ── SERVICES───────────────────────────────────



function Services({ setPage }) {
  const services = [
    {
      title: "Accounting & Financial Reporting",
      lead: "We take the stress out of managing your financial records so you can focus on running your business.",
      items: ["Annual accounts preparation", "Bookkeeping & financial records management", "Management accounts & financial reporting", "VAT compliance services", "Payroll services"],
      footer: "Accurate, compliant, and delivered on time.",
    },
    {
      title: "Tax Planning & HMRC Compliance",
      lead: "Effective tax planning helps you retain more of your hard-earned income while remaining fully compliant.",
      items: ["Personal, Partnership & Corporation tax returns", "Self-assessment & Making Tax Digital support", "Capital gains tax advice", "HMRC enquiry support", "CIS compliance services"],
      footer: "Tax efficiency without unnecessary risk.",
    },
    {
      title: "Business Advisory & Growth Support",
      lead: "Beyond compliance, we help businesses make better financial decisions and grow sustainably.",
      items: ["Business start-up support", "Financial forecasting & budgeting", "Cash flow management", "Profit improvement strategies", "Business structuring & planning"],
      footer: "Your trusted partner for sustainable growth.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>What We Offer</Eyebrow>
        <SectionTitle>Services Designed To <Pink>Support Your Growth</Pink></SectionTitle>
        <p style={{ color: C.muted, fontSize: "0.92rem",  marginBottom: "3rem" }}>
          Professional accounting, tax, and business advisory services for individuals, entrepreneurs and growing businesses. Clarity, confidence and control at every stage.
        </p>
      </div>

      <Rule />

      <div style={{ maxWidth: 1100, margin: "3rem auto 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: C.card, padding: "2.5rem 2rem", backdropFilter: "blur(12px)", position: "relative", overflow: "hidden", transition: "background 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.cyanDim; e.currentTarget.querySelector(".svc-bar").style.transform = "scaleX(1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.querySelector(".svc-bar").style.transform = "scaleX(0)"; }}
          >
            <div className="svc-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.cyan, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s" }} />
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.white, marginBottom: "0.8rem" }}>{s.title}</div>
            <p style={{ fontSize: "0.82rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.7 }}>{s.lead}</p>
            <ul style={{ listStyle: "none" }}>
              {s.items.map((item, j) => (
                <li key={j} style={{
                  fontSize: "0.78rem", color: C.muted, padding: "0.4rem 0",
                  borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "0.6rem",
                }}>
                  <span style={{ color: C.cyan, flexShrink: 0 }}>›</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1.2rem", paddingTop: "1.2rem", borderTop: `1px solid ${C.cyanBdr}`, fontSize: "0.75rem", fontStyle: "italic", color: C.faint }}>{s.footer}</p>
          </div>
        ))}
      </div>

      {/* Who we serve */}
      <div style={{ maxWidth: 1100, margin: "5rem auto 0" }}>
        <Eyebrow>Who We Serve</Eyebrow>
        <SectionTitle style={{ marginBottom: "2rem" }}>Every Stage Of <Pink>Your Journey</Pink></SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
          {[
            { icon: "◈", name: "SMEs", sub: "Small & medium-sized businesses" },
            { icon: "◈", name: "Contractors", sub: "Contractors & consultants" },
            { icon: "◈", name: "Property", sub: "Investors & developers" },
            { icon: "◈", name: "Start-ups", sub: "Entrepreneurs & new ventures" },
          ].map((c, i) => (
            <Card key={i} style={{ padding: "2rem 1.5rem", textAlign: "center", background: C.card }}>
              <div style={{ fontSize: "1.5rem", color: C.cyan, marginBottom: "0.7rem" }}>{c.icon}</div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.white, marginBottom: "0.4rem" }}>{c.name}</div>
              <p style={{ fontSize: "0.75rem", color: C.muted }}>{c.sub}</p>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <BtnPrimary onClick={() => setPage("contact")}>Start With a Free Consultation</BtnPrimary>
        </div>
      </div>
    </div>
  );
}


// ── JOINING US ──────────────────────

function Onboarding({ setPage }) {
  const steps = [
    { title: "Initial Consultation", body: "We begin with a free initial consultation to understand your business, financial needs, and current situation. No obligation — just a straightforward conversation.", list: [] },
    { title: "Proposal & Engagement", body: "Following our discussion, we provide a clear proposal outlining the services we will deliver and the associated fees — transparent from the outset.", list: [] },
    { title: "Switching Process", body: "If you are moving from another accountant, we manage the entire transition on your behalf:", list: ["Contact your previous accountant", "Obtain professional clearance", "Transfer relevant financial information"] },
    { title: "Information & Compliance", body: "To meet anti-money laundering regulatory requirements, we will request:", list: ["Identification documents", "Company details", "Previous financial records"] },
    { title: "Ongoing Support", body: "Once onboarding is complete, we begin providing our services immediately — helping you stay compliant, plan ahead financially, and focus on what matters most: your business.", list: [] },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>Becoming a Client</Eyebrow>
        <SectionTitle>A Simple, Transparent <Pink>Process</Pink></SectionTitle>
        <p style={{ color: C.muted, fontSize: "0.92rem", marginBottom: "0" }}>
          Joining North Lake Advisory Ltd is straightforward. Every step is simple, efficient, and transparent.
        </p>
      </div>

      <Rule style={{ marginTop: "3rem" }} />

      <div style={{ maxWidth: 860, margin: "3rem auto 0" }}>
        {steps.map((s, i) => (
          <div key={i}
            style={{ display: "grid", gridTemplateColumns: "1fr", borderTop: `1px solid ${C.border}`, padding: "2rem 0", transition: "all 0.2s", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.paddingLeft = "1.2rem"; e.currentTarget.style.background = "rgba(0,212,232,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.background = "transparent"; }}
          >
            <div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.6rem" }}>{s.title}</div>
              <p style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.8 }}>{s.body}</p>
              {s.list.length > 0 && (
                <ul style={{ listStyle: "none", marginTop: "0.6rem" }}>
                  {s.list.map((item, j) => (
                    <li key={j} style={{ fontSize: "0.82rem", color: C.faint, padding: "0.2rem 0", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ color: C.cyan, fontSize: "0.7rem" }}>—</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <BtnPrimary onClick={() => setPage("contact")}>Book Your Free Consultation →</BtnPrimary>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", padding: "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>Get In Touch</Eyebrow>
        <SectionTitle>We'd Love To <Pink>Hear From You</Pink></SectionTitle>
      </div>

      <Rule />

      <div style={{ maxWidth: 1100, margin: "4rem auto 0", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "6rem" }}>
        {/* Info */}
        <div>
          <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "2rem" }}>
            If you would like to discuss your accounting, tax, or business advisory needs, we would be happy to help. Get in touch and a member of our team will respond promptly.
          </p>
          {[
            { label: "Phone", val: "01376 431 108" },
            { label: "Mobile", val: "07487 702 492\n07359 937 724" },
            { label: "Email", val: "info@northlakeadvisory.com" },
            { label: "Web", val: "www.northlakeadvisory.com" },
            { label: "Address", val: "Ennis Suite, Unit 4\n419 Wick Lane\nLondon, England, E3 2PW" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: "1.2rem", padding: "0.9rem 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: "0.63rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, minWidth: 72, paddingTop: "0.15rem", flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: "0.85rem", color: C.muted, whiteSpace: "pre-line" }}>{row.val}</span>
            </div>
          ))}

          {/* Free consultation badge */}
          <div style={{
            marginTop: "2rem", padding: "1.2rem 1.5rem",
            border: `1px solid ${C.cyanBdr}`, background: C.cyanDim,
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan, flexShrink: 0, boxShadow: `0 0 12px ${C.cyan}` }} />
            <p style={{ fontSize: "0.82rem", color: C.muted }}>
              We offer a <strong style={{ color: C.white }}>free initial consultation</strong> for all new clients — no obligation.
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <Eyebrow>Send a Message</Eyebrow>
          {sent ? (
            <div style={{ padding: "2rem", border: `1px solid ${C.cyanBdr}`, background: C.cyanDim, textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1.6rem", color: C.cyan, marginBottom: "0.5rem" }}>Message Sent!</div>
              <p style={{ color: C.muted, fontSize: "0.88rem" }}>Thank you for getting in touch. A member of our team will respond shortly.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Input label="First name" placeholder="Jane" />
                <Input label="Last name" placeholder="Smith" />
              </div>
              <Input label="Email address" type="email" placeholder="jane@example.com" />
              <Input label="Phone number" type="tel" placeholder="+44 ..." />
              <Input label="I am a..." as="select" />
              <Input label="How can we help?" as="textarea" placeholder="Tell us about your accounting, tax, or advisory needs..." />
              <BtnPrimary onClick={() => setSent(true)} style={{ width: "100%" }}>Send Message</BtnPrimary>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ setPage }) {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`, padding: "2.5rem 5%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "1.5rem",
      background: "rgba(13,17,23,0.9)", backdropFilter: "blur(12px)",
      position: "relative", zIndex: 10,
    }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.1em", color: C.white }}>
        NORTH LAKE <span style={{ color: C.cyan }}>ADVISORY</span>
      </div>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        {[["home","Home"],["about","About"],["services","Services"],["onboarding","Joining Us"],["contact","Contact"]].map(([id, label]) => (
          <li key={id}><a href="#" onClick={() => setPage(id)} style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = C.cyan}
            onMouseLeave={e => e.target.style.color = C.muted}
          >{label}</a></li>
        ))}
      </ul>
      <div style={{ fontSize: "0.68rem", color: C.faint }}>© 2025 North Lake Advisory Ltd. All rights reserved.</div>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageMap = {
    home:       <Home setPage={navigate} />,
    about:      <About setPage={navigate} />,
    services:   <Services setPage={navigate} />,
    onboarding: <Onboarding setPage={navigate} />,
    contact:    <Contact />,
  };

  return (
    <>
      <StyleTag />
      <PageBg page={page} />
      <Overlay />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Nav page={page} setPage={navigate} />
        <main key={page} className="fade-in">
          {pageMap[page]}
        </main>
        <Footer setPage={navigate} />
      </div>
    </>
  );
}
