import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState<string>(() => {
    // Fallback to 'light' when rendering on the server
    if (typeof window !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as string;
    }
    return "light"; // Default theme
  });

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [theme, setTheme] as const;
}
