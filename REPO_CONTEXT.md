# FinDNA Banking Application — Repository Context

This document is an exhaustive brief of the `FinDNA-Banking-Application` repo, written for another AI that will wire live agent/LLM output into the current fully-static/simulated prototype. It covers every file, the complete markup and logic of both `.dc.html` screens, how the "DC" (Design Component) runtime works, the design-system component library, and — critically — every place hardcoded "AI" copy currently lives and would need to be replaced by real agent output.

Repo root: `/Users/mhsn/VsCode/FinDNA-Banking-Application/`

---

## 0. What this project is

A **hackathon-concept mobile banking app prototype** called **FinDNA**, presented as a value-add layer on top of a fictionalized "Alinma Bank"-style Saudi banking app. It is Arabic-first, RTL, and themed around building a "financial DNA" profile (income, obligations, goals, behavior) and using an "AI assistant" to give the user (and separately, a bank employee) money advice.

It is built in **"DC" format** — a proprietary single-file component format (`*.dc.html`) that bundles a React-driven template + a small JS "logic" class in one HTML file, executed client-side by a runtime (`support.js`) with no build step, no bundler, no server. Everything runs directly in the browser off static files.

**Important finding up front:** All "AI-generated" text everywhere in this prototype (the daily insight, the DNA personality analysis, the assistant's recommendations, the employee-dashboard AI summary, etc.) is **100% hardcoded string content** written directly into the HTML templates. Nothing is computed by a model or backend. A few numeric values *are* computed client-side from sliders (What-If, Loans screens) via simple linear formulas in `renderVals()`, but the natural-language narration around them is still static text with `{{ }}` interpolations plugged into fixed sentence templates — not generated.

---

## 1. Complete file inventory

### Root
| File | Purpose |
|---|---|
| `FinDNA App.dc.html` | **The main customer-facing mobile app.** 1319 lines. Full DC component: template (11 screens + 4 overlay sheets) + a `Component extends DCLogic` class with state, handlers, and a `renderVals()` that computes everything the template binds to. This is the canonical/current version. |
| `FinDNA Employee Dashboard.dc.html` | **The bank employee's single-page view of one customer.** 271 lines. Pure template, **no `<script data-dc-script>` logic class at all** — 100% static markup, no state, no interactivity beyond a couple of unwired `<Button>`s. Everything on this page (every number, every AI sentence) is a literal hardcoded string. |
| `FinDNA App v1 (before UX fixes).dc.html` | An earlier snapshot of the main app, kept for history/reference. Diffs from the current version are mostly copy tweaks (e.g. the onboarding income-step subtitle used to say "لنعرف حجم التدفق الداخل إليك كل شهر" and now says "رصدناه تلقائيًا من إيداعات حسابك — أكّد أو عدّل"), a demo-mode simulate-transaction button being wrapped in a dashed "Demo mode" box, a notification bell getting a click handler + unread dot, and the home "رؤية اليوم" insight copy changing from a monthly-restaurant framing to a weekend-spending framing. Not otherwise structurally different. **Not the file to build against** — treat `FinDNA App.dc.html` as source of truth. |
| `FinDNA App-standalone.dc.html` | An export variant with `<meta name="ext-resource-dependency">` tags and an embedded SVG thumbnail template injected (bundler/export tooling artifacts), and the three goal images point at `{{ camrySrc }}` / `{{ houseSrc }}` / `{{ travelSrc }}` bindings instead of the literal `assets/*.png` paths the main file uses. Otherwise identical logic/content to the main app. Looks like a packaging/export snapshot, not a separate feature branch. |
| `FinDNA App-print-16oz8ni.dc.html` | Another export/print variant (adds `@media print` default rules via a `<style data-omelette-print-defaults>` block) with the same content-diffs as the v1 file (older onboarding copy, no notif-bell handler, different money-visual layout for stacks). A stale export snapshot, not current. |
| `support.js` | **The DC runtime.** 1768 lines, minified/bundled from a TypeScript source (`dc-runtime/src/*.ts` per its header comment — that source isn't in this repo, only the compiled output is). Boots React, parses the `<x-dc>` document, compiles the template into a render function, evaluates the `<script data-dc-script>` logic class, and manages `x-import`/custom-element resolution, hot-reload/streaming machinery, and a mini template-expression evaluator. Full breakdown in §4. |
| `ios-frame.jsx` | A **visual-only** iOS 26 "Liquid Glass" phone-frame component library (no build tooling — raw JSX, transpiled at runtime via Babel-standalone, see §4). Exports `IOSDevice`, `IOSStatusBar`, `IOSNavBar`, `IOSGlassPill`, `IOSList`, `IOSListRow`, `IOSKeyboard` onto `window`. `IOSDevice` is what wraps the whole app in the phone bezel/status-bar/home-indicator chrome you see in both `.dc.html` screens' `<x-import component-from-global-scope="IOSDevice" from="./ios-frame.jsx" ...>`. Pure presentation, holds no app state. |
| `image-slot.js` | A **user-fillable image placeholder** web component (`<image-slot>` custom element, ~1200 lines). Lets a human drag/drop or browse an image into a slot that persists to a sidecar JSON file (`.image-slots.state.json`) via a bridge (`window.omelette.writeFile`) that only exists inside the design-tool host — outside that host it's read-only and just shows the `src` fallback image. Used for the 3 goal photos (`goal-camry`, `goal-house`, `goal-travel`) and the onboarding per-goal photo slots (`ob-goal-{id}`). Not related to the agent-integration work except as an asset-display mechanism. |
| `.gitattributes` | Just `* text=auto` (line-ending normalization). Not interesting. |
| `.thumbnail` | Binary — a generated preview thumbnail for the project, not human content. |

### `assets/` — used by the main App (referenced via literal `assets/*.png` paths)
| File | Dimensions | Used as |
|---|---|---|
| `goal-camry.png` | 800×410 PNG/RGBA | Home-screen goal card image + Goal Detail hero image for "تويوتا كامري" (Toyota Camry) goal, `id="goal-camry"` |
| `goal-house.png` | 800×420 PNG/RGBA | Home-screen goal card image for "شقة تمليك" (owned apartment) goal, `id="goal-house"` |
| `goal-travel.png` | 800×566 PNG/RGBA | Home-screen goal card image for "رحلة اليابان" (Japan trip) goal, `id="goal-travel"` |
| `note-100.png` | 1470×460 PNG/RGBA | Tiled/stacked as a CSS `background-image` behind the Home screen's "100 ×N" cash-note stack visual |
| `note-500.png` | 1470×495 PNG/RGBA | Same, for the "500 ×N" cash-note stack |

### `uploads/` — NOT referenced anywhere in either `.dc.html` file
5 pasted screenshots (`pasted-<timestamp>-0.png`, mostly 1536×1024, one 729×262). These look like reference/inspiration screenshots dropped into the project during design work (e.g. real bank-app screenshots used to eyeball the design system's colors/spacing — the design-system readme explicitly says its tokens were "reverse-engineered" from a screenshot-derived mockup). They are **not wired into any template** — dead weight from the design process, not app content.

### `_ds/findna-design-system-beecc405-c734-4c81-ab98-959630ecfa3a/` — the design system package
| File | Purpose |
|---|---|
| `readme.md` | Design-system documentation: brand story, color/type/spacing rationale, component inventory, voice/content guidelines. Explicitly states this is a hackathon concept with **no real Alinma brand assets** — the design tokens are "reverse-engineered" from one self-contained HTML mockup (`uploads/findna-design-system_1.html`, referenced in the readme but **not present in this repo**). |
| `_ds_manifest.json` | Machine-readable manifest: component list + source paths, the full design-token table (colors/typography/spacing/radius/shadows with values), the guideline "card" catalog, global CSS load order. This is what a design tool reads to build a picker UI — not consumed at runtime by the app itself. |
| `_ds_bundle.js` | **The compiled component library**, 1547 lines. A self-executing script that defines `window.FinDNADesignSystem_beecc4` (namespaced by the id suffix `beecc4` from the folder's UUID) with all components (`Button`, `BalanceCard`, `FlowStat`, `Input`, `Icon`, `QuickAction`, `ListItem`, `NavBar`, `Badge`, `Chip`) plus a whole separate unused demo app (`AlinmaApp` + `HomeScreen`/`TransferScreen`/`StatementScreen`/`BeneficiariesScreen` + a duplicate `ios-frame.jsx`) under `ui_kits/alinma-app/` that neither `.dc.html` file actually references — that's the design system's own internal demo, not part of FinDNA. Full component API in §5. |
| `styles.css` | 7 lines — just `@import`s every file in `tokens/` in order (fonts → colors → typography → spacing → radius → shadows → base). |
| `tokens/colors.css` | Color custom properties (`:root{...}`). Full list in §10. |
| `tokens/typography.css` | Font-family vars + a full named type scale (display/h1/h2/h3/body/caption/numeric, each with size+weight). |
| `tokens/spacing.css` | 8pt-grid spacing scale, `--s1` (4px) through `--s8` (64px). |
| `tokens/radius.css` | Corner-radius scale, `--r-sm` (10px) through `--r-pill` (100px). |
| `tokens/shadows.css` | 3-step soft ink-tinted shadow scale, `--sh-sm/md/lg`. |
| `tokens/fonts.css` | One `@import` of the Google Fonts CDN URL for Tajawal + Space Grotesk. |
| `tokens/base.css` | Global reset (`box-sizing`, background/color/font on `html,body`) + the `.fd-num` helper class that forces LTR direction + tabular numerals for money/number display inside the RTL page. |

---

## 2. `FinDNA App.dc.html` — complete structure

### 2.1 Document shell
```html
<!DOCTYPE html><html><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="./support.js"></script>
</head><body>
<x-dc>
  <helmet>  <!-- loads all 7 design-system CSS files + the _ds_bundle.js script, plus a small inline <style> for local keyframes -->
  <div ...><x-import component-from-global-scope="IOSDevice" from="./ios-frame.jsx" width="{{ 390 }}" height="{{ 830 }}" hint-size="430px,880px">
    <div dir="rtl" data-screen-label="FinDNA" style="...">
      <!-- all 11 screens as sibling <sc-if> blocks, each absolutely positioned so only the active one paints -->
      <!-- 4 overlay sheets (notifications, services, rec-confirm, toast), also <sc-if>-gated -->
      <!-- bottom NavBar, <sc-if>-gated -->
    </div>
  </x-import></div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{...}'>
  class Component extends DCLogic { state = {...}; renderVals() {...} }
</script>
</body></html>
```
Inline `<style>` in the helmet defines local keyframes: `fdGrow` (progress-bar fill), `fdFadeUp` (screen-enter fade+slide), `fdNoteIn` (cash-note stack-in), `fdPulse` (live-indicator dot pulse), `fdSpin` (loading spinner), `fdBreathe` (DNA-score ring breathing), plus `::-webkit-scrollbar{width:0;height:0}` to hide scrollbars for the phone-frame illusion.

`data-props` on the `<script data-dc-script>` tag declares 4 editable props (consumed by the design-tool's property panel, and as `this.props.*` in the logic class):
```json
{
  "$preview": {"width": 500, "height": 940},
  "startScreen": {"editor":"enum","options":["onboarding","home","dna","ai","goal","whatif","timeline","challenges","loans","invest"],"default":"onboarding"},
  "moneyVisual": {"editor":"enum","options":["stacks","minimal"],"default":"stacks"},
  "balance": {"editor":"int","default":18520,"min":0,"max":200000,"step":500},
  "dailyBudget": {"editor":"int","default":185,"min":50,"max":1000,"step":5}
}
```
Note `startScreen`'s enum is missing `"generating"` as an option (that screen is only reachable by completing onboarding), and `"goal"` (Goal Detail) IS a listed startScreen option even though nothing else in the enum list mentions the notification/services sheets (those aren't screens, they're overlays toggled by state, not `startScreen`).

### 2.2 Every screen, in document order

For each: what shows, every hardcoded literal, every `{{ }}` binding, every handler wired.

---

#### Onboarding (`isOnboarding` = `screen === 'onboarding' && !generating`)
Wrapper: dot progress indicator (`obDots`, 5 dots, current step widens to 22px) + "تخطي" (Skip) button top-right (`skipOnboarding` → jumps straight to `screen:'home'`). Bottom nav row: "رجوع" (Back, `obBack`) shown when `obStep>1`; "بناء حمضي المالي" (Build my financial DNA, copper button, `obNext`) only on step 5; otherwise a primary "متابعة"/"ابدأ رحلتك" button (`obNextLabel`) on `obNext`.

- **Step 1** (`isOb1`) — welcome/pitch screen. Fully static copy:
  - Eyebrow: `FinDNA`
  - Headline: `حمضك المالي` / `الفريد` ("Your unique financial DNA")
  - Body: `سنبني لك بصمة مالية تجمع تاريخك المالي وسلوكك الحالي وأهدافك المستقبلية — لتفهم أموالك وتشعر بها، لا أن تقرأها أرقامًا فقط.`
  - 3 static feature rows: "تاريخك المالي / من أين أتيت", "سلوكك الحالي / أين أنت الآن", "أهدافك المستقبلية / إلى أين تتجه"
- **Step 2** (`isOb2`) — income entry.
  - Headline "دخلك الشهري", subhead `رصدناه تلقائيًا من إيداعات حسابك — أكّد أو عدّل` ("auto-detected from your deposits — confirm or edit") — **this "auto-detected" framing is fully fake; nothing reads real deposits.**
  - Static green pill: `✓ مُكتشف من إيداعات آخر 6 أشهر` ("detected from the last 6 months of deposits")
  - `Input` bound to `salary` (default `'14,500'`) via `setSalary`, and `extraIncome` (default `'1,200'`) via `setExtraIncome`
  - 3 currency `Chip`s (SAR/USD/AED labels: ريال سعودي/دولار/درهم) toggled via `currencies[].select`
  - Total row: `{{ totalIncomeFmt }} SAR` = `fmt(num(salary)+num(extraIncome))`
- **Step 3** (`isOb3`) — obligations entry.
  - Headline "التزاماتك المالية", subhead `رصدنا التزاماتك من عملياتك المتكررة — عدّل أو اترك فارغًا إن لم ينطبق` ("detected from your recurring transactions") — **also fake.**
  - 6 fields rendered from `obFields` (built from `ob` state + a fixed `obLabels` map): قرض شخصي (personal loan, default `''`), قرض سيارة (car loan, default `'1,850'`), تمويل عقاري (mortgage, default `''`), بطاقات ائتمانية (credit cards, default `'650'`), فواتير شهرية (monthly bills, default `'780'`), التزامات أخرى (other, default `''`)
  - Total row: `{{ totalObFmt }} SAR` = sum of all 6 fields
- **Step 4** (`isOb4`) — goals entry.
  - Headline "أهدافك المستقبلية", subhead "أضف أهدافك — وضع لكل هدف صورة حقيقية تلهمك"
  - 7 preset chips (`goalPresets`, each `+ label`): سيارة/120,000, منزل/600,000, زواج/150,000, سفر/25,000, استثمار/50,000, تقاعد/1,000,000, تعليم/80,000 — clicking appends a new goal to `state.goals`
  - Editable goal cards from `state.goals` (seeded with 2, see §6): each has an `image-slot` (`id="ob-goal-{id}"`), name, remove (×) button, and two `Input`s for amount/date
- **Step 5** (`isOb5`) — priorities.
  - Headline "ما الأهم بالنسبة لك؟", subhead "اختر أولوياتك — ستشكّل حمضك المالي"
  - 2×N grid of 6 toggleable priority tiles (`priorityItems`, built from `prLabels`): الادخار (saving), الاستثمار (invest), تقليل المصاريف (expenses), شراء منزل (house), الحرية المالية (freedom), التقاعد (retire) — toggled in/out of `state.priorities` array (defaults: `['saving','house']`)
  - Static footnote: `سيوازن المساعد الذكي توصياته اليومية بناءً على هذه الأولويات، ويربط كل عملية إنفاق بأثرها على أهدافك.` ("The smart assistant will balance its daily recommendations based on these priorities…") — **this is a promise the UI never actually fulfills anywhere; priorities are collected but never read again in `renderVals()`.**

`obNext` handler: increments `obStep` up to 5; on step 5 it sets `generating:true` and after a 2000ms `setTimeout` sets `generating:false, screen:'home'`.

---

#### Generating (`isGenerating` = `state.generating`)
Full-screen overlay (z-index 20), animated dual-ring spinner with "DNA" text in the middle, headline "نبني حمضك المالي…" ("Building your financial DNA…"), subhead "نحلل دخلك والتزاماتك وأهدافك" ("Analyzing your income, obligations and goals"). Purely cosmetic 2-second static delay — **no actual computation happens during this screen; it's a fixed timer, not a real analysis step.**

---

#### Home (`isHome` = `screen === 'home'`)
- Greeting: static "صباح الخير" (Good morning) + `مرحباً أحمد` ("Welcome Ahmed" — **hardcoded name, not tied to any user field**)
- Notification bell (`openNotifs`) with a static copper unread-dot
- **"رؤية اليوم" (Today's Insight) card** — `goAi` on click (navigates to AI screen). Fully hardcoded paragraph:
  > `التزمت بجميع أقساطك هذا الشهر. مصروف المطاعم ارتفع 18% — إن استمر، سيتأخر هدف السيارة 23 يومًا.`
  ("You've stayed current on all installments this month. Restaurant spending is up 18% — if it continues, the car goal will slip 23 days.")
  Plus a static "عرض التحليل الكامل ‹" (View full analysis) link that does nothing on its own (whole card is clickable via the wrapping div's `goAi`).
- **Balance card**: `{{ balanceFmt }}` = `fmt((props.balance ?? 18520) + state.balanceDelta)`, `SAR` label. Below it, a cash-note visual (`showStacks` = `moneyVisual prop === 'stacks'`, default true) rendering `noteStacks` — computed piles of ₪500/₪100 note images based on balance (see §2.4 money math). Below that, a dashed "وضع العرض التجريبي — جرّب عملية" (Demo mode — try a transaction) box with 3 buttons: "إيداع راتب" (`simSalary`, +14,500 balance + toast), "قهوة −18" (`simCoffee`, spend 18), "مطعم −124" (`simRestaurant`, spend 124).
- **Quick actions row** (4x `QuickAction`): "ماذا لو؟" (`goWhatIf`), "التحديات" (`goChallenges`), "قروضي" (`goLoans`), "الاستثمار" (`goInvest`)
- **"ميزانية اليوم" (Today's budget) card**: `{{ budgetRemainingFmt }} / {{ budgetLimitFmt }} SAR`, progress bar colored by state (green/copper/red), and either a hardcoded exceeded-warning (`تجاوزت ميزانية اليوم. إن استمر هذا الإنفاق، سيتأخر هدف السيارة أسبوعين.` — "you've exceeded today's budget… the car goal will slip two weeks") or a static disclaimer `محسوبة من دخلك والتزاماتك وأهدافك — لا ميزانية عامة` ("calculated from your income, obligations and goals — not a generic budget")
- **"أهدافي" (My Goals) horizontal-scroll row** — static label "3 أهداف نشطة" (3 active goals, **hardcoded count, not tied to `state.goals.length`** which actually only has 2 by default). 3 fully hardcoded goal cards (image + name + progress% + saved/remaining + target date + status pill), **none driven by `state.goals`** — despite onboarding letting the user edit/add goals, the Home screen goal cards are separate static markup:
  1. تويوتا كامري (Toyota Camry) — 42%, saved 52,000 / remaining 71,000, "الإنجاز: مارس 2028", copper pill "تأخير متوقع 23 يوم" (expected 23-day delay). Clickable → `goGoalDetail`.
  2. شقة تمليك (owned apartment) — 12%, saved 70,200 / remaining 514,800, "الإنجاز: يونيو 2031", green pill "على المسار" (on track). Not clickable.
  3. رحلة اليابان (Japan trip) — 68%, saved 17,000 / remaining 8,000, "الإنجاز: ديسمبر 2026", green pill "متقدم 6 أيام" (ahead by 6 days). Not clickable.
- **"عمليات أخيرة — وأثرها" (Recent transactions — and their impact)** — 3 fully hardcoded transaction rows, each with a static "impact" sentence in copper/red/green:
  1. قهوة — كافيه بارد, −18, `أخّرت هذه العملية هدف السفر يومًا واحدًا` (delayed the travel goal by 1 day)
  2. مطعم — عشاء الجمعة, −124, `قلّلت هذه العملية ادخارك الشهري 7٪` (reduced monthly savings by 7%)
  3. تحويل إلى المحفظة الاستثمارية, +500, `ممتاز — قرّب استثمارك هدف المنزل 18 يومًا` (brought the home goal 18 days closer)

---

#### Financial DNA (`isDna` = `screen === 'dna'`)
Entirely static analysis screen — **no logic-computed values at all here except the screen routing flag itself.**
- Eyebrow `FinDNA`, headline "حمضي المالي" (My Financial DNA)
- **Score ring**: conic-gradient hardcoded to `82%` copper fill, center text `82` / `من 100` (out of 100)
- Personality label "مدخر ملتزم" (Committed Saver) + description: `شخصيتك المالية تميل للادخار المنتظم مع التزام استثنائي بالأقساط، وحذر من المخاطرة.` (leans toward regular saving with exceptional installment commitment and risk caution)
- **"مؤشرات الشخصية" (Personality indicators)** — 7 hardcoded metric bars, each a literal number + literal bar width%:
  - الادخار (Saving) 78 — green
  - الالتزام (Commitment) 96 — green
  - الانضباط المالي (Financial discipline) 71 — purple/primary
  - الاستثمار (Investment) 54 — purple/primary
  - مستوى المخاطرة (Risk level) 41 — copper
  - الإنفاق (Spending) 32 — grey/text-3
  - الشراء الاندفاعي (Impulse buying) 27 — grey/text-3
- **Strengths** (نقاط القوة, green bullets, 3 items): "التزام كامل بالأقساط طوال 24 شهرًا", "ادخار منتظم بنسبة 12٪ من الدخل", "لا مشتريات اندفاعية كبيرة خلال 6 أشهر"
- **Weaknesses** (نقاط الضعف, red bullets, 2 items): "مصروف المطاعم أعلى من مثيلك بـ 34٪", "38٪ من إنفاقك يتركز في نهاية الأسبوع"
- **Recommendations** (توصيات, numbered 1-3, primary color): "خفّض مصروف المطاعم 300 ريال شهريًا", "حوّل 500 ريال شهريًا إلى الاستثمار", "زد ادخارك الأسبوعي 150 ريالًا" — **these exact 3 recommendations are duplicated verbatim as the 3 actionable cards on the AI Assistant screen** (see below) — i.e. two different screens hardcode the same "AI output" independently rather than sharing one source of truth.
- **"ملخص السلوك الشهري" (Monthly behavior summary)** — 4x `FlowStat`, all hardcoded: "أغلى فئة — المطاعم" 1,860 (out/red), "أكبر مصروف متكرر — قسط السيارة" 1,850 (neutral), "إنفاق نهاية الأسبوع" 38% (out/red), "اتجاه الادخار" +12% (in/green)

---

#### AI Assistant (`isAi` = `screen === 'ai'`)
- Headline "المساعد الذكي" (Smart Assistant) + live-pulse dot + static line `يحلل سلوكك باستمرار — لا ينتظر سؤالك` ("continuously analyzing your behavior — doesn't wait for your question")
- **"إحاطة الصباح" (Morning briefing) card** — static timestamp `7:30`, fully hardcoded paragraph:
  > `صباح الخير أحمد. حلّلت إنفاقك هذا الأسبوع: 38% من مصروفك تركّز في نهاية الأسبوع، والتزامك بالأقساط ما زال كاملًا. خفض إنفاق نهاية الأسبوع 150 ريالًا يعيد هدف السيارة إلى مساره.`
- **"توصيات اليوم" (Today's recommendations)** — 3 recommendation rows, each: title + subtext + either a green "✓ مطبّقة" (Applied) label (if `recN === true`) or a soft "طبّق" (Apply) button (`applyRecN` → opens the confirm sheet). Content (identical to the DNA screen's recommendations list):
  1. "خفّض مصروف المطاعم 300 ريال" / "يعيد هدف السيارة إلى مساره" — `rec1`
  2. "حوّل 500 ريال إلى الاستثمار" / "يقرّب هدف المنزل 18 يومًا" — `rec2`
  3. "زد ادخارك الأسبوعي 150 ريالًا" / "يرفع درجة حمضك المالي إلى 85" — `rec3`
- **"ملخص الأسبوع" (Week summary)** — 3x `FlowStat`, hardcoded: "الدخل" 15,700 (in), "المصروف" 9,340 (out), "الادخار" 2,400 (neutral)
- **"تحدي الأسبوع" (Week's challenge)** card (`goChallenges` on click) — static "+250 نقطة DNA" badge, title "وفّر 200 ريال هذا الأسبوع" (save 200 SAR this week), hardcoded 60% progress bar, `120 / 200 SAR`, "باقي 3 أيام" (3 days left)

---

#### Goal Detail (`isGoal` = `screen === 'goal'`)
Header back-button (`goBack`) + static title "تويوتا كامري" (**always Camry — this screen doesn't parametrize by which goal was clicked**, even though `goGoalDetail` is only wired from the Camry card on Home). Hero image (`assets/goal-camry.png`).
- Progress card: static 42%, target 123,000, saved 52,000 (green), remaining 71,000; completion date is the **one dynamically computed field on this screen**: `{{ carDateNew }}` = `dateAfter(newCarM)` where `newCarM = carRemaining(71000) / (baseSaving(3550) + extraMonthly)` and `extraMonthly` derives from the What-If sliders (`whatSave`, `whatSalary`, `whatInvest` in state) — so this date reacts to state set on a *different* screen (What-If), not to anything computed here.
- "سجل الادخار — آخر 6 أشهر" (Savings history — last 6 months) — 6 fully hardcoded static bars (فبراير 52px, مارس 64px, أبريل 44px, مايو 70px, يونيو 78px, يوليو 88px-highlighted) — no real history data, just decorative fixed-height bars.
- "خطط بديلة" (Alternative plans) — current plan row (static `3,550`/month, date = `{{ carDateNew }}`), "+500 شهريًا" row (date = `{{ altDate1 }}` = `dateAfter(71000/(3550+500))`), "+1,000 شهريًا" row (date = `{{ altDate2 }}` = `dateAfter(71000/(3550+1000))`)
- **"توصية الذكاء الاصطناعي" (AI recommendation) box** — fully hardcoded copper-eyebrow text:
  > `استثمار 1,000 ريال شهريًا من مدخرات هذا الهدف في محفظة متحفظة قد يقدّم موعد الشراء نحو 3 أشهر — جرّب السيناريو في المحاكي.`
- CTA button "جرّب سيناريوهات «ماذا لو؟»" → `goWhatIf`

---

#### What-If Simulator (`isWhatIf` = `screen === 'whatif'`)
Back button (`goBack`). 4 range sliders, all `type="range"` with `direction:ltr` (kept LTR even in the RTL page so slider handles behave normally):
1. "ماذا لو زاد راتبي؟" (salary raise) — `whatSalary`, 0–30 step 1, shown as `{{ whatSalary }}%`
2. "ماذا لو ادخرت أكثر شهريًا؟" (save more monthly) — `whatSave`, 0–2000 step 50, shown as `+{{ whatSave }} SAR`
3. "ماذا لو سدّدت قرضي أسرع؟" (pay loan faster) — `whatLoan`, 0–2000 step 50, shown as `+{{ whatLoan }} SAR`
4. "ماذا لو استثمرت شهريًا؟" (invest monthly) — `whatInvest`, 0–3000 step 100, shown as `{{ whatInvest }} SAR`

**"النتيجة الفورية" (Instant result) card** — this is the one screen where the numbers are genuinely computed (client-side arithmetic, not an LLM) from the sliders — see §2.4 for exact formulas:
- "إنجاز هدف السيارة" (Car goal completion) → `{{ carDateNew }}`, optionally a green "أبكر {{ carDaysSaved }} يومًا" pill if `hasCarSaving`
- "الرصيد بعد 12 شهرًا" (Balance after 12 months) → `{{ futureBalanceFmt }}`
- "انتهاء قرض السيارة" (Car loan payoff) → `{{ loanDateWhat }}` + green "أبكر {{ wLoanSaved }} شهرًا" pill
- "درجة الحمض المالي المتوقعة" (Projected DNA score) → `{{ dnaProjected }}` — this is a made-up linear bump off the base 82, capped at 97; not a real re-scored personality.

---

#### Timeline (`isTimeline` = `screen === 'timeline'`)
Headline "الخط الزمني المالي" (Financial Timeline), subhead `يتحدّث تلقائيًا وفق توقعات الذكاء الاصطناعي` ("updates automatically per AI predictions" — **false**, it's a fully static list). 6 fully hardcoded timeline entries with fixed dates/colors/amounts:
1. أغسطس 2026 — "استلام الراتب" +15,700 SAR, day 27 (green dot)
2. سبتمبر 2026 — "قسط قرض السيارة" 1,850 SAR auto-debit (primary dot)
3. أكتوبر 2026 — "أرباح استثمار متوقعة" +320 SAR (gold dot)
4. ديسمبر 2026 — "اكتمال هدف رحلة اليابان" 25,000 SAR (green dot)
5. فبراير 2027 — "هدف السيارة يبلغ 60%" (primary dot)
6. `{{ carDateNew }}` (dynamic, same What-If-derived value as elsewhere) — "شراء تويوتا كامري" (copper dot, styled as the final/target milestone)

---

#### Challenges (`isChallenges` = `screen === 'challenges'`)
Back button. "رصيد نقاط DNA" (DNA points balance) hero card: `{{ dnaPointsFmt }}` (from `state.dnaPoints`, default 1250), static level label "المستوى: مدخر ذهبي" (Gold Saver level).
- Challenge 1: "وفّر 200 ريال هذا الأسبوع" (save 200 this week), static "+250 نقطة" badge, hardcoded 60% bar, `120 / 200 SAR`, either "✓ مكتمل" or a "جرّب: الإتمام" button (`completeCh1` — awards 250 pts, toasts)
- Challenge 2: "تجنّب المطاعم 5 أيام" (avoid restaurants 5 days), static "+300 نقطة" badge, 5-segment static progress (3 filled), "3 من 5 أيام", complete button `completeCh2` (awards 300 pts)
- Challenge 3 (already-done, dimmed, non-interactive): "خفّض مصروف القهوة 100 ريال" — static "✓ مكتمل" + note "أُنجز الأسبوع الماضي — أضاف +200 نقطة وقرّب هدف السفر يومين"

---

#### Loans (`isLoans` = `screen === 'loans'`)
Back button, title "قروضي" (My Loans). Car loan card: `Badge tone="ok"` "منتظم السداد" (on-time payer), remaining balance `{{ loanRemainingFmt }}` (fixed principal 44,400 minus nothing — it's static, doesn't decrease over time in this prototype), monthly payment static `1,850`, base payoff date `{{ loanDateBase }}` = `dateAfter(44400/1850)`.
Slider: "دفعة إضافية شهرية" (extra monthly payment) `loanExtra`, 0–2000 step 50, default `800`, shown `+{{ loanExtra }} SAR`.
**"اقتراح الذكاء الاصطناعي" (AI suggestion) card** — sentence template with live-computed numbers plugged in:
> `إذا دفعت {{ loanExtra }} ريال إضافية كل شهر، ستنهي قرضك أبكر بـ {{ loanMonthsSaved }} شهرًا وتوفّر نحو {{ loanInterestFmt }} ريال من الفوائد.`
New payoff date: `{{ loanDateExtra }}`. Formulas in §2.4.

---

#### Investments (`isInvest` = `screen === 'invest'`)
Back button, title "اقتراحات الاستثمار" (Investment Suggestions).
**"رصد الذكاء الاصطناعي" (AI observation) card** — static lead-in with computed numbers:
> `لديك فائض شهري ثابت يبلغ 3,900 ريال. يمكن استثمار 1,500 ريال منه دون التأثير على ميزانيتك اليومية أو أقساطك.`
(the `3,900` and `1,500` here are literal hardcoded numbers, not derived from `renderVals()` — unlike the loans card, this one isn't templated at all despite looking similar)
"مستوى المخاطرة" (Risk level) — 3 `Chip`s from `riskChips` (منخفضة/متوسطة/مرتفعة = low/med/high), bound to `state.investRisk` (default `'med'`). Selecting a risk level changes:
- "العائد السنوي المتوقع" (expected annual return) `{{ investReturnPct }}` — 4%/7%/11% by tier
- "القيمة بعد 3 سنوات" (value after 3 years) `{{ investProjFmt }}` = `1500*36*(1+ret*1.5)`
- Recommended products list (`investProducts`, 2 per tier): low=[صندوق مرابحة بالريال, صكوك حكومية], med=[محفظة متوازنة, صندوق ريت عقاري], high=[صندوق أسهم سعودية, صندوق أسهم عالمية]
- Footer sentence: `الأثر على أهدافك: هذا الاستثمار يقرّب هدف الشقة نحو {{ investDays }} يومًا شهريًا, ويرفع درجة الاستثمار في حمضك المالي.` — `investDays` computed from risk return rate.

---

#### Overlay sheets (all bottom-sheet style, `position:absolute;bottom:0`, scrim behind)

- **Notifications** (`notifOpen`) — opened via the Home bell (`openNotifs`), closed via `closeNotifs` or scrim click. Renders `notifItems`, a **hardcoded array of 3** built fresh every render in `renderVals()` (not real notifications, not from `state`):
  1. green dot — "اكتمل 60% من تحدي الأسبوع" / "وفّرت 120 من 200 ريال — باقي 3 أيام" / "اليوم"
  2. copper dot — "قسط السيارة يُخصم بعد 3 أيام" / "1,850 SAR — رصيدك يغطيه بأمان" / "أمس"
  3. primary dot — "أرباح استثمار متوقعة" / "+320 SAR من المحفظة المتوازنة في أكتوبر" / "قبل يومين"
- **Services** ("المزيد من الخدمات", `servicesOpen`) — opened from the bottom nav's 5th ("المزيد") tab. Renders `serviceLinks`, 4 items each with icon/label/desc, routing to the 4 "more" screens: ماذا لو؟→`whatif`, التحديات الذكية→`challenges`, قروضي→`loans`, اقتراحات الاستثمار→`invest`.
- **Recommendation confirm** (`hasRecConfirm` = `!!state.recConfirm`) — opened by "طبّق" on the AI Assistant screen's 3 recommendation cards. Shows `{{ recTitle }}`, optionally "سيُنفَّذ التحويل فورًا من حسابك الجاري." (only for rec2, which moves money), a before/after comparison (`{{ recBefore }}` / `{{ recAfter }}`), Cancel (`cancelRec`) / "تأكيد التطبيق" (`confirmRec`) buttons. `confirmRec` sets the corresponding `recN:true`, deducts `delta` from `balanceDelta` (only rec2 has a nonzero delta, 500), and shows a toast (see the `recData` table in §2.4/§6).
- **Toast** (`hasToast` = `!!state.toast`) — bottom-floating dark pill, auto-dismisses after 3800ms, text from whichever action last called `showToast(...)`.

---

#### Bottom NavBar (`showNav` = `!isOnboarding && !generating`)
5 items via the design system's `NavBar` component, built from `navItems`:
1. الرئيسية (Home) → `navGo('home')`
2. حمضي المالي (My DNA) → `navGo('dna')`
3. المساعد (Assistant) → `navGo('ai')`
4. الخط الزمني (Timeline) → `navGo('timeline')`
5. المزيد (More) → opens the Services sheet (`servicesOpen:true`) — highlighted active whenever the current screen is one of `whatif/challenges/loans/invest` OR the sheet is open

`navGo(scr)` clears `navStack` (fresh top-level nav); `go(scr)` (used for in-screen links like `goGoalDetail`, `goWhatIf` etc.) pushes the current screen onto `navStack` so the phone-frame `‹` back button (`goBack`) can pop back to it.

### 2.3 The full `state` object (literal, from the source)
```js
state = {
  screen: this.props.startScreen ?? 'onboarding',
  obStep: 1,
  generating: false,
  salary: '14,500',
  extraIncome: '1,200',
  currency: 'SAR',
  ob: { personal: '', car: '1,850', mortgage: '', cards: '650', bills: '780', other: '' },
  goals: [
    { id: 1, name: 'تويوتا كامري', amount: '123,000', date: 'مارس 2028' },
    { id: 2, name: 'شقة تمليك', amount: '585,000', date: 'يونيو 2031' },
  ],
  nextGoalId: 3,
  priorities: ['saving', 'house'],
  balanceDelta: 0,
  extraSpent: 0,
  rec1: false, rec2: false, rec3: false,
  whatSalary: 0, whatSave: 500, whatLoan: 0, whatInvest: 0,
  loanExtra: 800,
  investRisk: 'med',
  ch1: 'active', ch2: 'active',
  dnaPoints: 1250,
  toast: null,
  navStack: [],
  notifOpen: false,
  servicesOpen: false,
  recConfirm: null,
  stacksBoost: false,
};
```
Note: `stacksBoost` is set by `simSalary` (with a 6s auto-reset timer, `_stackT`) but is **never read** anywhere in `renderVals()` — dead state, presumably meant to trigger a visual flourish on the cash-note stacks that was never wired up.

### 2.4 Helper methods & key derived-value formulas (all client-side arithmetic, not AI)
- `num(s)` — strips non-numeric chars, parses float, NaN→0. Used to read the free-text `Input` fields (salary, obligations, goal amounts) as numbers.
- `fmt(n)` — `Math.round(n).toLocaleString('en-US')` (thousands separator, no decimals).
- `showToast(text)` — sets `state.toast`, auto-clears after 3800ms via `this._toastT`.
- Money/budget: `balance = (props.balance ?? 18520) + state.balanceDelta`; note-stack counts `n500 = clamp(0,18, floor(balance/2000))`, `n100 = clamp(1,14, round((balance%2000)/150)||1)`; `budgetLimit = props.dailyBudget ?? 185`; `spent = 96 + state.extraSpent`; `remaining = budgetLimit - spent`; `exceeded = remaining<0`.
- `spend(amount, toast)` — the shared handler behind `simCoffee`/`simRestaurant`: decrements `balanceDelta`, increments `extraSpent`, shows toast.
- Date math: `monthsAr` = 12 Arabic month names; `dateAfter(m)` = `new Date(2026, 6 + round(m))` formatted as "MonthName Year" — i.e. **the simulator's "today" is hardcoded as July 2026** (month index 6).
- What-If formulas: `baseSaving=3550`, `carRemaining=71000`; `salaryDelta = num(salary) * (whatSalary/100)`; `extraMonthly = whatSave + salaryDelta*0.5 + whatInvest*0.7`; `newCarM = carRemaining/(baseSaving+extraMonthly)`; `carDaysSaved = round((carRemaining/baseSaving - newCarM)*30)`; `wSurplus = 3900 + salaryDelta - whatLoan`; `futureBalance = balance + wSurplus*12 + whatInvest*12*1.08`; loan: `loanRemaining=44400, loanPay=1850`; `wLoanM = loanRemaining/(loanPay+whatLoan)`; `wLoanSaved = round(loanRemaining/loanPay - wLoanM)`; `dnaProjected = min(97, 82 + round(extraMonthly/400) + round(whatLoan/500))`.
- Loans-screen formulas: `lM = loanRemaining/(loanPay+loanExtra)`; `lSavedM = round(loanRemaining/loanPay - lM)`; `lInterest = lSavedM * 1270` (flat 1,270 SAR "interest saved" per month shaved off — an arbitrary constant, not a real amortization calc).
- Investment `riskMap`: `low:{pct:'4%',ret:0.04,...}`, `med:{pct:'7%',ret:0.07,...}`, `high:{pct:'11%',ret:0.11,...}`; `investProj = 1500*36*(1+ret*1.5)`; `investDays = round(260*ret/0.07)/10`.
- `recData` — the object backing the recommendation-confirm sheet (this is effectively the canonical "3 AI recommendations" content, duplicated in prose form on the DNA and AI screens):
  ```js
  {
    rec1: { title:'خفّض مصروف المطاعم 300 ريال', money:false, before:'هدف السيارة متأخر 23 يومًا', after:'يعود إلى مساره — مارس 2028', delta:0, toast:'رائع — عاد هدف السيارة إلى مساره المتوقع: مارس 2028' },
    rec2: { title:'حوّل 500 ريال إلى الاستثمار', money:true, before:'رصيدك '+fmt(balance)+' SAR', after:'هدف المنزل أقرب 18 يومًا', delta:500, toast:'تم تحويل 500 ريال إلى الاستثمار — اقترب هدف المنزل 18 يومًا' },
    rec3: { title:'زد ادخارك الأسبوعي 150 ريالًا', money:false, before:'درجة حمضك المالي 82', after:'ترتفع إلى 85 خلال شهر', delta:0, toast:'ممتاز — سترتفع درجة حمضك المالي إلى 85 خلال شهر' },
  }
  ```
- `completeCh(k, pts)` — shared handler behind `completeCh1`(250pts)/`completeCh2`(300pts): no-ops if already `'done'`, else sets state to `'done'` and adds `pts` to `dnaPoints`, toasts `أحسنت! أنجزت التحدي — +{pts} نقطة DNA أُضيفت إلى رصيدك`.

### 2.5 Full list of handler/action functions exposed by `renderVals()`
`obNext`, `obBack`, `skipOnboarding`, `setSalary`, `setExtraIncome`, `currencies[].select` (×3), `obFields[].onChange` (×6), `goalPresets[].add` (×7), `obGoals[].remove/setAmount/setDate` (per goal), `priorityItems[].toggle` (×6), `simSalary`, `simCoffee`, `simRestaurant`, `goAi`, `applyRec1/2/3`, `cancelRec`, `confirmRec`, `openNotifs`, `closeNotifs`, `closeServices`, `goBack`, `goHome`, `goGoalDetail`, `goWhatIf`, `goChallenges`, `goLoans`, `goInvest`, `setWhatSalary/Save/Loan/Invest`, `setLoanExtra`, `riskChips[].select` (×3), `completeCh1`, `completeCh2`, plus the 5 `navItems[].onClick` and 4 `serviceLinks[].go`.

---

## 3. `FinDNA Employee Dashboard.dc.html` — complete structure

**No `<script data-dc-script>` block exists in this file.** It is a single static `<x-dc>` template with zero state, zero handlers, zero `sc-if`/`sc-for` (no conditionals or loops at all — every value is a literal). The two `Button`s present ("تقديم عرض" / "عرض التفاصيل" / "محاكاة السداد") have no `on-click` wired. This is a **read-only mockup screen**, not an interactive prototype like the main app.

### 3.1 Document shell
Same helmet pattern as the main app (loads the same 7 design-system CSS files + `_ds_bundle.js`), but **does not import `ios-frame.jsx`** — this page is a plain desktop-width web page (`max-width:1180px` centered column), not wrapped in a phone frame. `dir="rtl"` on the outer content div, `data-screen-label="Employee Dashboard"`.

### 3.2 Content, top to bottom

- **Top bar** (sticky): `FinDNA` wordmark, divider, "لوحة الموظف — نظرة العميل" (Employee Dashboard — Customer View); right side: "فرع الرياض الرئيسي · نورة العتيبي" (Riyadh Main Branch · Noura Al-Otaibi — the logged-in employee's static name/branch) + a "ن" avatar initial circle.
- **Customer header card**: "أ" avatar initial, name "أحمد السالم" (Ahmed Al-Salem — note: **different surname than the main app's implied customer**, which only ever says "أحمد" first-name), `Badge tone="ok"` "عميل موثّق" (Verified customer), meta line "رقم العميل 100482913 · عميل منذ 2019 · راتب محوّل" (Customer #100482913 · customer since 2019 · salary-transferred). Two ring gauges: DNA score `82` (conic-gradient 82%, copper) labeled "درجة الحمض المالي" (Financial DNA score) and commitment score `96` (conic-gradient 96%, green) labeled "درجة الالتزام" (Commitment score) — **both identical to the values shown in the main customer app's DNA screen**, confirming this dashboard represents the same fictional customer.
- **"ملخص الذكاء الاصطناعي" (AI Summary) card** — the single largest block of hardcoded "AI" prose in the whole repo:
  > `يبدو العميل مؤهلًا لتمويل مركبة. لا توجد أي دفعات متأخرة خلال آخر 24 شهرًا، ونسبة الدين إلى الدخل صحية عند 21%. الفائض الشهري (3,900 ريال) يدعم تمويلًا إضافيًا حتى قسط 2,400 ريال شهريًا دون التأثير على أهدافه القائمة. العميل مدخر ملتزم منخفض المخاطرة — الأنسب له منتجات التمويل منخفضة الكلفة والمحافظ الاستثمارية المتحفظة.`
  ("Customer appears eligible for vehicle financing. No late payments in 24 months, debt-to-income healthy at 21%. Monthly surplus (3,900 SAR) supports additional financing up to a 2,400 SAR/month installment without affecting existing goals. Low-risk committed saver — best suited to low-cost financing products and conservative investment portfolios.")
  Below it, 3 static `Badge`s: `tone="ok"` "مؤهل لتمويل مركبة" (Eligible for vehicle financing), `tone="ok"` "سجل سداد نظيف" (Clean payment record), `tone="warn"` "مصروف مطاعم مرتفع" (High restaurant spending).
- **Metrics grid** (4 static cards): "نسبة الدين إلى الدخل" (Debt-to-income) 21% green, footnote "حد البنك 45%" (bank limit 45%); "استقرار الدخل" (Income stability) 94%, footnote "راتب ثابت 36 شهر" (steady salary 36 months); "معدل الادخار" (Savings rate) 12%, footnote "من الدخل الشهري"; "مستوى المخاطرة" (Risk level) "منخفض" (Low) with `41/100` sublabel.
- **Left column — "الوضع المالي الشهري" (Monthly financial position) card**: 3x `FlowStat` — "إجمالي الدخل" (Total income) 15,700 in/green, "الالتزامات" (Obligations) 3,280 out/red, "الفائض الشهري" (Monthly surplus) 3,900 neutral. Below, 3 static obligation line-items: "قرض سيارة قائم" (existing car loan) 1,850/month · remaining 44,400; "بطاقات ائتمانية" (credit cards) 650/month; "فواتير شهرية" (monthly bills) 780/month.
- **Left column — "الأهلية التمويلية" (Financing eligibility) card**: `Badge tone="ok"` "محدّثة الآن" (updated now). 3 rows: "تمويل مركبة" (vehicle financing) up to 180,000, `Badge tone="ok"` "مؤهل" (eligible); "تمويل شخصي" (personal financing) up to 120,000, `Badge tone="ok"` "مؤهل"; "تمويل عقاري" (mortgage) requires 15% down payment, `Badge tone="warn"` "مشروط" (conditional).
- **Right column — "الأهداف الحالية" (Current goals) card**: 3 static goal progress rows — تويوتا كامري 42% ("الإنجاز المتوقع: مارس 2028"), شقة تمليك 12% ("يونيو 2031"), رحلة اليابان 68% ("ديسمبر 2026") — identical figures to the main app's Home-screen goal cards.
- **Right column — "إمكانات الاستثمار" (Investment potential) card**: subtext "فائض شهري ثابت غير مستثمَر — فرصة لعرض محفظة متحفظة" (stable unused monthly surplus — opportunity to pitch a conservative portfolio); highlight box "قابل للاستثمار شهريًا" (investable monthly) `1,500 SAR`.
- **"منتجات موصى بها لهذا العميل" (Recommended products for this customer)** — subtext "مرتبة حسب ملاءمة الحمض المالي" (ranked by DNA fit). 4 static product cards, all copy hardcoded:
  1. **Highlighted/best-fit** (copper border, `Badge tone="new"` "الأنسب" = "Best fit"): "تمويل مركبة" (vehicle financing) — "يغطي هدف الكامري فورًا — قسط 2,150 ريال ضمن قدرته" (covers the Camry goal immediately — 2,150/month installment within capacity). `Button variant="copper"` "تقديم عرض" (Submit offer) — unwired.
  2. "محفظة استثمارية متحفظة" (conservative investment portfolio) — "1,500 ريال شهريًا — تقرّب هدف الشقة نحو 14 شهرًا" (brings the apartment goal ~14 months closer). `Button variant="soft"` "عرض التفاصيل" (View details) — unwired.
  3. "حساب ادخار بعائد" (yield savings account) — "يناسب نمطه الادخاري المنتظم — تحويل تلقائي شهري" (suits regular saving pattern — automatic monthly transfer). `Button variant="soft"` "عرض التفاصيل" — unwired.
  4. "سداد مبكر لقرض السيارة" (early car-loan payoff) — "800 ريال إضافية شهريًا تنهي القرض قبل 11 شهرًا وتوفر 14,000 ريال" (extra 800/month ends the loan 11 months early, saves 14,000). `Button variant="soft"` "محاكاة السداد" (Simulate payoff) — unwired.

Nothing on this page reacts to anything; it is a **presentation artifact**, effectively "what would the bank employee see, assuming the AI summary and recommendations already exist as text." This is likely the highest-value target for real agent integration since none of it currently has even fake client-side computation behind it — it's pure copy.

---

## 4. How the DC component system works (`support.js` runtime)

The whole app runs off one script, `support.js`, loaded once per `.dc.html` page. No build step — it's hand-rolled, loaded as a plain `<script>` tag, and does everything at runtime in the browser:

### 4.1 Boot sequence (`src/index.ts` region, bottom of the file)
1. `hideRawTemplate()` injects `x-dc{display:none!important}` so the raw unprocessed template never flashes visible.
2. `loadReactUmd()` — if `window.React`/`window.ReactDOM` aren't already present, loads React 18.3.1 + ReactDOM UMD builds from unpkg with SRI hashes pinned in the source (`REACT_URL`/`REACT_SRI`/`REACT_DOM_URL`/`REACT_DOM_SRI`).
3. `init()` runs: creates the runtime (`createRuntime(document)`), installs a global `window.__dcBoot`/`__dcUpdate`/etc. API (used by a design-tool host for live-editing/streaming; irrelevant for a static deployment), and calls `api.__dcBoot()` either immediately or on `DOMContentLoaded`.
4. `boot(runtime, doc)` (`src/boot.ts`): parses the `<x-dc>` element's innerHTML as the template and the sibling `<script data-dc-script>`'s text as the logic-class source (`parseDcDocument`), derives a "root name" from the URL/filename (`dcNameFromPath` strips `.dc.html`), registers it, **replaces the `<x-dc>` element in the DOM with a fresh `<div id="dc-root">`**, and mounts a `StandaloneRoot` React component into it via `ReactDOM.createRoot(...).render(...)`.

### 4.2 Template compilation (`src/compile.ts`)
The raw HTML inside `<x-dc>` is parsed once via a `<template>` element, every element gets a `data-dc-tpl` index attribute stamped on for editor tooling, and `walkChildren`/`walk` recursively turn the DOM into an array of **builder functions** — each a `(vals, ctx, key) => ReactElement` closure. Special tag handling:
- **`<sc-if value="{{ expr }}" hint-placeholder-val="{{ fallback }}">`** — compiles `expr` via `compileAttr`, evaluates it against the current `vals` object at render time; truthy → renders children (wrapped in a `React.Fragment`), falsy/undefined → renders `null`. `hint-placeholder-val` is only consulted during **streaming** (i.e. a design-tool host pushing partial template/JS updates over `postMessage`), giving a placeholder truthiness before the real logic class has finished evaluating — **irrelevant to a static production deployment**, where the real `value` always wins.
- **`<sc-for list="{{ expr }}" as="name" hint-placeholder-count="N">`** — resolves `expr` to an array; if not an array, warns once (`warnUnresolved`) and renders nothing (or, mid-stream, renders `N` placeholder items). Otherwise maps each item into a child render pass with `{...vals, [as]: item, $index: i}` merged in — this is exactly how e.g. `sc-for list="{{ obFields }}" as="f"` makes `{{ f.label }}` resolve inside the loop body.
- **`<x-import component-from-global-scope="Name.Path" from="./file.js|.jsx" ...props>`** (`walkXImport`) — the mechanism behind every design-system component reference (`FinDNADesignSystem_beecc4.Button`, etc.) and both external-module imports (`IOSDevice` from `ios-frame.jsx`, `image-slot` from `image-slot.js`). At compile time it eagerly starts loading the referenced module (`host.loadExternal`) unless the `from` URL itself contains a `{{ }}` binding (in which case it errors — module URLs must be static). At render time it resolves the named export/global (`host.resolveExternalGlobal`), builds a props object from every other attribute (kebab-case auto-camelCased, `dc-props="{{ obj }}"` spread in wholesale — this is how e.g. `dc-props="{{ btnFull }}"` injects `{style:{width:'100%',justifyContent:'center'}}` onto a `Button`), and renders the resolved component. If the module hasn't resolved yet or the named export is missing, it renders a `Placeholder` (dashed shimmer box) instead — this is only visibly a loading flicker on first paint, not a persistent failure mode, once external modules are cached.
- **`<helmet>` / `<sc-helmet>`** (`walkChildren`'s handling of the aliased tag — `encodeCase` renames `<helmet>`→`<sc-helmet>` before parsing since `<helmet>` isn't a valid HTML tag) — every `<link>`/`<meta>`/`<script>`/other child gets appended once into the real document `<head>`, deduped by a content-based key so re-renders don't re-inject.
- **Plain DOM elements** (`walkElement`) — attribute values run through `compileAttr` (literal string, or a `{{ expr }}`-interpolated template-string, or a pure single-expression binding when the whole attribute is exactly one `{{ }}`), `style="..."` strings get parsed into a JS style object (`cssToObj`), `class`→`className`, `for`→`htmlFor`, `onClick`/`onChange`/etc. get proper React camelCase event names (`EVENT_MAP`). A `style-hover="css"` (or any `style-<pseudo>`) attribute compiles to an injected `<style>` rule via `host.pseudoClass(...)` and a generated class name appended to `className` — this is how e.g. the Services-sheet row's `style-hover="background:var(--primary-50)"` works, since inline `style` objects can't express `:hover`.
- **Text nodes with `{{ expr }}`** — split on the `{{ }}` delimiter, each expression resolved and rendered as a `<span className="sc-interp">`. An unresolved (`undefined`) binding renders as nothing in production (only shows an editor-mode indicator or streaming-placeholder span otherwise) — it does **not** throw.

### 4.3 The expression language (`src/expr.ts`)
Everything inside `{{ }}` is **not** JavaScript — it's a small hand-written resolver (`resolve(vals, src)`) supporting only:
- Parenthesized grouping
- Top-level `==`, `===`, `!=`, `!==` comparisons (recursively resolving both sides)
- Unary `!`
- Literals: `true`/`false`/`null`/`undefined`, numbers, single/double-quoted strings
- **Dotted/bracketed property paths** against the `vals` object (`resolvePath`): `foo.bar`, `foo[0]`, `foo["key"]`, `foo[bar]` (nested resolution for computed keys) — this is the entire feature set; there's no arithmetic, ternary, method calls, or function invocation syntax inside a template `{{ }}` expression. All actual computation happens in the logic class's `renderVals()`, which pre-computes every value the template will read by name.

### 4.4 The logic class (`src/logic.ts`, `src/component.ts`)
`class Component extends DCLogic { state = {...}; renderVals() {...} }` — `DCLogic` (aliased as `StreamableLogic`) is a tiny base class providing:
- `this.props` — set to whatever the `<script data-dc-script data-props="...">` JSON schema's declared props resolve to (design-tool overrides, or each prop's `default`) — **not** related to React props on a parent component; there is no parent, this is the page root.
- `this.state` — a plain object, whatever the subclass initializes.
- `this.setState(update, cb)` — accepts either an object patch or an updater function `(prevState)=>patch`, shallow-merges it into `this.state`, and triggers a re-render (via the wrapping `StreamableComponent`'s `forceUpdate`-driven `setState`). **This is a synchronous, non-batched-across-calls simple merge** — not React's real `setState`, just enough of the API shape to feel familiar.
- `this.forceUpdate()`, `componentDidMount/DidUpdate/WillUnmount()` lifecycle no-ops the subclass may override (the App's `Component` overrides `componentWillUnmount` to clear its 3 pending timers).
- `renderVals()` — called on **every render**, must return a flat object; the actual values the template's `{{ }}` bindings resolve against are `{...this.props, ...this.renderVals()}` (props first, then renderVals results override/extend them — see `StreamableComponent.render()`). This is why e.g. `startScreen` (a prop) seeds `state.screen` in the constructor but the template never reads `startScreen` directly — everything the template needs, `renderVals()` re-derives fresh from `state` every time, including all the routing booleans (`isHome`, `isDna`, etc.), formatted strings (`balanceFmt`), and every inline handler closure (`goAi`, `simCoffee`, ...). **There is no persistent handler identity across renders** — a fresh closure is created every render, which is fine for this simple UI but is a reason not to rely on `React.memo`/prop-equality anywhere in a design-system component that wraps these.

`StreamableComponent` (a real `React.Component`) is the actual mounted node per named DC (`FinDNADesignSystem_beecc4.Button`, the page root, etc.). It: constructs the logic instance and calls `ensureFetched(name)` (fetches `./{name}.dc.html` for any *sibling* DC referenced by plain name — not used by this app, which only ever references the page root's own inline logic plus external `x-import` modules, so this sibling-fetch path is dormant here); implements a React error boundary (`getDerivedStateFromError`/`componentDidCatch`) so a template/logic crash renders an inline red error banner instead of white-screening the whole app; on every render, merges `{...userProps, ...this.logic.renderVals()}` into `vals` and calls the compiled template function with it.

### 4.5 External module loading (`src/external.ts`)
`<x-import from="./ios-frame.jsx">` / `from="./image-slot.js"` / `from="_ds/.../​_ds_bundle.js"` (implicitly, via `<script>` in the helmet rather than `x-import`, for the design-system bundle) resolve as follows:
- `.jsx`/`.tsx` files are fetched as raw text and transpiled **in the browser** via `window.Babel.transform(src, {presets:['react','typescript']})` (Babel-standalone, lazily CDN-loaded from unpkg on first JSX import — `ensureBabel()`). `.js` files are used as-is.
- The transpiled/raw source is executed via `new Function("React","module","exports","require", code)(...)` — a sandboxed-ish eval, not a real module system; `require` is stubbed to always return `{}`.
- After execution, the loader diffs `Object.keys(window)` before/after to capture any new global function the script attached (this is how `ios-frame.jsx`'s trailing `Object.assign(window, {IOSDevice, ...})` and `image-slot.js`'s `customElements.define(...)` become resolvable) — `component-from-global-scope="IOSDevice"` then resolves `IOSDevice` off that captured globals map (or straight off `window` as a fallback).
- Design-system components are resolved the same way but via a **different path**: the design-system bundle is loaded as a plain `<script src="...">` tag in the `<helmet>` (not via `x-import`), so it just executes normally and sets `window.FinDNADesignSystem_beecc4 = {...}` itself; `x-import component-from-global-scope="FinDNADesignSystem_beecc4.Button"` then resolves via dotted-path traversal (`resolveDottedPath`) straight off `window`, polling every 50ms up to 30s if it's not there yet (`waitForGlobal`) — since the bundle loads synchronously before the template needs it in practice, this polling path is rarely exercised.
- `<image-slot>` is a **custom element** (`isCustomElementName` — has a hyphen, no dot), so it resolves differently: the runtime just needs `customElements.get('image-slot')` to be truthy and then renders the literal tag name `image-slot` (React passes custom-element tags through natively) rather than a `C` function component reference.

### 4.6 Streaming / hot-reload machinery
A large fraction of `support.js` (`registry.ts`, `stream-state.ts`, most of `runtime.ts`'s `dcUpdate`/`setStreaming`/`__dcUpdate` API surface, the `sc-placeholder`/shimmer CSS in `BASE_CSS`, the `hint-placeholder-*` attributes throughout the templates) exists to support a **live design-tool host** pushing incremental template/JS/props updates into the page via `postMessage`, with shimmer placeholders for not-yet-arrived content. **None of this is relevant to a static/production deployment of these two files** — when loaded as plain static HTML (as they are here), `window.__resources`/`window.omelette` never exist, streaming never activates, and every `hint-placeholder-*` attribute is simply inert dead weight in the markup. Don't build agent-integration logic on top of this machinery; it's inherited design-tool scaffolding, not an app feature.

---

## 5. Design-system components (`_ds_bundle.js`)

All exposed as `window.FinDNADesignSystem_beecc4.<Name>`, referenced in templates as `<x-import component-from-global-scope="FinDNADesignSystem_beecc4.<Name>" ...props>`. Every one is a plain functional React component reading CSS custom properties (design tokens) for all colors — none has any data-fetching or async behavior; they're pure presentation.

| Component | Props | Notes |
|---|---|---|
| **Button** | `variant` (`primary`\|`ghost`\|`soft`\|`copper`, default `primary`), `size` (`sm`\|`md`, default `md`), `disabled`, `icon`, `children`, `onClick`, `style`, `...rest` | Local `useState` for hover, swaps in `HOVER_STYLE` per variant on mouseenter (primary→primary-600 bg, ghost→primary-50 bg, copper→brightness(1.06) filter, soft→no change). `sm`=9px/16px padding+13px font, `md`=13px/22px+15px font. Always `borderRadius:14`, `fontWeight:700`. |
| **BalanceCard** | `label` (default "الرصيد الحالي"), `amount` (default `'0'`), `currency` (default `'SAR'`), `style` | Used only by the design system's own internal `alinma-app` demo kit — **not referenced anywhere in either FinDNA `.dc.html` file** (the actual balance display in `FinDNA App.dc.html`'s Home screen is hand-rolled markup, not this component). |
| **FlowStat** | `label`, `value`, `tone` (`in`\|`out`\|`neutral`, default `neutral`), `style` | Left-border accent (`borderInlineStart:3px solid <toneColor>`); `in`/`out` border+text color = success/danger, `neutral` border=primary but text=ink. Value rendered inside a `.fd-num` span (forces LTR + tabular numerals). Used extensively — DNA screen behavior summary, AI screen week summary, Employee Dashboard monthly position. |
| **Input** | `placeholder`, `value`, `onChange`, `focused` (default false), `style`, `...rest` | Local `useState` for focus; border color switches to `var(--primary)` when `focused` prop OR actually focused. `borderRadius:14`, `padding:'14px 16px'`. Used throughout onboarding for every free-text numeric field. |
| **Icon** | `name` (default `'home'`), `size` (default 24), `color` (default `currentColor`), `style`, `...rest` | Inline SVG, `viewBox="0 0 24 24"`, 2px stroke, round caps/joins, no fill. `PATHS` table has exactly 12 names: `home, transfer, card, statement, beneficiary, government, history, verified, international, notification, servicesGrid, statementCheck`. Falls back to `home`'s path if `name` doesn't match. `ICON_NAMES` is also exported (`Object.keys(PATHS)`). |
| **QuickAction** | `icon` (default `'transfer'`), `label`, `onClick` | 52×52 rounded-15 primary-filled tile with a white `Icon` centered, caption below. Used for Home screen's 4-item action row (though in the actual app template, `onClick` is applied on the *wrapping* `<div>` around `<x-import>`, not passed as a prop — the component's own `onClick` prop is effectively unused there, harmless duplication). |
| **ListItem** | `icon` (default `'transfer'`), `label`, `chevron` (default true), `onClick`, `style` | Icon + label + trailing `‹` row, 8px bottom margin. **Not used in either FinDNA `.dc.html` file** — only in the design system's own internal demo kit. |
| **NavBar** | `items` (array of `{icon,label,active,onClick}`), `style` | Renders each item as an icon+label column tinted primary if `active`. This **is** the component behind the app's bottom tab bar. |
| **Badge** | `tone` (`new`\|`ok`\|`warn`, default `new`), `children`, `style` | Pill label. `new`=solid copper bg/white text, `ok`=15%-opacity green bg/green text, `warn`=18%-opacity copper bg/copper text. Used for eligibility/status labels throughout both apps (e.g. "مؤهل", "عميل موثّق", "الأنسب"). |
| **Chip** | `active` (default false), `children`, `onClick`, `style` | Pill toggle. `active`=solid primary bg/white text, inactive=surface bg/line border/text-2. Used for currency select (onboarding), goal presets, risk-level select (Investments), priority filters in the design system's own demo (not in FinDNA app, which uses raw tiles for priorities instead). |

**Not used by either FinDNA file, present only for the design system's own internal `alinma-app` demo kit** (`ui_kits/alinma-app/*` in the bundle): `AlinmaApp`, `HomeScreen`, `TransferScreen`, `StatementScreen`, `BeneficiariesScreen`, and a duplicate copy of `ios-frame.jsx`'s exports. Safe to ignore entirely for agent-integration work — dead code as far as this repo's two real screens are concerned.

---

## 6. Screen names & navigation triggers (complete map)

Only `FinDNA App.dc.html` has navigation (Employee Dashboard is a single static page). All routing is a single `state.screen` string switched by 11 `sc-if isScreenName` booleans computed in `renderVals()`.

| `screen` value | Routing flag | Entered via | Special notes |
|---|---|---|---|
| `onboarding` (default) | `isOnboarding` (`screen==='onboarding' && !generating`) | initial `startScreen` prop, or `skipOnboarding`... wait, skip goes to `home` | 5-step sub-flow gated by `state.obStep` (`isOb1`..`isOb5`) |
| *(transient)* | `isGenerating` (`state.generating`) | last onboarding step's `obNext` sets `generating:true` | Auto-resolves to `home` after a hardcoded 2000ms timer; not a `screen` value itself, an overlay on top of whatever `screen` currently is |
| `home` | `isHome` | `skipOnboarding`, post-generating auto-nav, `navGo('home')` (nav bar item 1), `goHome` (defined but not wired to any visible control in the current template) | Default landing screen after onboarding |
| `dna` | `isDna` | `navGo('dna')` (nav bar item 2) | |
| `ai` | `isAi` | `navGo('ai')` (nav bar item 3), `goAi` (Home screen's "رؤية اليوم" card click) | |
| `goal` | `isGoal` | `goGoalDetail` (Home screen's Camry goal card click — **only** the Camry card is clickable, the other two goal cards have no click handler) | Always shows Camry regardless of entry point |
| `whatif` | `isWhatIf` | `goWhatIf` (Home's "ماذا لو؟" quick action, Goal Detail's CTA button, Services sheet link) | |
| `timeline` | `isTimeline` | `navGo('timeline')` (nav bar item 4) | |
| `challenges` | `isChallenges` | `goChallenges` (Home's "التحديات" quick action, AI screen's "تحدي الأسبوع" card click, Services sheet link) | |
| `loans` | `isLoans` | `goLoans` (Home's "قروضي" quick action, Services sheet link) | |
| `invest` | `isInvest` | `goInvest` (Home's "الاستثمار" quick action, Services sheet link) | |

Two navigation primitives:
- `go(scr)` — used for **in-context** links (goal detail, what-if, challenges, loans, invest, and the AI-assistant challenge card): pushes the *current* screen onto `navStack` before switching, and also force-closes both overlay sheets. The phone-frame's `‹` back button everywhere (`goBack`) pops the last entry off `navStack` (defaulting to `'home'` if empty).
- `navGo(scr)` — used **only** by the 5 bottom-nav-bar items: switches screen and **clears** `navStack` entirely (top-level navigation resets any back-stack).

Overlays (not `screen` values, independent boolean state): `notifOpen` (bell icon → sheet), `servicesOpen` (nav bar 5th tab → sheet, or auto-highlighted true when screen is one of whatif/challenges/loans/invest even if the sheet itself is closed), `recConfirm` (set to `'rec1'|'rec2'|'rec3'`, drives the confirm-sheet), `toast` (any `showToast()` call).

---

## 7. Every hardcoded AI-related text (the replacement target list)

Organized by screen, in the order an integrating engineer would encounter them. "Static" = literal string, zero computation. "Templated" = static sentence with `{{ }}` numeric values plugged in that themselves come from simple client-side arithmetic (§2.4), not from any model.

### `FinDNA App.dc.html`
1. **Home → "رؤية اليوم" card** (static): `التزمت بجميع أقساطك هذا الشهر. مصروف المطاعم ارتفع 18% — إن استمر، سيتأخر هدف السيارة 23 يومًا.` — the single most prominent "daily AI insight" surface in the app; always visible on the primary landing screen.
2. **Home → recent-transaction impact captions** (static ×3): "أخّرت هذه العملية هدف السفر يومًا واحدًا" / "قلّلت هذه العملية ادخارك الشهري 7٪" / "ممتاز — قرّب استثمارك هدف المنزل 18 يومًا" — per-transaction "why this matters" micro-copy.
3. **Financial DNA screen** (static, whole screen): personality label "مدخر ملتزم" + description sentence; all 7 personality-indicator scores/bars; 3 strengths bullets; 2 weaknesses bullets; 3 numbered recommendations (duplicated content of `recData` from §2.4, but as flat prose here, not wired to the confirm-sheet flow); the DNA score itself (`82`, hardcoded into the conic-gradient CSS, not even a template variable).
4. **AI Assistant screen → "إحاطة الصباح" (Morning briefing)** (static, with a hardcoded `7:30` timestamp): full 3-sentence paragraph — this is explicitly framed as the assistant "having already analyzed" the week, i.e. the most obvious slot for a real generated daily/weekly summary.
5. **AI Assistant screen → "توصيات اليوم" (3 recommendation cards)** — titles/subtexts static, but wired to real toggle state (`rec1/2/3`) and the confirm-sheet flow (`recData` in §2.4, whose `before`/`after`/`toast` strings are also all static prose).
6. **AI Assistant screen → "تحدي الأسبوع" card** (static): challenge title, static 60% progress, "120/200 SAR", "باقي 3 أيام".
7. **Goal Detail → "توصية الذكاء الاصطناعي" box** (static): the 1,000 SAR / conservative-portfolio / "~3 months earlier" suggestion — only the CTA ("جرّب السيناريو في المحاكي") actually connects anywhere (to the What-If screen), the analysis text itself is inert.
8. **Loans screen → "اقتراح الذكاء الاصطناعي" card** (templated): sentence structure static, `{{ loanExtra }}`/`{{ loanMonthsSaved }}`/`{{ loanInterestFmt }}` are real slider-driven numbers computed by a fixed formula (`lInterest = monthsSaved * 1270`) — a real agent could replace both the formula *and* narrate it, or just replace the narration around the existing math.
9. **Investments screen → "رصد الذكاء الاصطناعي" card** (static, despite superficially looking templated): "3,900" and "1,500" are literal numbers in the JSX/template, not bindings.
10. **Investments screen → footer "الأثر على أهدافك" sentence** (templated): `{{ investDays }}` is computed from the selected risk tier's return rate.
11. **Timeline screen subheading** (static, and arguably misleading): `يتحدّث تلقائيًا وفق توقعات الذكاء الاصطناعي` ("updates automatically per AI forecasts") sits above a fully hardcoded, non-reactive 6-entry list.
12. **Notifications sheet items** (static array of 3, rebuilt fresh every render but with fixed content) — "smart" notifications that never change.
13. Every `recData` entry's `before`/`after`/`toast` strings (§2.4) — the "before/after" comparison shown in the recommendation-confirm sheet.

### `FinDNA Employee Dashboard.dc.html`
14. **"ملخص الذكاء الاصطناعي" (AI Summary) card** (static) — the full paragraph quoted in §3.2. This is the single densest, most decision-relevant block of fake-AI prose in the repo (loan eligibility reasoning, DTI framing, product fit) and has **zero backing computation at all**, unlike some of the main app's templated numbers.
15. **3 status `Badge`s below the AI summary** (static): "مؤهل لتمويل مركبة", "سجل سداد نظيف", "مصروف مطاعم مرتفع" — read as AI-derived tags/flags but are literal markup.
16. **"منتجات موصى بها لهذا العميل" section header** ("مرتبة حسب ملاءمة الحمض المالي" — "ranked by DNA-fit") plus **all 4 product cards' rationale copy** (static) — especially the "الأنسب" (Best Fit) badge + its justification "يغطي هدف الكامري فورًا — قسط 2,150 ريال ضمن قدرته", which is the dashboard's one explicit "recommendation ranking" claim.
17. All 4 metrics-grid cards' framing ("حد البنك 45%", "راتب ثابت 36 شهر" etc.) are static too, though the numeric headline values at least *could* plausibly come from a real underwriting computation rather than narrative generation — worth distinguishing "numbers a backend could compute" from "prose an agent would generate" when scoping the integration.

**Summary heuristic for the integrating engineer:** everywhere you see the words `الذكاء الاصطناعي` ("artificial intelligence") or `رصيد نقاط DNA`/`حمضك المالي`/`رؤية اليوم` framing in the UI copy, that block is a target. The **numbers** behind What-If/Loans/Investments sliders are real (if simplistic) client-side formulas worth keeping or upgrading; the **narrative sentences** everywhere, and literally 100% of the Employee Dashboard, are static strings with no logic behind them at all.

---

## 8. Assets in `/assets` and `/uploads`

See the tables in §1. Quick recap: `/assets` (5 PNGs) is live content — 3 goal photos + 2 cash-note textures, all referenced by literal path in `FinDNA App.dc.html`. `/uploads` (5 PNGs) is **unused** — leftover reference screenshots from the design process, not linked from any template. Don't treat `/uploads` as app content.

---

## 9. CSS custom properties (design tokens) — full list

From `_ds/.../tokens/*.css` (loaded in this order via `styles.css`: fonts → colors → typography → spacing → radius → shadows → base), all under `:root`.

**Colors** (`tokens/colors.css`):
```
--primary:#7A6DB0        --primary-600:#6A5DA0    --primary-700:#584C8A
--primary-100:#E7E3F2    --primary-50:#F2EFF8
--ink:#232049            --ink-2:#3A366B          --ink-soft:#524E7A
--copper:#C6803E         --copper-lt:#E0A45E      --gold:#D9B86A
--bg:#ECEBF0             --surface:#FFFFFF        --surface-2:#F4F3F7
--line:#E0DEE8           --line-soft:#EDECF1
--text:#232049           --text-2:#6B6890         --text-3:#9895B5
--success:#3DBF8F        --danger:#E0564E         --warn:#E0A45E        --info:#7A6DB0
```
Plus semantic aliases (all `var(...)` references to the above, no new values): `--surface-card`, `--surface-page`, `--border-default`, `--border-soft`, `--text-heading`, `--text-body`, `--text-muted`, `--text-faint`, `--action-primary`, `--action-primary-hover`, `--action-primary-active`, `--action-primary-soft`.

**Typography** (`tokens/typography.css`):
```
--font-arabic: 'Tajawal', sans-serif
--font-numeric: 'Space Grotesk', sans-serif
--text-display-size:38px  --text-display-weight:900  --text-display-tracking:-1px
--text-h1-size:28px       --text-h1-weight:800
--text-h2-size:22px       --text-h2-weight:800
--text-h3-size:18px       --text-h3-weight:700
--text-body-size:15px     --text-body-weight:400
--text-caption-size:12.5px --text-caption-weight:500
--text-numeric-size:32px  --text-numeric-weight:700
--line-height-base:1.5
```
`tokens/fonts.css` is just the Google Fonts CDN `@import` for Tajawal (weights 300/400/500/700/800/900) + Space Grotesk (400/500/600/700).

**Spacing** (`tokens/spacing.css`, 8pt grid): `--s1:4px --s2:8px --s3:12px --s4:16px --s5:24px --s6:32px --s7:48px --s8:64px`

**Radius** (`tokens/radius.css`): `--r-sm:10px --r-md:16px --r-lg:22px --r-xl:28px --r-pill:100px`

**Shadows** (`tokens/shadows.css`, soft ink-tinted, low opacity):
```
--sh-sm:0 2px 8px -4px rgba(35,32,73,.12)
--sh-md:0 8px 24px -12px rgba(35,32,73,.16)
--sh-lg:0 16px 40px -16px rgba(35,32,73,.2)
```

**Base** (`tokens/base.css`): global box-sizing reset, `html,body` background/color/font-family/line-height from the tokens above, and the `.fd-num` helper (`font-family:var(--font-numeric); direction:ltr; display:inline-block; font-feature-settings:"tnum"`) applied to essentially every money/number value in both `.dc.html` files to keep digits left-to-right and tabular inside the RTL page.

Note the two `.dc.html` files' inline `<style>` blocks add a handful of **local, non-token** keyframe animations (`fdGrow`, `fdFadeUp`, `fdNoteIn`, `fdPulse`, `fdSpin`, `fdBreathe`) that aren't part of the design-system package — they live only inside each `.dc.html`'s own `<helmet>`.
