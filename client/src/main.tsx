import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the base URL from Vite (will be /DimensionReplit/ in production, / in dev)
const BASE_URL = import.meta.env.BASE_URL;

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker path must include the base URL
    const swPath = `${BASE_URL}sw.js`;

    navigator.serviceWorker
      .register(swPath, { scope: BASE_URL })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
        // Check for updates periodically
        registration.update();
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
