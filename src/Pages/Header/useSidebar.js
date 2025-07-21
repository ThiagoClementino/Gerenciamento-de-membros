import { useState, useEffect, useCallback } from "react";

/**
 * Hook customizado para gerenciar o estado da sidebar responsiva
 * @returns {Object} Objeto com estados e funções para controlar a sidebar
 */
export const useSidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Detecta mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);

      // Fecha a sidebar automaticamente quando muda para desktop
      if (!mobile && sidebarVisible) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarVisible]);

  // Função para alternar a visibilidade da sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarVisible((prev) => !prev);
  }, []);

  // Função para fechar a sidebar
  const closeSidebar = useCallback(() => {
    setSidebarVisible(false);
  }, []);

  // Função para abrir a sidebar
  const openSidebar = useCallback(() => {
    setSidebarVisible(true);
  }, []);

  // Efeito para gerenciar o scroll do body quando a sidebar está aberta em mobile
  useEffect(() => {
    if (isMobile && sidebarVisible) {
      // Previne scroll do body quando sidebar está aberta em mobile
      document.body.style.overflow = "hidden";
    } else {
      // Restaura scroll do body
      document.body.style.overflow = "unset";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarVisible]);

  // Efeito para fechar sidebar com tecla Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && sidebarVisible) {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarVisible, closeSidebar]);

  return {
    isMobile,
    sidebarVisible,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
};
