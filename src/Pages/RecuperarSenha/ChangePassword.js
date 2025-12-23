import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt, // Alterado aqui
  faKey,
  faLock,
  faSave,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";

// --- LÓGICA DE VALIDAÇÃO PRESERVADA ---
const changePasswordSchema = z
  .object({
    senhaAtual: z.string().min(1, { message: "A senha atual é obrigatória" }),
    novaSenha: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    confirmarNovaSenha: z
      .string()
      .min(1, { message: "Confirme sua nova senha" }),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarNovaSenha"],
  })
  .refine((data) => data.senhaAtual !== data.novaSenha, {
    message: "A nova senha deve ser diferente da atual",
    path: ["novaSenha"],
  });

const ChangePassword = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useState("dark"); // Segue o padrão do seu sistema

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { senhaAtual: "", novaSenha: "", confirmarNovaSenha: "" },
  });

  // --- LÓGICA DE ENVIO PRESERVADA ---
  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      const API_URL = "http://localhost:5000/api/auth/updatepassword";
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senhaAtual: data.senhaAtual,
          novaSenha: data.novaSenha,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || `Erro ${response.status}`);

      Swal.fire({
        icon: "success",
        title: "Senha Alterada!",
        text: "Sua senha foi atualizada. Faça login novamente.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "var(--bs-body-tertiary)",
        color: "var(--bs-body-color)",
      });

      logout();
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage.toLowerCase().includes("senha atual")) {
        setError("senhaAtual", {
          type: "manual",
          message: "A senha atual está incorreta.",
        });
      }
      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex align-items-center justify-content-center min-vh-100 bg-body">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} lg={7} xl={5}>
          {/* CABEÇALHO DE SEGURANÇA */}
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 d-inline-flex p-4 rounded-circle mb-3 border border-primary border-opacity-10 shadow-sm">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-primary fs-1"
              />
            </div>
            <h2 className="fw-bold h3 mb-1 text-body">Alterar Senha</h2>
            <p className="text-secondary small">
              Atualize suas credenciais de acesso com segurança
            </p>
          </div>

          <Card className="border shadow-lg rounded-4 bg-body-tertiary">
            <Card.Body className="p-4 p-md-5">
              {serverError && !errors.senhaAtual && (
                <Alert
                  variant="danger"
                  className="border-0 shadow-sm rounded-3 py-2 small mb-4 d-flex align-items-center"
                >
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="me-2"
                  />
                  {serverError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* SENHA ATUAL */}
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Senha Atual
                  </Form.Label>
                  <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                    <InputGroup.Text className="bg-body border-0">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Digite sua senha atual"
                      className="bg-body border-0 shadow-none py-2"
                      {...register("senhaAtual")}
                      isInvalid={!!errors.senhaAtual}
                      disabled={isLoading}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger small">
                    {errors.senhaAtual?.message}
                  </Form.Text>
                </Form.Group>

                {/* NOVA SENHA */}
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Nova Senha
                  </Form.Label>
                  <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                    <InputGroup.Text className="bg-body border-0">
                      <FontAwesomeIcon icon={faKey} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      className="bg-body border-0 shadow-none py-2"
                      {...register("novaSenha")}
                      isInvalid={!!errors.novaSenha}
                      disabled={isLoading}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger small">
                    {errors.novaSenha?.message}
                  </Form.Text>
                </Form.Group>

                {/* CONFIRMAR NOVA SENHA */}
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Confirmar Nova Senha
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
                      placeholder="Repita a nova senha"
                      className="bg-body border-0 shadow-none py-2"
                      {...register("confirmarNovaSenha")}
                      isInvalid={!!errors.confirmarNovaSenha}
                      disabled={isLoading}
                    />
                  </InputGroup>
                  <Form.Text className="text-danger small">
                    {errors.confirmarNovaSenha?.message}
                  </Form.Text>
                </Form.Group>

                {/* BOTÃO DE AÇÃO */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                  className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Atualizando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} /> SALVAR ALTERAÇÕES
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <div className="p-3 rounded-3 bg-body border small text-secondary">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="me-2 text-primary"
                    />
                    Após a alteração, sua sessão será encerrada para garantir a
                    segurança da nova credencial.
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
