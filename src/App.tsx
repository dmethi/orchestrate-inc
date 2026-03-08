import { motion, useReducedMotion } from "framer-motion";

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function App() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <header className="site-header">
        <motion.div
          className="header-inner"
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <span className="wordmark">Orchestrate Inc.</span>
        </motion.div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <motion.div
            className="hero-inner"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={sectionReveal}>
              An agentic software lab
            </motion.h1>
            <motion.p className="hero-tagline" variants={sectionReveal}>
              We develop, launch, and scale software products using AI-native
              processes and human–agent collaboration—portfolio-style, with
              shared infrastructure and disciplined capital allocation.
            </motion.p>
          </motion.div>
        </section>

        {/* What we do */}
        <section className="section">
          <motion.div
            className="section-inner"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={sectionReveal}>What we do</motion.h2>
            <motion.p className="section-lead" variants={sectionReveal}>
              We run a portfolio of software products. Shared infrastructure and
              resource sharing across projects let us scale up when ideas show
              promise and scale down when they don’t—so we manage risk and cost
              while staying ready to pour gas on the right bets.
            </motion.p>
          </motion.div>
        </section>

        {/* How we're different */}
        <section className="section">
          <motion.div
            className="section-inner"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={sectionReveal}>How we’re different</motion.h2>
            <motion.div className="different-list" variants={stagger}>
              <motion.div className="different-item" variants={sectionReveal}>
                <strong>AI-native, not bolt-on.</strong> We’re built around
                agentic tooling from the start—for development, operations, and
                management. That’s how we ship polished products at speed
                instead of layering AI onto legacy workflows.
              </motion.div>
              <motion.div className="different-item" variants={sectionReveal}>
                <strong>Human–agent collaboration.</strong> We only take on
                problems with real, measurable complexity. The leverage is in
                knowing where tools excel and where human judgment is
                irreplaceable—and combining both to maximize output and quality.
              </motion.div>
              <motion.div className="different-item" variants={sectionReveal}>
                <strong>Portfolio discipline.</strong> Many small, low-leverage
                bets with clear criteria. When something works, we allocate
                more; when it doesn’t, we scale down quickly. Software
                development run like portfolio management.
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="section cta-section">
          <motion.div
            className="section-inner"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p className="cta-lead" variants={sectionReveal}>
              For partnerships and inquiries
            </motion.p>
            <motion.p variants={sectionReveal}>
              <a href="mailto:hello@orchestrateinc.com" className="cta-link">
                hello@orchestrateinc.com
              </a>
            </motion.p>
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <motion.div
          className="footer-inner"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className="entity">Orchestrate Inc.</span>
          <span className="entity-detail">Delaware C-Corp.</span>
        </motion.div>
      </footer>
    </>
  );
}

export default App;
