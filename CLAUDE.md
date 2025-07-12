# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "AEO-MVP" - an AI analysis and optimization platform built with React, TypeScript, and Vite. The project focuses on brand analysis across multiple LLM models, with features for OCR analysis, SEO optimization, and competitor analysis. The main application is located in the `AEO/` directory.

## Development Commands

All commands should be run from the `AEO/` directory:

```bash
cd AEO

# Development
yarn dev              # Start development server with Vite
yarn build           # Build for production (runs TypeScript check first)
yarn preview         # Preview production build locally

# Code Quality
yarn lint            # Run ESLint
yarn format          # Format code with Prettier
yarn format:check    # Check formatting without modifying files
```

## Architecture

### Core Structure
- **Entry Point**: `src/App.tsx` - Minimal wrapper that renders the main application component
- **Main Application**: `src/components/generated/AEOTrackerApp.tsx` - Primary dashboard with navigation and view management
- **Component Architecture**: Generated components in `src/components/generated/` handle specific views:
  - `AEOBrandQueryForm.tsx` - LLM brand query interface
  - `AEODashboardResults.tsx` - Query results display
  - `AEOLLMComparisonDashboard.tsx` - Detailed LLM comparison views

### UI Framework
- **Styling**: Tailwind CSS with shadcn/ui components (New York style)
- **Animations**: Framer Motion for smooth transitions
- **Theme**: Dark theme by default with theme switching capability
- **Icons**: Lucide React icon library

### Key Technologies
- React 19 with TypeScript
- Vite for build tooling
- shadcn/ui component library configured
- Recharts for data visualization
- React Hook Form with Zod validation
- Drag and drop functionality via @dnd-kit

### View Management
The application uses a view-based architecture with these main sections:
- `search` - LLM brand queries
- `comparison` - Detailed LLM analysis
- `ocr` - OCR text analysis
- `seo` - SEO optimization
- `competitors` - Competitor analysis
- `documents` - AI document processing

### Settings and Configuration
- Theme settings in `src/settings/theme.ts`
- Type definitions in `src/settings/types.d.ts`
- Component aliases configured for clean imports (@/components, @/lib, etc.)