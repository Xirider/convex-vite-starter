import { Link } from "react-router-dom";
import { SignIn } from "@/components/SignIn";
import { TestUserLoginSection } from "@/components/TestUserLoginSection";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TestUserLoginSection />
        <SignIn />
        <p className="text-center mt-4 text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
