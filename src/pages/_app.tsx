import "../styles/globals.css";
import { useEffect, useState } from "react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }} />;
  }

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
