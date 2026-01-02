import { useConvexAuth } from "convex/react";
import { Navigate, Outlet } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container py-4 flex justify-between items-center">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </header>
      <main className="container py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
