import {
  borderRadiusTiles,
  colorBackgroundCellShaded,
} from "@cloudscape-design/design-tokens";
import { createUseStyles } from "react-jss";

export const useAnimalStyles = createUseStyles({
  imageWrapper: {
    width: 300,
    height: 300,
    background: colorBackgroundCellShaded,
    borderRadius: borderRadiusTiles,
    position: "relative",
  },
  imagePlaceholder: {
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
  },
});
