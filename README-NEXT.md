# Ace Tours Concept — Next.js + Libraries Upgrade

This is the **upgraded** concept: a **Next.js 14** app with **GSAP**, **Framer Motion**, and **Lenis** for Snami/Reno Tahoe–level UI: smooth scroll, parallax, scroll-triggered animations, and hover effects.

## Stack

| Library | Purpose |
|--------|---------|
| **Next.js 14** | App Router, React 18, SSR-ready |
| **Lenis** | Buttery smooth scroll (heavy, eased) |
| **GSAP + ScrollTrigger** | Scroll parallax (hero bg), scroll-linked animations |
| **Framer Motion** | Component animations, stagger, whileInView, hover |

## Run

```bash
cd concept1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
concept1/
├── app/
│   ├── layout.tsx      # Root layout, LenisProvider, html class lenis
│   ├── page.tsx        # Home: composes all sections
│   └── globals.css     # Fonts + import of styles.css
├── components/
│   ├── Header.tsx      # Snami header, scroll state, Framer Motion CTA
│   ├── Hero.tsx        # GSAP ScrollTrigger parallax + mouse parallax, entrance
│   ├── Discover.tsx    # ScrollTrigger in-view, Framer Motion reveal
│   ├── ToursCarousel.tsx # Cards carousel, data-lenis-prevent, motion cards
│   ├── Philosophy.tsx  # Framer Motion whileInView
│   ├── ValueProps.tsx  # Staggered list with motion
│   ├── Testimonials.tsx
│   ├── Destinations.tsx
│   ├── CtaStrip.tsx
│   ├── Footer.tsx
│   └── AskStrip.tsx    # Reno Tahoe “Ask me anything”
├── lib/
│   ├── LenisProvider.tsx  # Client Lenis init, raf loop
│   └── gsap.ts            # gsap + ScrollTrigger registration
├── styles.css             # All existing CSS (unchanged)
├── index.html / script.js  # Legacy static version (optional)
└── package.json
```

## Effects in use

- **Lenis** — Smooth scroll; `data-lenis-prevent` on carousels so horizontal scroll stays native.
- **Hero** — ScrollTrigger scrub for background Y parallax; mouse move for X parallax; GSAP entrance for content.
- **Sections** — Framer Motion `whileInView` and `initial`/`animate` for scroll reveals and stagger.
- **Header** — Scroll state for `.scrolled`; Framer Motion on Request button.
- **Cards / destinations** — Motion hover and scroll-in.

## Build

```bash
npm run build
npm run start
```

The static HTML/CSS/JS version is still in `index.html`, `styles.css`, and `script.js` if you want a no-build fallback.
