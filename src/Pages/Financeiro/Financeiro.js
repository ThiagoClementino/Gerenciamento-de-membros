import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../Contexts/DataInfor";
import Footer from "../Footer/Footer";
import Header from "../Header/Sidebar";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import { ChartCard } from "../../Charts/ChartCard";

export const Financeiro = () => {
  const { dadosfinance, setDadosfinance } = useContext(DataContext);
  const [dataRegistro, setDataRegistro] = useState("");
  const [formError, setFormError] = useState(null);

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

  return (
    <div className="d-flex vh-100">
      <Header />
      <Container fluid className="p-4 flex-grow-1">
        <ChartCard />
        <Row className="mb-4 flex-shrink-0">
          <Col>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div>
                <h1 className="h3 mb-1 text-primary-custom fw-bold">
                  Cadastro Financeiro
                </h1>
                <p className="text-muted-custom mb-0">Relação de despesas</p>
              </div>
              <div className="mt-3 mt-md-0">
                <Form.Control
                  type="search"
                  placeholder="Buscar..."
                  value={dataRegistro}
                  onChange={handleSearch}
                  className="me-2"
                />
              </div>
              <div className="mt-3 mt-md-0">
                {formError && <p className="text-danger">{formError}</p>}
                <Button variant="primary" onClick={handleFormFinancial}>
                  Salvar
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Form
          onSubmit={handleFormFinancial}
          encType="multipart/form-data"
          className="flex-shrink-0"
        >
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="tipodedado">
                <Form.Label>Tipo de registro</Form.Label>
                <Form.Select
                  name="tipodedado"
                  value={financialData.tipodedado}
                  onChange={handleCampfinancial}
                  required
                >
                  <option value=""></option>
                  <option value="Receita">Receita</option>
                  <option value="Despesa">Despesa</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="valor">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  name="valor"
                  value={financialData.valor}
                  onChange={handleCampfinancial}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="statuspagamento">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="statuspagamento"
                  value={financialData.statuspagamento}
                  onChange={handleCampfinancial}
                  required
                >
                  <option value=""></option>
                  <option value="Pago">Pago</option>
                  <option value="Não pago">Não pago</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="datapagamento">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  name="datapagamento"
                  placeholder="DD/MM/AAAA"
                  value={financialData.datapagamento}
                  onChange={handleCampfinancial}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group controlId="tipolancamento">
                <Form.Label>Tipo de lançamento</Form.Label>
                <Form.Select
                  name="tipolancamento"
                  value={financialData.tipolancamento}
                  onChange={handleCampfinancial}
                  required
                >
                  <option value=""></option>
                  <option value="Agua">Água</option>
                  <option value="Luz">Luz</option>
                  <option value="Aluguel">Aluguel</option>
                  <option value="Despesa de departamento">
                    Despesa de departamento
                  </option>
                  <option value="Internet">Internet</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="descricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  rows={3}
                  value={financialData.descricao}
                  onChange={handleCampfinancial}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="observacao">
                <Form.Label>Observação</Form.Label>
                <Form.Control
                  as="textarea"
                  name="observacao"
                  rows={3}
                  value={financialData.observacao}
                  onChange={handleCampfinancial}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3"></Row>
        </Form>
        <Card className="mt-4 shadow-sm flex-grow-1 d-flex flex-column">
          <Card.Header className="bg-secondary-custom flex-shrink-0">
            <h4 className="mb-0 fw-semibold">Valores</h4>
          </Card.Header>
          <Card.Body className="p-0 flex-grow-1">
            <div className="overflow-auto" style={{ maxHeight: "45vh" }}>
              <Table striped bordered hover responsive className="mb-0">
                <thead className="sticky-top bg-light text-center">
                  <tr>
                    <th>
                      <Form.Check type="checkbox" />
                    </th>
                    <th>Visualizar</th>
                    <th>Data de registro</th>
                    <th>Tipo de registro</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data do pagamento</th>
                    <th>Tipo de lançamento</th>
                    <th>Descrição</th>
                    <th>Observação</th>
                  </tr>
                </thead>
                <tbody className="text-muted-custom align-middle text-center">
                  {filteredFinance.map((dado, index) => (
                    <tr key={index} className="align-middle">
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td className="align-middle text-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-center"
                        >
                          <Link
                            to={`/finance/${dado._id}`}
                            className="text-black text-decoration-none"
                          >
                            Detalhes
                          </Link>
                        </Button>
                      </td>
                      <td>{dado.dataderegistro}</td>
                      <td>{dado.tipodedado}</td>
                      <td>{dado.valor}</td>
                      <td>{dado.statuspagamento}</td>
                      <td>{dado.datapagamento}</td>
                      <td>{dado.tipolancamento}</td>
                      <td>{dado.descricao}</td>
                      <td>{dado.observacao}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
        <Col
          className="footer-container d-flex justify-content-center align-items-center border-top"
          style={{ flex: "0 0 5vh" }}
        >
          <Footer />
        </Col>
      </Container>
    </div>
  );
};
