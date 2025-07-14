import { useEffect, useState } from "react";
import { INITIAL_IMAGE_METADATA } from "src/constants.js";
import type { ImageMetadata, Nullable } from "src/types.js";

interface UseImageProps {
  currentAnimal: string;
  nextAnimal: string;
}

export const useImage = ({ currentAnimal, nextAnimal }: UseImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Nullable<unknown>>(null);
  const [animalImages, setAnimalImages] = useState<{
    current: ImageMetadata;
    next: ImageMetadata;
  }>({
    current: INITIAL_IMAGE_METADATA,
    next: INITIAL_IMAGE_METADATA,
  });

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const currentAnimalImageMetadata = await import(
          `../assets/images/${currentAnimal}.png?w=400&format=webp&as=meta`
        );
        const nextAnimalImageMetadata = await import(
          `../assets/images/${nextAnimal}.png?w=400&format=webp&as=meta`
        );

        setAnimalImages({
          current: {
            ...currentAnimalImageMetadata.default,
            name: currentAnimal,
          },
          next: { ...nextAnimalImageMetadata.default, name: nextAnimal },
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [currentAnimal, nextAnimal]);

  return {
    loading,
    error,
    animalImages,
  };
};
