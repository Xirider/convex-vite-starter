import { useConvexAuth } from "convex/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold tracking-tight mb-4">
        Welcome to My App
      </h2>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        A starter template with authentication, routing, and everything you need
        to build your next project.
      </p>
      {!isAuthenticated && !isLoading && (
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      )}
      {isAuthenticated && (
        <Button size="lg" asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      )}
    </div>
  );
}
