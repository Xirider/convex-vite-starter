import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with Convex, React, and Vite
      </footer>
    </div>
  );
}
