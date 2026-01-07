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
  Pagination,
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
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  // --- DETECÇÃO DE MOBILE ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- PAGINAÇÃO: ESTADOS ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const filteredFinance = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return (dadosfinance || []).filter(
      (d) =>
        d.descricao?.toLowerCase().includes(search) ||
        d.tipolancamento?.toLowerCase().includes(search) ||
        d._id?.toLowerCase().includes(search)
    );
  }, [dadosfinance, searchTerm]);

  // --- PAGINAÇÃO: CÁLCULOS ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFinance.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFinance.length / itemsPerPage);

  const paginationItems = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let number = startPage; number <= endPage; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

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

  return (
    // FIX MOBILE: Se for mobile, usa 'min-vh-100' (cresce com conteúdo).
    // Se for Desktop, usa 'vh-100 overflow-hidden' (trava a tela e usa scroll interno).
    <div
      className={`d-flex flex-column bg-body text-body ${
        isMobile ? "min-vh-100" : "vh-100 overflow-hidden"
      }`}
    >
      {/* 1. HEADER */}
      <header className="py-3 px-3 px-md-4 border-bottom bg-body-tertiary shadow-sm z-3 flex-shrink-0">
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col xs={12} md={6} className="text-center text-md-start">
              <h2 className="fw-bold mb-0 h4">
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className="me-2 text-primary"
                />
                Painel Financeiro
              </h2>
              <small className="text-secondary d-block d-md-inline">
                Gestão de entradas e saídas de caixa
              </small>
            </Col>
            <Col
              xs={12}
              md={6}
              className="text-center text-md-end d-flex justify-content-center justify-content-md-end align-items-center gap-2"
            >
              {selectedIds.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded-pill px-3 shadow-sm"
                  onClick={handleDeleteSelected}
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  <span className="d-none d-sm-inline">Excluir</span> (
                  {selectedIds.length})
                </Button>
              )}
              <Badge
                bg="success-subtle"
                className="text-success border border-success-subtle rounded-pill px-3 py-2"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="me-1" />{" "}
                <span className="d-none d-sm-inline">Sistema </span>Online
              </Badge>
            </Col>
          </Row>
        </Container>
      </header>

      {/* WRAPPER PRINCIPAL */}
      {/* FIX MOBILE: No mobile removemos 'overflow-hidden' para permitir rolagem da página toda */}
      <main
        className={`flex-grow-1 d-flex flex-column bg-body ${
          isMobile ? "" : "overflow-hidden"
        }`}
      >
        {/* 2. ÁREA DO FORMULÁRIO */}
        <div className="flex-shrink-0 px-2 px-md-4 pt-3 pt-md-4">
          <Container fluid>
            <Card className="border shadow-sm rounded-4 bg-body-tertiary mb-3 p-3 p-md-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <h6 className="fw-bold text-secondary text-uppercase mb-0 text-center text-md-start">
                  Novo Lançamento
                </h6>
                <div
                  className="w-100 w-md-auto"
                  style={{ maxWidth: "100%", minWidth: "300px" }}
                >
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
                {formError && (
                  <div className="alert alert-danger py-2">{formError}</div>
                )}

                {/* Grid Responsivo: xs=12 (1 por linha), sm=6 (2 por linha), md=3 (4 por linha) */}
                <Row className="g-3 mb-3">
                  <Col xs={12} sm={6} md={3}>
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
                  <Col xs={12} sm={6} md={3}>
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
                  <Col xs={12} sm={6} md={3}>
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
                  <Col xs={12} sm={6} md={3}>
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

                <Row className="g-3 mb-4">
                  <Col xs={12} sm={4} md={2}>
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

                  <Col xs={12} sm={8} md={5}>
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
                      placeholder="Ex: Manutenção..."
                    />
                  </Col>

                  <Col xs={12} md={5}>
                    <Form.Label className="small fw-bold text-muted">
                      OBSERVAÇÕES
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      className="bg-body border shadow-none"
                      name="observacao"
                      value={financialData.observacao}
                      onChange={handleCampfinancial}
                      placeholder="Notas adicionais..."
                      style={{ resize: "none" }}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-pill px-5 fw-bold shadow-sm  w-md-auto"
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Salvar Lançamento
                  </Button>
                </div>
              </Form>
            </Card>
          </Container>
        </div>

        {/* 3. ÁREA DA TABELA */}
        {/* FIX MOBILE: 'overflow-auto' apenas no desktop. No mobile deixa crescer naturalmente. */}
        <div
          className={`flex-grow-1 px-2 px-md-4 pb-4 ${
            isMobile ? "" : "overflow-auto"
          }`}
        >
          <Container fluid className="h-100 d-flex flex-column">
            <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden flex-shrink-0 mb-3">
              <div className="table-responsive">
                {/* text-nowrap evita quebra de linha em telas pequenas, melhorando leitura */}
                <Table
                  hover
                  className="mb-0 align-middle table-borderless text-nowrap"
                >
                  <thead className="bg-body-secondary position-sticky top-0 z-1">
                    <tr className="text-secondary small text-uppercase">
                      <th
                        className="text-center py-3"
                        style={{ width: "50px" }}
                      >
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
                    {currentItems.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-5 text-secondary"
                        >
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((dado) => (
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
                              onClick={() =>
                                navigate(`/financeiro/${dado._id}`)
                              }
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
                            <div
                              className="fw-bold text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              {dado.descricao}
                            </div>
                            <div
                              className="text-muted text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              {dado.observacao || "-"}
                            </div>
                          </td>
                          <td className="small text-muted">
                            {dado.dataderegistro}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>

            {/* Controle de Paginação */}
            {filteredFinance.length > itemsPerPage && (
              <div className="d-flex justify-content-center mt-auto pb-2">
                <Pagination className="shadow-sm mb-0 flex-wrap justify-content-center">
                  <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />

                  {paginationItems}

                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </Container>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="py-2 px-3 px-md-4 border-top bg-body-tertiary text-secondary small d-flex flex-column flex-md-row justify-content-between align-items-center flex-shrink-0 text-center text-md-start">
        <span className="mb-1 mb-md-0">Gestão Financeira • 2025</span>
        <span>
          Página <strong>{currentPage}</strong> de{" "}
          <strong>{totalPages || 1}</strong> • Total:{" "}
          <strong>{filteredFinance.length}</strong>
        </span>
      </footer>
    </div>
  );
};
