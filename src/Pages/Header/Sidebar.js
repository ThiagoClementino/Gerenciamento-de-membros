import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUserPlus,
  faUsers,
  faWallet,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css"; // Certifique-se de que este arquivo herde do global.css

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/Dashboard", label: "Dashboard", icon: faChartPie },
    { path: "/Cadastro", label: "Cadastrar", icon: faUserPlus },
    { path: "/Membros", label: "Membros", icon: faUsers },
    { path: "/Financeiro", label: "Financeiro", icon: faWallet },
    { path: "/Config", label: "Configurações", icon: faGear },
  ];

  return (
    <aside className="sidebar-premium shadow-sm">
      <div className="sidebar-header-logo p-4 text-center">
        <h4 className="fw-bold text-primary mb-0">
          Gestão <span className="text-secondary">Igreja</span>
        </h4>
      </div>

      <nav className="sidebar-nav px-3">
        <ul className="list-unstyled">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`sidebar-link-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="sidebar-icon-fixed"
                />
                <span className="sidebar-text-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer mt-auto p-3">
        <button onClick={handleLogout} className="btn-logout-premium w-100">
          <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
