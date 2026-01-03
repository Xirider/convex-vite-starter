import { Link } from "react-router-dom";
import { SignUp } from "@/components/SignUp";
import { TestUserLoginSection } from "@/components/TestUserLoginSection";
import { Button } from "@/components/ui/button";

export function SignupPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TestUserLoginSection />
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
