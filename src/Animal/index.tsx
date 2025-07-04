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
  const { imageWrapper, imageBorderRadius, imagePlaceholder } =
    useAnimalStyles();
  const { loading } = useImage(`${animal}.webp`);

  if (animal.length === 0 || !animals[animal]) {
    return null;
  }

  const [answers] = animals[animal];

  const answer = answers.map((text) => capitalize(text)).join(", ");

  return (
    <SpaceBetween size="s" direction="vertical">
      <div className={imageWrapper}>
        {!loading && (
          <img
            src={`./images/${animal}.webp`}
            alt={`Cartoonish ${animal}`}
            width={300}
            className={imageBorderRadius}
          />
        )}
        {loading && (
          <div className={imagePlaceholder}>
            <Spinner size="big" />
          </div>
        )}
      </div>
      <SpaceBetween direction="horizontal" size="xs" alignItems="end">
        <Header variant="h2">{capitalize(animal)}</Header>
        {status === "REVEAL" && <Box>{`(${answer})`}</Box>}
      </SpaceBetween>
    </SpaceBetween>
  );
};
