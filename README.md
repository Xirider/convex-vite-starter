# Convex + Vite + React + shadcn/ui Starter

A production-ready full-stack web app template.

## Stack

- **Convex** — Real-time backend & database
- **Convex Auth** — Email/password authentication
- **Vite** — Lightning-fast dev server & build
- **React 19** — UI framework
- **Tailwind CSS v4** — CSS-native utility styling with theming
- **shadcn/ui** — 53 beautiful, accessible components
- **Biome** — Fast linter & formatter (replaces ESLint + Prettier)
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

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `bun run dev`        | Start Vite dev server          |
| `bun run build`      | Build for production           |
| `bun run check`      | Lint + format check with Biome |
| `bun run format`     | Format & fix with Biome        |
| `bun run lint`       | Lint only with Biome           |
| `bun run screenshot` | Take screenshot of running app |

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
├── biome.json           # Biome config (linting + formatting)
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

## Convex Cheatsheet

Quick reference for common gotchas.

### Function Syntax

**Always include `returns` validator** (use `v.null()` for void functions):

```ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { id: v.id("users") },
  returns: v.union(v.object({ name: v.string() }), v.null()),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  returns: v.null(), // Required even when returning nothing
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
```

### Public vs Internal Functions

```ts
// Public (exposed to clients)
import { query, mutation, action } from "./_generated/server";

// Internal (only callable from other Convex functions)
import { internalQuery, internalMutation, internalAction } from "./_generated/server";
```

### Calling Functions

```ts
import { api, internal } from "./_generated/api";

// From mutation/action:
await ctx.runQuery(api.users.get, { id });        // public query
await ctx.runQuery(internal.users.getInternal, { id }); // internal query
await ctx.runMutation(internal.users.update, { id, name });

// Same-file calls need type annotation:
const result: string = await ctx.runQuery(api.example.f, { name: "Bob" });
```

### Queries

```ts
// ❌ Don't use filter()
const users = await ctx.db.query("users").filter(q => q.eq(q.field("email"), email));

// ✅ Use withIndex() (define index in schema first)
const users = await ctx.db.query("users").withIndex("by_email", q => q.eq("email", email));

// ❌ No .delete() on queries
await ctx.db.query("users").delete();

// ✅ Collect and delete individually
const users = await ctx.db.query("users").collect();
for (const user of users) {
  await ctx.db.delete(user._id);
}

// Get single document
const user = await ctx.db.query("users").withIndex("by_email", q => q.eq("email", email)).unique();
```

### Schema

```ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
  })
    .index("by_email", ["email"])           // Name = "by_" + field names
    .index("by_role_and_name", ["role", "name"]), // Multi-field index
});
```

### Actions

```ts
// Actions can't access ctx.db directly
export const sendEmail = internalAction({
  args: { userId: v.id("users"), message: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    // ❌ ctx.db.get(args.userId) - doesn't work in actions
    
    // ✅ Call a query to get data
    const user = await ctx.runQuery(internal.users.get, { id: args.userId });
    
    await fetch("https://api.email.com/send", { ... });
    return null;
  },
});
```

### Types

```ts
import { Id, Doc } from "./_generated/dataModel";

// Typed IDs
function getUser(userId: Id<"users">) { ... }

// Full document type
function formatUser(user: Doc<"users">) { ... }

// Record with ID keys
const cache: Record<Id<"users">, string> = {};
```

### Validators Reference

| Type | Validator | Example |
|------|-----------|---------|
| String | `v.string()` | `"hello"` |
| Number | `v.number()` | `42`, `3.14` |
| Boolean | `v.boolean()` | `true` |
| Null | `v.null()` | `null` |
| ID | `v.id("tableName")` | `"jh7..."` |
| Array | `v.array(v.string())` | `["a", "b"]` |
| Object | `v.object({ name: v.string() })` | `{ name: "Jo" }` |
| Optional | `v.optional(v.string())` | `undefined` or `"hi"` |
| Union | `v.union(v.string(), v.null())` | `"hi"` or `null` |
| Literal | `v.literal("admin")` | `"admin"` |
| Record | `v.record(v.string(), v.number())` | `{ a: 1, b: 2 }` |
