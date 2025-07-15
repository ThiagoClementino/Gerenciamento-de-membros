import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "bootstrap"; // Import Bootstrap's Tooltip
import { AuthContext } from "../../Contexts/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const sidebarRef = useRef(null); // Ref para o elemento da sidebar
  const iconlogo = require("../../img/iconlogo.png");
  const { logout } = useContext(AuthContext);

  // Efeito para inicializar os tooltips do Bootstrap quando o componente monta
  // ou quando o estado 'expanded' muda
  useEffect(() => {
    if (!expanded && sidebarRef.current) {
      // Seleciona todos os elementos com data-bs-toggle="tooltip" dentro da sidebar
      const tooltipTriggerList = [].slice.call(
        sidebarRef.current.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      // Inicializa um tooltip para cada elemento encontrado
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl);
      });

      // Função de limpeza para destruir os tooltips quando o componente desmonta
      // ou quando a sidebar expande (para evitar tooltips desnecessários)
      return () => {
        tooltipList.forEach((tooltip) => tooltip.dispose());
      };
    } else {
      // Se a sidebar estiver expandida, garante que tooltips antigos sejam removidos
      const tooltips = document.querySelectorAll(".tooltip");
      tooltips.forEach((tooltip) => tooltip.remove());
    }
  }, [expanded]); // Dependência: re-executa quando 'expanded' muda

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Definição dos itens de navegação com ícones do Bootstrap
  const navItems = [
    { path: "/dashboard", icon: "bi-house-door-fill", text: "Dashboard" },
    { path: "/membros", icon: "bi-people-fill", text: "Membros" },
    { path: "/cadastro", icon: "bi-clipboard-data-fill", text: "Cadastro" },
    { path: "/financeiro", icon: "bi-cash-stack", text: "Financeiro" },
  ];

  return (
    <div
      ref={sidebarRef} // Atribui a ref ao elemento principal da sidebar
      className={`sidebar d-flex flex-column vh-100 p-3 transition-width ${
        expanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
      style={{
        width: expanded ? "280px" : "80px",
        transition: "width 0.3s ease-in-out",
      }} // Estilo inline para transição suave da largura
    >
      {/* Cabeçalho da Sidebar */}
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        {expanded && (
          // Logo ou Título - Aparece apenas quando expandido
          <img
            src={iconlogo}
            alt="Logo"
            style={{ height: "40px" }}
            className="me-2"
          />
        )}
      </div>

      {/* Controles da Sidebar */}
      <div
        className={`d-flex ${
          expanded ? "justify-content-between" : "justify-content-center"
        } align-items-center mb-3`}
      >
        {/* Toggle de Tema */}
        <ThemeToggle size="sm" className={expanded ? "me-2" : "mb-2"} />

        {/* Botão de Toggle da Sidebar */}
        <button
          onClick={toggleSidebar}
          className="btn btn-outline-light btn-sm"
          aria-label={expanded ? "Contrair sidebar" : "Expandir sidebar"}
          data-bs-toggle={!expanded ? "tooltip" : undefined}
          data-bs-placement={!expanded ? "right" : undefined}
          title={!expanded ? "Expandir menu" : undefined}
        >
          <i
            className={`bi ${
              expanded ? "bi-chevron-left" : "bi-chevron-right"
            }`}
          ></i>
        </button>
      </div>

      <hr className="border-custom" />

      {/* Lista de Navegação */}
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link
              to={item.path}
              className="nav-link d-flex align-items-center py-2"
              // Atributos do Tooltip - aplicados apenas quando contraído
              data-bs-toggle={!expanded ? "tooltip" : undefined}
              data-bs-placement={!expanded ? "right" : undefined}
              title={!expanded ? item.text : undefined}
            >
              <i
                className={`bi ${item.icon} ${
                  expanded ? "me-2" : "fs-5 mx-auto"
                }`}
              ></i>
              {expanded && <span className="ms-1">{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="border-custom" />

      {/* Botão de Logout */}
      <div className="mb-3">
        <button
          onClick={logout}
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
          data-bs-toggle={!expanded ? "tooltip" : undefined}
          data-bs-placement={!expanded ? "right" : undefined}
          title={!expanded ? "Sair" : undefined}
        >
          <i
            className={`bi bi-box-arrow-right ${expanded ? "me-2" : "fs-5"}`}
          ></i>
          {expanded && <span>Sair</span>}
        </button>
      </div>

      {/* Rodapé da Sidebar (Exemplo: Informações do Usuário/Admin) */}
      <div className="d-flex align-items-center">
        <i
          className={`bi bi-person-circle ${
            expanded ? "me-2" : "fs-4 mx-auto"
          }`}
        ></i>
        {expanded && (
          <div>
            <strong className="text-primary-custom">Admin</strong>
            <small className="d-block text-muted-custom">Online</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
