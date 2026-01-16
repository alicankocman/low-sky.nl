# UX Structure & Page Layouts

Complete overview of user experience design, information architecture, and page-by-page layout decisions.

## Table of Contents
1. [User Journey](#user-journey)
2. [Information Architecture](#information-architecture)
3. [Page Layouts](#page-layouts)
4. [Design Decisions](#design-decisions)
5. [Interaction Patterns](#interaction-patterns)

---

## User Journey

### Primary Path

```
Landing Page
    ↓
Discover value proposition & philosophy
    ↓
[Choice Point]
    ↓                          ↓
Programs Page          Self-Discovery Test
    ↓                          ↓
Learn about offerings   Answer 5 questions
    ↓                          ↓
Contact Form           Test Results
    ↓                          ↓
Apply/Inquire          Programs or Contact
```

### Secondary Paths

- **Direct to Test**: For users wanting immediate self-discovery
- **Direct to Contact**: For users with specific questions
- **Programs → Test**: Natural progression to understand fit
- **Test → Programs**: Guided by personality insights

---

## Information Architecture

### Site Map

```
Home (/)
│
├── Programs (/programs)
│   ├── New Personal Leadership [future detail page]
│   └── Leadership in Residence [future detail page]
│
├── Self-Discovery (/test)
│   └── Results (/test/result)
│
└── Contact (/contact)
```

### Navigation Structure

**Primary Navigation** (visible on all pages)
- Home
- Programs
- Self-Discovery
- Contact

**Footer Navigation** (secondary)
- Same as primary nav
- Email contact
- Copyright info

---

## Page Layouts

### 1. Landing Page (/)

**Purpose**: Establish trust, communicate philosophy, invite exploration

**Structure**:
```
[Navigation - Fixed]

[Hero Section - Centered]
- Eyebrow: None
- Headline: Value proposition
- Description: Supporting paragraph
- CTAs: [Explore Programs] [Begin Self-Discovery]

[Philosophy Section - Left-aligned]
- Eyebrow: "Our Approach"
- Title: Core belief statement
- Description: Extended explanation
- 3-Column Cards:
  • Self-Awareness
  • Intentionality
  • Presence

[Journey Section - Accent Background]
- Two-column split (50/50)
- Left: Text content + CTA
- Right: Quote card
- Visual balance and breathing room

[CTA Section - Centered]
- Focused call-to-action
- Two options: Programs or Contact

[Footer]
```

**Key UX Decisions**:
- Centered hero creates focus and calm
- Three principles establish credibility without overwhelming
- Quote adds humanity and authority
- Multiple CTAs respect different user intents

---

### 2. Programs Page (/programs)

**Purpose**: Present both programs clearly, help users choose

**Structure**:
```
[Navigation - Fixed]

[Hero Section - Left-aligned]
- Eyebrow: "Programs"
- Headline: "Two paths, one journey"
- Description: Positioning statement

[Programs Section]
- Large Program Cards (stacked)
  • Title
  • Description (2-3 sentences)
  • Metadata (Duration, Format)
  • "Learn more →" link
- Generous spacing between cards

[CTA Section - Accent Background, Centered]
- "Not sure which program?"
- CTAs: [Take Assessment] [Contact Us]

[Footer]
```

**Key UX Decisions**:
- Stacked cards prevent comparison paralysis
- Equal visual weight shows equal value
- Metadata helps practical decision-making
- Assessment CTA provides alternative path
- No pricing yet (human conversation first)

---

### 3. Self-Discovery Test (/test)

**Purpose**: Facilitate honest self-reflection, gather insights

**Structure**:

**Entry State**:
```
[Navigation]

[Hero - Centered]
- Eyebrow: "Self-Discovery"
- Headline: Invitational statement
- Description: Frame the experience

[Preparation Card]
- "Before you begin" heading
- Time estimate
- 3 guidelines (bullet points)
- Privacy note
- [Begin Assessment] button

[Footer]
```

**Test State**:
```
[Navigation]

[Progress Bar]
- Question N of 5
- Percentage visual

[Question Card]
- Large, readable question
- 4 answer options (radio-style buttons)
- Visual feedback on selection

[Navigation Controls]
- [← Previous] [Next →]
- Next disabled until answer selected

[Footer hidden to reduce distraction]
```

**Key UX Decisions**:
- Preparation screen sets expectations
- One question at a time maintains focus
- Progress indicator reduces uncertainty
- Large touch targets for mobile
- Can go back (reduces anxiety)
- No time pressure
- Clean, distraction-free interface

---

### 4. Test Results (/test/result)

**Purpose**: Provide meaningful insights, guide next steps

**Structure**:
```
[Navigation]

[Hero - Centered]
- Eyebrow: "Your Results"
- Headline: Personality type title
- Description: Type summary

[Strengths Card]
- Title: "Your Strengths"
- Introduction paragraph
- 4-5 bullet points
- Staggered animation entrance

[Growth Areas Card]
- Title: "Growth Edges"
- Introduction paragraph
- 3-4 bullet points
- Staggered animation entrance

[CTA Section - Accent Background, Centered]
- "Continue your journey"
- Context paragraph
- CTAs: [Explore Programs] [Discuss Results]

[Footer]
```

**Key UX Decisions**:
- Positive framing ("Growth Edges" not "Weaknesses")
- Balanced view (strengths + growth)
- Specific, actionable insights
- Clear next steps
- Option to discuss (human connection)
- Results stored in sessionStorage (not permanent)

---

### 5. Contact Page (/contact)

**Purpose**: Facilitate human connection, gather context

**Structure**:

**Form State**:
```
[Navigation]

[Hero - Left-aligned]
- Eyebrow: "Get in Touch"
- Headline: Invitation to connect
- Description: Reassuring context

[Form Card]
- Name field (required)
- Email field (required)
- Interest dropdown (required)
  • New Personal Leadership
  • Leadership in Residence
  • Discussing assessment results
  • General inquiry
- Message textarea (required)
- Privacy note
- [Send Message] button

[Alternative Contact Section - Accent Background]
- Email address
- Response time expectation

[Footer]
```

**Success State**:
```
[Navigation]

[Hero - Centered]
- Eyebrow: "Thank You"
- Headline: Confirmation
- Description: Next steps + timeline
- CTAs: [View Programs] [Take Assessment]
```

**Key UX Decisions**:
- Simple, focused form (minimal fields)
- Interest dropdown provides context
- Message field allows open expression
- Privacy reassurance
- No aggressive marketing
- Clear response time expectations
- Success state offers continued engagement

---

## Design Decisions

### Layout Philosophy

**Editorial Approach**
- Inspired by premium magazines (Kinfolk, Monocle)
- Content-first, minimal chrome
- Typography leads the design
- Whitespace as a design element

**Vertical Rhythm**
- Consistent 8px base unit
- Section spacing: 80-136px
- Breathing room between elements
- Predictable, comfortable pacing

**Horizontal Constraints**
- Max width 1280px for main content
- Reading text constrained to 65-75 characters
- Side padding: 24px mobile, 48px desktop
- Generous margins prevent crowding

### Typography Hierarchy

**Every page follows this pattern**:
1. Eyebrow (optional): Context/category
2. Headline: Main message (serif, large)
3. Description: Supporting detail (sans-serif, comfortable)
4. Body content: Paragraphs, cards, details
5. CTAs: Clear action paths

**Heading Scale Creates Hierarchy**:
- H1: Page purpose
- H2: Major sections
- H3: Subsections, cards
- H4: Small divisions

### Color Strategy

**Backgrounds**:
- `sand-50`: Default page background (warm, not stark white)
- `sage-50`: Accent sections (subtle shift, maintains calm)
- `white`: Cards (elevation through color, not shadow)
- `ink-950`: Dark sections (rare, high contrast)

**Text**:
- `ink-950`: Headlines (maximum legibility)
- `ink-600`: Body text (comfortable reading)
- `ink-500`: Secondary text (de-emphasized)

**Accents**:
- `sage-700`: Primary CTAs (natural, inviting)
- `sage-600`: Active states, borders
- Minimal use maintains impact

### Component Decisions

**Button Hierarchy**:
- **Primary** (sage-700): Main action on any screen
- **Secondary** (outlined): Alternative action
- **Ghost**: Tertiary action, less important

**Card Design**:
- White background (elevation)
- Thin border (subtle definition)
- No shadow (maintains calm)
- Generous padding (content breathes)
- Optional hover lift (interactive feedback)

**Navigation**:
- Fixed position (always accessible)
- Backdrop blur (modern, premium)
- Animated underline on active (subtle indicator)
- No hamburger on desktop (respect the space)

---

## Interaction Patterns

### Micro-interactions

**Hover States**:
- Color shift (200ms ease-in-out)
- Subtle lift on cards (4px, 200ms)
- Underline reveal on links
- Background color on ghost buttons

**Focus States**:
- Visible ring (sage-500, 2px)
- Offset from element (2px)
- Consistent across all interactive elements

**Active States**:
- Slightly darker than hover
- Immediate feedback
- No lag or delay

### Macro-interactions

**Page Transitions**:
- Fade in on initial load (600ms)
- Staggered element entrance
- Scroll-triggered animations for below-fold content

**Form Interactions**:
- Immediate field validation (visual only)
- Disabled state on invalid submit
- Success state with next actions
- Error states (future): Clear, helpful messages

**Test Flow**:
- Progress indicator updates
- Smooth question transitions (slide)
- Selected state clearly visible
- Navigation controls enable/disable appropriately

### Scroll Behavior

**Smooth Scrolling**:
- Enabled globally
- Anchor links slide smoothly
- Reduced motion respected

**Scroll-Triggered Animation**:
- `whileInView` on most sections
- `once: true` (no repeat)
- Subtle (20px slide + fade)
- Enhances, doesn't distract

**Sticky Elements**:
- Navigation bar only
- Footer scrolls naturally
- No sticky CTAs (not aggressive)

---

## Responsive Strategy

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations

**Navigation**:
- Same links (no hamburger)
- Horizontal scroll if needed
- Logo stays prominent

**Typography**:
- Display scales down (5.5rem → 2.5rem)
- Line height slightly tighter
- Still generous, readable

**Layout**:
- Single column stacks
- Cards full-width
- CTA buttons stack vertically
- Padding reduces (48px → 24px)

**Forms**:
- Fields full-width
- Larger touch targets (44px min)
- Dropdowns native on mobile

### Desktop Enhancements

- Multi-column layouts
- Larger typography scale
- More generous spacing
- Side-by-side CTAs
- Richer hover interactions

---

## Accessibility Considerations

### Inclusive by Default

**Color Contrast**:
- All text combinations meet WCAG AA
- High contrast mode support
- No color-only indicators

**Keyboard Navigation**:
- Logical tab order
- Visible focus states
- Skip links (if needed)
- All functionality accessible

**Screen Readers**:
- Semantic HTML structure
- Descriptive labels
- Alt text for images (when added)
- ARIA attributes where needed

**Motion**:
- Respects `prefers-reduced-motion`
- Animations enhance, don't obstruct
- No auto-playing content

---

## Content Strategy

### Voice & Tone

**Characteristics**:
- Calm, never urgent
- Confident, not arrogant
- Thoughtful, not preachy
- Human, not corporate

**Language Patterns**:
- "You" language (direct address)
- Questions that invite reflection
- Active voice preferred
- Short paragraphs (3-4 sentences)

### Copy Principles

1. **Invitational**: "Begin your journey" not "Start now!"
2. **Affirming**: Focus on growth, not fixing
3. **Clear**: Simple language, no jargon
4. **Specific**: Concrete examples, not abstract concepts
5. **Spacious**: Let ideas land, don't rush

---

## Performance Considerations

### Current Optimizations

- Next.js App Router (fast by default)
- Font display swap (no FOIT)
- CSS in Tailwind (optimized bundle)
- Minimal JavaScript (only Framer Motion)
- No images yet (will need optimization)

### Future Optimizations

- Image optimization (next/image)
- Code splitting (dynamic imports)
- Lazy loading below fold
- CDN for static assets
- Font subsetting

---

## Design System Benefits

### Consistency
- Every component follows the same patterns
- Colors from defined palette
- Typography from type scale
- Spacing from spacing system

### Scalability
- New pages use existing components
- Design tokens ensure coherence
- Patterns are repeatable
- No design debt

### Maintainability
- Single source of truth (Tailwind config)
- Clear documentation
- Predictable behavior
- Easy to update globally

---

**Designed with intention, built for clarity** 🌿
