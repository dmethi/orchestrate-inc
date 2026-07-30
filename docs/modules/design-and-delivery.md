# Design and Delivery

- The current site is a static Vite/React surface with no authentication, forms,
  customer data, operational agent actions, or audit-log requirement.
- Preserve the institutional-modern tone, light/teal visual system, Satoshi display
  type, restrained motion, and reduced-motion behavior unless a shaped issue changes
  them.
- Keep one clear partner contact path.
- New analytics, forms, dashboards, partner intake, or agent execution cross the
  current privacy/security boundary and require separate shaping.
- A readiness audit reports evidence first; repairs become separately approved work.
- Browser font requests remain same-origin. The deployed page uses the checked-in
  Satoshi files and system font fallbacks, not a third-party font service.
- Vercel applies the site's CSP, frame restriction, referrer policy, permissions policy,
  and MIME-sniffing protection to every static response. Keep those controls in
  `vercel.json` so they are enforced at the hosting boundary.
