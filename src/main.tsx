import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import bridge from "@vkontakte/vk-bridge";

// Отправляет событие инициализации нативному клиенту
bridge.send("VKWebAppInit");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
