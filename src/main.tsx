import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary> {/* Wrap App with ErrorBoundary */}
      <App />
    </ErrorBoundary>
  </StrictMode>
);