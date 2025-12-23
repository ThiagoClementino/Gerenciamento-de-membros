import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faUsers,
  faExclamationTriangle,
  faQuestionCircle,
  faUserPlus,
  faChurch,
} from "@fortawesome/free-solid-svg-icons";

import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um email válido"),
  senha: z.string().min(6, "Mínimo 6 caracteres"),
});

const apiService = {
  login: async (email, senha) => {
    const API_URL = "https://usuarios-saas-g-membros.vercel.app/api/auth/login";
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.error || `Erro ${response.status}`);
    return result.token;
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { login } = useContext(AuthContext);
  const [theme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

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
      const token = await apiService.login(data.email, data.senha);
      localStorage.setItem("token", token);
      login();
      Swal.fire({
        icon: "success",
        title: "Bem-vindo!",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--bs-body-tertiary)",
        color: "var(--bs-body-color)",
      });
      setTimeout(() => navigate("/dashboard"), 2200);
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <Container fluid className="vh-100 p-0 overflow-hidden bg-body">
      <Row className="g-0 h-100">
        {/* CONTAINER ESQUERDO: IMAGEM (Oculto no Mobile) */}
        <Col
          md={6}
          lg={7}
          className="d-none d-md-flex position-relative overflow-hidden border-end border-primary border-opacity-10"
        >
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.4) grayscale(0.2)",
            }}
          />
          <div className="position-relative z-1 d-flex flex-column justify-content-end p-5 text-white w-100 h-100 bg-gradient-dark">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faChurch}
                className="fs-1 mb-3 text-primary"
              />
              <h1 className="display-4 fw-bold">
                Gestão Eclesiástica <br />
                <span className="text-primary">Premium</span>
              </h1>
              <p className="lead opacity-75">
                Sua comunidade conectada em um só lugar.
              </p>
            </div>
            <div className="d-flex gap-3 small opacity-50">
              <span>© 2025 SmartChurch v2.0</span>
              <span>•</span>
              <span>Privacidade e Termos</span>
            </div>
          </div>
        </Col>

        {/* CONTAINER DIREITO: FORMULÁRIO (Mais Largo e Centralizado) */}
        <Col
          xs={12}
          md={6}
          lg={5}
          className="d-flex align-items-center justify-content-center p-4 p-lg-5 bg-body"
        >
          <div className="w-100" style={{ maxWidth: "480px" }}>
            {" "}
            {/* Formulário mais largo aqui */}
            {/* TOGGLE DE TEMA FLUTUANTE */}
            <div className="position-absolute top-0 end-0 p-4">
              <ThemeToggle size="sm" />
            </div>
            {/* CABEÇALHO DO FORMULÁRIO */}
            <div className="mb-5">
              <div className="d-md-none text-center mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-primary fs-1" />
              </div>
              <h2 className="fw-bold h3 mb-2">Acessar Conta</h2>
              <p className="text-secondary">
                Informe seu e-mail e senha para prosseguir.
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
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-secondary text-uppercase ls-1">
                  E-mail Corporativo
                </Form.Label>
                <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                  <InputGroup.Text className="bg-body border-0">
                    <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="exemplo@igreja.com"
                    className="bg-body border-0 shadow-none py-3"
                    {...register("email")}
                    isInvalid={!!errors.email}
                  />
                </InputGroup>
                <Form.Text className="text-danger small">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Label className="small fw-bold text-secondary text-uppercase ls-1">
                    Senha de Acesso
                  </Form.Label>
                  <Link
                    to="/redefinirsenha"
                    className="small text-decoration-none text-primary fw-bold mb-2"
                  >
                    Esqueceu?
                  </Link>
                </div>
                <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                  <InputGroup.Text className="bg-body border-0">
                    <FontAwesomeIcon icon={faLock} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    className="bg-body border-0 shadow-none py-3"
                    {...register("senha")}
                    isInvalid={!!errors.senha}
                  />
                </InputGroup>
                <Form.Text className="text-danger small">
                  {errors.senha?.message}
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-100 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4"
              >
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" /> Autenticando...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSignInAlt} /> ENTRAR NO SISTEMA
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-secondary small mb-0">
                  Ainda não tem acesso?
                  <Link
                    to="/criarusuario"
                    className="ms-2 text-decoration-none fw-bold text-primary"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Criar
                    nova conta
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
