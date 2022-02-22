/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function AddOrganizationPrompt() {
  return (
    <div className="text-center mt-20">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="black"
        stroke="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 220.805 220.805"
        version="1.1"
        viewBox="0 0 220.805 220.805"
        xmlSpace="preserve"
      >
        <path d="M205.402 220.805h-190a4 4 0 01-4-4V42.001a4 4 0 012.515-3.714l95-38.002a3.998 3.998 0 015.486 3.714v76.097l89.515-35.808a3.998 3.998 0 015.486 3.714v168.803a4.003 4.003 0 01-4.002 4zm-91-8h87V53.91l-87 34.802v124.093zm-95 0h87V9.907l-87 34.802v168.096zm165.333-10.972a4 4 0 01-4-4V162.21h-18.833v35.623a4 4 0 01-8 0V162.21h-18.833v35.623a4 4 0 01-8 0v-93.332a4 4 0 018 0v15.124h18.833v-27.79a4 4 0 018 0v27.79h18.833V82.251a4 4 0 018 0v115.582a4 4 0 01-4 4zm-22.833-47.623h18.833v-26.585h-18.833v26.585zm-26.833 0h18.833v-26.585h-18.833v26.585zm-45.334 47.623a4 4 0 01-4-4v-35.831H66.902v35.831a4 4 0 01-8 0v-35.831H40.069v35.831a4 4 0 01-8 0V61.667a4 4 0 018 0v23.166h18.833V49.002a4 4 0 018 0v35.831h18.833V39.417a4 4 0 018 0v158.416a4 4 0 01-4 4zm-22.833-47.831h18.833v-26.585H66.902v26.585zm-26.833 0h18.833v-26.585H40.069v26.585zm26.833-34.585h18.833V92.833H66.902v26.584zm-26.833 0h18.833V92.833H40.069v26.584z"></path>
      </svg>
      <h3 className="mt-2 text-xl font-medium text-gray-900">No organization</h3>
      <p className="mt-1 text-lg text-gray-500">
        Hmm, seems like you are not part of any organization. Get started by adding an organization.
      </p>

      <div className="mt-6">
        <Link href={"/organizations/add"}>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New organization
          </button>
        </Link>
      </div>
    </div>
  );
}
