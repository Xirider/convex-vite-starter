# Convex + Vite + React + Tailwind Starter

A full-stack web app template with:
- **Convex** - Backend with real-time database
- **Convex Auth** - Built-in authentication (email/password)
- **Vite** - Fast frontend build tool
- **React 19** - UI framework
- **Tailwind CSS v4** - Utility-first styling with CSS-native theming
- **shadcn/ui** - Beautiful, accessible component library
- **TypeScript** - Type safety

## Quick Start

1. Clone and install:
   ```bash
   git clone https://github.com/zetalabs/convex-vite-starter.git my-app
   cd my-app
   bun install
   ```

2. Set up Convex:
   ```bash
   bunx convex dev
   ```

3. Start development:
   ```bash
   bun run dev
   ```

## Features

- 🎨 **52+ shadcn/ui components** pre-installed
- 🌓 **Dark mode** with `ThemeProvider` (toggle with `useTheme()`)
- 🎯 **Path aliases** - Clean imports like `@/components/ui/button`
- 🛡️ **Error boundary** - Graceful error handling
- 📱 **Mobile detection** - `useIsMobile()` hook
- 🔔 **Toast notifications** - Sonner integration
- 💅 **Prettier** configured for consistent code style

## Project Structure

```
├── convex/           # Backend code
│   ├── auth.ts       # Auth configuration
│   ├── http.ts       # HTTP routes for auth
│   └── schema.ts     # Database schema
├── src/
│   ├── components/   # React components
│   │   └── ui/       # shadcn/ui components
│   ├── contexts/     # React contexts (ThemeContext)
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities (cn, etc.)
│   ├── App.tsx       # Main app with providers
│   └── main.tsx      # Entry point
├── components.json   # shadcn/ui CLI config
└── package.json
```

## Adding Components

Use the shadcn CLI to add new components:

```bash
bunx shadcn@latest add [component-name]
```

## Theming

The theme system uses CSS variables with OKLCH colors. Edit `src/index.css` to customize:

- Colors: `--primary`, `--background`, `--foreground`, etc.
- Border radius: `--radius`
- Dark mode: `.dark` class variants

Toggle dark mode in your app:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run check` - Type check
- `bun run format` - Format code with Prettier
- `bun run lint` - Lint code

## Deployment

```bash
bun run build
bunx convex deploy
# Deploy dist/ folder to Vercel/Netlify
```
