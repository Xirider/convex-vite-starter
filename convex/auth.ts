import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ViktorSpacesEmail } from "./ViktorSpacesEmail";

// Decode base64 AUTH_PRIVATE_KEY if present (set by automated deployment)
const authPrivateKey = process.env.AUTH_PRIVATE_KEY;
if (authPrivateKey && !authPrivateKey.startsWith("-----BEGIN")) {
  // Key is base64 encoded, decode it
  const decoded = Buffer.from(authPrivateKey, "base64").toString("utf-8");
  process.env.AUTH_PRIVATE_KEY = decoded;
}

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      verify: ViktorSpacesEmail,
    }),
  ],
});
