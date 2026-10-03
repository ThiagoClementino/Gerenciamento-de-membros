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
  faPenToSquare,
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

const maleAvatar = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <rect width="120" height="120" rx="60" fill="#e7f1ff"/>
    <circle cx="60" cy="47" r="24" fill="#e0ac69"/>
    <path d="M35 48c0-22 12-34 25-34 18 0 27 12 27 31-8-8-20-12-34-10-7 1-13 5-18 13z" fill="#343a40"/>
    <path d="M25 115c2-28 17-42 35-42s33 14 35 42z" fill="#0d6efd"/>
  </svg>
`)}`;

const femaleAvatar = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <rect width="120" height="120" rx="60" fill="#fce8f3"/>
    <path d="M30 58c0-30 13-45 30-45s30 15 30 45v25H30z" fill="#5b3a29"/>
    <circle cx="60" cy="47" r="23" fill="#e0ac69"/>
    <path d="M25 115c2-28 17-42 35-42s33 14 35 42z" fill="#d63384"/>
  </svg>
`)}`;

const dateKey = (value) => {
  const text = String(value || '');
  const local = text.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (local) return local[3] + '-' + local[2] + '-' + local[1];
  return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : '';
};

const matchesFilters = (member, filters) => {
  const date = dateKey(member.datacriacao);
  return (!filters.sex || member.sex === filters.sex)
    && (!filters.baptism || Boolean(member.databatismo) === (filters.baptism === 'batizado'))
    && (!filters.congregation || member.congregacao === filters.congregation)
    && (!filters.start || (date && date >= filters.start))
    && (!filters.end || (date && date <= filters.end));
};

const compareMembers = (a, b, order) => {
  const left = String(a.matricula || '').trim();
  const right = String(b.matricula || '').trim();
  const registration = () => !left ? (right ? 1 : 0) : !right ? -1
    : (order === 'matricula-asc' ? left.localeCompare(right, 'pt-BR', {numeric: true})
      : right.localeCompare(left, 'pt-BR', {numeric: true}));
  if (order === 'nome') return String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR');
  if (order === 'recentes' || order === 'antigos') {
    const first = dateKey(a.datacriacao);
    const second = dateKey(b.datacriacao);
    if (!first || !second) return !first ? (second ? 1 : registration()) : -1;
    const dates = order === 'recentes' ? second.localeCompare(first) : first.localeCompare(second);
    if (dates) return dates;
  }
  return registration();
};

const Membresia = () => {
  const { dados } = useContext(DataInfor);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({sex: '', baptism: '', congregation: '', start: '', end: ''});
  const [order, setOrder] = useState('recentes');
  const congregations = useMemo(() => [...new Set(dados.map(member => member.congregacao).filter(Boolean))].sort((a,b) => a.localeCompare(b,'pt-BR')), [dados]);
  const changeFilter = (event) => {
    const {name, value} = event.target;
    setFilters(previous => ({...previous, [name]: value}));
  };
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({sex: '', baptism: '', congregation: '', start: '', end: ''});
    setOrder('recentes');
  };

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

  // Verifica ao carregar o componente
  handleResize();

  // Mudança de tamanho da tela
  window.addEventListener(
    "resize",
    handleResize
  );

  // Mudança de orientação do celular
  window.addEventListener(
    "orientationchange",
    handleResize
  );

  // Atualiza ao retornar pelo botão voltar
  window.addEventListener(
    "pageshow",
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

    window.removeEventListener(
      "pageshow",
      handleResize
    );
  };
}, []);

  // Sempre que uma nova busca for realizada,
  // volta para a página 1
  useEffect(() => {
    setCurrentPage(1);
    setSelectedItems([]);
    setSelectAll(false);
  }, [searchTerm, filters, order]);

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  const toLowerSafe = (value) =>
    typeof value === "string"
      ? value.toLowerCase()
      : "";

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
      if (!matchesFilters(dado, filters)) return false;
      return (
        toLowerSafe(dado.matricula).includes(
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
  }, [dados, searchTerm, filters]);

  // ========================================
  // ORDENAÇÃO
  // ========================================

  // Filtra e ordena antes da paginação e exportação.
  const sortedDados = useMemo(() => [...filteredDados].sort((a,b) => compareMembers(a,b,order)), [filteredDados,order]);

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
      className={`d-flex flex-column bg-body ${isMobileView
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
        className={`flex-grow-1 d-flex flex-column bg-body ${isMobileView
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
                      placeholder="Buscar por nome, matrícula ou e-mail..."
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

              <Row className="g-3 mt-1 align-items-end">
                <Col xs={12} md={4}><Form.Group controlId="filter-order">
                  <Form.Label>Ordenar por</Form.Label>
                  <Form.Select value={order} onChange={event => setOrder(event.target.value)}>
                    <option value="recentes">Cadastros mais recentes</option>
                    <option value="antigos">Cadastros mais antigos</option>
                    <option value="matricula-desc">Maior matrícula primeiro</option>
                    <option value="matricula-asc">Menor matrícula primeiro</option>
                    <option value="nome">Nome (A–Z)</option>
                  </Form.Select>
                </Form.Group></Col>
                <Col xs={6} md={4}><Form.Group controlId="filter-sex">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select name="sex" value={filters.sex} onChange={changeFilter}>
                    <option value="">Todos</option><option value="Feminino">Feminino</option><option value="Masculino">Masculino</option>
                  </Form.Select>
                </Form.Group></Col>
                <Col xs={6} md={4}><Form.Group controlId="filter-baptism">
                  <Form.Label>Batismo</Form.Label>
                  <Form.Select name="baptism" value={filters.baptism} onChange={changeFilter}>
                    <option value="">Todos</option><option value="batizado">Batizados</option><option value="pendente">Pendentes</option>
                  </Form.Select>
                </Form.Group></Col>
                <Col xs={12} md={4}><Form.Group controlId="filter-congregation">
                  <Form.Label>Congregação</Form.Label>
                  <Form.Select name="congregation" value={filters.congregation} onChange={changeFilter}>
                    <option value="">Todas</option>{congregations.map(value => <option key={value} value={value}>{value}</option>)}
                  </Form.Select>
                </Form.Group></Col>
                <Col xs={6} md={3}><Form.Group controlId="filter-start">
                  <Form.Label>Inscrição a partir de</Form.Label>
                  <Form.Control type="date" name="start" value={filters.start} max={filters.end || undefined} onChange={changeFilter} />
                </Form.Group></Col>
                <Col xs={6} md={3}><Form.Group controlId="filter-end">
                  <Form.Label>Inscrição até</Form.Label>
                  <Form.Control type="date" name="end" value={filters.end} min={filters.start || undefined} onChange={changeFilter} />
                </Form.Group></Col>
                <Col xs={12} md={2}><Button variant="outline-secondary" className="w-100" onClick={clearFilters}>Limpar filtros</Button></Col>
              </Row>
            </Card>
          </Container>
        </div>

        {/* =====================================
            ÁREA DA TABELA
        ====================================== */}

        <div
          className={`flex-grow-1 px-2 px-md-4 pb-4 ${isMobileView ? "" : "overflow-auto"
            }`}
        >
          <Container
            fluid
            className="h-100 d-flex flex-column"
          >
            {isMobileView ? (
              <div className="d-flex flex-column gap-3 mb-3 d-md-none">
                {currentItems.length === 0 ? (
                  <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                    <Card.Body className="text-center py-5 text-secondary">
                      Nenhum registro encontrado.
                    </Card.Body>
                  </Card>
                ) : (
                  currentItems.map((dado) => {
                    const isSelected =
                      selectedItems.includes(dado._id);

                    const isFemale =
                      dado.sex?.toLowerCase() ===
                      "feminino";

                    const avatar =
                      isFemale
                        ? femaleAvatar
                        : maleAvatar;

                    return (
                      <Card
                        key={dado._id}
                        className={`border shadow-sm rounded-4 overflow-hidden ${isSelected
                            ? "border-primary bg-primary bg-opacity-10"
                            : "bg-body-tertiary"
                          }`}
                      >
                        <Card.Body className="p-3">
                          {/* TOPO DO CARD */}

                          <div className="d-flex align-items-start gap-3">
                            {/* AVATAR */}

                            <div className="flex-shrink-0">
                              <img
                                src={avatar}
                                alt={
                                  isFemale
                                    ? "Avatar feminino"
                                    : "Avatar masculino"
                                }
                                className="rounded-circle border shadow-sm"
                                width="72"
                                height="72"
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            </div>

                            {/* NOME E REGISTRO */}

                            <div className="flex-grow-1 min-w-0">
                              <div className="d-flex justify-content-between align-items-start gap-2">
                                <div className="flex-grow-1">
                                  <h6 className="fw-bold mb-1 text-break">
                                    {dado.name ||
                                      "Nome não informado"}
                                  </h6>

                                  <small className="text-secondary d-block">
                                    Matrícula:{" "}
                                    <span className="fw-semibold">
                                      {dado.matricula ||
                                        "-"}
                                    </span>
                                  </small>
                                </div>

                                {/* CHECKBOX */}

                                <Form.Check
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      dado._id
                                    )
                                  }
                                />
                              </div>

                              <div className="mt-2">
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
                                    className="text-secondary border border-secondary-subtle fw-normal"
                                  >
                                    Pendente
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* DADOS */}

                          <div className="border-top mt-3 pt-3">
                            <Row className="g-3">
                              <Col xs={6}>
                                <small className="text-secondary d-block mb-1">
                                  Inscrição
                                </small>

                                <span className="small fw-semibold">
                                  {dado.datacriacao ||
                                    "-"}
                                </span>
                              </Col>

                              <Col xs={6}>
                                <small className="text-secondary d-block mb-1">
                                  Matrícula
                                </small>

                                <span className="small fw-semibold">
                                  {dado.matricula ||
                                    "-"}
                                </span>
                              </Col>

                              <Col xs={12}>
                                <small className="text-secondary d-block mb-1">
                                  E-mail
                                </small>

                                <span className="small text-break">
                                  {dado.email || "-"}
                                </span>
                              </Col>

                              <Col xs={12}>
                                <small className="text-secondary d-block mb-1">
                                  Telefone
                                </small>

                                <span className="small">
                                  {dado.telone || "-"}
                                </span>
                              </Col>
                            </Row>
                          </div>

                          {/* AÇÕES */}

                          <div className="border-top mt-3 pt-3">
                            <Row className="g-2">
                              <Col xs={6}>
                                <Button
                                  as={Link}
                                  to={`/membro/${dado._id}`}
                                  variant="outline-primary"
                                  size="sm"
                                  className="w-100 rounded-pill fw-semibold"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="me-2"
                                  />

                                  Visualizar
                                </Button>
                              </Col>

                              <Col xs={6}>
                                <Button
                                  as={Link}
                                  to={`/membro/${dado._id}`}
                                  variant="primary"
                                  size="sm"
                                  className="w-100 rounded-pill fw-semibold"
                                >
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="me-2"
                                  />

                                  Editar
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })
                )}
              </div>) : (<Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden mb-3 flex-shrink-0 d-none d-md-block">
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
                          Matrícula
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
                                  {dado.matricula}
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
               )}

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