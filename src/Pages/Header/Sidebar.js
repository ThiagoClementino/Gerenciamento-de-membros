
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'bootstrap'; // Import Bootstrap's Tooltip

// Certifique-se de que o CSS do Bootstrap e os Ícones do Bootstrap estão importados
// no seu arquivo principal (ex: index.js ou App.js)
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Inclui Popper.js

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const sidebarRef = useRef(null); // Ref para o elemento da sidebar
  const iconlogo = require('../../img/iconlogo.png')

  // Efeito para inicializar os tooltips do Bootstrap quando o componente monta
  // ou quando o estado 'expanded' muda
  useEffect(() => {
    if (!expanded && sidebarRef.current) {
      // Seleciona todos os elementos com data-bs-toggle="tooltip" dentro da sidebar
      const tooltipTriggerList = [].slice.call(sidebarRef.current.querySelectorAll('[data-bs-toggle="tooltip"]'));
      // Inicializa um tooltip para cada elemento encontrado
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl);
      });

      // Função de limpeza para destruir os tooltips quando o componente desmonta
      // ou quando a sidebar expande (para evitar tooltips desnecessários)
      return () => {
        tooltipList.forEach(tooltip => tooltip.dispose());
      };
    } else {
        // Se a sidebar estiver expandida, garante que tooltips antigos sejam removidos
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
    }
  }, [expanded]); // Dependência: re-executa quando 'expanded' muda

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Definição dos itens de navegação com ícones do Bootstrap
  const navItems = [
    { path: '/', icon: 'bi-house-door-fill', text: 'Home' },
    { path: '/membros', icon: 'bi-people-fill', text: 'Membros' },
    { path: '/cadastro', icon: 'bi-clipboard-data-fill', text: 'Cadastro' },
    { path: '/financeiro', icon: 'bi-cash-stack', text: 'Financeiro' },
  ];

  return (
    <div
      ref={sidebarRef} // Atribui a ref ao elemento principal da sidebar
      className={`d-flex flex-column vh-100 p-3 bg-dark text-white transition-width ${
        expanded ? 'sidebar-expanded' : 'sidebar-collapsed'
      }`}
      style={{ width: expanded ? '280px' : '80px', transition: 'width 0.3s ease-in-out' }} // Estilo inline para transição suave da largura
    >
      {/* Cabeçalho da Sidebar */}
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {expanded && (
          // Logo ou Título - Aparece apenas quando expandido
          <img 
            src={iconlogo} 
            alt="Logo" 
            
          />
          // Se quiser usar a imagem como no original:
          // <img src="/img/iconlogo.png" alt="Logo" style={{ height: '32px' }} className="me-2" />
        )}
        {/* Botão de Toggle - Movido para o final do cabeçalho ou início do corpo para melhor posicionamento */}
      </div>

      {/* Botão de Toggle - Posicionado no topo, mas após o logo/título */}
      <div className={`text-center ${expanded ? 'text-md-end' : ''} mb-3`}>
        <button
          onClick={toggleSidebar}
          className="btn btn-outline-light"
          aria-label={expanded ? 'Contrair sidebar' : 'Expandir sidebar'}
        >
          <i className={`bi ${expanded ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
        </button>
      </div>

      <hr className="text-secondary" />

      {/* Lista de Navegação */}
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link
              to={item.path}
              className="nav-link text-white d-flex align-items-center py-2"
              // Atributos do Tooltip - aplicados apenas quando contraído
              data-bs-toggle={!expanded ? 'tooltip' : undefined}
              data-bs-placement={!expanded ? 'right' : undefined}
              title={!expanded ? item.text : undefined}
            >
              <i className={`bi ${item.icon} ${expanded ? 'me-2' : 'fs-4 mx-auto'}`}></i>
              {expanded && <span className="ms-1">{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="text-secondary" />

      {/* Rodapé da Sidebar (Exemplo: Informações do Usuário/Admin) */}
      <div className="d-flex align-items-center text-white">
        <i className={`bi bi-person-circle ${expanded ? 'me-2' : 'fs-4 mx-auto'}`}></i>
        {expanded && (
          <div>
            <strong>Admin</strong>
            {/* <small className="d-block text-muted">Online</small> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

