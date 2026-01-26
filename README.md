# GarmentoAI - AI-Powered Product Photo Studio

Studio-Quality Fashions. Where Fashions Meets AI. Transform simple product photos into stunning e-commerce shoots with AI models. Save 90% on photoshoot costs and generate professional images in minutes.

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query

## Getting Started

### Prerequisites

- Node.js & npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd web-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3001`

## Project Structure

- `src/pages/dashboard/CreatePage.tsx` - Main image generation page (dynamic, uses API)
- `src/lib/api.ts` - API service for backend integration
- `src/components/` - Reusable UI components
- `src/assets/` - Static assets (images for landing page)

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1/webapp
```

## Building for Production

```sh
npm run build
```

The production build will be in the `dist` directory.

## License

Copyright © 2024 GarmentoAI. All rights reserved.
