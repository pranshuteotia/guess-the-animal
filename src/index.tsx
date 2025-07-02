import "@cloudscape-design/global-styles/index.css";
import { createRoot } from "react-dom/client";
import { GlobalContextProvider } from "src/state/index.js";
import { App } from "src/App/index.js";

const AppWrapper = () => {
  return (
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  );
};

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<AppWrapper />);
