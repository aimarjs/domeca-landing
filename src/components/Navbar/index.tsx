"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next"; // Correctly import useTranslation
import "../../i18n";

const Navbar = () => {
  const { i18n } = useTranslation(); // Destructure i18n from useTranslation
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<string>(i18n.language || "et"); // Default to Estonian

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedLanguage = localStorage.getItem("language");

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else {
      setTheme(systemPrefersDark ? "dark" : "light");
    }

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage); // Use stored language
    }

    setMounted(true);
  }, [i18n]); // Add i18n as a dependency

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // Change language using i18n
    localStorage.setItem("language", lang); // Save language preference to localStorage
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null; // Avoid hydration issues
  }

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Booking
        </h1>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded"
          >
            <option value="en">English</option>
            <option value="et">Eesti</option>
          </select>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
