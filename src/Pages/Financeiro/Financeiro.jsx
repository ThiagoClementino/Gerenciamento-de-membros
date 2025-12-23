import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../Contexts/DataInfor";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Badge,
  InputGroup,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEye,
  faSearch,
  faFileInvoiceDollar,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export const Financeiro = () => {
  const { dadosfinance, setDadosfinance } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [theme, setTheme] = useState("dark"); // Padrão conforme Dashboard
  const navigate = useNavigate();

  // Aplicação do tema nativo Bootstrap 5.3
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  // --- Lógica Original Preservada ---
  const [financialData, setFinancialData] = useState({
    tipodedado: "",
    valor: "",
    statuspagamento: "",
    datapagamento: "",
    tipolancamento: "",
    descricao: "",
    observacao: "",
    comprovante: null,
  });

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredFinance.map((d) => d._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCampfinancial = useCallback((event) => {
    const { name, value } = event.target;
    setFinancialData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormFinancial = useCallback(
    async (event) => {
      event.preventDefault();
      setFormError(null);
      try {
        const [ano, mes, dia] = financialData.datapagamento.split("-");
        const dataPagamentoFormatada = `${dia}/${mes}/${ano}`;
        const dataLancamentoFormatada = new Date().toLocaleDateString("pt-BR");

        const dataToSend = {
          ...financialData,
          valor: parseFloat(financialData.valor),
          datapagamento: dataPagamentoFormatada,
          dataderegistro: dataLancamentoFormatada,
        };

        const response = await fetch(
          "https://api-gestao-igreja-jcod.vercel.app/finance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        const json = await response.json();
        if (!response.ok) throw new Error(json.message || "Erro ao salvar.");

        if (setDadosfinance) setDadosfinance((prev) => [...prev, json]);

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
        alert("Registro salvo com sucesso!");
      } catch (error) {
        setFormError(error.message);
      }
    },
    [financialData, setDadosfinance]
  );

  const handleDeleteSelected = useCallback(async () => {
    if (selectedIds.length === 0) return;
    if (
      !window.confirm(
        `Confirmar a exclusão de ${selectedIds.length} registros?`
      )
    )
      return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`https://api-gestao-igreja-jcod.vercel.app/finance/${id}`, {
            method: "DELETE",
          })
        )
      );

      if (setDadosfinance) {
        setDadosfinance((prev) =>
          prev.filter((item) => !selectedIds.includes(item._id))
        );
      }
      setSelectedIds([]);
      alert("Exclusão realizada!");
    } catch (error) {
      alert("Erro ao excluir registros selecionados.");
    }
  }, [selectedIds, setDadosfinance]);

  const filteredFinance = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return (dadosfinance || []).filter(
      (d) =>
        d.descricao?.toLowerCase().includes(search) ||
        d.tipolancamento?.toLowerCase().includes(search) ||
        d._id?.toLowerCase().includes(search)
    );
  }, [dadosfinance, searchTerm]);

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden bg-body text-body">
      {/* HEADER FIXO - PADRÃO PREMIUM */}
      <header className="py-3 px-4 border-bottom bg-body-tertiary shadow-sm z-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-0 h4">
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className="me-2 text-primary"
                />
                Painel Financeiro
              </h2>
              <small className="text-secondary">
                Gestão de entradas e saídas de caixa
              </small>
            </Col>
            <Col
              md={6}
              className="text-end d-flex justify-content-end align-items-center gap-2"
            >
              {selectedIds.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded-pill px-3 shadow-sm"
                  onClick={handleDeleteSelected}
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Excluir ({selectedIds.length})
                </Button>
              )}
              <Badge
                bg="success-subtle"
                className="text-success border border-success-subtle rounded-pill px-3 py-2"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="me-1" />{" "}
                Sistema Online
              </Badge>
            </Col>
          </Row>
        </Container>
      </header>

      {/* CONTEÚDO SCROLLÁVEL */}
      <main className="flex-grow-1 overflow-auto p-4 bg-body">
        <Container fluid>
          {/* CARD DE FORMULÁRIO */}
          <Card className="border shadow-sm rounded-4 bg-body-tertiary mb-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold text-secondary text-uppercase mb-0">
                Novo Lançamento
              </h6>
              <div style={{ width: "300px" }}>
                <InputGroup size="sm" className="shadow-sm">
                  <InputGroup.Text className="bg-body border-end-0">
                    <FontAwesomeIcon icon={faSearch} className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    className="bg-body border-start-0 shadow-none"
                    placeholder="Filtrar lançamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>

            <Form onSubmit={handleFormFinancial}>
              <Row className="g-3 mb-3">
                <Col md={3}>
                  <Form.Label className="small fw-bold text-muted">
                    TIPO
                  </Form.Label>
                  <Form.Select
                    className="bg-body border shadow-none"
                    name="tipodedado"
                    value={financialData.tipodedado}
                    onChange={handleCampfinancial}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Receita">Receita (+)</option>
                    <option value="Despesa">Despesa (-)</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label className="small fw-bold text-muted">
                    VALOR (R$)
                  </Form.Label>
                  <Form.Control
                    className="bg-body border shadow-none"
                    type="number"
                    name="valor"
                    step="0.01"
                    value={financialData.valor}
                    onChange={handleCampfinancial}
                    required
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="small fw-bold text-muted">
                    STATUS
                  </Form.Label>
                  <Form.Select
                    className="bg-body border shadow-none"
                    name="statuspagamento"
                    value={financialData.statuspagamento}
                    onChange={handleCampfinancial}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Pago">Pago</option>
                    <option value="Não pago">Pendente</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label className="small fw-bold text-muted">
                    CATEGORIA
                  </Form.Label>
                  <Form.Select
                    className="bg-body border shadow-none"
                    name="tipolancamento"
                    value={financialData.tipolancamento}
                    onChange={handleCampfinancial}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Oferta">Oferta/Dízimo</option>
                    <option value="Aluguel">Aluguel</option>
                    <option value="Luz/Agua">Luz/Água</option>
                    <option value="Manutencao">Manutenção</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className="g-3 mb-3">
                <Col md={3}>
                  <Form.Label className="small fw-bold text-muted">
                    DATA
                  </Form.Label>
                  <Form.Control
                    className="bg-body border shadow-none"
                    type="date"
                    name="datapagamento"
                    value={financialData.datapagamento}
                    onChange={handleCampfinancial}
                    required
                  />
                </Col>
                <Col md={9}>
                  <Form.Label className="small fw-bold text-muted">
                    DESCRIÇÃO
                  </Form.Label>
                  <Form.Control
                    className="bg-body border shadow-none"
                    type="text"
                    name="descricao"
                    value={financialData.descricao}
                    onChange={handleCampfinancial}
                    required
                    placeholder="Ex: Manutenção do ar-condicionado"
                  />
                </Col>
              </Row>

              <Row className="g-3 mb-4">
                <Col md={12}>
                  <Form.Label className="small fw-bold text-muted">
                    OBSERVAÇÕES
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    className="bg-body border shadow-none"
                    name="observacao"
                    value={financialData.observacao}
                    onChange={handleCampfinancial}
                    placeholder="Notas adicionais..."
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-pill px-5 fw-bold shadow-sm"
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Salvar Lançamento
                </Button>
              </div>
            </Form>
          </Card>

          {/* CARD DA TABELA */}
          <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden">
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle table-borderless">
                <thead className="bg-body-secondary">
                  <tr className="text-secondary small text-uppercase">
                    <th className="text-center py-3" style={{ width: "50px" }}>
                      <Form.Check
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedIds.length === filteredFinance.length &&
                          filteredFinance.length > 0
                        }
                      />
                    </th>
                    <th className="text-center">Ação</th>
                    <th>Pagamento</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Descrição</th>
                    <th>Lançado em</th>
                  </tr>
                </thead>
                <tbody className="border-top">
                  {filteredFinance.map((dado) => (
                    <tr
                      key={dado._id}
                      className={
                        selectedIds.includes(dado._id)
                          ? "bg-primary bg-opacity-10"
                          : ""
                      }
                    >
                      <td className="text-center">
                        <Form.Check
                          type="checkbox"
                          checked={selectedIds.includes(dado._id)}
                          onChange={() => handleSelectOne(dado._id)}
                        />
                      </td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="text-primary p-0 shadow-none"
                          onClick={() => navigate(`/financeiro/${dado._id}`)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                      </td>
                      <td className="small">{dado.datapagamento}</td>
                      <td>
                        <Badge
                          bg={
                            dado.tipodedado === "Receita"
                              ? "primary-subtle"
                              : "danger-subtle"
                          }
                          className={
                            dado.tipodedado === "Receita"
                              ? "text-primary border border-primary-subtle"
                              : "text-danger border border-danger-subtle"
                          }
                        >
                          {dado.tipodedado}
                        </Badge>
                      </td>
                      <td className="fw-bold">
                        R${" "}
                        {parseFloat(dado.valor).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="small">
                        <div className="fw-bold">{dado.descricao}</div>
                        <div
                          className="text-muted text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {dado.observacao || "-"}
                        </div>
                      </td>
                      <td className="small text-muted">
                        {dado.dataderegistro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {filteredFinance.length === 0 && (
              <div className="text-center p-5 text-secondary">
                Nenhum registro encontrado para a busca atual.
              </div>
            )}
          </Card>
        </Container>
      </main>

      {/* FOOTER FIXO */}
      <footer className="py-2 px-4 border-top bg-body-tertiary text-secondary small d-flex justify-content-between">
        <span>Gestão Financeira • 2025</span>
        <span>
          Registros: <strong>{filteredFinance.length}</strong>
        </span>
      </footer>
    </div>
  );
};
