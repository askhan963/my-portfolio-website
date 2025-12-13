"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type Theme = "light" | "dark" | "ocean" | "forest" | "coffee";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, pathname, mounted]);

  const applyTheme = (currentTheme: Theme) => {
    const root = document.documentElement;
    const isAdmin = pathname?.startsWith("/admin");
    
    // Determine effective theme for display
    // If in Admin, force standard Light or Dark (map custom themes to Dark)
    // to preserve Admin UI consistency.
    let effectiveTheme = currentTheme;
    if (isAdmin) {
       if (currentTheme === 'light') effectiveTheme = 'light';
       else effectiveTheme = 'dark'; // Ocean, Forest, Coffee, Dark -> Dark
    }

    // Remove previous theme attributes
    root.removeAttribute("data-theme");
    
    // Apply new theme
    // For standard Light/Dark, we might not need data-theme if relying on class,
    // but keeping it for consistency doesn't hurt unless it triggers vars.
    // If Admin (Dark), we don't want 'ocean' vars.
    if (!isAdmin || (effectiveTheme === 'light' || effectiveTheme === 'dark')) {
        // In Admin, effectiveTheme is only light or dark.
        // In Public, it can be Ocean etc.
        root.setAttribute("data-theme", effectiveTheme);
    }
    
    // Handle Tailwind "dark" class
    // Ocean/Forest/Coffee/Dark are all "Dark Mode"
    const isDark = effectiveTheme !== "light";

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default during build/SSR if context missing
    return { 
      theme: "light" as Theme, 
      setTheme: () => {} 
    };
  }
  return context;
}
