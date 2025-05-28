"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isVisible, setIsVisible] = useState(true); // State for navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navbar styles with modern fonts
  const navbarStyles = {
    base: 'fixed w-full z-50 transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800',
    visible: 'top-0',
    hidden: '-top-full',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    nav: 'flex justify-between items-center h-16',
    logo: 'text-3xl font-logo font-bold text-gray-800 dark:text-white',
    menu: 'hidden md:flex space-x-8',
    menuItem: 'text-lg font-body text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200',
    mobileMenu: 'md:hidden',
    themeToggle: 'text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200'
  };

  // Check localStorage for the theme preference on initial load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // Toggle theme and save preference in localStorage
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll behavior to show/hide navbar
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // If scroll down, hide the navbar
        setIsVisible(false);
      } else {
        // If scroll up, show the navbar
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`${navbarStyles.base} ${isVisible ? navbarStyles.visible : navbarStyles.hidden} bg-white dark:bg-gray-900 shadow-md fixed w-full z-50`} 
      style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.nav}>
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <h1 className={navbarStyles.logo}>
                ASKHAN
              </h1>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className={navbarStyles.menu}>
            <a href="#profile" className={navbarStyles.menuItem}>Home</a>
            <a href="#skills" className={navbarStyles.menuItem}>Skills</a>
            <a href="#education" className={navbarStyles.menuItem}>Education</a>
            <a href="#honors" className={navbarStyles.menuItem}>Honors</a>
            <a href="#projects" className={navbarStyles.menuItem}>Projects</a>
            <a href="#experience" className={navbarStyles.menuItem}>Experience</a>
            <a href="#contact" className={navbarStyles.menuItem}>Contact</a>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className={navbarStyles.themeToggle}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <a href="#profile" className={`${navbarStyles.menuItem} block`}>Home</a>
              <a href="#skills" className={`${navbarStyles.menuItem} block`}>Skills</a>
              <a href="#education" className={`${navbarStyles.menuItem} block`}>Education</a>
              <a href="#honors" className={`${navbarStyles.menuItem} block`}>Honors</a>
              <a href="#projects" className={`${navbarStyles.menuItem} block`}>Projects</a>
              <a href="#experience" className={`${navbarStyles.menuItem} block`}>Experience</a>
              <a href="#contact" className={`${navbarStyles.menuItem} block`}>Contact</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
