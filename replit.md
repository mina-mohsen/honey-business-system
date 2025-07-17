# Home Honey System

## Overview

This is a full-stack web application for managing a honey business operations including customers, orders, inventory batches, and sales reporting. The system is built with a modern tech stack using React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM.

**Current Status**: Fully functional with real business data imported from Excel files, complete AED currency display, and integrated honey business logo.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 2025)

### Dashboard and Reports Consolidation
- **Page Merger**: Merged dashboard and reports pages into single comprehensive Reports & Analytics page
- **Enhanced Filtering**: Combined advanced filtering capabilities from dashboard with reporting features
- **Unified Navigation**: Updated navigation to show Reports as home page, removed duplicate dashboard entry
- **Complete Feature Set**: Consolidated page includes all metrics, charts, filtering, and analytics from both pages

### Data Import and Logo Integration
- **Real Data Integration**: Successfully imported actual business data from Excel file including:
  - 3 agents with Egyptian and UAE contact information  
  - 3 import batches with flight details and arrival dates
  - 18 unique customers with contact details
  - 25 orders with complete transaction history
- **Logo Integration**: Added honey business logo from https://i.imgur.com/RyOUc9f.jpeg to mobile navigation
- **Currency Standardization**: Updated all currency displays throughout application to show AED instead of USD
- **Filtering System**: Implemented comprehensive date range and batch filtering functionality

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom honey-themed color scheme
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with JSON responses
- **Validation**: Zod schemas for request/response validation

### Mobile-First Design
- Responsive design with mobile-first approach
- Custom mobile navigation with collapsible sidebar
- Adaptive table components that switch between cards (mobile) and tables (desktop)
- Touch-friendly interfaces and proper touch targets

## Key Components

### Database Schema
- **Customers**: Customer information with contact details and location
- **Agents**: Import agents with Egyptian and UAE phone numbers, passport info
- **Batches**: Import batches with flight details and arrival dates
- **Batch Products**: Individual products within batches with cost breakdown
- **Orders**: Customer orders linked to customers and batches

### Frontend Components
- **Pages**: Dashboard, Orders, Customers, Batches, Reports
- **Forms**: Customer creation/editing, Order management, Batch management
- **UI Components**: Mobile-responsive tables, navigation, dialogs
- **Shared Components**: Mobile table wrapper, form components

### Backend Services
- **Storage Layer**: Abstracted database operations with TypeScript interfaces
- **API Routes**: CRUD operations for all entities
- **Database Connection**: Neon serverless PostgreSQL with connection pooling

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express routes handle requests with validation
3. **Database Operations**: Storage layer performs CRUD operations via Drizzle ORM
4. **Response**: JSON responses sent back to client
5. **State Updates**: React Query manages cache invalidation and updates

### Key Data Relationships
- Orders belong to Customers and reference Batches
- Batches contain multiple Batch Products and belong to Agents
- Customers have multiple Orders with statistics aggregation
- Products track cost breakdown (purchase, shipping, local costs)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **react-hook-form**: Form management with validation
- **zod**: Schema validation for TypeScript
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **API Server**: Express server running on Node.js
- **Database**: Neon serverless PostgreSQL
- **Environment**: Replit-optimized with development banners

### Production Build
- **Frontend**: Vite builds optimized React bundle
- **Backend**: esbuild compiles TypeScript to ESM
- **Database**: Same Neon serverless instance
- **Deployment**: Single build command creates dist folder

### Environment Configuration
- **DATABASE_URL**: Required environment variable for database connection
- **Build Scripts**: Separate dev, build, and production start scripts
- **Database Migrations**: Drizzle kit for schema management

### Mobile Optimization
- **Progressive Web App**: Mobile-first design with responsive breakpoints
- **Touch Interfaces**: Optimized for mobile interaction
- **Performance**: Lazy loading and optimized bundle sizes