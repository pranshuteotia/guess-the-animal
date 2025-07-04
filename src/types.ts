export interface GlobalState {
  animal: string;
  currentGuess: string;
  mode: Mode;
  won: boolean;
  status: Status;
}

export type Mode = "NORMAL" | "HARD";
export type Status = "PLAY" | "CELEBRATE" | "REVEAL";

export type GlobalStateActions =
  | { type: "SET_ANIMAL"; payload: string }
  | { type: "SET_GUESS"; payload: string }
  | { type: "SET_MODE"; payload: Mode }
  | { type: "SET_WON"; payload: boolean }
  | { type: "SET_STATUS"; payload: Status };

export interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
}

export type LocalStorageKey = "theme";
