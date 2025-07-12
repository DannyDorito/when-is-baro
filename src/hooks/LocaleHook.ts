import { useEffect, useState } from "react";

const DefaultLocale = "en-GB";
export function useLocale() {
  const [locale, setLocale] = useState<string>(
    navigator.language || DefaultLocale
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(navigator.language || DefaultLocale);
    };

    window.addEventListener("languagechange", handleLanguageChange);
    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  return locale;
}
