import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ViktorSpacesEmail } from "./ViktorSpacesEmail";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      verify: ViktorSpacesEmail,
    }),
  ],
});
