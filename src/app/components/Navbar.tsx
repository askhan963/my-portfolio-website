"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes, FaWater, FaTree, FaCoffee } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme, Theme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHidden(true);
        setIsThemeMenuOpen(false); // Close theme menu on scroll
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const themes: { name: Theme; icon: React.ReactNode; label: string }[] = [
    { name: "light", icon: <FaSun />, label: "Light" },
    { name: "dark", icon: <FaMoon />, label: "Dark" },
    { name: "ocean", icon: <FaWater />, label: "Ocean" },
    { name: "forest", icon: <FaTree />, label: "Forest" },
    { name: "coffee", icon: <FaCoffee />, label: "Coffee" },
  ];

  const currentThemeIcon = themes.find((t) => t.name === theme)?.icon || <FaSun />;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="/"
            className="text-3xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/Logos/ASKHAN_LOGO.png"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 dark:invert dark:brightness-0 dark:sepia dark:hue-rotate-[180deg] dark:saturate-200"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {link.title}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="text-2xl text-foreground/70 hover:text-primary transition-colors duration-300 p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentThemeIcon}
              </motion.button>
              
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-card-background border border-border rounded-lg shadow-xl overflow-hidden"
                  >
                    {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => {
                          setTheme(t.name);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                          theme === t.name
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-primary/5"
                        }`}
                      >
                        <span className="text-lg">{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="text-2xl text-foreground/70"
                whileHover={{ scale: 1.1 }}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10"
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
