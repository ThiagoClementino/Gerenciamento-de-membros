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
  faIdCard,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IMaskInput } from "react-imask";
import axios from "axios";

const MemMinisterio = () => {
  // --- LÓGICA ORIGINAL PRESERVADA ---
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isEditing, setIsEditing] = useState(false);
  const [theme] = useState("dark"); // Segue o padrão do Dashboard
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    const fetchDados = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`,
        );
        const dados = Array.isArray(response.data)
          ? response.data[0] || {}
          : response.data;
        setMember(dados);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showAlertMessage("Erro ao carregar dados do membro.", "danger");
        setLoading(false);
      }
    };
    fetchDados();
  }, [id, theme]);

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
        `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`,
        member,
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
      // Já no formato brasileiro (dd/mm/aaaa): mantém como está
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return dateString;
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-body">
        <Spinner animation="border" variant="primary" />
        <h5 className="mt-3 text-secondary animate-pulse">
          Carregando Perfil...
        </h5>
      </div>
    );
  }

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden bg-body">
      {/* HEADER FIXO - PADRÃO PREMIUM */}
      <header className="py-3 px-4 border-bottom bg-body-tertiary shadow-sm z-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                  <FontAwesomeIcon
                    icon={faUserCheck}
                    className="text-primary fs-4"
                  />
                </div>
                <div>
                  <h2 className="h4 fw-bold mb-0">
                    {member.name || "Perfil do Membro"}
                  </h2>
                  <Breadcrumb
                    className="mb-0 small"
                    style={{ "--bs-breadcrumb-divider": "'>'" }}
                  >
                    <Breadcrumb.Item
                      onClick={() => navigate("/dashboard")}
                      className="text-decoration-none"
                      style={{ cursor: "pointer" }}
                    >
                      Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      onClick={() => navigate("/membros")}
                      style={{ cursor: "pointer" }}
                    >
                      Membros
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active className="text-primary opacity-75">
                      Detalhes
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-end d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                className="rounded-pill px-3 border"
                onClick={() => navigate("/membros")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Voltar
              </Button>
              <Button
                variant={isEditing ? "success" : "primary"}
                size="sm"
                className="rounded-pill px-4 shadow-sm fw-bold"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={saving}
              >
                <FontAwesomeIcon
                  icon={isEditing ? faSave : faEdit}
                  className="me-2"
                />
                {saving
                  ? "Salvando..."
                  : isEditing
                    ? "Salvar Alterações"
                    : "Editar Perfil"}
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* CONTEÚDO SCROLLÁVEL */}
      <main className="flex-grow-1 overflow-auto p-4">
        <Container fluid>
          {showAlert && (
            <Alert
              variant={alertType}
              dismissible
              onClose={() => setShowAlert(false)}
              className="border-0 shadow-sm rounded-4 mb-4"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="me-2" />{" "}
              {alertMessage}
            </Alert>
          )}

          {/* CARDS DE STATUS RÁPIDO */}
          <Row className="g-3 mb-4">
            <Col md={6}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="bg-body p-3 rounded-circle border me-3">
                    <FontAwesomeIcon icon={faIdCard} className="text-primary" />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Matrícula
                    </p>
                    <code className="h6 fw-bold text-primary mb-0">
                      {member._id}
                    </code>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="bg-body p-3 rounded-circle border me-3">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-info"
                    />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Membro desde
                    </p>
                    <h6 className="fw-bold mb-0">
                      {formatDate(member.datacriacao)}
                    </h6>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="bg-body p-3 rounded-circle border me-3">
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      className={(member.cadAtivo ?? member.cad) ? "text-success" : "text-danger"}
                    />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Status
                    </p>
                    <Badge
                      bg={(member.cadAtivo ?? member.cad) ? "success-subtle" : "secondary-subtle"}
                      className={
                        (member.cadAtivo ?? member.cad)
                          ? "text-success border border-success-subtle"
                          : "text-secondary border border-secondary-subtle"
                      }
                    >
                      {(member.cadAtivo ?? member.cad) ? "Ativo no Sistema" : "Inativo"}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* FORMULÁRIO DIVIDIDO EM CARDS TEMÁTICOS */}
          <Row className="g-4">
            {/* Bloco 1: Pessoais */}
            <Col md={12}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden">
                <Card.Header className="bg-body-secondary py-3 px-4 border-0">
                  <h5 className="mb-0 h6 fw-bold">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="me-2 text-primary"
                    />{" "}
                    DADOS PESSOAIS
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <InputField
                      label="Nome Completo"
                      name="name"
                      value={member.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Nome da Mãe"
                      name="mothersname"
                      value={member.mothersname}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Nome do Pai"
                      name="fathersname"
                      value={member.fathersname}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Nascimento"
                      name="dateBirth"
                      value={member.dateBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                      icon={faCalendarAlt}
                    />
                    <Col md={3}>
                      <Form.Label className="small fw-bold text-secondary">
                        SEXO
                      </Form.Label>
                      <Form.Select
                        className="bg-body border shadow-none"
                        name="sex"
                        value={member.sex || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      >
                        <option value="">Selecione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </Form.Select>
                    </Col>
                    <InputField
                      label="Celular Principal"
                      name="telone"
                      value={member.telone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                      mask="(00) 00000-0000"
                    />
                    <InputField
                      label="Telefone Secundário"
                      name="teltwo"
                      value={member.teltwo}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                      mask="(00) 00000-0000"
                    />
                    <InputField
                      label="E-mail"
                      name="email"
                      value={member.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                      icon={faEnvelope}
                    />
                    <InputField
                      label="Nacionalidade"
                      name="national"
                      value={member.national}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Naturalidade"
                      name="natural"
                      value={member.natural}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Profissão"
                      name="profession"
                      value={member.profession}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                      icon={faBriefcase}
                    />
                    <InputField
                      label="Empresa/Local Trabalho"
                      name="companywork"
                      value={member.companywork}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Escolaridade"
                      name="education"
                      value={member.education}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                    />
                    <InputField
                      label="Estado Civil"
                      name="estadocivil"
                      value={member.estadocivil}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                      icon={faHeart}
                    />
                    <YesNoField
                      label="POSSUI FILHOS?"
                      name="filhos"
                      value={member.filhos}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={2}
                    />
                    <InputField
                      label="Qtd. de Filhos"
                      name="qtdfilhos"
                      value={member.qtdfilhos}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={2}
                      icon={faUsers}
                    />
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Bloco 2: Endereço */}
            <Col md={12}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden">
                <Card.Header className="bg-body-secondary py-3 px-4 border-0">
                  <h5 className="mb-0 h6 fw-bold">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="me-2 text-primary"
                    />{" "}
                    LOCALIZAÇÃO
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <InputField
                      label="CEP"
                      name="cep"
                      value={member.cep}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={2}
                      mask="00000-000"
                    />
                    <InputField
                      label="Logradouro"
                      name="address"
                      value={member.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={7}
                    />
                    <InputField
                      label="Nº"
                      name="number"
                      value={member.number}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Complemento"
                      name="complement"
                      value={member.complement}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Bairro"
                      name="district"
                      value={member.district}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Cidade"
                      name="city"
                      value={member.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={2}
                    />
                    <InputField
                      label="Estado (UF)"
                      name="state"
                      value={member.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={2}
                    />
                    <InputField
                      label="Tempo de Residência (anos)"
                      name="timeinresidence"
                      value={member.timeinresidence}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={2}
                      icon={faHome}
                    />
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Bloco 3: Ministério */}
            <Col md={12}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden mb-5">
                <Card.Header className="bg-body-secondary py-3 px-4 border-0">
                  <h5 className="mb-0 h6 fw-bold">
                    <FontAwesomeIcon
                      icon={faChurch}
                      className="me-2 text-primary"
                    />{" "}
                    DADOS ECLESIÁSTICOS
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <InputField
                      label="Batismo"
                      name="databatismo"
                      value={member.databatismo}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                      mask="00/00/0000"
                    />
                    <InputField
                      label="Conversão"
                      name="dataconversao"
                      value={member.dataconversao}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                      mask="00/00/0000"
                    />
                    <InputField
                      label="Cargo Ministerial"
                      name="jobChurch"
                      value={member.jobChurch}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                    />

                    <Col md={12} className="mt-4">
                      <h6 className="small fw-bold text-primary text-uppercase border-bottom pb-2 mb-3">
                        Histórico Eclesiástico
                      </h6>
                    </Col>

                    <InputField
                      label="Última Igreja"
                      name="lastchurch"
                      value={member.lastchurch}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                    />
                    <InputField
                      label="Igrejas que Foi Membro"
                      name="igrejasquefoimembro"
                      value={member.igrejasquefoimembro}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                    />
                    <InputField
                      label="Motivo da Saída"
                      name="motivosaida"
                      value={member.motivosaida}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                    />
                    <YesNoField
                      label="Teve Cargo Anterior?"
                      name="cargoanterior"
                      value={member.cargoanterior}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <YesNoField
                      label="Foi Separado Anteriormente?"
                      name="separadoanterior"
                      value={member.separadoanterior}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Posição Anterior"
                      name="posicaoanterior"
                      value={member.posicaoanterior}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />
                    <InputField
                      label="Atividade Anterior"
                      name="atividadeanterior"
                      value={member.atividadeanterior}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={3}
                    />

                    <Col md={12} className="mt-4">
                      <h6 className="small fw-bold text-primary text-uppercase border-bottom pb-2 mb-3">
                        Trajetória e Convicções
                      </h6>
                    </Col>

                    {[
                      { name: "dizimista", label: "É Dizimista?" },
                      { name: "ofertante", label: "É Ofertante?" },
                      {
                        name: "participacaocultos",
                        label: "Participa dos Cultos?",
                      },
                      { name: "evangelizar", label: "Hábito de Evangelizar?" },
                      {
                        name: "cultosdeoracao",
                        label: "Participa dos Cultos de Oração?",
                      },
                      { name: "jejuar", label: "Hábito de Jejuar?" },
                      { name: "leiturabiblica", label: "Lê a Bíblia?" },
                      { name: "habito", label: "Possui Hábito Devocional?" },
                      { name: "discipulo", label: "É Discípulo?" },
                      {
                        name: "aconselhamentopastoral",
                        label: "Busca Aconselhamento Pastoral?",
                      },
                      {
                        name: "desenvolvimento",
                        label: "Busca Desenvolvimento Espiritual?",
                      },
                      { name: "exortacao", label: "Aceita Exortação?" },
                      { name: "problema", label: "Possui Problemas a Tratar?" },
                    ].map((field) => (
                      <YesNoField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={member[field.name]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        col={3}
                      />
                    ))}

                    <Col md={12} className="mt-4">
                      <h6 className="small fw-bold text-primary text-uppercase border-bottom pb-2 mb-3">
                        Convicções Doutrinárias
                      </h6>
                    </Col>

                    <InputField
                      label="Definição de Evangelho"
                      name="definicaoevangelho"
                      value={member.definicaoevangelho}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Frutos do Espírito"
                      name="frutosespirito"
                      value={member.frutosespirito}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Desenvolvimento da Fé"
                      name="desenvolvimentodafe"
                      value={member.desenvolvimentodafe}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Convicção de Discípulo"
                      name="conviccaodiscipulo"
                      value={member.conviccaodiscipulo}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Pecado"
                      name="pecado"
                      value={member.pecado}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Convicção Teológica"
                      name="conviccaoteologica"
                      value={member.conviccaoteologica}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={6}
                    />
                    <InputField
                      label="Livros que Lê"
                      name="livros"
                      value={member.livros}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={12}
                    />

                    <Col md={12}>
                      <Form.Label className="small fw-bold text-secondary mt-2">
                        CONSIDERAÇÕES DO PASTOR / LIDERANÇA
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        className="bg-body border shadow-none"
                        name="ultimasconsideracoes"
                        value={member.ultimasconsideracoes || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* FOOTER FIXO */}
      <footer className="py-2 px-4 border-top bg-body-tertiary text-secondary small d-flex justify-content-between">
        <span>Gestão de Membros • Ministério Premium</span>
        <span>
          ID do Registro: <strong>{id}</strong>
        </span>
      </footer>
    </div>
  );
};

// Converte datas ISO (1980-04-15 ou 1980-04-15T00:00:00.000Z) para dd/mm/aaaa
const toBRDate = (value) => {
  if (!value) return "";
  const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : value;
};

// Componente Auxiliar de Input para limpeza de código
const InputField = ({
  label,
  name,
  value,
  onChange,
  disabled,
  col = 4,
  type = "text",
  mask,
  icon,
}) => (
  <Col md={col}>
    <Form.Group>
      <Form.Label className="small fw-bold text-secondary text-uppercase">
        {icon && <FontAwesomeIcon icon={icon} className="me-1 opacity-50" />}
        {label}
      </Form.Label>
      {mask ? (
        <Form.Control
          as={IMaskInput}
          mask={mask}
          type={type}
          name={name}
          value={mask === "00/00/0000" ? toBRDate(value) : value || ""}
          onChange={onChange}
          disabled={disabled}
          className="bg-body border shadow-none"
        />
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          className="bg-body border shadow-none"
        />
      )}
    </Form.Group>
  </Col>
);

// Normaliza valores como "sim", "Sim", "nao", "Não" para as opções do select
const normalizeYesNo = (value) => {
  if (value === undefined || value === null || value === "") return "";
  const v = String(value)
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (v === "sim") return "Sim";
  if (v === "nao") return "Não";
  return "";
};

// Componente Auxiliar de Select Sim/Não (mesmo padrão visual dos selects originais)
const YesNoField = ({ label, name, value, onChange, disabled, col = 3 }) => (
  <Col md={col}>
    <Form.Label className="small fw-bold text-secondary">{label}</Form.Label>
    <Form.Select
      className="bg-body border shadow-none"
      name={name}
      value={normalizeYesNo(value)}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">Selecione...</option>
      <option value="Sim">Sim</option>
      <option value="Não">Não</option>
    </Form.Select>
  </Col>
);

export default MemMinisterio;