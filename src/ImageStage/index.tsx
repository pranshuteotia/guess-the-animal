import { Spinner } from "@cloudscape-design/components";
import { useImage } from "src/hooks/use-image.js";
import { useImageStageStyles } from "src/ImageStage/styles.js";
import { useAnimal } from "src/state/index.js";

export const ImageStage = () => {
  const animal = useAnimal();
  const { imageWrapper, spinner } = useImageStageStyles();

  return (
    <div className={imageWrapper}>
      <Image currentAnimal={animal.current} nextAnimal={animal.next} />
      <div className={spinner}>
        <Spinner size="big" />
      </div>
    </div>
  );
};

interface ImageProps {
  currentAnimal: string;
  nextAnimal: string;
}

const Image = ({ currentAnimal, nextAnimal }: ImageProps) => {
  const { animalImage, nextAnimalImage } = useImageStageStyles();
  const { animalImages, loading } = useImage({ currentAnimal, nextAnimal });

  if (loading) {
    return null;
  }

  return (
    <>
      <img
        className={animalImage}
        src={animalImages.current.src}
        alt={`Cartoonish ${animalImages.current.name}`}
        key={animalImages.current.src}
      />
      ,
      <img
        className={nextAnimalImage}
        src={animalImages.next.src}
        alt={`Cartoonish ${animalImages.next.name}`}
        key={animalImages.next.src}
      />
    </>
  );
};
