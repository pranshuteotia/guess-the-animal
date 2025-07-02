export interface GlobalState {
  animal: string;
  currentGuess: string;
}

export type GlobalStateActions =
  | { type: "SET_ANIMAL"; payload: string }
  | { type: "SET_GUESS"; payload: string };

export interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
}
