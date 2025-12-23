import React, { createContext, useState, useEffect, useContext } from "react";

// Criação do Contexto
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inicializa o tema com o valor salvo no localStorage ou padrão 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme ? savedTheme : "light";
  });

  // Função para alternar entre light e dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Efeito fundamental para aplicar a classe ao body e salvar a preferência
  useEffect(() => {
    const body = document.body;

    // Remove as classes antigas para evitar sobreposição
    body.classList.remove("light-theme", "dark-theme");

    // Adiciona a classe correspondente ao tema atual
    if (theme === "dark") {
      body.classList.add("dark-theme");
    } else {
      // Opcional: adicionar 'light-theme' se quiser regras específicas para light
      body.classList.add("light-theme");
    }

    // Guarda a escolha do utilizador para a próxima sessão
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nos componentes
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};

export default ThemeContext;
