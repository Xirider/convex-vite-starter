import { useConvexAuth } from "convex/react";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { UserMenu } from "./components/UserMenu";
import { useState } from "react";

function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome</h1>
          {showSignUp ? (
            <>
              <SignUp />
              <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignUp(false)}
                  className="text-blue-500 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </>
          ) : (
            <>
              <SignIn />
              <p className="text-center mt-4 text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My App</h1>
          <UserMenu />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-600">
            Welcome! You're now authenticated. Start building your app here.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
