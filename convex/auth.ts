import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import {
  ViktorSpacesEmail,
  ViktorSpacesPasswordReset,
} from "./ViktorSpacesEmail";

declare const process: { env: Record<string, string | undefined> };

const authPrivateKey = process.env.AUTH_PRIVATE_KEY;
if (authPrivateKey && !authPrivateKey.startsWith("-----BEGIN")) {
  try {
    const decoded = atob(authPrivateKey);
    process.env.AUTH_PRIVATE_KEY = decoded;
  } catch {
    // Already decoded or invalid
  }
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      verify: ViktorSpacesEmail,
      reset: ViktorSpacesPasswordReset,
    }),
  ],
});

export const currentUser = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});
