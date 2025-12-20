import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Alert,
  Spinner,
  Breadcrumb,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faPhone,
  faEnvelope,
  faUsers,
  faChurch,
  faSave,
  faArrowLeft,
  faCalendarAlt,
  faMapMarkerAlt,
  faBriefcase,
  faHeart,
  faEdit,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { IMaskInput } from "react-imask";
import axios from "axios";

const MembroMinisterio = () => {
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`
        );
        setMember(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showAlertMessage("Erro ao carregar dados do membro.", "danger");
        setLoading(false);
      }
    };
    fetchDados();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const showAlertMessage = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(
        `https://api-gestao-igreja.onrender.com/membros/${id}`,
        member
      );
      showAlertMessage("Dados salvos com sucesso!", "success");
      setIsEditing(false);
      setSaving(false);
    } catch (error) {
      console.error(error);
      showAlertMessage("Erro ao salvar os dados.", "danger");
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="content-container d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h5 className="text-muted-custom">Carregando dados do membro...</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="content-container">
        {/* Navbar Section - 10% da altura */}
        <nav className="navbar-section">
          <Container
            fluid
            className="h-100 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <div>
                <h1 className="h3 mb-1 text-primary-custom fw-bold">
                  <FontAwesomeIcon icon={faUserCheck} className="me-2" />
                  Membro do Ministério
                </h1>
                <p className="text-muted-custom mb-0">
                  Visualizar e editar informações detalhadas do membro
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate("/membros")}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                Voltar
              </Button>
              <Button
                variant={isEditing ? "success" : "primary"}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={saving}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon
                  icon={isEditing ? faSave : faEdit}
                  className="me-1"
                />
                {saving ? "Salvando..." : isEditing ? "Salvar" : "Editar"}
              </Button>
            </div>
          </Container>
        </nav>

        {/* Form Section - 35% da altura (para breadcrumb, alertas e informações básicas) */}
        <section className="form-section">
          <Container fluid className="h-100 d-flex flex-column">
            {/* Breadcrumb */}
            <Row className="mb-3 flex-shrink-0">
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item
                    onClick={() => navigate("/dashboard")}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faHome} className="me-1" />
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    onClick={() => navigate("/membros")}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faUsers} className="me-1" />
                    Membros
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    {member.name || "Detalhes do Membro"}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>

            {/* Alertas */}
            {showAlert && (
              <Row className="mb-3 flex-shrink-0">
                <Col>
                  <Alert
                    variant={alertType}
                    dismissible
                    onClose={() => setShowAlert(false)}
                  >
                    {alertMessage}
                  </Alert>
                </Col>
              </Row>
            )}

            {/* Informações de Identificação */}
            <Row className="flex-grow-1 overflow-auto">
              <Col md={6} className="mb-3">
                <Card className="border-0 shadow-custom-sm h-100">
                  <Card.Body className="p-3">
                    <h6 className="text-muted-custom mb-2">Identificação</h6>
                    <div className="d-flex justify-content-between">
                      <div>
                        <small className="text-muted-custom">Matrícula:</small>
                        <p className="mb-0 fw-semibold">
                          <code className="text-primary-custom">
                            {member._id}
                          </code>
                        </p>
                      </div>
                      <div>
                        <small className="text-muted-custom">
                          Data de Criação:
                        </small>
                        <p className="mb-0 fw-semibold">
                          {formatDate(member.datacriacao)}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card className="border-0 shadow-custom-sm h-100">
                  <Card.Body className="p-3">
                    <h6 className="text-muted-custom mb-2">Status</h6>
                    <div className="d-flex align-items-center">
                      <Badge
                        bg={
                          member.cad === true || member.cad === "true"
                            ? "success"
                            : "secondary"
                        }
                        className="me-2"
                      >
                        {member.cad === true || member.cad === "true"
                          ? "Ativo"
                          : "Inativo"}
                      </Badge>
                      <small className="text-muted-custom">
                        Membro{" "}
                        {member.cad === true || member.cad === "true"
                          ? "ativo"
                          : "inativo"}{" "}
                        no sistema
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Table Section - 40% da altura (para formulários detalhados) */}
        <section className="scrollable-content-section">
          <Container fluid className="h-100 overflow-y-auto">
            {/* Dados Pessoais */}
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-custom">
                  <Card.Header className="bg-secondary-custom border-0">
                    <h5 className="mb-0 fw-semibold">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Dados Pessoais
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Nome Completo
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={member.name || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Nome da Mãe
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="mothersname"
                            value={member.mothersname || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Nome do Pai
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="fathersname"
                            value={member.fathersname || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="me-1"
                            />
                            Data de Nascimento
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="dateBirth"
                            value={member.dateBirth || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">Sexo</Form.Label>
                          <Form.Select
                            name="sex"
                            value={member.sex || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="">Selecione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FontAwesomeIcon icon={faPhone} className="me-1" />
                            Celular
                          </Form.Label>
                          <Form.Control
                            as={IMaskInput}
                            mask="(00) 00000-0000"
                            type="tel"
                            name="telone"
                            value={member.telone || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Telefone 2
                          </Form.Label>
                          <Form.Control
                            as={IMaskInput}
                            mask="(00) 00000-0000"
                            type="tel"
                            name="teltwo"
                            value={member.teltwo || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="me-1"
                            />
                            E-mail
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={member.email || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Nacionalidade
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="national"
                            value={member.national || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Naturalidade
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="natural"
                            value={member.natural || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FontAwesomeIcon
                              icon={faBriefcase}
                              className="me-1"
                            />
                            Profissão
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="profession"
                            value={member.profession || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Empresa
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="companywork"
                            value={member.companywork || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Endereço */}
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-custom">
                  <Card.Header className="bg-secondary-custom border-0">
                    <h5 className="mb-0 fw-semibold">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                      Endereço
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row>
                      <Col md={3} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">CEP</Form.Label>
                          <Form.Control
                            as={IMaskInput}
                            mask="00000-000"
                            type="text"
                            name="cep"
                            value={member.cep || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Endereço
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={member.address || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Número
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="number"
                            value={member.number || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Complemento
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="complement"
                            value={member.complement || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Bairro
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="district"
                            value={member.district || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Cidade
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={member.city || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Estado
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={member.state || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Tempo de Residência
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="timeinresidence"
                            value={member.timeinresidence || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Dados Familiares */}
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-custom">
                  <Card.Header className="bg-secondary-custom border-0">
                    <h5 className="mb-0 fw-semibold">
                      <FontAwesomeIcon icon={faHeart} className="me-2" />
                      Dados Familiares
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Estado Civil
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="estadocivil"
                            value={member.estadocivil || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Cônjuge
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="conjuge"
                            value={member.conjuge || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Possui Filhos?
                          </Form.Label>
                          <Form.Select
                            name="filhos"
                            value={member.filhos || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="">Selecione...</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Quantidade
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="qtdfilhos"
                            value={member.qtdfilhos || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                            min="0"
                            max="10"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Dados dos Filhos */}
                    {[1, 2, 3, 4].map((num) => (
                      <Row key={num} className="mb-3">
                        <Col md={8}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">
                              Nome do Filho {num}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name={`nomefilho${
                                num === 1
                                  ? "um"
                                  : num === 2
                                  ? "dois"
                                  : num === 3
                                  ? "tres"
                                  : "quatro"
                              }`}
                              value={
                                member[
                                  `nomefilho${
                                    num === 1
                                      ? "um"
                                      : num === 2
                                      ? "dois"
                                      : num === 3
                                      ? "tres"
                                      : "quatro"
                                  }`
                                ] || ""
                              }
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="border-custom"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">
                              Idade
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name={`idadefilho${
                                num === 1
                                  ? "um"
                                  : num === 2
                                  ? "dois"
                                  : num === 3
                                  ? "tres"
                                  : "quatro"
                              }`}
                              value={
                                member[
                                  `idadefilho${
                                    num === 1
                                      ? "um"
                                      : num === 2
                                      ? "dois"
                                      : num === 3
                                      ? "tres"
                                      : "quatro"
                                  }`
                                ] || ""
                              }
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="border-custom"
                              min="0"
                              max="100"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    ))}

                    <Row>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Primeiro Casamento?
                          </Form.Label>
                          <Form.Select
                            name="optionprimeirocasamento"
                            value={member.optionprimeirocasamento || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="">Selecione...</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Casamento Cristão?
                          </Form.Label>
                          <Form.Select
                            name="casamentocristao"
                            value={member.casamentocristao || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="">Selecione...</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Vão Congregar Juntos?
                          </Form.Label>
                          <Form.Select
                            name="parceironaigreja"
                            value={member.parceironaigreja || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          >
                            <option value="">Selecione...</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Justificativa
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="justificativa"
                            value={member.justificativa || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Dados do Ministério */}
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-custom">
                  <Card.Header className="bg-secondary-custom border-0">
                    <h5 className="mb-0 fw-semibold">
                      <FontAwesomeIcon icon={faChurch} className="me-2" />
                      Dados do Ministério
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Data de Batismo
                          </Form.Label>
                          <Form.Control
                            as={IMaskInput}
                            mask="00/00/0000"
                            type="text"
                            name="databatismo"
                            value={member.databatismo || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Data de Conversão
                          </Form.Label>
                          <Form.Control
                            as={IMaskInput}
                            mask="00/00/0000"
                            type="text"
                            name="dataconversao"
                            value={member.dataconversao || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Cargo na Igreja
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="jobChurch"
                            value={member.jobChurch || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Última Congregação
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="lastchurch"
                            value={member.lastchurch || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Motivo da Saída
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="motivosaida"
                            value={member.motivosaida || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Igrejas das Quais Foi Membro
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="igrejasquefoimembro"
                            value={member.igrejasquefoimembro || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Perguntas de Sim/Não */}
                    <Row>
                      {[
                        { name: "dizimista", label: "É Dizimista?" },
                        { name: "ofertante", label: "É Ofertante?" },
                        {
                          name: "discipulo",
                          label: "Entende ser um Bom Discípulo?",
                        },
                        {
                          name: "participacaocultos",
                          label: "Participante Efetivo de Cultos?",
                        },
                        {
                          name: "habito",
                          label: "Tem Hábito de Informar Ausências?",
                        },
                        {
                          name: "cultosdeoracao",
                          label: "Participante dos Cultos de Oração?",
                        },
                        {
                          name: "aconselhamentopastoral",
                          label: "Procura Conselhos Pastorais?",
                        },
                        {
                          name: "evangelizar",
                          label: "Tem Hábito de Evangelizar?",
                        },
                        { name: "jejuar", label: "Tem Hábito de Jejuar?" },
                        {
                          name: "leiturabiblica",
                          label: "Faz Leitura Bíblica?",
                        },
                      ].map((field, index) => (
                        <Col md={6} key={index} className="mb-3">
                          <Form.Group>
                            <Form.Label className="fw-semibold">
                              {field.label}
                            </Form.Label>
                            <Form.Select
                              name={field.name}
                              value={member[field.name] || ""}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="border-custom"
                            >
                              <option value="">Selecione...</option>
                              <option value="Sim">Sim</option>
                              <option value="Não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>

                    {/* Campos de Texto Longos */}
                    <Row>
                      {[
                        {
                          name: "definicaoevangelho",
                          label: "Definição do Evangelho",
                        },
                        { name: "frutosespirito", label: "Frutos do Espírito" },
                        {
                          name: "desenvolvimentodafe",
                          label: "Cuidados da Fé",
                        },
                        { name: "pecado", label: "Lutas Pessoais" },
                        {
                          name: "conviccaoteologica",
                          label: "Convicções Teológicas",
                        },
                        { name: "livros", label: "Livros Lidos" },
                      ].map((field, index) => (
                        <Col md={6} key={index} className="mb-3">
                          <Form.Group>
                            <Form.Label className="fw-semibold">
                              {field.label}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name={field.name}
                              value={member[field.name] || ""}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="border-custom"
                            />
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>

                    <Row>
                      <Col md={12} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Últimas Considerações
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="ultimasconsideracoes"
                            value={member.ultimasconsideracoes || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="border-custom"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default MembroMinisterio;
