import { useConvexAuth } from "convex/react";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { UserMenu } from "./components/UserMenu";
import { ThemeProvider } from "./contexts/ThemeContext";

function AuthScreen() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome</h1>
        {showSignUp ? (
          <>
            <SignUp />
            <p className="text-center mt-4 text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setShowSignUp(false)}
              >
                Sign in
              </Button>
            </p>
          </>
        ) : (
          <>
            <SignIn />
            <p className="text-center mt-4 text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setShowSignUp(true)}
              >
                Sign up
              </Button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My App</h1>
          <UserMenu />
        </div>
      </header>
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome! You're now authenticated. Start building your app here.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
