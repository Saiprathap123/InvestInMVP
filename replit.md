# InvestIn MVP - Trading Platform for Movies & IPL Teams

## Overview

InvestIn is a trading platform where users can buy and sell shares of movies and IPL teams as tradable assets. The application is built as a full-stack web application with a React frontend and Express backend, featuring a modern UI with TailwindCSS and shadcn/ui components.

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

Navigation-first architecture with placeholder screens:
- Dashboard - Overview and portfolio summary
- Marketplace - Asset browsing and trading
- Movies - Movie-specific assets
- IPL Teams - Cricket team assets
- Portfolio - Holdings management
- Watchlist - Tracked assets
- Transactions - Trading history
- Leaderboard - User rankings
- News - Market updates
- Settings - User preferences

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

The application follows a monorepo structure with clear separation between client, server, and shared code, enabling efficient development and deployment workflows.