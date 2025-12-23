import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faLock,
  faCheckCircle,
  faExclamationTriangle,
  faArrowLeft,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";

// --- SCHEMA DE VALIDAÇÃO PRESERVADO ---
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
  const { resetToken } = useParams();
  const { login } = useContext(AuthContext);

  const [token, setToken] = useState(null);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    const urlToken = resetToken;
    if (urlToken) {
      setToken(urlToken);
    } else {
      setServerError(
        "Token de redefinição inválido ou expirado. Solicite um novo link."
      );
    }
  }, [resetToken, theme]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { senha: "", confirmarSenha: "" },
  });

  // --- LÓGICA DE ENVIO PRESERVADA ---
  const onSubmit = async (data) => {
    if (!token) {
      setServerError("Token inválido. Não é possível redefinir a senha.");
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const API_URL = `https://usuarios-saas-g-membros.vercel.app/api/auth/resetpassword/${token}`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: data.senha }),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.error || `Erro ${response.status}`);

      localStorage.setItem("token", result.token);
      login();
      reset();

      Swal.fire({
        icon: "success",
        title: "Senha redefinida!",
        text: "Sua segurança foi atualizada com sucesso.",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "var(--bs-body-tertiary)",
        color: "var(--bs-body-color)",
      });

      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (error) {
      setServerError(error.message || "Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 p-0 overflow-hidden bg-body">
      <Row className="g-0 h-100">
        {/* LADO ESQUERDO: IMAGEM (Oculto no Mobile) */}
        <Col
          md={6}
          lg={7}
          className="d-none d-md-flex position-relative overflow-hidden border-end border-primary border-opacity-10"
        >
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.3) grayscale(0.3)",
            }}
          />
          <div className="position-relative z-1 d-flex flex-column justify-content-end p-5 text-white w-100 h-100 bg-gradient-dark">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="fs-1 mb-3 text-primary"
              />
              <h1 className="display-4 fw-bold">
                Segurança <br />
                <span className="text-primary">Primeiro</span>
              </h1>
              <p className="lead opacity-75">
                Sua senha é a chave para a integridade dos seus dados.
              </p>
            </div>
            <div className="d-flex gap-3 small opacity-50 font-monospace">
              <span>ESTABELECENDO CONEXÃO SEGURA...</span>
            </div>
          </div>
        </Col>

        <Col
          xs={12}
          md={6}
          lg={5}
          className="d-flex align-items-center justify-content-center p-4 p-lg-5 bg-body"
        >
          <div className="w-100" style={{ maxWidth: "480px" }}>
            <div className="position-absolute top-0 end-0 p-4">
              <ThemeToggle size="sm" />
            </div>

            <div className="mb-5 text-center text-md-start">
              <div className="bg-primary bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3 d-md-none">
                <FontAwesomeIcon icon={faKey} className="text-primary fs-3" />
              </div>
              <h2 className="fw-bold h3 mb-2">Nova Senha</h2>
              <p className="text-secondary">
                Escolha uma combinação forte e segura.
              </p>
            </div>

            {serverError && (
              <Alert
                variant="danger"
                className="border-0 shadow-sm rounded-3 py-3 small mb-4"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="me-2"
                />
                {serverError}
              </Alert>
            )}

            {token ? (
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* CAMPO NOVA SENHA */}
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary text-uppercase ls-1">
                    Nova Senha
                  </Form.Label>
                  <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                    <InputGroup.Text className="bg-body border-0">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      className="bg-body border-0 shadow-none py-3"
                      {...register("senha")}
                      isInvalid={!!errors.senha}
                      disabled={isLoading}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger small">
                    {errors.senha?.message}
                  </Form.Text>
                </Form.Group>

                {/* CAMPO CONFIRMAR SENHA */}
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary text-uppercase ls-1">
                    Confirmar Senha
                  </Form.Label>
                  <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                    <InputGroup.Text className="bg-body border-0">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-muted opacity-50"
                      />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Repita a senha"
                      className="bg-body border-0 shadow-none py-3"
                      {...register("confirmarSenha")}
                      isInvalid={!!errors.confirmarSenha}
                      disabled={isLoading}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger small">
                    {errors.confirmarSenha?.message}
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                  className="w-100 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4"
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Atualizando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} /> REDEFINIR E
                      ENTRAR
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    to="/"
                    className="text-decoration-none small text-secondary fw-bold"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />{" "}
                    Voltar para o Login
                  </Link>
                </div>
              </Form>
            ) : (
              !serverError && (
                <div className="text-center p-5 border rounded-4 bg-body-tertiary shadow-sm">
                  <Spinner
                    animation="border"
                    variant="primary"
                    className="mb-3"
                  />
                  <p className="text-secondary mb-0 fw-bold">
                    Validando credenciais...
                  </p>
                </div>
              )
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
