import React, { useContext, useState, useEffect } from "react";
// MobileCardsView removido pois usaremos a tabela padrão
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

const Membros = () => {
  const { dados } = useContext(DataInfor);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAlert, setShowAlert] = useState(null);

  // Detecção de Mobile para Layout Híbrido (Scroll da página vs Scroll interno)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // --- PAGINAÇÃO ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toLowerSafe = (value) =>
    typeof value === "string" ? value.toLowerCase() : "";

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectAll(false);
  };

  const filteredDados = dados.filter((dado) => {
    const lowerSearchTerm = toLowerSafe(searchTerm);
    return (
      toLowerSafe(dado._id).includes(lowerSearchTerm) ||
      toLowerSafe(dado.name).includes(lowerSearchTerm) ||
      toLowerSafe(dado.email).includes(lowerSearchTerm) ||
      toLowerSafe(dado.mothersname).includes(lowerSearchTerm) ||
      toLowerSafe(dado.fathersname).includes(lowerSearchTerm) ||
      toLowerSafe(dado.dateBirth).includes(lowerSearchTerm) ||
      toLowerSafe(dado.profession).includes(lowerSearchTerm) ||
      toLowerSafe(dado.companywork).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhoum).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhodois).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhotres).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhoquatro).includes(lowerSearchTerm) ||
      toLowerSafe(dado.databatismo).includes(lowerSearchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDados.length / itemsPerPage);

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

  const handleDeleteItems = async () => {
    if (selectedItems.length === 0) {
      setShowAlert({
        type: "warning",
        message: "Selecione ao menos um item para excluir!",
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
          message: "Itens excluídos com sucesso!",
        });
        setSelectedItems([]);
        setSelectAll(false);
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        setShowAlert({ type: "danger", message: "Erro ao excluir itens." });
      }
    }
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((dadoid) => dadoid !== id));
    }
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(filteredDados.map((dado) => dado._id));
    } else {
      setSelectedItems([]);
    }
  };

  const formatDateToExport = () => {
    const data = new Date();
    return `${data.getDate().toString().padStart(2, "0")}/${(
      data.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${data.getFullYear()}`;
  };

  const closeAlert = () => setShowAlert(null);

  return (
    // LAYOUT HÍBRIDO: Mobile = Scroll da Página | Desktop = App Fixo
    <div
      className={`d-flex flex-column bg-body ${
        isMobileView ? "min-vh-100" : "vh-100 overflow-hidden"
      }`}
    >
      {/* 1. HEADER (FIXO) */}
      <header className="py-3 px-3 px-md-4 border-bottom bg-body-tertiary shadow-sm z-3 flex-shrink-0">
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col xs={12} md={7} className="text-center text-md-start">
              <h2 className="fw-bold mb-0 h4">
                <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" />
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
                <FontAwesomeIcon icon={faCircle} className="me-1 small" />{" "}
                Online
              </Badge>
              <small className="text-secondary d-none d-md-inline fw-semibold">
                {new Date().toLocaleDateString("pt-BR")}
              </small>
            </Col>
          </Row>
        </Container>
      </header>

      {/* CONTAINER PRINCIPAL */}
      <main
        className={`flex-grow-1 d-flex flex-column bg-body ${
          isMobileView ? "" : "overflow-hidden"
        }`}
      >
        {/* PARTE A: ÁREA SUPERIOR */}
        <div className="flex-shrink-0 px-2 px-md-4 pt-3 pt-md-4">
          <Container fluid>
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

            {/* Cards de Estatísticas */}
            <Row className="g-3 mb-4">
              <StatCard
                label="Total Membros"
                val={dados.length}
                icon={faUsers}
                color="text-primary"
              />
              <StatCard
                label="Filtrados"
                val={filteredDados.length}
                icon={faFilter}
                color="text-info"
              />
              <StatCard
                label="Selecionados"
                val={selectedItems.length}
                icon={faUserTag}
                color="text-warning"
              />
              <StatCard
                label="Batizados"
                val={dados.filter((d) => d.databatismo).length}
                icon={faCheckCircle}
                color="text-success"
              />
            </Row>

            {/* Barra de Busca e Ações */}
            <Card className="border shadow-sm rounded-4 bg-body-tertiary mb-3 p-3 p-md-4">
              <Row className="g-3 align-items-center">
                <Col xs={12} md={5}>
                  <InputGroup className="shadow-sm rounded-pill overflow-hidden border">
                    <InputGroup.Text className="bg-body border-0 text-secondary">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      className="bg-body border-0 shadow-none py-2"
                      placeholder="Buscar por nome..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </Col>
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
                    onChange={handleSelectAllChange}
                  />
                </Col>
                <Col xs={6} md={4} className="text-end">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-pill px-3 fw-bold shadow-sm"
                      onClick={handleDeleteItems}
                      disabled={selectedItems.length === 0}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
                      <span className="d-none d-sm-inline">Excluir</span>
                    </Button>
                    <CSVLink
                      data={dados}
                      filename={`Membros_${formatDateToExport()}.csv`}
                      className="btn btn-sm btn-outline-success rounded-pill px-3 fw-bold d-flex align-items-center shadow-sm"
                    >
                      <FontAwesomeIcon icon={faDownload} className="me-2" />{" "}
                      <span className="d-none d-sm-inline">Exportar</span>
                    </CSVLink>
                  </div>
                </Col>
              </Row>
            </Card>
          </Container>
        </div>

        {/* PARTE B: ÁREA DA TABELA */}
        {/* No mobile, removemos overflow-auto para usar o scroll nativo da página */}
        <div
          className={`flex-grow-1 px-2 px-md-4 pb-4 ${
            isMobileView ? "" : "overflow-auto"
          }`}
        >
          <Container fluid className="h-100 d-flex flex-column">
            <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden mb-3 flex-shrink-0">
              <div className="table-responsive">
                {/* text-nowrap: Impede quebra de linha (mantém tabela larga)
                   table-borderless + align-middle: Estilo visual limpo
                */}
                <Table
                  hover
                  className="mb-0 align-middle table-borderless text-nowrap"
                >
                  <thead className="bg-body-secondary position-sticky top-0 z-1">
                    <tr className="text-secondary small text-uppercase">
                      <th
                        className="py-3 text-center"
                        style={{ width: "60px" }}
                      >
                        #
                      </th>
                      <th className="py-3 text-center">Ver</th>
                      <th className="py-3">Membro</th>
                      {/* Removidas classes d-none para mostrar tudo no mobile via scroll */}
                      <th className="py-3">Contato</th>
                      <th className="py-3">Localização</th>
                      <th className="py-3 text-center">Batismo</th>
                    </tr>
                  </thead>
                  <tbody className="border-top">
                    {currentItems.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
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
                            selectedItems.includes(dado._id)
                              ? "bg-primary bg-opacity-10"
                              : ""
                          }
                        >
                          <td className="text-center">
                            <Form.Check
                              type="checkbox"
                              checked={selectedItems.includes(dado._id)}
                              onChange={(e) =>
                                handleCheckboxChange(e, dado._id)
                              }
                            />
                          </td>
                          <td className="text-center">
                            <Button
                              as={Link}
                              to={`/membro/${dado._id}`}
                              variant="link"
                              className="text-primary p-0 shadow-none"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </td>
                          <td>
                            <div className="fw-bold">{dado.name}</div>
                            <div className="small text-muted font-monospace">
                              {dado._id.slice(-6).toUpperCase()}
                            </div>
                          </td>
                          <td className="small">
                            <div>{dado.email}</div>
                            <div className="text-secondary opacity-75">
                              {dado.telone}
                            </div>
                          </td>
                          <td className="small">
                            <div>{dado.city}</div>
                            <div className="text-secondary opacity-75">
                              {dado.profession}
                            </div>
                          </td>
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
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>

            {/* Controle de Paginação */}
            {filteredDados.length > itemsPerPage && (
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

      {/* FOOTER */}
      <footer className="py-2 px-3 px-md-4 border-top bg-body-tertiary text-secondary small d-flex flex-column flex-md-row justify-content-between align-items-center flex-shrink-0 text-center text-md-start">
        <span className="mb-1 mb-md-0">Sistema de Gestão Premium • 2025</span>
        <span>
          Página <strong>{currentPage}</strong> de{" "}
          <strong>{totalPages || 1}</strong> • Total:{" "}
          <strong>{filteredDados.length}</strong>
        </span>
      </footer>
    </div>
  );
};

// Componente Interno para os Cards de Estatística (Responsivo)
const StatCard = ({ label, val, icon, color }) => (
  <Col xs={12} sm={6} md={3}>
    <Card className="border shadow-sm rounded-4 bg-body-tertiary">
      <Card.Body className="d-flex align-items-center p-3">
        <div
          className="bg-body p-3 rounded-circle border me-3 d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "50px", height: "50px" }}
        >
          <FontAwesomeIcon icon={icon} className={color} size="lg" />
        </div>
        <div>
          <p className="small text-secondary fw-bold text-uppercase mb-0">
            {label}
          </p>
          <h4 className="fw-bold mb-0">{val}</h4>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default Membros;
