import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../Contexts/DataInfor";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Badge,
  InputGroup,
  Navbar,
} from "react-bootstrap";

export const Financeiro = () => {
  const { dadosfinance, setDadosfinance } = useContext(DataContext);
  const [dataRegistro, setDataRegistro] = useState("");
  const [formError, setFormError] = useState(null);

  // Hook para gerenciar sidebar responsiva

  const [financialData, setFinancialData] = useState({
    tipodedado: "",
    valor: "",
    statuspagamento: "",
    datapagamento: "",
    tipolancamento: "",
    comprovante: null,
    observacao: "",
    descricao: "",
  });

  const handleCampfinancial = useCallback((event) => {
    const { name, value } = event.target;
    setFinancialData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFormFinancial = useCallback(
    async (event) => {
      event.preventDefault();
      setFormError(null);

      try {
        const response = await fetch(
          "https://api-gestao-igreja.onrender.com/finance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(financialData),
            mode: "cors",
          }
        );

        if (!response.ok) {
          let errorMessage =
            "Erro ao salvar os dados financeiros. Por favor, tente novamente.";
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            console.error(
              "Erro ao analisar a resposta JSON de erro:",
              jsonError
            );
          }
          throw new Error(errorMessage);
        }

        const json = await response.json();
        console.log(json);

        if (setDadosfinance) {
          setDadosfinance((prevDados) => [
            ...prevDados,
            { ...financialData, _id: json._id },
          ]);
        }

        setFinancialData({
          tipodedado: "",
          valor: "",
          statuspagamento: "",
          datapagamento: "",
          tipolancamento: "",
          comprovante: null,
          observacao: "",
          descricao: "",
        });

        alert("Dados financeiros salvos com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        setFormError(
          error.message ||
            "Erro ao salvar os dados financeiros. Por favor, tente novamente."
        );
      }
    },
    [financialData, setDadosfinance]
  );

  const handleSearch = useCallback((e) => {
    setDataRegistro(e.target.value);
  }, []);

  const toLowerSafe = (value) =>
    typeof value === "string" ? value.toLowerCase() : "";

  const filteredFinance = dadosfinance.filter((dado) => {
    const lowerSearchTerm = toLowerSafe(dataRegistro);
    return (
      toLowerSafe(dado.dataderegistro).includes(lowerSearchTerm) ||
      toLowerSafe(dado.tipodedado).includes(lowerSearchTerm) ||
      toLowerSafe(dado.statuspagamento).includes(lowerSearchTerm) ||
      toLowerSafe(dado.datapagamento).includes(lowerSearchTerm) ||
      toLowerSafe(dado.tipolancamento).includes(lowerSearchTerm) ||
      toLowerSafe(dado.observacao).includes(lowerSearchTerm)
    );
  });

  const getStatusVariant = (status) => {
    return status === "Pago" ? "success" : "warning";
  };

  const getTipoVariant = (tipo) => {
    return tipo === "Receita" ? "primary" : "danger";
  };

  return (
    <div className="main-wrapper">
      {/* Sidebar Responsiva */}

      {/* Container Principal de Conteúdo */}
      <div className="content-container">
        {/* BARRA DE NAVEGAÇÃO - 10% */}
        <nav className="navbar-section">
          <Container fluid className="d-flex align-items-center">
            <h5 className="mb-0 me-auto text-primary-custom fw-bold">
              💰 Gestão Financeira
            </h5>

            <div className="d-flex align-items-center gap-2">
              <Badge bg="success" className="d-none d-sm-inline">
                Online
              </Badge>
              <small className="text-muted-custom d-none d-md-inline">
                {new Date().toLocaleDateString("pt-BR")}
              </small>
            </div>
          </Container>
        </nav>

        {/* SEÇÃO DO FORMULÁRIO - 35% */}
        <section className="form-section">
          <Container fluid>
            <div className="form-container">
              {/* Header do Formulário */}
              <Row className="mb-3">
                <Col xs={12} md={8}>
                  <h6 className="mb-1 text-primary-custom fw-semibold">
                    <i className="bi bi-plus-circle me-2"></i>
                    Novo Registro Financeiro
                  </h6>
                  <p className="text-muted-custom mb-0 small">
                    Cadastre receitas e despesas da organização
                  </p>
                </Col>
                <Col xs={12} md={4}>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-tertiary-custom border-custom">
                      <i className="bi bi-search text-primary-custom"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      placeholder="Buscar registros..."
                      value={dataRegistro}
                      onChange={handleSearch}
                      className="border-custom"
                    />
                  </InputGroup>
                </Col>
              </Row>

              {/* Alerta de Erro */}
              {formError && (
                <Alert
                  variant="danger"
                  className="mb-3 shadow-custom-sm border-custom"
                >
                  <Alert.Heading className="h6 text-danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Erro no processamento
                  </Alert.Heading>
                  <p className="mb-0 small">{formError}</p>
                </Alert>
              )}

              {/* Formulário */}
              <Form
                onSubmit={handleFormFinancial}
                encType="multipart/form-data"
              >
                {/* Primeira linha */}
                <Row className="g-3 mb-3">
                  <Col xs={12} md={6} lg={4}>
                    <Form.Group controlId="tipodedado">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-bookmark me-1"></i>
                        Tipo de registro
                      </Form.Label>
                      <Form.Select
                        name="tipodedado"
                        value={financialData.tipodedado}
                        onChange={handleCampfinancial}
                        required
                        size="sm"
                        className="shadow-custom-sm border-custom"
                      >
                        <option value="">Selecione o tipo...</option>
                        <option value="Receita">💰 Receita</option>
                        <option value="Despesa">💸 Despesa</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} lg={4}>
                    <Form.Group controlId="valor">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-currency-dollar me-1"></i>
                        Valor
                      </Form.Label>
                      <InputGroup size="sm" className="shadow-custom-sm">
                        <InputGroup.Text className="bg-tertiary-custom border-custom text-primary-custom fw-bold">
                          R$
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="valor"
                          value={financialData.valor}
                          onChange={handleCampfinancial}
                          placeholder="0,00"
                          step="0.01"
                          min="0"
                          required
                          className="border-custom"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={12} lg={4}>
                    <Form.Group controlId="statuspagamento">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-check-circle me-1"></i>
                        Status
                      </Form.Label>
                      <Form.Select
                        name="statuspagamento"
                        value={financialData.statuspagamento}
                        onChange={handleCampfinancial}
                        required
                        size="sm"
                        className="shadow-custom-sm border-custom"
                      >
                        <option value="">Selecione o status...</option>
                        <option value="Pago">✅ Pago</option>
                        <option value="Não pago">⏳ Pendente</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Segunda linha */}
                <Row className="g-3 mb-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="datapagamento">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-calendar3 me-1"></i>
                        Data do registro
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="datapagamento"
                        value={financialData.datapagamento}
                        onChange={handleCampfinancial}
                        required
                        size="sm"
                        className="shadow-custom-sm border-custom"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="tipolancamento">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-tags me-1"></i>
                        Categoria
                      </Form.Label>
                      <Form.Select
                        name="tipolancamento"
                        value={financialData.tipolancamento}
                        onChange={handleCampfinancial}
                        required
                        size="sm"
                        className="shadow-custom-sm border-custom"
                      >
                        <option value="">Selecione a categoria...</option>
                        <option value="Agua">💧 Água</option>
                        <option value="Luz">💡 Energia Elétrica</option>
                        <option value="Aluguel">🏠 Aluguel</option>
                        <option value="Despesa de departamento">
                          🏢 Despesa Departamental
                        </option>
                        <option value="Internet">🌐 Internet</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Terceira linha */}
                <Row className="g-3 mb-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="descricao">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-file-text me-1"></i>
                        Descrição
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="descricao"
                        rows={3}
                        value={financialData.descricao}
                        onChange={handleCampfinancial}
                        placeholder="Descreva os detalhes do registro..."
                        required
                        size="sm"
                        className="shadow-custom-sm border-custom"
                        style={{ resize: "vertical" }}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="observacao">
                      <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                        <i className="bi bi-chat-dots me-1"></i>
                        Observações
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="observacao"
                        rows={3}
                        value={financialData.observacao}
                        onChange={handleCampfinancial}
                        placeholder="Informações adicionais..."
                        required
                        size="sm"
                        className="shadow-custom-sm border-custom"
                        style={{ resize: "vertical" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Botões */}
                <Row>
                  <Col xs={12}>
                    <div className="d-flex gap-2 justify-content-end">
                      <Button
                        type="button"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          setFinancialData({
                            tipodedado: "",
                            valor: "",
                            statuspagamento: "",
                            datapagamento: "",
                            tipolancamento: "",
                            comprovante: null,
                            observacao: "",
                            descricao: "",
                          })
                        }
                      >
                        <i className="bi bi-arrow-clockwise me-1"></i>
                        Limpar
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="fw-semibold"
                      >
                        <i className="bi bi-save me-1"></i>
                        Salvar Registro
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Container>
        </section>

        {/* SEÇÃO DA TABELA - 40% */}
        <section className="table-section">
          <Container fluid className="h-100">
            <div className="table-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold text-primary-custom">
                  <i className="bi bi-table me-2"></i>
                  Registros Financeiros
                </h6>
                <Badge
                  bg="light"
                  text="dark"
                  className="fs-6 px-2 py-1 shadow-custom-sm"
                  style={{
                    backgroundColor: "var(--custom-accent-secondary)",
                    color: "white",
                  }}
                >
                  <i className="bi bi-list-ol me-1"></i>
                  {filteredFinance.length} registros
                </Badge>
              </div>

              <div className="table-responsive">
                <Table
                  striped
                  hover
                  size="sm"
                  className="mb-0 align-middle border-custom"
                >
                  <thead
                    className="sticky-top"
                    style={{
                      backgroundColor: "var(--custom-bg-tertiary)",
                      borderColor: "var(--custom-border-color)",
                    }}
                  >
                    <tr>
                      <th
                        className="text-center border-custom"
                        style={{ width: "50px" }}
                      >
                        <Form.Check type="checkbox" size="sm" />
                      </th>
                      <th
                        className="text-center border-custom"
                        style={{ width: "100px" }}
                      >
                        <i className="bi bi-gear me-1"></i>
                        Ações
                      </th>
                      <th className="text-nowrap border-custom">
                        <i className="bi bi-calendar-date me-1"></i>
                        Data
                      </th>
                      <th className="text-nowrap border-custom">
                        <i className="bi bi-bookmark me-1"></i>
                        Tipo
                      </th>
                      <th className="text-nowrap border-custom">
                        <i className="bi bi-currency-dollar me-1"></i>
                        Valor
                      </th>
                      <th className="text-nowrap border-custom">
                        <i className="bi bi-check-circle me-1"></i>
                        Status
                      </th>
                      <th className="text-nowrap border-custom d-none d-md-table-cell">
                        <i className="bi bi-tags me-1"></i>
                        Categoria
                      </th>
                      <th className="d-none d-lg-table-cell border-custom">
                        <i className="bi bi-file-text me-1"></i>
                        Descrição
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{ backgroundColor: "var(--custom-bg-secondary)" }}
                  >
                    {filteredFinance.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center py-4 border-custom"
                        >
                          <div className="text-muted-custom">
                            <i className="bi bi-inbox display-6 d-block mb-2 opacity-50"></i>
                            <h6 className="text-secondary-custom">
                              Nenhum registro encontrado
                            </h6>
                            <p className="small mb-0">
                              {dataRegistro
                                ? "Tente ajustar os filtros de busca"
                                : "Adicione o primeiro registro usando o formulário acima"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredFinance.map((dado, index) => (
                        <tr key={index} className="border-custom">
                          <td className="text-center border-custom">
                            <Form.Check type="checkbox" size="sm" />
                          </td>

                          <td className="text-center border-custom">
                            <Button
                              as={Link}
                              to={`/finance/${dado._id}`}
                              variant="outline-primary"
                              size="sm"
                              className="text-decoration-none"
                            >
                              <i className="bi bi-eye"></i>
                            </Button>
                          </td>

                          <td className="text-nowrap fw-medium border-custom text-secondary-custom">
                            {dado.dataderegistro}
                          </td>

                          <td className="border-custom">
                            <Badge
                              bg={getTipoVariant(dado.tipodedado)}
                              className="fw-normal px-2 py-1"
                            >
                              <i
                                className={`bi ${
                                  dado.tipodedado === "Receita"
                                    ? "bi-arrow-up-circle"
                                    : "bi-arrow-down-circle"
                                } me-1`}
                              ></i>
                              {dado.tipodedado}
                            </Badge>
                          </td>

                          <td className="fw-bold text-end border-custom">
                            <span
                              className={
                                dado.tipodedado === "Receita"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              R${" "}
                              {parseFloat(dado.valor || 0).toLocaleString(
                                "pt-BR",
                                { minimumFractionDigits: 2 }
                              )}
                            </span>
                          </td>

                          <td className="border-custom">
                            <Badge
                              bg={getStatusVariant(dado.statuspagamento)}
                              className="fw-normal px-2 py-1"
                            >
                              <i
                                className={`bi ${
                                  dado.statuspagamento === "Pago"
                                    ? "bi-check-circle"
                                    : "bi-clock"
                                } me-1`}
                              ></i>
                              {dado.statuspagamento}
                            </Badge>
                          </td>

                          <td className="text-nowrap border-custom d-none d-md-table-cell">
                            <Badge
                              bg="secondary"
                              className="fw-normal px-2 py-1"
                              style={{
                                backgroundColor:
                                  "var(--custom-accent-secondary)",
                              }}
                            >
                              {dado.tipolancamento}
                            </Badge>
                          </td>

                          <td
                            className="d-none d-lg-table-cell border-custom"
                            style={{ maxWidth: "200px" }}
                          >
                            <div
                              className="text-truncate text-secondary-custom small"
                              title={dado.descricao}
                            >
                              {dado.descricao || "Sem descrição"}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </Container>
        </section>

        {/* FOOTER - 5% */}
        <footer className="footer-section">
          <Container fluid>
            <Row className="w-100 align-items-center">
              <Col xs={12} md={6} className="text-center text-md-start">
                <small>
                  © 2024 Sistema de Gestão - Todos os direitos reservados
                </small>
              </Col>
              <Col xs={12} md={6} className="text-center text-md-end">
                <small>
                  Versão 1.0.0 |
                  <a href="#suporte" className="text-light ms-1">
                    Suporte
                  </a>{" "}
                  |
                  <a href="#contato" className="text-light ms-1">
                    Contato
                  </a>
                </small>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </div>
  );
};
