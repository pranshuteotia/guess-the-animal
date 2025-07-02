export interface GlobalState {
  animal: string;
  currentGuess: string;
  mode: Mode;
}

export type Mode = "NORMAL" | "HARD";

export type GlobalStateActions =
  | { type: "SET_ANIMAL"; payload: string }
  | { type: "SET_GUESS"; payload: string }
  | { type: "SET_MODE"; payload: Mode };

export interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
}
