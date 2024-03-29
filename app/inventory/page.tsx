import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DeployButton from "@/components/NavLogo";
import AuthButton from "@/components/AuthButton";
import UserManagementButton from "@/components/UserManagementButton";
import Inventory from "@/components/Inventory";
import ProtectedBanner from "@/components/ProtectedBanner";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  } else {
    user;
  }

  const { data, error } = await supabase.auth.getSession();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <ProtectedBanner />
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <UserManagementButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col">
          <h2 className="font-bold text-2xl text-center">Inventory Lists</h2>
          <Inventory jwt={data.session.access_token} userId={user.id} />
        </main>
      </div>
    </div>
  );
}
