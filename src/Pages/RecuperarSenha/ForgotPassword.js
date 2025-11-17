import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

// 1. Schema de validação (Apenas email)
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "Digite um email válido" }),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Para a msg de sucesso

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Função de envio
  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    setSuccessMessage(""); // Limpa sucesso anterior

    try {
      // Endpoint da API para "esqueci a senha"
      const API_URL =
        "https://usuarios-saas-g-membros.vercel.app/api/auth/forgotpassword";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        // A API retorna { success: false, error: "mensagem" }
        throw new Error(result.error || `Erro ${response.status}`);
      }

      // 3. Sucesso!
      // A API retorna { success: true, data: "Email enviado..." }
      setSuccessMessage(result.data);
      reset(); // Limpa o formulário
    } catch (error) {
      console.error("Falha ao solicitar redefinição:", error);
      const errorMessage = error.message;

      // Se a API disser que o usuário não existe, anexa o erro ao campo
      if (errorMessage.toLowerCase().includes("não encontrado")) {
        setError("email", {
          type: "manual",
          message: "Nenhum usuário encontrado com este email.",
        });
      }

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. O JSX (Interface)
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
                    className="bi bi-envelope-fill text-primary-custom"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h3 className="fw-bold text-primary-custom mb-1">
                  Recuperar Senha
                </h3>
                <p className="text-muted-custom mb-0">
                  Digite seu email para receber o link de redefinição.
                </p>
              </div>

              {/* Mensagem de Erro */}
              {serverError && (
                <Alert
                  variant="danger"
                  className="mb-3 border-0 shadow-custom-sm"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {serverError}
                </Alert>
              )}

              {/* Mensagem de Sucesso */}
              {successMessage && !serverError && (
                <Alert
                  variant="success"
                  className="mb-3 border-0 shadow-custom-sm"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>Sucesso!</strong> {successMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <Form.Group className="mb-4" controlId="formGroupEmail">
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
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
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
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i>
                        Enviar Link de Redefinição
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              <hr className="border-custom my-3" />

              <div className="text-center">
                <small className="text-muted-custom">
                  Lembrou sua senha?{" "}
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

export default ForgotPassword;
