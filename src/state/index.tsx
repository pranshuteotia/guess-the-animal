import type { GlobalState } from "src/types.js";
import { createContext, useContext, useReducer } from "react";
import { reducer } from "src/state/reducer.js";
import type { GlobalContextType } from "src/types.js";

const initialState: GlobalState = {
  animal: "",
  currentGuess: "",
  mode: "NORMAL",
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
