
## Goal

Faithfully rebuild the wedding invitation site from your 4 uploaded sections inside this Lovable project (React + Vite + Tailwind v3 + TypeScript), and generate sample images so everything renders out-of-the-box. Once it's standing, we'll iterate on modifications.

## What gets built

### 1. Design system setup
- Add Google Fonts (Cormorant Garamond, Great Vibes, Inter) via `index.html`.
- Extend `tailwind.config.ts` with custom colors and font families:
  - `cream #F9F6F0`, `gold #D4AF37`, `soft-brown #8B7355`, `dark-brown #3E2723`, `warm-gray #E0D8D0`
  - `font-sans: Inter`, `font-serif: Cormorant Garamond`, `font-script: Great Vibes`
- Update `src/index.css` body defaults (cream background, dark-brown text, smooth scroll, custom scrollbar).
- Port `scroll-invitation.css` (the unrolling parchment styles) into `src/index.css`.
- Install `framer-motion` and `lucide-react` (lucide is likely already there).

### 2. Sections (ported from your JSX, converted to TSX)
All four sections recreated 1:1, just typed and wired into the Lovable project:

- **`HeroSection.tsx`** — full-screen hero with slow background zoom, gold "We're Getting Married" eyebrow, script "Aarav & Ananya" title, italic tagline, animated chevron scroll cue.
- **`CountdownSection.tsx`** — live countdown to Dec 15, 2026 with serif numerals, gold colon dividers, responsive day/hour/min/sec layout.
- **`LoveStorySection.tsx`** — 3vh tall sticky section. Polaroid card deck starts stacked, then spreads diagonally as you scroll, dashed gold connector lines appear, click any card to open a story modal with photo + caption + prev/next nav. Mobile-aware spread positions.
- **`EventsSection.tsx`** — section header "Wedding Events", then two stacked sticky `ScrollInvitation`s. Each one has SVG turned-wood handles (top + bottom), a parchment paper panel that unrolls between them as you scroll, revealing a floral wreath with the event name, description, divider, and date/time/venue rows with Lucide icons.

### 3. Page assembly
- Replace `src/pages/Index.tsx` to render: `<HeroSection /> <CountdownSection /> <LoveStorySection /> <EventsSection />`.

### 4. Placeholder images (AI-generated, same filenames as your code expects)
Generated with Nano Banana, written to `public/images/`:
- `hero_bg_1776425430100.png` — romantic palace/floral hero backdrop
- `couple_story_1776425546722.png` — couple meeting moment
- `beach_1776425463100.png` — Goa beach
- `palace_1776425445755.png` — Udaipur palace
- `haldi_1776425508959.png` — haldi ceremony
- `wedding_1776425528064.png` — proposal scene
- `floral_wreath.png` — circular floral wreath, transparent center
- `floral_corner.png` — corner floral flourish
- `parchment_texture.png` — aged parchment paper texture

All in a warm cream/gold/sage palette to match the design.

## Technical notes
- Tailwind v3 (this project) doesn't support your uploaded `@theme {}` v4 syntax — colors/fonts go into `tailwind.config.ts` + an `index.css` `@layer base` block instead. Visual output is identical.
- JSX → TSX conversion: typed component props (`event`, `photo`, `index`, `scrollYProgress`, etc.).
- Native CSS classes (`scroll-invitation`, `paper-revealed`, `scroll-wreath-container`, etc.) kept as-is — appended to `src/index.css`.
- All asset references kept at `/images/...` so your code works unchanged.

## After rebuild
Once you confirm it looks right, tell me the modifications you want (new names/dates, more events, more story photos, different palette, RSVP form, gallery, etc.) and we'll iterate.

## Anything else from you?
Not required to start — sample images will be generated. But if you have any of these handy, send them and I'll swap them in instead:
- Real couple photos
- Real wreath / corner floral PNGs (transparent)
- Real parchment texture
- Final names, dates, venues, story copy
