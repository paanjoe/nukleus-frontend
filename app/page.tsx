import AuthButton from "../components/AuthButton";
import Header from "@/components/Header";
import NavLogo from "../components/NavLogo";
import UserManagementButton from "@/components/UserManagementButton";

import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <NavLogo />
          {isSupabaseConnected ? (
            <>
              <UserManagementButton /> <AuthButton />
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
      </div>
    </div>
  );
}
