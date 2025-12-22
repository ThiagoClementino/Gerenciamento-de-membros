import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Alert,
  Spinner,
  Breadcrumb,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSave,
  faArrowLeft,
  faCalendarAlt,
  faEdit,
  faMoneyBillWave,
  faFileInvoiceDollar,
  faInfoCircle,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TransacaoFinanceiro = () => {
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Carregar dados da transação
  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api-gestao-igreja-jcod.vercel.app/finance/${id}`
        );
        setTransaction(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showAlertMessage("Erro ao carregar dados da transação.", "danger");
        setLoading(false);
      }
    };
    fetchDados();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const showAlertMessage = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Salvar edições
  const handleSave = async () => {
    try {
      setSaving(true);
      // Ajuste para garantir que o valor seja número ao salvar
      const dataToSave = {
        ...transaction,
        valor: parseFloat(transaction.valor),
      };

      await axios.put(
        `https://api-gestao-igreja-jcod.vercel.app/finance/${id}`,
        dataToSave
      );
      showAlertMessage("Transação atualizada com sucesso!", "success");
      setIsEditing(false);
      setSaving(false);
    } catch (error) {
      console.error(error);
      showAlertMessage("Erro ao salvar os dados.", "danger");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="content-container d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h5 className="text-muted-custom">
              Carregando detalhes da transação...
            </h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="content-container">
        {/* Navbar Section */}
        <nav className="navbar-section">
          <Container
            fluid
            className="h-100 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <div>
                <h1 className="h3 mb-1 text-primary-custom fw-bold">
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="me-2"
                  />
                  Detalhes da Transação
                </h1>
                <p className="text-muted-custom mb-0">
                  Gestão detalhada do lançamento financeiro
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate("/financeiro")}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Voltar
              </Button>
              <Button
                variant={isEditing ? "success" : "primary"}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={saving}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon
                  icon={isEditing ? faSave : faEdit}
                  className="me-1"
                />
                {saving ? "Salvando..." : isEditing ? "Salvar" : "Editar"}
              </Button>
            </div>
          </Container>
        </nav>

        {/* Form Section - Informações Fixas e Alertas */}
        <section className="form-section">
          <Container fluid className="h-100 d-flex flex-column">
            <Row className="mb-3 flex-shrink-0">
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item
                    onClick={() => navigate("/dashboard")}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faHome} className="me-1" /> Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    onClick={() => navigate("/financeiro")}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faMoneyBillWave} className="me-1" />{" "}
                    Financeiro
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{transaction._id}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>

            {showAlert && (
              <Row className="mb-3 flex-shrink-0">
                <Col>
                  <Alert
                    variant={alertType}
                    dismissible
                    onClose={() => setShowAlert(false)}
                  >
                    {alertMessage}
                  </Alert>
                </Col>
              </Row>
            )}

            <Row className="flex-shrink-0">
              <Col md={6} className="mb-3">
                <Card className="border-0 shadow-custom-sm">
                  <Card.Body className="p-3">
                    <h6 className="text-muted-custom mb-2">
                      Identificação do Registro
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="mb-0 fw-bold text-primary-custom"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {transaction._id}
                      </p>
                      <Badge
                        bg={
                          transaction.tipodedado === "Receita"
                            ? "primary"
                            : "danger"
                        }
                      >
                        {transaction.tipodedado}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card className="border-0 shadow-custom-sm">
                  <Card.Body className="p-3">
                    <h6 className="text-muted-custom mb-2">Resumo Temporal</h6>
                    <div className="d-flex justify-content-between">
                      <div>
                        <small className="text-muted-custom">
                          Data de Lançamento:
                        </small>
                        <p className="mb-0 fw-semibold">
                          {transaction.dataderegistro}
                        </p>
                      </div>
                      <div className="text-end">
                        <small className="text-muted-custom">
                          Status Atual:
                        </small>
                        <p className="mb-0">
                          <Badge
                            bg={
                              transaction.statuspagamento === "Pago"
                                ? "success"
                                : "warning text-dark"
                            }
                          >
                            {transaction.statuspagamento}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Conteúdo com Scroll - Campos Editáveis */}
        <section
          className="scrollable-content-section"
          style={{ overflowY: "auto", flexGrow: 1 }}
        >
          <Container fluid className="p-4">
            <Row>
              <Col md={12} className="mb-4">
                <Card className="border-0 shadow-custom">
                  <Card.Header className="bg-secondary-custom border-0 py-3">
                    <h5 className="mb-0 fw-semibold text-white">
                      <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                      Informações Financeiras
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row className="g-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            Tipo de Registro
                          </Form.Label>
                          <Form.Select
                            name="tipodedado"
                            value={transaction.tipodedado || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="Receita">Receita</option>
                            <option value="Despesa">Despesa</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            Valor (R$)
                          </Form.Label>
                          <Form.Control
                            type="number"
                            step="0.01"
                            name="valor"
                            value={transaction.valor || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom fw-bold text-primary"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            Status de Pagamento
                          </Form.Label>
                          <Form.Select
                            name="statuspagamento"
                            value={transaction.statuspagamento || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="Pago">Pago</option>
                            <option value="Não pago">Não pago</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="me-1"
                            />{" "}
                            Data do Pagamento/Vencimento
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="datapagamento"
                            value={transaction.datapagamento || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            Categoria / Tipo Lançamento
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="tipolancamento"
                            value={transaction.tipolancamento || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            Descrição do Item
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="descricao"
                            value={transaction.descricao || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-bold small text-uppercase">
                            Observações Detalhadas
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="observacao"
                            value={transaction.observacao || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mt-4">
                        <div className="p-3 rounded bg-light border d-flex align-items-center">
                          <FontAwesomeIcon
                            icon={faHistory}
                            className="text-muted me-3"
                            size="lg"
                          />
                          <div>
                            <small className="text-muted d-block">
                              Metadados do Registro:
                            </small>
                            <span className="small text-dark">
                              Criado automaticamente pelo sistema em:{" "}
                              <strong>{transaction.dataderegistro}</strong>
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default TransacaoFinanceiro;
