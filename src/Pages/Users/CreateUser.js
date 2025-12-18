import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputMask } from "@react-input/mask";

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

// Schema de validação ajustado para corresponder à API
const createUserSchema = z
  .object({
    nomeCompleto: z
      .string()
      .min(2, { message: "Digite o nome completo" })
      .max(100, { message: "Nome muito longo" }),

    telefone: z
      .string()
      .min(14, {
        message: "Telefone deve ter 10 ou 11 dígitos (incluindo DDD)",
      })
      .max(15, {
        message: "Telefone deve ter 10 ou 11 dígitos (incluindo DDD)",
      })
      .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
        message: "Formato de telefone inválido",
      }),

    email: z
      .string()
      .min(1, { message: "O e-mail é obrigatório" })
      .email({ message: "Digite um email válido" }),

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

const CreateUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      nomeCompleto: "",
      telefone: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  // Função de envio simplificada e corrigida
  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      // URL correta da API

      // Dados no formato esperado pela API
      const requestData = {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        telefone: data.telefone, // Mantém a formatação com máscara
        senha: data.senha,
        confirmarSenha: data.confirmarSenha,
      };

      console.log("📤 Enviando dados para API:", requestData);

      const response = await fetch(
        `https://usuarios-saas-g-membros.vercel.app/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      // Verifica se a resposta é JSON válida
      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        throw new Error(
          `Erro ${response.status}: Resposta inválida do servidor`
        );
      }

      if (!response.ok) {
        // Tratamento específico de erros da API
        if (result.message) {
          throw new Error(result.message);
        } else {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
      }

      // Sucesso
      console.log("✅ Usuário criado com sucesso:", result);
      setSuccessMessage(result.message || "Usuário cadastrado com sucesso!");

      // Limpa o formulário
      reset();

      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate("/"); // Redireciona para login após cadastro
      }, 2000);
    } catch (error) {
      console.error("❌ Erro no cadastro:", error);

      // Tratamento específico de erros
      const errorMessage = error.message;

      if (errorMessage.includes("email")) {
        setError("email", {
          type: "manual",
          message: "Este email já está em uso",
        });
      } else if (errorMessage.includes("senha")) {
        setError("senha", {
          type: "manual",
          message: "Problema com a senha fornecida",
        });
      }

      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center w-100">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="d-flex justify-content-center"
        >
          <Card className="shadow">
            <Card.Body className="p-4">
              <Card.Title className="mb-4 text-center h3">
                Cadastrar Usuário
              </Card.Title>

              {/* Mensagens de feedback */}
              {apiError && (
                <Alert variant="danger" className="mb-3">
                  <strong>Erro:</strong> {apiError}
                </Alert>
              )}

              {successMessage && (
                <Alert variant="success" className="mb-3">
                  <strong>Sucesso!</strong> {successMessage}
                  <br />
                  <small>Redirecionando para o login...</small>
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Nome Completo */}
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu nome completo"
                    {...register("nomeCompleto")}
                    isInvalid={!!errors.nomeCompleto}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nomeCompleto?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@exemplo.com"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Telefone com máscara */}
                <Form.Group className="mb-3">
                  <Form.Label>Telefone *</Form.Label>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <InputMask
                        mask="(aa) aaaaa-bbbb" // Usando placeholders diferentes (a, b)
                        replacement={{ a: /\d/, b: /\d/ }} // Definindo a regra para os novos placeholders
                        {...field}
                        component={Form.Control}
                        type="tel"
                        placeholder="(11) 99999-9999"
                        isInvalid={!!errors.telefone}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Senha */}
                <Form.Group className="mb-3">
                  <Form.Label>Senha *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite uma senha segura"
                    {...register("senha")}
                    isInvalid={!!errors.senha}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.senha?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Mínimo 6 caracteres.
                  </Form.Text>
                </Form.Group>

                {/* Confirmação de Senha */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirmar Senha *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("confirmarSenha")}
                    isInvalid={!!errors.confirmarSenha}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmarSenha?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Botão de envio */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2"
                  disabled={isLoading}
                  size="lg"
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
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </Form>

              {/* Link para login */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  Já tem uma conta?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={() => navigate("/")}
                    disabled={isLoading}
                  >
                    Faça login aqui
                  </Button>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
