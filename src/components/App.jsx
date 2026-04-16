"use client";
import { useState, useEffect } from "react";
import "../app/globals.css";


const C = {
  bg:      "#0d1117", bg2: "#131920", cyan: "#00d4e8",
  cyanDim: "rgba(0,212,232,0.12)", cyanBdr: "rgba(0,212,232,0.28)",
  pink:    "#e94d89", pinkDim: "rgba(233, 77, 137, 0.18)",
  white:   "#ffffff", muted: "rgba(255,255,255,0.90)",
  faint:   "rgba(255,255,255,0.8)", card: "rgba(13,17,23,0.75)",
  border:  "rgba(255,255,255,0.08)",
};

const BG_IMAGES = {
  home:       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
 about:      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=80",
  services:   "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
  onboarding: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
  contact:    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
};


// ── Hook: track window width ──────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false); // ← safe default, no window access

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check(); // run once on mount
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

// ── Reusable components ───────────────────────────────────────────────────────

function PageBg({ page }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0,
      backgroundImage: `url(${BG_IMAGES[page]})`,
	backgroundAttachment: "fixed",  
      backgroundSize: "cover", backgroundPosition: "center",
      opacity: 0.8, transition: "opacity 0.6s", pointerEvents: "none",
    }} />
  );
}

function Overlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1,
      // Lowering opacity from 0.55/0.45 to 0.15/0.05
     background: "linear-gradient(135deg, rgba(30,30,35,0.15) 0%, rgba(40,40,45,0.05) 100%)",
 	pointerEvents: "none",
    }} />
  );
}

function Eyebrow({ children, style }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: "0.75rem", fontWeight: 600,
      fontFamily: "'montserrat', sans-serif",fontSize: "0.88rem", letterSpacing: "0.20em", textTransform: "uppercase",
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
      textAlign: "center",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
      fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.1,
	color: C.white,
      marginBottom: "1rem", ...style,
    }}>{children}</h2>
  );
}

function Pink({ children }) {
  return (
    <span style={{
      color: C.white, textShadow: `0 0 20px ${C.pinkDim}`,
      borderBottom: `3px solid ${C.pink}`, paddingBottom: "2px",
    }}>{children}</span>
  );
}

function BtnPrimary({ children, onClick, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
background: hov ? "rgba(0,212,232,0.85)" : C.cyan,  // ← solid cyan always
        color: C.bg,  
borderRadius: "4px",   // ← add this
        
        border: `2px solid ${C.cyan}`, padding: "0.72rem 2rem",
        fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.14em",
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
        background: C.pink , color: C.white ,
        border: `2px solid ${C.pink}`, padding: "0.72rem 2rem",
borderRadius: "4px",   // ← add this
        fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.14em",
        textTransform: "uppercase", transition: "all 0.22s", ...style,
      }}>{children}</button>
  );
}

function Card({ children, style, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => hover && setHov(true)} onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov ? "rgba(0,212,232,0.06)" : C.card,
        border: `1px solid ${hov ? C.cyanBdr : C.border}`,
        backdropFilter: "blur(12px)", transition: "all 0.25s", ...style,
      }}>{children}</div>
  );
}

function Rule() { return <div style={{ height: 1, background: C.border, margin: "0 5%" }} />; }

// ── NAV (with hamburger) ──────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["home", "about", "services", "onboarding", "contact"];
  const labels = { home: "Home", about: "About", services: "Services", onboarding: "Joining Us", contact: "Contact" };

  const navigate = (id) => { setPage(id); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.0rem 5%",
        background: "#0B1E3B", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
   {/* Logo */}
        <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.7rem" }}>
         <img src="/logo.png" alt="North Lake Advisory Logo" style={{ height: 60, width: "auto", display: "block", mixBlendMode: "lighten" }} />

          <div style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700,
  fontSize: "1.rem", 
  letterSpacing: "0.2em", 
  color: C.white }}>
            NORTH LAKE ADVISORY
          </div>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", listStyle: "none", gap: "2rem" }}>
            {links.filter(l => l !== "contact").map(l => (
              <li key={l}>
                <a onClick={() => navigate(l)} href="#" style={{
                  fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  color: page === l ? C.cyan : C.muted,
                  borderBottom: page === l ? `1px solid ${C.cyan}` : "1px solid transparent",
                  paddingBottom: "2px", transition: "color 0.2s",
                }}>{labels[l]}</a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop CTA / Mobile hamburger */}
        {!isMobile ? (
          <BtnPrimary onClick={() => navigate("contact")} style={{ fontSize: "0.72rem", padding: "0.55rem 1.3rem" }}>
            Contact
          </BtnPrimary>
        ) : (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", color: C.white, fontSize: "1.5rem",
            padding: "0.25rem", lineHeight: 1,
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: "56px", left: 0, right: 0, zIndex: 499,
          background: "#0B1E3B", backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`, padding: "1rem 5% 1.5rem",
        }}>
          {links.map(l => (
            <div key={l} onClick={() => navigate(l)} style={{
              padding: "0.9rem 0", borderBottom: `1px solid ${C.border}`,
              fontSize: "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: page === l ? C.cyan : C.muted, cursor: "pointer",
            }}>{labels[l]}</div>
          ))}
        </div>
      )}
    </>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function Home({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: isMobile ? "7rem 5% 3rem" : "8rem 5% 4rem",
      }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow style={{ justifyContent: "center" }}>Professional Accounting & Advisory</Eyebrow>

          <h1 className="fade-up" style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2.2rem, 8vw, 4.0rem)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            color: C.white
          }}>
            WELCOME TO <br /> NORTH LAKE <br />
            <span style={{
              position: 'relative',
              display: 'inline-block',
              zIndex: 1,
              padding: '0 10px'
            }}>
              ADVISORY
              <span style={{
                position: 'absolute',
                left: 0,
                bottom: '10%',
                width: '100%',
                height: '35%',
                backgroundColor: C.pink,
                zIndex: -1,
                transform: 'rotate(-2deg)'
              }} />
            </span>
          </h1>

          <p className="fade-up-2" style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 580, margin: "0 auto 1rem" }}>
            North Lake Advisory Ltd provides Professional Accounting, Tax, and Business Advisory services to individuals, entrepreneurs, contractors, and growing businesses.
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
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        backdropFilter: "blur(8px)", background: "rgba(13,17,23,0.6)",
      }}>
        {[
          { t: "Clarity", b: "Clear, straightforward financial advice so you always understand your financial position." },
          { t: "Proactive Support", b: "We don't just prepare accounts — we help you plan ahead, manage risk, and identify opportunities." },
          { t: "Trusted Partnership", b: "We work closely with clients as long-term advisors, supporting personal and business financial decisions." },
        ].map((p, i) => (
          <div key={i} style={{
            padding: "2rem 2.2rem",
            borderRight: !isMobile && i < 2 ? `1px solid ${C.border}` : "none",
            borderBottom: isMobile && i < 2 ? `1px solid ${C.border}` : "none",
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
      <section style={{ padding: isMobile ? "3rem 5%" : "5rem 5%", maxWidth: 900, margin: "0 auto", width: "100%", textAlign: isMobile ? "center" : "center" }}>
        <Eyebrow style={isMobile ? { justifyContent: "center",width: "100%", textAlign: "center"} : {}}>Our Purpose</Eyebrow>


        <SectionTitle>Navigating Financial Complexity<br /><Pink>With Confidence</Pink></SectionTitle>
        <p style={{ color: C.white, fontSize: "1.0rem", lineHeight: 1.85, marginBottom: "1rem" }}>
          At North Lake Advisory Ltd, our purpose is to help individuals and businesses navigate financial complexity with confidence. We exist to provide trusted financial guidance, proactive tax planning, and practical business advice that enables our clients to make informed decisions, remain compliant, and build sustainable long-term success.
        </p>
        <p style={{ color: C.white, fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Whether you are starting a new business, growing an existing company, or looking to switch accountants — North Lake Advisory is here to help.
        </p>
        <div style={{ 
  display: "flex", 
  gap: "1rem", 
  width: "100%", // Ensures the flexbox spans the full section width
  justifyContent: "center", // Fixed to center for all screen sizes
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "2rem" 
}}>
          <BtnPrimary onClick={() => setPage("about")}>Learn About Us</BtnPrimary>
          <BtnPink onClick={() => setPage("onboarding")}>Join Us Today</BtnPink>
        </div>
      </section>

      {/* Vision & Mission */}
      <div style={{ borderTop: `1px solid ${C.border}`, background: "rgba(13,17,23,0.6)", backdropFilter: "blur(8px)" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "4rem", padding: isMobile ? "3rem 5%" : "5rem 5%",
        }}>
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <SectionTitle style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>A Firm Built For The Long Term</SectionTitle>
            <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1rem" }}>
              Our vision is to become a trusted advisory firm recognised for delivering high-quality accounting, tax, and business advisory services to entrepreneurs, professionals, and growing businesses.
            </p>
            <p style={{ color: C.faint, fontSize: "0.88rem", lineHeight: 1.8 }}>
              We aim to build long-term relationships with our clients and become their trusted financial partner throughout every stage of their business journey.
            </p>
          </div>
          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <SectionTitle style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}><White>Beyond Compliance, Real Value</white></SectionTitle>
            <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>
              Our mission is to provide reliable, professional, and forward-thinking financial services that go beyond compliance. We strive to:
            </p>
            <ul style={{ listStyle: "none", listStyle: "none", 
  padding: 0,           // Add this to remove default browser indent
  margin: 0,            // Ensures no outer spacing issues
  textAlign: "left",    // Explicitly force text alignment
  marginBottom: "1.2rem" }}>
              {[
                "Deliver accurate and timely financial reporting",
                "Provide proactive tax planning and compliance support",
                "Offer clear and practical financial advice",
                "Help businesses improve performance and manage growth",
		"Through our work, we aim to create clarity, confidence, and value for our clients",
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: "0.82rem", color: C.muted, padding: "0.45rem 0",
                  borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "0.7rem",
                }}>
                  <span style={{ color: C.cyan, flexShrink: 0 }}>›</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "6rem 5% 3rem" : "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      
        <SectionTitle>A Firm Built On <Pink>Trust &amp; Expertise</Pink></SectionTitle>
      </div>

      <Rule />

      {/* Full-width centred intro */}
      <div style={{ textAlign: "center", padding: isMobile ? "2rem 5%" : "3rem 10%", marginBottom: "3rem", borderBottom: `1px solid ${C.border}` }}>
        <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: 660, margin: "0 auto 1.5rem" }}>
          North Lake Advisory Ltd is a professional accounting and advisory firm dedicated to helping businesses and individuals manage their finances effectively and achieve long-term success. We combine technical accounting expertise with practical commercial insight.
        </p>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "0.06em", color: C.cyan, lineHeight: 1.35 }}>
          Technical Expertise. Practical Commercial Insight.
        </div>
      </div>

      {/* Two columns */}
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem" }}>
{/* Left */}
        <div>
          {[
            { label: "Who We Work With", items: ["Small and medium-sized businesses", "Contractors and consultants", "Property investors and developers", "Entrepreneurs and start-ups"] },
            { label: "What We work on", items: ["Accounting and financial reporting", "Tax compliance and tax planning", "Business advisory and strategic support", "Payroll and bookkeeping services", "HMRC compliance, including CIS returns"] },
          ].map((g, i) => (
            <div key={i} style={{ marginTop: "2rem" }}>
              <Eyebrow>{g.label}</Eyebrow>
              {/* Card with backdrop blur */}
              <div style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                backdropFilter: "blur(14px)",
                overflow: "hidden",
              }}>
                {g.items.map((item, j) => (
                  <div key={j} style={{
                    padding: "0.85rem 1.2rem",
                    borderBottom: j < g.items.length - 1 ? `1px solid ${C.border}` : "none",
                    fontSize: "0.88rem", color: C.muted,
                    display: "flex", alignItems: "center", gap: "0.85rem",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = C.cyanDim}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: C.cyan, flexShrink: 0,
                      boxShadow: `0 0 6px ${C.cyan}`,
                    }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


        {/* Right — Values */}
        <div>
          <Eyebrow>Our Values</Eyebrow>
          <SectionTitle style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>What Guides <Pink>Everything We Do</Pink></SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
            {[
              { name: "Integrity", body: "Honesty, transparency, and professionalism. Trust is the foundation of every client relationship." },
              { name: "Excellence", body: "High-quality work and the highest professional standards in everything we do." },
              { name: "Client Focus", body: "Personalised advice tailored to each client's circumstances and financial goals." },
              { name: "Proactive Advice", body: "Beyond compliance — identifying opportunities and helping clients plan ahead." },
            ].map((v, i) => (
              <Card key={i} style={{ padding: "1.6rem 1.4rem", background: C.card }}>
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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
            {[
              { l: "N", w: "Navigating Clarity", d: "We help clients navigate financial complexity with clear, practical, reliable advice." },
              { l: "O", w: "Ownership", d: "We take responsibility for the quality of our work, acting with accountability." },
              { l: "R", w: "Relationships", d: "Long-term partnerships built on trust, transparency and genuine collaboration." },
              { l: "T", w: "Trust", d: "Integrity and professionalism are at the heart of everything we do." },
              { l: "H", w: "High Standards", d: "Committed to delivering high-quality work and maintaining the highest standards." },
            ].map((n, i) => (
              <div key={i} style={{ padding: "2rem 1.6rem", background: C.card, borderLeft: "3px solid transparent", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.cyanDim; e.currentTarget.style.borderLeftColor = C.cyan; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderLeftColor = "transparent"; }}
              >
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "3.5rem", color: C.white, lineHeight: 1, marginBottom: "0.4rem" }}>{n.l}</div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.7rem" }}>{n.w}</div>
                <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.7 }}>{n.d}</p>
              </div>
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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem", marginTop: "2rem" }}>
            {[
              { name: "Matthew Sam", credentials: "FCCA, CPA", role: "Managing Partner", quote: "North Lake Advisory provides the financial clarity and strategic insight that businesses need to grow with confidence. Our practical approach to financial leadership and governance makes complex decisions simpler." },
              { name: "Parveen Dookhy", credentials: "FCCA, CTA", role: "Managing Partner", quote: "Sound tax planning and strong financial governance are essential to long-term success. North Lake combines deep technical expertise with practical advice that clients can rely on." },
            ].map((person, i) => (
              <Card key={i} style={{ padding: "2rem", background: C.card, display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.3rem" }}>
                  <div style={{ width: 88, height: 88, borderRadius: "50%", flexShrink: 0, border: `2px dashed ${C.cyanBdr}`, background: "rgba(0,212,232,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                    <div style={{ fontSize: "1.4rem", color: C.faint, lineHeight: 1 }}>◻</div>
                    <div style={{ fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.faint }}>Photo</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, marginBottom: "0.3rem" }}>{person.role} · North Lake Advisory</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.55rem", letterSpacing: "0.04em", color: C.white, lineHeight: 1.05, marginBottom: "0.2rem" }}>{person.name}</div>
                    <div style={{ fontSize: "0.72rem", color: C.pink, letterSpacing: "0.08em" }}>{person.credentials}</div>
                  </div>
                </div>
                <div style={{ height: 1, background: C.border }} />
                <blockquote style={{ borderLeft: `3px solid ${C.pink}`, paddingLeft: "1rem", margin: 0 }}>
                  <p style={{ fontSize: "0.75rem", color: C.muted, lineHeight: 1.8}}>{person.quote}</p>
                
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function Services({ setPage }) {
  const isMobile = useIsMobile();
  const services = [
    { title: "Accounting & Financial Reporting", lead: "We take the stress out of managing your financial records so you can focus on running your business.", items: ["Annual accounts preparation", "Bookkeeping & financial records management", "Management accounts & financial reporting", "VAT compliance services", "Payroll services"], footer: "Accurate, compliant, and delivered on time." },
    { title: "Tax Planning & HMRC Compliance", lead: "Effective tax planning helps you retain more of your hard-earned income while remaining fully compliant.", items: ["Personal, Partnership & Corporation tax returns", "Self-assessment & Making Tax Digital support", "Capital gains tax advice", "HMRC enquiry support", "CIS compliance services"], footer: "Tax efficiency without unnecessary risk." },
    { title: "Business Advisory & Growth Support", lead: "Beyond compliance, we help businesses make better financial decisions and grow sustainably.", items: ["Business start-up support", "Financial forecasting & budgeting", "Cash flow management", "Profit improvement strategies", "Business structuring & planning"], footer: "Your trusted partner for sustainable growth." },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "6rem 5% 3rem" : "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>What We Offer</Eyebrow>
        <SectionTitle>Services Designed To <Pink>Support Your Growth</Pink></SectionTitle>
        <p style={{ color: C.muted, fontSize: "0.92rem", marginBottom: "3rem" }}>
          Professional accounting, tax, and business advisory services for individuals, entrepreneurs and growing businesses. Clarity, confidence and control at every stage.
        </p>
      </div>

      <Rule />

      <div style={{ maxWidth: 1100, margin: "3rem auto 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: C.card, padding: "2.5rem 2rem", backdropFilter: "blur(12px)", position: "relative", overflow: "hidden", transition: "background 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.cyanDim; e.currentTarget.querySelector(".svc-bar").style.transform = "scaleX(1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.querySelector(".svc-bar").style.transform = "scaleX(0)"; }}
          >
            <div className="svc-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.cyan, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s" }} />
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.white, marginBottom: "0.8rem" }}>{s.title}</div>
            <p style={{ fontSize: "0.82rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.7 }}>{s.lead}</p>
            <ul style={{ listStyle: "none", 
  padding: 0,           // CRITICAL: Removes the default browser indent
  margin: 0,            // Reset margins to prevent layout shifts
  textAlign: "left" }}>
              {s.items.map((item, j) => (
                <li key={j} style={{ fontSize: "0.78rem", color: C.muted, padding: "0.4rem 0", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "0.6rem",justifyContent: "flex-start" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
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

// ── JOINING US ────────────────────────────────────────────────────────────────
function Onboarding({ setPage }) {
  const isMobile = useIsMobile();
  const steps = [
    { title: "Initial Consultation", body: "We begin with a free initial consultation to understand your business, financial needs, and current situation. No obligation — just a straightforward conversation.", list: [] },
    { title: "Proposal & Engagement", body: "Following our discussion, we provide a clear proposal outlining the services we will deliver and the associated fees — transparent from the outset.", list: [] },
    { title: "Switching Process", body: "If you are moving from another accountant, we manage the entire transition on your behalf:", list: ["Contact your previous accountant", "Obtain professional clearance", "Transfer relevant financial information"] },
    { title: "Information & Compliance", body: "To meet anti-money laundering regulatory requirements, we will request:", list: ["Identification documents", "Company details", "Previous financial records"] },
    { title: "Ongoing Support", body: "Once onboarding is complete, we begin providing our services immediately — helping you stay compliant, plan ahead financially, and focus on what matters most: your business.", list: [] },
  ];

  return (
   <div style={{ minHeight: "100vh", padding: isMobile ? "6rem 5% 3rem" : "8rem 5% 5rem", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>Becoming a Client</Eyebrow>
        <SectionTitle>A Simple, Transparent <Pink>Process</Pink></SectionTitle>
        <p style={{ color: C.muted, fontSize: "0.92rem", marginBottom: "0" }}>
          Joining North Lake Advisory Ltd is straightforward. Every step is simple, efficient, and transparent.
        </p>
      </div>

      <Rule style={{ marginTop: "3rem" }} />

      <div style={{ maxWidth: 860, margin: "3rem auto 0", position: "relative" }}>
        {!isMobile && (
          <div style={{
            position: "absolute", left: 27, top: 28, bottom: 80,
            width: 2,
            background: `linear-gradient(to bottom, ${C.cyan}, ${C.pink})`,
            zIndex: 0,
          }} />
        )}
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", position: "relative", zIndex: 1 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
              background: C.bg, border: `2px solid ${C.cyan}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue'", fontSize: "1.2rem", color: C.cyan, zIndex: 2,
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ flex: 1, borderLeft: `1px solid ${C.border}`, padding: "0.2rem 1.4rem", transition: "border-color 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.cyan}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
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
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <BtnPrimary onClick={() => setPage("contact")}>Book Your Free Consultation →</BtnPrimary>
        </div>
      </div>
	</div>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const isMobile = useIsMobile();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", type: "", message: "" });

  const handle = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      alert("Please fill in at least your name, email, and message.");
      return;
    }
    setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzHmdrEqezI2dxFszq89IxpCIUNwKKw6w9TZrVA3dDW_Kp3osWP4IJ8pHj7l-HvV5P0wg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };


const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.6)",   // ← white-ish fields
  border: "none",
  color: C.bg,                            // ← dark text inside input
  padding: "0.75rem 1rem",
  fontSize: "0.88rem",
  outline: "none",
  marginTop: "0.4rem",
};


  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "6rem 5% 3rem" : "8rem 5% 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow>Get In Touch</Eyebrow>
        <SectionTitle>We'd Love To <Pink>Hear From You</Pink></SectionTitle>
      </div>
      <Rule />
      <div style={{ maxWidth: 1100, margin: "4rem auto 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr", gap: isMobile ? "2.5rem" : "6rem" }}>
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
          <div style={{ marginTop: "2rem", padding: "1.2rem 1.5rem", border: `1px solid ${C.cyanBdr}`, background: C.cyanDim, display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan, flexShrink: 0, boxShadow: `0 0 12px ${C.cyan}` }} />
            <p style={{ fontSize: "0.82rem", color: C.muted }}>
              We offer a <strong style={{ color: C.white }}>free initial consultation</strong> for all new clients — no obligation.
            </p>
          </div>
        </div>

        {/* Form */}
<div style={{ background: C.cyan, padding: "2.5rem" }}>
  <Eyebrow style={{ color: C.bg }}>Send a Message</Eyebrow>
  {sent ? (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <div style={{ fontFamily: "'Montserrat'", fontSize: "1.6rem", color: C.bg, marginBottom: "0.5rem" }}>Message Sent!</div>
      <p style={{ color: C.bg, fontSize: "0.88rem" }}>Thank you for getting in touch. A member of our team will respond shortly.</p>
    </div>
  ) : (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, fontWeight: 600 }}>First Name</label>
          <input value={form.firstName} onChange={handle("firstName")} placeholder="Jane" style={{ width: "100%", background: "rgba(255,255,255,0.6)", border: "none", color: C.bg, padding: "0.75rem 1rem", fontSize: "0.88rem", outline: "none", marginTop: "0.4rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, fontWeight: 600 }}>Last Name</label>
          <input value={form.lastName} onChange={handle("lastName")} placeholder="Smith" style={{ width: "100%", background: "rgba(255,255,255,0.6)", border: "none", color: C.bg, padding: "0.75rem 1rem", fontSize: "0.88rem", outline: "none", marginTop: "0.4rem" }} />
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, fontWeight: 600 }}>Email Address</label>
        <input value={form.email} onChange={handle("email")} type="email" placeholder="jane@example.com" style={{ width: "100%", background: "rgba(255,255,255,0.6)", border: "none", color: C.bg, padding: "0.75rem 1rem", fontSize: "0.88rem", outline: "none", marginTop: "0.4rem" }} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, fontWeight: 600 }}>Phone Number</label>
        <input value={form.phone} onChange={handle("phone")} type="tel" placeholder="+44 ..." style={{ width: "100%", background: "rgba(255,255,255,0.6)", border: "none", color: C.bg, padding: "0.75rem 1rem", fontSize: "0.88rem", outline: "none", marginTop: "0.4rem" }} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, fontWeight: 600 }}>I Am A...</label>
        <select value={form.type} onChange={handle("type")} style={{ width: "100%", background: "rgba(255,255,255,0.6)", border: "none", color: C.bg, padding: "0.75rem 1rem", fontSize: "0.88rem", outline: "none", marginTop: "0.4rem" }}>
          <option value="">Please select</option>
          <option>Individual / Self-employed</option>
          <option>Contractor or Consultant</option>
          <option>Small or Medium Business</option>
          <option>Property Investor / Developer</option>
          <option>Start-up / Entrepreneur</option>
          <option>Other</option>
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, fontWeight: 600 }}>How Can We Help?</label>
        <textarea value={form.message} onChange={handle("message")} rows={4} placeholder="Tell us about your accounting, tax, or advisory needs..." style={{ width: "100%", background: "rgba(255,255,255,0.6)", border: "none", color: C.bg, padding: "0.75rem 1rem", fontSize: "0.88rem", outline: "none", marginTop: "0.4rem", resize: "vertical" }} />
      </div>
      <BtnPrimary onClick={handleSubmit} style={{ width: "100%", opacity: loading ? 0.6 : 1, background: C.bg, color: C.white, borderColor: C.bg }}>
        {loading ? "Sending..." : "Send Message"}
      </BtnPrimary>
    </div>
  )}
</div>

      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`, padding: "2.5rem 5%",
      display: "flex", alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem",
      background: "#0B1E3B", backdropFilter: "blur(12px)",
      position: "relative", zIndex: 10,
    }}>
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <img src="/logo.png" alt="North Lake Advisory Logo" style={{ height: 30, width: "auto", display: "block", mixBlendMode: "lighten" }} />
        <div style={{ fontFamily: "'Raleway', sans-serif", 
  fontWeight: 700,
  fontSize: "0.85rem", 
  letterSpacing: "0.2em", 
  color: C.white }}>
          NORTH LAKE ADVISORY
        </div>
      </div>
      <ul style={{ display: "flex", gap: isMobile ? "1.2rem" : "2rem", listStyle: "none", flexWrap: "wrap" }}>
        {[["home","Home"],["about","About"],["services","Services"],["onboarding","Joining Us"],["contact","Contact"]].map(([id, label]) => (
          <li key={id}>
           <a 
  href="#" 
  onClick={() => setPage(id)} 
  style={{ 
    // Add the fontFamily here:
    fontFamily: "'Archivo Black', sans-serif", 
    fontSize: "0.65rem", // Slightly increased as Archivo Black can be thick
    fontWeight: "200",    // Archivo Black is naturally heavy
    letterSpacing: "0.15em", 
    textTransform: "uppercase", 
    color: C.muted, 
    transition: "color 0.2s" 
  }}
  onMouseEnter={e => e.target.style.color = C.cyan}
  onMouseLeave={e => e.target.style.color = C.white}
>
  {label}
</a>
          </li>
        ))}
      </ul>
      {/* Social / Contact Icons */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/north-lake-advisory-ltd/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${C.cyanBdr}`, background: C.cyanDim,
            color: C.cyan, transition: "all 0.22s", textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.cyan; e.currentTarget.style.color = C.bg; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.cyanDim; e.currentTarget.style.color = C.cyan; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.977 1.977 0 01-1.972-1.98c0-1.093.884-1.98 1.972-1.98 1.089 0 1.973.887 1.973 1.98 0 1.093-.884 1.98-1.973 1.98zm1.712 13.019H3.623V9h3.426v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/447487702492"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid rgba(37,211,102,0.3)", background: "rgba(37,211,102,0.1)",
            color: "#25D366", transition: "all 0.22s", textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,0.1)"; e.currentTarget.style.color = "#25D366"; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* Call */}
        <a
          href="tel:+447487702492"
          title="Call Us"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${C.pink}`, background: C.pinkDim,
            color: C.pink, transition: "all 0.22s", textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.pink; e.currentTarget.style.color = C.white; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.pinkDim; e.currentTarget.style.color = C.pink; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "center", textAlign: "center", marginLeft: "auto" }}>
  <div style={{ fontSize: "0.68rem", color: C.faint }}>© 2026 North Lake Advisory Ltd. All rights reserved.</div>
  <div style={{ fontSize: "0.62rem", color: C.faint , textAlign: "center" }}>
    Designed &amp; Built by{" "}
<a 
  href="https://dibsonai.com/" 
  target="_blank" 
  rel="noopener noreferrer"
  style={{ 
    color: C.cyan, 
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textDecoration: "none",
    borderBottom: `1px solid ${C.cyanBdr}`,
    paddingBottom: "1px",
    transition: "color 0.2s, borderColor 0.2s",
  }}
  onMouseEnter={e => e.target.style.color = C.white}
  onMouseLeave={e => e.target.style.color = C.cyan}
>
  DIBSONAI
</a>

  </div>
</div>

    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
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
