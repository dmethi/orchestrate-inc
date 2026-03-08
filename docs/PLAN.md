# Orchestrate Inc. — Landing Page Plan

**Purpose:** Collateral for outreach to banking partners and others. Explains the thesis and positions Orchestrate as an impressive, credible software lab.

**Entity:** Orchestrate Inc. — Delaware C-Corp.

---

## 1. Bare-minimal information to include

Enough so a link in an email explains the thesis without a meeting.

| Section | Content |
|--------|--------|
| **Hero** | Company name, one-line tagline (e.g. "An agentic software lab"), single sentence thesis. |
| **What we do** | We develop, launch, and scale software products using agentic engineering. Portfolio approach: multiple products, shared infrastructure, disciplined resource allocation. |
| **How we're different** | AI-native organization (not bolt-on). Human–agent collaboration on problems that require it. Focus on measurable complexity where human judgment + agent execution creates leverage. |
| **Entity / trust** | Delaware C-Corp. Optional: "Founded [year]" or "Incorporated [year]" if you want. |
| **Contact** | One clear CTA: "For partnerships" or "Get in touch" → email or Calendly. No signup forms unless you have a specific use case. |

**Omit for v1:** Detailed team bios, case studies, product logos, pricing, blog. Add later as you close deals and get permission to reference them.

---

## 2. Graphics, visuals, color, motion

**Audience:** Banking and institutional partners. Tone = confident, clear, institutional-but-modern. Not playful or startup-casual.

**Color**
- **Option A (recommended):** Dark base (navy/slate #0f172a–#1e293b) with one sharp accent (e.g. electric blue #3b82f6 or amber #f59e0b). White/off-white text. Feels serious and tech-forward.
- **Option B:** Light base (off-white #fafafa) with same accent and dark text. Slightly more “corporate doc” feel.
- Avoid: Purple gradients, multi-color gradients, anything that reads “AI slop.”

**Typography**
- Headlines: Strong serif (e.g. Fraunces, Source Serif) or a distinctive sans (e.g. Satoshi, General Sans) for authority.
- Body: Neutral, highly readable sans (e.g. IBM Plex Sans, Geist) with comfortable line-height.
- No logo required: wordmark "Orchestrate Inc." in the chosen headline font is enough.

**Motion (Framer Motion or similar)**
- **Staggered reveals:** Sections and key lines fade/slide up on scroll (ease-out, ~200–300ms). One well-orchestrated load beats many tiny animations.
- **Scroll-triggered:** Content enters as it enters viewport; avoid long auto-playing loops.
- **Restraint:** No confetti, parallax overload, or bouncy CTAs. Motion should feel intentional and minimal.
- **Accessibility:** Respect `prefers-reduced-motion` (disable or shorten animations).

**Visual metaphors (optional)**
- Simple diagram: “Portfolio → shared infrastructure → scale up/down” (icons or minimal illustration).
- Abstract “orchestration” cue: subtle grid, nodes, or flow lines—not literal robots or chatbots.
- No stock photos of handshakes or data centers unless they’re genuinely high quality and on-brand.

**Tech**
- Use a motion library (e.g. Framer Motion) for scroll-based and entrance animations.
- Keep the stack simple: static or static-export site (e.g. Vite + React, or Next.js static export) so it’s easy to host and fast to load.

---

## 3. Thesis content that makes you sound like an impressive software lab

Turn your bullets into clear, confident statements. Suggested framing:

**Headline-level thesis**
- “We run an agentic software lab: we build and scale software products using AI-native processes and human–agent collaboration.”
- Or: “Orchestrate develops and scales software through agentic engineering—portfolio-style, with shared infrastructure and disciplined capital allocation.”

**Why now**
- AI tools have proven they can accelerate prototyping and development. Most companies are bolting AI onto existing workflows. Few organizations are built from the ground up to ship polished products at speed using agentic tooling. We’re built that way.

**How we operate**
- **Organization:** Built around agentic tooling from the start—for development, operations, and management. That lets us run a portfolio of products cost-efficiently and scale teams up or down as projects prove out or stall.
- **Portfolio discipline:** Many small, low-leverage bets with clear criteria. Shared infrastructure and resource sharing across projects. When something shows promise, we allocate more; when it doesn’t, we scale down quickly. Portfolio management applied to software.
- **Where we focus:** We only take on problems with real, measurable complexity—beyond “hand it to an agent.” The leverage is in human–agent collaboration: we understand tool boundaries, how they change, and how to combine our skills with agent capabilities to maximize output and quality.

**Trust / credibility (without overclaiming)**
- Delaware C-Corp.
- Optional: “Agentic engineering” or “AI-native development” as a stated focus (signals specialization).
- Later: one or two concrete outcomes (e.g. “We’ve shipped X” or “Our process reduces time-to-launch by Y”) when you have them and can share.

**Tone**
- Confident, specific, no hype. Use “we” and active voice. Avoid “revolutionary,” “disruptive,” “cutting-edge.” Prefer “agentic,” “portfolio,” “shared infrastructure,” “human–agent collaboration,” “measured complexity.”

---

## Next steps

1. **Copy:** Draft hero, “What we do,” “How we’re different,” and footer (entity + contact) using the sections above.
2. **Design:** Pick Option A or B for color; one accent; one headline + one body font; wordmark only.
3. **Build:** Single-page landing with scroll-triggered stagger and one clear CTA. Respect `prefers-reduced-motion`.
4. **Deploy:** Host on a stable URL (e.g. orchestrateinc.com or orchestrate.io) and use that link in outreach emails.

Once you have a first version live, you can add: one diagram, one “How it works” (3–4 steps), and optional social/legal links (e.g. LinkedIn, Terms, Privacy) in the footer.
