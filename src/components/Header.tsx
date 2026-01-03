import { useConvexAuth } from "convex/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Button } from "./ui/button";

export function Header() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                M
              </span>
            </div>
            <span className="hidden sm:inline">My App</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {isLoading ? null : isAuthenticated ? (
              <>
                {location.pathname !== "/dashboard" && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                )}
                <UserMenu />
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )
            )}
          </nav>

          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && <UserMenu />}
            {!isAuthenticated && !isAuthPage && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            )}
          </div>
        </div>

        {mobileMenuOpen && !isAuthenticated && !isAuthPage && (
          <div className="md:hidden border-t py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              className="w-full"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
