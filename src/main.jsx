import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.scss";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "./utlis/langContext";
import { AuthProvider } from "./utlis/AuthContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <LangProvider>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
    </LangProvider>
    </AuthProvider>
  </StrictMode>
  
);
