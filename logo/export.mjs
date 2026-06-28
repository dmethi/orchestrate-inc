import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const font400 = readFileSync(join(dir, "satoshi-400.ttf"));
const font700 = readFileSync(join(dir, "satoshi-700.ttf"));

const TEAL  = "#1f4d64";
const WHITE = "#ffffff";

// ─── Mark only ───────────────────────────────────────────────────────────────
// viewBox 24×24, exported at 1024px

function markSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <mask id="m">
      <rect width="24" height="24" fill="white"/>
      <path d="M16.8 4.9a8.6 8.6 0 0 1 2.7 2.7" fill="none" stroke="black" stroke-width="2.6" stroke-linecap="round"/>
    </mask>
  </defs>
  <circle cx="12" cy="12" r="8.5" fill="none" stroke="${color}" stroke-width="1.6" mask="url(#m)"/>
  <circle cx="12" cy="12" r="2.4" fill="${color}"/>
</svg>`;
}

// ─── Horizontal wordmark ──────────────────────────────────────────────────────
// Mark scaled into a 36×36 box, text at Satoshi 700, letter-spacing -0.02em
// viewBox width chosen to fit text comfortably; exported at 3200px wide.

function wordmarkSvg(color) {
  // mark lives in 0 0 36 36, text starts at x=50
  // letter-spacing in SVG uses px units; at font-size 20 a -0.02em ≈ -0.4px
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 36">
  <defs>
    <mask id="m">
      <rect width="36" height="36" fill="white"/>
      <!-- notch scaled ×1.5 from 24-space into 36-space -->
      <path d="M25.2 7.35a12.75 12.75 0 0 1 4.05 4.05" fill="none" stroke="black" stroke-width="3.9" stroke-linecap="round"/>
    </mask>
  </defs>
  <circle cx="18" cy="18" r="12.75" fill="none" stroke="${color}" stroke-width="2.4" mask="url(#m)"/>
  <circle cx="18" cy="18" r="3.6" fill="${color}"/>
  <text
    x="50"
    y="24.5"
    font-family="Satoshi, sans-serif"
    font-weight="700"
    font-size="20"
    letter-spacing="-0.4"
    fill="${color}"
  >Orchestrate Inc.</text>
</svg>`;
}

function wordmarkCapsSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 36">
  <defs>
    <mask id="m">
      <rect width="36" height="36" fill="white"/>
      <path d="M25.2 7.35a12.75 12.75 0 0 1 4.05 4.05" fill="none" stroke="black" stroke-width="3.9" stroke-linecap="round"/>
    </mask>
  </defs>
  <circle cx="18" cy="18" r="12.75" fill="none" stroke="${color}" stroke-width="2.4" mask="url(#m)"/>
  <circle cx="18" cy="18" r="3.6" fill="${color}"/>
  <text
    x="50"
    y="24"
    font-family="Satoshi, sans-serif"
    font-weight="400"
    font-size="13.5"
    letter-spacing="2.2"
    fill="${color}"
  >ORCHESTRATE INC.</text>
</svg>`;
}

// ─── Render ───────────────────────────────────────────────────────────────────

const opts = (width) => ({
  fitTo: { mode: "width", value: width },
  font: { fontBuffers: [font400, font700] },
});

const exports = [
  { name: "logo-teal",           svg: markSvg(TEAL),           width: 1024 },
  { name: "logo-white",          svg: markSvg(WHITE),          width: 1024 },
  { name: "wordmark-teal",       svg: wordmarkSvg(TEAL),       width: 3200 },
  { name: "wordmark-white",      svg: wordmarkSvg(WHITE),      width: 3200 },
  { name: "wordmark-caps-teal",  svg: wordmarkCapsSvg(TEAL),   width: 3200 },
  { name: "wordmark-caps-white", svg: wordmarkCapsSvg(WHITE),  width: 3200 },
];

for (const { name, svg, width } of exports) {
  const resvg = new Resvg(svg, opts(width));
  writeFileSync(join(dir, `${name}.png`), resvg.render().asPng());
  console.log(`✓ ${name}.png`);
}
