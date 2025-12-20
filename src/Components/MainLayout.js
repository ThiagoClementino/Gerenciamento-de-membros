import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../Pages/Header/ResponsiveSidebar";
import Footer from "../Pages/Footer/Footer";
import { useSidebar } from "../Pages/Header/useSidebar";

const MainLayout = () => {
  const { isMobile, sidebarVisible, toggleSidebar, closeSidebar } =
    useSidebar();

  return (
    <div className="main-layout-wrapper">
      {/* Sidebar - Gerencia internamente Mobile/Desktop via Props */}
      <ResponsiveSidebar
        isMobile={isMobile}
        sidebarVisible={sidebarVisible}
        onToggleSidebar={toggleSidebar}
        onCloseSidebar={closeSidebar}
      />

      <div className="content-container">
        {/* O Outlet é onde as páginas (Dashboard, Membros, etc) serão renderizadas */}
        <main className="scrollable-content-section">
          <Outlet />
        </main>

        {/* Footer fixo no final da área de conteúdo */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
