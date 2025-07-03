import { Header, SpaceBetween } from "@cloudscape-design/components";
import { useGlobalContext } from "src/state/index.js";
import { capitalize } from "src/utils/index.js";

export const Animal = () => {
  const {
    state: { animal },
  } = useGlobalContext();

  return (
    <SpaceBetween size="s" direction="vertical">
      <Header variant="h2">{capitalize(animal)}</Header>
      <img
        src={`./images/${animal}.webp`}
        alt={`Cartoonish ${animal}`}
        width={300}
        style={{ borderRadius: 8 }}
      />
    </SpaceBetween>
  );
};
