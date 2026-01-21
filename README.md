# Personal Leadership Platform

A premium, calm, and intentional educational platform for leadership development. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🎯 Project Vision

This platform hosts two educational programs focused on personal leadership development:
1. **New Personal Leadership (NPL)** - Foundation program for emerging leaders
2. **Leadership in Residence (LIR)** - Immersive experience for established leaders

The platform features an **AI-powered leadership reflection dialogue** that helps users discover their leadership patterns through thoughtful conversation, replacing traditional assessment tests.

## ✨ Design Philosophy

- **Calm & Confident**: Generous whitespace, thoughtful typography, subtle animations
- **Human-Centered**: Content breathes, inviting rather than selling
- **Editorial Style**: Premium magazine aesthetic with strong hierarchy
- **Intentional**: Every element serves the user's journey of self-discovery

## 🎨 Design System

### Color Palette

**Sage** - Primary accent (calm, natural)
- `sage-50` to `sage-900`
- Used for: Accents, CTAs, highlights

**Sand** - Warm neutral (grounding)
- `sand-50` to `sand-900`
- Used for: Backgrounds, borders, subtle elements

**Ink** - Text and UI elements
- `ink-50` to `ink-950`
- Used for: Text, borders, dark elements

### Typography Scale

**Headings** (Crimson Pro - Serif)
- `display`: 5.5rem - Hero titles
- `h1`: 3.5rem - Page titles
- `h2`: 2.5rem - Section titles
- `h3`: 2rem - Card/Module titles
- `h4`: 1.5rem - Subsection titles

**Body** (Inter - Sans-serif)
- `body-lg`: 1.25rem - Introductions, highlights
- `body`: 1.125rem - Primary reading text
- `body-sm`: 1rem - Secondary text
- `caption`: 0.875rem - Labels, metadata

### Spacing System

Following an 8px base unit with extended scale:
- Standard: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
- Extended: 18 (4.5rem), 22 (5.5rem), 26 (6.5rem), 30 (7.5rem), 34 (8.5rem)

### Layout Constraints

- `max-w-prose`: 65ch - Optimal reading width
- `max-w-prose-wide`: 75ch - Extended reading width
- `max-w-container`: 1280px - Main content container

## 🏗️ Project Structure

```
personal-leadership/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── programs/
│   │   └── page.tsx            # Programs overview
│   ├── reflection/
│   │   └── page.tsx            # AI chatbot landing page
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts        # AI conversation API
│   │   └── analytics/
│   │       └── route.ts        # Anonymous usage tracking
│   ├── test/
│   │   ├── page.tsx            # [Legacy] Personality assessment
│   │   └── result/
│   │       └── page.tsx        # [Legacy] Test results
│   └── contact/
│       └── page.tsx            # Contact form
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Main navigation
│   │   └── Footer.tsx          # Site footer
│   ├── ui/
│   │   ├── Hero.tsx            # Hero section component
│   │   ├── Section.tsx         # Content section wrapper
│   │   ├── Button.tsx          # Button component
│   │   ├── Card.tsx            # Card component
│   │   └── ProgramCard.tsx     # Program-specific card
│   └── chat/
│       └── ChatInterface.tsx   # AI chatbot interface
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Environment

- **Node.js**: 18.x or higher
- **Package Manager**: npm, yarn, or pnpm

## 📱 Pages & User Flow

### 1. Landing Page (`/`)
- Hero with value proposition
- Philosophy section (3 principles)
- Journey invitation
- Quote/testimonial
- CTA section

### 2. Programs (`/programs`)
- Overview of both programs (NPL & LIR)
- Program cards with details
- CTA to reflection dialogue or contact

### 3. Leadership Reflection (`/reflection`) ⭐ NEW
- **AI-powered conversational experience**
- Landing page with approach explanation
- Privacy & ethics information
- ChatGPT-style dialogue interface
- 4-6 reflective questions about:
  - Decision-making patterns
  - Sense of responsibility
  - Relationship with uncertainty
  - Self-awareness
- User can ask follow-up questions
- Final reflection report with program recommendation
- **No scoring, testing, or categorization**

### 4. Contact (`/contact`)
- Contact form
- Program selection dropdown
- Success state
- Alternative contact info

### 5. Legacy Test Pages (`/test`) 
- [Replaced by /reflection - kept for reference]

## 🎭 Component Usage

### Hero Component

```typescript
<Hero
  title="Your main heading"
  subtitle="Optional eyebrow text"
  description="Supporting paragraph"
  centered={true}
>
  <Button href="/next">Call to Action</Button>
</Hero>
```

### Section Component

```typescript
<Section
  title="Section Title"
  subtitle="Optional label"
  description="Introduction text"
  background="default" | "accent" | "dark"
  spacing="default" | "large" | "small"
  centered={false}
>
  {/* Your content */}
</Section>
```

### Button Component

```typescript
<Button
  href="/path"           // For links
  onClick={handler}      // For actions
  variant="primary" | "secondary" | "ghost"
  size="default" | "large"
>
  Button Text
</Button>
```

### Card Component

```typescript
<Card hover={true} delay={0.1}>
  {/* Card content */}
</Card>
```

## 🎬 Animation Guidelines

### Principles
- **Subtle**: Never distracting or aggressive
- **Purposeful**: Guides attention, indicates hierarchy
- **Performance**: GPU-accelerated (opacity, transform)

### Patterns Used
- **Fade in**: Initial page load elements
- **Slide up**: Sequential content reveal
- **Stagger**: List items, cards (0.1s delays)
- **Hover**: Subtle lift on interactive elements

### Implementation

```typescript
// Using Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  {/* Content */}
</motion.div>
```

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels where needed
- Focus states on all interactive elements
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Responsive typography (rem units)

## 📐 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Strategy
- Desktop-first approach
- Fluid typography
- Flexible grids
- Touch-friendly targets (44px minimum)

## 🎯 UX Principles Applied

1. **Breathing Room**: Generous padding and margins throughout
2. **Visual Hierarchy**: Clear distinction between heading levels
3. **Consistent Rhythm**: Predictable spacing patterns
4. **Progressive Disclosure**: Information revealed as needed
5. **Affirming Feedback**: Success states, hover effects
6. **Respectful Pace**: No aggressive popups or interruptions

## 🛠️ Development Notes

### Current State
- ✅ Complete design system
- ✅ All core pages implemented
- ✅ Responsive layouts
- ✅ Animation framework
- ✅ Component library
- ✅ AI-powered chatbot system
- ✅ Anonymous analytics tracking
- ✅ Markdown-formatted AI responses

### AI Chatbot Features
- ✅ Reflective leadership conversation (not a test)
- ✅ ChatGPT-style dialogue interface
- ✅ Markdown rendering for reports
- ✅ Privacy-first (no user data stored)
- ✅ Anonymous usage metrics only
- ✅ Program recommendations (NPL/LIR)
- ✅ Mobile-responsive chat UI
- ✅ Loading and completion states

### Future Considerations
- OpenAI/Anthropic API integration (currently placeholder)
- Form validation and error states
- 404 and error pages
- SEO optimization (metadata, sitemap)
- Email notifications
- Report download/email functionality
- User accounts (future phase)

## 📝 Content Guidelines

### Voice & Tone
- **Calm**: Never rushed or urgent
- **Confident**: Clear without being prescriptive
- **Human**: Warm, authentic, relatable
- **Thoughtful**: Invites reflection

### Writing Style
- Active voice preferred
- Questions over commands
- "You" language (direct address)
- Avoid jargon and buzzwords
- Short paragraphs (3-4 sentences)

## 🎨 Design Tokens Reference

### Shadows
Currently minimal - borders preferred over shadows for calm aesthetic

### Transitions
- **Duration**: 0.2s (micro), 0.3s (standard), 0.6s (entrance)
- **Easing**: ease-out for entrances, ease-in-out for interactive

### Border Radius
Primarily sharp corners (0px) for editorial feel
- Forms/inputs: Sharp
- Cards: Sharp
- Buttons: Sharp

## 🤝 Contributing

When adding new components or pages:
1. Follow existing patterns
2. Use design system tokens
3. Add subtle animations with Framer Motion
4. Test responsive behavior
5. Ensure accessibility
6. Update documentation 

## 📄 License

This project is private and proprietary.

---

**Built with intention** 🌿
