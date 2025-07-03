import { useEffect, useState } from "react";

export const useImage = (fileName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  // const images = import.meta.glob('./images/*.jpg', { eager: true });

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        /* @vite-ignore */
        const response = await import(`./images/${fileName}`);
        setImage(response.default);
      } catch (err: any) {
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
