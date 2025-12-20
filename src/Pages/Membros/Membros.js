import React, { useContext, useState, useEffect } from "react";
import MobileCardsView from "./MobileCardsView";
import DataInfor from "../../Contexts/DataInfor";
import { Link } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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

  // Função para verificar se um valor é string e convertê-lo para lowercase
  const toLowerSafe = (value) =>
    typeof value === "string" ? value.toLowerCase() : "";

  // Busca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectAll(false); // Desmarca o "Selecionar Todos" ao alterar a busca
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

  // Excluir
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
        // Recarregar dados ou atualizar estado local
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

  // Exportar CSV
  const formatDateToExport = () => {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para fechar alerta
  const closeAlert = () => {
    setShowAlert(null);
  };

  return (
    <div className="main-wrapper">
      {/* Sidebar Responsiva */}

      {/* Container Principal de Conteúdo */}
      <div className="content-container">
        {/* BARRA DE NAVEGAÇÃO - 10% */}
        <nav className="navbar-section">
          <Container fluid className="d-flex align-items-center">
            <div className="d-flex align-items-center me-auto">
              <h5 className="mb-0 text-primary-custom fw-bold me-3">
                👥 Gestão de Membros
              </h5>
              <Badge bg="info" className="d-none d-md-inline">
                {filteredDados.length} membros
              </Badge>
            </div>

            <div className="d-flex align-items-center gap-2">
              <small className="text-muted-custom d-none d-lg-inline">
                {new Date().toLocaleDateString("pt-BR")}
              </small>
              <Badge bg="success" className="d-none d-sm-inline">
                Online
              </Badge>
            </div>
          </Container>
        </nav>

        {/* SEÇÃO DE CONTROLES E BUSCA - 35% */}
        <section className="form-section-membros">
          <Container fluid>
            <div className="form-container">
              {/* Header da seção */}
              <Row className="mb-3">
                <Col xs={12}>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <h6 className="mb-1 text-primary-custom fw-semibold">
                        <i className="bi bi-search me-2"></i>
                        Busca e Controles
                      </h6>
                      <p className="text-muted-custom mb-0 small">
                        Pesquise, selecione e gerencie os membros cadastrados
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Alerta */}
              {showAlert && (
                <Row className="mb-3">
                  <Col>
                    <Alert
                      variant={showAlert.type}
                      dismissible
                      onClose={closeAlert}
                      className="shadow-custom-sm border-custom"
                    >
                      <Alert.Heading className="h6">
                        <i
                          className={`bi ${
                            showAlert.type === "success"
                              ? "bi-check-circle"
                              : showAlert.type === "warning"
                              ? "bi-exclamation-triangle"
                              : "bi-x-circle"
                          } me-2`}
                        ></i>
                        {showAlert.type === "success"
                          ? "Sucesso"
                          : showAlert.type === "warning"
                          ? "Atenção"
                          : "Erro"}
                      </Alert.Heading>
                      <p className="mb-0 small">{showAlert.message}</p>
                    </Alert>
                  </Col>
                </Row>
              )}

              {/* Controles principais */}
              <Row className="g-3 mb-4">
                {/* Campo de busca */}
                <Col xs={12} md={6} lg={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                      <i className="bi bi-search me-1"></i>
                      Buscar membros
                    </Form.Label>
                    <InputGroup size="sm" className="shadow-custom-sm">
                      <InputGroup.Text className="bg-tertiary-custom border-custom">
                        <i className="bi bi-search text-primary-custom"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Nome, email, profissão..."
                        className="border-custom"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                {/* Seleção */}
                <Col xs={12} md={6} lg={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                      <i className="bi bi-check-square me-1"></i>
                      Seleção
                    </Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        id="selectAll"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                        label={`Selecionar todos (${selectedItems.length})`}
                        className="text-secondary-custom small"
                      />
                    </div>
                  </Form.Group>
                </Col>

                {/* Ações */}
                <Col xs={12} lg={4}>
                  <Form.Label className="fw-semibold small text-uppercase text-secondary-custom mb-1">
                    <i className="bi bi-gear me-1"></i>
                    Ações
                  </Form.Label>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleDeleteItems}
                      disabled={selectedItems.length === 0}
                      className="flex-fill"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Excluir ({selectedItems.length})
                    </Button>

                    <Button
                      variant="outline-success"
                      size="sm"
                      className="flex-fill"
                    >
                      <CSVLink
                        data={dados}
                        target="_blank"
                        filename={`Membros_${formatDateToExport()}`}
                        className="text-decoration-none text-success d-flex align-items-center justify-content-center"
                      >
                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                        Exportar CSV
                      </CSVLink>
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* Estatísticas rápidas */}
              <Row className="g-3">
                <Col xs={6} md={3}>
                  <Card className="text-center border-custom shadow-custom-sm">
                    <Card.Body className="py-2">
                      <h6 className="text-primary-custom mb-0">
                        {dados.length}
                      </h6>
                      <small className="text-muted-custom">Total</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={3}>
                  <Card className="text-center border-custom shadow-custom-sm">
                    <Card.Body className="py-2">
                      <h6 className="text-info mb-0">{filteredDados.length}</h6>
                      <small className="text-muted-custom">Filtrados</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={3}>
                  <Card className="text-center border-custom shadow-custom-sm">
                    <Card.Body className="py-2">
                      <h6 className="text-warning mb-0">
                        {selectedItems.length}
                      </h6>
                      <small className="text-muted-custom">Selecionados</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={3}>
                  <Card className="text-center border-custom shadow-custom-sm">
                    <Card.Body className="py-2">
                      <h6 className="text-success mb-0">
                        {dados.filter((d) => d.databatismo).length}
                      </h6>
                      <small className="text-muted-custom">Batizados</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </section>

        {/* SEÇÃO DA TABELA - 40% */}
        <section className="table-section-membros">
          <Container fluid className="h-100">
            <div className="table-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold text-primary-custom">
                  <i className="bi bi-table me-2"></i>
                  Lista de Membros
                </h6>
                <div className="d-flex align-items-center gap-2">
                  <Badge
                    bg="light"
                    text="dark"
                    className="fs-6 px-2 py-1 shadow-custom-sm"
                    style={{
                      backgroundColor: "var(--custom-accent-secondary)",
                      color: "white",
                    }}
                  >
                    <i className="bi bi-list-ol me-1"></i>
                    {filteredDados.length} registros
                  </Badge>
                  {searchTerm && (
                    <Badge bg="info" className="small">
                      Filtro: "{searchTerm}"
                    </Badge>
                  )}
                  {isMobileView && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setIsMobileView(!isMobileView)}
                      title="Alternar visualização"
                    >
                      <i
                        className={`bi ${
                          isMobileView ? "bi-table" : "bi-grid-3x3-gap"
                        }`}
                      ></i>
                    </Button>
                  )}
                </div>
              </div>

              {/* Visualização condicional: Tabela ou Cards */}
              {isMobileView ? (
                <MobileCardsView
                  filteredDados={filteredDados}
                  selectedItems={selectedItems}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ) : (
                <div className="table-responsive">
                  <Table
                    striped
                    hover
                    size="sm"
                    className="mb-0 align-middle border-custom"
                  >
                    <thead
                      className="sticky-top"
                      style={{
                        backgroundColor: "var(--custom-bg-tertiary)",
                        borderColor: "var(--custom-border-color)",
                      }}
                    >
                      <tr>
                        <th
                          className="text-center border-custom"
                          style={{ width: "40px" }}
                        >
                          <Form.Check
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            size="sm"
                          />
                        </th>
                        <th
                          className="text-center border-custom"
                          style={{ width: "80px" }}
                        >
                          <i className="bi bi-eye me-1"></i>
                          Ações
                        </th>
                        <th className="text-nowrap border-custom">
                          <i className="bi bi-hash me-1"></i>
                          ID
                        </th>
                        <th className="text-nowrap border-custom">
                          <i className="bi bi-calendar me-1"></i>
                          Inscrição
                        </th>
                        <th className="text-nowrap border-custom">
                          <i className="bi bi-person me-1"></i>
                          Nome Completo
                        </th>
                        <th className="text-nowrap border-custom d-none d-md-table-cell">
                          <i className="bi bi-envelope me-1"></i>
                          Email
                        </th>
                        <th className="text-nowrap border-custom d-none d-lg-table-cell">
                          <i className="bi bi-telephone me-1"></i>
                          Telefone
                        </th>
                        <th className="text-nowrap border-custom d-none d-lg-table-cell">
                          <i className="bi bi-calendar-date me-1"></i>
                          Nascimento
                        </th>
                        <th className="text-nowrap border-custom d-none d-xl-table-cell">
                          <i className="bi bi-briefcase me-1"></i>
                          Profissão
                        </th>
                        <th className="text-nowrap border-custom d-none d-xl-table-cell">
                          <i className="bi bi-geo-alt me-1"></i>
                          Cidade
                        </th>
                        <th className="text-nowrap border-custom d-none d-xl-table-cell">
                          <i className="bi bi-droplet me-1"></i>
                          Batismo
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{ backgroundColor: "var(--custom-bg-secondary)" }}
                    >
                      {filteredDados.length === 0 ? (
                        <tr>
                          <td
                            colSpan="11"
                            className="text-center py-4 border-custom"
                          >
                            <div className="text-muted-custom">
                              <i className="bi bi-inbox display-6 d-block mb-2 opacity-50"></i>
                              <h6 className="text-secondary-custom">
                                Nenhum membro encontrado
                              </h6>
                              <p className="small mb-0">
                                {searchTerm
                                  ? "Tente ajustar os filtros de busca"
                                  : "Nenhum membro cadastrado ainda"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredDados.map((dado) => (
                          <tr key={dado._id} className="border-custom">
                            <td className="text-center border-custom">
                              <Form.Check
                                type="checkbox"
                                checked={selectedItems.includes(dado._id)}
                                onChange={(event) =>
                                  handleCheckboxChange(event, dado._id)
                                }
                                size="sm"
                              />
                            </td>

                            <td className="text-center border-custom">
                              <Button
                                as={Link}
                                to={`/membro/${dado._id}`}
                                variant="outline-primary"
                                size="sm"
                                className="text-decoration-none"
                                title="Ver detalhes"
                              >
                                <i className="bi bi-eye"></i>
                              </Button>
                            </td>

                            <td className="text-nowrap fw-medium border-custom text-secondary-custom small">
                              {dado._id.slice(-6)}
                            </td>

                            <td className="text-nowrap border-custom text-secondary-custom small">
                              {dado.datacriacao}
                            </td>

                            <td className="border-custom">
                              <div>
                                <div className="fw-medium text-primary-custom">
                                  {dado.name}
                                </div>
                                <small className="text-muted-custom d-md-none">
                                  {dado.email}
                                </small>
                              </div>
                            </td>

                            <td className="border-custom d-none d-md-table-cell">
                              <small className="text-secondary-custom">
                                {dado.email}
                              </small>
                            </td>

                            <td className="border-custom d-none d-lg-table-cell">
                              <small className="text-secondary-custom">
                                {dado.telone}
                              </small>
                            </td>

                            <td className="border-custom d-none d-lg-table-cell">
                              <small className="text-secondary-custom">
                                {dado.dateBirth}
                              </small>
                            </td>

                            <td className="border-custom d-none d-xl-table-cell">
                              <small className="text-secondary-custom">
                                {dado.profession}
                              </small>
                            </td>

                            <td className="border-custom d-none d-xl-table-cell">
                              <small className="text-secondary-custom">
                                {dado.city}
                              </small>
                            </td>

                            <td className="border-custom d-none d-xl-table-cell">
                              {dado.databatismo ? (
                                <Badge bg="success" className="small">
                                  <i className="bi bi-check-circle me-1"></i>
                                  {dado.databatismo}
                                </Badge>
                              ) : (
                                <Badge bg="secondary" className="small">
                                  <i className="bi bi-clock me-1"></i>
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
            </div>
          </Container>
        </section>

        {/* FOOTER - 5% */}
        <footer className="footer-section">
          <Container fluid>
            <Row className="w-100 align-items-center">
              <Col xs={12} md={6} className="text-center text-md-start">
                <small>
                  © 2024 Sistema de Gestão de Membros - Todos os direitos
                  reservados
                </small>
              </Col>
              <Col xs={12} md={6} className="text-center text-md-end">
                <small>
                  Versão 1.0.0 |
                  <a href="#suporte" className="text-light ms-1">
                    Suporte
                  </a>{" "}
                  |
                  <a href="#contato" className="text-light ms-1">
                    Contato
                  </a>
                </small>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default Membros;
