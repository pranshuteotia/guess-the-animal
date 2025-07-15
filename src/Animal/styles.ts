import {
  borderRadiusTiles,
  colorBackgroundCellShaded,
  spaceStaticS,
} from "@cloudscape-design/design-tokens";
import { createUseStyles } from "react-jss";

export const useAnimalStyles = createUseStyles({
  animalWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: spaceStaticS,
  },
  animalImage: {
    width: "100%",
  },
  imageWrapper: {
    borderRadius: borderRadiusTiles,
    width: "100%",
    height: 300,
    backgroundColor: colorBackgroundCellShaded,
    overflow: "hidden",
  },
});
