import { Mode } from "@cloudscape-design/global-styles";
import { useEffect, useState } from "react";
import { DARK_MODE_CLASS_NAME } from "src/constants.js";

export const useCurrentTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      return document.body.classList.contains(DARK_MODE_CLASS_NAME)
        ? Mode.Dark
        : Mode.Light;
    }
    return Mode.Light;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.body.classList.contains(DARK_MODE_CLASS_NAME)
          ? Mode.Dark
          : Mode.Light
      );
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return theme;
};
