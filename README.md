# Convex + Vite + React + shadcn/ui Starter

A production-ready full-stack web app template.

> **Viktor Spaces projects**: Your project is already configured with Convex, auth, and email. Skip to [Adding New Variables](#adding-new-variables) if you need to add integrations.

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

### Convex Platform Features

- **Real-time Subscriptions** — Queries automatically update when data changes
- **ACID Transactions** — Mutations are atomic and consistent
- **File Storage** — Upload, store, and serve files with `ctx.storage`
- **Full-Text Search** — Built-in text search with `searchIndex`
- **Vector Search** — Semantic search for AI embeddings with `vectorIndex`
- **Scheduled Functions** — Cron jobs and delayed execution with `ctx.scheduler`
- **HTTP Endpoints** — REST APIs and webhooks via `httpRouter`
- **Authentication** — Convex Auth with multiple providers
- **TypeScript-First** — End-to-end type safety from DB to frontend
- **Pagination** — Cursor-based pagination with `.paginate()`
- **Indexes** — Secondary indexes for efficient queries
- **Environment Variables** — Secure runtime configuration
- **Function Logs** — Real-time logging and debugging
- **Automatic Caching** — Query results cached and invalidated automatically

## Quick Start

Your project is already set up. To start developing:

```bash
# Start Convex backend (watches for changes)
bunx convex dev

# In another terminal, start frontend
bun run dev
```

### For Agents / CI (No Background Terminals)

If you can't run background processes, use these one-shot commands:

```bash
# Push Convex functions once (no watching)
bun run sync

# Push Convex + build frontend in one command
bun run sync:build

# Fetch recent backend logs afterwards (exits after 5s)
bun run logs:fetch
```

The `sync` command uses `convex dev --once` which pushes your functions and exits immediately. Use `bun run logs:fetch` to get recent backend logs (console.log, errors, function executions) — it fetches logs and exits after 5 seconds.

### Troubleshooting

**WebSocket errors with `convex env`**: If you see connection errors, read `.env.local` directly:
```bash
grep VITE_CONVEX_URL .env.local
```

## Scripts

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `bun run dev`        | Start Vite dev server                       |
| `bun run build`      | Build for production                        |
| `bun run sync`       | Push Convex functions once (no watching)    |
| `bun run sync:build` | Push Convex + build frontend in one command |
| `bun run logs`       | Tail Convex backend logs (streaming)        |
| `bun run logs:fetch` | Fetch recent logs and exit (agent-friendly) |
| `bun run check`      | Lint + format check with Biome              |
| `bun run format`     | Format & fix with Biome                     |
| `bun run lint`       | Lint only with Biome                        |
| `bun run screenshot` | Take screenshot of running app              |
| `bun run test:auth`  | Set up test user authentication             |
| `bun run test:demo`  | Run demo test with test user                |

## Project Structure

```
├── convex/              # Backend
│   ├── auth.ts          # Auth config & currentUser query
│   ├── users.ts         # User mutations (deleteAccount)
│   ├── http.ts          # HTTP routes
│   └── schema.ts        # Database schema
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn components (including sidebar)
│   │   ├── AppLayout.tsx     # Authenticated pages layout (with sidebar)
│   │   ├── AppSidebar.tsx    # Sidebar navigation for authenticated users
│   │   ├── Header.tsx        # Public pages header
│   │   ├── PublicLayout.tsx  # Public pages layout (landing, login, signup)
│   │   ├── ProtectedRoute.tsx # Auth guard with loading skeleton
│   │   ├── SignIn.tsx        # Sign in form
│   │   └── SignUp.tsx        # Sign up form
│   ├── pages/           # Page components
│   ├── contexts/        # ThemeContext (with system preference support)
│   ├── hooks/           # use-mobile, usePersistFn, useComposition
│   ├── lib/             # cn() utility
│   ├── App.tsx          # Main app with routes & providers
│   └── index.css        # Tailwind theme (CSS variables)
├── biome.json           # Biome config (linting + formatting)
├── components.json      # shadcn CLI config
└── package.json
```

## Customizing This Starter

This template is designed to be easily customized. Here's how to make it your own:

### 1. Adjust the Design (CSS Variables)

All colors, spacing, and visual tokens are defined in `src/index.css`. Change these to match your brand:

```css
:root {
  /* Primary colors */
  --primary: var(--color-slate-900);     /* Main action color (dark, modern) */
  --primary-foreground: var(--color-white);

  /* Semantic colors */
  --success: var(--color-emerald-600);
  --warning: var(--color-amber-500);
  --info: var(--color-cyan-500);

  /* Chart/accent colors (for stats, icons, highlights) */
  --chart-1: var(--color-teal-500);
  --chart-2: var(--color-orange-500);
  --chart-3: var(--color-cyan-500);
  --chart-4: var(--color-rose-500);
  --chart-5: var(--color-lime-500);

  /* Sidebar */
  --sidebar-width: 16rem;

  --radius: 0.625rem;                    /* Border radius */
  /* ... other tokens */
}
```

Changes here automatically apply to all pages and components.

### 2. Customize Shared Layouts

The project uses shared layout components for consistency:

| Component      | Purpose                                          | Location                          |
| -------------- | ------------------------------------------------ | --------------------------------- |
| `Header`       | Navigation header for public pages               | `src/components/Header.tsx`       |
| `PublicLayout` | Layout for public pages (landing, login, signup) | `src/components/PublicLayout.tsx` |
| `AppLayout`    | Layout for authenticated pages (with sidebar)    | `src/components/AppLayout.tsx`    |
| `AppSidebar`   | Sidebar navigation for authenticated users       | `src/components/AppSidebar.tsx`   |

**Navigation patterns:**
- **Public pages** use `PublicLayout` with a top header
- **Authenticated pages** use `AppLayout` with a sidebar (shadcn/ui sidebar component)
- On mobile, the sidebar becomes a full-screen slide-out menu

**To change the app name or branding** — edit `Header.tsx` (public) and `AppSidebar.tsx` (authenticated).

### 3. Remove Unused Pages

Delete pages you don't need from `src/pages/` and remove their routes from `src/App.tsx`:

```tsx
// src/App.tsx — remove routes you don't need
<Route path="/settings" element={<SettingsPage />} />
```

### 4. Design Your Pages

Each page in `src/pages/` uses the shared UI components from `src/components/ui/`. Design them using:

- **shadcn/ui components** — Button, Card, Input, etc. from `@/components/ui/*`
- **Tailwind utilities** — for layout and custom styling
- **CSS variables** — colors automatically match your theme

## Features

### 🎨 Theming

Full light/dark mode support with OKLCH colors and system preference detection:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();
  if (!switchable) return null;
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

**Theme options in `App.tsx`:**
```tsx
// Use system preference (default)
<ThemeProvider defaultTheme="system" switchable>

// Force light or dark
<ThemeProvider defaultTheme="light" switchable>
<ThemeProvider defaultTheme="dark" switchable>

// Follow system, no toggle
<ThemeProvider defaultTheme="system" switchable={false}>
```

**Priority:** User's saved preference (localStorage) → System preference → Fallback

Customize colors in `src/index.css`:
- `--primary`, `--secondary`, `--accent`, `--destructive`
- `--success`, `--warning`, `--info` (semantic colors)
- `--chart-1` through `--chart-5` (accent colors for stats, icons)
- `--background`, `--foreground`, `--muted`, `--card`
- `--sidebar-*` (sidebar-specific colors)
- `--radius` for border radius

### 🧱 Components

53 pre-installed shadcn/ui components. Add more with:

```bash
bunx shadcn@latest add [component-name]
```

### 📱 Responsive

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

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

### 🛠️ Utility Hooks

| Hook                      | Purpose                                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useIsMobile()`           | Returns `true` when viewport < 768px. Reactive to window resize.                                                                                      |
| `useSidebar()`            | Access sidebar state (open, collapsed, mobile). Must be used inside `SidebarProvider`.                                                                |
| `usePersistFn(fn)`        | Returns a stable function reference that always calls the latest `fn`. Like `useCallback` but never stale.                                            |
| `useComposition(options)` | Handles IME composition for CJK language input. Blocks Enter/Escape during character composition to prevent accidental form submits or dialog closes. |

```tsx
import { useIsMobile } from "@/hooks/use-mobile";
import { usePersistFn } from "@/hooks/usePersistFn";
import { useComposition } from "@/hooks/useComposition";
import { useSidebar } from "@/components/ui/sidebar";
```

## Environment Variables

Your project comes **pre-configured** with all required environment variables. You only need to add new ones when integrating additional services.

### What's Already Set Up

**Local file** (`.env.local`) — already exists, don't modify:
- `CONVEX_DEPLOY_KEY` — Authenticates CLI with your deployment
- `VITE_CONVEX_URL` — Frontend connects to your Convex backend

**Convex deployment** — already configured:
- `AUTH_PRIVATE_KEY` — For Convex Auth JWT signing
- `SITE_URL` — Your app's URL for auth redirects
- `VIKTOR_SPACES_*` — Email sending configuration

### Adding New Variables

When integrating a new service (e.g., OpenAI, Stripe):

```bash
# Set on Convex deployment (takes effect immediately)
bunx convex env set OPENAI_API_KEY "sk-..."
bunx convex env set STRIPE_SECRET_KEY "sk_live_..."
```

Then use in your Convex functions:

```ts
const apiKey = process.env.OPENAI_API_KEY;
```

**Note**: Runtime vars must be set via CLI — they are NOT read from `.env.local`.

### CLI Commands

```bash
# List all env vars on deployment
bunx convex env list

# Set a variable (takes effect immediately, no redeploy needed)
bunx convex env set API_KEY "your-api-key"

# Get a specific variable
bunx convex env get API_KEY

# Remove a variable
bunx convex env remove API_KEY
```

### Adding New Integrations

When your code needs a new API key:

1. **Set on Convex deployment** (takes effect immediately):
   ```bash
   bunx convex env set OPENAI_API_KEY "sk-..."
   ```

2. **Use in your Convex functions**:
   ```ts
   const apiKey = process.env.OPENAI_API_KEY;
   ```

No redeploy needed — env var changes take effect immediately.

## Auth Flows

This starter includes complete email/password authentication with OTP verification.

### Sign Up Flow

```
1. User enters name + email + password
2. Clicks "Sign Up" → OTP code sent to email
3. User enters 6-digit code
4. Account created + signed in
```

### Sign In Flow

```
1. User enters email + password
2. Clicks "Sign In" → Authenticated
```

### Password Reset Flow

```
1. Click "Forgot password?"
2. Enter email → Reset code sent
3. Enter code → Set new password
4. Signed in with new password
```

### Preview Mode (One-Click Test Login)

In preview deployments, a prominent "Continue as Test User" button appears on login/signup pages for instant access without credentials. This is controlled by the `VITE_IS_PREVIEW` environment variable:

- **Preview deployments**: `VITE_IS_PREVIEW=true` → Test login button visible
- **Production deployments**: `VITE_IS_PREVIEW=false` → Test login button hidden

The button automatically signs in as the test user (or creates the account if needed). This is for the user to check out the preview app quickly without needing to login each time.

### Test User (for Automated Testing)

A special test user is available for agents and Playwright testing that bypasses email verification:

| Field    | Value              |
| -------- | ------------------ |
| Email    | `agent@test.local` |
| Password | `TestAgent123!`    |
| Name     | `Test Agent`       |

**Usage with Playwright:**

```ts
import { createPageHelper } from "./scripts/auth";

const helper = await createPageHelper();
// helper.page is now logged in as the test user

// Navigate and interact
await helper.page.goto("http://localhost:5173/some-page");
await helper.page.click("button");

// Debugging helpers
await helper.screenshot("my-screenshot.png");  // Save screenshot
await helper.printPageContent();               // Print page text
helper.printConsoleLogs();                     // Print browser console
await helper.printDebugInfo();                 // Print everything

// Get debug data programmatically
const logs = helper.getConsoleLogs();          // Array of console logs
const content = await helper.getPageContent(); // Page text content
const info = await helper.getDebugInfo();      // Full debug info object

// Clean up
await helper.close();
```

**Console Log Capture:**

```ts
// Console logs are automatically captured
const logs = helper.getConsoleLogs();
// Returns: [{ type: "error", text: "...", timestamp: Date, location: "..." }, ...]

// Filter for errors
const errors = logs.filter(log => log.type === "error");

// Print formatted logs
helper.printConsoleLogs();
// Output:
// 📋 Console Logs:
// ────────────────────────────────────────────────
// ❌ [ERROR] Something went wrong
// ⚠️ [WARNING] Deprecated API used
//    [LOG] Normal log message
// ────────────────────────────────────────────────
```

**How it works:**
- Emails ending in `@test.local` use the `test` auth provider
- The `test` provider creates pre-verified accounts instantly (no OTP required)
- Auth state is cached in `tmp/auth-state.json` for faster subsequent runs
- Browser console logs are captured automatically for debugging

**Scripts:**
- `bun run test:auth` — Set up the test user and print debug info
- `bun run test:demo` — Run demo test with full debugging output
- `bun run screenshot` — Take authenticated screenshot with console logs

### Customizing Auth

Email templates are in `convex/ViktorSpacesEmail.ts`. Modify:
- `subject` — Email subject line
- `heading` / `description` — Email body text
- `maxAge` — OTP expiration (default: 15 minutes)

### Internal Apps (Domain Restriction)

If an internal app is requestted, a good way to approach this is to restrict signups to specific email domains (e.g., only `@yourcompany.com`), modify `convex/ViktorSpacesEmail.ts`:

```ts
const ALLOWED_DOMAINS = ["yourcompany.com", "subsidiary.io"];

export const ViktorSpacesEmail: EmailConfig = {
  async sendVerificationRequest({ identifier: email }) {
    const domain = email.split("@")[1];
    if (!ALLOWED_DOMAINS.includes(domain)) {
      throw new Error("Only company email addresses are allowed");
    }
    // ... rest of the email sending logic
  },
  // ...
};
```

This check runs before the OTP email is sent, so unauthorized domains are rejected immediately during signup.

## HTTP Endpoints

Create API routes in `convex/http.ts`:

```ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Webhook endpoint
http.route({
  path: "/webhooks/stripe",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const body = await req.json();
    
    // Call a mutation to process the webhook
    await ctx.runMutation(internal.payments.handleWebhook, { 
      event: body 
    });
    
    return new Response("OK", { status: 200 });
  }),
});

// Public API endpoint
http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () => {
    return Response.json({ status: "ok" });
  }),
});

export default http;
```

**Note**: Paths are exact (no wildcards). Endpoint URL: `https://your-deployment.convex.site/webhooks/stripe`

## Viktor Tools Integration

This template includes `convex/viktorTools.ts` which lets your app call Viktor's SDK functions (AI search, image generation, etc.) from Convex actions.

### Using the Included Search Action

```tsx
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

function SearchComponent() {
  const search = useAction(api.viktorTools.quickAiSearch);

  const handleSearch = async () => {
    const result = await search({ query: "What is the capital of France?" });
    if (result.success) {
      console.log(result.result);
    }
  };
}
```

### Adding More Tools

Any SDK function can be called via the `callToolGateway` helper. Add new actions to `convex/viktorTools.ts`:

```ts
export const generateImage = action({
  args: { prompt: v.string() },
  handler: async (_ctx, { prompt }) => {
    return await callToolGateway("text2im", { prompt, aspect_ratio: "1:1" });
  },
});
```

The `role` is the SDK tool's identifier, and `arguments` are passed directly to the tool.

## 🎨 Design Guide

### Design Principles

When generating frontend UI, avoid generic patterns that lack visual distinction:

- **Avoid generic full-page centered layouts** — prefer asymmetric/sidebar/grid structures for landing pages and dashboards
- **Match navigation to app type** — use sidebar patterns for internal tools/dashboards, but design custom navigation (top nav, contextual nav) for public-facing apps (forums, communities, e-commerce)
- **Make creative design decisions** — when requirements are vague, choose specific color palettes, typography, and layout approaches
- **Prioritize visual diversity** — combine different design systems (e.g., one color scheme + different typography + another layout principle)
- **Landing pages** — prefer asymmetric layouts, specific color values (not just "blue"), and textured backgrounds over flat colors
- **Dashboards** — use defined spacing systems, soft shadows over borders, and accent colors for hierarchy

### UI & Styling

- **Use shadcn/ui components** for interactions to keep a modern, consistent look; import from `@/components/ui/*`
- **Compose Tailwind utilities** with component variants for layout and states; avoid excessive custom CSS
- **Preserve design tokens** — keep the `@layer base` rules in `src/index.css`. Utilities like `border-border` and `font-sans` depend on them
- **Consistent design language** — use spacing, radius, shadows, and typography via tokens. Extract shared UI into `components/` for reuse
- **Accessibility and responsiveness** — keep visible focus rings and ensure keyboard reachability; design mobile-first with thoughtful breakpoints
- **Theming** — choose dark/light theme in `ThemeProvider`, then manage color palette with CSS variables in `src/index.css`
- **Micro-interactions and empty states** — add motion, empty states, and icons tastefully to improve quality without distraction
- **Placeholder UI elements** — when adding placeholders for not-yet-implemented features, show toast on click ("Feature coming soon")

### Customized Defaults

This template customizes some Tailwind/shadcn defaults for simplified usage:

| Customization              | Behavior                                                                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.container`               | Auto-centered with responsive padding (see `index.css`). Use directly without `mx-auto`/`px-*`. For custom widths, use `max-w-*` with `mx-auto px-4` |
| `.flex`                    | Has `min-width: 0` and `min-height: 0` by default                                                                                                    |
| `button` variant `outline` | Uses transparent background (not `bg-background`). Add bg color class manually if needed                                                             |

### Common Pitfalls

#### Invisible text from theme/color mismatches

Semantic colors (`bg-background`, `text-foreground`) are CSS variables that resolve based on ThemeProvider's active theme. Mismatches cause invisible text.

**Two critical rules:**
1. **Match theme to CSS variables** — if `defaultTheme="dark"` in App.tsx, ensure `.dark {}` in index.css has dark background + light foreground values
2. **Always pair bg with text** — when using `bg-{semantic}`, MUST also use `text-{semantic}-foreground` (not automatic - text inherits from parent otherwise)

```tsx
// ✅ Theme + CSS alignment
<ThemeProvider defaultTheme="dark">  {/* Must match .dark in index.css */}
  <div className="bg-background text-foreground">...</div>
</ThemeProvider>

// ✅ Required class pairs
<div className="bg-popover text-popover-foreground">...</div>
<div className="bg-card text-card-foreground">...</div>
<div className="bg-accent text-accent-foreground">...</div>
```

#### Nested anchor tags in Link components

Wrapping `<a>` tags inside another `<a>` or router's `<Link>` creates nested anchors and runtime errors.

```tsx
// ❌ Bad: <Link><a>...</a></Link>
// ✅ Good: <Link>...</Link> — it already renders an <a> internally
```

#### Empty Select.Item values

Every `<Select.Item>` must have a non-empty `value` prop—never `""`, `undefined`, or omitted.

#### React render-phase side effects

Never call `setState` or navigation in the render phase — wrap in `useEffect`.

## Deployment

Your app is automatically built and deployed when you use the deploy tool.

## Path Aliases

Clean imports with `@/`:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
```

## Convex Cheatsheet

**Queries** = read data (cached, reactive, real-time). **Mutations** = write data (transactional, atomic). **Actions** = side effects (external APIs, no direct DB access).

Quick reference for common gotchas:

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

| Type     | Validator                          | Example               |
| -------- | ---------------------------------- | --------------------- |
| String   | `v.string()`                       | `"hello"`             |
| Number   | `v.number()`                       | `42`, `3.14`          |
| Boolean  | `v.boolean()`                      | `true`                |
| Null     | `v.null()`                         | `null`                |
| ID       | `v.id("tableName")`                | `"jh7..."`            |
| Array    | `v.array(v.string())`              | `["a", "b"]`          |
| Object   | `v.object({ name: v.string() })`   | `{ name: "Jo" }`      |
| Optional | `v.optional(v.string())`           | `undefined` or `"hi"` |
| Union    | `v.union(v.string(), v.null())`    | `"hi"` or `null`      |
| Literal  | `v.literal("admin")`               | `"admin"`             |
| Record   | `v.record(v.string(), v.number())` | `{ a: 1, b: 2 }`      |
