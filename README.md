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
npx convex dev

# In another terminal, start frontend
npm run dev
```

### For Agents / CI (No Background Terminals)

If you can't run background processes, use these one-shot commands:

```bash
# Push Convex functions once (no watching)
npm run sync

# Push Convex + build frontend in one command
npm run sync:build

# Fetch recent backend logs afterwards (exits after 5s)
npm run logs:fetch
```

The `sync` command uses `convex dev --once` which pushes your functions and exits immediately. Use `npm run logs:fetch` to get recent backend logs (console.log, errors, function executions) — it fetches logs and exits after 5 seconds.

### Agent/Sandbox Environment Notes

If you're running in a sandboxed environment:

1. **PATH issues**: If `bun` or `npm` are not found, set PATH explicitly:
   ```bash
   export PATH="$HOME/.bun/bin:$HOME/.local/bin:$PATH"
   ```

2. **WebSocket errors with `convex env`**: If you see WebSocket connection errors, read `.env.local` directly as a fallback:
   ```bash
   grep VITE_CONVEX_URL .env.local
   ```

3. **Playwright issues**: Ensure Playwright browsers are installed:
   ```bash
   npx playwright install chromium
   ```

## Scripts

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Start Vite dev server                       |
| `npm run build`      | Build for production                        |
| `npm run sync`       | Push Convex functions once (no watching)    |
| `npm run sync:build` | Push Convex + build frontend in one command |
| `npm run logs`       | Tail Convex backend logs (streaming)        |
| `npm run logs:fetch` | Fetch recent logs and exit (agent-friendly) |
| `npm run check`      | Lint + format check with Biome              |
| `npm run format`     | Format & fix with Biome                     |
| `npm run lint`       | Lint only with Biome                        |
| `npm run screenshot` | Take screenshot of running app              |
| `npm run test:auth`  | Set up test user authentication             |
| `npm run test:demo`  | Run demo test with test user                |

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
npx shadcn@latest add [component-name]
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

### 🛠️ Utility Hooks

| Hook                      | Purpose                                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useIsMobile()`           | Returns `true` when viewport < 768px. Reactive to window resize.                                                                                      |
| `usePersistFn(fn)`        | Returns a stable function reference that always calls the latest `fn`. Like `useCallback` but never stale.                                            |
| `useComposition(options)` | Handles IME composition for CJK language input. Blocks Enter/Escape during character composition to prevent accidental form submits or dialog closes. |

```tsx
import { useIsMobile } from "@/hooks/useMobile";
import { usePersistFn } from "@/hooks/usePersistFn";
import { useComposition } from "@/hooks/useComposition";
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
npx convex env set OPENAI_API_KEY "sk-..."
npx convex env set STRIPE_SECRET_KEY "sk_live_..."
```

Then use in your Convex functions:

```ts
const apiKey = process.env.OPENAI_API_KEY;
```

**Note**: Runtime vars must be set via CLI — they are NOT read from `.env.local`.

### CLI Commands

```bash
# List all env vars on deployment
npx convex env list

# Set a variable (takes effect immediately, no redeploy needed)
npx convex env set API_KEY "your-api-key"

# Get a specific variable
npx convex env get API_KEY

# Remove a variable
npx convex env remove API_KEY
```

### Adding New Integrations

When your code needs a new API key:

1. **Set on Convex deployment** (takes effect immediately):
   ```bash
   npx convex env set OPENAI_API_KEY "sk-..."
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
- `npm run test:auth` — Set up the test user and print debug info
- `npm run test:demo` — Run demo test with full debugging output
- `npm run screenshot` — Take authenticated screenshot with console logs

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
