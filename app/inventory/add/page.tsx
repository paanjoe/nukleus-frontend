import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import DeployButton from "@/components/NavLogo";
import AuthButton from "@/components/AuthButton";
import UserManagementButton from "@/components/UserManagementButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProtectedBanner from "@/components/ProtectedBanner";
import { useState, useEffect } from "react";
import AddInventoryComponent from "@/components/AddInventoryComponent";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
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
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3 w-6/12">
          <main className="flex-1 flex flex-col">
            <AddInventoryComponent />
          </main>
        </div>
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>I don't know what to put here.</p>
        </footer>
      </div>
    </>
  );
}
