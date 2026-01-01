import { createPageHelper } from "./auth";

async function main() {
  console.log("🚀 Starting demo test with authenticated test user...\n");

  const helper = await createPageHelper();
  const { page } = helper;

  console.log("📍 Testing /dashboard route...");
  await helper.screenshot("demo-dashboard.png");

  const hasDashboard = await page
    .locator("text=Dashboard")
    .isVisible()
    .catch(() => false);
  const hasWelcome = await page
    .locator("text=Welcome")
    .isVisible()
    .catch(() => false);

  console.log(`   ✓ Dashboard visible: ${hasDashboard}`);
  console.log(`   ✓ Welcome message: ${hasWelcome}`);
  console.log(`   ✓ URL: ${page.url()}`);

  console.log("\n📍 Testing /settings route...");
  await helper.goto("/settings");
  await page
    .waitForSelector("text=Settings", { timeout: 5000 })
    .catch(() => {});
  await helper.screenshot("demo-settings.png");

  const pageContent = await page.locator("body").innerText();
  const hasSettings = pageContent.includes("Settings");
  console.log(`   ✓ Settings visible: ${hasSettings}`);
  console.log(`   ✓ URL: ${page.url()}`);

  console.log("\n📍 Testing redirect from / to /dashboard...");
  await helper.goto("/");
  const redirectedToDashboard = page.url().includes("/dashboard");
  console.log(`   ✓ Redirected to dashboard: ${redirectedToDashboard}`);
  console.log(`   ✓ URL: ${page.url()}`);

  await helper.printDebugInfo();

  const allPassed = hasDashboard && hasSettings && redirectedToDashboard;

  if (allPassed) {
    console.log("\n✅ Demo test PASSED - All routes working!");
  } else {
    console.log("\n❌ Demo test FAILED - Some routes not working");
    await helper.close();
    process.exit(1);
  }

  await helper.close();
  console.log("\n🎉 Test complete!\n");
}

main().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
