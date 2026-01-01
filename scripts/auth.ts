import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";
import type { Browser, BrowserContext, ConsoleMessage, Page } from "playwright";
import { chromium } from "playwright";
import { TEST_USER } from "./testUser";

const APP_URL = process.env.APP_URL || "http://localhost:5173";
const AUTH_STATE_PATH = join(
  import.meta.dirname,
  "..",
  "tmp",
  "auth-state.json",
);
const TMP_DIR = join(import.meta.dirname, "..", "tmp");

export interface ConsoleLog {
  type: string;
  text: string;
  timestamp: Date;
  location?: string;
}

export interface PageDebugInfo {
  url: string;
  title: string;
  content: string;
  consoleLogs: ConsoleLog[];
}

export class PageHelper {
  private consoleLogs: ConsoleLog[] = [];
  private consoleHandler: ((msg: ConsoleMessage) => void) | null = null;

  constructor(
    public readonly page: Page,
    public readonly browser: Browser,
    public readonly context: BrowserContext,
  ) {
    this.setupConsoleCapture();
  }

  private setupConsoleCapture(): void {
    this.consoleHandler = (msg: ConsoleMessage) => {
      this.consoleLogs.push({
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date(),
        location: msg.location().url,
      });
    };
    this.page.on("console", this.consoleHandler);
  }

  getConsoleLogs(): ConsoleLog[] {
    return [...this.consoleLogs];
  }

  clearConsoleLogs(): void {
    this.consoleLogs = [];
  }

  printConsoleLogs(): void {
    if (this.consoleLogs.length === 0) {
      console.log("\n📋 Console Logs: (none)\n");
      return;
    }
    console.log("\n📋 Console Logs:");
    console.log("─".repeat(60));
    for (const log of this.consoleLogs) {
      const icon =
        log.type === "error" ? "❌" : log.type === "warning" ? "⚠️" : "  ";
      console.log(`${icon} [${log.type.toUpperCase()}] ${log.text}`);
    }
    console.log("─".repeat(60));
  }

  async getPageContent(): Promise<string> {
    return await this.page.locator("body").innerText();
  }

  async printPageContent(): Promise<void> {
    const content = await this.getPageContent();
    console.log("\n📄 Page Content:");
    console.log("─".repeat(60));
    console.log(content || "(empty)");
    console.log("─".repeat(60));
  }

  async getDebugInfo(): Promise<PageDebugInfo> {
    return {
      url: this.page.url(),
      title: await this.page.title(),
      content: await this.getPageContent(),
      consoleLogs: this.getConsoleLogs(),
    };
  }

  async printDebugInfo(): Promise<void> {
    const info = await this.getDebugInfo();
    console.log("\n🔍 Debug Info:");
    console.log("─".repeat(60));
    console.log(`URL: ${info.url}`);
    console.log(`Title: ${info.title}`);
    console.log("─".repeat(60));
    await this.printPageContent();
    this.printConsoleLogs();
  }

  async screenshot(name?: string): Promise<string> {
    await mkdir(TMP_DIR, { recursive: true });
    const filename = name || `screenshot-${Date.now()}.png`;
    const path = join(TMP_DIR, filename);
    await this.page.screenshot({ path, fullPage: true });
    console.log(`📸 Screenshot saved: ${path}`);
    return path;
  }

  async goto(path: string): Promise<void> {
    const url = path.startsWith("http") ? path : `${APP_URL}${path}`;
    await this.page.goto(url, { waitUntil: "networkidle" });
  }

  async close(): Promise<void> {
    await this.browser.close();
  }
}

async function isOnDashboard(page: Page): Promise<boolean> {
  return (
    page.url().includes("/dashboard") ||
    (await page
      .locator("text=Dashboard")
      .isVisible()
      .catch(() => false))
  );
}

export async function ensureTestUserExists(page: Page): Promise<void> {
  await page.goto(`${APP_URL}/signup`, { waitUntil: "networkidle" });

  if (await isOnDashboard(page)) {
    console.log("[Auth] Already logged in");
    return;
  }

  const nameInput = page.locator("input[name='name']");
  const hasNameField = await nameInput.isVisible().catch(() => false);

  if (hasNameField) {
    console.log("[Auth] Creating test user account...");
    await nameInput.fill(TEST_USER.name);
    await page.locator("input[name='email']").fill(TEST_USER.email);
    await page.locator("input[name='password']").fill(TEST_USER.password);
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(1000);

    if (await isOnDashboard(page)) {
      console.log("[Auth] Test user created and logged in");
      return;
    }

    const errorVisible = await page
      .locator("text=Could not create account")
      .isVisible()
      .catch(() => false);
    if (errorVisible) {
      console.log("[Auth] Account may already exist, trying sign in...");
    }
  }

  await signInTestUser(page);
}

export async function signInTestUser(page: Page): Promise<void> {
  await page.goto(`${APP_URL}/login`, { waitUntil: "networkidle" });

  if (await isOnDashboard(page)) {
    console.log("[Auth] Already logged in");
    return;
  }

  console.log("[Auth] Signing in as test user...");
  await page.locator("input[name='email']").fill(TEST_USER.email);
  await page.locator("input[name='password']").fill(TEST_USER.password);
  await page.locator("button[type='submit']").click();

  await page.waitForTimeout(3000);

  if (!(await isOnDashboard(page))) {
    console.log("[Auth] Refreshing page to check auth state...");
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
  }

  try {
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    console.log("[Auth] Signed in successfully");
  } catch {
    await mkdir(TMP_DIR, { recursive: true });
    await page.screenshot({ path: join(TMP_DIR, "auth-debug.png") });
    const content = await page.locator("body").innerText();
    console.log("[Auth] Page content after sign-in attempt:", content);
    throw new Error("Failed to sign in - Dashboard not visible");
  }
}

export async function saveAuthState(page: Page): Promise<void> {
  await mkdir(TMP_DIR, { recursive: true });
  const context = page.context();
  await context.storageState({ path: AUTH_STATE_PATH });
  console.log(`[Auth] Auth state saved to ${AUTH_STATE_PATH}`);
}

export async function loadAuthState(): Promise<string | undefined> {
  if (existsSync(AUTH_STATE_PATH)) {
    console.log(`[Auth] Loading auth state from ${AUTH_STATE_PATH}`);
    return AUTH_STATE_PATH;
  }
  return undefined;
}

export async function createAuthenticatedBrowser(): Promise<{
  browser: Browser;
  page: Page;
}> {
  const storageState = await loadAuthState();
  const browser = await chromium.launch();
  const context = await browser.newContext(
    storageState ? { storageState } : {},
  );
  const page = await context.newPage();

  await page.goto(`${APP_URL}/dashboard`, { waitUntil: "networkidle" });

  if (!(await isOnDashboard(page))) {
    await ensureTestUserExists(page);
    await saveAuthState(page);
  }

  return { browser, page };
}

export async function createPageHelper(): Promise<PageHelper> {
  const storageState = await loadAuthState();
  const browser = await chromium.launch();
  const context = await browser.newContext(
    storageState ? { storageState } : {},
  );
  const page = await context.newPage();

  const helper = new PageHelper(page, browser, context);

  await page.goto(`${APP_URL}/dashboard`, { waitUntil: "networkidle" });

  if (!(await isOnDashboard(page))) {
    await ensureTestUserExists(page);
    await saveAuthState(page);
  }

  return helper;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    console.log("Setting up test user authentication...");
    const helper = await createPageHelper();
    console.log("Test user is ready!");
    await helper.printDebugInfo();
    await helper.close();
  })().catch(console.error);
}
