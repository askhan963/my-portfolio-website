"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const LEGACY_THEMES = new Set(["ocean", "forest", "coffee"]);

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("theme");
    let next: Theme = "dark";

    if (raw === "light" || raw === "dark") {
      next = raw;
    } else if (raw && LEGACY_THEMES.has(raw)) {
      next = "dark";
      localStorage.setItem("theme", "dark");
    }
    // No stored preference: default to dark, the site's designed theme,
    // regardless of OS preference (most browsers report "light" by default).

    setThemeState(next);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, mounted]);

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
    return {
      theme: "light" as Theme,
      setTheme: () => {},
    };
  }
  return context;
}
