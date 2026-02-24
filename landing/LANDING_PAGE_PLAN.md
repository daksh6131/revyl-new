# Revyl Landing Page Plan

## Design Inspiration
- **Cursor**: Clean dark hero with product screenshot, minimal copy
- **Sphinx**: Accent color highlight in hero, elegant typography
- **Scalar**: Hard color transition (light → dark) mid-page, social proof bar

---

## Color Strategy

### Light Section (Hero + Features)
- Background: `#FAFAFA` (off-white)
- Text: `#1C1732` (dark purple-black)
- Accent: `#9D61FF` (Revyl purple)
- Secondary accent: `#FFCE6B` (warm gold) - for highlights

### Dark Section (Technical + CTA)
- Background: `#1C1732` (dark purple-black)
- Text: `#FAFAFA` (off-white)
- Accent: `#C4A1FF` (light purple)
- Code blocks: `#0D0B12` (near black)

---

## Page Structure

### 1. HERO SECTION (Light)
**Layout**: Left-aligned text, right-side product screenshot

**Headline**:
> "Ship mobile apps without the fear"

**Subheadline**:
> "AI-powered testing that sees your app like users do. No flaky selectors. No brittle tests. Just confidence."

**CTA Buttons**:
- Primary: "Book a Demo" (purple)
- Secondary: "View Documentation" (outline)

**Hero Image**: Live test execution screenshot showing:
- Device stream
- Test steps executing
- Real-time progress

**Assets to use**:
- `cognisim-docs/images/live-monitor-test-running-ios.png`
- `webflow-export/images/hero_1.avif`

---

### 2. SOCIAL PROOF BAR (Light, subtle divider)
**Copy**: "Trusted by engineering teams building world-class mobile apps"

**Logos** (placeholder slots for future customers):
- 5-6 company logo placeholders
- Or: "Join teams from Y Combinator, Techstars, and leading mobile studios"

---

### 3. KEY VALUE PROPS (Light, 3-column grid)

**Section Title**: "Why engineers choose Revyl"

| Vision-First | Lightning Fast | Built to Scale |
|--------------|----------------|----------------|
| No element IDs. No accessibility selectors. Our AI sees your app the way users do. | 3x faster than traditional mobile automation. Custom drivers outperform XCUITest and Appium. | From 1 test to 1,000. KEDA-powered autoscaling handles any workload. |

**Icons**: Use Webflow SVG icons from `/images/`

---

### 4. PRODUCT SHOWCASE (Light → transitions to dark)

**Section Title**: "See it in action"

**3 Feature Cards** (alternating left/right layout):

#### Card 1: Natural Language Testing
- **Headline**: "Write tests in plain English"
- **Body**: "Describe what you want to test. Our AI figures out how to do it. No code required."
- **Image**: Test editor with natural language steps
- **Asset**: `cognisim-docs/images/test-editor-multiple-steps.png`

#### Card 2: Real Device Streaming
- **Headline**: "Watch tests run in real-time"
- **Body**: "WebRTC-powered device streaming. See exactly what your app is doing, as it happens."
- **Image**: Live device stream with test overlay
- **Asset**: `cognisim-docs/images/live-monitor-ios-quick-test-3-running-iteration-22.png`

#### Card 3: Intelligent Reporting
- **Headline**: "Know exactly what went wrong"
- **Body**: "Video clips of every action. Step-by-step execution traces. Share reports with one link."
- **Image**: Report view with video and timeline
- **Asset**: `cognisim-docs/images/report-step-detail-expanded.png`

---

### 5. SPEED COMPARISON (Dark section - hard color change)

**Background**: `#1C1732` with subtle grid pattern

**Section Title** (white text):
> "Engineered for speed"

**Speed Stats** (large typography):
```
< 3s        | 3x faster      | 50+
Simulator   | Than Appium    | Parallel
Boot Time   | Execution      | Tests
```

**Body copy**:
> "We don't use off-the-shelf automation. Every component—from device drivers to video streaming—is built from scratch for performance."

**Technical callouts** (code-style blocks):
- Custom GStreamer pipelines for H.264 capture
- Direct UIAutomator2 integration (no Appium overhead)
- fb-idb for iOS (faster than XCUITest)
- WebRTC via Cloudflare for sub-100ms latency

---

### 6. CI/CD INTEGRATION (Dark)

**Section Title**: "Fits your workflow"

**Copy**: "Run Revyl tests from GitHub Actions, CircleCI, or any CI/CD platform. One API call to parallel test your entire suite."

**Code Block** (syntax highlighted):
```yaml
- name: Run Revyl Tests
  uses: revyl/test-action@v1
  with:
    api_key: ${{ secrets.REVYL_API_KEY }}
    workflow_id: your-workflow-id
    parallel: 10
```

**Asset**: `webflow-export/images/feature-chart-*.avif` (CI/CD graphics)

---

### 7. FOR ENGINEERING LEADERS (Dark)

**Section Title**: "Built for teams that ship"

**Two-column layout**:

**Left Column - For Developers**:
- Natural language test creation
- Real-time device streaming
- Video debugging for every failure
- Works with any app (no SDK required)

**Right Column - For Engineering Leaders**:
- DORA metrics and test analytics
- Parallel execution at scale
- Cost tracking per test
- Enterprise security (SOC 2 in progress)

---

### 8. TECHNICAL PHILOSOPHY (Dark)

**Quote Block** (large, centered):
> "We roll our own infrastructure because off-the-shelf tools aren't fast enough. Every millisecond matters when you're running thousands of tests."

**Attribution**: "— Revyl Engineering Team"

**Supporting points** (smaller text):
- Custom device drivers, not Appium wrappers
- Vision-based grounding, not brittle selectors
- Stream-first architecture, not screenshot polling
- Kubernetes-native, not legacy infrastructure

---

### 9. CTA SECTION (Dark with purple gradient accent)

**Headline**:
> "Ready to ship with confidence?"

**Subheadline**:
> "Book a demo and see how Revyl can transform your mobile testing."

**CTA Button**: "Book a Demo" (purple, large)

**Secondary**: "Or explore our docs →"

---

### 10. FOOTER (Dark)

Standard footer with:
- Logo
- Navigation links (Product, Docs, Blog, Pricing)
- Social links (Twitter, LinkedIn, GitHub)
- Legal links (Privacy, Terms)

---

## Assets to Copy

### From Webflow (`/webflow-export/images/`):
- `hero_1.avif` - Hero background
- `hero-gradient-line.avif` - Gradient accent
- `feature-bg-*.avif` - Feature backgrounds
- `feature-chart-*.avif` - Chart graphics
- SVG icons for features

### From Docs (`/cognisim-docs/images/`):
- `live-monitor-test-running-ios.png` - Live test execution
- `test-editor-multiple-steps.png` - Test creation
- `report-step-detail-expanded.png` - Reporting
- `workflow-report-*.png` - Workflow views

### From Frontend (`/frontend/build/images/`):
- `CICD.svg` - CI/CD graphic
- `demo_photo.png` - Product demo

---

## Key Messaging Principles

1. **Engineers respect engineers**: Lead with technical credibility, not marketing fluff
2. **Show, don't tell**: Product screenshots > abstract graphics
3. **Speed is a feature**: Emphasize performance throughout
4. **Vision-only is the differentiator**: No selectors = no flaky tests
5. **Built from scratch**: Custom infrastructure signals quality
6. **Scale without compromise**: Enterprise-ready from day one

---

## Implementation Order

1. **Phase 1**: Hero + Social Proof + Value Props (light section)
2. **Phase 2**: Product Showcase cards
3. **Phase 3**: Dark section (Speed + CI/CD)
4. **Phase 4**: For Teams + Philosophy + CTA
5. **Phase 5**: Polish animations and responsive

---

## Typography

- **Headlines**: Funnel Display, light weight (300)
- **Body**: Public Sans, regular (400)
- **Code**: JetBrains Mono or similar monospace
- **Accent text**: Funnel Display, medium (500)

---

## Next Steps

1. Copy documentation images to `/public/images/docs/`
2. Build hero section with product screenshot
3. Implement light → dark transition
4. Add each section incrementally
5. Test responsive behavior
6. Add subtle scroll animations
