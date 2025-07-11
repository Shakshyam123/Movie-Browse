import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./pages/Context.jsx";
import "./index.css";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
