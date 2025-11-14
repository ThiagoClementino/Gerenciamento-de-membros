// src/components/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://api-usuarios-five.vercel.app/reset-password/:token"; // Ajuste a URL base conforme necessário

function ReqEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(API_URL, { email });

      // A mensagem de sucesso é genérica por segurança, como implementamos no backend
      setMessage(response.data.message);
      setEmail(""); // Limpa o campo após o envio
    } catch (err) {
      // Trata erros de requisição ou do servidor
      const errorMessage =
        err.response?.data?.message ||
        "Erro ao processar a solicitação. Tente novamente.";
      setError(errorMessage);
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
      <h2>Esqueci Minha Senha</h2>
      <p>Informe seu e-mail para receber o link de redefinição.</p>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Enviar Link de Redefinição
        </button>
      </form>
    </div>
  );
}

export default ReqEmail;
