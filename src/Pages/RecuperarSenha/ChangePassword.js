import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

// 1. Schema de validação
const changePasswordSchema = z
  .object({
    senhaAtual: z.string().min(1, { message: "A senha atual é obrigatória" }),
    novaSenha: z
      .string()
      .min(6, { message: "A nova senha deve ter no mínimo 6 caracteres" }),
    confirmarNovaSenha: z
      .string()
      .min(1, { message: "Confirme sua nova senha" }),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarNovaSenha"],
  })
  .refine((data) => data.senhaAtual !== data.novaSenha, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["novaSenha"],
  });

const ChangePassword = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Pega a função de logout do context
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmarNovaSenha: "",
    },
  });

  // 2. Função de envio
  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");

    try {
      // Pega o token do usuário logado (armazenado no login)
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      // Este é um NOVO endpoint que precisaremos criar na API
      const API_URL = "http://localhost:5000/api/auth/updatepassword";

      const response = await fetch(API_URL, {
        method: "PUT", // Usamos PUT para atualizações
        headers: {
          "Content-Type": "application/json",
          // Envia o token de autorização
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senhaAtual: data.senhaAtual,
          novaSenha: data.novaSenha,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Erro ${response.status}`);
      }

      // 3. Sucesso!
      Swal.fire({
        icon: "success",
        title: "Senha Alterada!",
        text: "Sua senha foi atualizada. Por favor, faça login novamente.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Desloga o usuário e o redireciona para o login
      logout();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Falha ao alterar senha:", error);
      const errorMessage = error.message;

      // Se a API disser que a senha atual está errada, anexa o erro ao campo
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

  // 4. O JSX (Interface)
  // Este container pode ser colocado dentro do seu Dashboard/Layout
  return (
    <Container className="py-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow-custom-lg border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="mb-3">
                  <i
                    className="bi bi-shield-lock-fill text-primary-custom"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h3 className="fw-bold text-primary-custom mb-1">
                  Alterar Senha
                </h3>
                <p className="text-muted-custom mb-0">
                  Para sua segurança, informe sua senha atual.
                </p>
              </div>

              {serverError && !errors.senhaAtual && (
                <Alert
                  variant="danger"
                  className="mb-3 border-0 shadow-custom-sm"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {serverError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Senha Atual */}
                <Form.Group className="mb-3" controlId="formGroupSenhaAtual">
                  <Form.Label className="fw-semibold">Senha Atual</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha ATUAL"
                    {...register("senhaAtual")}
                    isInvalid={!!errors.senhaAtual}
                    className="border-custom"
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.senhaAtual?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Nova Senha */}
                <Form.Group className="mb-3" controlId="formGroupNovaSenha">
                  <Form.Label className="fw-semibold">Nova Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    {...register("novaSenha")}
                    isInvalid={!!errors.novaSenha}
                    className="border-custom"
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.novaSenha?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirmar Nova Senha */}
                <Form.Group
                  className="mb-4"
                  controlId="formGroupConfirmarNovaSenha"
                >
                  <Form.Label className="fw-semibold">
                    Confirmar Nova Senha
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repita a nova senha"
                    {...register("confirmarNovaSenha")}
                    isInvalid={!!errors.confirmarNovaSenha}
                    className="border-custom"
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmarNovaSenha?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Botão de envio */}
                <div className="d-grid gap-2">
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
                        <i className="bi bi-save me-2"></i>
                        Salvar Alterações
                      </>
                    )}
                  </Button>
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
