import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../Pages/Header/ResponsiveSidebar";
import { useSidebar } from "../Pages/Header/useSidebar";

const MainLayout = () => {
  const { isMobile, sidebarVisible, toggleSidebar, closeSidebar } =
    useSidebar();

  return (
    // Esta estrutura impede o scroll global e define o comportamento flexível
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <ResponsiveSidebar
        isMobile={isMobile}
        sidebarVisible={sidebarVisible}
        onToggleSidebar={toggleSidebar}
        onCloseSidebar={closeSidebar}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Botão Hamburger: Aparece apenas no Mobile para abrir o menu */}
        {isMobile && (
          <header
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button className="btn btn-primary" onClick={toggleSidebar}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <span className="ms-3 fw-bold">Menu</span>
          </header>
        )}

        {/* Área de Conteúdo: A única que pode ter scroll vertical */}
        <main
          style={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "20px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
