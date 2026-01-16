# Quick Start Guide

Get up and running with the Personal Leadership platform in minutes.

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure at a Glance

```
personal-leadership/
├── app/                     # Next.js App Router pages
│   ├── page.tsx            # Landing page (/)
│   ├── programs/           # Programs page
│   ├── test/              # Assessment + Results
│   └── contact/           # Contact form
├── components/
│   ├── layout/            # Navigation, Footer
│   └── ui/                # Reusable components
└── tailwind.config.ts     # Design system tokens
```

## Key Files

- `app/layout.tsx` - Root layout, fonts, global structure
- `app/globals.css` - Global styles, Tailwind imports
- `tailwind.config.ts` - Design tokens (colors, typography, spacing)
- `components/ui/*` - Reusable UI components

## Creating a New Page

1. Create a new folder in `app/` (e.g., `app/about/`)
2. Add a `page.tsx` file:

```tsx
'use client'

import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'

export default function AboutPage() {
  return (
    <>
      <Hero
        subtitle="About"
        title="Our Story"
        description="Learn about our journey and mission."
      />
      
      <Section spacing="large">
        {/* Your content */}
      </Section>
    </>
  )
}
```

3. Add navigation link in `components/layout/Navigation.tsx`

## Using Components

### Hero Section

```tsx
<Hero
  title="Main Headline"
  subtitle="Optional Eyebrow"
  description="Supporting text"
  centered={true}
>
  <Button href="/action">Call to Action</Button>
</Hero>
```

### Section Wrapper

```tsx
<Section
  title="Section Title"
  subtitle="Label"
  description="Introduction"
  background="default" | "accent" | "dark"
  spacing="large"
>
  {/* Content */}
</Section>
```

### Buttons

```tsx
// Link button
<Button href="/path" variant="primary" size="large">
  Click Me
</Button>

// Action button
<Button onClick={handleClick} variant="secondary">
  Submit
</Button>
```

### Cards

```tsx
<Card hover={true} delay={0.1}>
  <h3 className="text-h4 font-serif mb-4">Title</h3>
  <p className="text-body text-ink-600">Content</p>
</Card>
```

## Styling Guidelines

### Use Design Tokens

✅ **Do:**
```tsx
<div className="bg-sand-50 text-ink-900 p-8">
  <h2 className="text-h2 font-serif mb-6">Title</h2>
  <p className="text-body text-ink-600">Text</p>
</div>
```

❌ **Don't:**
```tsx
<div className="bg-[#faf9f7] text-[#3d3d3d] p-[32px]">
  <h2 className="text-[40px] font-serif mb-[24px]">Title</h2>
  <p className="text-[18px] text-[#5d5d5d]">Text</p>
</div>
```

### Typography Classes

```tsx
/* Headings (serif) */
text-display  // 5.5rem - Hero only
text-h1       // 3.5rem - Page titles
text-h2       // 2.5rem - Section titles
text-h3       // 2rem - Subsections
text-h4       // 1.5rem - Small headings

/* Body (sans-serif) */
text-body-lg  // 1.25rem - Introductions
text-body     // 1.125rem - Primary text
text-body-sm  // 1rem - Secondary text
text-caption  // 0.875rem - Labels
```

### Color Classes

```tsx
/* Backgrounds */
bg-sand-50    // Page background
bg-sage-50    // Accent sections
bg-white      // Cards
bg-ink-950    // Dark sections

/* Text */
text-ink-950  // Headings
text-ink-900  // Strong text
text-ink-600  // Body text
text-ink-500  // Secondary text

/* Accents */
bg-sage-700   // Primary buttons
border-sage-600  // Active states
text-sage-700 // Links
```

### Spacing

```tsx
/* Padding */
p-6   // 24px - Mobile container
p-8   // 32px - Card padding
p-10  // 40px - Generous padding

/* Margin */
mb-6  // 24px - Heading to text
mb-8  // 32px - Paragraph spacing
mb-12 // 48px - Section divisions

/* Section Spacing */
py-20    // Default section padding
py-28    // Large section padding
lg:py-34 // Extra large (desktop)
```

## Adding Animations

Use Framer Motion for subtle animations:

```tsx
'use client'
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

### Scroll-triggered Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

### Staggered Items

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Item */}
  </motion.div>
))}
```

## Responsive Design

### Breakpoints

```tsx
// Mobile-first approach
<div className="
  p-6        // Mobile: 24px padding
  lg:p-12    // Desktop: 48px padding
  text-h3    // Mobile: 2rem
  lg:text-h2 // Desktop: 2.5rem
">
```

### Grid Layouts

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards */}
</div>
```

## Common Patterns

### Page Template

```tsx
'use client'

import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export default function PageName() {
  return (
    <>
      <Hero
        subtitle="Category"
        title="Page Title"
        description="Brief introduction"
      />

      <Section spacing="large">
        {/* Main content */}
      </Section>

      <Section background="accent" centered>
        {/* CTA section */}
      </Section>
    </>
  )
}
```

### Two-Column Content

```tsx
<Section spacing="large">
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <h2 className="text-h2 font-serif mb-6">Title</h2>
      <p className="text-body-lg text-ink-600">Text</p>
    </div>
    <div>
      {/* Image, quote, or visual */}
    </div>
  </div>
</Section>
```

### Card Grid

```tsx
<Section>
  <div className="grid md:grid-cols-3 gap-8">
    {items.map((item, i) => (
      <Card key={item.id} delay={i * 0.1}>
        <h3 className="text-h4 font-serif mb-4">{item.title}</h3>
        <p className="text-body text-ink-600">{item.description}</p>
      </Card>
    ))}
  </div>
</Section>
```

## Development Tips

### 1. Use the Design System
Always reference design tokens. Check `DESIGN_SYSTEM.md` for the complete guide.

### 2. Keep It Calm
- Generous whitespace
- Subtle animations (0.6s duration)
- Neutral colors
- Clear hierarchy

### 3. Think Editorially
- Strong typography leads
- Content breathes
- Less is more
- Quality over quantity

### 4. Mobile Matters
- Test on mobile early
- Touch targets 44px minimum
- Readable font sizes
- Simplified navigation

### 5. Performance
- Use Framer Motion sparingly
- Optimize images (if added)
- Lazy load below fold
- Keep bundle size small

## Troubleshooting

### Styles not applying?
- Check if component is marked `'use client'`
- Verify Tailwind config includes your files
- Restart dev server

### Fonts not loading?
- Ensure `layout.tsx` includes font variables
- Check font classes are applied to `<html>`
- Clear browser cache

### Animations not working?
- Add `'use client'` directive
- Import from `framer-motion`
- Check viewport triggers

## Next Steps

1. **Customize Content** - Update text and copy
2. **Add Images** - Create `public/` folder for assets
3. **Connect Backend** - Integrate forms with API
4. **SEO** - Add metadata to each page
5. **Analytics** - Integrate tracking

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- Design System: See `DESIGN_SYSTEM.md`
- Full Docs: See `README.md`

---

**Happy building!** 🌿
