import { createPageHelper } from "./auth";

async function main() {
  const args = process.argv.slice(2);
  const path = args[0] || "/";
  const filename = args[1] || `screenshot-${Date.now()}.png`;

  console.log(`📸 Taking screenshot of ${path}...`);

  const helper = await createPageHelper();

  await helper.goto(path);
  await helper.screenshot(filename);
  
  console.log(`\n📍 URL: ${helper.page.url()}`);
  await helper.printPageContent();
  helper.printConsoleLogs();

  await helper.close();
  console.log("\n✅ Done!");
}

main().catch(err => {
  console.error("Failed:", err);
  process.exit(1);
});
