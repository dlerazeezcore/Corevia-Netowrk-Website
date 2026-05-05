import { useEffect, useState } from "react";

const THEME_KEY = "tulip-theme";

function getStoredTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    // Ignore localStorage errors
  }
  // Default to light theme
  return "light";
}

function setStoredTheme(theme: "light" | "dark") {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore localStorage errors
  }
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// Initialize theme immediately on module load to prevent flash
const initialTheme = getStoredTheme();
applyTheme(initialTheme);

export function useTheme() {
  const [isDark, setIsDark] = useState(() => getStoredTheme() === "dark");

  useEffect(() => {
    // Sync with stored theme on mount
    const stored = getStoredTheme();
    setIsDark(stored === "dark");
    applyTheme(stored);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = prev ? "light" : "dark";
      setStoredTheme(newTheme);
      applyTheme(newTheme);
      return !prev;
    });
  };

  return { isDark, toggleTheme };
}
