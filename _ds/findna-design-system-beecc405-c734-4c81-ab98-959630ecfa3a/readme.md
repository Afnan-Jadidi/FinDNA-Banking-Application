# FinDNA Design System

**FinDNA** is a concept for a smarter banking experience layered on top of **Alinma Bank**'s (مصرف الإنماء) mobile app — a hackathon-style pitch that turns raw financial data (balances, transfers, statements, cash-flow) into something a customer can read and act on at a glance. It is explicitly a demo/concept, not Alinma's real production design system.

## Source material

- `uploads/findna-design-system_1.html` — a single self-contained HTML "design system" mockup (Arabic, RTL), the **only** source for this project. It documents design principles, a color system, type scale, spacing/radius scale, and a set of component sketches (buttons, balance card, quick actions, input, list item, chips/badges, cash-flow stats, bottom nav), plus a small icon set.
- No Figma file, GitHub repo, or additional codebase was provided. No official Alinma brand assets (logo, real screenshots, brand guidelines) were provided — everything below is reverse-engineered from that one mockup file, which itself states its values are estimated from screenshots of the real app ("القيم مستخرجة من لقطات التطبيق الحقيقية").
- **No logo was provided.** The mockup's masthead used a decorative inline SVG (a stylized gate/door glyph) as a placeholder mark; it has been removed from this system at the user's request. This is *not* Alinma's real logo and should not be presented as one. Wherever a lockup would need Alinma's actual logo, use plain type ("FinDNA" / "الإنماء") instead.

## Product

One product/surface: a **mobile banking app** (home dashboard, transfers, account statement, beneficiaries) — see `ui_kits/alinma-app/`.

## Contents

- `styles.css` — root stylesheet; `@import`s everything in `tokens/`.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `fonts.css` (Google Fonts CDN import), `base.css` (resets + `.fd-num` numeral helper).
- `assets/brand/` — the source mockup's decorative mark. `assets/icons/` — the 12-icon line set as standalone SVGs (also inlined in `components/foundation/Icon.jsx`).
- `components/` — reusable primitives, grouped by concern: `buttons/Button`, `cards/BalanceCard`, `actions/QuickAction`, `forms/Input`, `lists/ListItem`, `tags/Chip` + `Badge`, `finance/FlowStat`, `navigation/NavBar`, `foundation/Icon`.
- `ui_kits/alinma-app/` — click-through recreation of the mobile app (home, transfer, statement, beneficiaries).
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius, shadows, brand marks) shown in the Design System tab.
- `SKILL.md` — portable skill file for use in Claude Code or elsewhere.

## Components (full inventory — matches the source mockup's component sketches)

| Component | Directory | Notes |
|---|---|---|
| Button | `components/buttons/` | primary / ghost / soft / copper variants |
| BalanceCard | `components/cards/` | hero balance display |
| QuickAction | `components/actions/` | icon tile + caption, for the action strip |
| Input | `components/forms/` | text field, default + focused |
| ListItem | `components/lists/` | tappable menu/list row |
| Chip | `components/tags/` | filter pill, active/inactive |
| Badge | `components/tags/` | status label, 3 tones |
| FlowStat | `components/finance/` | cash-flow stat block (in/out/neutral) |
| NavBar | `components/navigation/` | bottom tab bar |
| Icon | `components/foundation/` | the 12-icon line set |

### Intentional additions
- **Icon** wasn't a named "component" in the source, but the source defines and reuses a consistent 12-icon line set across nav/list/quick-action/icon-gallery sections — factored out as a shared primitive so every other component references the same icons rather than re-drawing SVG paths.

## Index

- Root: `readme.md` (this file), `styles.css`, `SKILL.md`
- `tokens/` — colors, typography, spacing, radius, shadows, fonts, base
- `assets/brand/`, `assets/icons/`
- `components/{buttons,cards,actions,forms,lists,tags,finance,navigation,foundation}/`
- `ui_kits/alinma-app/`
- `guidelines/` — specimen cards for the Design System tab

---

## Content fundamentals

- **Language & direction:** Arabic-first, RTL layout (`dir="rtl"`). All UI copy in the source is Modern Standard Arabic with a light conversational register — no English strings appear anywhere except the Latin brand name "FinDNA" and currency code "SAR".
- **Numerals stay LTR:** even inside an RTL page, all monetary/numeric values are set in Space Grotesk and forced `direction:ltr` (the `.fd-num` helper) so "5,000.00" reads left-to-right as expected, rather than mirroring.
- **Voice:** direct and personal, second-person ("عبدالله" greeted by first name on the display line: "مرحباً عبدالله" — Hello, Abdullah). Descriptions of the design principles use confident, short declarative sentences ("وضوح قبل كل شيء" — clarity above all; "ثقة وهدوء" — trust and calm).
- **Casing/formatting:** section eyebrows and micro-labels are set in small caps-style Latin loanwords when Latin ("Primary", "Ghost") but otherwise plain Arabic. Numbers use thousands separators and two decimal places for currency ("5,000.00 SAR").
- **Emoji:** used sparingly and only as small illustrative bullets in the three "design principles" cards (🎯 🧬 🛡️) — not used in product copy, buttons, or data. Treat these as one-off decorative accents, not a general iconography system.
- **Tone words the source uses to describe itself:** "وضوح" (clarity), "شخصي وحيّ" (personal and alive), "ثقة وهدوء" (trust and calm) — i.e. numbers-forward, warm-but-professional, not playful or corporate-cold.
- **Labels are short.** Nav items, quick actions, and list rows are all 1–3 word Arabic labels ("تحويل", "البطاقات", "كشف") — no long descriptive button text.

## Visual foundations

- **Color:** a cool, muted **purple** (`--primary #7A6DB0`) is the sole action/brand color — buttons, active nav/icon states, focused input borders. A **copper/gold** pair (`--copper #C6803E`, `--gold #D9B86A`) is FinDNA's own accent layer on top of Alinma's purple, reserved for "new"/CTA emphasis (the copper button, "new" badge) and a literal riyal-note motif (gold gradient chip). Neutrals are a cool grey with a faint purple undertone (`--bg #ECEBF0`), not a true grey — this is what gives cards their "floating on tinted paper" feel against white surfaces (`--surface #FFFFFF`). Semantic colors (green/red/amber) are used narrowly, only for cash-flow direction and status badges — never for general UI chrome.
- **Type:** Tajawal (Arabic) for all reading text and headings; Space Grotesk (Latin/tabular) exclusively for numerals. Display/heading weights run heavy (700–900) with tight/negative letter-spacing on the largest size; body text is light by comparison (400 weight, 15px) — the contrast between very bold headings and quite plain body copy is a deliberate hierarchy signal.
- **Spacing:** strict 8pt grid, 4px atomic unit (4/8/12/16/24/32/48/64). No off-grid values appear anywhere in the source.
- **Corner radii:** everything is rounded, nothing is sharp. Scale runs 10 (sm, inputs/small controls) → 16 (md, list rows/icon tiles) → 22 (lg, cards) → 28 (xl, section containers) → pill (chips, buttons, nav bar). Larger containers get more rounding, not less — the opposite of a typical density-driven system.
- **Backgrounds:** flat color only. No photography, no illustration, no textures/grain, no patterns. The one gradient in the whole system is a soft two-stop `primary-50→white` wash behind the "DNA signature" callout panel, plus the gold gradient on the riyal-note motif — gradients are rare, reserved for one hero callout and the currency motif, never for buttons or nav.
- **Shadows:** a single soft, ink-tinted, low-opacity elevation system (`rgba(35,32,73, .12–.2)`), used to lift cards, the balance card, quick-action icon tiles, and the bottom nav bar off the tinted background — never a hard/black shadow.
- **Borders:** thin 1–1.5px hairlines in a soft violet-grey (`--line #E0DEE8`) delineate cards and inputs; combined with the shadow (not instead of it) on most surfaces.
- **Animation:** the source is a static mockup with no motion/easing spec at all. Only a CSS `transition:.2s` is present on buttons for hover. Treat this system as having no defined animation language yet — use simple, fast (150–250ms) ease transitions for hover/press and nothing more elaborate until real motion direction is supplied.
- **Hover state:** buttons darken one step (primary → primary-600) or tint their transparent background (ghost → primary-50); the copper button brightens slightly (`filter:brightness(1.06)`) rather than darkening — copper is the one place a lighten-on-hover pattern is used.
- **Press/active state:** not explicitly specified in the source; primary-700 is defined as a token but only documented as a color swatch ("حالة الضغط" — press state), not wired to a component — treat it as the button's `:active` background one step darker than hover.
- **Transparency/blur:** none. No backdrop-filter, no translucent overlays anywhere in the source.
- **Layout rules:** single-column, centered, max-width content column (1080px in the spec page itself; the app screens imply a standard mobile single-column layout with a fixed bottom nav bar).
- **Cards:** white surface, 1px soft-violet border, generous internal padding (~20–34px), lg/xl radius, soft shadow. No colored left-border accent strip anywhere — flow stats use a colored **left** border only for that one data-comparison pattern (in/out/neutral), which is a data-encoding device, not a general card style.
- **Imagery:** none supplied — no photography anywhere in the source. If a hero/marketing image is ever needed, it hasn't been art-directed yet; ask before inventing a look.

## Iconography

- **Style:** a single consistent line-icon system — 24×24 viewBox, 2px stroke, round line caps/joins, no fill (`stroke="currentColor"`). Every icon in the source (nav bar, quick actions, list rows, the icon gallery) uses this exact spec.
- **Format:** inline SVG, hand-authored path data — no icon font, no PNGs. Copied verbatim into `assets/icons/*.svg` and inlined in `components/foundation/Icon.jsx` (`Icon` component, `name` prop) so every other component references one shared set instead of re-drawing paths.
- **Inventory (12 icons):** home, transfer, card, statement, beneficiary, government, history, verified, international, notification, servicesGrid, statementCheck.
- **Emoji:** appears only in the three "design principles" specimen cards (🎯 🧬 🛡️) — decorative, not part of the functional icon system. Don't use emoji as UI icons elsewhere.
- **Unicode glyphs:** a bare `‹` character is used as the trailing chevron on list rows (RTL-appropriate direction) rather than an icon — kept as-is in `ListItem`.
- **No icon font or CDN set was linked** in the source; since the existing inline set fully covers what's shown, no substitution/CDN icon library was needed.

---

*This design system was generated from a single hackathon concept file. If you have access to the real Alinma/FinDNA product (codebase, Figma, brand guidelines, real logo, real screenshots), attach it and this system can be corrected and expanded against ground truth.*
