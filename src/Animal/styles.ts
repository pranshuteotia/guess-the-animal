import {
  borderRadiusTiles,
  colorBackgroundCellShaded,
  spaceStaticS,
} from "@cloudscape-design/design-tokens";
import { createUseStyles } from "react-jss";

export const useAnimalStyles = createUseStyles({
  imageWrapper: {
    position: "relative",
    flex: 1,
    display: "flex",
    borderRadius: borderRadiusTiles,
    overflow: "hidden",
  },
  imagePlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: borderRadiusTiles,
    background: colorBackgroundCellShaded,
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
  },
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
