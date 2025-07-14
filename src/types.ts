import type { Mode } from "@cloudscape-design/global-styles";

export interface GlobalState {
  animal: AnimalObj;
  currentGuess: string;
  mode: GameMode;
  won: boolean;
  status: Status;
  theme: Mode;
}

export type GameMode = "NORMAL" | "HARD";
export type Status = "PLAY" | "CELEBRATE" | "REVEAL";
export type AnimalObj = { current: string; next: string };

export type GlobalStateActions =
  | { type: "SET_ANIMAL"; payload: AnimalObj }
  | { type: "SET_GUESS"; payload: string }
  | { type: "SET_MODE"; payload: GameMode }
  | { type: "SET_WON"; payload: boolean }
  | { type: "SET_STATUS"; payload: Status }
  | { type: "SET_THEME"; payload: Mode };

export interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalStateActions>;
  subscribe: (callback: () => void) => () => void;
}

export type LocalStorageKey = "theme";

export type Nullable<T> = T | null;

export interface ImageMetadata {
  name: string;
  format: string;
  width: number;
  height: number;
  src: string;
}
