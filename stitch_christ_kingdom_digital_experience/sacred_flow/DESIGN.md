---
name: Sacred Flow
colors:
  surface: '#f4fafd'
  surface-dim: '#d4dbdd'
  surface-bright: '#f4fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f7'
  surface-container: '#e8eff1'
  surface-container-high: '#e2e9ec'
  surface-container-highest: '#dde4e6'
  on-surface: '#161d1f'
  on-surface-variant: '#454652'
  inverse-surface: '#2b3234'
  inverse-on-surface: '#ebf2f4'
  outline: '#767683'
  outline-variant: '#c6c5d4'
  surface-tint: '#4c56af'
  primary: '#000666'
  on-primary: '#ffffff'
  primary-container: '#1a237e'
  on-primary-container: '#8690ee'
  inverse-primary: '#bdc2ff'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#181b1e'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d3033'
  on-tertiary-container: '#95989b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#343d96'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f4fafd'
  on-background: '#161d1f'
  surface-variant: '#dde4e6'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 2rem
  section-padding: 8rem
  element-gap-sm: 1rem
  element-gap-md: 2rem
  element-gap-lg: 4rem
---

## Brand & Style

The design system is centered on a "Sacred Flow" philosophy, blending the timeless authority of a traditional church with a modern, breathable, and organic digital experience. It is designed to feel welcoming, ethereal, and professional, targeting a multi-generational audience seeking community and spiritual depth.

The aesthetic direction is **Modern-Organic Minimalism**. It prioritizes heavy white space and high-resolution photography to establish trust and presence. This is layered with "elements rich" details: abstract, flowing thread-like illustrations and soft, translucent "blobs" that act as visual connective tissue between sections, symbolizing the interconnectedness of faith and community. The interface remains functional and clean, ensuring that the decorative elements never obstruct the clarity of the message.

## Colors

The palette is rooted in a sophisticated "Deep Cathedral" blue, derived from the provided logo, representing stability and tradition. This is paired with a muted "Ecclesiastical Gold" for subtle calls to action and accents. 

To maintain a clean, semi-minimalist feel, the background uses a high-brightness off-white to reduce eye strain and provide a canvas for the organic elements. The organic thread-like illustrations should utilize the `accent_organic_hex` at low opacities (10-20%) to create depth without cluttering the visual hierarchy.

## Typography

This design system employs a classic pairing of a refined serif and a geometric sans-serif to bridge the gap between tradition and modernity. **Noto Serif** is used for all major headings to evoke a literary, authoritative, and spiritual feel. 

**Manrope** is used for body text and functional labels, providing high legibility and a friendly, contemporary tone. Headlines should utilize tighter letter spacing in larger sizes to maintain a professional, editorial look, while labels utilize slight tracking (letter-spacing) to aid in scannability.

## Layout & Spacing

The design system utilizes a **Fixed Grid** approach for content containers (1280px max-width) to ensure an elegant, centered focal point on wide screens. However, the organic decorative elements (blobs and lines) are permitted to break the grid, bleeding into the margins and transitioning between sections to create the "flow."

Spacing is intentionally generous. Section padding is set to a minimum of 8rem to emphasize the minimalist aesthetic and allow the high-quality imagery to "breathe." Content follows a 12-column rhythm with 2rem gutters.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Soft Ambient Shadows**. 
- **Surface Level 0:** The main page background.
- **Surface Level 1 (Cards):** Uses an extremely soft, large-radius shadow (Blur: 40px, Opacity: 4%, Color: Primary) to appear as if floating slightly above the page.
- **Glassmorphism:** Navigation menus and image overlays utilize a backdrop blur (12px) with a semi-transparent white fill (80% opacity) to maintain a modern, ethereal quality.
- **Organic Elements:** Decorative lines and blobs occupy a layer between the background and the content, often using "Multiply" or "Overlay" blend modes to interact with imagery.

## Shapes

The shape language is a mix of structured geometry and organic fluidness. 
- **Functional Elements:** Buttons and cards use a standard 0.5rem (8px) radius to maintain a professional, modern feel.
- **Organic Elements:** Background "blobs" and thread-like illustrations are defined by Bezier curves with no sharp angles, mimicking natural forms like water or wind.
- **Imagery:** Large section imagery and sliders should utilize the `rounded-xl` (1.5rem) setting to soften the edges of the high-res photographs, making them feel more integrated into the organic theme.

## Components

### Hero Section
Full-width or large-inset sliders featuring high-resolution photography. Text is centered or left-aligned with a subtle backdrop blur behind the typography to ensure legibility. Transitions between slides should be "cross-fade" or "slow-zoom" (Ken Burns effect) to maintain a spiritual, calm pace.

### Organic Connectors
These are SVG-based line illustrations that "thread" through the page. A line might start in the Hero section, curve down into the 'About Us' section, and terminate near a CTA. They should be stroke-based and use the secondary or accent-organic colors.

### Content Cards (Branches, About, Missions)
Cards feature a vertical layout with the image at the top. The transition between the image and the card body is seamless. Hover states should include a subtle upward lift (elevation increase) and a slight scale-up of the internal image.

### Gallery & Sliders
Galleries use a masonry or justified grid with generous gaps. The slider component uses "ghost" navigation (minimalist arrows) and "progress line" pagination rather than traditional dots to stay consistent with the "thread" theme.

### Buttons
Primary buttons are solid Deep Cathedral blue with white text. Secondary buttons are "ghost" style with a 1px border and the Ecclesiastical Gold color for the text and border. All buttons have a hover state that slightly fills the background or shifts the weight of the shadow.