import { createPageHelper } from "./auth";

async function main() {
  console.log("🚀 Starting demo test with authenticated test user...\n");

  const helper = await createPageHelper();
  const { page } = helper;

  console.log("\n📸 Taking screenshot of authenticated dashboard...");
  await helper.screenshot("demo-test.png");

  console.log("\n🔍 Verifying authenticated state...");
  const hasDashboard = await page
    .locator("text=Dashboard")
    .isVisible()
    .catch(() => false);
  const hasWelcome = await page
    .locator("text=Welcome")
    .isVisible()
    .catch(() => false);
  const hasUserMenu = await page
    .locator(
      "[data-testid='user-menu'], button:has-text('Sign out'), .user-menu",
    )
    .first()
    .isVisible()
    .catch(() => false);

  console.log(`   ✓ Dashboard visible: ${hasDashboard}`);
  console.log(`   ✓ Welcome message: ${hasWelcome}`);
  console.log(`   ✓ User menu visible: ${hasUserMenu}`);

  await helper.printDebugInfo();

  if (hasDashboard) {
    console.log("\n✅ Demo test PASSED - User is authenticated!");
  } else {
    console.log("\n❌ Demo test FAILED - User is not authenticated");
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
