import { spaceStaticS } from "@cloudscape-design/design-tokens";
import { createUseStyles } from "react-jss";

export const useAnimalStyles = createUseStyles({
  animalImage: {
    width: "100%",
    flex: 1,
  },
  animalWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: spaceStaticS,
  },
});
