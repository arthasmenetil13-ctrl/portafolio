---
name: Carlos Llanos · Portafolio
description: A hand-painted Costa signboard on yellow enamel, hung with tin plaques that show a running product at work.
colors:
  lamina: "#f6c419"
  lamina-deep: "#e9b10c"
  rojo: "#d7261e"
  rojo-deep: "#a8170f"
  rojo-placa: "#b61c15"
  cobalto: "#1d3f9a"
  cobalto-deep: "#132b6e"
  crema: "#f4ecd8"
  crema-deep: "#e6dbc0"
  tinta: "#14110f"
  tinta-soft: "#3a3128"
typography:
  display:
    fontFamily: "Bungee, sans-serif"
    fontSize: "clamp(2.9rem, 8.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Bungee, sans-serif"
    fontSize: "clamp(2.2rem, 5.6vw, 4rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.01em"
  title:
    fontFamily: "Bungee, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  data:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "tnum"
    fontVariation: "\"wdth\" 82"
  label:
    fontFamily: "Bungee, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.04em"
rounded:
  badge: "3px"
  tag: "4px"
  control: "6px"
  card: "8px"
  plaque: "10px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "40px"
  section: "64px"
  section-lg: "96px"
  container: "1240px"
components:
  plaque:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.plaque}"
    padding: "28px 32px 24px"
  plaque-cobalto:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.crema}"
    rounded: "{rounded.plaque}"
    padding: "28px 28px 24px"
  plaque-rojo:
    backgroundColor: "{colors.rojo-placa}"
    textColor: "{colors.crema}"
    rounded: "{rounded.plaque}"
    padding: "56px 48px 48px"
  button-plaque-primary:
    backgroundColor: "{colors.rojo-placa}"
    textColor: "{colors.crema}"
    typography: "{typography.title}"
    rounded: "{rounded.plaque}"
    padding: "12px 20px"
    height: "52px"
  button-plaque:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    typography: "{typography.title}"
    rounded: "{rounded.plaque}"
    padding: "12px 20px"
    height: "52px"
  button-plaque-cobalto:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.crema}"
    typography: "{typography.title}"
    rounded: "{rounded.plaque}"
    padding: "12px 20px"
    height: "52px"
  chip-swatch:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
  chip-swatch-hover:
    backgroundColor: "{colors.crema-deep}"
  chip-swatch-selected:
    backgroundColor: "{colors.lamina}"
    textColor: "{colors.tinta}"
  lang-switch:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.crema}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "44px"
  lang-switch-hover:
    backgroundColor: "{colors.cobalto-deep}"
  tag-watching:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
  tag-new:
    backgroundColor: "{colors.rojo-deep}"
    textColor: "{colors.crema}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
  tag-due:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.crema}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
  sample-badge:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.crema}"
    rounded: "{rounded.badge}"
    padding: "4px 6px"
  message-card:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.card}"
    padding: "16px"
---

# Design System: Carlos Llanos · Portafolio

## Overview

**Creative North Star: "El Rótulo Pintado"**

The site is the hand-painted signboard of a Costa business that opens every day. Sign-yellow enamel owns the ground; everything that carries information is a tin plaque screwed or hung onto it: cream boards, cobalt boards, one red board for the answer. Lettering is painted block caps with the painter's red drop and a thin ink keyline. The world is loud in colour and flat in material: enamel, paint and tin, no glass, no blur, no blended gradients.

Density is that of a working sign, not a brochure: large painted headings, short readable paragraphs in a sturdy grotesque, and data (radicados, dates, durations) set in condensed tabular figures and right-aligned like measures. Structure comes from painted rules: 3px ink borders, dashed dividers, filete stripes. Motion belongs to the material: placards drop onto their hook and settle, an alert is re-lettered left to right like a brush pass; nothing floats or fades in on scroll, and all motion collapses under reduced-motion.

Confirmed rejections, from the direction contract: the dark developer-portfolio hero (name, tagline, gradient, card row), the white résumé grid, glass, smooth gradients and neon.

**Key Characteristics:**
- Committed colour: yellow enamel ground with red, cobalt and cream as the painter's other cans.
- Tin plaques as the only container: thick ink edge, painted inner double border, corner screws, a hung-sheet drop shadow.
- Painted block-cap lettering (Bungee) with a hard red-then-ink offset shadow.
- Archivo for reading, its width axis condensed for tabular data.
- State is named and patterned (plain, dotted, hatched), never colour alone.
- Hard-stop painted patterns (stripes, hatching, dots) are allowed; blended gradients are not.

## Colors

A committed sign-painter's palette: one yellow ground, two strong inks for boards and lettering, cream for reading surfaces, and a warm near-black for every edge and letter.

### Primary
- **Sign Enamel Yellow** (lamina): the page ground, the html/body background, the gap stripe inside the filete, selected chips and lit architecture nodes, and lettering on cobalt (5.75:1 against cobalt). It is the field everything hangs on; it covers most of every screen.
- **Worn Enamel Yellow** (lamina-deep): scrollbar track only; the shadowed edge of the yellow sheet.

### Secondary
- **Filete Red** (rojo): the painted drop under block caps, the outer filete stripe, flourish strokes, the alternating red band on the project board, bullet dots. Decoration and lettering shadow only; cream text on it fails (4.26:1).
- **Plaque Red** (rojo-placa): the fill of the red plaques (primary "Escríbeme" action and the closing board). One step deeper than filete red so cream text clears 4.5:1 (5.63:1).
- **Deep Oxide Red** (rojo-deep): the "actuación nueva" state tag fill and small red headings on cream (6.38:1).

### Tertiary
- **Cobalt Board** (cobalto): secondary boards (alert plaque, project section band, cobalt action plaque, lang switch), sign-caps role line and ledger headings on yellow or cream, focus outline, text selection, the hairline inside the filete, the "por vencer" hatch.
- **Night Cobalt** (cobalto-deep): hover on cobalt controls, the second stripe of the "por vencer" hatch, and quieted architecture nodes.

### Neutral
- **Plaque Cream** (crema): the default plaque and message card surface, text on cobalt and red boards.
- **Aged Cream** (crema-deep): hover fill for cream chips; screw dots on cobalt plaques.
- **Sign Ink** (tinta): every letter on yellow and cream, every border (3px plaques, 2px tags), the 6px rules around the project band, sample badges.
- **Faded Ink** (tinta-soft): secondary text (court names, places, captions, dates' sub-lines) and screw dots on cream plaques. 7.78:1 on yellow, 10.81:1 on cream.

### Named Rules
**The Enamel Ground Rule.** Yellow is the page, not an accent. New surfaces hang plaques on lamina; they never introduce a white or dark page ground.

**The Plaque Red Rule.** Cream text sits on rojo-placa or rojo-deep, never on rojo. Rojo is paint for shadows, stripes and flourishes.

**The Named State Rule.** A state is told apart by its label and its pattern (plain cream, dotted oxide red, cobalt hatch), never by colour alone.

## Typography

**Display Font:** Bungee (with sans-serif), loaded via next/font as `--font-bungee`, single weight 400.
**Body Font:** Archivo (with sans-serif), variable with the `wdth` axis, loaded as `--font-archivo`.

**Character:** Bungee was drawn for street signage and carries every painted word: names, section boards, tags, buttons. Archivo is a sturdy Buenos Aires grotesque that reads plainly underneath and condenses to 82% width for tabular data columns.

### Hierarchy
- **Display** (Bungee 400, clamp(2.9rem, 8.6vw, 6rem), 0.92): the name on the sign strip; painted lettering with red and ink offset shadow. The closing board's heading reaches the same 6rem ceiling.
- **Headline** (Bungee 400, clamp(2.2rem, 5.6vw, 4rem), 0.92): section boards (project, workshop, history). Board titles inside plaques step down to clamp(1.9rem, 4.6vw, 3.1rem) and clamp(1.35rem, 2.6vw, 1.8rem).
- **Title** (Bungee 400, 0.78 to 1.15rem, 1, 0.02em): sign-caps without shadow; ledger headings over a 3px ink rule, plaque button labels, channel lines in message cards, the role line under the name (up to 1.45rem, cobalt).
- **Body** (Archivo 400, 1.0625rem, 1.6): reading text; leads at 1.1 to 1.15rem, relaxed leading, capped at 56 to 60ch. Entry titles in Archivo 700 to 800 at about 1.1 to 1.2rem.
- **Data** (Archivo 600, 0.93 to 1.02rem, tabular figures, wdth 82%): radicados, dates, durations, the live Bogotá clock; right-aligned in ledgers.
- **Label** (Bungee 400, 0.6 to 0.72rem, 0.04em): state tags and the "Datos de ejemplo" / "en construcción" badges.

### Named Rules
**The Painted Caps Rule.** Bungee is lettering, so it appears only in short runs: names, headings, labels, buttons. Sentences are always Archivo.

**The Measure Rule.** Every real date, duration and identifier is set tabular and condensed, and right-aligned when it sits in a list.

## Layout

A single column of hung boards inside a framed sign. The whole page sits inside the filete frame (8px margin on phones, 12px from 640px), with a painted flourish in each corner. Content is centred in a 1240px container with 16px / 32px / 40px gutters (phone / 640px / 1024px).

The first viewport is a sign strip (name left, language plaque right, role and place beneath), then the board grid: at 1024px and up a 1.55fr / 1fr split with the cream "HOY SE VIGILA" board left and the cobalt alert plaque right, action plaques spanning beneath. Below 1024px the order changes so the action plaques hang between the board and the alert and stay inside the first screen on a phone; the board shows three rows on phones, four from 640px.

The project section breaks the container into a full-bleed cobalt band, bounded by 6px ink rules and a 12px red/yellow stripe (28px steps) top and bottom. Sections are spaced 64px apart, 96px from 640px. Lists inside plaques divide with 2px dashed ink at 35% opacity. Workshop placards sit in a 1 / 2 / 3 column grid, alternate columns dropped 24px so the row hangs unevenly.

Breakpoints are Tailwind's: 640px and 1024px.

## Elevation & Depth

Depth is physical and singular: objects hang on a sign. Plaques cast one soft drop shadow, offset downward, as a tin sheet held off the board by its screws. Inside a plaque, depth is painted, not lit: inset shadows draw the double border, and lettering carries a hard offset shadow because that is how painters letter signs. There is no ambient glow, no blur behind surfaces, and no layered elevation scale.

### Shadow Vocabulary
- **Hung plaque** (`box-shadow: 0 14px 22px -12px rgb(20 17 15 / 0.55), 0 3px 6px -2px rgb(20 17 15 / 0.25)`): every plaque and plaque button, stacked after its painted inset borders.
- **Small hung card** (`box-shadow: 0 10px 16px -10px rgb(20 17 15 / 0.6)`): message cards in the alert plaque and the language switch.
- **Lifted node** (`box-shadow: 0 12px 18px -10px rgb(20 17 15 / 0.7)`): an architecture node lit by a stack swatch, paired with a 4px lift.
- **Painted lettering** (`text-shadow: 0.045em 0.045em 0 rojo, 0.07em 0.07em 0 tinta`; cream lettering 0.05em / 0.075em): block caps only. On a red board the painted drop switches to cobalt.

### Named Rules
**The Hung Sheet Rule.** Only hung or screwed objects cast shadows, and always downward. Flat painted elements (tags, badges, stripes, dividers) cast none.

**The Painter's Drop Rule.** Hard offset shadow belongs to lettering alone, in red (cobalt on red), then ink. It is never put on boxes.

## Shapes

Tin sheet geometry: rectangles with slightly eased corners, thick ink edges and painted inner borders. Plaques round to 10px with a 3px ink border; inside them a painted double border (5px of the plaque's own colour, then a 3px line of red on cream, yellow on cobalt, cream on red; 3px / 2px on small plaques). Inner cards and architecture nodes use 8px, controls and chips 6px, state tags 4px with a 2px ink border, badges 3px.

The page frame is the filete: a 6px red stripe, a 4px yellow gap, a 3px cobalt hairline. Corner flourishes are a single painted scroll with a curl and two leaves in red with a cobalt keyline, mirrored into each corner. Hard-stop patterns are part of the form language: the red/yellow band, the yellow/ink hazard frame on "en construcción" badges, the cobalt hatch and the dotted oxide red on tags. Bullets are small red dots in ledgers and cobalt diamonds (a rotated square) on cream plaques.

## Components

### Buttons (action plaques)
Small tin plaques you press.
- **Shape:** plaque geometry (10px, 3px ink border) with the slim double border and no screws; at least 52px tall, 12px / 20px padding, Bungee label at 0.82 to 0.95rem, optional 20px icon at 10px gap.
- **Primary:** plaque red with cream lettering ("Escríbeme", mailto). One per group.
- **Secondary:** cream plaque with ink lettering (LinkedIn, GitHub, visit project); cobalt plaque with cream lettering for in-page navigation ("Ver el proyecto").
- **Hover / Focus:** lifts 2px over 200ms on the settle curve and returns on press; focus is a 3px cobalt outline at 3px offset.

### Chips (stack swatches)
- **Style:** 44px tall, 6px radius, 3px ink border, cream fill, Archivo 600 at 0.92rem with a 16px solid brand mark; the "Todo" chip is set in Bungee.
- **State:** hover deepens to aged cream; selected (aria-pressed) fills sign yellow. Selecting a swatch lights the architecture nodes it powers (yellow, lifted, with a hung tag naming the technology) and quiets the rest to night cobalt.

### State Tags
- **Style:** Bungee label at 0.72rem, 2px ink border, 4px radius, hung from their top edge.
- **States:** "vigilando" plain cream on ink; "actuación nueva" oxide red with a 7px cream dot screen; "por vencer" cobalt / night cobalt 45-degree hatch. A new tag swings onto its hook with the hang animation.

### Cards / Containers (plaques)
- **Corner Style:** 10px.
- **Background:** cream by default; cobalt for the alert board; plaque red for the closing board.
- **Shadow Strategy:** hung plaque shadow (see Elevation & Depth).
- **Border:** 3px ink, then the painted double border inset; four 3px screw dots 14px in from each corner (faded ink on cream, aged cream on cobalt, ink on red).
- **Internal Padding:** about 20 to 32px horizontally, 24 to 32px top, slightly less at the bottom; the closing board opens to 48px.

### Message Cards
Cream cards inside the cobalt alert plaque that show what goes out by WhatsApp and email: 8px radius, 3px ink border, 16px padding, small hung shadow, a Bungee channel line in deep oxide red with a solid brand mark, and a 2px-bordered term box. They are re-lettered left to right (brush animation) when the board's active row changes.

### Navigation
- **Language switch:** a small cobalt plaque at the sign strip's right edge, Bungee at 0.78rem, 44px tall, 6px radius, 3px ink border; hover deepens to night cobalt.
- **Contact nav:** the action plaque row, a 2-column grid on phones (primary and project spanning both) and a wrapping row from 640px.

### Hung Placard (signature)
Upcoming work hangs from an ink wire hanger (a ring and two diagonal wires drawn in SVG) above a cream plaque. Its badge reads "en construcción" in yellow on ink, framed by a yellow/ink hazard stripe. Placards carry a title and one line of detail, never claims.

### Sample Badge
"Datos de ejemplo" in Bungee at 0.62rem on ink (on cream boards) or on yellow (on cobalt boards), 3px radius. Any synthetic data on a board carries it.

### Motion
- **Hang** (700ms, settle curve `cubic-bezier(0.16, 1, 0.3, 1)`): rotateX from -88deg past 12deg and -5deg to rest, at 400px perspective; for tags and placards arriving.
- **Brush** (650ms, settle curve): a clip-path wipe from left to right; for re-lettered content.
- Board rows cycle every 4.2s, pause on hover or on selection, and do not cycle under reduced motion.

## Do's and Don'ts

### Do:
- **Do** hang every new block of content on the yellow ground as a plaque: 3px ink border, 10px corners, painted double border, screws when it is taller than a button, the hung plaque shadow.
- **Do** letter headings in Bungee with the painted drop (red then ink; cobalt then ink on a red board).
- **Do** use rojo-placa for any red surface carrying cream text, and keep the primary action as the one red plaque in its group.
- **Do** name every state in words and give it its own pattern; add new states as a new label plus pattern.
- **Do** set real dates, durations and identifiers in Archivo tabular at 82% width, right-aligned in lists, and mark synthetic data with the sample badge.
- **Do** animate only as material: placards hang and settle, lettering is brushed on; respect prefers-reduced-motion.
- **Do** add new projects as data: a new placard or a new plaque, not a new layout.

### Don't:
- **Don't** introduce glass, backdrop blur, blended gradients or neon; hard-stop painted stripes, hatches and dots are the only patterned fills.
- **Don't** put a dark developer hero (name, tagline, gradient, card row) or a white résumé grid in front of the sign.
- **Don't** set cream text on filete red (#d7261e); it fails contrast.
- **Don't** tell states apart by colour alone.
- **Don't** put the hard offset shadow on boxes; boxes get the soft hung shadow, lettering gets the painted drop.
- **Don't** set sentences in Bungee.
- **Don't** fade or float content in on scroll.
