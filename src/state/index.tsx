import type { GlobalState } from "src/types.js";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { reducer } from "src/state/reducer.js";
import type { GlobalContextType } from "src/types.js";
import { Mode } from "@cloudscape-design/global-styles";

const initialState: GlobalState = {
  animal: "",
  currentGuess: "",
  mode: "NORMAL",
  won: false,
  status: "PLAY",
  theme: Mode.Light,
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getState = () => state;
  const subscribers = useRef<Set<() => void>>(new Set());

  useEffect(() => {
    for (const callback of subscribers.current) {
      callback();
    }
  }, [state]);

  const subscribe = (callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch, subscribe }}>
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

export function useSelector<Selected>(
  selector: (state: GlobalState) => Selected
): Selected {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useSelector must be used within a GlobalContextProvider");
  }

  const { state, subscribe } = context;

  const [selectedState, setSelectedState] = useState(() => selector(state));

  useEffect(() => {
    const checkForUpdates = () => {
      const newSelectedState = selector(state);
      setSelectedState((prevSelectedState) =>
        Object.is(prevSelectedState, newSelectedState)
          ? prevSelectedState
          : newSelectedState
      );
    };

    const unsubscribe = subscribe(checkForUpdates);
    checkForUpdates(); // initial check
    return unsubscribe;
  }, [state, subscribe, selector]);

  return selectedState;
}
