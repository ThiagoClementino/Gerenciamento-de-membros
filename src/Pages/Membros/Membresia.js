import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import DataInfor from "../../Contexts/DataInfor";

import { Link } from "react-router-dom";

import axios from "axios";

import { CSVLink } from "react-csv";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDownload,
  faUsers,
  faFilter,
  faCheckCircle,
  faUserTag,
  faSearch,
  faTrash,
  faEye,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Badge,
  InputGroup,
  Alert,
  Pagination,
} from "react-bootstrap";

const Membresia = () => {
  const { dados } = useContext(DataInfor);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const [showAlert, setShowAlert] = useState(null);

  // Detecta se o usuário está usando visualização mobile
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth < 768
  );

  // ========================================
  // PAGINAÇÃO
  // ========================================

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage] = useState(10);

  // ========================================
  // RESPONSIVIDADE
  // ========================================

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    window.addEventListener(
      "orientationchange",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );
    };
  }, []);

  // Sempre que uma nova busca for realizada,
  // volta para a página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  const toLowerSafe = (value) =>
    typeof value === "string"
      ? value.toLowerCase()
      : "";

  /*
   * Converte datacriacao para um objeto Date.
   *
   * Suporta:
   *
   * 02/10/2026
   *
   * e
   *
   * 2026-10-02T14:00:00.000Z
   */
  const parseDate = (date) => {
    if (!date) {
      return new Date(0);
    }

    // Caso a data esteja no formato brasileiro
    // DD/MM/YYYY
    if (
      typeof date === "string" &&
      date.includes("/")
    ) {
      const [day, month, year] =
        date.split("/");

      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      );
    }

    const parsedDate = new Date(date);

    // Proteção contra data inválida
    if (Number.isNaN(parsedDate.getTime())) {
      return new Date(0);
    }

    return parsedDate;
  };

  // ========================================
  // PESQUISA
  // ========================================

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    setSelectAll(false);
  };

  // ========================================
  // FILTRAGEM DOS DADOS
  // ========================================

  const filteredDados = useMemo(() => {
    const lowerSearchTerm =
      toLowerSafe(searchTerm);

    return dados.filter((dado) => {
      return (
        toLowerSafe(dado._id).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.datacriacao).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.name).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.email).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.mothersname).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.fathersname).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.dateBirth).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.profession).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.companywork).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.nomefilhoum).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.nomefilhodois).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.nomefilhotres).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.nomefilhoquatro).includes(
          lowerSearchTerm
        ) ||
        toLowerSafe(dado.databatismo).includes(
          lowerSearchTerm
        )
      );
    });
  }, [dados, searchTerm]);

  // ========================================
  // ORDENAÇÃO
  // ========================================

  /*
   * IMPORTANTE:
   *
   * Primeiro filtramos.
   * Depois ordenamos.
   * Somente depois fazemos a paginação.
   *
   * b - a = mais recente primeiro
   */
  const sortedDados = useMemo(() => {
    return [...filteredDados].sort(
      (a, b) =>
        parseDate(b.datacriacao) -
        parseDate(a.datacriacao)
    );
  }, [filteredDados]);

  // ========================================
  // PAGINAÇÃO
  // ========================================

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems = sortedDados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    sortedDados.length / itemsPerPage
  );

  // ========================================
  // BOTÕES DA PAGINAÇÃO
  // ========================================

  const paginationItems = [];

  let startPage = Math.max(
    1,
    currentPage - 2
  );

  let endPage = Math.min(
    totalPages,
    startPage + 4
  );

  if (endPage - startPage < 4) {
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
        active={number === currentPage}
        onClick={() =>
          setCurrentPage(number)
        }
      >
        {number}
      </Pagination.Item>
    );
  }

  // ========================================
  // EXCLUSÃO
  // ========================================

  const handleDeleteItems = async () => {
    if (selectedItems.length === 0) {
      setShowAlert({
        type: "warning",
        message:
          "Selecione ao menos um item para excluir!",
      });

      return;
    }

    const confirmation = window.confirm(
      `Tem certeza de que deseja excluir ${selectedItems.length} registros?`
    );

    if (confirmation) {
      try {
        await Promise.all(
          selectedItems.map((id) =>
            axios.delete(
              `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`
            )
          )
        );

        setShowAlert({
          type: "success",
          message:
            "Itens excluídos com sucesso!",
        });

        setSelectedItems([]);

        setSelectAll(false);

        setTimeout(
          () => window.location.reload(),
          1500
        );
      } catch (error) {
        console.error(
          "Erro ao excluir registros:",
          error
        );

        setShowAlert({
          type: "danger",
          message:
            "Erro ao excluir itens.",
        });
      }
    }
  };

  // ========================================
  // SELEÇÃO INDIVIDUAL
  // ========================================

  const handleCheckboxChange = (
    event,
    id
  ) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [
        ...prev,
        id,
      ]);
    } else {
      setSelectedItems((prev) =>
        prev.filter(
          (dadoid) => dadoid !== id
        )
      );
    }
  };

  // ========================================
  // SELECIONAR TODOS
  // ========================================

  const handleSelectAllChange = (
    event
  ) => {
    const checked = event.target.checked;

    setSelectAll(checked);

    if (checked) {
      setSelectedItems(
        filteredDados.map(
          (dado) => dado._id
        )
      );
    } else {
      setSelectedItems([]);
    }
  };

  // ========================================
  // DATA PARA EXPORTAÇÃO
  // ========================================

  const formatDateToExport = () => {
    const data = new Date();

    return `${data
      .getDate()
      .toString()
      .padStart(2, "0")}/${(
      data.getMonth() + 1
    )
      .toString()
      .padStart(
        2,
        "0"
      )}/${data.getFullYear()}`;
  };

  const closeAlert = () =>
    setShowAlert(null);

  // ========================================
  // JSX
  // ========================================

  return (
    <div
      className={`d-flex flex-column bg-body ${
        isMobileView
          ? "min-vh-100"
          : "vh-100 overflow-hidden"
      }`}
    >
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="py-3 px-3 px-md-4 border-bottom bg-body-tertiary shadow-sm z-3 flex-shrink-0">
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col
              xs={12}
              md={7}
              className="text-center text-md-start"
            >
              <h2 className="fw-bold mb-0 h4">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="me-2 text-primary"
                />

                Gestão de Membros
              </h2>
            </Col>

            <Col
              xs={12}
              md={5}
              className="text-center text-md-end d-flex justify-content-center justify-content-md-end align-items-center gap-3"
            >
              <Badge
                bg="success-subtle"
                className="text-success border border-success-subtle rounded-pill px-3 py-2"
              >
                <FontAwesomeIcon
                  icon={faCircle}
                  className="me-1 small"
                />{" "}
                Online
              </Badge>

              <small className="text-secondary d-none d-md-inline fw-semibold">
                {new Date().toLocaleDateString(
                  "pt-BR"
                )}
              </small>
            </Col>
          </Row>
        </Container>
      </header>

      {/* =====================================
          CONTAINER PRINCIPAL
      ====================================== */}

      <main
        className={`flex-grow-1 d-flex flex-column bg-body ${
          isMobileView
            ? ""
            : "overflow-hidden"
        }`}
      >
        {/* ===================================
            ÁREA SUPERIOR
        ==================================== */}

        <div className="flex-shrink-0 px-2 px-md-4 pt-3 pt-md-4">
          <Container fluid>
            {/* ALERTAS */}

            {showAlert && (
              <Alert
                variant={showAlert.type}
                dismissible
                onClose={closeAlert}
                className="border-0 shadow-sm rounded-4 mb-4"
              >
                {showAlert.message}
              </Alert>
            )}

            {/* =================================
                CARDS DE ESTATÍSTICAS
            ================================== */}

            <Row className="g-3 mb-4">
              <StatCard
                label="Total Membros"
                val={dados.length}
                icon={faUsers}
                color="text-primary"
              />

              <StatCard
                label="Filtrados"
                val={
                  filteredDados.length
                }
                icon={faFilter}
                color="text-info"
              />

              <StatCard
                label="Selecionados"
                val={
                  selectedItems.length
                }
                icon={faUserTag}
                color="text-warning"
              />

              <StatCard
                label="Batizados"
                val={
                  dados.filter(
                    (d) =>
                      d.databatismo
                  ).length
                }
                icon={faCheckCircle}
                color="text-success"
              />
            </Row>

            {/* =================================
                BUSCA E AÇÕES
            ================================== */}

            <Card className="border shadow-sm rounded-4 bg-body-tertiary mb-3 p-3 p-md-4">
              <Row className="g-3 align-items-center">
                {/* BUSCA */}

                <Col xs={12} md={5}>
                  <InputGroup className="shadow-sm rounded-pill overflow-hidden border">
                    <InputGroup.Text className="bg-body border-0 text-secondary">
                      <FontAwesomeIcon
                        icon={faSearch}
                      />
                    </InputGroup.Text>

                    <Form.Control
                      type="search"
                      className="bg-body border-0 shadow-none py-2"
                      placeholder="Buscar por nome..."
                      value={searchTerm}
                      onChange={
                        handleSearchChange
                      }
                    />
                  </InputGroup>
                </Col>

                {/* SELECIONAR TODOS */}

                <Col
                  xs={6}
                  md={3}
                  className="d-flex align-items-center justify-content-center justify-content-md-start"
                >
                  <Form.Check
                    type="checkbox"
                    id="selectAll"
                    className="fw-semibold text-secondary small ms-2"
                    label={`Todos (${filteredDados.length})`}
                    checked={selectAll}
                    onChange={
                      handleSelectAllChange
                    }
                  />
                </Col>

                {/* BOTÕES */}

                <Col
                  xs={6}
                  md={4}
                  className="text-end"
                >
                  <div className="d-flex gap-2 justify-content-end">
                    {/* EXCLUIR */}

                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-pill px-3 fw-bold shadow-sm"
                      onClick={
                        handleDeleteItems
                      }
                      disabled={
                        selectedItems.length ===
                        0
                      }
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="me-2"
                      />

                      <span className="d-none d-sm-inline">
                        Excluir
                      </span>
                    </Button>

                    {/* EXPORTAR */}

                    <CSVLink
                      data={sortedDados}
                      filename={`Membros_${formatDateToExport()}.csv`}
                      className="btn btn-sm btn-outline-success rounded-pill px-3 fw-bold d-flex align-items-center shadow-sm"
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="me-2"
                      />

                      <span className="d-none d-sm-inline">
                        Exportar
                      </span>
                    </CSVLink>
                  </div>
                </Col>
              </Row>
            </Card>
          </Container>
        </div>

        {/* =====================================
            ÁREA DA TABELA
        ====================================== */}

        <div
          className={`flex-grow-1 px-2 px-md-4 pb-4 ${
            isMobileView
              ? ""
              : "overflow-auto"
          }`}
        >
          <Container
            fluid
            className="h-100 d-flex flex-column"
          >
            <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden mb-3 flex-shrink-0">
              <div className="table-responsive">
                <Table
                  hover
                  className="mb-0 align-middle table-borderless text-nowrap"
                >
                  {/* ===========================
                      CABEÇALHO
                  ============================ */}

                  <thead className="bg-body-secondary position-sticky top-0 z-1">
                    <tr className="text-secondary small">
                      <th
                        className="py-3 text-center"
                        style={{
                          width: "60px",
                        }}
                      >
                        Seleção
                      </th>

                      <th className="py-3 text-center">
                        Ver
                      </th>

                      <th className="py-3">
                        Inscrição
                      </th>

                      <th className="py-3">
                        Registro
                      </th>

                      <th className="py-3">
                        Membro
                      </th>

                      <th className="py-3">
                        Contato
                      </th>

                      <th className="py-3 text-center">
                        Batismo
                      </th>
                    </tr>
                  </thead>

                  {/* ===========================
                      CORPO DA TABELA
                  ============================ */}

                  <tbody className="border-top">
                    {currentItems.length ===
                    0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-5 text-secondary"
                        >
                          Nenhum registro
                          encontrado.
                        </td>
                      </tr>
                    ) : (
                      currentItems.map(
                        (dado) => (
                          <tr
                            key={dado._id}
                            className={
                              selectedItems.includes(
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
                                checked={selectedItems.includes(
                                  dado._id
                                )}
                                onChange={(
                                  e
                                ) =>
                                  handleCheckboxChange(
                                    e,
                                    dado._id
                                  )
                                }
                              />
                            </td>

                            {/* VISUALIZAR */}

                            <td className="text-center">
                              <Button
                                as={Link}
                                to={`/membro/${dado._id}`}
                                variant="link"
                                className="text-primary p-0 shadow-none"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    faEye
                                  }
                                />
                              </Button>
                            </td>

                            {/* INSCRIÇÃO */}

                            <td>
                              <div className="fw-normal">
                                {
                                  dado.datacriacao
                                }
                              </div>
                            </td>

                            {/* REGISTRO */}

                            <td>
                              <div className="fw-normal">
                                {dado._id
                                  ?.slice(
                                    -6
                                  )
                                  .toUpperCase()}
                              </div>
                            </td>

                            {/* NOME */}

                            <td>
                              <div className="fw-normal">
                                {
                                  dado.name
                                }
                              </div>
                            </td>

                            {/* CONTATO */}

                            <td className="small">
                              <div>
                                {
                                  dado.email
                                }
                              </div>

                              <div className="text-secondary opacity-75">
                                {
                                  dado.telone
                                }
                              </div>
                            </td>

                            {/* BATISMO */}

                            <td className="text-center">
                              {dado.databatismo ? (
                                <Badge
                                  bg="success-subtle"
                                  className="text-success border border-success-subtle fw-normal"
                                >
                                  Batizado
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
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>

            {/* =================================
                PAGINAÇÃO
            ================================== */}

            {sortedDados.length >
              itemsPerPage && (
              <div className="d-flex justify-content-center mt-auto pb-2">
                <Pagination className="shadow-sm mb-0 flex-wrap justify-content-center">
                  {/* PRIMEIRA PÁGINA */}

                  <Pagination.First
                    onClick={() =>
                      setCurrentPage(1)
                    }
                    disabled={
                      currentPage === 1
                    }
                  />

                  {/* ANTERIOR */}

                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          Math.max(
                            prev - 1,
                            1
                          )
                      )
                    }
                    disabled={
                      currentPage === 1
                    }
                  />

                  {/* NÚMEROS */}

                  {paginationItems}

                  {/* PRÓXIMA */}

                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          Math.min(
                            prev + 1,
                            totalPages
                          )
                      )
                    }
                    disabled={
                      currentPage ===
                      totalPages
                    }
                  />

                  {/* ÚLTIMA */}

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

      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="py-2 px-3 px-md-4 border-top bg-body-tertiary text-secondary small d-flex flex-column flex-md-row justify-content-between align-items-center flex-shrink-0 text-center text-md-start">
        <span className="mb-1 mb-md-0">
          Sistema de Gestão Premium •
          2025
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
            {filteredDados.length}
          </strong>
        </span>
      </footer>
    </div>
  );
};

// ==========================================
// CARD DE ESTATÍSTICAS
// ==========================================

const StatCard = ({
  label,
  val,
  icon,
  color,
}) => (
  <Col
    xs={12}
    sm={6}
    md={3}
  >
    <Card className="border shadow-sm rounded-4 bg-body-tertiary">
      <Card.Body className="d-flex align-items-center p-3">
        <div
          className="bg-body p-3 rounded-circle border me-3 d-flex align-items-center justify-content-center shadow-sm"
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            className={color}
            size="lg"
          />
        </div>

        <div>
          <p className="small text-secondary fw-normal text-uppercase mb-0">
            {label}
          </p>

          <h4 className="fw-normal mb-0">
            {val}
          </h4>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default Membresia;