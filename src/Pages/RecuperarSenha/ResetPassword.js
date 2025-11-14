// frontend/src/Pages/RecuperarSenha/ResetPassword.js

import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// Importe o CSS se necessário, ou garanta que ele já está no escopo global
// import "../../css/layout-responsivo-integrado.css";

// CORREÇÃO: URL base da API
const API_BASE_URL = "https://api-usuarios-five.vercel.app";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      // CORREÇÃO: Requisição para o endpoint PATCH /api/reset-password/:token
      const response = await axios.patch(
        `${API_BASE_URL}/api/reset-password/${token}`, // Incluído /api/
        {
          senha: password,
          confirmarSenha: confirmPassword,
        }
      );

      setMessage(
        response.data.message + " Você será redirecionado para o login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Erro ao redefinir a senha. Verifique se o link não expirou.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      {" "}
      {/* Classe de estilo aplicada */}
      <div className="form-container">
        {" "}
        {/* Classe de estilo aplicada */}
        <h2>Redefinir Senha</h2>
        {loading && <p>Processando...</p>}
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !message && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {" "}
              {/* Classe de estilo aplicada */}
              <label htmlFor="password" className="form-label">
                {" "}
                {/* Classe de estilo aplicada */}
                Nova Senha:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                className="form-control" // Classe de estilo aplicada
              />
            </div>
            <div className="mb-3">
              {" "}
              {/* Classe de estilo aplicada */}
              <label htmlFor="confirmPassword" className="form-label">
                {" "}
                {/* Classe de estilo aplicada */}
                Confirmar Nova Senha:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                className="form-control" // Classe de estilo aplicada
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary" // Classe de estilo aplicada
            >
              Redefinir Senha
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
