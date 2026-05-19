"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
    { title: "Home", href: "#home" },
    { title: "Experience", href: "#experience" },
    { title: "Projects", href: "#projects" },
    { title: "Skills", href: "#skills" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between border px-3 transition-all duration-300 sm:px-4 ${
          isScrolled
            ? "border-border bg-background/82 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-white/10 bg-background/36 backdrop-blur-md"
        }`}
      >
          <motion.a
            href="/"
            className="flex shrink-0 items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-foreground"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src="/Logos/ASKHAN_LOGO.png"
              alt="Logo"
              width={42}
              height={42}
              className="opacity-95 transition-opacity hover:opacity-100 dark:invert dark:brightness-0 dark:contrast-125"
            />
            <span className="hidden sm:block">ASKHAN</span>
          </motion.a>

          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground"
                whileHover={{ y: -1 }}
              >
                {link.title}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] text-foreground/75 transition-colors hover:border-primary/60 hover:text-primary"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? (
                <FaSun className="text-base" aria-hidden />
              ) : (
                <FaMoon className="text-base" aria-hidden />
              )}
            </button>

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 lg:inline-flex"
            >
              Hire me
              <FiArrowUpRight aria-hidden />
            </a>

            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] text-foreground/75 transition-colors hover:border-primary/60 hover:text-primary"
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
            className="mx-auto mt-2 max-w-7xl overflow-hidden border border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 p-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-primary"
                >
                  {link.title}
                </a>
              ))}
              <a
                href="#contact"
                onClick={toggleMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-base font-semibold text-primary-foreground"
              >
                Hire me
                <FiArrowUpRight aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
