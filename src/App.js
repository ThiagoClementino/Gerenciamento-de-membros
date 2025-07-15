import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importante para funcionalidades como Tooltips
import { AuthProvider } from "./Contexts/AuthContext";

// Seus outros imports e código...

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
