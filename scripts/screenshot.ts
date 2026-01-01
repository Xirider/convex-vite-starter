import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { join } from "path";

const APP_URL = process.env.APP_URL || "http://localhost:5173";
const TMP_DIR = join(import.meta.dirname, "..", "tmp");

async function main() {
  await mkdir(TMP_DIR, { recursive: true });

  console.log(`Opening ${APP_URL}...`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(APP_URL, { waitUntil: "networkidle" });

  const screenshotPath = join(TMP_DIR, `screenshot-${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`\nScreenshot saved: ${screenshotPath}`);

  const content = await page.locator("body").innerText();
  console.log("\n--- Page Content ---\n");
  console.log(content || "(empty)");
  console.log("\n--- End Content ---\n");

  await browser.close();
}

main().catch(console.error);
