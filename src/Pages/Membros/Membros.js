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
  faPlus,
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
  const { dados } = useContext(DataInfor);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Detecta se deve usar visualização mobile
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
      `Tem certeza de que deseja excluir ${selectedItems.length} ${
        selectedItems.length > 1 ? "itens" : "item"
      }?`
    );

    if (confirmation) {
      try {
        await Promise.all(
          selectedItems.map(async (id) => {
            await axios.delete(
              `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`
            );
          })
        );
        setShowAlert({
          type: "success",
          message: "Itens excluídos com sucesso!",
        });
        setSelectedItems([]);
        setSelectAll(false);
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        console.error("Erro ao excluir itens:", error);
        setShowAlert({
          type: "danger",
          message:
            "Erro ao excluir itens. Verifique o console para mais detalhes.",
        });
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
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const closeAlert = () => {
    setShowAlert(null);
  };

  return (
    <div
      className="dashboard-fixed-wrapper"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* HEADER PADRONIZADO */}
      <header className="dashboard-sticky-header" style={{ flexShrink: 0 }}>
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col md={7}>
              <h2 className="fw-bold text-light mb-0">Gestão de Membros</h2>
            </Col>
            <Col
              md={5}
              className="text-end d-flex justify-content-end align-items-center gap-3"
            >
              <Badge bg="success" className="rounded-pill px-3 py-2">
                Online
              </Badge>
              <small className="text-muted-custom d-none d-md-inline">
                {new Date().toLocaleDateString("pt-BR")}
              </small>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ÁREA DE CONTEÚDO COM SCROLL ÚNICO */}
      <main
        className="dashboard-scroll-content"
        style={{ flex: 1, overflowY: "auto", paddingBottom: "2rem" }}
      >
        <Container fluid className="mt-4">
          {/* CARDS DE ESTATÍSTICAS (Padrão Horizontal) */}
          <Row className="g-3 mb-4">
            {[
              {
                label: "Total Membros",
                val: dados.length,
                icon: faUsers,
                color: "text-primary",
              },
              {
                label: "Filtrados",
                val: filteredDados.length,
                icon: faFilter,
                color: "text-info",
              },
              {
                label: "Selecionados",
                val: selectedItems.length,
                icon: faUserTag,
                color: "text-warning",
              },
              {
                label: "Batizados",
                val: dados.filter((d) => d.databatismo).length,
                icon: faCheckCircle,
                color: "text-success",
              },
            ].map((item, idx) => (
              <Col md={3} key={idx}>
                <Card className="chart-premium-card p-3 border-0 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div
                      className="p-3 rounded-circle bg-opacity-10 bg-primary me-3 d-flex align-items-center justify-content-center"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={item.color}
                        size="lg"
                      />
                    </div>
                    <div>
                      <p className="text-muted small mb-0 text-uppercase fw-semibold">
                        {item.label}
                      </p>
                      <h4 className="fw-bold mb-0 text-light">{item.val}</h4>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* SEÇÃO DE BUSCA E AÇÕES */}
          <Card className="chart-premium-card p-4 mb-4 border-0">
            {showAlert && (
              <Alert
                variant={showAlert.type}
                dismissible
                onClose={closeAlert}
                className="shadow-sm border-custom mb-4"
              >
                <i className={`bi bi-info-circle me-2`}></i>
                {showAlert.message}
              </Alert>
            )}

            <Row className="g-3 align-items-end">
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fw-semibold small text-uppercase text-muted mb-2">
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    Buscar na base de dados
                  </Form.Label>
                  <InputGroup className="rounded-pill overflow-hidden border-custom shadow-sm">
                    <InputGroup.Text className="bg-tertiary-custom border-0 text-muted">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Nome, email, profissão..."
                      className="bg-tertiary-custom border-0 text-light shadow-none"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={3}>
                <div className="pb-2">
                  <Form.Check
                    type="checkbox"
                    id="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    label={`Selecionar todos`}
                    className="text-muted small fw-semibold"
                  />
                </div>
              </Col>

              <Col md={4} className="text-end">
                <div className="d-flex gap-2 justify-content-md-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleDeleteItems}
                    disabled={selectedItems.length === 0}
                    className="rounded-pill px-3"
                  >
                    <i className="bi bi-trash me-2"></i> Excluir
                  </Button>

                  <CSVLink
                    data={dados}
                    filename={`Membros_${formatDateToExport()}`}
                    className="btn btn-sm btn-outline-success rounded-pill px-3 text-decoration-none d-flex align-items-center"
                  >
                    <FontAwesomeIcon icon={faDownload} className="me-2" />{" "}
                    Exportar CSV
                  </CSVLink>
                </div>
              </Col>
            </Row>
          </Card>

          {/* TABELA PREMIUM */}
          <Card className="chart-premium-card border-0 overflow-hidden">
            <div className="p-3 bg-tertiary-custom border-bottom border-custom d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-light">Registros de Membros</h6>
              {isMobileView && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setIsMobileView(!isMobileView)}
                  className="text-light"
                >
                  <i
                    className={`bi ${isMobileView ? "bi-table" : "bi-grid"}`}
                  ></i>
                </Button>
              )}
            </div>

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
                <Table hover size="sm" className="mb-0 align-middle text-light">
                  <thead className="bg-tertiary-custom text-muted small text-uppercase">
                    <tr>
                      <th
                        className="py-3 text-center"
                        style={{ width: "50px" }}
                      >
                        #
                      </th>
                      <th className="py-3 text-center">Ver</th>
                      <th className="py-3">ID</th>
                      <th className="py-3">Nome Completo</th>
                      <th className="py-3 d-none d-md-table-cell">Email</th>
                      <th className="py-3 d-none d-lg-table-cell">Telefone</th>
                      <th className="py-3 d-none d-xl-table-cell">Cidade</th>
                      <th className="py-3 d-none d-xl-table-cell">
                        Status Batismo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {filteredDados.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-5 text-muted">
                          Nenhum registro encontrado para "{searchTerm}"
                        </td>
                      </tr>
                    ) : (
                      filteredDados.map((dado) => (
                        <tr key={dado._id} className="border-custom-bottom">
                          <td className="text-center">
                            <Form.Check
                              type="checkbox"
                              checked={selectedItems.includes(dado._id)}
                              onChange={(event) =>
                                handleCheckboxChange(event, dado._id)
                              }
                            />
                          </td>
                          <td className="text-center">
                            <Button
                              as={Link}
                              to={`/membro/${dado._id}`}
                              variant="link"
                              className="text-primary p-0"
                            >
                              <i className="bi bi-eye-fill"></i>
                            </Button>
                          </td>
                          <td className="small opacity-75">
                            {dado._id.slice(-6)}
                          </td>
                          <td className="fw-semibold">{dado.name}</td>
                          <td className="d-none d-md-table-cell small opacity-75">
                            {dado.email}
                          </td>
                          <td className="d-none d-lg-table-cell small">
                            {dado.telone}
                          </td>
                          <td className="d-none d-xl-table-cell small">
                            {dado.city}
                          </td>
                          <td className="d-none d-xl-table-cell">
                            {dado.databatismo ? (
                              <Badge bg="success" className="fw-normal">
                                Batizado
                              </Badge>
                            ) : (
                              <Badge
                                bg="secondary"
                                className="fw-normal opacity-50"
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
      <footer
        className="footer-section py-2 bg-tertiary-custom border-top border-custom"
        style={{ flexShrink: 0 }}
      >
        <Container fluid>
          <Row className="small text-muted">
            <Col md={6} className="text-center text-md-start">
              © 2025 Sistema de Gestão Premium
            </Col>
            <Col md={6} className="text-center text-md-end">
              v1.0.0 | Suporte JC Tech
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Membros;
