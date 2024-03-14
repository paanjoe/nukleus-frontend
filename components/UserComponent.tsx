import Link from "next/link";

export default function UserComponent({ data }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center gap-4 mb-8">
        <Link
          // type="button"
          href="/inventory"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go to Inventory
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col items-center mb-8">
        <p className="text-2xl font-medium text-gray-900 dark:text-yellow-400 mb-4">
          Here is your JSON Data from Database:
        </p>
        <span className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full md:max-w-lg">
          <pre className="font-normal text-yellow-400 dark:text-green-400 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </span>
      </div>
      <p className="py-2 px-4 rounded-md no-underline"></p>
    </div>
  );
}
