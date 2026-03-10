import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="min-h-screen flex justify-center">
      <Toaster position="top-right" richColors />
      <div className="w-full min-h-screen sm:max-w-[50%] flex flex-col">
        <header className="bg-[#7695EC] p-8!">
          <h1 className="text-2xl font-bold text-white">CodeLeap Network</h1>
        </header>

        <main className="p-5 flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
