"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold text-primary">404</h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-400">
          This page could not be found.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-5 py-2 rounded-full font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
        >
          ⬅ Back to Home
        </button>
      </div>
      <Footer />
    </div>
  );
}
