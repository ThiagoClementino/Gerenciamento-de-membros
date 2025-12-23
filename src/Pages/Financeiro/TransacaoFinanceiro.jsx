import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataContext from "../../Contexts/DataInfor";
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
  faTag,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TransacaoFinanceiro = () => {
  // --- LÓGICA ORIGINAL PRESERVADA ---
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isEditing, setIsEditing] = useState(false);
  const [theme] = useState("dark"); // Segue o padrão do Dashboard
  const { dadosfinance } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    setLoading(true);
    const foundTransaction = dadosfinance.find((dado) => dado._id === id);

    if (foundTransaction) {
      setTransaction(foundTransaction);
      setLoading(false);
    } else {
      const fetchDados = async () => {
        try {
          const response = await axios.get(
            `https://api-gestao-igreja-jcod.vercel.app/finance/${id}`
          );
          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          if (data) {
            setTransaction(data);
          } else {
            showAlertMessage("Transação não encontrada.", "danger");
          }
          setLoading(false);
        } catch (error) {
          showAlertMessage("Erro ao carregar dados da transação.", "danger");
          setLoading(false);
        }
      };
      fetchDados();
    }
  }, [id, dadosfinance, theme]);

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

  const handleSave = async () => {
    try {
      setSaving(true);
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
      showAlertMessage("Erro ao salvar os dados.", "danger");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-body">
        <Spinner animation="border" variant="primary" />
        <h5 className="mt-3 text-secondary">Sincronizando transação...</h5>
      </div>
    );
  }

  // --- INTERFACE REFATORADA ---
  return (
    <div className="vh-100 d-flex flex-column overflow-hidden bg-body">
      {/* HEADER FIXO - PADRÃO PREMIUM */}
      <header className="py-3 px-4 border-bottom bg-body-tertiary shadow-sm z-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="text-primary fs-4"
                  />
                </div>
                <div>
                  <h2 className="h4 fw-bold mb-0 text-body">
                    Detalhes da Transação
                  </h2>
                  <Breadcrumb className="mb-0 small">
                    <Breadcrumb.Item
                      onClick={() => navigate("/dashboard")}
                      style={{ cursor: "pointer" }}
                    >
                      Início
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      onClick={() => navigate("/financeiro")}
                      style={{ cursor: "pointer" }}
                    >
                      Financeiro
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      active
                      className="text-truncate"
                      style={{ maxWidth: "150px" }}
                    >
                      {id}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-end d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                className="rounded-pill px-3 border"
                onClick={() => navigate("/financeiro")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Voltar
              </Button>
              <Button
                variant={isEditing ? "success" : "primary"}
                size="sm"
                className="rounded-pill px-4 shadow-sm fw-bold"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={saving}
              >
                <FontAwesomeIcon
                  icon={isEditing ? faSave : faEdit}
                  className="me-2"
                />
                {saving
                  ? "Salvando..."
                  : isEditing
                  ? "Salvar"
                  : "Editar Lançamento"}
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ÁREA DE CONTEÚDO SCROLLÁVEL */}
      <main className="flex-grow-1 overflow-auto p-4 bg-body">
        <Container fluid>
          {showAlert && (
            <Alert
              variant={alertType}
              dismissible
              onClose={() => setShowAlert(false)}
              className="border-0 shadow-sm rounded-4 mb-4"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="me-2" />{" "}
              {alertMessage}
            </Alert>
          )}

          {/* CARDS DE RESUMO RÁPIDO */}
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Body className="d-flex align-items-center p-3">
                  <div
                    className={`p-3 rounded-circle bg-opacity-10 me-3 ${
                      transaction.tipodedado === "Receita"
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCoins} size="lg" />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Valor do Lançamento
                    </p>
                    <h4
                      className={`fw-bold mb-0 ${
                        transaction.tipodedado === "Receita"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      R${" "}
                      {parseFloat(transaction.valor).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </h4>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                    <FontAwesomeIcon icon={faTag} size="lg" />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Tipo / Status
                    </p>
                    <div className="d-flex gap-2 align-items-center">
                      <Badge
                        bg="primary-subtle"
                        className="text-primary border border-primary-subtle"
                      >
                        {transaction.tipodedado}
                      </Badge>
                      <Badge
                        bg={
                          transaction.statuspagamento === "Pago"
                            ? "success-subtle"
                            : "warning-subtle"
                        }
                        className={
                          transaction.statuspagamento === "Pago"
                            ? "text-success border border-success-subtle"
                            : "text-warning border border-warning-subtle"
                        }
                      >
                        {transaction.statuspagamento}
                      </Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info me-3">
                    <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Data do Pagamento
                    </p>
                    <h5 className="fw-bold mb-0 text-body">
                      {transaction.datapagamento}
                    </h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* FORMULÁRIO DETALHADO */}
          <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden mb-5">
            <Card.Header className="bg-body-secondary py-3 px-4 border-0">
              <h5 className="mb-0 h6 fw-bold text-body">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="me-2 text-primary"
                />
                DETALHES DO LANÇAMENTO
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Form>
                <Row className="g-4">
                  <Col md={4}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Tipo de Registro
                    </Form.Label>
                    <Form.Select
                      className="bg-body border shadow-none"
                      name="tipodedado"
                      value={transaction.tipodedado || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Receita">Receita</option>
                      <option value="Despesa">Despesa</option>
                    </Form.Select>
                  </Col>

                  <Col md={4}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Valor (R$)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      className="bg-body border shadow-none fw-bold"
                      name="valor"
                      value={transaction.valor || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>

                  <Col md={4}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Status
                    </Form.Label>
                    <Form.Select
                      className="bg-body border shadow-none"
                      name="statuspagamento"
                      value={transaction.statuspagamento || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Pago">Pago</option>
                      <option value="Não pago">Não pago</option>
                    </Form.Select>
                  </Col>

                  <Col md={4}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Data Vencimento/Pagamento
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="bg-body border shadow-none"
                      name="datapagamento"
                      value={transaction.datapagamento || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>

                  <Col md={8}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Categoria / Classificação
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="bg-body border shadow-none"
                      name="tipolancamento"
                      value={transaction.tipolancamento || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>

                  <Col md={12}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Descrição do Item
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="bg-body border shadow-none"
                      name="descricao"
                      value={transaction.descricao || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>

                  <Col md={12}>
                    <Form.Label className="small fw-bold text-secondary text-uppercase">
                      Observações Adicionais
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="bg-body border shadow-none"
                      name="observacao"
                      value={transaction.observacao || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>

                  <Col md={12}>
                    <div className="p-3 rounded-4 bg-body border d-flex align-items-center mt-2">
                      <div className="bg-body-secondary p-2 rounded-circle me-3">
                        <FontAwesomeIcon
                          icon={faHistory}
                          className="text-secondary"
                        />
                      </div>
                      <div>
                        <small
                          className="text-secondary d-block text-uppercase fw-bold"
                          style={{ fontSize: "0.65rem" }}
                        >
                          Registro gerado em
                        </small>
                        <span className="fw-bold text-body">
                          {transaction.dataderegistro}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </main>

      {/* FOOTER FIXO */}
      <footer className="py-2 px-4 border-top bg-body-tertiary text-secondary small d-flex justify-content-between align-items-center">
        <span>Gestão Financeira • 2025</span>
        <span className="font-monospace opacity-50">{id}</span>
      </footer>
    </div>
  );
};

export default TransacaoFinanceiro;
