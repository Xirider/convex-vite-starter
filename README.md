# Convex + Vite + React + shadcn/ui Starter

A production-ready full-stack web app template.

## Stack

- **Convex** — Real-time backend & database
- **Convex Auth** — Email/password authentication
- **Vite** — Lightning-fast dev server & build
- **React 19** — UI framework
- **Tailwind CSS v4** — CSS-native utility styling with theming
- **shadcn/ui** — 53 beautiful, accessible components
- **TypeScript** — Full type safety
- **Bun** — Fast package manager & runtime

## Quick Start

```bash
# Install dependencies
bun install

# Start Convex backend (in one terminal)
bunx convex dev

# Start frontend (in another terminal)
bun run dev
```

## Scripts

| Command          | Description           |
| ---------------- | --------------------- |
| `bun run dev`    | Start Vite dev server |
| `bun run build`  | Build for production  |
| `bun run check`  | TypeScript type check |
| `bun run format` | Format with Prettier  |
| `bun run lint`   | Lint with ESLint      |

## Project Structure

```
├── convex/              # Backend
│   ├── auth.ts          # Auth config
│   ├── http.ts          # HTTP routes
│   └── schema.ts        # Database schema
├── src/
│   ├── components/
│   │   └── ui/          # 53 shadcn components
│   ├── contexts/        # ThemeContext
│   ├── hooks/           # useIsMobile, etc.
│   ├── lib/             # cn() utility
│   ├── App.tsx          # Main app with providers
│   └── index.css        # Tailwind theme
├── components.json      # shadcn CLI config
└── package.json
```

## Features

### 🎨 Theming

Full light/dark mode support with OKLCH colors:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

Customize colors in `src/index.css`:
- `--primary`, `--secondary`, `--accent`, `--destructive`
- `--background`, `--foreground`, `--muted`, `--card`
- `--radius` for border radius

### 🧱 Components

53 pre-installed shadcn/ui components. Add more with:

```bash
bunx shadcn@latest add [component-name]
```

### 📱 Responsive

```tsx
import { useIsMobile } from "@/hooks/useMobile";

function Layout() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNav /> : <DesktopNav />;
}
```

### 🔔 Toasts

```tsx
import { toast } from "sonner";

toast.success("Saved!");
toast.error("Something went wrong");
```

### 🛡️ Error Handling

App-level `ErrorBoundary` catches errors gracefully.

## Deployment

```bash
bun run build
bunx convex deploy
# Deploy dist/ to Vercel, Netlify, etc.
```

## Path Aliases

Clean imports with `@/`:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
```
