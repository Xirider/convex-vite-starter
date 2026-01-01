import { useConvexAuth } from "convex/react";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function AuthFormSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Skeleton className="h-9 w-32 mx-auto mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
        <Skeleton className="h-5 w-48 mx-auto mt-4" />
      </div>
    </div>
  );
}

export function PublicOnlyRoute() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <AuthFormSkeleton />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
