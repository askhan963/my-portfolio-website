"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { title: "Work", href: "#projects" },
    { title: "Applied AI", href: "#applied-ai" },
    { title: "Experience", href: "#experience" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
        isScrolled
          ? "border-border bg-background/97"
          : "border-transparent bg-transparent"
      }`}
      aria-label="Primary"
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
        >
          <Image
            src="/Logos/ASKHAN_LOGO.png"
            alt="ASKHAN portfolio logo"
            width={32}
            height={32}
            sizes="32px"
            className="opacity-95 dark:invert dark:brightness-0 dark:contrast-125"
          />
          <span className="hidden sm:block">Awais Khan</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <FaSun className="text-sm" aria-hidden />
            ) : (
              <FaMoon className="text-sm" aria-hidden />
            )}
          </button>

          <a
            href="#contact"
            className="hidden items-center border border-border px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:border-primary hover:text-primary lg:inline-flex"
          >
            Hire me
          </a>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="flex h-9 w-9 items-center justify-center border border-border text-foreground/70"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="section-shell flex flex-col py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="border-b border-border py-3 text-base font-medium text-foreground/85"
                >
                  {link.title}
                </a>
              ))}
              <a
                href="#contact"
                onClick={toggleMenu}
                className="mt-3 flex items-center justify-center border border-primary bg-primary px-3 py-3 text-base font-semibold text-primary-foreground"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
