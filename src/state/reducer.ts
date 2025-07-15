import type { Mode } from "@cloudscape-design/global-styles";
import type {
  GameMode,
  GlobalState,
  GlobalStateActions,
  Status,
} from "src/types.js";

export const reducer = (
  state: GlobalState,
  action: GlobalStateActions
): GlobalState => {
  switch (action.type) {
    case "SET_ANIMAL":
      return { ...state, animal: action.payload };
    case "SET_NEXT_ANIMAL":
      return { ...state, nextAnimal: action.payload };
    case "SET_GUESS":
      return { ...state, currentGuess: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_WON":
      return { ...state, won: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const setAnimal = (payload: string): GlobalStateActions => ({
  type: "SET_ANIMAL",
  payload,
});

export const setNextAnimal = (payload: string): GlobalStateActions => ({
  type: "SET_NEXT_ANIMAL",
  payload,
});

export const setGuess = (payload: string): GlobalStateActions => ({
  type: "SET_GUESS",
  payload,
});

export const setGameMode = (payload: GameMode): GlobalStateActions => ({
  type: "SET_MODE",
  payload,
});

export const setWonStatus = (payload: boolean): GlobalStateActions => ({
  type: "SET_WON",
  payload,
});

export const setStatus = (payload: Status): GlobalStateActions => ({
  type: "SET_STATUS",
  payload,
});

export const setTheme = (payload: Mode): GlobalStateActions => ({
  type: "SET_THEME",
  payload,
});
