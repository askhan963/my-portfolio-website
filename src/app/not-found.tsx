import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "@/components/Providers";

export default function NotFound() {
  return (
    <Providers>
      <div className="bg-background text-foreground min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-bold text-primary">404</h1>
          <p className="text-xl mt-4 text-foreground/70">
            This page could not be found.
          </p>
          <Link
            href="/"
            className="mt-6 px-5 py-2 rounded-full font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
          >
            ⬅ Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
