# Design System Documentation

Complete reference for the Personal Leadership platform design system.

## Table of Contents
1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Components](#components)
5. [Layouts](#layouts)
6. [Motion](#motion)
7. [Accessibility](#accessibility)

---

## Color System

### Color Philosophy
Our palette is intentionally restrained, drawing from nature. Colors should feel grounding, not stimulating.

### Primary Palette

#### Sage (Primary Accent)
Natural, calm green tones for emphasis and interaction.

```css
sage-50:  #f7f8f7  /* Lightest - backgrounds */
sage-100: #eef0ed
sage-200: #d5dbd2
sage-300: #b8c3b3
sage-400: #96a68e
sage-500: #7a8b72  /* Base tone */
sage-600: #62705b  /* Hover states, borders */
sage-700: #4f5a49  /* CTAs, links */
sage-800: #414a3d
sage-900: #373f34  /* Darkest - emphasis */
```

#### Sand (Warm Neutral)
Warm, organic neutrals for backgrounds and subtle UI elements.

```css
sand-50:  #faf9f7  /* Page background */
sand-100: #f5f3ef  /* Card backgrounds */
sand-200: #ebe7dd  /* Borders, dividers */
sand-300: #ddd6c7
sand-400: #cdc1ab
sand-500: #bfad91
sand-600: #a99576
sand-700: #8b7a60
sand-800: #726552
sand-900: #5e5446
```

#### Ink (Text & UI)
Cool, legible grays for text and interface elements.

```css
ink-50:  #f6f6f6  /* Very light backgrounds */
ink-100: #e7e7e7
ink-200: #d1d1d1
ink-300: #b0b0b0
ink-400: #888888
ink-500: #6d6d6d  /* Secondary text */
ink-600: #5d5d5d  /* Body text on light */
ink-700: #4f4f4f
ink-800: #454545
ink-900: #3d3d3d  /* Headings */
ink-950: #1a1a1a  /* Maximum contrast */
```

### Usage Guidelines

**Do:**
- Use `sand-50` for page backgrounds
- Use `ink-900` or `ink-950` for headings
- Use `ink-600` for body text
- Use `sage-700` for primary CTAs
- Use borders over shadows

**Don't:**
- Mix too many colors in one section
- Use pure black (#000000)
- Use bright, saturated colors
- Create low-contrast combinations

### Contrast Ratios
All text combinations meet WCAG AA standards:
- Large text: minimum 3:1
- Body text: minimum 4.5:1
- UI elements: minimum 3:1

---

## Typography

### Font Families

**Crimson Pro** (Serif - Headings)
- Used for: All headings, display text, quotes
- Character: Editorial, classic, authoritative
- Weight: 300 (Light), 400 (Regular), 500 (Medium)

**Inter** (Sans-serif - Body)
- Used for: Body text, UI elements, navigation
- Character: Clean, modern, highly legible
- Weight: 400 (Regular), 500 (Medium), 600 (Semibold)

### Type Scale

#### Display Sizes

**Display** (96px / 5.5rem)
```css
font-size: 5.5rem
line-height: 1.1
letter-spacing: -0.02em
font-weight: 300
```
*Usage*: Hero headlines on landing page only

**H1** (56px / 3.5rem)
```css
font-size: 3.5rem
line-height: 1.15
letter-spacing: -0.02em
font-weight: 300
```
*Usage*: Page titles, primary headlines

**H2** (40px / 2.5rem)
```css
font-size: 2.5rem
line-height: 1.2
letter-spacing: -0.01em
font-weight: 400
```
*Usage*: Section titles, major divisions

**H3** (32px / 2rem)
```css
font-size: 2rem
line-height: 1.3
letter-spacing: -0.01em
font-weight: 400
```
*Usage*: Card titles, subsections

**H4** (24px / 1.5rem)
```css
font-size: 1.5rem
line-height: 1.4
letter-spacing: 0
font-weight: 500
```
*Usage*: Small headings, list headers

#### Body Sizes

**Body Large** (20px / 1.25rem)
```css
font-size: 1.25rem
line-height: 1.6
letter-spacing: 0
font-weight: 400
```
*Usage*: Introductory paragraphs, emphasis

**Body** (18px / 1.125rem)
```css
font-size: 1.125rem
line-height: 1.7
letter-spacing: 0
font-weight: 400
```
*Usage*: Primary reading text

**Body Small** (16px / 1rem)
```css
font-size: 1rem
line-height: 1.6
letter-spacing: 0
font-weight: 400
```
*Usage*: Secondary text, captions

**Caption** (14px / 0.875rem)
```css
font-size: 0.875rem
line-height: 1.5
letter-spacing: 0.01em
font-weight: 500
```
*Usage*: Labels, metadata, eyebrow text (often uppercase)

### Hierarchy Rules

1. **One H1 per page** - Use for the main page title
2. **Logical nesting** - Don't skip levels (H2 → H4)
3. **Consistent spacing** - More space above than below headings
4. **Serif for emotion** - Headings carry the brand voice
5. **Sans for clarity** - Body text optimized for reading

### Responsive Typography

Typography scales down on mobile:
- Display: 3.5rem → 2.5rem
- H1: 3.5rem → 2.25rem
- H2: 2.5rem → 2rem
- H3: 2rem → 1.5rem
- Body-lg: 1.25rem → 1.125rem

---

## Spacing

### Base Unit
8px grid system for consistent rhythm.

### Spacing Scale

```css
0:   0px
1:   4px    (0.25rem)
2:   8px    (0.5rem)
3:   12px   (0.75rem)
4:   16px   (1rem)
5:   20px   (1.25rem)
6:   24px   (1.5rem)
8:   32px   (2rem)
10:  40px   (2.5rem)
12:  48px   (3rem)
16:  64px   (4rem)
18:  72px   (4.5rem)  [extended]
20:  80px   (5rem)
22:  88px   (5.5rem)  [extended]
24:  96px   (6rem)
26:  104px  (6.5rem)  [extended]
30:  120px  (7.5rem)  [extended]
34:  136px  (8.5rem)  [extended]
```

### Spacing Patterns

**Component Internal Spacing**
- Tight: 4-8px (within buttons, small cards)
- Default: 12-16px (card content)
- Comfortable: 20-32px (section content)
- Generous: 40-64px (between major sections)

**Vertical Rhythm**
- Heading to paragraph: 24px (mb-6)
- Paragraph to paragraph: 16px (space-y-4)
- Section to section: 80-112px (py-20 to py-28)

**Horizontal Spacing**
- Container padding: 24px mobile, 48px desktop (px-6, lg:px-12)
- Grid gaps: 32px default (gap-8)
- Button groups: 16px (gap-4)

### Layout Constraints

**Max Widths**
```css
max-w-prose:       65ch   /* ~780px - optimal reading */
max-w-prose-wide:  75ch   /* ~900px - wider reading */
max-w-container:   1280px /* main content container */
```

**Padding/Margin Guidelines**
- Mobile: Minimum 24px side padding
- Desktop: Minimum 48px side padding
- Sections: 80px - 136px vertical spacing

---

## Components

### Button

**Variants:**

**Primary**
- Background: sage-700
- Text: sand-50
- Hover: sage-800
- Use: Main CTAs, form submits

**Secondary**
- Background: transparent
- Border: ink-900 (2px)
- Text: ink-900
- Hover: bg ink-900, text sand-50
- Use: Alternative actions

**Ghost**
- Background: transparent
- Text: ink-700
- Hover: bg sand-100, text ink-900
- Use: Tertiary actions, less emphasis

**Sizes:**
- Default: px-8 py-3
- Large: px-10 py-4

**States:**
- Focus: ring-2 ring-sage-500
- Disabled: opacity-50, cursor-not-allowed
- Active: Slightly darker background

### Card

**Structure:**
- Background: white
- Border: 1px sand-200
- Padding: 32-40px (p-8 to p-10)
- Hover: Optional lift + shadow

**Usage:**
- Content grouping
- Feature highlights
- Program information
- Form containers

### Navigation

**Layout:**
- Fixed position
- Backdrop blur (glass effect)
- Border bottom: sand-200
- Height: 80px

**Links:**
- Default: ink-500
- Hover: ink-900
- Active: ink-900 + underline (sage-600)
- Smooth transition (200ms)

### Footer

**Structure:**
- Border top: sand-200
- Background: sand-50
- 3-column grid on desktop
- Stacked on mobile

**Content:**
- Brand statement
- Navigation links
- Contact info
- Copyright

---

## Layouts

### Grid System

**Standard Grid:**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards */}
</div>
```

**Content Grid:**
```tsx
<div className="grid lg:grid-cols-2 gap-16 items-center">
  <div>{/* Text content */}</div>
  <div>{/* Image/Quote */}</div>
</div>
```

### Container Pattern

All page content should be wrapped:

```tsx
<div className="max-w-container mx-auto px-6 lg:px-12">
  {/* Content */}
</div>
```

### Section Structure

```tsx
<section className="py-20 lg:py-28 px-6 lg:px-12">
  <div className="max-w-container mx-auto">
    {/* Section content */}
  </div>
</section>
```

### Page Layout

```
[Navigation] - Fixed, 80px
[Hero] - pt-32 (clears nav), generous padding
[Section 1] - py-20 to py-28
[Section 2] - py-20 to py-28
[Footer] - py-16
```

---

## Motion

### Animation Principles

1. **Subtle** - Never distracting
2. **Purposeful** - Guides attention
3. **Performant** - GPU-accelerated only
4. **Respectful** - Honors prefers-reduced-motion

### Animation Properties

**Allowed:**
- opacity
- transform (translateX, translateY, scale)

**Avoid:**
- width, height (layout thrashing)
- color (except with GPU compositing)
- position changes

### Duration Scale

```css
fast:     200ms  /* Micro-interactions */
default:  300ms  /* Hover states */
entrance: 600ms  /* Page load animations */
```

### Easing Functions

```css
ease-out:    Entrances, appearances
ease-in-out: Interactive elements, hovers
linear:      Progress indicators
```

### Common Patterns

**Fade In:**
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6 }}
```

**Slide Up:**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**Stagger:**
```tsx
// On each item in a list
transition={{ duration: 0.6, delay: index * 0.1 }}
```

**Hover Lift:**
```tsx
whileHover={{ y: -4 }}
transition={{ duration: 0.2 }}
```

### Viewport Animations

Use `whileInView` for scroll-triggered animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

---

## Accessibility

### Focus States

All interactive elements have visible focus:

```css
*:focus-visible {
  outline: none;
  ring: 2px sage-500;
  ring-offset: 2px;
}
```

### Color Contrast

Minimum ratios (WCAG AA):
- Body text (18px): 4.5:1
- Large text (24px+): 3:1
- UI components: 3:1

### Semantic HTML

- Use proper heading hierarchy
- `<nav>` for navigation
- `<main>` for main content
- `<section>` for content sections
- `<article>` for self-contained content

### Keyboard Navigation

- All interactive elements reachable via Tab
- Logical tab order
- Skip links (if needed)
- No keyboard traps

### Screen Readers

- Descriptive link text
- Alt text for images
- ARIA labels where needed
- Live regions for dynamic content

### Motion Preferences

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Design Tokens (Tailwind Config)

All design decisions are codified in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: { /* sage, sand, ink */ },
    fontFamily: { /* sans, serif */ },
    fontSize: { /* display, h1-h4, body */ },
    spacing: { /* 18, 22, 26, 30, 34 */ },
    maxWidth: { /* prose, container */ },
    animation: { /* fade-in, slide-up */ },
  }
}
```

Reference tokens, never hardcode values.

✅ Good: `bg-sage-700`
❌ Bad: `bg-[#4f5a49]`

---

**Design with intention** 🌿
