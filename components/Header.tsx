import Login from "@/app/login/page";
import LoginMain from "./LoginMain";
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a href="/" rel="noreferrer">
          Farhan Fazli Assessment
        </a>
      </div>
      <h1 className="sr-only">Farhan Fazli Assessment</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Let's begin by choosing which account you want to login with.
      </p>
      <LoginMain />
    </div>
  );
}
