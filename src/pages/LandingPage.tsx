import { useConvexAuth } from "convex/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My App</h1>
          <nav className="flex gap-2">
            {isLoading ? null : isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to My App
        </h2>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          A starter template with authentication, routing, and everything you
          need to build your next project.
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
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with Convex, React, and Vite
      </footer>
    </div>
  );
}
