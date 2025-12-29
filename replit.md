# Bitcoin Mining Blog Application

## Overview

This is a full-stack web application built for a Bitcoin mining blog called "BTC Mining Hub". The application features a React frontend with modern UI components, an Express.js backend API, and uses PostgreSQL with Drizzle ORM for data persistence. The application serves blog content focused on Bitcoin mining hardware reviews, guides, news, and analysis.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with a custom Bitcoin-themed design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for blog content
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Fallback Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
The application uses three main entities:
- **Users**: Basic user authentication with username/password
- **Blog Posts**: Complete blog content with metadata (title, slug, content, category, author, etc.)
- **Categories**: Organized content categorization system

### API Endpoints
- `GET /api/blog-posts` - Retrieve all blog posts with optional filtering
- `GET /api/blog-posts/featured` - Get the featured blog post
- `GET /api/blog-posts/:slug` - Get specific blog post by slug
- Search and category filtering capabilities

### Frontend Pages
- **Home**: Featured articles, categorized content, trending widgets
- **Blog Post**: Individual article view with related content
- **Search**: Full-text search functionality
- **Category**: Filtered content by category

### UI Features
- Responsive design optimized for mobile and desktop
- Dark/light theme support with system preference detection
- Bitcoin-themed color scheme and branding
- SEO optimization with meta tags and structured data
- Newsletter signup functionality
- Advertisement space placeholders

## Data Flow

1. **Content Serving**: Blog posts are fetched from PostgreSQL via Drizzle ORM
2. **Client Requests**: React components use TanStack Query to fetch data from Express API
3. **Search**: Real-time search functionality with debounced queries
4. **Navigation**: Client-side routing with Wouter for SPA experience
5. **Theme Management**: React Context API manages theme state with localStorage persistence

## External Dependencies

### Production Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Library**: Radix UI for accessible component primitives
- **Icons**: Lucide React icons and React Icons
- **Date Handling**: date-fns for date formatting and manipulation
- **Form Handling**: React Hook Form with Zod validation

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Type Safety**: Full TypeScript implementation with strict mode
- **Code Quality**: ESLint and TypeScript compiler checks

## Deployment Strategy

### Development
- Vite dev server with hot module replacement
- Express server with TypeScript compilation via tsx
- Database migrations using Drizzle Kit

### Production Build
- Vite builds optimized React application to `dist/public`
- esbuild compiles Express server to `dist/index.js`
- Single deployment artifact with static frontend and API server

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Node.js environment detection for conditional features
- Replit-specific optimizations when `REPL_ID` is present

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### July 08, 2025 - Complete Website Modules Added
- **New Dedicated Pages**: Created comprehensive standalone pages for all major sections:
  - Mining Guides page with difficulty levels and step-by-step tutorials
  - Hardware Reviews page with performance testing and ROI analysis
  - Mining Calculator with real-time profitability calculations and preset machines
  - News page with breaking news and market updates
- **Enhanced Navigation**: Updated header and footer navigation to link to dedicated pages
- **Interactive Features**: Added working calculator with dynamic Bitcoin price integration
- **Content Organization**: Each page has unique hero sections, feature highlights, and filtered content

### July 08, 2025 - UX and Performance Improvements
- **Removed Advertisement Spaces**: Eliminated all ad placeholders per user request for cleaner design
- **Fixed Scroll Issues**: Added automatic scroll-to-top on route changes and smooth scrolling
- **Dynamic Bitcoin Price**: Integrated real-time BTC price data via CoinGecko API with 24h change indicators
- **Enhanced UX Features**:
  - Added floating animations and fade-in-up transitions
  - Implemented reading progress bar for blog posts
  - Added reading time remaining indicator on articles
  - Created scroll-to-top button with glow effects
  - Enhanced newsletter signup with better visual appeal
  - Improved loading states with custom spinner
  - Added hover effects and smooth transitions throughout
- **Visual Improvements**:
  - Enhanced hero section with gradient text and floating animations
  - Added glow effects on key interactive elements
  - Improved card hover animations with scale and transform effects
  - Added subtle background patterns for visual depth

### July 08, 2025 - Initial Setup
- Base Bitcoin mining blog application with React frontend and Express backend
- Complete responsive design with dark/light theme support
- Blog post management with categories and search functionality