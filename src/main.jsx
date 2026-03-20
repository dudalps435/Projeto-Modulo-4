import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Pages/css/global.css"; // Importando o CSS global da nossa nova estrutura

// Renderização principal do React na div com id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
