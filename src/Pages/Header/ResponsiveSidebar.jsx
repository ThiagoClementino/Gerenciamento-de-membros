import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "bootstrap";
import { AuthContext } from "../../Contexts/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";

const ResponsiveSidebar = ({ isMobile, sidebarVisible, onToggleSidebar, onCloseSidebar }) => {
  const [expanded, setExpanded] = useState(!isMobile);
  const sidebarRef = useRef(null);
  const iconlogo = require("../../img/iconlogo.png");
  const { logout } = useContext(AuthContext);

  // Atualiza o estado expanded baseado no tamanho da tela
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile]);

  // Efeito para inicializar os tooltips do Bootstrap
  useEffect(() => {
    if (!expanded && sidebarRef.current && !isMobile) {
      const tooltipTriggerList = [].slice.call(
        sidebarRef.current.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl);
      });

      return () => {
        tooltipList.forEach((tooltip) => tooltip.dispose());
      };
    } else {
      const tooltips = document.querySelectorAll(".tooltip");
      tooltips.forEach((tooltip) => tooltip.remove());
    }
  }, [expanded, isMobile]);

  // Fecha sidebar quando clica em um link em mobile
  const handleLinkClick = () => {
    if (isMobile && onCloseSidebar) {
      onCloseSidebar();
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      onToggleSidebar && onToggleSidebar();
    } else {
      setExpanded(!expanded);
    }
  };

  // Definição dos itens de navegação
  const navItems = [
    { path: "/dashboard", icon: "bi-house-door-fill", text: "Dashboard" },
    { path: "/membros", icon: "bi-people-fill", text: "Membros" },
    { path: "/cadastro", icon: "bi-clipboard-data-fill", text: "Cadastro" },
    { path: "/financeiro", icon: "bi-cash-stack", text: "Financeiro" },
  ];

  // Classes CSS para diferentes estados
  const sidebarClasses = [
    "sidebar",
    "d-flex",
    "flex-column",
    "vh-100",
    "p-3",
    "transition-width",
    isMobile ? "sidebar-mobile" : expanded ? "sidebar-expanded" : "sidebar-collapsed",
    isMobile && sidebarVisible ? "sidebar-mobile-show" : "",
  ].filter(Boolean).join(" ");

  const sidebarStyles = {
    width: isMobile ? "280px" : expanded ? "280px" : "80px",
    transition: "all 0.3s ease-in-out",
    position: isMobile ? "fixed" : "relative",
    left: isMobile ? (sidebarVisible ? "0" : "-280px") : "auto",
    top: isMobile ? "0" : "auto",
    zIndex: isMobile ? "1050" : "auto",
    height: isMobile ? "100vh" : "auto",
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isMobile && sidebarVisible && (
        <div
          className="sidebar-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
            transition: "opacity 0.3s ease",
          }}
          onClick={onCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={sidebarClasses}
        style={sidebarStyles}
      >
        {/* Cabeçalho da Sidebar */}
        <div className={expanded || isMobile ? "d-flex justify-content-between mb-3" : "d-flex justify-content-center mb-3"}>
          {(expanded || isMobile) && (
            <img
              src={iconlogo}
              alt="Logo"
              style={{ height: "40px" }}
              className="me-2"
            />
          )}
          <div className={(expanded || isMobile) ? "mb-2 text-center" : "mb-2"}>
            <button
              onClick={toggleSidebar}
              className={`btn btn-outline-secondary ${
                (expanded || isMobile)
                  ? "d-flex justify-content-end"
                  : "d-flex justify-content-center"
              }`}
              aria-label={expanded ? "Contrair sidebar" : "Expandir sidebar"}
              data-bs-toggle={!expanded && !isMobile ? "tooltip" : undefined}
              data-bs-placement={!expanded && !isMobile ? "right" : undefined}
              title={!expanded && !isMobile ? "Expandir menu" : undefined}
            >
              <i
                className={`bi ${
                  isMobile 
                    ? "bi-x-lg" 
                    : expanded 
                      ? "bi-chevron-left" 
                      : "bi-chevron-right"
                }`}
              ></i>
            </button>
          </div>
        </div>

        <hr className="border-custom" />

        {/* Lista de Navegação */}
        <ul className="nav nav-pills flex-column mb-auto">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className="nav-link d-flex align-items-center py-2"
                onClick={handleLinkClick}
                data-bs-toggle={!expanded && !isMobile ? "tooltip" : undefined}
                data-bs-placement={!expanded && !isMobile ? "right" : undefined}
                title={!expanded && !isMobile ? item.text : undefined}
              >
                <i
                  className={`bi ${item.icon} ${
                    (expanded || isMobile) ? "me-2" : "fs-5 mx-auto"
                  }`}
                ></i>
                {(expanded || isMobile) && <span className="ms-1">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="border-custom" />

        {/* Informações do Usuário */}
        <div className="d-flex align-items-center">
          <i
            className={`bi bi-person-circle ${
              (expanded || isMobile) ? "me-2" : "fs-4 mx-auto"
            }`}
          ></i>
          {(expanded || isMobile) && (
            <div className="mb-2">
              <strong className="text-primary-custom">Admin</strong>
              <small className="d-block text-muted-custom">Online</small>
            </div>
          )}
        </div>

        {/* Toggle de Tema */}
        <ThemeToggle size="sm" className={(expanded || isMobile) ? "mb-2" : "mb-2"} />

        {/* Botão de Logout */}
        <div className="mb-3">
          <button
            onClick={logout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
            data-bs-toggle={!expanded && !isMobile ? "tooltip" : undefined}
            data-bs-placement={!expanded && !isMobile ? "right" : undefined}
            title={!expanded && !isMobile ? "Sair" : undefined}
          >
            <i
              className={`bi bi-box-arrow-right ${(expanded || isMobile) ? "me-2" : "fs-5"}`}
            ></i>
            {(expanded || isMobile) && <span>Sair</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;

