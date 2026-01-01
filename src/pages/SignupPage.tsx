import { SignUp } from "@/components/SignUp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome</h1>
        <SignUp />
        <p className="text-center mt-4 text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
