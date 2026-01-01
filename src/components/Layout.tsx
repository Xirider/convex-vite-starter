import { Outlet } from "react-router-dom";
import { UserMenu } from "./UserMenu";

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My App</h1>
          <UserMenu />
        </div>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
}
