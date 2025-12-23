import React, { useContext, useState, useEffect } from "react";
import MobileCardsView from "./MobileCardsView";
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
} from "react-bootstrap";

const Membros = () => {
  // --- LÓGICA ORIGINAL PRESERVADA ---
  const { dados } = useContext(DataInfor);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(
        window.innerWidth < 768 && window.orientation !== undefined
      );
    };
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    window.addEventListener("orientationchange", checkMobileView);
    return () => {
      window.removeEventListener("resize", checkMobileView);
      window.removeEventListener("orientationchange", checkMobileView);
    };
  }, []);

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

  // --- INTERFACE REFATORADA ---
  return (
    <div className="vh-100 d-flex flex-column overflow-hidden bg-body">
      {/* HEADER FIXO */}
      <header className="py-3 px-4 border-bottom bg-body-tertiary shadow-sm z-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={7}>
              <h2 className="fw-bold mb-0 h4">
                <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" />
                Gestão de Membros
              </h2>
            </Col>
            <Col
              md={5}
              className="text-end d-flex justify-content-end align-items-center gap-3"
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

      {/* ÁREA DE CONTEÚDO SCROLLÁVEL */}
      <main className="flex-grow-1 overflow-auto p-4 bg-body">
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

          {/* CARDS DE ESTATÍSTICAS HORIZONTAIS */}
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

          {/* BARRA DE FERRAMENTAS E BUSCA */}
          <Card className="border shadow-sm rounded-4 bg-body-tertiary mb-4 p-4">
            <Row className="g-3 align-items-center">
              <Col md={5}>
                <InputGroup className="shadow-sm rounded-pill overflow-hidden border">
                  <InputGroup.Text className="bg-body border-0 text-secondary">
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    className="bg-body border-0 shadow-none py-2"
                    placeholder="Nome, email, profissão ou batismo..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </InputGroup>
              </Col>

              <Col md={3} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  id="selectAll"
                  className="fw-semibold text-secondary small ms-2"
                  label={`Selecionar todos (${filteredDados.length})`}
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </Col>

              <Col md={4} className="text-md-end">
                <div className="d-flex gap-2 justify-content-md-end">
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-pill px-3 fw-bold shadow-sm"
                    onClick={handleDeleteItems}
                    disabled={selectedItems.length === 0}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-2" /> Excluir
                  </Button>

                  <CSVLink
                    data={dados}
                    filename={`Membros_${formatDateToExport()}.csv`}
                    className="btn btn-sm btn-outline-success rounded-pill px-3 fw-bold d-flex align-items-center shadow-sm"
                  >
                    <FontAwesomeIcon icon={faDownload} className="me-2" />{" "}
                    Exportar
                  </CSVLink>
                </div>
              </Col>
            </Row>
          </Card>

          {/* TABELA / VIEW MOBILE */}
          <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden">
            {isMobileView ? (
              <div className="p-3">
                <MobileCardsView
                  filteredDados={filteredDados}
                  selectedItems={selectedItems}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="mb-0 align-middle table-borderless">
                  <thead className="bg-body-secondary">
                    <tr className="text-secondary small text-uppercase">
                      <th
                        className="py-3 text-center"
                        style={{ width: "60px" }}
                      >
                        #
                      </th>
                      <th className="py-3 text-center">Ver</th>
                      <th className="py-3">Membro</th>
                      <th className="py-3 d-none d-md-table-cell">Contato</th>
                      <th className="py-3 d-none d-lg-table-cell">
                        Localização
                      </th>
                      <th className="py-3 d-none d-xl-table-cell text-center">
                        Batismo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-top">
                    {filteredDados.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-5 text-secondary"
                        >
                          Nenhum registro encontrado para "{searchTerm}"
                        </td>
                      </tr>
                    ) : (
                      filteredDados.map((dado) => (
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
                          <td className="d-none d-md-table-cell small">
                            <div>{dado.email}</div>
                            <div className="text-secondary opacity-75">
                              {dado.telone}
                            </div>
                          </td>
                          <td className="d-none d-lg-table-cell small">
                            <div>{dado.city}</div>
                            <div className="text-secondary opacity-75">
                              {dado.profession}
                            </div>
                          </td>
                          <td className="d-none d-xl-table-cell text-center">
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
            )}
          </Card>
        </Container>
      </main>

      {/* FOOTER FIXO */}
      <footer className="py-2 px-4 border-top bg-body-tertiary text-secondary small d-flex justify-content-between align-items-center">
        <span>Sistema de Gestão Premium • 2025</span>
        <span>
          Total de Registros: <strong>{filteredDados.length}</strong>
        </span>
      </footer>
    </div>
  );
};

// Componente Interno para os Cards de Estatística (Padrão Master)
const StatCard = ({ label, val, icon, color }) => (
  <Col md={3}>
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
