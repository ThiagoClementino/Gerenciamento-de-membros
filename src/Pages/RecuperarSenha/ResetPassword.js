// src/components/ResetPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE_URL = "reset-password/:token";

function ResetPassword() {
  // Extrai o token da URL (ex: /reset-password/TOKEN_AQUI)
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
      // O token é enviado na URL para o endpoint PATCH
      const response = await axios.patch(
        `${API_BASE_URL}/reset-password/${token}`,
        {
          senha: password,
          confirmarSenha: confirmPassword,
        }
      );

      setMessage(
        response.data.message + " Você será redirecionado para o login."
      );

      // Redireciona para a página de login após 3 segundos
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
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Redefinir Senha</h2>

      {loading && <p>Processando...</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !message && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Nova Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="confirmPassword"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Confirmar Nova Senha:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Redefinir Senha
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
