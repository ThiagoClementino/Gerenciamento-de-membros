import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom"; // Alterado para useParams
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext"; // (Seu context de Auth)

import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";

// 1. Schema de validação (Apenas senhas)
const resetPasswordSchema = z
  .object({
    senha: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
      .max(50, { message: "A senha deve ter no máximo 50 caracteres" }),
    confirmarSenha: z.string().min(1, { message: "Confirme sua senha" }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams(); // CORREÇÃO APLICADA AQUI: Usa useParams
  const { login } = useContext(AuthContext); // Para fazer login automático

  // Estados
  const [token, setToken] = useState(null); // Armazena o token da URL
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      senha: "",
      confirmarSenha: "",
    },
  });

  // 2. Lógica para capturar o Token da URL
  // Roda uma vez quando o componente é montado
  useEffect(() => {
    const urlToken = resetToken; // CORREÇÃO APLICADA AQUI: Usa a variável do useParams
    if (urlToken) {
      setToken(urlToken);
    } else {
      setServerError(
        "Token de redefinição inválido ou não encontrado. Por favor, solicite um novo link."
      );
    }
  }, [resetToken]); // CORREÇÃO APLICADA AQUI: Usa resetToken como dependência

  // 3. Função de envio
  const onSubmit = async (data) => {
    if (!token) {
      setServerError("Token inválido. Não é possível redefinir a senha.");
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      // A API espera um POST para /api/auth/resetpassword/:token
      // O token vai na URL, a senha vai no body
      const API_URL = `https://usuarios-saas-g-membros.vercel.app/api/auth/resetpassword/${token}`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // A API espera apenas o campo 'senha' no body
        body: JSON.stringify({ senha: data.senha }),
      });

      const result = await response.json();

      if (!response.ok) {
        // A API retorna { success: false, error: "mensagem" }
        throw new Error(result.error || `Erro ${response.status}`);
      }

      // 4. Sucesso!
      // A API retorna um *novo* token de login
      localStorage.setItem("token", result.token);
      login(); // Atualiza o AuthContext

      reset(); // Limpa o formulário

      Swal.fire({
        icon: "success",
        title: "Senha redefinida!",
        text: "Sua senha foi alterada e você já está logado.",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      // Redireciona para o dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      console.error("Falha ao redefinir senha:", error);
      setServerError(error.message || "Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // 5. O JSX (Interface)
  return (
    <Container
      fluid
      className="bg-primary-custom min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} xxl={3}>
          <Card className="shadow-custom-lg border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="mb-3">
                  <i
                    className="bi bi-key-fill text-primary-custom"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h3 className="fw-bold text-primary-custom mb-1">
                  Redefinir Senha
                </h3>
                <p className="text-muted-custom mb-0">Digite sua nova senha.</p>
              </div>

              {serverError && (
                <Alert
                  variant="danger"
                  className="mb-3 border-0 shadow-custom-sm"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {serverError}
                </Alert>
              )}

              {/* Só exibe o formulário se o token foi carregado */}
              {token ? (
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Senha */}
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-lock me-2"></i>
                      Nova Senha
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite a nova senha"
                      {...register("senha")}
                      isInvalid={!!errors.senha}
                      className="border-custom"
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.senha?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Confirmação de Senha */}
                  <Form.Group
                    className="mb-4"
                    controlId="formGroupConfirmPassword"
                  >
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-lock-fill me-2"></i>
                      Confirmar Nova Senha
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirme a nova senha"
                      {...register("confirmarSenha")}
                      isInvalid={!!errors.confirmarSenha}
                      className="border-custom"
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmarSenha?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Botão de envio */}
                  <div className="d-grid gap-2 mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="fw-semibold"
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Salvar Nova Senha
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              ) : (
                // Feedback visual se o token estiver carregando ou inválido
                !serverError && (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="text-muted mt-2">Carregando...</p>
                  </div>
                )
              )}

              <hr className="border-custom my-3" />

              <div className="text-center">
                <small className="text-muted-custom">
                  Lembrou a senha?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold text-primary-custom"
                  >
                    Fazer login
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
