import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import UserRoleComponent from "@/components/UserRoleComponent";
import ProtectedBanner from "@/components/ProtectedBanner";
import DeployButton from "@/components/NavLogo";
import AuthButton from "@/components/AuthButton";
import UserManagementButton from "@/components/UserManagementButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { data, error } = await supabase.auth.getSession();

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

        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <main className="flex-1 flex flex-col">
            <Link
              type="button"
              href={`/inventory`}
              className=" px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Go Back
            </Link>
            <br />
            <br />
            <h2 className="font-bold text-2xl text-center">User Lists</h2>
            <UserRoleComponent jwt={data.session.access_token} />
          </main>
        </div>
      </div>
    </>
  );
}
