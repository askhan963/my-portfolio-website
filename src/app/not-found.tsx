"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">404</h1>
      <p className="text-xl mt-4 text-gray-600 dark:text-gray-400">
        This page could not be found.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-5 py-2 rounded-full font-medium text-blue-500 dark:text-teal-400 border border-blue-500 dark:border-teal-400 hover:bg-blue-50 dark:hover:bg-teal-900 transition-colors"
      >
        ⬅ Back to Home
      </button>
    </div>
  );
}
