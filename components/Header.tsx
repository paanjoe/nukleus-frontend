import Link from "next/link";
import LoginMain from "./LoginMain";

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
      <p>
        <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          The backend is on free-tier plan, so it might take up to 50 seconds to
          start the back-end service for the first time.
        </span>
        <br />
        <br />
        <a
          href="https://github.com/paanjoe/nukleus-frontend"
          target="_blank"
          className="bg-red-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 dark:hover:underline hover:underline"
        >
          Front-End Repo Click Here{" "}
        </a>
        <a
          href="https://github.com/paanjoe/nukleus-backend"
          target="_blank"
          className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 dark:hover:underline hover:underline"
        >
          Back-End Repo Click Here{" "}
        </a>
        <a
          href="https://github.com/paanjoe/nukleus-domain"
          target="_blank"
          className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 dark:hover:underline hover:underline"
        >
          Domain Repo Click Here{" "}
        </a>
        <a
          href="https://www.figma.com/file/AE6vCE7lwxDaMI32c0nVWk/%5BFarhan%5D-GovTech-Assessment-Brainstorm-Board?type=whiteboard&t=ewtZZiMzR75Sc1k7-1"
          target="_blank"
          className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 dark:hover:underline hover:underline"
        >
          Figma Documentation{" "}
        </a>
      </p>
      <LoginMain />
    </div>
  );
}
