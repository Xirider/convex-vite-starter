import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

const TEST_USER = {
  email: "agent@test.local",
  password: "TestAgent123!",
  name: "Test Agent",
} as const;

export function TestUserLoginSection() {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPreview = import.meta.env.VITE_IS_PREVIEW === "true";

  if (!isPreview) {
    return null;
  }

  const handleTestLogin = async () => {
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.set("email", TEST_USER.email);
    formData.set("password", TEST_USER.password);
    formData.set("flow", "signIn");

    try {
      await signIn("test", formData);
    } catch {
      formData.set("flow", "signUp");
      formData.set("name", TEST_USER.name);
      try {
        await signIn("test", formData);
      } catch {
        setError("Failed to sign in as test user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="border-dashed border-2 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">🧪</span>
            Preview Mode
          </CardTitle>
          <CardDescription>
            This is a preview deployment. Sign in instantly as a test user to
            explore the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleTestLogin}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            size="lg"
          >
            {loading ? "Signing in..." : "Continue as Test User →"}
          </Button>
          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Test user: {TEST_USER.email}
          </p>
        </CardContent>
      </Card>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
          or sign in with your account
        </span>
      </div>
    </>
  );
}
