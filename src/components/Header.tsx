import { useConvexAuth } from "convex/react";
import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Button } from "./ui/button";

export function Header() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="border-b bg-card">
      <div className="container py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold hover:opacity-80">
          My App
        </Link>
        <nav className="flex gap-2 items-center">
          {isLoading ? null : isAuthenticated ? (
            <>
              {location.pathname !== "/dashboard" && (
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              )}
              <UserMenu />
            </>
          ) : (
            !isAuthPage && (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
