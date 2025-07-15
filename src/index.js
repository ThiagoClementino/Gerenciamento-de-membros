import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/Reset.css";
import "../src/css/Components.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
