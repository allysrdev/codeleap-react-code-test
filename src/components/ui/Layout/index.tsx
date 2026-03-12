import { SignOutIcon } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useUser } from "../../../features/auth/hooks/useUser";

export default function Layout() {
  const { setUser } = useUser();
  function handleSignOut() {
    setUser(null);
  }
  return (
    <div data-testid="layout" className="min-h-screen flex justify-center">
      <Toaster position="top-right" richColors />
      <div className="w-full min-h-screen sm:max-w-[50%] flex flex-col">
        <header className="bg-[#7695EC] p-8! flex justify-between">
          <h1 className="text-2xl font-bold text-white">CodeLeap Network</h1>
          <button
            className="cursor-pointer hover:opacity-80"
            onClick={handleSignOut}
          >
            <SignOutIcon className="text-white text-2xl " />
          </button>
        </header>

        <main className="p-5 flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
