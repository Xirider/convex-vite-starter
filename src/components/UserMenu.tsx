import { useAuthActions } from "@convex-dev/auth/react";

export function UserMenu() {
  const { signOut } = useAuthActions();

  return (
    <button
      onClick={() => signOut()}
      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}
