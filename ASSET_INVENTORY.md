# Asset Inventory — KOD Technical Services Website Rebuild

**Date of Audit:** October 30 – November 1, 2026
**Source Website:** https://kodtechnical.com (WordPress)
**WordPress Media Library API:** `https://kodtechnical.com/wp-json/wp/v2/media` (publicly accessible, 88 items)
**Total assets recovered:** 30 usable assets (logo × 3, engineering photos × 15, client logos pending permission × 12)

---

## Summary

| Category | Count | Status |
|---|---|---|
| KOD Official Logo (PNG, background-removed) | 3 variants | Integrated |
| Authentic KOD Field Engineering Photographs | 15 images | Integrated |
| Third-party client/operator logos | 12 assets | Quarantined — CEO authorization required |
| Corporate Profile PDF | 0 | Not recovered — Google Doc link returned HTTP 410 (deleted/private) |
| WordPress theme demo assets | 34+ items | Excluded — not integrated |

---

## Asset Inventory Table

| Asset | Original URL | Local Path | Type | Dimensions | Classification | Usage Status |
|---|---|---|---|---|---|---|
| `kod-logo-icon.png` | https://kodtechnical.com/wp-content/uploads/2024/03/cropped-Screenshot_from_2024-03-14_16-52-50-removebg-preview.png | `public/images/brand/kod-logo-icon.png` | PNG (RGBA) | 512×512 | Official company asset | **Integrated — header & footer** |
| `kod-logo.png` | https://kodtechnical.com/wp-content/uploads/2024/03/Screenshot_from_2024-03-14_16-52-50-removebg-preview.png | `public/images/brand/kod-logo.png` | PNG (RGBA) | 666×375 | Official company asset | Available for alternate usage |
| `kod-logo-thumb.png` | https://kodtechnical.com/wp-content/uploads/2024/03/Screenshot_from_2024-03-14_16-52-50-removebg-preview-1.png | `public/images/brand/kod-logo-thumb.png` | PNG (RGBA) | 90×51 | Official company asset — thumbnail | Available (too small for header display) |
| `field-compressor-skid-siemens.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_195854.jpg | `public/images/engineering/field-compressor-skid-siemens.jpg` | JPEG | 1198×739 | Likely company photograph — confirmation required | **Integrated — About page gallery** |
| `field-compressor-housing-detail.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_195854-1.jpg | `public/images/engineering/field-compressor-housing-detail.jpg` | JPEG | 1198×726 | Likely company photograph — confirmation required | Available |
| `field-associated-gas-compressor-station.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_195949.jpg | `public/images/engineering/field-associated-gas-compressor-station.jpg` | JPEG | 1177×724 | Likely company photograph — confirmation required | **Integrated — About page gallery** |
| `field-casing-overhaul-bearings.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_200035.jpg | `public/images/engineering/field-casing-overhaul-bearings.jpg` | JPEG | 1174×729 | Likely company photograph — confirmation required | Available |
| `field-internal-casing-inspection.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_200049.jpg | `public/images/engineering/field-internal-casing-inspection.jpg` | JPEG | 1198×735 | Likely company photograph — confirmation required | Available |
| `field-process-piping-rack-structure.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_200106.jpg | `public/images/engineering/field-process-piping-rack-structure.jpg` | JPEG | 1196×728 | Likely company photograph — confirmation required | Available |
| `field-process-piping-manifold.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_200146.jpg | `public/images/engineering/field-process-piping-manifold.jpg` | JPEG | 1197×724 | Likely company photograph — confirmation required | Available |
| `field-plant-infrastructure-overview.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG_20190401_200210.jpg | `public/images/engineering/field-plant-infrastructure-overview.jpg` | JPEG | 1198×731 | Likely company photograph — confirmation required | Available |
| `field-nov-multiplex-pump-servicing.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0016.jpg | `public/images/engineering/field-nov-multiplex-pump-servicing.jpg` | JPEG | 1080×810 | Likely company photograph — confirmation required | **Integrated — About page & Projects page** |
| `field-crew-gas-manifold-maintenance.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0017.jpg | `public/images/engineering/field-crew-gas-manifold-maintenance.jpg` | JPEG | 1080×810 | Likely company photograph — confirmation required | **Integrated — About page & Projects page** |
| `field-gas-scrubber-instrumentation.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0019.jpg | `public/images/engineering/field-gas-scrubber-instrumentation.jpg` | JPEG | 1080×810 | Likely company photograph — confirmation required | **Integrated — Projects page** |
| `field-spdc-fuel-gas-scrubber.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0020.jpg | `public/images/engineering/field-spdc-fuel-gas-scrubber.jpg` | JPEG | 1080×810 | Likely company photograph — confirmation required | **Integrated — Homepage hero & Projects page** |
| `field-gas-conditioning-skid-hoist.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0021.jpg | `public/images/engineering/field-gas-conditioning-skid-hoist.jpg` | JPEG | 1080×810 | Likely company photograph — confirmation required | **Integrated — Projects page** |
| `field-pump-skid-shelter-installation.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0022.jpg | `public/images/engineering/field-pump-skid-shelter-installation.jpg` | JPEG | 1080×810 | Likely company photograph — confirmation required | **Integrated — Projects page** |
| `field-flare-knockout-drum.jpg` | https://kodtechnical.com/wp-content/uploads/2024/03/IMG-20200305-WA0023.jpg | `public/images/engineering/field-flare-knockout-drum.jpg` | JPEG | 810×1080 | Likely company photograph — confirmation required | **Integrated — Projects page** |
| `shell-logo.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/269_shell.webp | `public/images/clients-pending-permission/shell-logo.webp` | WebP | 860×645 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `shell-logo-modified.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/269_shell-modified.webp | `public/images/clients-pending-permission/shell-logo-modified.webp` | WebP | 860×645 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `chevron-logo.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/Chevron-Logo-700x394-1.webp | `public/images/clients-pending-permission/chevron-logo.webp` | WebP | 700×394 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `chevron-logo-modified.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/Chevron-Logo-700x394-1-modified.webp | `public/images/clients-pending-permission/chevron-logo-modified.webp` | WebP | 700×394 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `eni-agip-logo.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/agip-logo-vector.webp | `public/images/clients-pending-permission/eni-agip-logo.webp` | WebP | 400×400 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `eni-agip-logo-modified.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/agip-logo-vector-modified.webp | `public/images/clients-pending-permission/eni-agip-logo-modified.webp` | WebP | 400×400 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `totalenergies-logo.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/621f91f2654abf384c30d646.webp | `public/images/clients-pending-permission/totalenergies-logo.webp` | WebP | 635×393 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `totalenergies-logo-modified.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/621f91f2654abf384c30d646-modified.webp | `public/images/clients-pending-permission/totalenergies-logo-modified.webp` | WebP | 635×393 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `seplat-energy-logo.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/ng-seplat-logo.webp | `public/images/clients-pending-permission/seplat-energy-logo.webp` | WebP | 500×500 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `seplat-energy-logo-modified.webp` | https://kodtechnical.com/wp-content/uploads/2024/03/ng-seplat-logo-modified.webp | `public/images/clients-pending-permission/seplat-energy-logo-modified.webp` | WebP | 500×500 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `exxonmobil-logo.svg` | https://kodtechnical.com/wp-content/uploads/2024/03/ExxonMobil-Logo.wine_.svg | `public/images/clients-pending-permission/exxonmobil-logo.svg` | SVG | 1200×800 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |
| `exxonmobil-logo-monochrome.png` | https://kodtechnical.com/wp-content/uploads/2024/03/image.png | `public/images/clients-pending-permission/exxonmobil-logo-monochrome.png` | PNG (RGBA) | 1200×800 | Third-party logo — permission required | **NOT integrated — awaiting CEO authorization** |

---

## Assets Excluded (WordPress Theme / Demo Content)

The following 34+ items were found in the WordPress media library but were identified as **demo/template assets** from the original charity-theme installation (uploaded 2020-07). They were **not downloaded or integrated**:

- `volunteers-hero.jpg` — generic stock imagery of volunteers
- `home-hero.jpg`, `about-hero.jpg`, `cta-background.jpg`, `projects-hero.jpg` — generic Unsplash theme backgrounds
- Fabricated volunteer portrait photos (7 × Pexels/Unsplash stock portraits)
- Generic Lorem Ipsum blog post content and images (5 posts)
- WordPress charity-theme SVG icons (`love.svg`, `school.svg`, `water.svg`, `medical.svg`, `food.svg`, `tranvel.svg`)
- The theme's built-in `logo.svg` and `logo-mobile.svg` (these are the **charity theme's own demo logotype**, not the KOD logo)
- `linebgoverlay.png` — semi-transparent texture overlay with alpha channel (theme decoration)
- `jamie-street-105287-unsplash.jpg` — generic Unsplash photograph, not KOD-related
- `play.svg` — generic play-button icon
- `about-icon-1.svg` through `about-icon-4.svg` — generic charity theme SVG icons

---

## Logo Assessment

### Official KOD Logo (`kod-logo-icon.png`, `kod-logo.png`)
- **Type:** Circular globe motif with "kOD" text lettering in a stylized serif font, red swoosh arrows, and blue/green earth background
- **Background:** Transparent (RGBA PNG, colour-type 6)
- **Best quality available:** `kod-logo-icon.png` at 512×512 px
- **Vector version:** Not available. No SVG or AI file was present in the WordPress media library.
- **Limitation:** The logo is a **rasterized PNG exported from a screenshot** (`Screenshot_from_2024-03-14_16-52-50-removebg-preview`), with background removed using an automated tool. It is suitable for web display at up to ~200px rendered size without noticeable pixelation.
- **Recommendation:** The CEO should supply a vector format (SVG, PDF, or AI) of the logo for high-resolution print and large-format web use.
- **Action taken:** Integrated at 40×40px in the header and 32×32px in the footer. The name lockup "KOD TECHNICAL" in text provides legibility at all sizes.

---

## Engineering Photographs Assessment

### 2019-04-01 Series (8 photographs, `IMG_20190401_*.jpg`)
- **Camera EXIF:** Getac PS236 ruggedized industrial tablet
- **Classification:** Authentic industrial site photographs — **very likely KOD field deployment**
- **Subject:** Large-scale process plant / compressor station (green-painted steelwork, tropical vegetation visible)
- **Resolution:** ~1177–1198 × 724–739 px, 557–740 KB per image
- **Quality:** High contrast, usable. Minor compression artifacts. Suitable for web display.

### 2020-03-05 Series (7 photographs, `IMG-20200305-WA*.jpg`)
- **Camera EXIF:** Infinix Hot 8 Lite (consumer smartphone, confirmed by camera watermark)
- **Classification:** Authentic field photographs — **very likely KOD operational site visits**
- **Subject:** Gas scrubber skids, NOV multiplex pump servicing, gas conditioning installations, flare knockout drum — all consistent with oil & gas upstream operations in tropical Nigeria (palm trees, dry laterite soil, green-painted equipment)
- **Resolution:** 1080×810 px per image, 85–143 KB per image
- **Quality:** Consumer-grade smartphone photography. Adequate for web display; not suitable for print.

---

## Corporate Profile PDF

- **Status:** Not recovered
- **Original link on website:** Google Docs URL `https://docs.google.com/document/d/1xAAkjldo20eC7FErtGpzwMXkjF7iI-BK/edit`
- **Result on audit:** HTTP 410 Gone — document deleted or no longer publicly accessible
- **Action required:** CEO to supply the current company profile document in PDF format for placement at `public/documents/kod-technical-services-profile.pdf`

---

## Client Logos — Pending CEO Authorization

The original WordPress website displayed the logos of the following companies in a "clients" section:

| Company | Logo File | Authorization Status |
|---|---|---|
| Shell (SPDC) | `shell-logo.webp` | **Requires CEO confirmation of commercial relationship** |
| Chevron | `chevron-logo.webp` | **Requires CEO confirmation of commercial relationship** |
| ENI / Agip | `eni-agip-logo.webp` | **Requires CEO confirmation of commercial relationship** |
| TotalEnergies | `totalenergies-logo.webp` | **Requires CEO confirmation of commercial relationship** |
| Seplat Energy | `seplat-energy-logo.webp` | **Requires CEO confirmation of commercial relationship** |
| ExxonMobil | `exxonmobil-logo.svg` | **Requires CEO confirmation of commercial relationship** |

**These logos have NOT been integrated into the new website.** They are preserved in `public/images/clients-pending-permission/` for reference. They must not be published until the CEO formally authorizes display of each client relationship.

---

## Actions Required from CEO / Client

1. **Logo vector file:** Supply SVG, AI, or PDF version of the official KOD logo for high-resolution use.
2. **Engineering photograph confirmation:** Confirm that the 15 field photographs downloaded from the WordPress library are authentic KOD operational deployments and authorize their use on the public website.
3. **Client relationship authorization:** For each of the 6 client logos recovered (Shell, Chevron, ENI/Agip, TotalEnergies, Seplat Energy, ExxonMobil) — confirm whether a verifiable commercial relationship exists and whether the company's brand guidelines permit use of their logo on a supplier website.
4. **Corporate profile PDF:** Supply the current company profile document in PDF format.
5. **Workshop / facility photographs:** Supply photographs of the Port Harcourt machine shop, tooling bay, and technical team for the About page facility section.

