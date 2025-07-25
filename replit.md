# InvestIn MVP - Trading Platform for Movies & IPL Teams

## Overview

InvestIn is a comprehensive trading platform MVP where users can buy and sell shares of movies and IPL teams as tradable assets, inspired by HSX (Hollywood Stock Exchange). The application features a wallet-based demo credit system using "InvestIn Coin (IVC)" as the primary currency, with rich HSX-style UI components, detailed asset views, portfolio management, transaction history, and comprehensive market data visualization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: React Query (@tanstack/react-query) for server state, React Context for local state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: TailwindCSS with custom CSS variables for theming
- **Build Tool**: Vite with React plugin

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **API Pattern**: RESTful APIs with JSON responses
- **Request Handling**: Express middleware for JSON parsing and logging
- **Error Handling**: Centralized error middleware

### Data Storage Solutions

- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Storage Interface**: Abstract storage layer with in-memory implementation for development

### Authentication and Authorization

- **Session Management**: Session-based authentication using connect-pg-simple
- **User Model**: Simple username/password system
- **Authorization**: Basic user-based resource access control

## Key Components

### Database Schema

- **Users**: User accounts with balance tracking
- **Assets**: Movies and IPL teams with pricing data
- **Portfolios**: User holdings and average prices
- **Transactions**: Buy/sell transaction history
- **Watchlists**: User-curated asset tracking

### API Endpoints

- `/api/assets` - Asset listing and filtering
- `/api/portfolio` - User portfolio management
- `/api/transactions` - Transaction history and creation
- `/api/watchlist` - Watchlist management

### Frontend Pages

Complete HSX-inspired trading platform with rich static data:
- Dashboard - Portfolio overview with IVC wallet balance and market summary
- Marketplace - Comprehensive asset browsing with news ticker, top movers, trending assets
- Movies - Dedicated movie assets page with detailed cards, search, filtering, and asset detail views
- IPL Teams - IPL franchise trading with team statistics and performance metrics
- Portfolio - Holdings management with P&L tracking (uses existing backend integration)
- Watchlist - Asset tracking functionality (uses existing backend integration)
- Transactions - Complete trading history (uses existing backend integration)
- Leaderboard - User rankings (placeholder)
- News - Market updates (placeholder)
- Settings - User preferences (placeholder)

### UI Components

- Responsive sidebar navigation with mobile support
- Header with balance display and quick actions
- Comprehensive component library via shadcn/ui
- Custom styling with brand colors and theming

## Data Flow

1. **Asset Data**: Assets are fetched from the backend and cached using React Query
2. **User Interactions**: Trading actions trigger API calls to update portfolios and transactions
3. **Real-time Updates**: Query invalidation ensures fresh data after transactions
4. **State Management**: React Query handles server state, React Context for UI state

## External Dependencies

### Production Dependencies

- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **UI Components**: Extensive Radix UI component library
- **Form Handling**: React Hook Form with Zod resolvers
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel React for image galleries
- **Icons**: Lucide React icon library

### Development Tools

- **Build**: Vite with TypeScript support
- **Database Migrations**: Drizzle Kit
- **Development Server**: tsx for TypeScript execution
- **Bundling**: esbuild for production builds

## Deployment Strategy

### Development

- **Server**: Development server with Vite integration
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Database**: Environment variable configuration for DATABASE_URL

### Production

- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. esbuild bundles backend to `dist/index.js`
- **Serving**: Express serves static files and API routes
- **Database**: PostgreSQL via connection string
- **Environment**: Node.js production environment

### Configuration

- **TypeScript**: Shared tsconfig for client, server, and shared code
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)
- **ESM Modules**: Full ES module support throughout the stack
- **Environment Variables**: Database URL and other secrets via .env

## Recent Changes (July 25, 2025)

### InvestIn MVP Complete Implementation
- **Custom Currency System**: Replaced INR/₹ with "InvestIn Coin (IVC)" throughout the application with custom logo and formatting
- **Static Data Integration**: Implemented comprehensive static data system with 5 movie assets and 6 IPL team assets, each with:
  - Detailed information, pricing, charts, news feeds, market cap, volume data
  - HSX-style visual representation with posters/logos and rich UI cards
- **Enhanced Components**: 
  - AssetCard component with compact and full view modes, mini price charts
  - AssetDetail component with comprehensive asset information, news feeds, trading actions
  - IVCLogo component with gradient design and currency formatting utilities
- **Market Features**:
  - Live news ticker with scrolling animation on marketplace
  - Top gainers/losers sections with real-time data
  - Market overview dashboard with statistics
  - Search, filtering, and sorting functionality across all asset pages
- **Navigation System**: Complete asset detail views accessible from all main pages (Movies, IPL Teams, Marketplace)
- **Trading Integration**: Full trading modal integration with IVC currency conversion for existing wallet system
- **Responsive Design**: Mobile-first approach with grid layouts optimized for all screen sizes

### Technical Improvements
- **Data Architecture**: Created comprehensive static data structure in `/client/src/data/assets.ts`
- **Component Library**: Enhanced shadcn/ui integration with custom Badge, IVC display components
- **Type Safety**: Proper TypeScript integration with asset data conversion utilities
- **CSS Animations**: Custom news ticker animation and enhanced visual feedback

The application now provides a complete HSX-inspired trading experience with rich static data, comprehensive asset management, and professional-grade UI components, ready for user interaction and further backend integration.

The application follows a monorepo structure with clear separation between client, server, and shared code, enabling efficient development and deployment workflows.