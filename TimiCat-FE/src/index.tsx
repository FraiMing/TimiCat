import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import Index from "./routes/index.tsx";
import { BgmProvider } from "./contexts/BgmContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BgmProvider>
      <Index />
    </BgmProvider>
  </StrictMode>
);
