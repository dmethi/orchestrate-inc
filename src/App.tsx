import { motion, useReducedMotion } from "framer-motion";
import { SystemsCanvas } from "./components/SystemsCanvas";

function LogoMark() {
  return (
    <svg
      className="logo-mark"
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <circle cx="12" cy="12" r="8.5" className="logo-mark-ring" />
      <circle cx="12" cy="12" r="2.4" className="logo-mark-core" />
      <path d="M16.8 4.9a8.6 8.6 0 0 1 2.7 2.7" className="logo-mark-cut" />
    </svg>
  );
}

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const thesisCards = [
  {
    label: "Human judgment",
    title: "Start with the hard problem.",
    body: "Humans define the constraint and the call.",
  },
  {
    label: "Agent systems",
    title: "Agents run the surrounding system.",
    body: "Tooling, testing, and iteration stay fast.",
  },
  {
    label: "Portfolio discipline",
    title: "Capital moves with signal.",
    body: "Validation stays cheap. Scale stays decisive.",
  },
];

const operatingSteps = [
  {
    index: "01",
    title: "Define",
    body: "Humans frame the constraint.",
  },
  {
    index: "02",
    title: "Provision",
    body: "Agents set up tooling, environments, and tests.",
  },
  {
    index: "03",
    title: "Validate",
    body: "The loop returns signal for allocation.",
  },
];

const portfolioStates = [
  { name: "Exploration", stage: "Low-cost discovery", accent: "quiet" },
  { name: "Validation", stage: "Signal gathering", accent: "active" },
  { name: "Acceleration", stage: "Resource expansion", accent: "active" },
  { name: "Shared infra", stage: "Always-on leverage", accent: "infra" },
];

function App() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="page-chrome" aria-hidden>
        <div className="chrome-grid" />
        <div className="chrome-glow chrome-glow-left" />
        <div className="chrome-glow chrome-glow-right" />
      </div>

      <header className="site-header">
        <motion.div
          className="header-inner"
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <span className="wordmark">
            <LogoMark />
            <span>Orchestrate Inc.</span>
          </span>
          <div className="header-meta">
            <span className="header-chip">Partnership inquiries</span>
            <a href="mailto:hello@orchestrateinc.com" className="header-link">
              hello@orchestrateinc.com
            </a>
          </div>
        </motion.div>
      </header>

      <main className="page-shell">
        <section className="hero">
          <div className="layout-shell hero-layout">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={sectionReveal}>
                AI-native holding company
              </motion.p>
              <motion.h1 variants={sectionReveal}>
                Agentic leverage. Disciplined allocation.
              </motion.h1>
              <motion.p className="hero-body" variants={sectionReveal}>
                We develop and scale software products through human judgment,
                agent systems, and shared infrastructure.
              </motion.p>
              <motion.div className="hero-actions" variants={sectionReveal}>
                <a href="#operating-model" className="primary-link">
                  See how we operate
                </a>
                <a href="mailto:hello@orchestrateinc.com" className="secondary-link">
                  For partnerships
                </a>
              </motion.div>
              <motion.div className="hero-note-row" variants={sectionReveal}>
                <span>Human judgment</span>
                <span>Agent systems</span>
                <span>Portfolio discipline</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual-shell"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="hero-visual-frame">
                <div className="frame-topbar">
                  <span>Human signal</span>
                  <span>Agent loops</span>
                </div>
                <SystemsCanvas
                  className="systems-canvas"
                  reduceMotion={Boolean(reduceMotion)}
                />
              </div>
              <div className="hero-legend" aria-hidden>
                <div className="legend-item">
                  <span className="visual-badge-label">Human core</span>
                  <strong>Define the problem.</strong>
                </div>
                <div className="legend-item">
                  <span className="visual-badge-label">Agent systems</span>
                  <strong>Provision and test.</strong>
                </div>
                <div className="legend-item">
                  <span className="visual-badge-label">Portfolio logic</span>
                  <strong>Shift to signal.</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="layout-shell">
            <motion.div
              className="section-intro"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={sectionReveal}>
                What we do
              </motion.p>
              <motion.h2 variants={sectionReveal}>
                A holding company built around agentic engineering.
              </motion.h2>
              <motion.p className="section-body" variants={sectionReveal}>
                Software creation and allocation run as one system.
              </motion.p>
            </motion.div>

            <motion.div
              className="thesis-grid"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              {thesisCards.map((card) => (
                <motion.article className="thesis-card" key={card.title} variants={sectionReveal}>
                  <span className="card-label">{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section" id="operating-model">
          <div className="layout-shell">
            <motion.div
              className="section-intro section-intro-wide"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={sectionReveal}>
                How we&apos;re different
              </motion.p>
              <motion.h2 variants={sectionReveal}>
                The operating model is the product.
              </motion.h2>
              <motion.p className="section-body" variants={sectionReveal}>
                Humans keep the hard calls. Agents keep the system moving.
              </motion.p>
            </motion.div>

            <motion.div
              className="operating-board"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.aside className="lane-card lane-card-human" variants={sectionReveal}>
                <span className="lane-label">Human lane</span>
                <h3>Judgment stays here.</h3>
                <ul>
                  <li>Choose the problem.</li>
                  <li>Set the constraints.</li>
                  <li>Allocate or stop.</li>
                </ul>
              </motion.aside>

              <motion.div className="step-column" variants={stagger}>
                {operatingSteps.map((step) => (
                  <motion.article className="step-card" key={step.index} variants={sectionReveal}>
                    <span className="step-index">{step.index}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              <motion.aside className="lane-card lane-card-agent" variants={sectionReveal}>
                <span className="lane-label">Agent lane</span>
                <h3>Leverage compounds here.</h3>
                <ul>
                  <li>Maintain tooling.</li>
                  <li>Generate and test.</li>
                  <li>Keep loops fast.</li>
                </ul>
              </motion.aside>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="layout-shell">
            <motion.div
              className="portfolio-shell"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <div className="portfolio-head">
                <motion.p className="eyebrow" variants={sectionReveal}>
                  Portfolio discipline
                </motion.p>
                <motion.h2 variants={sectionReveal}>
                  Shared infrastructure lets us place more bets without a larger org.
                </motion.h2>
                <motion.p className="section-body" variants={sectionReveal}>
                  Capital moves to traction.
                </motion.p>
              </div>

              <motion.div className="portfolio-console" variants={stagger}>
                {portfolioStates.map((item, index) => (
                  <motion.article
                    className={`portfolio-card portfolio-card-${item.accent}`}
                    key={item.name}
                    variants={sectionReveal}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <div className="portfolio-card-top">
                      <span className="portfolio-name">{item.name}</span>
                      <span className="portfolio-stage">{item.stage}</span>
                    </div>
                    <div className="portfolio-bars" aria-hidden>
                      {[0, 1, 2].map((bar) => (
                        <span
                          className="portfolio-bar"
                          key={`${item.name}-${bar}`}
                          style={{
                            width: `${52 + ((index + 1) * (bar + 2) * 7) % 42}%`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="layout-shell">
            <motion.div
              className="cta-panel"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={sectionReveal}>
                Partnerships
              </motion.p>
              <motion.h2 variants={sectionReveal}>
                A quieter way to build and scale software products.
              </motion.h2>
              <motion.div className="cta-actions" variants={sectionReveal}>
                <a href="mailto:hello@orchestrateinc.com" className="primary-link">
                  hello@orchestrateinc.com
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="layout-shell footer-inner">
          <span className="wordmark">
            <LogoMark />
            <span>Orchestrate Inc.</span>
          </span>
          <div className="footer-meta">
            <span className="footer-copy">© 2026 Orchestrate Inc.</span>
            <span className="footer-copy">Delaware corporation</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
