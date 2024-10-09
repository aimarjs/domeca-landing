import "../styles/globals.css";
import { AppProps } from "next/app";
import useDarkMode from "../hooks/useDarkMode";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={theme}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded"
      >
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
