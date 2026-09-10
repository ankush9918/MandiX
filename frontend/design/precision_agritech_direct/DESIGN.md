---
name: Precision Agritech Direct
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#3b4a40'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#6b7b6f'
  outline-variant: '#b9cbbd'
  surface-tint: '#006d42'
  primary: '#006d42'
  on-primary: '#ffffff'
  primary-container: '#00f098'
  on-primary-container: '#00683f'
  inverse-primary: '#00e38f'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006d42'
  on-tertiary: '#ffffff'
  tertiary-container: '#4bed9e'
  on-tertiary-container: '#00683f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#53ffab'
  primary-fixed-dim: '#00e38f'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#005231'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#5ffead'
  tertiary-fixed-dim: '#3ae193'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005230'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '900'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '900'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  metric-headline:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
---

## Brand & Style

This design system establishes a high-performance visual language bridging enterprise agritech infrastructure with dynamic, consumer-grade commerce. It serves four distinct personas within one ecosystem: rural farmers demanding extreme clarity and low cognitive overhead, daily consumers seeking farm-fresh traceability, institutional buyers conducting bulk commodity spot-trading, and platform operators monitoring mission-critical algorithmic logistics.

The aesthetic fuses **Modern Fintech Rigor** with **High-Velocity E-Commerce Utility**:
- **Utilitarian Speed:** Layouts are crisp, modular, and optimized for instant data ingestion, transactional confidence, and real-time mandi (produce exchange) pricing.
- **Biophilic Precision:** Agriculture is expressed not through rustic earth tones, but through hyper-efficient biological tech—electric neon greens against deep slate and stark architectural whites.
- **High-Fidelity Assurance:** Pixel-precise hair-line geometry, micro-surfaces, and clear numerical density signal enterprise-grade security and zero-loss fulfillment.

## Colors

The palette balances clinical transactional neutrality with high-energy directional cues.

### Palette Architecture
- **Primary Canvas (`#F7F8FA`):** An ultra-clean cool neutral that eliminates eye fatigue under field-testing and high screen brightness.
- **Pure White Surfaces (`#FFFFFF`):** High-priority functional containers, cards, and floating layers.
- **Deep Obsidian Surface (`#0F172A`):** The grounding tone for enterprise navigation bars, data matrices, critical telemetry headers, and dominant high-authority actions.
- **Signature Neon Mint (`#00F098`):** The primary focal point. Used sparingly and with high intentionality for critical CTAs, active live-bidding indicators, AI yield recommendations, and positive market spreads. Text on this surface must always be `#0F172A` or `#000000` to preserve WCAG AAA contrast.
- **Operational Green Accent (`#00C97E`):** A slightly deeper, grounded green for standard confirmations, verified farmer badges, and stable financial increments.
- **Tinted Mint Surface (`#E8FFF6`):** Reserved for low-density micro-states, success banners, selected card states, and active pill backgrounds.
- **Boundary Hairline (`#E2E8F0`):** Ultra-crisp structural boundaries, segment dividers, and container limits.
- **Text Tiers:**
  - `Primary Text`: `#0F172A`
  - `Secondary Slate`: `#64748B`
  - `Tertiary / Disabled Muted`: `#94A3B8`

## Typography

Typography relies entirely on **Inter**, configured for extreme scannability, structural authority, and rapid trade execution.

### Rules of Engagement
- **Tabular Numerals (`font-feature-settings: "tnum" 1`):** Mandatory across all price tickers, commodity volumes, tonnage calculations, lot identifiers, and financial ledgers to ensure clean vertical alignment across variable updates.
- **Label Tracking:** `label-caps` must strictly be uppercase with `0.08em` tracking. Use it for categorizing lot quality, crop grading (Grade-A, FAQ), telemetry parameters, and logistical statuses.
- **Heading Character:** Headings adopt `800` (ExtraBold) or `900` (Black) weights with negative tracking to convey density, urgency, and institutional certainty.

## Layout & Spacing

The layout is built on a tight 4px baseline rhythm optimized for two disparate operating realities: dense, responsive enterprise data grids on desktop, and rapid one-handed thumbnail-driven commerce on field mobile devices.

### Grid Rules
- **Mobile (< 768px):** 4-column layout with a mandatory bottom navigation or sticky action dock. Fluid gutter width of 16px (`1rem`). Edge safety margins fixed at 16px.
- **Tablet (768px - 1024px):** 8-column layout. Gutter width of 20px. Side margins 24px.
- **Desktop (> 1024px):** 12-column layout. Max container constraint of `1440px`. Gutters fixed at 24px (`1.5rem`), outer boundaries padded at 32px (`2rem`).

### Rhythm & Alignment
Data arrays, spot-price trackers, and SKU configurations are stacked within tight vertical modules (`space-xs` to `space-sm`), while major conceptual segments (e.g., Farm Origin verification vs. Logistics Routing) are segregated using macro intervals (`space-2xl`).

## Elevation & Depth

This system avoids heavy drop shadows, employing instead a dual-layer system of **crisp structural outlines combined with ambient, diffused light dispersion**. Depth conveys transactional priority and actionable states rather than physical skeuomorphism.

### Depth Hierarchy
1. **Base Plane (`#F7F8FA`):** Zero elevation. Structural foundation for application views.
2. **Resting Cards (`Level 1`):** White container (`#FFFFFF`) with a 1px border of `#E2E8F0` and an ultra-subtle ambient shadow:
   `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04);`
3. **Elevated & Hovered Surfaces (`Level 2`):** Floating summaries, hovering product cards, and drop-down selectors:
   `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.03);`
   Border shifts to `#CBD5E1`.
4. **Modals, Overlays, and Drawers (`Level 3`):** Bidding interfaces, real-time dispatch consoles:
   `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04);`
5. **Interactive Glow (Active Neon Highlight):** Live auctions and primary active states emit an accent bloom:
   `box-shadow: 0 0 0 1px #00F098, 0 4px 14px 0 rgba(0, 240, 152, 0.35);`

## Shapes

The design system deploys a structured, proportional radius system. Large outer surfaces embrace soft, friendly ergonomics (`rounded-2xl`), while interior micro-elements (chips, inputs, data badges) utilize tighter geometry to preserve data density.

### Radius Assignments
- **`rounded-2xl` (1.5rem / 24px):** Macro containers, standalone metric overview cards, high-ticket product showcases, and modal frames.
- **`rounded-xl` (1rem / 16px):** Primary interactive blocks, standard marketplace cards, nested operational panels, and filter drawers.
- **`rounded-lg` (0.5rem / 8px):** Form fields, input controls, table row hover selections, action buttons, and nested image previews.
- **`rounded-full` (9999px):** Status badges, live indicators, commodity pill filters, and circular avatar indicators.

## Components

### Buttons
- **Primary Neon:** Background `#00F098`, text `#0F172A`, font weight `700`. Zero border. Hover state transitions to background `#00C97E` with text `#FFFFFF` over 150ms. Used exclusively for primary purchase, bid confirmation, or critical operational completion.
- **Primary Dark:** Background `#0F172A`, text `#FFFFFF`, font weight `600`. Hover state lightens to `#1E293B`.
- **Secondary Ghost:** Background `#FFFFFF`, text `#0F172A`, 1px border `#E2E8F0`. Hover triggers background `#F8FAFC` and border `#CBD5E1`.
- **Size Specifications:** Large (48px height, 16px horizontal padding), Medium (40px height, 14px horizontal padding), Compact/Table (32px height, 10px horizontal padding).

### Input Fields & Selectors
- **Base State:** 44px height, background `#FFFFFF`, 1px border `#E2E8F0`, corner radius `8px` (`rounded-lg`). Text is `#0F172A`, placeholder is `#94A3B8`.
- **Focus State:** 1px border `#0F172A` paired with an external ring: `box-shadow: 0 0 0 3px rgba(0, 240, 152, 0.25)`.
- **Prepend / Append Affixes:** Unit markers (e.g., `₹`, `Quintal`, `MT`) are set in `label-caps` with background `#F1F5F9` and text `#475569`.

### Chips & Badges
- **Live Bid Status:** `rounded-full`, 24px height. Background `#E8FFF6`, text `#00C97E`, font `label-caps`. Preceded by a 6px pulsing dot of `#00F098`.
- **Standard Filter Chip:** `rounded-full`, 32px height. Border 1px `#E2E8F0`, background `#FFFFFF`, text `#475569`. Active state transitions to background `#0F172A`, border `#0F172A`, text `#00F098`.

### Cards & Grid Containers
- **Marketplace Listing Card:** Outer radius `rounded-xl` (16px), background `#FFFFFF`, border 1px `#E2E8F0`. Features a 2px top accent line colored `#00F098` on featured farmer produce. Internal metadata lines use strict 1px dividers `#F1F5F9`.
- **Metric Tile:** Outer radius `rounded-2xl` (24px), background `#FFFFFF`, padding `1.5rem`. Primary metric rendered in `metric-headline` with tabular numbers, accompanied by a directional micro-badge (`#E8FFF6` for gains, `#FEF2F2` for drops).

### Checkboxes & Radios
- **Selection Base:** 18px x 18px, border 1.5px `#CBD5E1`, radius 4px (checkbox) or circular (radio).
- **Checked State:** Background `#0F172A`, border `#0F172A`. Inner check icon or radio pip rendered in `#00F098`.

### Domain-Specific Components
- **Mandi Ticker Bar:** A full-width high-density horizontal ticker with background `#0F172A`, text `#FFFFFF`, displaying real-time APMC price updates with green (`#00F098`) or red (`#F87171`) delta values in tabular monospace.
- **Traceability Chain Card:** Multi-stop vertical timeline displaying harvest verification, cold storage handoff, and transit telemetry. Active node is encapsulated in `#00F098` with hairline connectors rendered in `#CBD5E1`.