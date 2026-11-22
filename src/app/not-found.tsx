import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Providers>
      <div className="bg-background text-foreground min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="flex h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="section-heading">404 — Page not found</h1>
          <p className="mt-4 max-w-md text-foreground/70">
            The page you're looking for doesn't exist or has moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Back to home
          </Link>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
