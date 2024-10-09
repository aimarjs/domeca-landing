import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" && localStorage.theme
      ? localStorage.theme
      : "light"
  );

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [theme, setTheme] as const;
}
