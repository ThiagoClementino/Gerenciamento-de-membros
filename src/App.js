import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importante para funcionalidades como Tooltips
import { AuthProvider } from "./Contexts/AuthContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import "./styles/CustomTheme.css";
import "./styles/global.css";
import "./styles/layout-responsivo-integrado.css";
import "./styles/membros-dashboard-pattern.css";

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
