import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUsers,
  faUserPlus,
  faWallet,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faRightFromBracket,
  faChurch,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const ResponsiveSidebar = ({
  isMobile,
  sidebarVisible,
  onToggleSidebar,
  onCloseSidebar,
}) => {
  const [expanded, setExpanded] = useState(!isMobile);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  // --- LÓGICA DE TEMA (VINCULADA AO BOTÃO) ---
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  const handleLinkClick = () => {
    if (isMobile && onCloseSidebar) onCloseSidebar();
  };

  const navItems = [
    { path: "/dashboard", icon: faChartPie, text: "Dashboard" },
    { path: "/membros", icon: faUsers, text: "Membros" },
    { path: "/cadastro", icon: faUserPlus, text: "Cadastrar" },
    { path: "/financeiro", icon: faWallet, text: "Financeiro" },
  ];

  // Configuração de largura e visibilidade via Bootstrap e Inline Styles para Dinâmica
  const sidebarStyles = {
    width: isMobile ? "280px" : expanded ? "280px" : "85px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 1050,
  };

  return (
    <>
      {/* Overlay Mobile (Bootstrap Backdrop) */}
      {isMobile && sidebarVisible && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040, backdropFilter: "blur(4px)" }}
          onClick={onCloseSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bg-body-tertiary border-end d-flex flex-column vh-100 ${
          isMobile ? "position-fixed shadow-lg" : "position-sticky top-0"
        } ${
          isMobile && !sidebarVisible
            ? "translate-middle-x"
            : "translate-middle-none"
        }`}
        style={{
          ...sidebarStyles,
          left: isMobile && !sidebarVisible ? "-280px" : "0",
        }}
      >
        {/* HEADER: LOGO & TOGGLE */}
        <div className="p-4 d-flex align-items-center justify-content-between">
          {expanded || isMobile ? (
            <div className="d-flex align-items-center gap-2 overflow-hidden">
              <div className="p-2 bg-primary bg-opacity-10 rounded-3">
                <FontAwesomeIcon
                  icon={faChurch}
                  className="text-primary fs-5"
                />
              </div>
              <div className="lh-1">
                <span className="fw-bold d-block text-body">Gestão</span>
                <small
                  className="text-primary fw-bold"
                  style={{ fontSize: "0.6rem", letterSpacing: "1px" }}
                >
                  IGREJA
                </small>
              </div>
            </div>
          ) : (
            <div className="mx-auto p-2 bg-primary bg-opacity-10 rounded-3">
              <FontAwesomeIcon icon={faChurch} className="text-primary fs-5" />
            </div>
          )}

          <button
            onClick={() =>
              isMobile ? onCloseSidebar() : setExpanded(!expanded)
            }
            className="btn btn-sm btn-outline-secondary border-0 rounded-2 d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
          >
            <FontAwesomeIcon
              icon={
                isMobile ? faXmark : expanded ? faChevronLeft : faChevronRight
              }
            />
          </button>
        </div>

        <hr className="mx-3 my-0 opacity-10" />

        {/* NAVEGAÇÃO */}
        <nav className="flex-grow-1 py-3 px-2 overflow-y-auto">
          <ul className="nav nav-pills flex-column gap-1">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition-all ${
                    location.pathname === item.path
                      ? "active shadow"
                      : "text-secondary"
                  }`}
                >
                  <div
                    className="d-flex justify-content-center"
                    style={{ width: "25px" }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="fs-5" />
                  </div>
                  {(expanded || isMobile) && (
                    <span className="fw-medium">{item.text}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <hr className="mx-3 my-0 opacity-10" />

        {/* RODAPÉ: TEMA E LOGOUT */}
        <div className="p-3 d-flex flex-column gap-2">
          {/* BOTÃO ALTERNAR TEMA (Integrado) */}
          <button
            onClick={toggleTheme}
            className={`btn d-flex align-items-center border-0 rounded-3 py-2 px-3 transition-all ${
              expanded || isMobile
                ? "justify-content-between bg-body-secondary"
                : "justify-content-center"
            }`}
          >
            {(expanded || isMobile) && (
              <span className="small fw-bold text-secondary">Aparência</span>
            )}
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className={theme === "light" ? "text-primary" : "text-warning"}
            />
          </button>

          {/* BOTÃO SAIR */}
          <button
            onClick={logout}
            className={`btn btn-outline-danger border-0 d-flex align-items-center py-2 px-3 rounded-3 transition-all ${
              expanded || isMobile
                ? "justify-content-start gap-3"
                : "justify-content-center"
            }`}
          >
            <div
              className="d-flex justify-content-center"
              style={{ width: "25px" }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            {(expanded || isMobile) && (
              <span className="fw-bold small">Sair do Sistema</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default ResponsiveSidebar;
