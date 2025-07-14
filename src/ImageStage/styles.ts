import {
  borderRadiusTiles,
  colorBackgroundCellShaded,
} from "@cloudscape-design/design-tokens";
import { createUseStyles } from "react-jss";

export const useImageStageStyles = createUseStyles({
  imageWrapper: {
    position: "relative",
    display: "flex",
    borderRadius: borderRadiusTiles,
    width: "100%",
    height: 300,
    backgroundColor: colorBackgroundCellShaded,
    overflow: "hidden",
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
  },
  animalImage: {
    position: "relative",
    zIndex: 2,
    width: "100%",
  },

  nextAnimalImage: {
    position: "absolute",
    width: 250,
    height: 250,
    zIndex: 1,
  },
});
