import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LatticeCanvas } from "./components/LatticeCanvas";

// ─── Animation config ─────────────────────────────────────────────────────────

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.215, 0.61, 0.355, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

// ─── Content ──────────────────────────────────────────────────────────────────

const thesisCards = [
  {
    label: "Rapid iteration",
    title: "Validate fast, kill fast.",
    body: "Human-agent loops run experiments at machine speed. We know what works before the market does.",
  },
  {
    label: "Parallel scaling",
    title: "Many bets, one team.",
    body: "Shared infra lets us run multiple products simultaneously — without growing headcount linearly.",
  },
  {
    label: "End-to-end agentic",
    title: "Agents own the full stack.",
    body: "From scaffold to deploy, agents handle execution. Humans steer direction and make allocation calls.",
  },
];



// ─── Section Rule (replaces signal divider) ───────────────────────────────────

function SectionRule() {
  return (
    <div className="layout-shell" aria-hidden>
      <div className="section-rule" />
    </div>
  );
}

// ─── LogoMark ─────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="var(--accent)" strokeWidth="1.6" opacity="0.9" />
      <circle cx="12" cy="12" r="2.4" fill="var(--accent)" />
      <path d="M16.8 4.9a8.6 8.6 0 0 1 2.7 2.7" fill="none" stroke="var(--bg)" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────

function Page() {
  const rm = useReducedMotion();

  return (
    <div
      className="variant variant-a font-caps"
      style={{
        "--font-display": '"Satoshi", system-ui, sans-serif',
        "--font-body": '"Satoshi", system-ui, sans-serif',
        "--caps-weight": 400,
      } as React.CSSProperties}
    >
      <div className="va-chrome" aria-hidden />

      <header className="site-header">
        <motion.div
          className="header-inner"
          initial={rm ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="wordmark">
            <LogoMark />
            <span>Orchestrate Inc.</span>
          </span>
          <div className="header-meta">
            <span className="header-chip">Partnership inquiries</span>
            <a href="mailto:inquiries@orchestrateholdings.com" className="header-link">inquiries@orchestrateholdings.com</a>
          </div>
        </motion.div>
      </header>

      <main className="page-shell">

        {/* HERO */}
        <section className="hero">
          <div className="layout-shell hero-layout">
            <motion.div className="hero-copy" initial={rm ? false : "hidden"} animate="visible" variants={stagger}>
              <motion.p className="eyebrow" variants={reveal}>AI-native product studio</motion.p>
              <motion.h1 variants={reveal}>Agentic Iteration &amp; Parallel Scaling.</motion.h1>
              <motion.p className="hero-body" variants={reveal}>
                We've compressed the venture lifecycle. Autonomous agents build, test, and launch
                multiple products in parallel — finding product-market fit at terminal velocity.
              </motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <a href="#what-we-do" className="primary-link">What we do</a>
                <a href="mailto:inquiries@orchestrateholdings.com" className="secondary-link">Work with us</a>
              </motion.div>
              <motion.div className="hero-note-row" variants={reveal}>
                <span>Rapid iteration</span>
                <span>Parallel scaling</span>
                <span>End-to-end agentic</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual-shell"
              initial={rm ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="hero-visual-frame">
                <div className="frame-topbar">
                  <span>Human nodes</span>
                  <span>Agent nodes</span>
                </div>
                <LatticeCanvas className="systems-canvas" reduceMotion={Boolean(rm)} theme="light" />
              </div>
              <div className="hero-legend">
                <div className="legend-item">
                  <span className="visual-badge-label">Human nodes</span>
                  <strong>Direct and steer.</strong>
                </div>
                <div className="legend-item">
                  <span className="visual-badge-label">Agent nodes</span>
                  <strong>Build and surface.</strong>
                </div>
                <div className="legend-item">
                  <span className="visual-badge-label">Signals</span>
                  <strong>Both directions.</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THESIS */}
        <section className="section section-tight" id="what-we-do">
          <div className="layout-shell">
            <motion.div
              className="section-intro"
              initial={rm ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={reveal}>What we do</motion.p>
              <motion.h2 variants={reveal}>Three pillars. One continuous system.</motion.h2>
            </motion.div>
            <motion.div
              className="thesis-grid"
              initial={rm ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              {thesisCards.map(card => (
                <motion.article className="thesis-card" key={card.title} variants={reveal}>
                  <span className="card-label">{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionRule />

        {/* CTA */}
        <section className="section cta-section">
          <div className="layout-shell">
            <motion.div
              className="cta-panel"
              initial={rm ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={reveal}>Work with us</motion.p>
              <motion.h2 variants={reveal}>Rapid iteration. Parallel scale. End-to-end.</motion.h2>
              <motion.div className="cta-actions" variants={reveal}>
                <a href="mailto:inquiries@orchestrateholdings.com" className="primary-link">inquiries@orchestrateholdings.com</a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="layout-shell footer-inner">
          <span className="wordmark"><LogoMark /><span>Orchestrate Inc.</span></span>
          <div className="footer-meta">
            <span className="footer-copy">© 2026 Orchestrate Inc.</span>
            <span className="footer-copy">Delaware corporation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-variant", "a");
  }, []);

  return <Page />;
}
