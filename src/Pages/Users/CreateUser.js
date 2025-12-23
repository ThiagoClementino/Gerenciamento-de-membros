import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputMask } from "@react-input/mask";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
  faArrowLeft,
  faSun,
  faMoon,
  faCheckCircle,
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
const createUserSchema = z
  .object({
    nomeCompleto: z
      .string()
      .min(2, { message: "Digite o nome completo" })
      .max(100),
    telefone: z.string().min(14, { message: "Telefone inválido" }).max(15),
    email: z
      .string()
      .min(1, { message: "O e-mail é obrigatório" })
      .email({ message: "Email inválido" }),
    senha: z.string().min(6, { message: "Mínimo 6 caracteres" }).max(50),
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
  const [theme, setTheme] = useState("dark");

  // Aplicação do tema nativo Bootstrap 5.3
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

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

  // --- LÓGICA DE ENVIO PRESERVADA ---
  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");
    try {
      const requestData = { ...data };
      const response = await fetch(
        `https://usuarios-saas-g-membros.vercel.app/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erro no servidor");

      setSuccessMessage(result.message || "Usuário cadastrado com sucesso!");
      reset();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setApiError(error.message);
      if (error.message.includes("email"))
        setError("email", { message: "Email em uso" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-body">
      {/* BOTÃO DE TEMA FLUTUANTE (Para visualização) */}
      <div className="position-absolute top-0 end-0 p-3">
        <Button
          variant="outline-secondary"
          className="rounded-circle border-0 shadow-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </Button>
      </div>

      <Container className="d-flex flex-grow-1 justify-content-center align-items-center p-3">
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            {/* LOGO OU ÍCONE SUPERIOR */}
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 d-inline-flex p-4 rounded-circle mb-3 border border-primary border-opacity-10 shadow-sm">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-primary fs-2"
                />
              </div>
              <h2 className="fw-bold mb-1">Criar Conta</h2>
              <p className="text-secondary small">
                Preencha os dados para acessar o sistema
              </p>
            </div>

            <Card className="border shadow-lg rounded-4 bg-body-tertiary">
              <Card.Body className="p-4 p-md-5">
                {/* FEEDBACKS */}
                {apiError && (
                  <Alert
                    variant="danger"
                    className="border-0 shadow-sm rounded-3 py-2 small"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2" />{" "}
                    {apiError}
                  </Alert>
                )}

                {successMessage && (
                  <Alert
                    variant="success"
                    className="border-0 shadow-sm rounded-3 py-2 small"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="me-2" />{" "}
                    {successMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* NOME COMPLETO */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-secondary">
                      NOME COMPLETO
                    </Form.Label>
                    <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                      <InputGroup.Text className="bg-body border-0">
                        <FontAwesomeIcon icon={faUser} className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        className="bg-body border-0 shadow-none"
                        placeholder="Ex: João Silva"
                        {...register("nomeCompleto")}
                        isInvalid={!!errors.nomeCompleto}
                        disabled={isLoading}
                      />
                    </InputGroup>
                    <Form.Text className="text-danger small">
                      {errors.nomeCompleto?.message}
                    </Form.Text>
                  </Form.Group>

                  {/* EMAIL */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-secondary">
                      E-MAIL
                    </Form.Label>
                    <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                      <InputGroup.Text className="bg-body border-0">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-muted"
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        className="bg-body border-0 shadow-none"
                        placeholder="email@exemplo.com"
                        {...register("email")}
                        isInvalid={!!errors.email}
                        disabled={isLoading}
                      />
                    </InputGroup>
                    <Form.Text className="text-danger small">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>

                  {/* TELEFONE COM MÁSCARA */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-secondary">
                      WHATSAPP / CELULAR
                    </Form.Label>
                    <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                      <InputGroup.Text className="bg-body border-0">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-muted"
                        />
                      </InputGroup.Text>
                      <Controller
                        name="telefone"
                        control={control}
                        render={({ field }) => (
                          <InputMask
                            mask="(aa) aaaaa-bbbb"
                            replacement={{ a: /\d/, b: /\d/ }}
                            {...field}
                            component={Form.Control}
                            className="bg-body border-0 shadow-none"
                            placeholder="(11) 99999-9999"
                            isInvalid={!!errors.telefone}
                            disabled={isLoading}
                          />
                        )}
                      />
                    </InputGroup>
                    <Form.Text className="text-danger small">
                      {errors.telefone?.message}
                    </Form.Text>
                  </Form.Group>

                  {/* SENHA */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-secondary">
                      SENHA
                    </Form.Label>
                    <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
                      <InputGroup.Text className="bg-body border-0">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        className="bg-body border-0 shadow-none"
                        placeholder="Mínimo 6 dígitos"
                        {...register("senha")}
                        isInvalid={!!errors.senha}
                        disabled={isLoading}
                      />
                    </InputGroup>
                    <Form.Text className="text-danger small">
                      {errors.senha?.message}
                    </Form.Text>
                  </Form.Group>

                  {/* CONFIRMAR SENHA */}
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-secondary">
                      CONFIRMAR SENHA
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
                        className="bg-body border-0 shadow-none"
                        placeholder="Repita sua senha"
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
                    type="submit"
                    variant="primary"
                    className="w-100 py-3 rounded-pill fw-bold shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />{" "}
                        Cadastrando...
                      </>
                    ) : (
                      "CRIAR CONTA AGORA"
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-secondary small mb-0">
                    Já possui acesso?
                    <Button
                      variant="link"
                      className="fw-bold p-1 text-decoration-none shadow-none"
                      onClick={() => navigate("/")}
                      disabled={isLoading}
                    >
                      Fazer Login
                    </Button>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* VOLTAR */}
            <div className="text-center mt-4">
              <Button
                variant="link"
                size="sm"
                className="text-secondary text-decoration-none opacity-50"
                onClick={() => navigate("/")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Voltar
                para a página inicial
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateUser;
