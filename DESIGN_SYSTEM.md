# Design System Specification — KOD Technical Services

**Document Version**: 2.0.0  
**Phase**: Chapter 2 — Visual Identity & Implementation-Ready Design System  
**Status**: APPROVED & READY FOR ARCHITECTURE  
**Target Delivery**: October 31, 2026

---

## 1. Design Philosophy: Confident Industrial Engineering

KOD Technical Services is an indigenous oil and gas engineering and rotating equipment servicing firm based in Port Harcourt, Rivers State, Nigeria. 

The visual identity must command the trust of refinery operators, offshore asset managers, procurement executives, and chief mechanical engineers.

### Core Visual Tenets:
1. **Mechanical Precision Over Ornamentation**: Grid lines, technical callouts, high-contrast data readouts, and structured spacing replace decorative gradients, soft rounded corners, and pastel colors.
2. **Heavy Industrial Contrast**: Deep oceanic navies (`#070B19`, `#0D1B2A`) and machined slates provide the foundation. Safety Amber (`#F59E0B`) provides purposeful visual hierarchy for action points, critical equipment statuses, and emergency hotlines.
3. **Legitimate Authority**: Every visual element communicates capability. No stock photos of models with clean hard hats shaking hands. All visual assets must convey machinery, workshop tooling, pump internals, precision tolerances, and industrial environments.
4. **Cinematic Hero Ready**: Layouts, typography, and contrast tokens are architected specifically to frame a high-fidelity 3D rotating pump assembly in Chapter 7 without visual clutter.

---

## 2. Design Tokens & Variables

### 2.1 Color Palette

#### Primary Architectural Canvas (Dark Theme Native)
| Token Name | Hex Code | HSL | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--color-navy-void` | `#050814` | `227°, 60%, 5%` | Ultra-deep background for hero and base layout |
| `--color-navy-base` | `#0A1128` | `227°, 60%, 10%` | Primary background canvas for main sections |
| `--color-navy-surface` | `#101C3D` | `224°, 58%, 15%` | Card background, input fills, dropdown shells |
| `--color-navy-elevated` | `#172554` | `224°, 57%, 21%` | Hovered card state, modal shells, popovers |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | — | Default card and section borders |
| `--color-border-active` | `rgba(245, 158, 11, 0.40)` | — | Focused or active card border |

#### Neutral & Light Contrast (Alternating Sections & Typography)
| Token Name | Hex Code | HSL | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--color-text-primary` | `#F8FAFC` | `210°, 40%, 98%` | High-emphasis headers, titles, metrics |
| `--color-text-secondary` | `#CBD5E1` | `214°, 32%, 84%` | Body copy, technical descriptions |
| `--color-text-muted` | `#94A3B8` | `215°, 16%, 65%` | Technical metadata, captions, footer copy |
| `--color-neutral-light` | `#F1F5F9` | `210°, 40%, 96%` | Light section background (high-contrast contrast breaks) |
| `--color-text-inverse` | `#0F172A` | `222°, 47%, 11%` | Typography on light neutral backgrounds |

#### Industrial Accent & Telemetry
| Token Name | Hex Code | HSL | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--color-amber-primary` | `#F59E0B` | `38°, 92%, 50%` | Primary CTAs, key accents, focus rings |
| `--color-amber-hover` | `#D97706` | `37°, 91%, 44%` | Button hover states, active indicators |
| `--color-amber-subtle` | `rgba(245, 158, 11, 0.12)` | — | Badge fills, active menu pill backgrounds |
| `--color-cyan-telemetry` | `#06B6D4` | `189°, 94%, 43%` | Condition monitoring, vibration specs, 3D nodes |
| `--color-success-green` | `#10B981` | `160°, 84%, 39%` | Verified operational status, online indicators |
| `--color-error-red` | `#EF4444` | `0°, 84%, 60%` | Critical equipment alert, form validation error |

---

### 2.2 Typography Scale

* **Display & Primary Headings**: `Syne`, sans-serif (Fallback: `Cabinet Grotesk`, `system-ui`) — Mechanical geometry, confident industrial weight.
* **Body & UI Elements**: `Inter`, sans-serif — High legibility, tabular numerals, clean x-height for complex specifications.
* **Technical Readouts & Badges**: `JetBrains Mono`, monospace (Fallback: `Roboto Mono`, `monospace`) — Equipment serials, engineering standards (API 610, ISO 10816), technical specs.

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Tracking | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1 (Hero)** | `64px` (`4.0rem`) | `40px` (`2.5rem`) | `800` | `1.08` | `-0.025em` | `Syne` |
| **Heading 1 (Page)** | `48px` (`3.0rem`) | `32px` (`2.0rem`) | `700` | `1.15` | `-0.020em` | `Syne` |
| **Heading 2 (Section)**| `36px` (`2.25rem`)| `26px` (`1.625rem`)| `700`| `1.22` | `-0.015em` | `Syne` |
| **Heading 3 (Card)** | `22px` (`1.375rem`)| `19px` (`1.188rem`)| `600`| `1.30` | `-0.010em` | `Syne` |
| **Heading 4 (Subhead)**| `18px` (`1.125rem`)| `16px` (`1.0rem`) | `600` | `1.35` | `0.000em` | `Inter` |
| **Body Large** | `18px` (`1.125rem`)| `16px` (`1.0rem`) | `400` | `1.60` | `0.000em` | `Inter` |
| **Body Base** | `15px` (`0.938rem`)| `15px` (`0.938rem`)| `400` | `1.55` | `0.000em` | `Inter` |
| **Body Small** | `13px` (`0.813rem`)| `13px` (`0.813rem`)| `400` | `1.50` | `0.005em` | `Inter` |
| **Technical Kicker** | `12px` (`0.75rem`) | `11px` (`0.688rem`)| `700` | `1.40` | `+0.080em` | `JetBrains Mono` (Uppercase) |
| **Data Metric Numeral**| `52px` (`3.25rem`)| `38px` (`2.375rem`)| `700`| `1.00` | `-0.030em` | `JetBrains Mono` |

---

### 2.3 Spacing, Grid & Sizing Tokens

* **Base Unit**: 8px spatial grid.

| Token | Size | Purpose |
| :--- | :--- | :--- |
| `--space-1` | `4px` | Micro offsets, badge internal padding |
| `--space-2` | `8px` | Icon-to-text gaps, tight list items |
| `--space-3` | `12px` | Compact button padding, card tags |
| `--space-4` | `16px` | Standard button padding, form control spacing |
| `--space-6` | `24px` | Card internal padding, mobile gutter |
| `--space-8` | `32px` | Grid column gutters, sub-component separation |
| `--space-12` | `48px` | Subsection margins, hero callout spacing |
| `--space-16` | `64px` | Standard section vertical padding (mobile) |
| `--space-24` | `96px` | Standard section vertical padding (desktop) |
| `--space-32` | `128px`| Major transition section padding |

#### Container Widths
* **Content Max Width**: `1280px` (`max-w-7xl`)
* **Prose / Article Width**: `740px` (`max-w-3xl`)
* **Narrow Form Container**: `580px` (`max-w-xl`)
* **Screen Gutters**: `16px` (mobile < 640px), `32px` (tablet 640px–1024px), `48px` (desktop > 1024px)

#### Breakpoints
* `sm`: `640px` (Large phones / portrait tablets)
* `md`: `768px` (Tablets)
* `lg`: `1024px` (Laptops & desktop engineering workstations)
* `xl`: `1280px` (Full desktop viewports)
* `2xl`: `1536px` (Ultra-wide enterprise monitors)

---

### 2.4 Radii & Elevation Tokens

#### Precision Mechanical Radii
* `--radius-none`: `0px` (Sharp grid lines, section headers, technical badges)
* `--radius-sm`: `3px` (Form inputs, small technical chips, tabs)
* `--radius-md`: `6px` (Service cards, quotation forms, modal shells)
* `--radius-lg`: `10px` (Major container shells, image cards)
* *Note: Bubble or pill radii (> 12px) are strictly prohibited except for circular indicator dots or compact badges.*

#### Elevations & Shadows
* `--shadow-industrial-sm`: `0 2px 4px rgba(0, 0, 0, 0.4)`
* `--shadow-industrial-md`: `0 6px 18px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)`
* `--shadow-industrial-lg`: `0 16px 36px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)`
* `--shadow-amber-glow`: `0 0 20px rgba(245, 158, 11, 0.25)`

---

### 2.5 Motion & Animation Tokens

* **Fast Micro-interaction**: `150ms cubic-bezier(0.16, 1, 0.3, 1)` (Button clicks, hover states, tab shifts)
* **Standard Transition**: `280ms cubic-bezier(0.16, 1, 0.3, 1)` (Card hover lift, dropdown reveal, accordion open)
* **Deliberate Reveal**: `450ms cubic-bezier(0.16, 1, 0.3, 1)` (Modal entry, drawer slide-out)
* **Cinematic Viewport Entry**: `700ms cubic-bezier(0.16, 1, 0.3, 1)` (Section scroll trigger, metric counter roll)

---

## 3. Shared Component Specifications

### 3.1 Buttons & Interactive Controls

#### Button Hierarchy
1. **Primary Action ("Request Quote", "Emergency Callout")**:
   - Background: `--color-amber-primary` (`#F59E0B`)
   - Text: `--color-navy-void` (`#050814`), Weight: `700`, uppercase tracking `+0.03em`
   - Border: `1px solid #D97706`
   - Hover: Background `#D97706`, `--shadow-amber-glow`
   - Active: Scale `0.98`
   - Focus: Visible 2px outline in `#F59E0B` with `2px` offset

2. **Secondary Industrial ("Explore Engineering Services", "Download Spec")**:
   - Background: `--color-navy-surface` (`#101C3D`)
   - Text: `--color-text-primary` (`#F8FAFC`), Weight: `600`
   - Border: `1px solid rgba(255, 255, 255, 0.16)`
   - Hover: Border `rgba(245, 158, 11, 0.6)`, Background `#172554`

3. **Technical Ghost / Text Link ("View Technical Details →")**:
   - Text: `--color-amber-primary` (`#F59E0B`), Weight: `600`, font: `JetBrains Mono`
   - Icon: Directional arrow with `3px` rightward slide transition on hover
   - Underline: `1px solid transparent` -> `1px solid #F59E0B` on hover

4. **Emergency Hotlines Pill (Sticky / Header / Mobile)**:
   - Green pulsating ping indicator (`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse`)
   - Phone link dialing `tel:+2348037270249`
   - High visibility on mobile viewports

---

### 3.2 Header & Navigation Bar

* **Position**: Sticky at top (`z-index: 50`)
* **Background**: `--color-navy-void` (`rgba(5, 8, 20, 0.92)`) with `backdrop-filter: blur(12px)`
* **Height**: Desktop `76px`, Mobile `64px`
* **Border Bottom**: `1px solid rgba(255, 255, 255, 0.08)`
* **Layout Structure**:
  - **Left**: KOD Technical Services Logo & Facility Descriptor (`Port Harcourt, NG`)
  - **Center**: Navigation Links (`About`, `Services [Dropdown: 11 Capabilities]`, `Projects & Overhauls`, `Machine Shop`, `Contact`)
  - **Right**: 
    - Verified Phone Hotline Pill: `+234 (0) 803 727 0249`
    - High-Visibility Button: `Request Quote`
* **Mobile Drawer**:
  - Full viewport slide-over with dark backdrop
  - Large touch targets (minimum `48px` tap height)
  - Direct quick-action buttons for WhatsApp (`https://wa.me/2348037270249`) and Phone Dial

---

### 3.3 Cards Architecture

#### A. Service Capability Card (11 Services Matrix)
* **Shell**: Background `--color-navy-surface`, border `1px solid rgba(255, 255, 255, 0.08)`, radius `6px`
* **Header**: Monospace discipline index tag (e.g., `[// 04. ALIGNMENT]`) + Dynamic status icon
* **Title**: `H3` in `Syne`, 20px, `#F8FAFC`
* **Description**: Concise 2-line technical scope (e.g., *"Laser alignment of multi-stage pumps to within 0.03mm tolerance, eliminating coupling shear and bearing heat."*)
* **Equipment Tags**: Chips indicating covered equipment (e.g., `API 610 Centrifugal`, `Split-Case`, `Gearbox`)
* **Interactive State**:
  - Top border activates `2px solid #F59E0B`
  - Subtle Y-axis lift (`-4px`)
  - Arrow icon translates `+4px`

#### B. Technical Metric / Stat Card
* Large Monospace Figure: `48px–56px`, `JetBrains Mono`, `#F59E0B`
* Engineering Metric Label: `12px`, uppercase tracking `+0.08em`, `#94A3B8`
* Subtle technical grid rule or crosshair graphic in background

---

### 3.4 Forms & Data Capture

* **Form Background**: `--color-navy-base` (`#0A1128`) inside a structured container
* **Input Fields**:
  - Height: `46px` (mobile `48px`)
  - Background: `--color-navy-void` (`#050814`)
  - Border: `1px solid #1E293B`
  - Focus Ring: `2px solid #F59E0B`
  - Text Color: `#F8FAFC`
  - Placeholder: `#64748B`
* **Labels**: Above input, `13px`, font `Inter`, weight `500`, `#CBD5E1`
* **Field Validation States**:
  - Error: Border `#EF4444`, error text in `12px` font with warning icon
  - Valid: Border `#10B981`
* **Spam Prevention**: Hidden honeypot input (`website_hp`) + timestamp token + CSRF header
* **Server Action**: Real asynchronous submission delivering to verified email endpoint with user feedback notification

---

### 3.5 Footer Architecture

* **Background**: `--color-navy-void` (`#050814`)
* **Border Top**: `1px solid rgba(255, 255, 255, 0.10)`
* **Content Columns**:
  1. **Brand & Credibility**: KOD Technical Services wordmark, RC/registration status note, Port Harcourt facility address, working hours (`Mon–Fri: 8AM–5PM`).
  2. **Technical Divisions (Categorized Services)**:
     - *Rotating Machinery*: Pump Maintenance, Overhauling, Retrofitting, Pre-Comm & Commissioning
     - *Precision Maintenance*: Laser Alignment, Condition Monitoring, Machine Shop Services
     - *Industrial Supply*: Procurement Services, OEM Representation, Turnkey Installation
  3. **Verified Direct Contacts**: Clickable telephone links (`+2348037270249`, `+2348071771174`), direct email (`info@kodtechnical.com`), WhatsApp direct dispatch.
  4. **Emergency Callout Notice**: Prominent banner for urgent rig-site pump breakdowns and unplanned facility downtime.
* **Legal Bar**: Real copyright notice (`© 2026 KOD Technical Services. All Rights Reserved.`), clean privacy and terms destinations (no external demo links!).

---

## 4. Brand Asset Strategy & Logo Modernization

### 4.1 Reality of the Existing Logo
* **Legacy Source**: Downloaded in Chapter 1 from `https://kodtechnical.com/wp-content/uploads/2024/03/Screenshot_from_2024-03-14_16-52-50-removebg-preview-1.png`.
* **Attributes**: 280x150 pixels, 5.8KB PNG, low raster resolution, blurry on Retina/HiDPI screens.
* **Graphic Elements**: Blue/green globe, orbital red arrows, script-style "KOD" lettering.

### 4.2 Handling Protocol (Strict Compliance with User Instructions)
1. **No False Representation**: We do NOT represent an AI or hand-generated SVG as the company's officially trademarked vector file.
2. **Dual-Track Protocol**:
   - **Track A (Official Asset Request)**: The client CEO is formally requested to provide the original high-resolution master file (`.ai`, `.eps`, or high-res transparent master).
   - **Track B (Interim Hi-DPI Vector Wordmark)**: For the web implementation, we construct a crisp, pixel-perfect SVG brand lockup combining:
     a) An enhanced geometric engineering symbol honoring the globe/orbital flow
     b) A crisp industrial wordmark **"KOD TECHNICAL SERVICES"** set in geometric industrial lettering with the sub-line **"ROTATING EQUIPMENT & OILFIELD ENGINEERING • PORT HARCOURT"**.
3. **Clearance Rules**: Minimum padding of `16px` on all sides; minimum rendered height `36px` on mobile, `44px` on desktop.

---

## 5. Imagery & Visual Content Standards

### 5.1 Permitted Subject Matter
* Industrial centrifugal, split-case, positive displacement, and submersible pumps.
* Heavy industrial gearboxes, shaft couplings, and impellers.
* Laser alignment tooling, dial indicators, and precision measurement equipment.
* Lathes, milling machines, and machining operations in an ultra-modern machine shop.
* Offshore platforms, FPSOs, refinery piping, and petrochemical processing facilities.

### 5.2 Image Treatment & Color Grading
* **Tone**: Cool steel, deep oceanic slate, and warm mechanical friction highlights.
* **Contrast**: High contrast with deep blacks (`#050814`).
* **Overlay**: Dark gradient scrims (`linear-gradient(180deg, rgba(5,8,20,0.2) 0%, rgba(5,8,20,0.85) 100%)`) applied when overlaid with text to guarantee WCAG AAA contrast.
* **Prohibited**: Clip-art, cartoonish 3D icons, generic office stock photos, medical or charity imagery.

---

## 6. Accessibility & Reduced-Motion Rules

### 6.1 Contrast Verification
* **Level**: WCAG 2.1 AA compliant across all interfaces; AAA compliant on primary reading surfaces.
* **Measured Ratios**:
  - Technical White (`#F8FAFC`) on Navy Void (`#050814`): **18.4 : 1** (Passes AAA)
  - Muted Platinum (`#CBD5E1`) on Navy Base (`#0A1128`): **9.8 : 1** (Passes AAA)
  - Safety Amber (`#F59E0B`) on Navy Void (`#050814`): **9.2 : 1** (Passes AAA)
  - Navy Void (`#050814`) on Safety Amber (`#F59E0B`): **9.2 : 1** (Passes AAA for button labels)

### 6.2 Screen Reader & Semantic Requirements
* Proper landmarks on all pages: `<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`, `<section aria-labelledby="...">`.
* All interactive elements have descriptive `aria-label` or accessible text.
* Phone links formatted with explicit international protocol: `tel:+2348037270249`.
* Form inputs connected to `<label for="...">` with `aria-describedby` for validation hints.

### 6.3 Reduced-Motion Enforcement
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
* In Chapter 7, the 3D rotating canvas will automatically disable continuous rotation and render a high-resolution, static 2D perspective when `prefers-reduced-motion` is detected.

---

## 7. Responsive Layout Rules by Page

| Page | Desktop (> 1024px) | Tablet (768px – 1023px) | Mobile (< 768px) |
| :--- | :--- | :--- | :--- |
| **Homepage** | 2-column hero (copy left, 3D interactive right); 3-column service grid; 4-stat bar | 1-column hero with 3D canvas beneath headline; 2-column service grid | Stacked hero with static visual fallback; swipeable or 1-column service cards; sticky emergency dial bar |
| **Services Overview** | 3-column categorized technical cards with hover inspection drawers | 2-column cards | 1-column cards with accordion breakdown for covered equipment |
| **Service Detail** | 2-column: 65% engineering specs / 35% sticky quotation sidebar | Stacked with sidebar beneath specs | Stacked with floating "Get Service Quote" modal trigger |
| **Projects** | Filterable masonry grid with technical parameter badges | 2-column grid | 1-column list with quick category pills |
| **About Us** | Asymmetric editorial layout with facility timeline & C.O.R.E values | 2-column layout | 1-column narrative with icon highlight blocks |
| **Contact** | 2-column: 45% verified direct info + facility details / 55% inquiry builder | Stacked: Info top, form below | Stacked: Instant tap-to-call buttons top, quick inquiry form below |
 -->