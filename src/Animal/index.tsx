import { Box, Header, SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useRef } from "react";
import { useAnimalStyles } from "src/Animal/styles.js";
import { animals } from "src/animals.js";
import { useImage } from "src/hooks/use-image.js";
import { useAnimal, useNextAnimal, useStatus } from "src/state/index.js";
import { capitalize } from "src/utils/index.js";

export const Animal = () => {
  const animal = useAnimal();
  const nextAnimal = useNextAnimal();
  const status = useStatus();
  const { animalWrapper, animalImage, imageWrapper } = useAnimalStyles();
  const { animalImages } = useImage({ currentAnimal: animal, nextAnimal });
  const imageRef = useRef<HTMLImageElement>(null);
  const nextImage = useRef(new Image());

  useEffect(() => {
    const image = imageRef.current;
    if (!image) {
      return;
    }

    image.alt = `Cartoonish ${animalImages.current.name}`;
    image.src = animalImages.current.src;

    nextImage.current.src = animalImages.next.src;
  }, [animalImages]);

  if (animal.length === 0 || !animals[animal]) {
    return null;
  }

  const [answers] = animals[animal];

  const answer = answers.map((text) => capitalize(text)).join(", ");

  return (
    <div className={animalWrapper}>
      <div className={imageWrapper}>
        <img className={animalImage} ref={imageRef} />
      </div>
      <SpaceBetween direction="horizontal" size="xs" alignItems="end">
        <Header variant="h2">{capitalize(animal)}</Header>
        {status === "REVEAL" && <Box>{`(${answer})`}</Box>}
      </SpaceBetween>
    </div>
  );
};
