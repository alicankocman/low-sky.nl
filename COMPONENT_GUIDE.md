# Component Guide

Visual reference for all UI components with usage examples and best practices.

## Component Hierarchy

```
App Layout (app/layout.tsx)
├── Navigation (fixed)
├── Main Content
│   └── Pages use:
│       ├── Hero
│       ├── Section
│       │   ├── Card
│       │   ├── ProgramCard
│       │   └── Button
│       └── Custom content
└── Footer
```

---

## Layout Components

### Navigation

**Location**: `components/layout/Navigation.tsx`

**Purpose**: Fixed top navigation with smooth transitions

**Features**:
- Fixed position with backdrop blur
- Animated underline on active route
- Smooth hover states
- Framer Motion layout animations

**Usage**:
```tsx
// Automatically included in app/layout.tsx
// To add a new link, edit the links array:

const links = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/test', label: 'Self-Discovery' },
  { href: '/contact', label: 'Contact' },
]
```

**Customization**:
- Logo text: Update Link content
- Link order: Reorder links array
- Styling: Modify Tailwind classes

---

### Footer

**Location**: `components/layout/Footer.tsx`

**Purpose**: Site footer with navigation and contact info

**Features**:
- 3-column responsive grid
- Brand statement
- Quick links
- Contact information
- Copyright

**Usage**:
```tsx
// Automatically included in app/layout.tsx
```

**Customization**:
- Update email address
- Add social links
- Modify grid structure

---

## UI Components

### Hero

**Location**: `components/ui/Hero.tsx`

**Purpose**: Page header with title, description, and optional CTA

**Props**:
```typescript
interface HeroProps {
  title: string          // Main headline (required)
  subtitle?: string      // Eyebrow text
  description?: string   // Supporting paragraph
  children?: ReactNode   // Usually CTAs
  centered?: boolean     // Center alignment (default: false)
}
```

**Examples**:

**Left-aligned Hero**:
```tsx
<Hero
  subtitle="Programs"
  title="Two paths, one journey"
  description="Whether you're beginning your leadership practice or deepening an existing one, our programs meet you where you are."
/>
```

**Centered Hero with CTAs**:
```tsx
<Hero
  title="Leadership begins with understanding yourself"
  description="A space for reflection, growth, and intentional transformation."
  centered
>
  <div className="flex gap-4">
    <Button href="/programs" variant="primary" size="large">
      Explore Programs
    </Button>
    <Button href="/test" variant="secondary" size="large">
      Begin Self-Discovery
    </Button>
  </div>
</Hero>
```

**Animation**:
- Elements fade in and slide up
- Staggered delays (100ms)
- 600ms duration

---

### Section

**Location**: `components/ui/Section.tsx`

**Purpose**: Content section wrapper with optional header

**Props**:
```typescript
interface SectionProps {
  title?: string           // Section title
  subtitle?: string        // Eyebrow label
  description?: string     // Introduction paragraph
  children: ReactNode      // Section content
  background?: 'default' | 'accent' | 'dark'  // Background style
  spacing?: 'default' | 'large' | 'small'     // Vertical spacing
  centered?: boolean       // Center header text
}
```

**Background Options**:
- `default`: sand-50 (page background)
- `accent`: sage-50 (subtle highlight)
- `dark`: ink-950 with light text

**Spacing Options**:
- `small`: py-16 (lg:py-20)
- `default`: py-20 (lg:py-28)
- `large`: py-28 (lg:py-34)

**Examples**:

**Standard Section**:
```tsx
<Section
  subtitle="Our Approach"
  title="Thoughtful growth, not quick fixes"
  description="We believe leadership is a personal journey, not a checklist."
  spacing="large"
>
  <div className="grid md:grid-cols-3 gap-8">
    {/* Cards */}
  </div>
</Section>
```

**Accent Section (Centered)**:
```tsx
<Section background="accent" spacing="large" centered>
  <div className="max-w-3xl mx-auto">
    <h2 className="text-h2 font-serif mb-6">
      Ready to explore?
    </h2>
    <Button href="/programs" variant="primary">
      View Programs
    </Button>
  </div>
</Section>
```

**Dark Section**:
```tsx
<Section background="dark" spacing="large">
  {/* Content - text will be light colored */}
</Section>
```

---

### Button

**Location**: `components/ui/Button.tsx`

**Purpose**: Styled button/link with variants

**Props**:
```typescript
interface ButtonProps {
  children: ReactNode
  href?: string           // For link buttons
  onClick?: () => void    // For action buttons
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large'
  type?: 'button' | 'submit'
  disabled?: boolean
}
```

**Variants**:

**Primary** (sage-700 background):
- Main call-to-action
- High emphasis
- One per section recommended

**Secondary** (outlined):
- Alternative action
- Medium emphasis
- Pairs well with primary

**Ghost** (transparent):
- Tertiary action
- Low emphasis
- Subtle interactions

**Sizes**:
- `default`: px-8 py-3
- `large`: px-10 py-4

**Examples**:

```tsx
// Link button (primary)
<Button href="/programs" variant="primary" size="large">
  Explore Programs
</Button>

// Action button (secondary)
<Button onClick={handleSubmit} variant="secondary">
  Submit Form
</Button>

// Ghost button
<Button href="/about" variant="ghost">
  Learn More
</Button>

// Disabled button
<Button type="submit" disabled={!isValid}>
  Continue
</Button>
```

**Button Groups**:
```tsx
<div className="flex flex-col sm:flex-row gap-4">
  <Button href="/primary" variant="primary" size="large">
    Primary Action
  </Button>
  <Button href="/secondary" variant="secondary" size="large">
    Secondary Action
  </Button>
</div>
```

---

### Card

**Location**: `components/ui/Card.tsx`

**Purpose**: Content container with optional hover effect

**Props**:
```typescript
interface CardProps {
  children: ReactNode
  hover?: boolean    // Enable hover lift effect
  delay?: number     // Animation delay (seconds)
}
```

**Examples**:

**Basic Card**:
```tsx
<Card>
  <h3 className="text-h4 font-serif text-ink-950 mb-4">
    Self-Awareness
  </h3>
  <p className="text-body text-ink-600">
    Understanding your patterns, values, and triggers is the foundation of authentic leadership.
  </p>
</Card>
```

**Hoverable Card**:
```tsx
<Card hover={true}>
  {/* Content */}
</Card>
```

**Staggered Grid**:
```tsx
<div className="grid md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <Card key={item.id} delay={index * 0.1}>
      <h3 className="text-h4 font-serif mb-4">{item.title}</h3>
      <p className="text-body text-ink-600">{item.description}</p>
    </Card>
  ))}
</div>
```

---

### ProgramCard

**Location**: `components/ui/ProgramCard.tsx`

**Purpose**: Specialized card for program listings

**Props**:
```typescript
interface ProgramCardProps {
  title: string
  description: string
  duration: string
  format: string
  href: string
  delay?: number
}
```

**Example**:
```tsx
<ProgramCard
  title="New Personal Leadership"
  description="A foundational program for emerging leaders who want to build self-awareness, clarify their values, and develop a personal leadership philosophy."
  duration="8 weeks"
  format="Cohort-based"
  href="/contact"
  delay={0}
/>
```

**Features**:
- Hover effect (lift + shadow)
- Metadata display (duration, format)
- Arrow indicator
- Automatic link styling

---

## Typography Components

### Headings

All headings use serif font (Crimson Pro):

```tsx
// Display (hero only)
<h1 className="text-display font-serif">
  Exceptional headline
</h1>

// H1 (page titles)
<h1 className="text-h1 font-serif">
  Page Title
</h1>

// H2 (section titles)
<h2 className="text-h2 font-serif">
  Section Title
</h2>

// H3 (subsections)
<h3 className="text-h3 font-serif">
  Subsection Title
</h3>

// H4 (small headings)
<h4 className="text-h4 font-serif">
  Small Heading
</h4>
```

### Body Text

Body text uses sans-serif font (Inter):

```tsx
// Large body (introductions)
<p className="text-body-lg text-ink-600">
  Introductory paragraph with emphasis.
</p>

// Standard body (main text)
<p className="text-body text-ink-600">
  Primary reading text for articles and content.
</p>

// Small body (secondary)
<p className="text-body-sm text-ink-500">
  Secondary information or metadata.
</p>

// Caption (labels)
<span className="text-caption uppercase tracking-wider text-sage-700">
  Category Label
</span>
```

---

## Layout Patterns

### Page Container

Every page section should use:

```tsx
<div className="max-w-container mx-auto px-6 lg:px-12">
  {/* Content */}
</div>
```

### Content Width Constraints

For reading content:

```tsx
// Standard reading width (65ch)
<div className="max-w-prose">
  <p>Lorem ipsum...</p>
</div>

// Wide reading width (75ch)
<div className="max-w-prose-wide">
  <p>Lorem ipsum...</p>
</div>
```

### Grid Layouts

**Three-column grid**:
```tsx
<div className="grid md:grid-cols-3 gap-8">
  <Card>{/* Content */}</Card>
  <Card>{/* Content */}</Card>
  <Card>{/* Content */}</Card>
</div>
```

**Two-column split**:
```tsx
<div className="grid lg:grid-cols-2 gap-16 items-center">
  <div>{/* Text content */}</div>
  <div>{/* Visual content */}</div>
</div>
```

---

## Animation Patterns

### Fade In on Load

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

### Slide Up on Load

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

### Scroll-Triggered

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

### Staggered Animation

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

### Hover Effects

```tsx
// Subtle lift
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>

// Scale
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```

---

## Form Patterns

### Input Field

```tsx
<div>
  <label 
    htmlFor="name" 
    className="block text-body-sm font-medium text-ink-700 mb-3"
  >
    Your Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    required
    className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
    placeholder="Enter your full name"
  />
</div>
```

### Textarea

```tsx
<textarea
  id="message"
  name="message"
  required
  rows={6}
  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors resize-none"
  placeholder="Your message..."
/>
```

### Select Dropdown

```tsx
<select
  id="interest"
  name="interest"
  required
  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
>
  <option value="">Select an option</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

---

## Best Practices

### Component Usage

1. **Always use design tokens** - No hardcoded colors or sizes
2. **Maintain hierarchy** - Don't skip heading levels
3. **One H1 per page** - Use in Hero component
4. **Generous spacing** - Let content breathe
5. **Consistent animation** - Use existing patterns

### Accessibility

1. **Semantic HTML** - Use proper elements
2. **Labels for inputs** - Always include
3. **Alt text** - For all images (when added)
4. **Focus states** - Visible and consistent
5. **Color contrast** - Test with WCAG tools

### Performance

1. **Use 'use client' sparingly** - Only when needed
2. **Optimize animations** - Transform and opacity only
3. **Lazy load** - For below-fold content
4. **Image optimization** - Use next/image when adding images

### Maintenance

1. **Follow patterns** - Use existing components
2. **Document changes** - Update this guide
3. **Test responsive** - Mobile, tablet, desktop
4. **Check accessibility** - Keyboard and screen reader

---

## Quick Reference

### Common Tailwind Classes

**Spacing**:
- `p-6`, `p-8`, `p-10` - Padding
- `mb-6`, `mb-8`, `mb-12` - Margin bottom
- `gap-4`, `gap-8`, `gap-16` - Grid/flex gap

**Typography**:
- `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4` - Headings
- `text-body-lg`, `text-body`, `text-body-sm` - Body text
- `font-serif`, `font-sans` - Font families

**Colors**:
- `bg-sand-50`, `bg-sage-50`, `bg-white` - Backgrounds
- `text-ink-950`, `text-ink-600`, `text-ink-500` - Text
- `border-sand-200`, `border-sage-300` - Borders

**Layout**:
- `max-w-container`, `max-w-prose` - Width constraints
- `mx-auto` - Center horizontally
- `grid md:grid-cols-3` - Responsive grid

---

**Build with consistency** 🌿
