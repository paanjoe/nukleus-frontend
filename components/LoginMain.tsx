import { createClient } from "@/utils/supabase/server";
import { sign } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";

export default async function LoginMain({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const signInAdmin = async (formData: FormData) => {
    "use server";

    const email = process.env.ADMIN_EMAIL || "";
    const password = process.env.ADMIN_PASSWORD || "";
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signInUser = async (formData: FormData) => {
    "use server";

    const email = process.env.USER_EMAIL || "";
    const password = process.env.USER_PASSWORD || "";
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      You're Logged in as, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
      <div>
        <p>
          <Link href="/inventory">Let's go to Inventory!</Link>
        </p>
      </div>
    </div>
  ) : (
    <div>
      <form action={signInAdmin}>
        <button
          type="submit"
          className="text-gray-900 bg-white hover:bg-blue-100 border border-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-600 dark:bg-blue-800 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700 me-2 mb-2"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12c.1 3-.2 6-1 9M7.1 4.4a9 9 0 0 1 13 3.7M3 15v-3a9 9 0 0 1 1.7-5.3m12.9 3c.3.8.4 1.5.4 2.3 0 2 0 4.2-.5 6.2M6 12a6 6 0 0 1 9.4-5M4 21a6 6 0 0 1 1-3.3 5 5 0 0 0 .8-2m8.7 2.5a14 14 0 0 1-1 2.7m-6-1.6C9 17.1 9 14.8 9 12a3 3 0 1 1 6 0v2.3M12 12c0 3 0 6-2 9"
            />
          </svg>
          &nbsp; Login as Administrator
        </button>
      </form>
      <form action={signInUser}>
        <button
          type="submit"
          className="text-gray-900 bg-white hover:bg-green-100 border border-green-200 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-green-600 dark:bg-green-800 dark:border-green-700 dark:text-white dark:hover:bg-green-700 me-2 mb-2"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          &nbsp; Login as Normal User &nbsp;
        </button>
      </form>
    </div>
  );
}
