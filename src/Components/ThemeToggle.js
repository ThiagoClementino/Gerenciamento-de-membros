import React from "react";
import { useTheme } from "../Contexts/ThemeContext";

const ThemeToggle = ({ className = "", size = "sm" }) => {
  const { theme, toggleTheme } = useTheme();

  const buttonSize = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  const iconSize = size === "lg" ? "fs-4" : size === "sm" ? "fs-6" : "fs-5";

  return (
    <button
      onClick={toggleTheme}
      className={`btn theme-toggle ${buttonSize} ${className}`}
      title={
        theme === "light"
          ? "Alternar para modo escuro"
          : "Alternar para modo claro"
      }
      aria-label={
        theme === "light"
          ? "Alternar para modo escuro"
          : "Alternar para modo claro"
      }
    >
      <i
        className={`bi ${
          theme === "light" ? "bi-moon-fill" : "bi-sun-fill"
        } ${iconSize}`}
      ></i>
    </button>
  );
};

export default ThemeToggle;
