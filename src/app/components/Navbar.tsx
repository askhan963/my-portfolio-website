"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "Experience", href: "#experience" },
    { title: "Projects", href: "#projects" },
    { title: "Skills", href: "#skills" },
    { title: "Education", href: "#education" },
    { title: "Honors", href: "#honors" },
    { title: "My CVs", href: "#my-cvs" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="/"
            className="text-3xl font-bold text-primary shrink-0"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src="/Logos/ASKHAN_LOGO.png"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 dark:invert dark:brightness-0 dark:contrast-125 opacity-95 hover:opacity-100 transition-opacity"
            />
          </motion.a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                whileHover={{ y: -1 }}
              >
                {link.title}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              className="inline-flex rounded-full border border-border bg-muted/80 p-0.5 shadow-sm"
              role="group"
              aria-label="Color theme"
            >
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  theme === "light"
                    ? "bg-card text-primary shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FaSun className="text-base" aria-hidden />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-card text-primary shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FaMoon className="text-base" aria-hidden />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="text-2xl text-muted-foreground hover:text-foreground p-1"
                whileHover={{ scale: 1.05 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border"
          >
            <div className="px-2 pt-2 pb-4 space-y-0.5 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-foreground/90 hover:bg-muted hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
