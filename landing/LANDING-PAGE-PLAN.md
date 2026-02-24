# Landing Page Plan

## Current Page Structure (index.astro)

### LIVE Sections (in order)

1. **Hero** — Phone (shader placeholder) left, text right
   - Title: "The Mobile Reliability Platform."
   - Subtitle: "Ship faster. Break nothing."
   - CTA: "Get Started" → app.revyl.ai/signup

2. **Customer Logos** — 8-box grid (placeholder text names: Stripe, Notion, Linear, Vercel, Figma, Slack, Discord, Airbnb)
   - TODO: Replace with real customer logos

3. **AI-Native Testing** — 3 alternating image+text feature cards
   - "Write tests in plain English"
   - "Watch tests run live"
   - "Know exactly what went wrong"

4. **Purpose-built for speed** — Giant gradient stats (needs rework, see below)
   - <3s boot time
   - <100ms stream latency
   - 3x faster than Appium

5. **Every build. Every PR. Every time.** — 2x2 card grid with SVG images
   - Parallel Test Runs (2.svg)
   - Reporting (1.svg)
   - Drag and Drop .zip/.apk/.app (3.svg)
   - Call from CI/CD (5.svg)

6. **Ship with confidence.** — Closing CTA
   - Get Started + Book a Demo buttons

7. **Footer** — Oneleet badges, social links, legal

---

### HIDDEN Sections (commented out in index.astro)

**Set the Stage** (manifesto moment)
- Copy: "Writing code got 10x faster. Knowing it works didn't."
- Style: text-only, centered, cardBg background
- Status: Commented out. Could bring back once copy is finalized.

**Fits your workflow** (CLI + CI/CD)
- Two-column grid: CLI terminal mockup + CI/CD YAML example
- Copy: `revyl test run --suite smoke --platform ios`
- Status: Hidden. Good content but felt redundant with the 2x2 grid CI/CD card.

**Works with your stack** (framework list)
- Horizontal list: React Native, Expo, Flutter, SwiftUI, Kotlin, Cordova, Ionic
- Copy: "No SDK required. Test any mobile app."
- Status: Hidden. Could work as a subtle strip between sections.

---

## Available SVG Assets (/public/images/)

| File | Content | Currently Used |
|------|---------|----------------|
| 1.svg | Reporting dashboard | Yes (2x2 grid) |
| 2.svg | Parallel test runs | Yes (2x2 grid) |
| 3.svg | Drag and drop upload | Yes (2x2 grid) |
| 4.svg | Unknown | No |
| 4_1.svg | Unknown (large, 138KB) | No |
| 5.svg | CI/CD integration | Yes (2x2 grid) |

Other SVGs: CheckCircle, Frame-*, GitCommit, Lightning, Vector-3, android, iphone, compliance icons, radar, robot, swap, grid-pattern-hero, texture-hero, nav icons

Feature images: feature-img-bg-1.avif, feature-img-bg-2.avif, feature-img-bg-3.avif (used in AI-Native Testing cards)

Device frame: /devices/apple-iphone-16-black-portrait.png (used in hero PhoneShader)

---

## Platform Differentiators (from codebase research)

These are real technical details from the Revyl monorepo that can be used in copy:

### Infrastructure
- **K8s sidecar emulators** — Android emulators boot as Kubernetes sidecars, fully ready before the worker registers
- **Pre-warmed pools** — Mac workers pre-warm Android emulators in background at startup (saves 30-60s first-task latency)
- **Per-slot user isolation (iOS)** — Each simulator slot runs under a dedicated macOS user for OS-level isolation
- **20 concurrent sessions per user**, 64-thread pool, configurable worker slots

### Drivers (why faster than Appium)
- **Direct gRPC to Android Emulator Controller** — persistent channel, zero per-command overhead for tap/screenshot/swipe
- **Direct IDB gRPC for iOS** — Facebook's iOS DeviceBridge, no Appium WebDriver layer
- **ADB Keyboard IME** — broadcast-based text injection, not keyevent simulation
- **Screenshot validation** — PIL verify prevents invalid images from reaching LLM

### Streaming
- **30fps WebRTC via Cloudflare WHIP/WHEP** — H.264 passthrough (Android scrcpy), H.264 stream (iOS IDB)
- **Ring buffer architecture** — 100ms MPEG-TS segments, 120s rolling buffer, tee'd to live stream + clip extraction
- **Segment protection** — clips from step start are protected from cleanup until reflection LLM processes them

### AI Pipeline (Two-Stage)
- **Stage 1: Instruction LLM** — takes screenshot + NL step + history, outputs typed action with battleship-grid bounding box (4x6 grid, A1-D6)
- **Stage 2: Vision Grounder** — custom 7B model (gta1-7b-base) or Moondream3, takes cropped region + hint, returns pixel (x,y)
- **Reflection loop** — after each action, watches before/after video at 4x speed via Gemini, decides pass/retry/error
- **Persistent memory** — key-value notes maintained across steps
- **Smart validation** — can take corrective actions (dismiss popups) before evaluating pass/fail

### Action Cache (killer feature)
- First run: LLM reasoning (~3s, ~$0.01 per action)
- Cached runs: grounder only (~100ms, $0 per action) — **30x faster, free**
- Validation steps never cached (must check current state)

### CLI (Go binary)
- 40+ MCP tools — works with Cursor, Claude Code, Windsurf, VS Code
- Hot reload (Expo) — local dev server → Cloudflare tunnel → tests run against live JS changes
- GitHub Actions: `RevylAI/revyl-gh-action/run-test@main`
- Commands: test create/run/push/pull/diff/validate, workflow, app, build, device, module, tag, doctor, status, report

### Reporting
- **Streaming writes** — results visible in real-time as test runs, not batch after
- **Shareable links** — time-limited shareable report URLs
- **Quality scoring** — automated LLM judge grades A-F based on grounding accuracy, retry count
- **Grounder training** — UI can submit corrections for fine-tuning

### Supported Actions (full gesture vocabulary)
- TAP, DOUBLE_TAP, LONG_PRESS (1500ms / 3000ms)
- INPUT, CLEAR_TEXT
- SWIPE: 7 distances (NANO→FULL) × 4 speeds (SLOW→FLICK)
- DRAG, PINCH (zoom in/out)
- OPEN_APP, KILL_APP, GO_HOME, NAVIGATE (URL/deep link)
- WAIT, EXTRACT, SCRAPE
- SET_LOCATION, DOWNLOAD_FILE, BACK
- DECISION, LOOP, MODULE_IMPORT, CODE_EXECUTION

### Platform Specifics
- iOS: iPhone 16, iOS 18.6, system apps supported
- Android: Pixel 7, API 34, gRPC + ADB dual mode, crash detection
- No SDK required — test any .ipa/.apk as-is

---

## Section Ideas (not yet built)

### "How it works" (architecture reveal)
Show the two-stage AI pipeline visually: Screenshot → LLM Decision → Grounder → Action → Reflection → Next Step

### "Action Cache" (speed story)
First run vs cached run comparison. Show the 30x speedup and $0 cost on repeat runs.

### "MCP + IDE Integration"
Show Revyl running from Cursor/Claude Code. 40+ tools available in your AI coding assistant.

### "Hot Reload Testing" (Expo)
Live code changes → instant test reruns without rebuilding. Cloudflare tunnel architecture.

### "Self-Correcting Agent"
Visual of the reflection loop: action → video capture → 4x playback → Gemini analysis → retry or advance.

### Social Proof / Testimonials
Currently just placeholder company names. Need real logos and quotes.

---

## Design System Reference

- Background: `#151619` (hsl 240 5% 9%)
- Card surface: `#1a1a1e` (hsl 240 5% 14%)
- Borders: `border-gray-600`
- Brand purple (light): `#9D61FF`
- Brand purple (dark/landing): `#C4A1FF`
- Fonts: Funnel Display (headers), Public Sans (body)
- forceDark=true on landing page (hardcoded dark colors, not CSS variables)
