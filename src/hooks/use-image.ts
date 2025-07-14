import { useEffect, useState } from "react";
import type { Nullable } from "src/types.js";

export const useImage = (fileName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Nullable<unknown>>(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await import(
          /* @vite-ignore */ `./images/${fileName}`
        );
        setImage(response.default);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [fileName]);

  return {
    loading,
    error,
    image,
  };
};
