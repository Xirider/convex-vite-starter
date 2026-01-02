import { action } from "./_generated/server";
import { v } from "convex/values";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

export interface ToolGatewayResult {
  success: boolean;
  result?: unknown;
  error?: string;
}

/**
 * Call Viktor's tool gateway to invoke any SDK function.
 *
 * @param role - The tool role identifier (e.g., "quick_ai_search", "text2im")
 * @param args - Arguments to pass to the tool
 * @returns The tool result or error
 *
 * Any SDK function can be called through this gateway. The `role` parameter
 * corresponds to the tool's role identifier, and `args` are the tool's arguments.
 */
export async function callToolGateway(
  role: string,
  args: Record<string, unknown> = {}
): Promise<ToolGatewayResult> {
  const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: PROJECT_NAME,
      project_secret: PROJECT_SECRET,
      role,
      arguments: args,
    }),
  });

  if (!response.ok) {
    return { success: false, error: `HTTP ${response.status}: ${await response.text()}` };
  }

  return await response.json();
}

/**
 * Perform an AI-powered web search.
 * Returns structured search results from the web.
 */
export const quickAiSearch = action({
  args: { query: v.string() },
  handler: async (_ctx, { query }) => {
    return await callToolGateway("quick_ai_search", { search_question: query });
  },
});
