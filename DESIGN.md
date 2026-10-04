# FanAtlas Design System

Version 1.2 - October 2026
Owner: Muhammad Fahad
Status: Implemented. `src/` is the build of this spec.
Changed in 1.1 (founder review, 30 September 2026): sport marks are in colour (5), and
`total_goals` becomes the goal-line ladder (7.7.1).
Changed in 1.2 (founder review, 4 October 2026): people carry an uploaded picture, and the
fallback is initials on an identity tint rather than a grey disc (5, 7.11). Five screens that
existing controls already pointed at are specified and built: Calls, Notifications, Preferences,
Splits, and the three sheets behind Profile and the match overflow (8).
Canvas: artboards for this spec live in `design/` and are published as a design canvas.

---

## 0. Why this document exists

The current build works, but it reads as generated. Not because it is ugly, because it uses
every 2023 "AI app" signal at once:

| Current pattern | Where | Why it hurts |
|---|---|---|
| Neon glow on every surface | `shadow-glow*`, `shadow-[0_0_20px...]` | Glow stops meaning "important" when it is everywhere |
| Blue to purple gradient on logo, avatar ring, CTA, text | `brand-gradient`, `brand-text-gradient` | Three-stop gradients are the single loudest generated-UI tell |
| Glassmorphism on nav, pills, panels | `.glass-panel`, `.glass-pill`, `.glass-nav` | Backdrop blur on a near-black background does nothing except cost GPU |
| Emoji as sport icons | Home and Games rails | Emoji render differently per OS and break the icon grid |
| `font-black` plus `tracking-wider` on labels, headers, scores, chips | throughout | Everything shouts, so nothing has hierarchy |
| Five brand colors (blue, purple, cyan, neon, pink) | `theme.colors.brand` | A five-color brand is no brand |
| `card-glow-border` masked gradient hairlines | `globals.css` | Expensive way to draw a 1px line |

**Purple stays.** It is the brand and it is not the problem. The problem is that purple is
currently one voice in a choir of five. This spec makes purple the only accent in the product
and takes everything else down to neutral, so purple actually lands.

---

## 1. Principles

1. **Data is the decoration.** Live minute, win probability, community split, streak. The sport
   data is inherently visual. Draw it well and the interface stops needing gradients.
2. **One accent.** Violet. Everything else is neutral, plus three semantic states (live, win, loss).
3. **Weight before color.** Hierarchy comes from size, weight and spacing first, color second,
   effects never.
4. **Flat and honest.** Real hairlines, real fills, one shadow. No blur, no glow, no faux glass.
5. **Broadcast, not casino.** The reference is a modern sports broadcast graphics package
   (tabular numerals, clean scoreboard blocks, restrained motion), not a betting app.
6. **Mobile native feel.** 430px design width, thumb-reachable primary actions, 44px minimum
   touch target.

---

## 2. Color

### 2.1 Atlas Violet (the brand ramp)

Anchored on the existing `#7928CA` so brand continuity holds. The ramp exists so purple can be
used as fill, text, tint and border without ever needing a gradient.

| Token | Hex | Use |
|---|---|---|
| `violet-50` | `#F4EDFF` | Text on solid violet fills |
| `violet-100` | `#E7DAFF` | Rarely, high-emphasis text on violet-800 |
| `violet-200` | `#CFB4FF` | Selected chip text |
| `violet-300` | `#B48CFB` | Accent text on dark (7.4:1) |
| `violet-400` | `#9C63F2` | Default accent text, active icons (5.0:1) |
| `violet-500` | `#8A3FE8` | Primary interactive fill, active states |
| `violet-600` | `#7928CA` | **Brand core.** CTA fill, logo, pressed state |
| `violet-700` | `#611FA3` | Pressed CTA, chart track |
| `violet-800` | `#47177A` | Chart fills, progress tracks |
| `violet-900` | `#2E1050` | Tinted surface behind violet content |
| `violet-950` | `#190A2E` | Deepest violet tint, section backgrounds |

**Rules**
- Violet as a fill takes `violet-50` or white text. White on `violet-600` is 7.1:1. Safe.
- Violet as text is `violet-400` minimum on `ink-0`/`ink-1`. Never `violet-600` as text.
- No violet gradients. If a surface needs depth, change the neutral step, not the hue.
- Exactly one violet element per screen region may be a solid fill. If two compete, one becomes
  a tinted `violet-950` surface with `violet-300` text.

### 2.2 Ink (neutrals)

Moved off the blue-black navy (`#07090E`) to a near-neutral with a whisper of violet in the
darks, so purple sits inside the palette instead of on top of it.

| Token | Hex | Use |
|---|---|---|
| `ink-0` | `#08070B` | App background |
| `ink-1` | `#0E0D13` | Card, sheet, input surface |
| `ink-2` | `#15141C` | Raised card, nested surface |
| `ink-3` | `#1D1B26` | Hover, pressed, inactive chip |
| `line` | `#262430` | Default 1px border |
| `line-strong` | `#35323F` | Divider under sticky header, focus ring base |
| `text-1` | `#F5F4F7` | Primary text |
| `text-2` | `#A7A3B3` | Secondary text, labels |
| `text-3` | `#6E6A7A` | Tertiary, timestamps, disabled |

### 2.3 Semantic

Three, and only three. Desaturated for dark surfaces.

| Token | Hex | Use |
|---|---|---|
| `live` | `#F2415A` | Live dot, live badge, red card |
| `win` | `#35C88F` | Correct prediction, positive delta, streak up |
| `warn` | `#F0B429` | Locked at kickoff, pending settlement, yellow card |

Sport identity colors are **removed** from the UI surface. Sports are distinguished by icon and
label, not by five competing hues. If a sport tint is ever needed (league page header), it is a
`ink-2` surface with a `line` border and the sport wordmark, no color fill.

### 2.4 Contrast floor

- Body text 4.5:1 minimum, micro labels (11px) 4.5:1, never rely on 3:1 for text.
- Non-text UI (borders on interactive controls, chart bars) 3:1 minimum.
- The live dot is never the only signal for "live". It always pairs with the word LIVE or the minute.

---

## 3. Typography

Two families. The pairing is the identity.

| Role | Family | Notes |
|---|---|---|
| UI and display | **Archivo** (fallback: Helvetica Neue, Arial) | Grotesque with broadcast character, real tabular figures, wide weight range |
| Numerals and data | **JetBrains Mono** (fallback: ui-monospace, SFMono) | Tabular by default, used for every score, clock, odd, percentage, points value |

The mono numeral rule is the single highest-leverage change in this document. Scores, minutes,
odds and percentages in a proportional bold sans is what makes the current build read as a
generic dashboard. In mono, columns line up and the app immediately reads as a scoreboard.

### 3.1 Scale

| Token | Size / Line | Weight | Tracking | Use |
|---|---|---|---|---|
| `display` | 40 / 44 | 600 | -0.03em | Big score readout, match detail |
| `h1` | 26 / 32 | 600 | -0.02em | Screen title |
| `h2` | 20 / 26 | 600 | -0.015em | Section header, card title on detail |
| `h3` | 16 / 22 | 600 | -0.01em | Card title |
| `body` | 15 / 22 | 400 | 0 | Commentary, descriptions |
| `body-sm` | 13 / 18 | 400 | 0 | Card supporting text |
| `label` | 12 / 16 | 500 | 0 | Buttons, chips, nav |
| `micro` | 11 / 14 | 600 | 0.08em, uppercase | Section eyebrows, badges only |
| `num-xl` | 28 / 30 | 500 mono | 0 | Profile stat value, big readout |
| `num-lg` | 20 / 24 | 500 mono | 0 | Match card score |
| `num-md` | 17 / 20 | 500 mono | 0 | Odds, percentage, points |
| `num-sm` | 12 / 14 | 500 mono | 0 | Clock, minute, timestamp |

### 3.2 Rules

- `font-black` (900) is not used anywhere. Maximum weight is 600. If something is not standing
  out at 600, the problem is size or spacing.
- Wide tracking is **only** on `micro` uppercase eyebrows. Nothing else gets letter-spacing above 0.
- Uppercase is only for `micro` and status badges. Never for card titles or team names.
- Team names are sentence case at their real length. Truncate with ellipsis, never uppercase to fit.
- Maximum two type sizes per card.

---

## 4. Space, shape, elevation

### 4.1 Spacing

4px base. Allowed steps: 4, 8, 12, 16, 20, 24, 32, 40, 56.

**Spacing is padding and gap. Never margin.** A margin is a property of a child that its parent
cannot see, so it has no equivalent in Figma auto-layout (or in most native layout systems), and
it silently breaks any export. Inset a group with padding on the container, separate siblings with
gap. Negative margins are banned outright.

| Context | Value |
|---|---|
| Screen gutter | 20 |
| Section vertical rhythm | 24 |
| Card padding | 16 |
| Card padding (compact list row) | 12 |
| Gap between cards in a list | 8 |
| Gap between chips | 8 |
| Space between label and its value | 4 |

### 4.2 Radius

| Token | Value | Use |
|---|---|---|
| `r-sm` | 8 | Badges, inline tags, sport icon tile |
| `r-md` | 12 | Buttons, inputs, list rows |
| `r-lg` | 16 | Cards, sheets |
| `r-xl` | 24 | Bottom sheet top corners, hero card |
| `r-full` | 999 | Chips, avatars, live dot |

Nested radius rule: inner radius equals outer radius minus padding. A 16px card with 16px padding
holds an 8px inner tile, not another 16.

### 4.3 Elevation

Two shadows. That is the whole list.

```css
--shadow-1: 0 1px 2px rgba(0, 0, 0, 0.45);            /* resting card */
--shadow-2: 0 12px 32px -16px rgba(0, 0, 0, 0.8);     /* sheet, popover, sticky nav */
```

- No glow shadows. `shadow-glow`, `shadow-glow-purple`, `shadow-glow-cyan`, `shadow-glow-green`,
  `shadow-glow-red` are all deleted.
- No `backdrop-filter`. The bottom nav is `ink-1` at full opacity with a `line-strong` top border.
- Depth comes from the neutral step (`ink-0` to `ink-1` to `ink-2`), not from blur.

### 4.4 Borders

1px `line`, solid, that is it. Gradient-masked borders (`card-glow-border`) are removed. A card
that needs emphasis gets a `violet-800` border at 1px, not a glow.

---

## 5. Iconography and imagery

- **One icon set: Lucide.** 1.75 stroke, 20px in nav and headers, 16px inline. No mixed weights.
- **No emoji.** Emoji render differently on every OS, sit off the icon grid, and cannot be
  recoloured. Sport marks are a custom set drawn on a 24px grid instead.
- **Sport marks are in full colour.** This is the single sanctioned exception to "one accent"
  (1.2), added in v1.1 after founder review: a monoline grey football reads as a settings glyph,
  and the sport rail is the first thing a fan looks at. A sport mark depicts a real object, so it
  carries that object's real colours and nothing else does.

| Sport | Mark | Colours |
|---|---|---|
| Football | Ball, filled | `#F2F0F4` panels, `#16151C` pentagons |
| Basketball | Ball with seams | `#E2762F` body, `#1A1015` seams |
| Cricket | Ball and bat | `#D6423F` ball, `#F2F0F4` seam, `#C08A4B` willow |
| F1 | Chequered flag | `#F2F0F4` / `#16151C` checks, `#6E6A7A` pole |
| Tennis | Ball | `#D4E14B` body, `#F2F0F4` seam |

  **Rules that keep colour from leaking.** The mark is the only coloured thing in its row. It never
  exceeds 20px, never fills a background, never tints its chip, its label, its border or its row,
  and never appears in the bottom nav (nav stays Lucide monoline, 7.9). An inactive chip renders
  its mark at 55 percent opacity rather than desaturating it to grey, so the sport stays
  recognisable at a glance while the active chip still reads as selected. Sport identity colours
  remain banned everywhere else (2.3) - this is a 20px illustration, not a theme.
- **No Sparkles icon for AI.** AI presence is indicated by a small mono `AI` tag or the waveform
  mark, never by a magic-wand or sparkle. Sparkles is the most recognisable generated-app icon
  in existence.
- Team crests sit on a `ink-2` circle at 28px in lists, 44px on detail. If a crest is missing,
  fall back to the 3-letter short name in mono on `ink-3`, never to a colored initial circle.
- Where a row shows both teams as crests, the two discs sit **side by side with a 4px gap**, never
  overlapped. Overlapping looks tidier with real crests but clips the 3-letter fallback, and the
  fallback is what ships until the crest licensing is settled.
- Avatars are plain circles. No gradient ring. Presence, if shown at all, is a 8px `win` dot with
  a 2px `ink-0` ring.
- **A person's avatar carries an identity tint.** This is the second sanctioned exception to "one
  accent" (1.2), added in v1.2 after founder review. A screen full of identical grey initial discs
  gives a fan nothing to find their own row by, and it is the one place in the product where
  colour is carrying information (who this is) rather than decorating. The tint is picked from the
  person's name by hash, so the same fan is the same colour on every screen and after every
  reload. Nine tints, all at one lightness, so a list still reads as one family. See 7.11.
- **The tint is for people only.** A team crest keeps the mono short-name fallback on `ink-3`,
  never a coloured initial circle, because a wrong-coloured club disc reads as a wrong club.

---

## 6. Signature elements

Every product needs two or three shapes that are only its own. These replace the gradient as the
thing people recognise.

### 6.1 The Split Bar

The core FanAtlas idea is community belief versus model probability. That comparison gets one
canonical graphic used everywhere it appears.

- A single 8px-tall track, `r-full`, on `ink-3`.
- Community share fills from the left in `violet-500`.
- The AI probability is a **2px vertical tick** in `text-1` sitting on top of the track at its
  own percentage.
- Numbers below, mono, left `violet-300`, right `text-2`.
- When community and AI disagree by more than 15 points, the gap between fill edge and tick is
  filled with 6px diagonal hatch at 20 percent `text-3`. That disagreement is the interesting
  moment in the product, so it gets the only decorative texture in the system.

Nothing else in the app uses hatching. It means one thing.

### 6.2 The Minute Rail

Commentary and match events run against a 1px vertical `line` rail on the left with the minute in
`num-sm` mono in the gutter. Goals get a `violet-500` filled 8px node, other events get a hollow
`line-strong` node. This gives the commentary feed a spine and removes the need for card chrome
per event.

### 6.3 The Waveform Mark

Audio commentary is represented by a 5-bar waveform at 2px bar width, `violet-400`, animating
only when actually playing. Static state is a flat set of 2px bars at 30 percent opacity. This is
the AI commentary product mark and it is the only ambient animation permitted.

---

## 7. Components

### 7.1 Buttons

| Variant | Fill | Text | Border | Height |
|---|---|---|---|---|
| Primary | `violet-600` | `#FFFFFF` | none | 48 |
| Primary pressed | `violet-700` | `#FFFFFF` | none | 48 |
| Secondary | `ink-2` | `text-1` | 1px `line` | 48 |
| Ghost | transparent | `violet-300` | none | 40 |
| Destructive | transparent | `live` | 1px `live` at 40% | 44 |

Radius `r-md`. Label `label` (12/500). Full width in sheets, intrinsic width inline. Disabled is
`ink-2` fill with `text-3` label, never reduced opacity on the whole button.

### 7.2 Chips (sport rail, filters)

- Height 36, `r-full`, padding 12 horizontal, gap 8.
- Inactive: `ink-2` fill, `line` border, `text-2` label, icon `text-2`.
- Active: `violet-600` fill, no border, white label.
- The sport rail is a horizontal scroll with no scrollbar and a 20px lead-in gutter, and the
  active chip is **not** enlarged. Size change on selection causes layout shift.

The current 76x70 vertical tiles with emoji become 36px horizontal chips with a monoline icon.
This alone removes most of the generated look from Home.

### 7.3 Match card (list)

Two-row structure, mono numerals, no glow.

```
+--------------------------------------------------+
|  [crest] Liverpool                          2     |   <- h3 name, num-lg score
|  [crest] Arsenal                            1     |
|  ------------------------------------------------ |   <- 1px line, 12 above/below
|  ● LIVE  78'          Premier League       [wave] |   <- micro + num-sm + label
+--------------------------------------------------+
```

- Surface `ink-1`, border 1px `line`, radius `r-lg`, padding 16.
- Team rows are 28px crest, name at `body-sm`, score right-aligned in `num-lg` mono. Leading team
  score is `text-1`, trailing is `text-2`. This is the only scoreboard emphasis needed.
- Status strip: live dot `live` with a 2s opacity pulse (dot only, not the card), the word LIVE in
  `micro`, the minute in `num-sm`, league name in `label` `text-2`, waveform if audio exists.
- Upcoming matches drop the score column and show kickoff time in `num-md` `text-2` instead.
- **No card hover glow, no gradient border, no scale transform.** Pressed state is `ink-2`.

### 7.4 Prediction card

Four stacked parts, always in this order.

1. **Match line.** Overlapping 24px crests, name at `h3`, league in `micro`, and on the right
   either the kickoff time in `num-sm` or, inside 30 minutes, the lock countdown in `num-sm`
   `warn`.
2. **Market rail.** The four markets as 28px chips (7.7).
3. **Market body.** Whatever the selected market calls for (7.7). For `match_result` that is the
   Split Bar plus three outcome buttons, each `ink-2` with `line`, multiplier in `num-md` and
   label in `label`, selected becoming `violet-600` fill.
4. **Lock state.** Once kickoff passes the whole card collapses to a single row: greyed match
   line, a `micro` count of calls locked, and a `warn` outline badge reading LOCKED. The roadmap
   requires that a submitted prediction cannot change after kickoff, so the UI states the lock
   rather than silently disabling controls.

### 7.5 Commentary feed

- Uses the Minute Rail (6.2).
- Commentary text at `body` 15/22 in `text-1`, speaker attribution in `micro` `text-3`.
- The language and voice control sits in the section header as a single pill showing the current
  pair, `English &middot; Terrace`, with a 12px chevron. Tapping it opens the Commentary sheet
  (7.6). It is never a 2-segment EN/ES toggle: there are four languages and several voices per
  language, so a toggle cannot represent the state. The pill is visible at all times because
  language is a first-class product feature, not a setting buried in Profile.
- Latency matters more than decoration here. No entry animation beyond a 120ms fade, so a line
  appearing 2 seconds after the event still feels immediate.

### 7.6 Commentary sheet (language and voice)

A bottom sheet, `r-xl` top corners, `ink-1`, `shadow-2`, 36x4 grabber. Two lists.

**Languages.** Four, in shipping order. Each row is 52px: name at `body`, voice count in `micro`
`text-3`, selection as a 20px `violet-600` disc with a white check. Languages not yet shipped
carry a `warn` outline badge reading SOON and their label drops to `text-3`. They stay listed
rather than hidden, because the roadmap sequences Portuguese and French behind commentary
shipping and expansion markets are gated on them, so users in those markets should see the
language exists.

| Language | State |
|---|---|
| English | Shipped, 4 voices |
| Espanol | Shipped, 3 voices |
| Portugues | Gated, badge SOON |
| Francais | Gated, badge SOON |

**Voices.** A 2-column grid of 68px `r-md` tiles under the heading `<language> voice`. Each tile
carries the persona name at `body-sm` 500 and a `micro` descriptor. The selected tile is
`violet-900` with a `violet-700` border and a static 4-bar waveform in `violet-300`. Tapping a
tile previews the voice, it does not close the sheet. Personas are named for their register, not
for a country flag or an accent label: Terrace (UK matchday), Broadcast (US network), Lagos
(West African English), Analyst (measured, tactical).

Confirm button states the pair explicitly, `Use English, Terrace`, so nobody leaves the sheet
unsure what they picked.

### 7.7 Prediction markets

Every match carries four markets. They share one card and one market rail, so the Predict list
stays one card per match rather than four.

| Market | Body | Notes |
|---|---|---|
| `match_result` | Split Bar plus three outcome buttons, home / draw / away | The default market. Shown first, always. |
| `correct_score` | 4-column grid of 52px scoreline tiles, mono score at 15px over multiplier at 11px `text-3`, eighth tile is `Other` opening the full list | Caption names the crowd's favourite score and the model's, side by side |
| `first_scorer` | 60px player rows: 32px initials disc, name at `body-sm`, `micro` line carrying club and the share of fans on that player, multiplier in a 32px `r-sm` pill on the right | A final row offers `No scorer (0-0)`. The user's own pick gets a `violet-900` disc and a `violet-300` micro line |
| `total_goals` | The **goal-line ladder** (7.7.1): one row per line from 0.5 to 4.5, each with its own Under and Over call | A single 2.5 line hides the shape of the match. The ladder is where a fan reads it |

**Market rail.** 28px `r-full` chips inside the card, horizontally scrollable and clipped at the
card's content edge so the fourth chip peeks. Active chip is
`violet-900` fill with a `violet-700` border and `violet-200` text, not a solid `violet-600`
fill. The solid fill is reserved for the outcome the user has actually selected, so selection
never competes with navigation inside one card.

#### 7.7.1 The goal-line ladder (`total_goals`)

Added in v1.1 after founder review. One line at 2.5 forces a binary on a market that is really a
curve, so `total_goals` renders the whole range and lets the fan pick where on it they want to be.

**Card header.** `micro` eyebrow `TOTAL GOALS`, then the crowd line at `body-sm` in `violet-300`
(`82% of fans say over`) with `Model 82%` in `label` `text-2` right-aligned, then the full-width
Split Bar (6.1). Both numbers read off the **anchor line**, which is the line closest to the
model's expected goals, marked in the ladder and named in the header's `aria-label`. The header
never shows a number that belongs to a line the fan cannot see.

**Ladder rows.** Five rows, 0.5 through 4.5, gap 8, each `ink-2` on a 1px `line` border at `r-md`
with 12px padding, a 10px column gap and a 64px minimum height. At the 430px design width that
leaves the crowd track roughly 104px, which is enough for a knob and a tick to be separable.

```
+------------------------------------------------------------------+
| 0.5    UNDER       |----------O----------|        OVER            |
| GOALS  7.00x       |    crowd on over    |       1.08x            |
+------------------------------------------------------------------+
```

The call buttons carry `Under` and `Over` alone. The line number is already in
its own column at `num-lg`, and repeating it inside a 76px button wraps to two
lines as soon as a sport runs three-digit totals (`UNDER 220.5` points,
`UNDER 300.5` runs). One number, one place.

| Column | Width | Contents |
|---|---|---|
| Line | 48 fixed | The number in `num-lg` `text-1`, `GOALS` in `micro` `text-3` beneath |
| Under call | 76 fixed | `UNDER` in `micro` `text-2`, multiplier in `num-md` `text-1` |
| Crowd track | fills | A 4px `ink-3` track, `violet-500` fill to the crowd's over-share, a 16px `violet-500` knob with a 2px `ink-1` ring at that point, and the model's own share as a 2px `text-1` tick |
| Over call | 76 fixed | `OVER` in `micro` `text-2`, multiplier in `num-md` `text-1`, right-aligned |

- The knob is an **indicator, not a control.** It is `aria-hidden`, has no drag affordance and no
  pointer cursor. The tappable things in the row are the two call columns, each a 44px-minimum
  target. A knob that looks draggable and is not is the worst outcome here, so it never carries a
  shadow, a grabber texture or a hover state.
- Selecting a call fills that column `violet-600` with white text. **One call per match on this
  market**: selecting a side on another line moves the selection, it does not add a second. The
  ladder shows five lines so the fan can choose one, not so they can take five.
- The anchor row carries a 2px `violet-500` left marker and its line number renders `violet-300`.
  Nothing else distinguishes it.
- Rows past the anchor in either direction do not dim. A 0.08 probability is still a real call and
  greying it out reads as disabled.
- The ladder scrolls with the card. It is never its own scroll container: a nested scroll region
  inside a card in a scrolling list is unusable on a phone.
- Lines are sport-specific and come from the data layer, never hardcoded: football runs 0.5 to
  4.5, basketball runs a points ladder, cricket runs runs. The component takes a list of lines and
  renders what it is given.
- **Compact ladder.** In a Predict list card, where the ladder competes with three other markets
  and a match line, it renders three rows centred on the anchor with a `Show all 5 lines` ghost
  row beneath. The full ladder is always shown on the match markets screen.

**Rules.**
- One Split Bar per market. `correct_score` and `first_scorer` are many-outcome markets, so they
  carry a caption comparing crowd and model instead of a bar. `total_goals` carries exactly one
  bar in the card header, never one per ladder row: five split bars in a card is noise, and the
  per-row crowd track already carries that information at row scale.
- Every market locks at kickoff independently but the lock badge is per match, not per market.
  Copy reads `3 calls locked at kickoff`.
- The submit button counts calls, not matches: `Submit 2 calls`.
- Market names are sentence case in the UI (`Correct score`), snake_case only in the data layer.

### 7.8 Leaderboard row

- Height 60, `ink-1`, divided by 1px `line`, no card per row.
- Rank in `num-md` mono `text-2`, 32px fixed column, right-aligned. Top 3 rank numbers are
  `violet-300`, no medals, no trophy emoji.
- Avatar 32, name `body-sm` `text-1`, country in `micro` `text-3`.
- Points right-aligned in `num-md` `text-1`, win rate below in `num-sm` `text-2`.
- The current user's row gets a `violet-950` fill and a 2px left `violet-500` marker. It does not
  get a glow or a gradient.

### 7.9 Bottom navigation

- Height 56 plus safe area, `ink-1`, 1px `line-strong` top border, **no blur, no transparency**.
- 5 items, Lucide 20px icons, `label` at 11px underneath.
- Active is `violet-400` icon and label. Inactive is `text-3`.
- No pill background behind the active item, no floating rounded bar, no center FAB. Those three
  are the current default for generated mobile apps.

### 7.10 Header

- 56 tall, `ink-0`, no border until scrolled, then 1px `line`.
- Wordmark FANATLAS in `micro` scale but at 15px, weight 600, tracking 0.14em, `text-1`. The mark
  sits next to a solid `violet-600` rounded square holding a white monoline F. Solid fill, one
  color, no gradient, no glow.
- Right side: notification bell 20px `text-2` with a 6px `violet-500` unread dot, avatar 32px (7.11).

### 7.11 Avatar

One component for every person in the product: the fan, a leaderboard rival, a first-scorer
player. `src/components/ui/avatar.tsx`.

- **Picture first.** If the person has an uploaded or feed-supplied image it fills the circle,
  `object-fit: cover`, no ring, no border. A failed load silently falls back rather than leaving
  a hole.
- **Fallback is initials on an identity tint.** Up to two letters in mono at 34 percent of the
  disc size, on a flat `id-*` fill. One flat fill, never a gradient.
- Sizes in use: 22 (favourite chip), 32 (header, list row, scorer row), 56 (profile identity).
- Tones: `identity` (default, hashed from the name), `neutral` for a non-person slot such as the
  `0-0` no-scorer outcome, and `violet` for the fan's own selected pick, where the disc is already
  carrying selection state (7.7).

| Tint | Fill | Initials |
|---|---|---|
| `id-violet` | `#3B1E6E` | `#CFB4FF` |
| `id-indigo` | `#22265F` | `#B3BEFF` |
| `id-azure` | `#10324F` | `#8FCBF2` |
| `id-teal` | `#0C3A38` | `#79DCCE` |
| `id-green` | `#16391F` | `#8EDCA2` |
| `id-amber` | `#3C2A0C` | `#F2C978` |
| `id-rust` | `#3F2113` | `#F3A985` |
| `id-rose` | `#41162A` | `#F4A2BA` |
| `id-plum` | `#371540` | `#E3A6F1` |

Every pair clears 4.5:1. The fills sit between `ink-2` and `ink-3` in lightness, so an avatar
never becomes the brightest thing in a row, and the violet CTA on the same screen still wins.

**Upload.** Profile is the only place a picture is set. The 56px disc is the control, with a 20px
`violet-600` camera badge on a 2px `ink-0` ring, and a `Remove` text button that appears only once
a picture exists. A picked file is validated (PNG, JPEG, WebP, under 10MB), centre-cropped square
and re-encoded at 256px before it is stored, because there is no backend in this build and a raw
phone photo does not fit in localStorage. A rejected file states why in `live`, inline, never as
an alert.

---

## 8. Screen notes

### Home
Search, sport chip rail, LIVE NOW rail, Continue Listening, Upcoming, Predict promo.
- The promo card at the bottom becomes a single `violet-950` surface with a `violet-800` border,
  `violet-100` heading and one ghost button. Not a gradient panel.
- LIVE NOW is a horizontal scroll of 3 cards at 264px wide, peeking the fourth. Peeking is what
  tells a user to scroll, an arrow indicator is not needed.

### Games
The full fixture browser: title with the date, search icon, sport chip rail, then groups.
- Groups are LIVE, LATER TODAY, then one per day. The group header is a `micro` eyebrow on
  `ink-0` with the count in `num-sm` on the right, and it sticks to the top of its group while
  scrolling. The LIVE header carries the live dot.
- Live rows are two-line scoreboards (both teams, both scores, a 1px vertical `line` divider,
  then a 62px right column holding the minute in `live` and the waveform if audio is running).
- Non-live rows are single-line: kickoff in `num-sm` in a fixed 44px column, a vertical divider,
  match name at `body-sm`, league plus market count in `micro`, chevron.
- Groups sit on `ink-1` with a `line` top and bottom border and no per-row card, so a long
  fixture list reads as a table rather than a stack of boxes.

### Predict
- Ordered by kickoff proximity, nearest first, with the lock countdown in `num-sm` `warn` when
  under 30 minutes.
- The subtitle counts both dimensions, `6 matches, 24 markets open`, because markets are the real
  unit of the screen.
- Day filters plus a `My calls` chip. Locked matches sink to the bottom of the list.
- Tapping the match line opens the full four-market screen. The card itself only ever shows one
  market at a time, so the list stays scannable.

### Leaderboard
- Segmented control for Global / Friends / Weekly at the top, same 2-segment control style as the
  language toggle, extended to 3.
- The current user's rank pins to the bottom of the viewport as a single row with `shadow-2` when
  their row is scrolled out of view.

### Calls
Where a submitted call goes. Reached from the two call tiles on Profile, never from the tab bar,
because it is a detail screen and the product already ships five tabs.
- Segmented Open / Settled with the count in `num-sm` inside each segment.
- One summary line per scope: points committed and waiting, or landed count plus points returned.
- A row is the call label at `body-sm`, match and timestamp in `micro`, then a status badge
  (`Open`, `Locked`, `Landed`, `Missed`) over the points.
- An open row shows `committed → at stake`. A settled row shows what actually came back:
  `+value` in `win`, or `0 of committed` in `text-3`. Never a reach number on a miss, which reads
  as a payout the fan did not get.

### Notifications
Behind the header bell, which carries the real unread count rather than a prop.
- Rows are a 32px `ink-2` glyph disc, title at `body-sm`, body at `body-sm` `text-2`, time in
  `micro`. An unread row sits on `violet-950` with a 6px `violet-500` dot.
- Leaving the screen is the read receipt, not opening it. Clearing the tint while the fan is
  still reading takes away the only thing marking what is new.
- Content is calls settling, locks approaching, rank moves, streaks and commentary going live.
  No marketing, no return nags, nothing promising money (10).

### Preferences
Behind the Profile gear. Commentary row (opens the sheet, 7.6), then device toggles for match
sound and notifications, then the account block. The toggle is a 40x24 `r-full` track, `violet-600`
when on, `ink-3` when off, with a 20px `text-1` knob. Row hints are `body-sm`, never `micro`,
because `micro` is uppercase and a sentence in uppercase is not a hint.

### Splits
What the home promo points at. One card per match where the crowd and the model disagree by more
than the threshold, widest gap first, each carrying the Split Bar (6.1) and a `warn` gap badge.

### Profile
Identity, stats, favourites, highlights. In that order, and nothing else on the screen.

- **Stats** are a 2x2 grid of `ink-1` tiles, each `micro` label over a `num-lg` value: fan
  points, calls correct, current streak, matches followed. Mono numerals make this grid the
  strongest thing on the screen without any color. Streak uses `win` when it is running.
- **Favourites** is one card with two rows, Teams and Players, each a horizontal chip scroll with
  a fixed 46px `micro` row label on the left. Chips are 32px `r-full`, crest or initials disc at
  22px plus the name. The last chip in each row is a 32px circular `+` in `line`, which is the
  only add affordance needed.
- **Highlights** are saved commentary moments, capped per fan. The section header carries the
  quota as `12 / 20 saved` in `num-sm`, with a 2px `violet-500` meter directly beneath it.
  Moments are 40px `violet-950` waveform tiles, title at `body-sm`, a `micro` line carrying match
  plus language and voice, duration in `num-sm`, and a play glyph. The card's last row states the
  eviction rule in plain words (`Oldest saves clear first once you hit 20.`) with a `Manage` link.
  Never surface the cap as an error after the fact. The meter is visible before the fan hits it.
- The two call tiles link to Calls. A count is only worth tapping when there is a list behind it.
- The `+` on each favourites row opens a picker sheet: search field, then rows of catalogue
  entries with a check disc. The catalogue is derived from the loaded fixtures, so a team can
  never be followed that the app cannot then show a match for. Players get an identity disc,
  teams keep the neutral crest slot (5).
- `Manage` opens the saved-moments sheet. Removing a save is the only action there; reordering
  saved moments is a feature nobody asked for.
- Preferences, including commentary language, live behind the header gear, not inline on this
  screen. The Commentary sheet (7.6) is the single place language and voice are chosen, reachable
  from both here and the match screen.

---

### Match overflow
Three actions, each of which works on the device: save this moment (writes to the fan's own
store and states the cap position), commentary (hands to 7.6), share (platform share sheet, with
a copied-link fallback). A dismissed share sheet is not an error worth reporting.

---

## 9. Motion

Restraint is the point. Four animations exist in the entire product.

| What | Duration | Easing |
|---|---|---|
| Live dot pulse | 2000ms loop, opacity 1 to 0.4 | ease-in-out |
| Waveform bars, while playing only | 1200ms loop | ease-in-out |
| Score change, digit slides up and fades in | 220ms | cubic-bezier(0.2, 0, 0, 1) |
| Screen and sheet transitions | 240ms | cubic-bezier(0.2, 0, 0, 1) |

Everything else is instant or a 120ms opacity fade. No scale-on-press above 0.98. No spring
bounce. No shimmer skeletons, use a flat `ink-2` block that does not animate.

`prefers-reduced-motion: reduce` disables the pulse, the waveform loop and the digit slide.

---

## 10. Content and tone

Copy is part of the design and it carries real risk here.

- **Framing rule (from the 90-day roadmap risk register):** the Predict feature is framed as
  understanding the game, never as beating the line. App Store and Play Store review classify
  gambling-adjacent language aggressively, and the roadmap lists store misclassification as a
  Phase 3 to 4 risk. So: "Fan Points", "prediction", "community call", "confidence". Never:
  "bet", "stake", "wager", "odds boost", "payout", "cash out".
  Note that `Prediction.amountWagered` and `potentialPayout` in `src/types/index.ts` violate this
  in the type layer. Rename to `pointsCommitted` and `pointsAtStake` before the store submission
  milestone in Week 12.
- **The data model is one market behind the design.** `Prediction.predictionChoice` in
  `src/types/index.ts` is typed `'home' | 'draw' | 'away'`, which only expresses `match_result`.
  Four markets need a `market` discriminant and a per-market outcome shape (a scoreline, a player
  id, an over/under side). `UserProfile.commentaryLanguage` is typed `'en' | 'es'` and needs to
  carry four languages plus the selected voice. `favoriteTeams` exists, `favoritePlayers` and
  saved highlights (with the per-fan cap) do not.
- Saved commentary is called a **highlight**, the act is **save**, and the limit is stated as a
  count, `12 / 20 saved`. Never "storage", never "cache", never a percentage.
- Sentence case for everything except `micro` eyebrows and status badges.
- **Language names render in their own language, with correct diacritics**: English, Español,
  Português, Français. Never country flags (a language is not a country, and Spanish and
  Portuguese each span several launch markets), never two-letter codes as the primary label. `EN`
  and `ES` are acceptable only as a 2-character badge in a dense row, never as the picker itself.
- **Voice personas are named for register, not for accent or nationality**: Terrace, Broadcast,
  Lagos, Analyst. A persona label never reads as a stereotype of the speaker.
- A gated language keeps its real name plus a `warn` SOON badge. Never `Coming soon!`, never
  hidden entirely, because expansion markets are gated on exactly these languages shipping.
- Numbers always carry a unit or a label. `78'` not `78`. `2.40x` not `2.40`.
- Empty states are one line of `body-sm` `text-2` plus one ghost button. No illustration, no
  "Oops!", no exclamation marks.
- Error states name what failed and what happens next. "Live data reconnecting. Scores may lag
  by a few seconds." Not "Something went wrong."

---

## 11. Implementation notes

### 11.1 Tokens as CSS variables

```css
:root {
  /* violet */
  --violet-50: #F4EDFF;  --violet-100: #E7DAFF; --violet-200: #CFB4FF;
  --violet-300: #B48CFB; --violet-400: #9C63F2; --violet-500: #8A3FE8;
  --violet-600: #7928CA; --violet-700: #611FA3; --violet-800: #47177A;
  --violet-900: #2E1050; --violet-950: #190A2E;

  /* ink */
  --ink-0: #08070B; --ink-1: #0E0D13; --ink-2: #15141C; --ink-3: #1D1B26;
  --line: #262430; --line-strong: #35323F;
  --text-1: #F5F4F7; --text-2: #A7A3B3; --text-3: #6E6A7A;

  /* semantic */
  --live: #F2415A; --win: #35C88F; --warn: #F0B429;

  /* shape */
  --r-sm: 8px; --r-md: 12px; --r-lg: 16px; --r-xl: 24px;
  --shadow-1: 0 1px 2px rgba(0,0,0,0.45);
  --shadow-2: 0 12px 32px -16px rgba(0,0,0,0.8);
}
```

### 11.2 Deletions from the current codebase

When this spec is implemented, these are removed rather than adjusted:

- `theme.colors.brand.{blue,cyan,neon,pink}` and all of `theme.colors.sports`
- every `boxShadow.glow*` entry
- `.glass-panel`, `.glass-pill`, `.glass-nav`
- `.brand-gradient`, `.brand-text-gradient`
- `.card-glow-border` and its `::after` mask
- `animation.pulse-slow` and `badge-pulse` (replaced by the single live-dot pulse)
- every emoji used as an icon
- every `font-black` and every `tracking-wider` outside `micro`

### 11.3 Font loading

Archivo and JetBrains Mono via `next/font/google`, subset latin, `display: swap`, exposed as
`--font-sans` and `--font-mono`. Both are on Google Fonts, so no self-hosting is needed for the
prototype.

### 11.4 Figma

The design lives in this repo as the source of truth and is pushed into Figma, not the other way
round. `figma/` holds the pipeline:

| Step | Command | What it does |
|---|---|---|
| Measure | `node figma/measure.mjs` | Renders each artboard in headless Chromium and records the resolved geometry, type and color of every element into `scene.json` |
| Bundle | `node figma/build-plugin.mjs` | Inlines `scene.json` and the color tokens into `figma/plugin/code.js` |
| Verify | `node figma/verify-layout.mjs` | Simulates Figma auto-layout over `scene.json` and fails where it would not reproduce the rendered position |
| Check | `node figma/smoke-test.mjs` | Runs the plugin against a stubbed Figma API and fails on bad geometry |
| Reference | `node figma/capture.mjs` | Writes 2x PNGs of every artboard to `figma/reference/` |

In Figma: **Plugins, Development, Import plugin from manifest**, pick `figma/plugin/manifest.json`,
then run it on an empty file. It builds the artboards as auto-layout frames, creates the `FanAtlas`
variable collection from the palette, and creates the text styles from the type scale.

Because the layout is measured rather than translated, Figma and the browser agree. Anything that
changes in `design/*.dc.html` needs measure, verify, bundle and reference re-run before the plugin
is re-imported.

Two rules exist purely to keep that parity, and both are good practice anyway: **no margins**
(4.1), and **no CSS a frame cannot express** (no negative offsets, no overlap tricks). Everything
else, including baseline alignment, maps cleanly.

### 11.5 Sequencing against the roadmap

This is a design spec, not a build ticket. It lands cleanly at two points in the 90-day plan:
Phase 2 Week 7 (frontend integration for the Community Prediction Layer, where the Split Bar is
the actual deliverable) and Phase 4 Week 12 (store listing screenshots, which is when the
gambling-adjacent copy rules stop being advisory).

---

## 12. Checklist

Before any screen ships, all of these must be true.

- [ ] Zero color gradients (the split-bar hatch is the one permitted pattern fill)
- [ ] Zero glow shadows
- [ ] Zero `backdrop-filter`
- [ ] Zero emoji (a coloured sport mark is an SVG on the 24px grid, not an emoji)
- [ ] No font weight above 600
- [ ] Letter-spacing above 0 only on uppercase 11px eyebrows
- [ ] Every score, minute, percentage, odd and points value in mono, tabular
- [ ] Exactly one solid violet element per screen region
- [ ] Colour outside violet, neutral and the three semantic tokens appears only inside a sport mark
- [ ] Every border is 1px solid `line` or `violet-800`
- [ ] Body text passes 4.5:1
- [ ] No word from the banned betting-vocabulary list
- [ ] Reduced-motion honoured
