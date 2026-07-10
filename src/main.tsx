import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { validateEnv } from "./config/env.ts";

// Validate environment variables on app start
validateEnv();

createRoot(document.getElementById("root")!).render(<App />);
