# AdwiseAI - AI-Powered Ad Management Platform

## Overview

AdwiseAI is a SaaS platform that provides AI-powered advertising strategies and automated ad management for Meta (Facebook & Instagram). The platform enables users to optimize their advertising campaigns through intelligent targeting, real-time performance tracking, and automated campaign management. It features a modern, tech-forward design inspired by platforms like Linear, Stripe, and Vercel, with a Turkish-language interface.

The application follows a full-stack architecture with a React-based frontend and Express backend, utilizing PostgreSQL for data persistence and session management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with Vite as the build tool and development server
- **Language:** TypeScript with JSX support
- **Styling:** Tailwind CSS with a custom design system based on shadcn/ui components
- **State Management:** TanStack Query (React Query) for server state management
- **Routing:** React Router for client-side navigation
- **Form Handling:** React Hook Form with Zod validation via @hookform/resolvers

**Component System:**
- Utilizes shadcn/ui component library (New York style variant) with Radix UI primitives
- Custom theming system supporting both light and dark modes via CSS variables
- Comprehensive UI component library including forms, dialogs, cards, navigation, and data display components
- Design follows a modern SaaS aesthetic with glass-morphism effects, subtle animations, and clean typography hierarchy

**Design Principles:**
- Typography: Inter font family with hierarchical sizing (text-5xl/6xl for heroes down to text-sm for descriptions)
- Spacing: Consistent Tailwind spacing units (4, 6, 8, 12, 16, 20, 24)
- Layout: Max-width containers (max-w-7xl) with responsive padding
- Color System: Custom HSL-based color palette with semantic naming (primary, secondary, muted, accent, destructive)
- Interactive Elements: Hover and active state elevations using CSS custom properties

**Key Pages:**
- Home (`/`) - Hero section with value proposition and feature cards
- About (`/about`) - Company mission and AI system explanation
- Packages (`/packages`) - Three-tier pricing structure (Starter $10, Professional $50, Enterprise $150)
- Product Entry (`/product`) - Form for adding product information with AI targeting
- Authentication (`/login`, `/register`) - User authentication flows

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for HTTP server and API routing
- **Build Tool:** esbuild for production bundling, tsx for development

**Server Configuration:**
- Development mode uses Vite middleware for HMR and client-side routing
- Production mode serves static files from dist/public
- Custom logging middleware for API request tracking
- JSON body parsing with raw body preservation for webhooks

**API Design:**
- RESTful API endpoints prefixed with `/api`
- Session-based authentication with credentials included
- Standardized error handling with JSON responses
- Request/response logging under 80 characters for readability

**Storage Layer:**
- Abstracted storage interface (`IStorage`) for CRUD operations
- In-memory storage implementation (`MemStorage`) as default
- Designed to be swappable with database-backed implementations
- User entity with id, username, and password fields

### Data Storage

**Database:**
- **ORM:** Drizzle ORM with drizzle-zod for schema validation
- **Database:** PostgreSQL (configured via Neon serverless adapter)
- **Migration:** Drizzle Kit for schema migrations (output to `./migrations`)
- **Schema Location:** Shared schema definitions in `shared/schema.ts`

**Session Management:**
- connect-pg-simple for PostgreSQL-backed sessions
- Session data stored in database for persistence across server restarts

**Current Schema:**
- Users table with UUID primary keys (generated via `gen_random_uuid()`)
- Username uniqueness constraint
- Password storage (implementation should use hashing)

### External Dependencies

**Third-Party Services:**
- **Meta Ads Platform:** Core integration for Facebook & Instagram ad management (API integration to be implemented)
- **Neon Database:** Serverless PostgreSQL hosting via @neondatabase/serverless
- **Google Fonts:** Inter font family for typography

**Development Tools:**
- **Replit Integration:** Custom Vite plugins for development environment
  - @replit/vite-plugin-runtime-error-modal for error overlay
  - @replit/vite-plugin-cartographer for code navigation
  - @replit/vite-plugin-dev-banner for development banner

**UI Libraries:**
- Radix UI primitives for accessible component foundations
- Embla Carousel for image carousels
- Recharts for data visualization
- cmdk for command palette interfaces
- Vaul for drawer components
- Lucide React for icons

**Utility Libraries:**
- clsx and tailwind-merge (via cn utility) for className composition
- class-variance-authority for component variant management
- date-fns for date manipulation
- nanoid for unique ID generation

**Authentication:**
- Session-based authentication design (implementation pending)
- Password hashing should be implemented before production

**Future Integrations:**
- Meta Business SDK for ad campaign management
- AI/ML service for intelligent ad targeting and optimization
- Payment processing for package purchases
- Email service for notifications and reports