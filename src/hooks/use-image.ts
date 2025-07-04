import { useEffect, useState } from "react";

export const useImage = (fileName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const images = import.meta.glob("./images/*.webp");

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const imagePath = `./images/${fileName}`;
        const img = images[imagePath];
        if (img) {
          const module: any = await img();
          setImage(module.default);
        } else {
          throw new Error(`Image with path ${imagePath} not found.`);
        }
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
