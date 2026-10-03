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
  Alert,
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

/*
 * Converte a data de lançamento para timestamp.
 *
 * Aceita:
 * DD/MM/YYYY
 * YYYY-MM-DD
 * ISO Date
 */
const parseDataLancamento = (value) => {
  if (!value) {
    return 0;
  }

  if (
    typeof value === "string" &&
    /^\d{2}\/\d{2}\/\d{4}$/.test(value)
  ) {
    const [dia, mes, ano] = value.split("/");

    return new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia)
    ).getTime();
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  return date.getTime();
};

/*
 * O ObjectId padrão do MongoDB contém
 * o timestamp de criação nos primeiros
 * 8 caracteres.
 *
 * Usaremos apenas como critério de desempate
 * quando dois registros tiverem a mesma
 * dataderegistro.
 */
const getObjectIdTimestamp = (id) => {
  if (
    typeof id !== "string" ||
    !/^[a-f\d]{24}$/i.test(id)
  ) {
    return 0;
  }

  return (
    parseInt(id.substring(0, 8), 16) * 1000
  );
};

const formatCurrency = (value) => {
  const numero = Number(value);

  if (Number.isNaN(numero)) {
    return "R$ 0,00";
  }

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDatePagamento = (value) => {
  if (!value) {
    return "-";
  }

  // Já está no formato brasileiro
  if (
    /^\d{2}\/\d{2}\/\d{4}$/.test(value)
  ) {
    return value;
  }

  // Formato vindo do input type="date"
  if (
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    const [ano, mes, dia] =
      value.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  return value;
};



const currencyToNumber = (value) => {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  const valorConvertido = String(value)
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(valorConvertido);
};




export const Financeiro = () => {
  const {
    dadosfinance,
    setDadosfinance,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formError, setFormError] =
    useState(null);

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [showAlert, setShowAlert] =
    useState(null);

  const [theme] = useState("dark");

  // ==========================================
  // MOBILE
  // ==========================================

  const [isMobile, setIsMobile] =
    useState(
      window.innerWidth < 768
    );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // ==========================================
  // TEMA
  // ==========================================

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      theme
    );
  }, [theme]);

  // ==========================================
  // PAGINAÇÃO
  // ==========================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage] =
    useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ==========================================
  // FORMULÁRIO
  // ==========================================

  const [
    financialData,
    setFinancialData,
  ] = useState({
    tipodedado: "",
    valor: "",
    statuspagamento: "",
    datapagamento: "",
    tipolancamento: "",
    descricao: "",
    observacao: "",
    comprovante: null,
  });

  // ==========================================
  // FECHAR ALERTA
  // ==========================================

  const closeAlert = () => {
    setShowAlert(null);
  };

  // ==========================================
  // FILTRO
  // ==========================================

  const filteredFinance =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return (
        dadosfinance || []
      ).filter((dado) => {
        return (
          dado.descricao
            ?.toLowerCase()
            .includes(search) ||

          dado.tipolancamento
            ?.toLowerCase()
            .includes(search) ||

          dado.tipodedado
            ?.toLowerCase()
            .includes(search) ||

          dado.statuspagamento
            ?.toLowerCase()
            .includes(search) ||

          dado.datapagamento
            ?.toLowerCase()
            .includes(search) ||

          dado.dataderegistro
            ?.toLowerCase()
            .includes(search) ||

          dado._id
            ?.toLowerCase()
            .includes(search)
        );
      });
    }, [
      dadosfinance,
      searchTerm,
    ]);

  // ==========================================
  // ORDENAÇÃO
  // MAIS RECENTES PRIMEIRO
  // ==========================================

  const sortedFinance =
    useMemo(() => {
      return [
        ...filteredFinance,
      ].sort((a, b) => {
        const dataA =
          parseDataLancamento(
            a.dataderegistro
          );

        const dataB =
          parseDataLancamento(
            b.dataderegistro
          );

        /*
         * Primeiro critério:
         * data de lançamento.
         */
        if (dataA !== dataB) {
          return dataB - dataA;
        }

        /*
         * Segundo critério:
         * horário embutido no ObjectId.
         *
         * Útil quando vários lançamentos
         * foram cadastrados no mesmo dia.
         */
        return (
          getObjectIdTimestamp(
            b._id
          ) -
          getObjectIdTimestamp(
            a._id
          )
        );
      });
    }, [filteredFinance]);

  // ==========================================
  // PAGINAÇÃO
  // IMPORTANTE: acontece APÓS ordenar
  // ==========================================

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem -
    itemsPerPage;

  const currentItems =
    sortedFinance.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages =
    Math.ceil(
      sortedFinance.length /
      itemsPerPage
    );

  // ==========================================
  // CORRIGE PÁGINA APÓS EXCLUSÕES
  // ==========================================

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(
        totalPages
      );
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // ==========================================
  // ITENS DA PAGINAÇÃO
  // ==========================================

  const paginationItems = [];

  let startPage = Math.max(
    1,
    currentPage - 2
  );

  let endPage = Math.min(
    totalPages,
    startPage + 4
  );

  if (
    endPage - startPage <
    4
  ) {
    startPage = Math.max(
      1,
      endPage - 4
    );
  }

  for (
    let number = startPage;
    number <= endPage;
    number++
  ) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={
          number === currentPage
        }
        onClick={() =>
          setCurrentPage(number)
        }
      >
        {number}
      </Pagination.Item>
    );
  }

  // ==========================================
  // SELEÇÃO INDIVIDUAL
  // ==========================================

  const handleSelectOne = (id) => {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter(
            (item) =>
              item !== id
          )
          : [...prev, id]
    );
  };

  // ==========================================
  // SELECIONAR TODOS
  // ==========================================

  const handleSelectAll = (
    event
  ) => {
    if (
      event.target.checked
    ) {
      setSelectedIds(
        sortedFinance.map(
          (dado) =>
            dado._id
        )
      );
    } else {
      setSelectedIds([]);
    }
  };

  // ==========================================
  // CAMPOS DO FORMULÁRIO
  // ==========================================

  const handleValorChange = (event) => {
    let value = event.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    if (!value) {
      setFinancialData((prev) => ({
        ...prev,
        valor: "",
      }));

      return;
    }

    // Converte para centavos
    const numero = Number(value) / 100;

    const valorFormatado =
      numero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    setFinancialData((prev) => ({
      ...prev,
      valor: valorFormatado,
    }));
  };

  const handleCampfinancial =
    useCallback(
      (event) => {
        const {
          name,
          value,
        } = event.target;

        setFinancialData(
          (prev) => ({
            ...prev,
            [name]: value,
          })
        );
      },
      []
    );

  // ==========================================
  // POST /finance
  // ==========================================

  const handleFormFinancial =
    useCallback(
      async (event) => {
        event.preventDefault();

        setFormError(null);
        setShowAlert(null);

        try {
          const valor = currencyToNumber(
            financialData.valor
          );

          // ==============================
          // VALIDAÇÕES
          // ==============================

          if (
            Number.isNaN(valor) ||
            valor <= 0
          ) {
            throw new Error(
              "Informe um valor válido."
            );
          }

          if (
            !financialData.tipodedado
          ) {
            throw new Error(
              "Selecione o tipo."
            );
          }

          if (
            !financialData.statuspagamento
          ) {
            throw new Error(
              "Selecione o status."
            );
          }

          if (
            !financialData.datapagamento
          ) {
            throw new Error(
              "Informe a data do pagamento."
            );
          }

          if (
            !financialData.tipolancamento
          ) {
            throw new Error(
              "Selecione a categoria."
            );
          }

          if (
            !financialData.observacao
              ?.trim()
          ) {
            throw new Error(
              "Informe uma observação."
            );
          }

          // ==============================
          // DATA DO LANÇAMENTO
          // ==============================

          const dataLancamentoFormatada =
            new Date()
              .toLocaleDateString(
                "pt-BR"
              );

          // ==============================
          // OBJETO ENVIADO
          // ==============================

          const dataToSend = {
            tipodedado:
              financialData
                .tipodedado
                .toLowerCase(),

            valor,

            statuspagamento:
              financialData
                .statuspagamento
                .toLowerCase(),

            datapagamento:
              financialData
                .datapagamento,

            tipolancamento:
              financialData
                .tipolancamento
                .toLowerCase(),

            /*
             * CORREÇÃO:
             * descricao existia no
             * formulário, mas não estava
             * sendo enviada anteriormente.
             */
            descricao:
              financialData
                .descricao
                .trim(),

            comprovante:
              financialData
                .comprovante ||
              "",

            observacao:
              financialData
                .observacao
                .trim(),

            dataderegistro:
              dataLancamentoFormatada,
          };

          console.log(
            "Dados enviados para /finance:",
            dataToSend
          );

          // ==============================
          // POST
          // ==============================

          const response =
            await fetch(
              "https://api-gestao-igreja-jcod.vercel.app/finance",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",

                  Accept:
                    "application/json",
                },

                body:
                  JSON.stringify(
                    dataToSend
                  ),
              }
            );

          // ==============================
          // RESPOSTA
          // ==============================

          const responseText =
            await response.text();

          let json = null;

          try {
            json =
              responseText
                ? JSON.parse(
                  responseText
                )
                : null;
          } catch {
            json = null;
          }

          console.log(
            "Status da API:",
            response.status
          );

          console.log(
            "Resposta da API:",
            json ||
            responseText
          );

          // ==============================
          // ERRO HTTP
          // ==============================

          if (!response.ok) {
            throw new Error(
              json?.message ||
              json?.erro ||
              json?.error ||
              json?.mongo ||
              responseText ||
              `Erro ${response.status} ao salvar lançamento.`
            );
          }

          // ==============================
          // NOVO REGISTRO
          // ==============================

          const novoRegistro =
            json?.data ||
            json;

          if (
            setDadosfinance &&
            novoRegistro
          ) {
            setDadosfinance(
              (prev) => [
                novoRegistro,
                ...(prev ||
                  []),
              ]
            );
          }

          // ==============================
          // LIMPA FORMULÁRIO
          // ==============================

          setFinancialData({
            tipodedado: "",
            valor: "",
            statuspagamento:
              "",
            datapagamento: "",
            tipolancamento:
              "",
            descricao: "",
            observacao: "",
            comprovante: null,
          });

          // ==============================
          // ALERTA DE SUCESSO
          // ==============================

          setShowAlert({
            type: "success",
            message:
              "Lançamento financeiro inserido com sucesso!",
          });

          setTimeout(() => {
            setShowAlert(null);
          }, 3000);
        } catch (error) {
          console.error(
            "Erro no POST /finance:",
            error
          );

          setFormError(
            error.message ||
            "Erro ao salvar lançamento."
          );
        }
      },
      [
        financialData,
        setDadosfinance,
      ]
    );

  // ==========================================
  // DELETE
  // ==========================================

  const handleDeleteSelected =
    useCallback(async () => {
      if (
        selectedIds.length ===
        0
      ) {
        return;
      }

      const confirmation =
        window.confirm(
          `Confirmar a exclusão de ${selectedIds.length} registros?`
        );

      if (!confirmation) {
        return;
      }

      try {
        await Promise.all(
          selectedIds.map(
            async (id) => {
              const response =
                await fetch(
                  `https://api-gestao-igreja-jcod.vercel.app/finance/${id}`,
                  {
                    method:
                      "DELETE",
                  }
                );

              if (
                !response.ok
              ) {
                throw new Error(
                  `Erro ao excluir ${id}. Status ${response.status}`
                );
              }

              return response;
            }
          )
        );

        if (
          setDadosfinance
        ) {
          setDadosfinance(
            (prev) =>
              (
                prev ||
                []
              ).filter(
                (item) =>
                  !selectedIds.includes(
                    item._id
                  )
              )
          );
        }

        setSelectedIds([]);

        setShowAlert({
          type: "success",
          message:
            "Itens excluídos com sucesso!",
        });

        setTimeout(() => {
          setShowAlert(null);
        }, 3000);
      } catch (error) {
        console.error(
          "Erro ao excluir registros:",
          error
        );

        setShowAlert({
          type: "danger",
          message:
            "Não foi possível excluir os registros selecionados.",
        });
      }
    }, [
      selectedIds,
      setDadosfinance,
    ]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      className={`d-flex flex-column bg-body text-body ${isMobile
        ? "min-vh-100"
        : "vh-100 overflow-hidden"
        }`}
    >
      {/* ==================================
          HEADER
      =================================== */}

      <header className="py-3 px-3 px-md-4 border-bottom bg-body-tertiary shadow-sm z-3 flex-shrink-0">
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col
              xs={12}
              md={6}
              className="text-center text-md-start"
            >
              <h2 className="fw-bold mb-0 h4">
                <FontAwesomeIcon
                  icon={
                    faFileInvoiceDollar
                  }
                  className="me-2 text-primary"
                />

                Painel Financeiro
              </h2>

              <small className="text-secondary d-block d-md-inline">
                Gestão de entradas
                e saídas de caixa
              </small>
            </Col>

            <Col
              xs={12}
              md={6}
              className="text-center text-md-end d-flex justify-content-center justify-content-md-end align-items-center gap-2"
            >
              {selectedIds.length >
                0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-pill px-3 shadow-sm"
                    onClick={
                      handleDeleteSelected
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        faTrash
                      }
                      className="me-2"
                    />

                    <span className="d-none d-sm-inline">
                      Excluir
                    </span>{" "}
                    (
                    {
                      selectedIds.length
                    }
                    )
                  </Button>
                )}

              <Badge
                bg="success-subtle"
                className="text-success border border-success-subtle rounded-pill px-3 py-2"
              >
                <FontAwesomeIcon
                  icon={
                    faCheckCircle
                  }
                  className="me-1"
                />{" "}
                <span className="d-none d-sm-inline">
                  Sistema{" "}
                </span>
                Online
              </Badge>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ==================================
          MAIN
      =================================== */}

      <main
        className={`flex-grow-1 d-flex flex-column bg-body ${isMobile
          ? ""
          : "overflow-hidden"
          }`}
      >
        {/* FORMULÁRIO */}

        <div className="flex-shrink-0 px-2 px-md-4 pt-3 pt-md-4">
          <Container fluid>
            {/* ALERTAS */}

            {showAlert && (
              <Alert
                variant={
                  showAlert.type
                }
                dismissible
                onClose={
                  closeAlert
                }
                className="border-0 shadow-sm rounded-4 mb-3"
              >
                {
                  showAlert.message
                }
              </Alert>
            )}

            <Card className="border shadow-sm rounded-4 bg-body-tertiary mb-3 p-3 p-md-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <h6 className="fw-bold text-secondary text-uppercase mb-0 text-center text-md-start">
                  Novo Lançamento
                </h6>

                <div
                  className="w-100 w-md-auto"
                  style={{
                    maxWidth:
                      "100%",
                    minWidth:
                      "300px",
                  }}
                >
                  <InputGroup
                    size="sm"
                    className="shadow-sm"
                  >
                    <InputGroup.Text className="bg-body border-end-0">
                      <FontAwesomeIcon
                        icon={
                          faSearch
                        }
                        className="text-muted"
                      />
                    </InputGroup.Text>

                    <Form.Control
                      className="bg-body border-start-0 shadow-none"
                      placeholder="Filtrar lançamentos..."
                      value={
                        searchTerm
                      }
                      onChange={(
                        e
                      ) =>
                        setSearchTerm(
                          e.target
                            .value
                        )
                      }
                    />
                  </InputGroup>
                </div>
              </div>

              <Form
                onSubmit={
                  handleFormFinancial
                }
              >
                {formError && (
                  <Alert
                    variant="danger"
                    className="py-2"
                    dismissible
                    onClose={() =>
                      setFormError(
                        null
                      )
                    }
                  >
                    {formError}
                  </Alert>
                )}

                <Row className="g-3 mb-3">
                  {/* TIPO */}

                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <Form.Label className="small fw-bold text-muted">
                      TIPO
                    </Form.Label>

                    <Form.Select
                      className="bg-body border shadow-none"
                      name="tipodedado"
                      value={
                        financialData.tipodedado
                      }
                      onChange={
                        handleCampfinancial
                      }
                      required
                    >
                      <option value="">
                        Selecione...
                      </option>

                      <option value="Receita">
                        Receita (+)
                      </option>

                      <option value="Despesa">
                        Despesa (-)
                      </option>
                    </Form.Select>
                  </Col>

                  {/* VALOR */}

                  <Col xs={12} sm={6} md={3}>
                    <Form.Label className="small fw-bold text-muted">
                      VALOR (R$)
                    </Form.Label>

                    <Form.Control
                      className="bg-body border shadow-none"
                      type="text"
                      name="valor"
                      inputMode="decimal"
                      value={financialData.valor}
                      onChange={handleValorChange}
                      placeholder="0,00"
                      required
                    />
                  </Col>

                  {/* STATUS */}

                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <Form.Label className="small fw-bold text-muted">
                      STATUS
                    </Form.Label>

                    <Form.Select
                      className="bg-body border shadow-none"
                      name="statuspagamento"
                      value={
                        financialData.statuspagamento
                      }
                      onChange={
                        handleCampfinancial
                      }
                      required
                    >
                      <option value="">
                        Selecione...
                      </option>

                      <option value="Pago">
                        Pago
                      </option>

                      <option value="Não pago">
                        Pendente
                      </option>
                    </Form.Select>
                  </Col>

                  {/* CATEGORIA */}

                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <Form.Label className="small fw-bold text-muted">
                      CATEGORIA
                    </Form.Label>

                    <Form.Select
                      className="bg-body border shadow-none"
                      name="tipolancamento"
                      value={
                        financialData.tipolancamento
                      }
                      onChange={
                        handleCampfinancial
                      }
                      required
                    >
                      <option value="">
                        Selecione...
                      </option>

                      <option value="Oferta">
                        Oferta/Dízimo
                      </option>

                      <option value="Aluguel">
                        Aluguel
                      </option>

                      <option value="Luz/Agua">
                        Luz/Água
                      </option>

                      <option value="Manutencao">
                        Manutenção
                      </option>
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="g-3 mb-4">
                  {/* DATA */}

                  <Col
                    xs={12}
                    sm={4}
                    md={2}
                  >
                    <Form.Label className="small fw-bold text-muted">
                      DATA
                    </Form.Label>

                    <Form.Control
                      className="bg-body border shadow-none"
                      type="date"
                      name="datapagamento"
                      value={
                        financialData.datapagamento
                      }
                      onChange={
                        handleCampfinancial
                      }
                      required
                    />
                  </Col>

                  {/* DESCRIÇÃO */}

                  <Col
                    xs={12}
                    sm={8}
                    md={5}
                  >
                    <Form.Label className="small fw-bold text-muted">
                      DESCRIÇÃO
                    </Form.Label>

                    <Form.Control
                      className="bg-body border shadow-none"
                      type="text"
                      name="descricao"
                      value={
                        financialData.descricao
                      }
                      onChange={
                        handleCampfinancial
                      }
                      required
                      placeholder="Ex: Manutenção..."
                    />
                  </Col>

                  {/* OBSERVAÇÕES */}

                  <Col
                    xs={12}
                    md={5}
                  >
                    <Form.Label className="small fw-bold text-muted">
                      OBSERVAÇÕES
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={1}
                      className="bg-body border shadow-none"
                      name="observacao"
                      value={
                        financialData.observacao
                      }
                      onChange={
                        handleCampfinancial
                      }
                      required
                      placeholder="Notas adicionais..."
                      style={{
                        resize:
                          "none",
                      }}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-pill px-5 fw-bold shadow-sm w-md-auto"
                  >
                    <FontAwesomeIcon
                      icon={
                        faPlus
                      }
                      className="me-2"
                    />

                    Salvar Lançamento
                  </Button>
                </div>
              </Form>
            </Card>
          </Container>
        </div>

        {/* ==================================
            TABELA
        =================================== */}

        <div
          className={`flex-grow-1 px-2 px-md-4 pb-4 ${isMobile
            ? ""
            : "overflow-auto"
            }`}
        >
          <Container
            fluid
            className="h-100 d-flex flex-column"
          >
            <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden flex-shrink-0 mb-3">
              <div className="table-responsive">
                <Table
                  hover
                  className="mb-0 align-middle table-borderless text-nowrap"
                >
                  <thead className="bg-body-secondary position-sticky top-0 z-1">
                    <tr className="text-secondary small text-uppercase">
                      {/* CHECKBOX */}

                      <th
                        className="text-center py-3"
                        style={{
                          width:
                            "50px",
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          onChange={
                            handleSelectAll
                          }
                          checked={
                            selectedIds.length ===
                            sortedFinance.length &&
                            sortedFinance.length >
                            0
                          }
                        />
                      </th>

                      <th className="text-center">
                        Ação
                      </th>

                      {/* NOVA COLUNA */}

                      <th>
                        ID
                      </th>

                      <th>
                        Pagamento
                      </th>

                      {/* NOVA COLUNA */}

                      <th className="text-center">
                        Status
                      </th>

                      <th>
                        Tipo
                      </th>

                      <th>
                        Valor
                      </th>

                      <th>
                        Descrição
                      </th>

                      <th>
                        Lançado em
                      </th>
                    </tr>
                  </thead>

                  <tbody className="border-top">
                    {currentItems.length ===
                      0 ? (
                      <tr>
                        <td
                          colSpan="9"
                          className="text-center py-5 text-secondary"
                        >
                          Nenhum registro
                          encontrado.
                        </td>
                      </tr>
                    ) : (
                      currentItems.map(
                        (
                          dado
                        ) => {
                          /*
                           * O backend salva
                           * esses valores em
                           * minúsculas.
                           *
                           * Por isso sempre
                           * normalizamos antes
                           * de comparar.
                           */
                          const tipo =
                            dado.tipodedado
                              ?.toLowerCase();

                          const status =
                            dado.statuspagamento
                              ?.toLowerCase();

                          const isReceita =
                            tipo ===
                            "receita";

                          const isPago =
                            status ===
                            "pago";

                          return (
                            <tr
                              key={
                                dado._id
                              }
                              className={
                                selectedIds.includes(
                                  dado._id
                                )
                                  ? "bg-primary bg-opacity-10"
                                  : ""
                              }
                            >
                              {/* SELEÇÃO */}

                              <td className="text-center">
                                <Form.Check
                                  type="checkbox"
                                  checked={selectedIds.includes(
                                    dado._id
                                  )}
                                  onChange={() =>
                                    handleSelectOne(
                                      dado._id
                                    )
                                  }
                                />
                              </td>

                              {/* AÇÃO */}

                              <td className="text-center">
                                <Button
                                  variant="link"
                                  className="text-primary p-0 shadow-none"
                                  onClick={() =>
                                    navigate(
                                      `/financeiro/${dado._id}`
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      faEye
                                    }
                                  />
                                </Button>
                              </td>

                              {/* ID */}

                              <td>
                                <code className="small text-body">
                                  {
                                    dado._id
                                  }
                                </code>
                              </td>

                              {/* DATA PAGAMENTO */}

                              <td className="small">
  {formatDatePagamento(
    dado.datapagamento
  )}
</td>

                              {/* STATUS
                                  Mesmo padrão visual
                                  da tela Membresia
                              */}

                              <td className="text-center">
                                {isPago ? (
                                  <Badge
                                    bg="success-subtle"
                                    className="text-success border border-success-subtle fw-normal"
                                  >
                                    Pago
                                  </Badge>
                                ) : (
                                  <Badge
                                    bg="secondary-subtle"
                                    className="text-secondary border border-secondary-subtle fw-normal opacity-75"
                                  >
                                    Pendente
                                  </Badge>
                                )}
                              </td>

                              {/* TIPO */}

                              <td>
                                <Badge
                                  bg={
                                    isReceita
                                      ? "primary-subtle"
                                      : "danger-subtle"
                                  }
                                  className={
                                    isReceita
                                      ? "text-primary border border-primary-subtle fw-normal"
                                      : "text-danger border border-danger-subtle fw-normal"
                                  }
                                >
                                  {isReceita
                                    ? "Receita"
                                    : "Despesa"}
                                </Badge>
                              </td>

                              {/* VALOR */}

                              <td className="fw-bold">
                                {formatCurrency(dado.valor)}
                              </td>

                              {/* DESCRIÇÃO */}

                              <td className="small">
                                <div
                                  className="fw-bold text-truncate"
                                  style={{
                                    maxWidth:
                                      "180px",
                                  }}
                                >
                                  {dado.descricao ||
                                    "-"}
                                </div>

                                <div
                                  className="text-muted text-truncate"
                                  style={{
                                    maxWidth:
                                      "180px",
                                  }}
                                >
                                  {dado.observacao ||
                                    "-"}
                                </div>
                              </td>

                              {/* DATA DE LANÇAMENTO */}

                              <td className="small text-muted">
                                {dado.dataderegistro ||
                                  "-"}
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>

            {/* ===============================
                PAGINAÇÃO
            ================================ */}

            {sortedFinance.length >
              itemsPerPage && (
                <div className="d-flex justify-content-center mt-auto pb-2">
                  <Pagination className="shadow-sm mb-0 flex-wrap justify-content-center">
                    <Pagination.First
                      onClick={() =>
                        setCurrentPage(
                          1
                        )
                      }
                      disabled={
                        currentPage ===
                        1
                      }
                    />

                    <Pagination.Prev
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.max(
                              prev -
                              1,
                              1
                            )
                        )
                      }
                      disabled={
                        currentPage ===
                        1
                      }
                    />

                    {
                      paginationItems
                    }

                    <Pagination.Next
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.min(
                              prev +
                              1,
                              totalPages
                            )
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                    />

                    <Pagination.Last
                      onClick={() =>
                        setCurrentPage(
                          totalPages
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                    />
                  </Pagination>
                </div>
              )}
          </Container>
        </div>
      </main>

      {/* ==================================
          FOOTER
      =================================== */}

      <footer className="py-2 px-3 px-md-4 border-top bg-body-tertiary text-secondary small d-flex flex-column flex-md-row justify-content-between align-items-center flex-shrink-0 text-center text-md-start">
        <span className="mb-1 mb-md-0">
          Gestão Financeira • 2025
        </span>

        <span>
          Página{" "}
          <strong>
            {currentPage}
          </strong>{" "}
          de{" "}
          <strong>
            {totalPages || 1}
          </strong>{" "}
          • Total:{" "}
          <strong>
            {
              sortedFinance.length
            }
          </strong>
        </span>
      </footer>
    </div>
  );
};