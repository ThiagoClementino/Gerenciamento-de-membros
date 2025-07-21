import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importante para funcionalidades como Tooltips
import "./css/CustomTheme.css"; // CSS customizado para theming
import { AuthProvider } from "./Contexts/AuthContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/layout-responsivo-integrado.css";
import "./utils/layout-responsivo-utils.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
