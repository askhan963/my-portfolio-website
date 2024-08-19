"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Pacifico Font */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-logo">
              ASKHAN
            </h1>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-8">
            <a href="#profile" className="text-gray-600 dark:text-gray-300 hover:underline">
              Profile
            </a>
            <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:underline">
              Skills
            </a>
            <a href="#honors" className="text-gray-600 dark:text-gray-300 hover:underline">
              Honors
            </a>
            <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:underline">
              Projects
            </a>
            <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:underline">
              Experience
            </a>
            <a href="#cv" className="text-gray-600 dark:text-gray-300 hover:underline">
              My CVs
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:underline">
              Contact
            </a>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
