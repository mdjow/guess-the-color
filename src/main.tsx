import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./assets/styles/global.css";
import { GameProvider } from "./context/gameContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
