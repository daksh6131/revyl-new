# FORMA Restyle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle `src/pages/index.astro` with the FORMA editorial grid aesthetic — void-black background, 1px borders everywhere, HUD header, split-column hero with PhoneShader, numbered feature rows, purple-only accent.

**Architecture:** Single-file rewrite of `index.astro`. The Layout.astro header is bypassed — a new in-page HUD header drives nav via the existing mobile-menu slide-in panel mechanism. All content, copy, links, and components are preserved; only markup structure and styles change.

**Tech Stack:** Astro, Tailwind CSS, inline `<style>` block for FORMA-specific CSS vars, existing PhoneShader React component.

---

## CSS Variables & Global Styles

These go in a `<style>` block at the top of index.astro (inside the Layout slot, before the page divs):

```css
:root {
  --void: #050505;
  --panel: #0a0a0a;
  --fg: #ffffff;
  --fg2: #666666;
  --fg3: #333333;
  --border: rgba(255, 255, 255, 0.15);
  --accent: #C4A1FF;
  --accent-dark: #1C1732;
  --mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

All Tailwind classes that were using `bg-[#151619]`, `border-gray-700`, `text-gray-400` etc. get replaced with these vars or equivalent dark equivalents.

---

### Task 1: Set up the page shell and CSS

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

**Step 1: Replace the entire file with the new shell**

The new index.astro starts like this (just the shell — content added in later tasks):

```astro
---
import Layout from '@/layouts/Layout.astro';
import PhoneShader from '@/components/PhoneShader';
---

<Layout title="Revyl | The Mobile Reliability Platform" hideFooter={true} forceDark={true}>
<style>
  :root {
    --void: #050505;
    --panel: #0a0a0a;
    --fg: #ffffff;
    --fg2: #666666;
    --fg3: #333333;
    --border: rgba(255, 255, 255, 0.15);
    --accent: #C4A1FF;
    --accent-dark: #1C1732;
    --mono: 'JetBrains Mono', 'Fira Code', monospace;
  }
  * { box-sizing: border-box; }
  body { background-color: var(--void); }
  ::-webkit-scrollbar { width: 0px; }

  /* HUD header */
  .hud-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 60px;
    border-bottom: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .hud-cell {
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    border-right: 1px solid var(--border);
    color: var(--fg2);
  }
  .hud-cell:last-child { border-right: none; justify-content: center; cursor: pointer; }
  .status-dot {
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--accent);
  }

  /* Hero grid */
  .hero-grid {
    display: grid;
    grid-template-columns: 60% 40%;
    min-height: calc(100vh - 60px);
    border-bottom: 1px solid var(--border);
  }
  .hero-left {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    position: relative;
  }
  .hero-right {
    position: relative;
    background: radial-gradient(circle at center, #111 0%, #000 100%);
    overflow: hidden;
  }

  /* Crosshair */
  .crosshair {
    position: absolute; width: 15px; height: 15px; pointer-events: none; z-index: 10;
  }
  .crosshair::before, .crosshair::after {
    content: ''; position: absolute; background: var(--fg);
  }
  .crosshair::before { width: 1px; height: 100%; left: 50%; }
  .crosshair::after { width: 100%; height: 1px; top: 50%; }
  .ch-br { bottom: -7px; right: -7px; }
  .ch-bl { bottom: -7px; left: -7px; }

  /* Hero content */
  .hero-label {
    font-family: var(--mono);
    color: var(--fg2);
    font-size: 11px;
    margin-bottom: 24px;
    display: block;
    letter-spacing: 0.1em;
  }
  .hero-title {
    font-size: clamp(3rem, 7vw, 8rem);
    line-height: 0.88;
    letter-spacing: -0.04em;
    font-weight: 300;
    margin-bottom: 40px;
    text-transform: uppercase;
  }
  .hero-desc {
    max-width: 380px;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.65;
    color: var(--fg2);
    border-left: 1px solid var(--fg3);
    padding-left: 20px;
  }

  /* Specs strip */
  .specs-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--border);
  }
  .spec-cell {
    padding: 20px 24px;
    border-right: 1px solid var(--border);
    font-family: var(--mono);
  }
  .spec-cell:last-child { border-right: none; }
  .spec-label { font-size: 9px; color: var(--fg2); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; display: block; }
  .spec-value { font-size: 15px; color: var(--fg); }

  /* Scan lines */
  .scan-lines {
    background: repeating-linear-gradient(0deg, rgba(255,255,255,0.025), rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px);
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none; z-index: 1;
  }
  .overlay-ui {
    position: absolute; z-index: 2; pointer-events: none;
    width: 100%; height: 100%; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .ui-badge {
    align-self: flex-start;
    background: var(--accent);
    color: var(--accent-dark);
    padding: 4px 8px;
    font-size: 10px;
    font-family: var(--mono);
    font-weight: bold;
    letter-spacing: 0.05em;
  }
  .ui-coords {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--fg2);
    text-align: right;
  }

  /* Feature rows */
  .feature-stack { border-top: 1px solid var(--border); }
  .feature-row {
    display: grid;
    grid-template-columns: 60px 1fr;
    border-bottom: 1px solid var(--border);
    min-height: 110px;
  }
  .f-num {
    border-right: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono); font-size: 11px; color: var(--fg2);
  }
  .f-content { padding: 28px 32px; display: flex; flex-direction: column; justify-content: center; }
  .f-title { font-size: 17px; margin-bottom: 6px; font-weight: 500; }
  .f-desc { font-family: var(--mono); font-size: 12px; color: var(--fg2); max-width: 480px; line-height: 1.6; }

  /* Section label */
  .section-label {
    font-family: var(--mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg2);
    margin-bottom: 16px;
    display: block;
  }

  /* CTA row */
  .cta-row {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 40px 48px;
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer;
    transition: background 0.3s;
  }
  .cta-row:hover { background: #0f0f0f; }
  .cta-text { font-size: clamp(1.5rem, 3vw, 2.5rem); letter-spacing: -0.02em; font-weight: 300; }
  .cta-arrow { font-family: var(--mono); font-size: 24px; color: var(--fg2); }

  /* Performance bars */
  .perf-bar-fill-accent { background: var(--accent); }
  .perf-bar-fill-muted { background: #444; }

  /* Numbers grid */
  .numbers-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border);
  }
  .number-cell {
    padding: 28px;
    text-align: center;
    border-right: 1px solid var(--border);
  }
  .number-cell:last-child { border-right: none; }
  .number-value {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 200;
    letter-spacing: -0.04em;
    background: linear-gradient(to bottom, #fff, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }
  .number-label { font-family: var(--mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--fg2); }

  /* Scale grid */
  .scale-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--border);
  }
  .scale-card {
    padding: 28px;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .scale-card:nth-child(even) { border-right: none; }
  .scale-card:nth-child(3), .scale-card:nth-child(4) { border-bottom: none; }
  .scale-card-title { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg2); margin-bottom: 20px; }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; }
    .hero-right { height: 50vh; order: -1; border-right: none; border-bottom: 1px solid var(--border); }
    .hero-left { border-right: none; }
    .numbers-grid { grid-template-columns: repeat(2, 1fr); }
    .scale-grid { grid-template-columns: 1fr; }
    .scale-card:nth-child(even) { border-right: none; border-left: none; }
    .scale-card { border-right: none; }
    .specs-strip { grid-template-columns: 1fr 1fr; }
    .hud-header { grid-template-columns: 1fr 1fr; }
  }
</style>

<div style="background: var(--void); color: var(--fg); min-height: 100vh;">
  <!-- CONTENT GOES HERE (added per task below) -->
</div>
</Layout>
```

**Step 2: Verify dev server still compiles**

Check `http://localhost:4321/` — should render a void-black page with no errors in terminal.

---

### Task 2: HUD Header

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Replace `<!-- CONTENT GOES HERE -->` with the HUD header + nav panel**

```astro
<!-- HUD HEADER -->
<div class="hud-header">
  <div class="hud-cell">
    <span>REVYL OS</span>
    <span class="status-dot"></span>
  </div>
  <div class="hud-cell" style="justify-content: center;">
    <span>V. 1.0</span>
  </div>
  <div class="hud-cell" id="hud-menu-btn">
    <span>MENU +</span>
  </div>
</div>

<!-- Slide-in nav panel (same content as existing mobile menu) -->
<div id="hud-overlay" class="fixed inset-0 bg-black/50 z-40 hidden"></div>
<div id="hud-nav" class="fixed top-0 right-0 h-full w-72 z-50 transform translate-x-full transition-transform duration-300 ease-in-out"
  style="background: var(--panel); border-left: 1px solid var(--border);">
  <div class="flex items-center justify-between h-[60px] px-6" style="border-bottom: 1px solid var(--border);">
    <span style="font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg2);">Navigation</span>
    <button id="hud-nav-close" style="color: var(--fg2); cursor: pointer; background: none; border: none; font-size: 18px;">✕</button>
  </div>
  <nav class="flex flex-col p-6 gap-1">
    <span style="font-family: var(--mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--fg2); padding: 12px 0;">Products</span>
    <a href="/products/ios-testing" class="py-3 pl-4 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">iOS Testing</a>
    <a href="/products/android-testing" class="py-3 pl-4 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">Android Testing</a>
    <a href="/products/mobile-infrastructure" class="py-3 pl-4 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">Mobile Infrastructure</a>
    <span style="font-family: var(--mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--fg2); padding: 12px 0;">Features</span>
    <a href="/features/cli" class="py-3 pl-4 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">CLI</a>
    <a href="/features/mcp" class="py-3 pl-4 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">MCP</a>
    <a href="/features/crash-reporting" class="py-3 pl-4 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">Reporting</a>
    <span style="font-family: var(--mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--fg2); padding: 12px 0;">Company</span>
    <a href="/pricing" class="py-3 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">Pricing</a>
    <a href="https://docs.revyl.com" class="py-3 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">Docs</a>
    <a href="/blog" class="py-3 text-sm" style="color: var(--fg); border-bottom: 1px solid var(--border); text-decoration: none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">Blog</a>
    <div class="flex flex-col gap-2 mt-4">
      <a href="https://app.revyl.ai/login" class="flex items-center justify-center h-10 px-4 text-sm" style="color: var(--fg); text-decoration: none; border: 1px solid var(--border);">Log in</a>
      <a href="https://app.revyl.ai/signup" class="flex items-center justify-center h-10 px-4 text-sm font-medium" style="background: var(--accent); color: var(--accent-dark); text-decoration: none;">Sign Up</a>
    </div>
  </nav>
</div>

<script>
  const hudMenuBtn = document.getElementById('hud-menu-btn');
  const hudNavClose = document.getElementById('hud-nav-close');
  const hudNav = document.getElementById('hud-nav');
  const hudOverlay = document.getElementById('hud-overlay');
  hudMenuBtn?.addEventListener('click', () => {
    hudNav?.classList.remove('translate-x-full');
    hudOverlay?.classList.remove('hidden');
  });
  hudNavClose?.addEventListener('click', () => {
    hudNav?.classList.add('translate-x-full');
    hudOverlay?.classList.add('hidden');
  });
  hudOverlay?.addEventListener('click', () => {
    hudNav?.classList.add('translate-x-full');
    hudOverlay?.classList.add('hidden');
  });
</script>
```

**Step 2: Verify in browser**

`http://localhost:4321/` — should show HUD header bar with `REVYL OS · V.1.0 · MENU +`. Clicking MENU + should open the nav panel.

---

### Task 3: Hero Section (60/40 split)

**Files:**
- Modify: `src/pages/index.astro` (add after nav panel script)

**Step 1: Add the hero grid**

```astro
<!-- HERO -->
<div class="hero-grid">
  <!-- LEFT: text content -->
  <div class="hero-left">
    <div class="crosshair ch-br"></div>
    <div style="padding: 8vh 4vw; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
      <span class="hero-label">// Mobile Reliability Platform</span>
      <h1 class="hero-title">The<br/>Mobile<br/>Reliability<br/>Platform.</h1>
      <p class="hero-desc">
        AI-native testing for iOS and Android.<br/>
        Ship faster. Break nothing.
      </p>
    </div>

    <!-- Specs strip -->
    <div class="specs-strip">
      <div class="spec-cell">
        <span class="spec-label">Parallel Sessions</span>
        <span class="spec-value">10,000+</span>
      </div>
      <div class="spec-cell">
        <span class="spec-label">Polling Latency</span>
        <span class="spec-value">&lt; 50ms</span>
      </div>
      <div class="spec-cell">
        <span class="spec-label">Platforms</span>
        <span class="spec-value">iOS + Android</span>
      </div>
    </div>
  </div>

  <!-- RIGHT: PhoneShader panel -->
  <div class="hero-right">
    <div class="scan-lines"></div>
    <div class="crosshair ch-bl"></div>
    <div style="position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; padding: 40px;">
      <PhoneShader client:load />
    </div>
    <div class="overlay-ui">
      <span class="ui-badge">RENDER: LIVE</span>
      <div class="ui-coords">
        iOS 18.2 · iPhone 16<br/>
        DEVICE: ONLINE
      </div>
    </div>
  </div>
</div>
```

**Step 2: Fix PhoneShader gradient fade color**

The PhoneShader component has a hardcoded gradient fade to `#151619`. It needs to fade to `#050505` (the new void bg). Open `src/components/PhoneShader.tsx` and change:

```tsx
// OLD:
background: "linear-gradient(to bottom, transparent 0%, #151619 100%)",
// NEW:
background: "linear-gradient(to bottom, transparent 0%, #050505 100%)",
```

**Step 3: Verify in browser**

Hero should show: left column with giant "THE MOBILE RELIABILITY PLATFORM." title and specs strip, right column with PhoneShader and RENDER: LIVE badge.

---

### Task 4: Feature Stack (numbered rows)

**Files:**
- Modify: `src/pages/index.astro` (add after hero grid)

**Step 1: Add feature rows**

```astro
<!-- FEATURE STACK -->
<div class="feature-stack">
  <div class="feature-row">
    <div class="f-num">01</div>
    <div class="f-content">
      <div class="f-title">Write tests in plain English</div>
      <div class="f-desc">No page objects. No selectors. Describe what you want to test and the agent figures out the rest.</div>
      <a href="https://docs.revyl.com" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-family: var(--mono); font-size: 12px; margin-top: 12px; text-decoration: none;">
        Learn more →
      </a>
    </div>
  </div>
  <div class="feature-row">
    <div class="f-num">02</div>
    <div class="f-content">
      <div class="f-title">Watch devices run live</div>
      <div class="f-desc">WebRTC-powered device streaming. See exactly what your app is doing, as it happens.</div>
      <a href="https://docs.revyl.com" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-family: var(--mono); font-size: 12px; margin-top: 12px; text-decoration: none;">
        Learn more →
      </a>
    </div>
  </div>
  <div class="feature-row">
    <div class="f-num">03</div>
    <div class="f-content">
      <div class="f-title">Know exactly what went wrong</div>
      <div class="f-desc">Video clips of every action. Step-by-step execution traces. Share reports with one link.</div>
      <a href="https://docs.revyl.com" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-family: var(--mono); font-size: 12px; margin-top: 12px; text-decoration: none;">
        Learn more →
      </a>
    </div>
  </div>
</div>
```

**Step 2: Verify in browser**

Three numbered rows should appear below the hero, each with a purple "Learn more →" link.

---

### Task 5: Performance Section

**Files:**
- Modify: `src/pages/index.astro` (add after feature stack)

**Step 1: Add performance section**

```astro
<!-- PERFORMANCE -->
<section style="padding: 80px 48px; border-bottom: 1px solid var(--border);">
  <span class="section-label">// Performance</span>
  <h2 style="font-size: clamp(2rem, 5vw, 4rem); font-weight: 300; letter-spacing: -0.04em; text-transform: uppercase; margin-bottom: 16px;">Built for speed and scale</h2>
  <p style="font-family: var(--mono); font-size: 13px; color: var(--fg2); max-width: 560px; line-height: 1.65; margin-bottom: 64px;">
    Optimized for the tight loop an AI agent needs: capture the screen, ground the instruction, execute the action, verify the result.
  </p>

  <!-- Comparison bars -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-bottom: 64px;">
    <div>
      <span class="section-label">State Polling Latency</span>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; font-weight: 500; width: 110px; flex-shrink: 0;">Revyl</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 7%; background: var(--accent);"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--accent); width: 60px; text-align: right; flex-shrink: 0;">~50ms</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--fg2); width: 110px; flex-shrink: 0;">In-house</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 57%; background: #444;"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--fg2); width: 60px; text-align: right; flex-shrink: 0;">~400ms</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--fg2); width: 110px; flex-shrink: 0;">BrowserStack</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 93%; background: #444;"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--fg2); width: 60px; text-align: right; flex-shrink: 0;">~650ms</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--fg2); width: 110px; flex-shrink: 0;">Sauce Labs</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 100%; background: #444;"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--fg2); width: 60px; text-align: right; flex-shrink: 0;">~700ms</span>
        </div>
      </div>
    </div>
    <div>
      <span class="section-label">Time to First Device Action</span>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; font-weight: 500; width: 110px; flex-shrink: 0;">Revyl</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 4.5%; background: var(--accent);"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--accent); width: 60px; text-align: right; flex-shrink: 0;">~8s</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--fg2); width: 110px; flex-shrink: 0;">BrowserStack</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 25%; background: #444;"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--fg2); width: 60px; text-align: right; flex-shrink: 0;">~45s</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--fg2); width: 110px; flex-shrink: 0;">Sauce Labs</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 33%; background: #444;"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--fg2); width: 60px; text-align: right; flex-shrink: 0;">~60s</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--fg2); width: 110px; flex-shrink: 0;">In-house</span>
          <div style="flex: 1; height: 28px; background: rgba(255,255,255,0.05); overflow: hidden;">
            <div style="height: 100%; width: 100%; background: #444;"></div>
          </div>
          <span style="font-family: var(--mono); font-size: 12px; color: var(--fg2); width: 60px; text-align: right; flex-shrink: 0;">~180s</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Numbers grid -->
  <div class="numbers-grid">
    <div class="number-cell">
      <div class="number-value">10,000+</div>
      <div class="number-label">Parallel Sessions</div>
    </div>
    <div class="number-cell">
      <div class="number-value">24–30</div>
      <div class="number-label">FPS Streaming</div>
    </div>
    <div class="number-cell">
      <div class="number-value">~50ms</div>
      <div class="number-label">Polling Latency</div>
    </div>
    <div class="number-cell" style="border-right: none;">
      <div class="number-value">3</div>
      <div class="number-label">Compute Tiers</div>
    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

Performance section should show with comparison bars, accent-colored Revyl bars, and numbers grid.

---

### Task 6: Scale Grid

**Files:**
- Modify: `src/pages/index.astro` (add after performance section)

**Step 1: Add scale grid section**

```astro
<!-- SCALE -->
<section style="padding: 80px 48px; border-bottom: 1px solid var(--border);">
  <span class="section-label">// Scale</span>
  <h2 style="font-size: clamp(2rem, 5vw, 4rem); font-weight: 300; letter-spacing: -0.04em; text-transform: uppercase; margin-bottom: 16px;">Every build. Every PR. Every time.</h2>
  <p style="font-family: var(--mono); font-size: 13px; color: var(--fg2); max-width: 560px; line-height: 1.65; margin-bottom: 48px;">
    Massively parallel execution across iOS and Android. Cut your test suite from hours to minutes.
  </p>

  <div class="scale-grid">
    <div class="scale-card">
      <div class="scale-card-title">Parallel Test Runs</div>
      <img src="/images/2.svg" alt="Parallel test execution" style="width: 100%; height: auto;" />
    </div>
    <div class="scale-card">
      <div class="scale-card-title">Reporting</div>
      <img src="/images/1.svg" alt="Test reporting dashboard" style="width: 100%; height: auto;" />
    </div>
    <div class="scale-card">
      <div class="scale-card-title">Drag and Drop .zip / .apk / .app to get started</div>
      <img src="/images/3.svg" alt="Drag and drop app upload" style="width: 100%; height: auto;" />
    </div>
    <div class="scale-card">
      <div class="scale-card-title">Call from CI/CD</div>
      <img src="/images/5.svg" alt="CI/CD integrations" style="width: 100%; height: auto;" />
    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

2×2 bordered grid of cards with monospace uppercase titles and existing SVG images.

---

### Task 7: CTA Row

**Files:**
- Modify: `src/pages/index.astro` (add after scale grid)

**Step 1: Add CTA row**

```astro
<!-- CTA -->
<a href="https://app.revyl.ai/signup" style="display: block; text-decoration: none; color: inherit;">
  <div class="cta-row">
    <span class="cta-text">Ship with confidence.</span>
    <span class="cta-arrow">→</span>
  </div>
</a>
<div style="padding: 20px 48px; border-bottom: 1px solid var(--border); display: flex; gap: 24px; align-items: center;">
  <a href="https://cal.com/landseer-enga/book-a-demo" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none; letter-spacing: 0.05em; transition: color 0.2s;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">Book a Demo →</a>
</div>
```

**Step 2: Verify in browser**

CTA row should be a full-width bordered clickable row. Hover darkens it slightly. "Book a Demo →" below in monospace.

---

### Task 8: Footer

**Files:**
- Modify: `src/pages/index.astro` (add after CTA, closing the main div before `</Layout>`)

**Step 1: Add footer**

```astro
<!-- FOOTER -->
<footer style="padding: 64px 48px; border-top: 1px solid var(--border);">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-bottom: 64px;">
      <!-- Left: wordmark + tagline -->
      <div>
        <svg style="width: 100%; max-width: 280px; height: auto; margin-bottom: 20px;" viewBox="0 0 386 153" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.587 124.883V29.9939H68.7536C78.6094 29.9939 86.3531 32.2588 91.985 36.7885C97.6168 41.3182 100.433 47.6832 100.433 55.8835C100.433 60.5694 99.3768 64.6696 97.2648 68.184C95.1529 71.6203 92.0241 74.2756 87.8784 76.15V76.6186C91.8677 76.6186 94.9573 77.712 97.1475 79.8987C99.3377 82.0074 100.433 85.0923 100.433 89.1534V124.883H84.2412V87.279H37.8959V124.883H21.587ZM37.8959 73.4556H67.463C72.8602 73.4556 77.0058 72.167 79.9 69.5897C82.8723 67.0125 84.3585 63.3809 84.3585 58.695C84.3585 53.931 82.8723 50.2995 79.9 47.8003C77.0058 45.2231 72.8602 43.9345 67.463 43.9345H37.8959V73.4556Z" fill="#C4A1FF"/>
          <path d="M151.09 126.289C143.659 126.289 137.167 124.805 131.613 121.838C126.138 118.792 121.914 114.496 118.942 108.951C115.969 103.406 114.483 96.9241 114.483 89.5048C114.483 82.0855 115.93 75.6814 118.824 70.2926C121.797 64.8257 125.981 60.6084 131.379 57.6407C136.776 54.673 143.151 53.1891 150.503 53.1891C157.543 53.1891 163.605 54.5949 168.689 57.4064C173.774 60.1399 177.685 64.0838 180.422 69.2383C183.238 74.3147 184.646 80.3673 184.646 87.3962V93.2535H129.736C130.362 99.6576 132.513 104.617 136.189 108.131C139.865 111.568 144.793 113.286 150.973 113.286C155.509 113.286 159.225 112.427 162.119 110.708C165.013 108.99 167.008 106.413 168.103 102.977H184.294C182.574 110.318 178.78 116.058 172.913 120.197C167.125 124.259 159.851 126.289 151.09 126.289ZM130.205 82.1245H169.393C168.768 76.97 166.812 73.0261 163.527 70.2926C160.242 67.4811 155.9 66.0753 150.503 66.0753C145.106 66.0753 140.648 67.4811 137.128 70.2926C133.608 73.0261 131.3 76.97 130.205 82.1245Z" fill="#C4A1FF"/>
          <path d="M217.823 124.883L187.787 54.5949H204.565L226.388 107.311H226.858L248.329 54.5949H264.638L234.601 124.883H217.823Z" fill="#C4A1FF"/>
          <path d="M274.353 152.999V140.23H290.661L297.114 124.766L266.139 54.5949H282.8L304.976 106.14H305.562L326.916 54.5949H342.873L312.837 124.883L306.384 140.113C304.663 144.174 302.785 147.337 300.752 149.601C298.796 151.866 295.55 152.999 291.013 152.999H274.353Z" fill="#C4A1FF"/>
          <path d="M352.822 124.883V26.4795H368.779V124.883H352.822Z" fill="#C4A1FF"/>
        </svg>
        <p style="font-family: var(--mono); font-size: 12px; color: var(--fg2); max-width: 260px; line-height: 1.65;">
          Simplify workflows, reduce noise, and release with confidence.
        </p>
      </div>

      <!-- Right: links + badges -->
      <div style="display: flex; flex-direction: column; gap: 40px; align-items: flex-end;">
        <div style="display: flex; gap: 48px;">
          <div>
            <span class="section-label" style="margin-bottom: 16px;">Socials</span>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="https://x.com/tryrevyl" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">Twitter/X</a>
              <a href="https://www.linkedin.com/company/revylai" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">LinkedIn</a>
              <a href="https://github.com/RevylAI" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">GitHub</a>
            </div>
          </div>
          <div>
            <span class="section-label" style="margin-bottom: 16px;">Company</span>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="https://mobilereliability.com/" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">Podcast</a>
              <a href="/blog" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">Blog</a>
              <a href="https://docs.revyl.com" style="font-family: var(--mono); font-size: 12px; color: var(--fg2); text-decoration: none;" onmouseover="this.style.color='var(--fg)'" onmouseout="this.style.color='var(--fg2)'">Docs</a>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 24px;">
          <img src="https://badges.oneleet.com/badge/68a9c8ed-1bbe-458e-be18-636fc5361a98?dark=true" alt="SOC 2 Type II Compliant" style="height: 100px;" />
          <img src="https://badges.oneleet.com/badge/5a728019-58b6-4661-ae92-46d2eec05db8?dark=true" alt="HIPAA Compliant" style="height: 100px;" />
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 32px; border-top: 1px solid var(--border);">
      <span style="font-family: var(--mono); font-size: 11px; color: var(--fg3);">&copy; 2026 Revyl. All rights reserved.</span>
      <div style="display: flex; gap: 24px;">
        <a href="/terms" style="font-family: var(--mono); font-size: 11px; color: var(--fg3); text-decoration: none;" onmouseover="this.style.color='var(--fg2)'" onmouseout="this.style.color='var(--fg3)'">Terms of Service</a>
        <a href="/privacy" style="font-family: var(--mono); font-size: 11px; color: var(--fg3); text-decoration: none;" onmouseover="this.style.color='var(--fg2)'" onmouseout="this.style.color='var(--fg3)'">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>
```

**Step 2: Close the main wrapper div and Layout**

Make sure the file ends with:
```astro
</div>
</Layout>
```

**Step 3: Full page verify**

Scroll through the whole page at `http://localhost:4321/`. Check:
- [ ] HUD header visible, MENU + opens nav panel
- [ ] Hero: 60/40 split, PhoneShader on right, specs strip at bottom
- [ ] Feature rows: 01, 02, 03 numbered, purple "Learn more →"
- [ ] Performance: comparison bars, numbers grid
- [ ] Scale: 2×2 grid of cards with SVG images
- [ ] CTA: full-width clickable row + Book a Demo link
- [ ] Footer: wordmark in purple, monospace links, compliance badges

---

### Task 9: Hide Layout.astro's native header

**Context:** The Layout.astro renders its own `<header>` with the full nav above the slot content. Since we replaced it with the HUD header, the Layout header will appear on top. We need to hide it for the index page without modifying Layout.astro globally.

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Add a style to hide the layout header on this page only**

Add this inside the `<style>` block:

```css
/* Hide Layout.astro's native header on this page */
:global(body > div > header),
:global(header.relative.z-50) {
  display: none !important;
}
```

**Note:** Inspect the actual rendered header element in browser devtools to get the right selector if the above doesn't match. The Layout header has `class="relative z-50 border-b ..."` — target that.

**Step 2: Verify**

Only one header visible (the HUD). No duplicate nav.

---

### Task 10: Final polish pass

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/PhoneShader.tsx` (if gradient not fixed in Task 3)

**Step 1: Mobile responsiveness check**

Resize browser to 375px width. Verify:
- Hero stacks vertically (PhoneShader on top)
- Numbers grid goes 2×2
- Scale grid goes 1 column
- HUD header still readable

Fix any overflow issues with `overflow-x: hidden` on the main wrapper if needed.

**Step 2: Check existing Layout header is hidden correctly**

Navigate to `/pricing` or `/blog` — those pages should still show the normal Layout header. Only the index page hides it.

**Step 3: Done**

Page is complete. Dev server running at `http://localhost:4321/`.
