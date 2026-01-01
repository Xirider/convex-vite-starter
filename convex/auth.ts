import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ViktorSpacesEmail } from "./ViktorSpacesEmail";

// Decode base64 AUTH_PRIVATE_KEY if present (set by automated deployment)
const authPrivateKey = process.env.AUTH_PRIVATE_KEY;
if (authPrivateKey && !authPrivateKey.startsWith("-----BEGIN")) {
  // Key is base64 encoded, decode it using atob (works in Convex runtime)
  try {
    const decoded = atob(authPrivateKey);
    process.env.AUTH_PRIVATE_KEY = decoded;
  } catch {
    // Already decoded or invalid, leave as-is
  }
}

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      verify: ViktorSpacesEmail,
    }),
  ],
});
