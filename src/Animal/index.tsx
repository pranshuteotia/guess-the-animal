import { Box, Header, SpaceBetween } from "@cloudscape-design/components";
import { useAnimalStyles } from "src/Animal/styles.js";
import { animals } from "src/animals.js";
import { ImageStage } from "src/ImageStage/index.js";
import { useAnimal, useStatus } from "src/state/index.js";
import { capitalize } from "src/utils/index.js";

export const Animal = () => {
  const { current } = useAnimal();
  const status = useStatus();
  const { animalWrapper } = useAnimalStyles();

  if (current.length === 0 || !animals[current]) {
    return null;
  }

  const [answers] = animals[current];

  const answer = answers.map((text) => capitalize(text)).join(", ");

  return (
    <div className={animalWrapper}>
      <ImageStage />
      <SpaceBetween direction="horizontal" size="xs" alignItems="end">
        <Header variant="h2">{capitalize(current)}</Header>
        {status === "REVEAL" && <Box>{`(${answer})`}</Box>}
      </SpaceBetween>
    </div>
  );
};
