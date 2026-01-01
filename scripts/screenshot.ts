import { createPageHelper } from "./auth";

const APP_URL = process.env.APP_URL || "http://localhost:5173";

async function main() {
  console.log(`Opening ${APP_URL}...`);

  const helper = await createPageHelper();

  await helper.screenshot();
  await helper.printPageContent();
  helper.printConsoleLogs();

  await helper.close();
}

main().catch(console.error);
