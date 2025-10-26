# AdwiseAI Design Guidelines

## Design Approach
**Reference-Based:** Drawing inspiration from modern SaaS platforms like Linear, Stripe, and Vercel - emphasizing clean layouts, strong typography hierarchy, and trust-building elements suitable for a B2B advertising technology startup.

## Typography System
- **Primary Font:** Inter or similar modern sans-serif via Google Fonts
- **Hierarchy:**
  - Hero Headlines: text-5xl to text-6xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Card Titles: text-xl, font-semibold
  - Body Text: text-base to text-lg, font-normal
  - Subtext/Descriptions: text-sm to text-base, opacity-80

## Layout System
**Spacing Units:** Consistently use Tailwind units of 4, 6, 8, 12, 16, 20, and 24 (e.g., p-4, gap-8, my-12)

**Container Strategy:**
- Max-width: max-w-7xl for main content areas
- Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Section vertical spacing: py-16 to py-24

## Navigation Bar
- Fixed transparent/glass-morphism effect navbar at top
- Logo on left, navigation menu items center-right, "Giriş Yap" button on far right
- Height: h-16 to h-20
- Sticky behavior with backdrop blur effect
- Mobile: Hamburger menu with slide-in drawer

## Home Page Structure

**Hero Section:**
- Height: min-h-screen with centered content
- Include large hero background image (abstract tech/AI visualization or workspace with digital overlays)
- Two-column layout on desktop: 60% text content, 40% visual/illustration
- Headline with strong visual hierarchy
- Subheadline with reduced opacity
- Primary CTA button (large, prominent) + secondary "Learn More" link
- Floating gradient orbs or subtle particle effects in background

**Feature Cards Section:**
- 3-column grid on desktop (grid-cols-1 md:grid-cols-3)
- Each card: p-8, rounded-xl, with icon at top, title, and description
- Cards have subtle hover lift effect (transform scale)
- Icon size: w-12 h-12
- Consistent card heights with internal spacing

## About Page Layout
- Full-width hero section with overlay text
- Multi-section layout alternating text and visuals:
  - Mission/Vision: 2-column split (text left, illustration right)
  - How It Works: Timeline or step-by-step cards (3-4 steps)
  - Success Metrics: Stats grid with large numbers (grid-cols-2 lg:grid-cols-4)
- Generous whitespace between sections (space-y-20)

## Packages Page Design
- Centered pricing header with compelling copy
- 3-column pricing cards (grid-cols-1 md:grid-cols-3)
- Card structure:
  - Package name: text-2xl, font-bold
  - Price: text-5xl with currency styling
  - Feature list with checkmark icons (space-y-3)
  - CTA button at card bottom
- Middle card (Professional) highlighted with border treatment and "Most Popular" badge
- Card dimensions: min-h-[600px] for consistency

## Product Information Form
- Single-column centered form: max-w-2xl
- Form sections with clear visual separation (space-y-6)
- Input groups with labels above inputs
- File upload: Drag-and-drop zone with preview area
- Dropdown with custom styling
- Textarea: min-h-[120px]
- Submit button: Full-width on mobile, auto-width on desktop
- Helper text beneath complex inputs

## Authentication Pages (Login/Register)
- Split layout: 50% form, 50% branded visual/gradient on desktop
- Mobile: Full-width form with minimal branding header
- Form container: max-w-md, centered
- Vertical spacing between inputs: space-y-4
- Social proof element: "Trusted by X+ businesses" beneath form
- Links styled as subtle underlined text

## Component Library

**Buttons:**
- Primary: Solid background, font-semibold, px-8 py-3, rounded-lg
- Secondary: Outlined style with hover fill
- Button sizes: Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4)
- Buttons on images: Backdrop blur (backdrop-blur-sm) with semi-transparent background

**Cards:**
- Rounded corners: rounded-xl
- Padding: p-6 to p-8
- Subtle shadow on hover
- Border treatment option for emphasis

**Form Inputs:**
- Consistent height: h-12
- Rounded: rounded-lg
- Focus state with ring
- Label spacing: mb-2

**Icons:**
- Use Lucide React icons throughout
- Consistent sizing: 20-24px for UI icons, 48-64px for feature icons

## Page Transitions
- Framer Motion fade animations between routes
- Duration: 0.3s
- Smooth scroll behavior for anchor links

## Footer
- Multi-column layout (4 columns on desktop, stacked on mobile)
- Sections: Company info, Quick links, Resources, Contact
- Copyright text centered at bottom
- Subtle top border separation

## Images
**Hero Image:** Full-width background image showing modern workspace with digital/AI overlays, screens displaying analytics dashboards, or abstract tech visualization. Should convey innovation and professionalism.

**About Page Images:** 
- AI visualization graphics showing data processing/neural networks
- Campaign dashboard mockups
- Team collaboration imagery (if applicable)

**Package Cards:** Optional decorative icons or small illustrations representing each tier level

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

## Animations (Minimal)
- Page transitions: Fade in/out
- Card hover: Subtle lift (translateY -2px)
- Button hover: Slight scale or glow effect
- Loading states: Skeleton loaders
- No excessive scroll-triggered animations