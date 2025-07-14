import type { GlobalState, GlobalContextType } from "src/types.js";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { reducer } from "src/state/reducer.js";
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
  const context = useGlobalContext();

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

export const useDispatch = () => {
  const context = useGlobalContext();
  return context.dispatch;
};

export const useAnimal = () => useSelector((state) => state.animal);
export const useTheme = () => useSelector((state) => state.theme);
export const useCurrentGuess = () => useSelector((state) => state.currentGuess);
export const useCurrentMode = () => useSelector((state) => state.mode);
export const useStatus = () => useSelector((state) => state.status);
export const useWon = () => useSelector((state) => state.won);
