import { Link } from "react-router-dom";
import { SignIn } from "@/components/SignIn";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome</h1>
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
