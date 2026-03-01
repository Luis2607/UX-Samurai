/**
 * Application Entry Point
 * 
 * Bootstraps the React application and mounts the root component.
 * Includes global styles and strict mode wrappers for optimal development checks.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
