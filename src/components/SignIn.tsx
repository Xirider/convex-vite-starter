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
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Step =
  | "signIn"
  | { type: "forgot"; email?: string }
  | { type: "reset-code"; email: string }
  | { type: "new-password"; email: string; code: string };

export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<Step>("signIn");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (step === "signIn") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async e => {
              e.preventDefault();
              setError("");
              setLoading(true);

              const formData = new FormData(e.currentTarget);
              try {
                await signIn("password", formData);
              } catch {
                setError("Invalid email or password");
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <input name="flow" value="signIn" type="hidden" />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full"
              onClick={() => setStep({ type: "forgot" })}
            >
              Forgot password?
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (step.type === "forgot") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email to receive a reset code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async e => {
              e.preventDefault();
              setError("");
              setLoading(true);

              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              try {
                await signIn("password", formData);
                setStep({ type: "reset-code", email });
              } catch {
                setError("Could not send reset code. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                defaultValue={step.email}
                required
              />
            </div>
            <input name="flow" value="reset" type="hidden" />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("signIn")}
            >
              Back to sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (step.type === "reset-code") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enter Reset Code</CardTitle>
          <CardDescription>We sent a code to {step.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              setError("");
              const formData = new FormData(e.currentTarget);
              const code = formData.get("code") as string;
              setStep({ type: "new-password", email: step.email, code });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="code">Reset Code</Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="Enter code from email"
                autoComplete="one-time-code"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Continue
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep({ type: "forgot", email: step.email })}
            >
              Resend code
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set New Password</CardTitle>
        <CardDescription>Choose a strong password</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async e => {
            e.preventDefault();
            setError("");
            setLoading(true);

            const formData = new FormData(e.currentTarget);
            try {
              await signIn("password", formData);
            } catch {
              setError("Could not reset password. Code may be expired.");
              setStep({ type: "forgot", email: step.email });
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>
          <input name="flow" value="reset-verification" type="hidden" />
          <input name="email" value={step.email} type="hidden" />
          <input name="code" value={step.code} type="hidden" />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setStep("signIn")}
          >
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
