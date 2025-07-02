import type { GlobalState, GlobalStateActions } from "src/types.js";

export const reducer = (
  state: GlobalState,
  action: GlobalStateActions
): GlobalState => {
  switch (action.type) {
    case "SET_ANIMAL":
      return { ...state, animal: action.payload };
    case "SET_GUESS":
      return { ...state, currentGuess: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
