import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./lib/theme";
import { AppStateProvider } from "./lib/state";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ThemeProvider>
  </StrictMode>
);
