import React, { useState, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
} from "react-bootstrap";

export const Financeiro = () => {
  const { dadosfinance, setDadosfinance } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]); // Para exclusão múltipla
  const navigate = useNavigate();

  // Estado com TODOS os campos do formulário
  const [financialData, setFinancialData] = useState({
    tipodedado: "", // Receita / Despesa
    valor: "",
    statuspagamento: "", // Pago / Pendente
    datapagamento: "", // Data que o usuário escolhe
    tipolancamento: "", // Categoria (Dízimo, Luz, etc)
    descricao: "", // Descrição curta
    observacao: "", // Detalhes adicionais
    comprovante: null, // Campo para anexo
  });

  // --- Funções de Seleção Múltipla ---
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

  // --- Manipulação do Formulário ---
  const handleCampfinancial = useCallback((event) => {
    const { name, value } = event.target;
    setFinancialData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // --- Ação de Salvar ---
  const handleFormFinancial = useCallback(
    async (event) => {
      event.preventDefault();
      setFormError(null);

      try {
        // Formatação de datas
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

        // Reseta o estado com todos os campos vazios
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

  // --- Ação de Exclusão em Lote ---
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

  // --- Filtro de Busca ---
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
    <div className="main-wrapper">
      <div className="content-container">
        {/* CABEÇALHO COM BOTÕES DE AÇÃO SEPARADOS */}
        <nav className="navbar-section p-3  border-bottom d-flex align-items-center justify-content-between">
          <h5 className="mb-0 text-primary fw-bold">💰 Painel Financeiro</h5>
          <div className="d-flex gap-2">
            {selectedIds.length > 0 && (
              <Button variant="danger" size="sm" onClick={handleDeleteSelected}>
                <i className="bi bi-trash me-2"></i>Excluir Selecionados (
                {selectedIds.length})
              </Button>
            )}
            <Badge bg="success" className="d-flex align-items-center">
              Sistema Ativo
            </Badge>
          </div>
        </nav>

        {/* SEÇÃO DO FORMULÁRIO (TODOS OS CAMPOS) */}
        <section className="form-section p-4">
          <Container fluid className=" p-4 shadow-sm rounded border">
            <Row className="mb-4">
              <Col md={8}>
                <h6 className="fw-bold">Cadastro de Lançamento</h6>
              </Col>
              <Col md={4}>
                <InputGroup size="sm">
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Filtrar na tabela..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Form onSubmit={handleFormFinancial}>
              <Row className="g-3 mb-3">
                <Col md={3}>
                  <Form.Label className="small fw-bold">
                    TIPO DE DADO
                  </Form.Label>
                  <Form.Select
                    name="tipodedado"
                    value={financialData.tipodedado}
                    onChange={handleCampfinancial}
                    required
                    size="sm"
                  >
                    <option value="">Selecione...</option>
                    <option value="Receita">Receita (+)</option>
                    <option value="Despesa">Despesa (-)</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label className="small fw-bold">VALOR (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    name="valor"
                    step="0.01"
                    value={financialData.valor}
                    onChange={handleCampfinancial}
                    required
                    size="sm"
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="small fw-bold">STATUS</Form.Label>
                  <Form.Select
                    name="statuspagamento"
                    value={financialData.statuspagamento}
                    onChange={handleCampfinancial}
                    required
                    size="sm"
                  >
                    <option value="">Selecione...</option>
                    <option value="Pago">Pago</option>
                    <option value="Não pago">Pendente</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label className="small fw-bold">CATEGORIA</Form.Label>
                  <Form.Select
                    name="tipolancamento"
                    value={financialData.tipolancamento}
                    onChange={handleCampfinancial}
                    required
                    size="sm"
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
                <Col md={4}>
                  <Form.Label className="small fw-bold">
                    DATA DO PAGAMENTO
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="datapagamento"
                    value={financialData.datapagamento}
                    onChange={handleCampfinancial}
                    required
                    size="sm"
                  />
                </Col>
                <Col md={8}>
                  <Form.Label className="small fw-bold">
                    DESCRIÇÃO DO LANÇAMENTO
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="descricao"
                    value={financialData.descricao}
                    onChange={handleCampfinancial}
                    required
                    size="sm"
                    placeholder="Ex: Pagamento mensal de energia"
                  />
                </Col>
              </Row>

              <Row className="g-3 mb-4">
                <Col md={12}>
                  <Form.Label className="small fw-bold">
                    OBSERVAÇÕES ADICIONAIS
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="observacao"
                    value={financialData.observacao}
                    onChange={handleCampfinancial}
                    placeholder="Detalhes técnicos ou notas importantes..."
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-5 fw-bold"
                  size="sm"
                >
                  Salvar Lançamento
                </Button>
              </div>
            </Form>
          </Container>
        </section>

        {/* TABELA DE DADOS COM DESCRIÇÃO E OBSERVAÇÃO SEPARADOS */}
        <section className="table-section p-4">
          <div className=" border rounded shadow-sm overflow-hidden">
            <Table hover responsive size="sm" className="mb-0 align-middle">
              <thead className="">
                <tr>
                  <th className="text-center" style={{ width: "40px" }}>
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
                  <th>ID</th>
                  <th>Pagamento</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Descrição</th>
                  <th>Observação</th>
                  <th>Lançado em</th>
                </tr>
              </thead>
              <tbody>
                {filteredFinance.map((dado) => (
                  <tr
                    key={dado._id}
                    className={
                      selectedIds.includes(dado._id) ? "table-warning" : ""
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
                      {/* BOTÃO PARA IR DIRETO AO ITEM */}
                      <Button
                        variant="link"
                        className="p-0 text-primary"
                        onClick={() => navigate(`/financeiro/${dado._id}`)} // Certifique-se que a rota no App.js seja /finance/:id
                      >
                        <i className="bi bi-eye-fill fs-5"></i>
                      </Button>
                    </td>
                    <td className="small text-secondary">
                      {dado._id?.substring(0, 8)}...
                    </td>
                    <td className="small">{dado.datapagamento}</td>
                    <td>
                      <Badge
                        bg={
                          dado.tipodedado === "Receita" ? "primary" : "danger"
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
                    <td className="small">{dado.descricao}</td>
                    <td className="small text-muted italic">
                      {dado.observacao || "-"}
                    </td>
                    <td className="small text-muted">{dado.dataderegistro}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
};
