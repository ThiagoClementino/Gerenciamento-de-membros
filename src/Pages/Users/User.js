import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Spinner,
  Button,
  Form,
  InputGroup,
  
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faEnvelope,
  faPhone,
  faIdCard,
  faCalendarDays,
  faShieldHalved,
  faArrowLeft,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import {
  AuthContext,
} from "../../Contexts/AuthContext";

const User = () => {
  const navigate = useNavigate();

  const { logout } =
    useContext(AuthContext);

  // ========================================
  // ESTADOS
  // ========================================

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ========================================
  // BUSCAR USUÁRIO AUTENTICADO
  // ========================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token");

        // Caso não exista token
        if (!token) {
          logout();
          return;
        }

        const response = await fetch(
          "https://usuarios-saas-g-membros.vercel.app/api/auth/me",
          {
            method: "GET",

            headers: {
              Accept:
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const result =
          await response.json();

        // ====================================
        // TOKEN INVÁLIDO OU EXPIRADO
        // ====================================

        if (response.status === 401) {
          localStorage.removeItem(
            "token"
          );

          logout();

          return;
        }

        // ====================================
        // OUTROS ERROS DA API
        // ====================================

        if (!response.ok) {
          throw new Error(
            result.error ||
              result.message ||
              "Não foi possível carregar os dados do usuário."
          );
        }

        // ====================================
        // IMPORTANTE
        //
        // A API retorna:
        //
        // {
        //   success: true,
        //   data: {...}
        // }
        //
        // Portanto os dados do usuário
        // estão dentro de result.data
        // ====================================

        setUser(result.data);

      } catch (error) {
        console.error(
          "Erro ao buscar usuário:",
          error
        );

        setError(
          error.message ||
            "Erro ao carregar os dados do usuário."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [logout]);

  // ========================================
  // FORMATAR DATA
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "pt-BR"
    );
  };

  // ========================================
  // INICIAIS DO USUÁRIO
  // ========================================

  const getInitials = (name) => {
    if (!name) {
      return "U";
    }

    const names =
      name.trim().split(/\s+/);

    if (names.length === 1) {
      return names[0]
        .charAt(0)
        .toUpperCase();
    }

    const firstLetter =
      names[0].charAt(0);

    const lastLetter =
      names[
        names.length - 1
      ].charAt(0);

    return `${firstLetter}${lastLetter}`.toUpperCase();
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-vh-100 bg-body d-flex justify-content-center align-items-center">
        <div className="text-center">
          <Spinner
            animation="border"
            variant="primary"
          />

          <p className="text-secondary mt-3 mb-0">
            Carregando informações...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // JSX
  // ========================================

  return (
    <div className="min-vh-100 bg-body">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="py-3 px-3 px-md-4 border-bottom bg-body-tertiary shadow-sm">
        <Container fluid>
          <Row className="align-items-center g-3">

            <Col
              xs={12}
              md={8}
            >
              <div className="d-flex align-items-center">

                <Button
                  variant="link"
                  className="text-secondary p-0 me-3 shadow-none"
                  onClick={() =>
                    navigate(-1)
                  }
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                  />
                </Button>

                <div>
                  <h2 className="fw-bold mb-0 h4">

                    <FontAwesomeIcon
                      icon={faUser}
                      className="me-2 text-primary"
                    />

                    Minha Conta
                  </h2>

                  <small className="text-secondary">
                    Informações do usuário
                    autenticado
                  </small>
                </div>

              </div>
            </Col>

            <Col
              xs={12}
              md={4}
              className="text-md-end"
            >
              <Badge
                bg="success-subtle"
                className="text-success border border-success-subtle rounded-pill px-3 py-2"
              >
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="me-2"
                />

                Conta protegida
              </Badge>
            </Col>

          </Row>
        </Container>
      </header>

      {/* =====================================
          CONTEÚDO
      ====================================== */}

      <main className="py-4 px-2 px-md-4">

        <Container fluid>

          {/* =================================
              ERRO
          ================================== */}

          {error && (
            <Alert
              variant="danger"
              className="border-0 shadow-sm rounded-4 mb-4"
            >
              {error}
            </Alert>
          )}

          {/* =================================
              USUÁRIO
          ================================== */}

          {user && (
            <Row className="justify-content-center">

              <Col
                xs={12}
                lg={10}
                xl={8}
              >

                <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden">

                  <Card.Body className="p-4 p-md-5">

                    {/* =============================
                        PERFIL
                    ============================== */}

                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 mb-5">

                      {/* AVATAR */}

                      <div
                        className="rounded-circle bg-primary bg-opacity-10 border border-primary border-opacity-25 d-flex justify-content-center align-items-center flex-shrink-0"
                        style={{
                          width: "110px",
                          height: "110px",
                        }}
                      >
                        <span className="display-6 fw-bold text-primary">

                          {getInitials(
                            user.nomeCompleto
                          )}

                        </span>
                      </div>

                      {/* IDENTIFICAÇÃO */}

                      <div className="text-center text-md-start flex-grow-1">

                        <h3 className="fw-bold mb-2">

                          {user.nomeCompleto ||
                            "Usuário"}

                        </h3>

                        <p className="text-secondary mb-3">

                          {user.email ||
                            "E-mail não informado"}

                        </p>

                        <Badge
                          bg="primary-subtle"
                          className="text-primary border border-primary-subtle rounded-pill px-3 py-2"
                        >
                          Usuário ativo
                        </Badge>

                      </div>

                    </div>

                    {/* =============================
                        FORMULÁRIO
                    ============================== */}

                    <Form>

                      <Row className="g-4">

                        {/* NOME */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              Nome completo

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="text"

                                value={
                                  user.nomeCompleto ||
                                  ""
                                }

                                readOnly

                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                        {/* EMAIL */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              E-mail

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="email"

                                value={
                                  user.email ||
                                  ""
                                }

                                readOnly

                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                        {/* CARGO */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              Cargo

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={faBriefcase}
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="text"

                                value={
                                  user.cargo ||
                                  ""
                                }

                                readOnly

                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                        {/* TELEFONE */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              Telefone

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={faPhone}
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="text"

                                value={
                                  user.telefone ||
                                  ""
                                }

                                readOnly

                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                        {/* ID */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              Identificação

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={faIdCard}
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="text"

                                value={
                                  user._id
                                    ? user._id
                                        .slice(-8)
                                        .toUpperCase()
                                    : ""
                                }

                                readOnly

                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                        {/* DATA DE CRIAÇÃO */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              Conta criada em

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={
                                    faCalendarDays
                                  }
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="text"

                                value={
                                  formatDate(
                                    user.createdAt
                                  )
                                }

                                readOnly

                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                        {/* SEGURANÇA */}

                        <Col
                          xs={12}
                          md={6}
                        >
                          <Form.Group>

                            <Form.Label className="small fw-semibold text-secondary text-uppercase">

                              Segurança

                            </Form.Label>

                            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">

                              <InputGroup.Text className="bg-body border-0">

                                <FontAwesomeIcon
                                  icon={
                                    faShieldHalved
                                  }
                                  className="text-primary"
                                />

                              </InputGroup.Text>

                              <Form.Control
                                type="text"
                                value="Autenticação JWT"
                                readOnly
                                className="bg-body border-0 shadow-none py-3"
                              />

                            </InputGroup>

                          </Form.Group>
                        </Col>

                      </Row>

                    </Form>

                  </Card.Body>

                </Card>

              </Col>

            </Row>
          )}

        </Container>

      </main>

    </div>
  );
};

export default User;