// frontend/src/Pages/RecuperarSenha/ReqEmail.js

import React, { useState } from "react";
import axios from "axios";
// Importe o CSS se necessário, ou garanta que ele já está no escopo global
// import "../../css/layout-responsivo-integrado.css";

// CORREÇÃO: URL base da API e endpoint correto para solicitar o link
const API_BASE_URL = "https://api-usuarios-five.vercel.app";
// CORREÇÃO FINAL: Incluir o prefixo /api/
const API_URL = `${API_BASE_URL}/api/forgot-password`;

function ReqEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // CORREÇÃO: Envia a requisição para o endpoint POST /api/forgot-password
      const response = await axios.post(API_URL, { email });

      // Mensagem de sucesso genérica por segurança
      setMessage(response.data.message);
      setEmail("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Erro ao processar a solicitação. Tente novamente.";
      setError(errorMessage);
    }
  };

  return (
    <div className="form-section">
      {" "}
      {/* Classe de estilo aplicada */}
      <div className="form-container">
        {" "}
        {/* Classe de estilo aplicada */}
        <h2>Esqueci Minha Senha</h2>
        <p>Informe seu e-mail para receber o link de redefinição.</p>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {" "}
            {/* Classe de estilo aplicada */}
            <label htmlFor="email" className="form-label">
              {" "}
              {/* Classe de estilo aplicada */}
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control" // Classe de estilo aplicada
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary" // Classe de estilo aplicada
          >
            Enviar Link de Redefinição
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReqEmail;
