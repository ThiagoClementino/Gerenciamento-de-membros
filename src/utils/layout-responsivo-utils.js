// ========================================
// UTILITÁRIOS JAVASCRIPT PARA LAYOUT RESPONSIVO
// Funcionalidades específicas para o layout integrado
// ========================================

/**
 * Classe para gerenciar o layout responsivo integrado
 */
class ResponsiveLayoutManager {
  constructor() {
    this.isMobile = window.innerWidth < 992;
    this.isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
    this.sidebarVisible = false;
    this.init();
  }

  /**
   * Inicializa o gerenciador
   */
  init() {
    this.bindEvents();
    this.handleResize();
    this.setupAccessibility();
    this.initializeTooltips();
  }

  /**
   * Vincula eventos do DOM
   */
  bindEvents() {
    // Resize window
    window.addEventListener("resize", () => this.handleResize());

    // Escape key para fechar sidebar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sidebarVisible) {
        this.closeSidebar();
      }
    });

    // Clique fora da sidebar para fechar em mobile
    document.addEventListener("click", (e) => {
      if (this.isMobile && this.sidebarVisible) {
        const sidebar = document.querySelector(".sidebar-mobile");
        const toggleButton = document.querySelector("[data-toggle-sidebar]");

        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          toggleButton &&
          !toggleButton.contains(e.target)
        ) {
          this.closeSidebar();
        }
      }
    });

    // Form submissions
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    });
  }

  /**
   * Gerencia redimensionamento da janela
   */
  handleResize() {
    const wasMobile = this.isMobile;
    const wasTablet = this.isTablet;

    this.isMobile = window.innerWidth < 992;
    this.isTablet = window.innerWidth >= 768 && window.innerWidth < 992;

    // Se mudou de mobile para desktop, fecha a sidebar
    if (wasMobile && !this.isMobile && this.sidebarVisible) {
      this.closeSidebar();
    }

    // Ajusta alturas baseado no dispositivo
    this.adjustHeights();

    // Reinicializa tooltips se necessário
    if (wasMobile !== this.isMobile || wasTablet !== this.isTablet) {
      this.initializeTooltips();
    }
  }

  /**
   * Ajusta alturas das seções baseado no dispositivo
   */
  adjustHeights() {
    const contentContainer = document.querySelector(".content-container");
    const navbarSection = document.querySelector(".navbar-section");
    const formSection = document.querySelector(".form-section");
    const tableSection = document.querySelector(".table-section");
    const footerSection = document.querySelector(".footer-section");

    if (!contentContainer) return;

    if (this.isMobile) {
      // Mobile: altura automática com scroll
      contentContainer.style.height = "auto";
      contentContainer.style.minHeight = "100vh";
      contentContainer.style.overflowY = "auto";

      if (formSection) {
        formSection.style.height = "auto";
        formSection.style.minHeight = "300px";
      }

      if (tableSection) {
        tableSection.style.height = "auto";
        tableSection.style.minHeight = "250px";
      }
    } else {
      // Desktop/Tablet: proporções fixas
      contentContainer.style.height = "100vh";
      contentContainer.style.minHeight = "";
      contentContainer.style.overflowY = "hidden";

      if (this.isTablet) {
        if (navbarSection)
          navbarSection.style.height = "var(--navbar-height-tablet)";
        if (formSection) formSection.style.height = "var(--form-height-tablet)";
        if (tableSection)
          tableSection.style.height = "var(--table-height-tablet)";
      } else {
        if (navbarSection)
          navbarSection.style.height = "var(--navbar-height-desktop)";
        if (formSection)
          formSection.style.height = "var(--form-height-desktop)";
        if (tableSection)
          tableSection.style.height = "var(--table-height-desktop)";
      }
    }
  }

  /**
   * Abre a sidebar
   */
  openSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if (sidebar) {
      if (this.isMobile) {
        sidebar.classList.add("sidebar-mobile-show");
        if (overlay) overlay.classList.add("show");
        document.body.style.overflow = "hidden";
      }
      this.sidebarVisible = true;
      this.updateAriaAttributes();
    }
  }

  /**
   * Fecha a sidebar
   */
  closeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if (sidebar) {
      if (this.isMobile) {
        sidebar.classList.remove("sidebar-mobile-show");
        if (overlay) overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
      this.sidebarVisible = false;
      this.updateAriaAttributes();
    }
  }

  /**
   * Toggle da sidebar
   */
  toggleSidebar() {
    if (this.sidebarVisible) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  /**
   * Configura acessibilidade
   */
  setupAccessibility() {
    // ARIA labels para botões de toggle
    const toggleButtons = document.querySelectorAll("[data-toggle-sidebar]");
    toggleButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", "sidebar");
    });

    // ARIA para sidebar
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.setAttribute("id", "sidebar");
      sidebar.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * Atualiza ARIA attributes
   */
  updateAriaAttributes() {
    const toggleButtons = document.querySelectorAll("[data-toggle-sidebar]");
    const sidebar = document.querySelector(".sidebar");

    toggleButtons.forEach((button) => {
      button.setAttribute("aria-expanded", this.sidebarVisible.toString());
    });

    if (sidebar) {
      sidebar.setAttribute("aria-hidden", (!this.sidebarVisible).toString());
    }
  }

  /**
   * Inicializa tooltips do Bootstrap
   */
  initializeTooltips() {
    // Remove tooltips existentes
    const existingTooltips = document.querySelectorAll(".tooltip");
    existingTooltips.forEach((tooltip) => tooltip.remove());

    // Inicializa novos tooltips apenas se não for mobile
    if (!this.isMobile && window.bootstrap && window.bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  /**
   * Gerencia submissão de formulários
   */
  handleFormSubmit(event) {
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      const originalText = submitButton.innerHTML;
      const originalDisabled = submitButton.disabled;

      // Adiciona loading state
      submitButton.innerHTML =
        '<i class="bi bi-arrow-repeat spin me-1"></i>Salvando...';
      submitButton.disabled = true;

      // Adiciona classe de animação
      submitButton.classList.add("loading");

      // Simula processamento (remover em produção)
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = originalDisabled;
        submitButton.classList.remove("loading");
        this.showSuccessMessage();
      }, 1000);
    }
  }

  /**
   * Exibe mensagem de sucesso
   */
  showSuccessMessage() {
    const alert = document.createElement("div");
    alert.className =
      "alert alert-success alert-dismissible fade show position-fixed";
    alert.style.cssText = `
      top: 20px; 
      right: 20px; 
      z-index: 9999; 
      min-width: 300px;
      box-shadow: var(--custom-shadow-lg);
    `;
    alert.innerHTML = `
      <i class="bi bi-check-circle me-2"></i>
      Dados salvos com sucesso!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Remove automaticamente após 3 segundos
    setTimeout(() => {
      if (alert.parentNode) {
        alert.classList.remove("show");
        setTimeout(() => alert.remove(), 150);
      }
    }, 3000);
  }

  /**
   * Otimiza performance da tabela
   */
  optimizeTable() {
    const tables = document.querySelectorAll(".table-responsive .table");

    tables.forEach((table) => {
      // Virtualização simples para tabelas grandes
      const tbody = table.querySelector("tbody");
      if (tbody && tbody.children.length > 100) {
        this.virtualizeTable(table);
      }

      // Adiciona scroll horizontal em mobile se necessário
      if (this.isMobile) {
        const tableContainer = table.closest(".table-responsive");
        if (tableContainer) {
          tableContainer.style.overflowX = "auto";
        }
      }
    });
  }

  /**
   * Virtualização simples de tabela (para tabelas muito grandes)
   */
  virtualizeTable(table) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.children);
    const visibleRows = 50; // Número de linhas visíveis
    let startIndex = 0;

    const updateVisibleRows = () => {
      rows.forEach((row, index) => {
        if (index >= startIndex && index < startIndex + visibleRows) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };

    // Scroll listener para atualizar linhas visíveis
    const tableContainer = table.closest(".table-responsive");
    if (tableContainer) {
      tableContainer.addEventListener("scroll", () => {
        const scrollTop = tableContainer.scrollTop;
        const rowHeight = 40; // Altura estimada da linha
        startIndex = Math.floor(scrollTop / rowHeight);
        updateVisibleRows();
      });
    }

    updateVisibleRows();
  }
}

/**
 * Utilitários para gerenciamento de tema
 */
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  bindEvents() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(this.currentTheme);
    localStorage.setItem("theme", this.currentTheme);
  }

  applyTheme(theme) {
    const html = document.documentElement; // Altera para o elemento html
    if (theme === "dark") {
      html.classList.add("theme-dark");
    } else {
      html.classList.remove("theme-dark");
    }
  }
}

/**
 * Inicialização quando o DOM estiver pronto
 */
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa gerenciadores
  window.responsiveLayoutManager = new ResponsiveLayoutManager();
  window.themeManager = new ThemeManager();

  // Adiciona classe fade-in aos elementos principais
  const mainElements = document.querySelectorAll(
    ".navbar-section, .form-section, .table-section, .footer-section"
  );
  mainElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("fade-in");
    }, index * 100);
  });

  // Otimiza tabelas após carregamento
  setTimeout(() => {
    window.responsiveLayoutManager.optimizeTable();
  }, 500);
});

/**
 * Funções utilitárias globais
 */
window.ResponsiveLayoutUtils = {
  /**
   * Força atualização do layout
   */
  refreshLayout() {
    if (window.responsiveLayoutManager) {
      window.responsiveLayoutManager.handleResize();
    }
  },

  /**
   * Abre sidebar programaticamente
   */
  openSidebar() {
    if (window.responsiveLayoutManager) {
      window.responsiveLayoutManager.openSidebar();
    }
  },

  /**
   * Fecha sidebar programaticamente
   */
  closeSidebar() {
    if (window.responsiveLayoutManager) {
      window.responsiveLayoutManager.closeSidebar();
    }
  },

  /**
   * Toggle sidebar programaticamente
   */
  toggleSidebar() {
    if (window.responsiveLayoutManager) {
      window.responsiveLayoutManager.toggleSidebar();
    }
  },

  /**
   * Verifica se está em modo mobile
   */
  isMobile() {
    return window.responsiveLayoutManager
      ? window.responsiveLayoutManager.isMobile
      : window.innerWidth < 992;
  },

  /**
   * Verifica se está em modo tablet
   */
  isTablet() {
    return window.responsiveLayoutManager
      ? window.responsiveLayoutManager.isTablet
      : window.innerWidth >= 768 && window.innerWidth < 992;
  },

  /**
   * Toggle tema
   */
  toggleTheme() {
    if (window.themeManager) {
      window.themeManager.toggleTheme();
    }
  },

  /**
   * Otimiza performance
   */
  optimizePerformance() {
    if (window.responsiveLayoutManager) {
      window.responsiveLayoutManager.optimizeTable();
    }
  },
};

// CSS para animação de loading
const style = document.createElement("style");
style.textContent = `
  .loading {
    position: relative;
    pointer-events: none;
  }
  
  .spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
