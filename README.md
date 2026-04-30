# Ace Tours — UI/UX Concept

A single-page concept that blends **Snami Travel** (editorial luxury, emotion, full-screen hero) with **Visit Reno Tahoe** (discovery, search, card carousels) — tailored for **Ace Tours** (Ghana-based tour planning, Takoradi).

## How to view

Open `index.html` in a modern browser. No build step required. For best experience, use a local server (e.g. `npx serve .` or VS Code Live Server) so hero images load correctly.

## Design decisions

| Layer | Inspiration | Implementation |
|-------|-------------|----------------|
| **Hero** | Snami: full-viewport, cinematic | 100vh hero with background image, overlay, large serif headline “Ghana Travel Redefined”, CTA “Discover Ghana” |
| **Typography** | Snami: high-contrast serif + clean sans | **Playfair Display** (headlines), **Plus Jakarta Sans** (body). Aligns with your note on Dream Avenue / basis-grotesque. |
| **Discovery** | Reno Tahoe: “Discover Your Adventure” | Search bar directly under hero; pill-shaped form with Search button. |
| **Browsing** | Reno Tahoe: horizontal cards | Scrollable card carousel for tour categories (City, Coastal & Heritage, Nature & Adventure, Campus, Corporate) with prev/next. |
| **Philosophy** | Snami: “For those who travel differently” | Dark block with serif headline and short copy, “Get in touch” CTA. |
| **Why us** | Snami value bullets | Four value props (pick-up/drop-off, no planning fees, 24/7 support, local expertise) in a simple grid. |
| **Social proof** | Snami: “What they say” | Testimonial strip with quotes and attribution. |
| **Destinations** | Reno Tahoe: region grid | Four destination cards (Accra, Cape Coast, Kakum, Takoradi) with hover. |
| **CTA strip** | Snami: marquee tagline | “GHANA DESIGNED BY US. LIVED BY YOU.” with Enquire button. |
| **Footer** | Both: clear contact + links | Ace Tours contact (phone, email), social links, copyright. |

## Palette (Ghana-inspired)

- **Earth** `#2c2416` — primary text, buttons  
- **Gold** `#c9a227` — accents, labels, links  
- **Forest** `#1a3329` — hero overlay, cards fallback  
- **Cream** `#f7f4ee` — background  
- **White** — cards, header when scrolled  

## Content

Copy and structure are based on:

- `claude-findings.txt` (services: City Tours, Coastal & Heritage, Nature & Adventure, Campus, Corporate; contact +233 53 050 9181, atacetours@gmail.com)
- `inspotexts.txt` (Snami + Reno Tahoe hybrid, hero + search + carousels)
- `gem-findings.txt` (value props, filters, “Why us” structure)

Images use Unsplash placeholders (Ghana/coast/nature). Replace with Ace Tours photography when ready.

## Motion & UX (Snami + Reno Tahoe level)

- **Lenis** smooth scroll (buttery, heavy feel) — CDN loaded; falls back to native scroll if unavailable.
- **Scroll parallax** — Hero background moves at ~0.35× scroll speed for depth.
- **Mouse parallax** — Hero image shifts subtly with cursor position (bounded, eased).
- **Heavy sections** — Discover, carousel, philosophy use min-height (50–85vh) for a weighty scroll.
- **Scroll reveal** — Sections fade and translate up with 1s ease-out; section headings can use staggered `.reveal-item` delays.
- **Snami header** — Logo + “Ghana Travel Redefined” tagline, phone icon, circular “Request” button.
- **Reno Tahoe strip** — Sticky “Ask me anything” vertical strip on the right (gold, rotated text).

## Possible next steps

- Replace hero background with video (e.g. Ghana drone) for stronger Snami-style impact  
- Add GSAP or Framer Motion for more complex scroll-triggered animations  
- Turn into Next.js app and connect to Supabase/Firebase for real tours and search  
- Add filters (duration, theme, group size) like Reno Tahoe  
- Mobile: hamburger menu (markup present, styles hidden on small screens)
