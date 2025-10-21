#  GVOS Greenstone CRM

A comprehensive property management and CRM platform for buying, selling, and renting luxury properties in the French Alps, French Riviera, and Languedoc-Roussillon. Built with Next.js 14+, this enterprise-grade system streamlines property management, lead generation, and client relationships.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📸 Screenshots

![AT1](./public/GVOS1.png)

![Property Search](./public/GVOS3.png)

![AT3](./public/GVOS2.png)


---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

---

## ✨ Features

### 🏡 Property Management
- Comprehensive property portfolio (1,126+ properties across 123 developments)
- New build developments tracking in French Alps & Mediterranean Coast
- Property listing with advanced search and filtering
- Multi-location support (13 Ski domains, 27 Riviera locations, 6 Languedoc cities)
- Property variants (Winter/Summer season availability)
- Image galleries with virtual tours
- Price management with VAT/TVA handling and reclaim capabilities

### 🔍 Advanced Search & Discovery
- Location-based search (French Alps, French Riviera, Languedoc-Roussillon)
- Ski domain filtering (Les Portes Du Soleil, Les 3 Vallees, Paradiski, etc.)
- Property type filtering (New Build, For Sale, For Rent)
- Price range and bedroom configuration search
- Reference number quick search
- Interactive map integration with Google Maps

### 👥 CRM & Lead Management
- Complete lead generation system
- Lead qualification workflow
- Customer relationship tracking
- Client communication tools
- Purchase history and preferences
- Inspection visit booking system
- Multi-language support (English, French)

### 💼 Sales & Finance
- Sales progression tracking
- Mortgage provider integration
- VAT/TVA reclaim management for rental properties
- Financial documentation generation
- Transaction history and reporting

### 📊 Portfolio Analytics
- Property performance metrics
- Market analysis by region
- Sales velocity tracking
- Inventory management dashboard
- Revenue analytics and forecasting

### 🌍 Multi-Region Support
- **French Alps**: 13 Ski domains with 800+ properties
- **French Riviera**: 27 locations (Cannes, Antibes, Nice, Monaco, etc.)
- **Languedoc-Roussillon**: 6 coastal cities

### 🏢 Area Guides & Resources
- Comprehensive area guides for buyers
- Local market insights
- Ski resort information and domain details
- Coastal city guides
- Investment opportunity highlights

### 📧 Marketing & Communication
- Newsletter subscription management
- Email marketing campaigns
- Property alerts and notifications
- Customer engagement tools

### 🔐 Security & Compliance
- Role-based access control (Agents, Managers, Admin)
- Secure client data handling
- French property law compliance
- GDPR compliance for EU clients

### 🎨 UI/UX Features
- Responsive design for all devices
- Multi-currency support (EUR, GBP, USD)
- Seasonal theming (Winter/Summer modes)
- Intuitive property browsing
- Interactive property cards
- Advanced filtering interface

---

## 🛠 Tech Stack

### Core
- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React 18+](https://react.dev/)

### Styling & UI Components
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Data & State Management
- **Data Fetching:** React Query / SWR
- **State Management:** Zustand / Context API
- **Forms:** React Hook Form + Zod validation

### Maps & Geolocation
- **Maps:** Google Maps API
- **Geocoding:** Google Geocoding API
- **Location Services:** Custom location services

### Backend Integration
- **API Client:** Axios / Fetch API
- **Authentication:** NextAuth.js / JWT
- **File Upload:** Cloudinary / AWS S3
- **Database:** PostgreSQL / MongoDB

### Development Tools
- **Linting:** ESLint
- **Formatting:** Prettier
- **Git Hooks:** Husky
- **Testing:** Jest + React Testing Library

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** 18.17 or later
- **npm** / **yarn** / **pnpm** / **bun**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gvos-greenstone.git
   cd gvos-greenstone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env.dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Setup

The project supports multiple environments with separate configuration files:

### Environment Files

```
.env.dev         # Development environment
.env.staging     # Staging environment
.env.prod        # Production environment
```

### Required Environment Variables

Create your `.env.dev` file with the following variables:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=GVOS Greenstone
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=https://api.greenstone.com
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/gvos_greenstone

# Google Maps & Geolocation
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_MAPS_API_KEY=your-server-side-maps-key
GOOGLE_GEOCODING_API_KEY=your-geocoding-key

# AWS S3 / File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-west-1
AWS_S3_BUCKET=greenstone-properties

# Cloudinary (Alternative)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payment & Financial Services
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
MORTGAGE_PROVIDER_API_KEY=your-mortgage-api-key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@greenstone.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=info@greenstone.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Currency Exchange
EXCHANGE_RATE_API_KEY=your-exchange-rate-key

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHAT_SUPPORT=true
NEXT_PUBLIC_ENABLE_VAT_CALCULATOR=true
NEXT_PUBLIC_ENABLE_WINTER_THEME=true

# External Services
PROPERTY_VALUATION_API_KEY=your-valuation-key
FRENCH_CADASTRE_API_KEY=your-cadastre-key

# Multi-language Support
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,fr
```

### Environment-Specific Configuration

```bash
# .env.dev - Development settings
NEXT_PUBLIC_API_URL=http://localhost:8000
DEBUG=true
NEXT_PUBLIC_DEFAULT_CURRENCY=EUR

# .env.staging - Staging settings
NEXT_PUBLIC_API_URL=https://staging-api.greenstone.com
DEBUG=true
NEXT_PUBLIC_DEFAULT_CURRENCY=EUR

# .env.prod - Production settings
NEXT_PUBLIC_API_URL=https://api.greenstone.com
DEBUG=false
NEXT_PUBLIC_DEFAULT_CURRENCY=EUR
```

---

## 📜 Available Scripts

### Development

```bash
# Run development server with .env.dev
npm run dev

# Run development server with staging environment
npm run dev:staging

# Run development server with production environment
npm run dev:prod
```

### Building

```bash
# Build for development
npm run build

# Build for staging
npm run build:staging

# Build for production
npm run build:prod
```

### Testing & Quality

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type checking
npm run type-check
```

### Production

```bash
# Start production server
npm run start

# Build and start
npm run build && npm run start
```

### Database & Migrations

```bash
# Run database migrations
npm run db:migrate

# Create new migration
npm run db:migrate:create

# Seed database with sample properties
npm run db:seed

# Reset database
npm run db:reset
```

---

## 📁 Project Structure

```
gvos-greenstone/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public-facing routes
│   │   ├── page.tsx              # Homepage
│   │   ├── buy/                  # Property search & listings
│   │   ├── sell/                 # Sell property flow
│   │   ├── rent/                 # Rental properties
│   │   ├── area-guides/          # Area information
│   │   └── property/             # Property details
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/              # CRM Dashboard routes
│   │   ├── page.tsx              # Main dashboard
│   │   ├── properties/           # Property management
│   │   ├── leads/                # Lead management
│   │   ├── clients/              # Client management
│   │   ├── sales/                # Sales pipeline
│   │   ├── inspections/          # Inspection visits
│   │   ├── analytics/            # Analytics & reports
│   │   ├── finance/              # Financial management
│   │   ├── vat-reclaim/          # VAT reclaim tracking
│   │   ├── marketing/            # Marketing campaigns
│   │   └── settings/             # Settings
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── properties/
│   │   ├── leads/
│   │   ├── search/
│   │   └── upload/
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── property/                 # Property components
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   ├── PropertyFilters.tsx
│   │   ├── PropertyDetails.tsx
│   │   └── PropertyGallery.tsx
│   ├── search/                   # Search components
│   │   ├── SearchBar.tsx
│   │   ├── LocationSearch.tsx
│   │   ├── AdvancedFilters.tsx
│   │   └── MapView.tsx
│   ├── leads/                    # Lead management
│   │   ├── LeadForm.tsx
│   │   ├── LeadTable.tsx
│   │   ├── LeadQualification.tsx
│   │   └── LeadTimeline.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── StatsCard.tsx
│   │   ├── PortfolioChart.tsx
│   │   ├── RecentActivity.tsx
│   │   └── TopProperties.tsx
│   └── shared/                   # Shared components
│       ├── CurrencySelector.tsx
│       ├── LanguageSelector.tsx
│       ├── VATCalculator.tsx
│       └── BookingWidget.tsx
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client
│   ├── auth.ts                   # Authentication utilities
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   ├── validations.ts            # Validation schemas
│   └── currency.ts               # Currency conversion
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useProperties.ts
│   ├── useLeads.ts
│   ├── useSearch.ts
│   └── useCurrency.ts
├── types/                        # TypeScript definitions
│   ├── index.ts
│   ├── property.ts
│   ├── lead.ts
│   ├── client.ts
│   ├── location.ts
│   └── api.ts
├── store/                        # State management
│   ├── authStore.ts
│   ├── propertyStore.ts
│   ├── searchStore.ts
│   └── uiStore.ts
├── config/                       # Configuration files
│   ├── site.ts                   # Site configuration
│   ├── navigation.ts             # Navigation structure
│   ├── locations.ts              # Supported locations
│   └── constants.ts              # App-wide constants
├── public/                       # Static assets
│   ├── images/
│   │   ├── properties/
│   │   ├── areas/
│   │   └── logos/
│   ├── icons/
│   └── fonts/
├── styles/                       # Additional styles
├── .env.dev                      # Development environment
├── .env.staging                  # Staging environment
├── .env.prod                     # Production environment
├── .env.example                  # Environment template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## ⚙️ Configuration

### Next.js Configuration

Edit `next.config.js` to customize your build:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      's3.amazonaws.com',
      'maps.googleapis.com'
    ],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  env: {
    CUSTOM_ENV_VAR: process.env.CUSTOM_ENV_VAR,
  },
}

module.exports = nextConfig
```

### Tailwind Configuration

Customize your design system in `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        greenstone: {
          primary: '#2D5F3F',
          secondary: '#4A8C5E',
          accent: '#87CEEB',
          // Add more brand colors
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure environment variables
   - Deploy!

3. **Set up environment variables**
   - Add all variables from `.env.prod`
   - Configure production API endpoints
   - Add Google Maps API key

4. **Configure domains**
   - Add your custom domain
   - Set up SSL certificates (automatic)


### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Use TypeScript for type safety

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Hosting platform
- [Google Maps](https://developers.google.com/maps) - Maps integration
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Properties](https://img.shields.io/badge/properties-1126-green?style=flat-square)
![Developments](https://img.shields.io/badge/developments-123-orange?style=flat-square)

---

## Getting Started
First, run the development server:

```bash
npm install --legacy-peer-deps
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

npm install -g env-cmd

"build:test": "env-cmd -f .env.staging next build",
"build:live": "env-cmd -f .env.production next build",

## Code deployment // stop server before uploding code.
- pm2 stop gvos (Stop server )
- git pull (from main branch)
- npm install --legacy-peer-deps
- npm run clean
- npm run build
- pm2 start gvos
