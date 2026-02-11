import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary
import { HelmetProvider } from "@dr.pogodin/react-helmet"; // Import HelmetProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider> {/* Wrap the entire app with HelmetProvider */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);