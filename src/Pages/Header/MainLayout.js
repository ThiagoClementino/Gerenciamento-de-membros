import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Onde está o seu componente de menu

const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar Fixa */}
      <div style={{ width: "280px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Conteúdo Principal (Membresia, Dashboard, etc) */}
      <main style={{ flexGrow: 1, minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
};
