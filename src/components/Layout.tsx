import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="container py-6 md:py-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
