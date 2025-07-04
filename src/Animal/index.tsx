import {
  Box,
  Header,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useAnimalStyles } from "src/Animal/styles.js";
import { animals } from "src/animals.js";
import { useImage } from "src/hooks/use-image.js";
import { useGlobalContext } from "src/state/index.js";
import { capitalize } from "src/utils/index.js";

export const Animal = () => {
  const {
    state: { animal, status },
  } = useGlobalContext();
  const {
    imageWrapper,
    animalImage,
    imagePlaceholder,
    animalWrapper,
    spinner,
  } = useAnimalStyles();
  const { loading } = useImage(`${animal}.webp`);

  if (animal.length === 0 || !animals[animal]) {
    return null;
  }

  const [answers] = animals[animal];

  const answer = answers.map((text) => capitalize(text)).join(", ");

  return (
    <div className={animalWrapper}>
      <div className={imageWrapper}>
        <img
          src={`./images/${animal}.webp`}
          alt={`Cartoonish ${animal}`}
          className={animalImage}
        />
        {loading && (
          <div className={imagePlaceholder}>
            <div className={spinner}>
              <Spinner size="big" />
            </div>
          </div>
        )}
      </div>
      <SpaceBetween direction="horizontal" size="xs" alignItems="end">
        <Header variant="h2">{capitalize(animal)}</Header>
        {status === "REVEAL" && <Box>{`(${answer})`}</Box>}
      </SpaceBetween>
    </div>
  );
};
