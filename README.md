# Convex + Vite + React + Tailwind Starter

A full-stack web app template with:
- **Convex** - Backend with real-time database
- **Convex Auth** - Built-in authentication (email/password)
- **Vite** - Fast frontend build tool
- **React** - UI framework
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety

## Quick Start

1. Clone and install:
   ```bash
   git clone https://github.com/zetalabs/convex-vite-starter.git my-app
   cd my-app
   npm install
   ```

2. Set up Convex:
   ```bash
   npx convex dev
   ```

3. Start development:
   ```bash
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- `VITE_CONVEX_URL` - Your Convex deployment URL (set automatically by `npx convex dev`)

## Project Structure

```
├── convex/           # Backend code
│   ├── auth.ts       # Auth configuration
│   ├── http.ts       # HTTP routes for auth
│   └── schema.ts     # Database schema
├── src/
│   ├── components/   # React components
│   ├── App.tsx       # Main app
│   └── main.tsx      # Entry point
├── convex.json       # Convex config
└── package.json
```

## Deployment

Build and deploy:
```bash
npm run build
npx convex deploy
# Deploy dist/ folder to Vercel
```
