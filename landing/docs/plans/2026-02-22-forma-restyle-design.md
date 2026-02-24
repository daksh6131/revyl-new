# Revyl Landing Page — FORMA Restyle Design
**Date:** 2026-02-22
**Approach:** Strict FORMA Port (Approach A)

## Overview
Restyle `src/pages/index.astro` with the FORMA editorial grid aesthetic. Keep all existing content, copy, links, and components. Replace visual language with void-black background, 1px borders everywhere, monospace HUD labels, crosshair decorations, scan lines, and purple (`#C4A1FF`) as the sole accent color.

## Visual Tokens
| Token | Value |
|---|---|
| Background | `#050505` |
| Panel | `#0a0a0a` |
| Primary text | `#ffffff` |
| Secondary text | `#666666` |
| Border | `rgba(255,255,255,0.15)` |
| Accent | `#C4A1FF` |
| Font display | Funnel Display |
| Font mono | JetBrains Mono, monospace |

## Sections

### 1. HUD Header
- 3-cell grid, 60px tall, 1px bottom border
- Cell 1: `REVYL OS` + purple status dot
- Cell 2: `V. 1.0`
- Cell 3: `MENU +` (triggers slide-in nav panel)
- Existing nav content moves into slide-in panel (reuses existing mobile menu mechanism)

### 2. Hero (60/40 split grid)
- Left (60%): monospace label, large display title "The Mobile\nReliability\nPlatform.", monospace description with left border, 3-cell specs strip
- Right (40%): PhoneShader component, scan lines overlay, `RENDER: LIVE` badge, coordinate display, crosshair corner decoration
- Specs: `10,000+ Parallel Sessions` / `~50ms Latency` / `iOS + Android`

### 3. Feature Stack
- Full-width, below hero
- 3 numbered rows: `[ 01 ] [ 02 ] [ 03 ]`
- 60px number cell (bordered right) + content with title + monospace desc + purple "Learn more →"
- Features: Write tests in plain English / Watch devices run live / Know exactly what went wrong

### 4. Performance Section
- Monospace section label + large display heading
- Existing comparison bars inside full-width bordered container
- 4-cell numbers grid with white→purple gradient values

### 5. Scale Grid
- Display heading + subtext
- 2×2 bordered grid of 4 feature cards (existing images)
- Titles in monospace uppercase, no card backgrounds

### 6. CTA Row
- Full-width bordered row styled like FORMA's "Initialize Environment"
- `Ship with confidence.` text + `→` arrow
- Primary: signup link. Secondary: Book a Demo text link

### 7. Footer
- Keeps all existing content (wordmark SVG, socials, links, compliance badges)
- FORMA border/monospace styling

## What Changes
- `src/pages/index.astro` — full rewrite of markup and inline styles
- HUD header replaces current nav header (nav moves to slide-in panel)
- Background deepens to `#050505`

## What Stays the Same
- All content and copy
- All hrefs
- PhoneShader component
- Feature images and SVGs
- Logo SVGs
- Compliance badge images
- Layout.astro (unchanged)
