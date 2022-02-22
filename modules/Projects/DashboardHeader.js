/* This example requires Tailwind CSS v2.0+ */

import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="mx-8">
    <div className="md:flex md:items-center md:justify-between mt-10 mb-14">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold">Projects</h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <Link href={router.isReady ? router.asPath + `/add` : "#"}>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Project
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}
