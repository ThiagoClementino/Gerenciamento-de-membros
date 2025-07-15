import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Button,
  Alert,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";

// Esquema de validação (sem alterações)
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Serviço de API com a correção na resposta
const apiService = {
  login: async (email, senha) => {
    const API_URL = "https://api-usuarios-five.vercel.app/api/login";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    // Se a resposta não for OK, primeiro tenta ler o JSON do erro
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error || `Erro ${response.status}`);
    }

    // CORREÇÃO AQUI: A API retorna o token como texto/string puro
    const token = await response.text(); // Usar .text() em vez de .json()
    if (!token) {
      throw new Error("A API retornou uma resposta vazia em vez de um token.");
    }

    return token; // Retorna a string do token diretamente
  },
};

// Componente de Login com a correção no tratamento do resultado
const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const token = await apiService.login(data.email, data.password);

      localStorage.setItem("token", token);
      console.log("Login bem-sucedido! Token recebido.");
      login(); // Call the login function from AuthContext
      Swal.fire({
        icon: "success", // Ícone de sucesso
        title: "Logado com sucesso!",
        text: "Você será redirecionado em breve.",
        showConfirmButton: false, // Esconde o botão de "OK"
        timer: 2000, // Tempo em milissegundos antes de fechar automaticamente
        position: "center", // Centraliza a notificação
        timerProgressBar: true, // Mostra uma barra de progresso do timer
        didOpen: () => {
          Swal.showLoading(); // Mostra um ícone de carregamento sutil
        },
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      console.error("Falha no login:", error);
      setServerError(error.message || "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <Container
      fluid
      className="bg-primary-custom min-vh-100 d-flex align-items-center justify-content-center position-relative"
    >
      {/* Toggle de Tema no canto superior direito */}
      <div className="position-absolute top-0 end-0 p-3">
        <ThemeToggle size="sm" />
      </div>

      <Row className="justify-content-center w-100">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          xxl={3}
          className="d-flex justify-content-center align-items-center"
        >
          <Card className="shadow-custom-lg border-0">
            <Card.Body className="p-4">
              {/* Logo e Título */}
              <div className="text-center mb-4">
                <div className="mb-3">
                  <i
                    className="bi bi-people-fill text-primary-custom"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h3 className="fw-bold text-primary-custom mb-1">
                  Gestor de Membros
                </h3>
                <p className="text-muted-custom mb-0">
                  Faça login para continuar
                </p>
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

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-envelope me-2"></i>
                    E-mail
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@exemplo.com"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    className="border-custom"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formGroupPassword">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-lock me-2"></i>
                    Senha
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    className="border-custom"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="fw-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Entrando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Entrar
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mb-3">
                <Link
                  to="/recuperar-senha"
                  className="text-decoration-none text-muted-custom"
                >
                  <i className="bi bi-question-circle me-1"></i>
                  Esqueceu sua senha?
                </Link>
              </div>

              <hr className="border-custom my-3" />

              <div className="text-center">
                <small className="text-muted-custom">
                  Não possui um usuário?{" "}
                  <Link
                    to="/criarusuario"
                    className="text-decoration-none fw-semibold text-primary-custom"
                  >
                    Cadastre-se
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

export default Login;
