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
  faEnvelope,
  faChurch,
  faSave,
  faArrowLeft,
  faCalendarAlt,
  faMapMarkerAlt,
  faBriefcase,
  faEdit,
  faUserCheck,
  faIdCard,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IMaskInput } from "react-imask";
import axios from "axios";

const additionalSections = [
  {title: "Batismo — registro anterior", fields: [{name: "dateBatism", label: "Data de batismo do registro anterior", type: "date"}]},
  {
    "title": "Dados complementares",
    "fields": [
      {
        "name": "education",
        "label": "Escolaridade",
        "type": "text"
      },
      {
        "name": "timeinresidence",
        "label": "Tempo na residência",
        "type": "text"
      }
    ]
  },
  {
    "title": "Família",
    "fields": [
      {
        "name": "estadocivil",
        "label": "Estado civil",
        "type": "text"
      },
      {
        "name": "conjuge",
        "label": "Cônjuge",
        "type": "text"
      },
      {
        "name": "filhos",
        "label": "Possui filhos?",
        "type": "text"
      },
      {
        "name": "qtdfilhos",
        "label": "Quantidade de filhos",
        "type": "number"
      },
      {
        "name": "nomefilhoum",
        "label": "Nome do primeiro filho",
        "type": "text"
      },
      {
        "name": "idadefilhoum",
        "label": "Idade do primeiro filho",
        "type": "number"
      },
      {
        "name": "nomefilhodois",
        "label": "Nome do segundo filho",
        "type": "text"
      },
      {
        "name": "idadefilhodois",
        "label": "Idade do segundo filho",
        "type": "number"
      },
      {
        "name": "nomefilhotres",
        "label": "Nome do terceiro filho",
        "type": "text"
      },
      {
        "name": "idadefilhotres",
        "label": "Idade do terceiro filho",
        "type": "number"
      },
      {
        "name": "nomefilhoquatro",
        "label": "Nome do quarto filho",
        "type": "text"
      },
      {
        "name": "idadefilhoquatro",
        "label": "Idade do quarto filho",
        "type": "number"
      },
      {
        "name": "optionprimeirocasamento",
        "label": "Primeiro casamento?",
        "type": "text"
      },
      {
        "name": "casamentocristao",
        "label": "Casamento cristão?",
        "type": "text"
      },
      {
        "name": "parceironaigreja",
        "label": "Cônjuge na igreja?",
        "type": "text"
      },
      {
        "name": "justificativa",
        "label": "Justificativa",
        "type": "text"
      }
    ]
  },
  {
    "title": "Histórico eclesiástico",
    "fields": [
      {
        "name": "congregacao",
        "label": "Congregação",
        "type": "text"
      },
      {
        "name": "jobChurchTemp",
        "label": "Data de início no cargo",
        "type": "date"
      },
      {
        "name": "motivosaida",
        "label": "Motivo da saída",
        "type": "text"
      },
      {
        "name": "lastchurch",
        "label": "Igreja anterior",
        "type": "text"
      },
      {
        "name": "igrejasquefoimembro",
        "label": "Igrejas das quais foi membro",
        "type": "text"
      },
      {
        "name": "cargoanterior",
        "label": "Cargo anterior",
        "type": "text"
      },
      {
        "name": "separadoanterior",
        "label": "Separado anteriormente?",
        "type": "text"
      },
      {
        "name": "posicaoanterior",
        "label": "Posição anterior",
        "type": "text"
      },
      {
        "name": "atividadeanterior",
        "label": "Atividade anterior",
        "type": "text"
      },
      {
        "name": "problema",
        "label": "Problemas",
        "type": "text"
      },
      {
        "name": "exortacao",
        "label": "Exortação",
        "type": "text"
      },
      {
        "name": "habito",
        "label": "Hábitos",
        "type": "text"
      }
    ]
  },
  {
    "title": "Vida cristã e convicções",
    "fields": [
      {
        "name": "discipulo",
        "label": "Discipulado",
        "type": "text"
      },
      {
        "name": "cultosdeoracao",
        "label": "Cultos de oração",
        "type": "text"
      },
      {
        "name": "aconselhamentopastoral",
        "label": "Aconselhamento pastoral",
        "type": "text"
      },
      {
        "name": "desenvolvimento",
        "label": "Desenvolvimento",
        "type": "text"
      },
      {
        "name": "definicaoevangelho",
        "label": "Definição do evangelho",
        "type": "text"
      },
      {
        "name": "frutosespirito",
        "label": "Frutos do Espírito",
        "type": "text"
      },
      {
        "name": "desenvolvimentodafe",
        "label": "Desenvolvimento da fé",
        "type": "text"
      },
      {
        "name": "conviccaodiscipulo",
        "label": "Convicção de discípulo",
        "type": "text"
      },
      {
        "name": "pecado",
        "label": "Pecado",
        "type": "text"
      },
      {
        "name": "conviccaoteologica",
        "label": "Convicção teológica",
        "type": "text"
      },
      {
        "name": "jejuar",
        "label": "Jejum",
        "type": "text"
      },
      {
        "name": "leiturabiblica",
        "label": "Leitura bíblica",
        "type": "text"
      },
      {
        "name": "livros",
        "label": "Livros",
        "type": "text"
      },
      {
        "name": "conviccao",
        "label": "Convicção",
        "type": "text"
      }
    ]
  }
];

const toDateInput = (value) => {
  if (!value) return "";
  const text = String(value);
  const local = text.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (local) return `${local[3]}-${local[2]}-${local[1]}`;
  return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : "";
};

const MembroMinisterio = () => {
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
  }, [id, theme]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((previous) => ({ ...previous, [name]: value }));
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
      const { _id, matricula, __v, ...payload } = member;
      if (payload.dateBirth) {
        const birthDate = toDateInput(payload.dateBirth);
        if (birthDate) payload.dateBirth = birthDate.split("-").reverse().join("/");
      }
      for (const field of ["databatismo", "dateBatism", "dataconversao", "jobChurchTemp"]) {
        if (Object.prototype.hasOwnProperty.call(payload, field)) {
          payload[field] = toDateInput(payload[field]) || null;
        }
      }
      for (const field of ["number", "qtdfilhos", "idadefilhoum", "idadefilhodois", "idadefilhotres", "idadefilhoquatro"]) {
        if (Object.prototype.hasOwnProperty.call(payload, field)) {
          payload[field] = payload[field] === "" || payload[field] == null ? null : Number(payload[field]);
        }
      }
      const response = await axios.put(
        `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`,
        payload
      );
      setMember(response.data);
      showAlertMessage("Dados salvos com sucesso!", "success");
      setIsEditing(false);
      setSaving(false);
    } catch (error) {
      console.error(error);
      showAlertMessage(error.response?.data?.erro || error.response?.data?.message || "Erro ao salvar os dados.", "danger");
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      const normalized = toDateInput(dateString);
      if (normalized) return normalized.split("-").reverse().join("/");
      return Number.isNaN(date.getTime()) ? dateString : date.toLocaleDateString("pt-BR");
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
                      onClick={() => navigate("/membresia")}
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
                onClick={() => navigate("/membresia")}
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
                      {member.matricula || "Não informada"}
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
                      className={member.cadAtivo ? "text-success" : "text-danger"}
                    />
                  </div>
                  <div>
                    <p className="small text-secondary fw-bold text-uppercase mb-0">
                      Status
                    </p>
                    <Badge
                      bg={member.cadAtivo ? "success-subtle" : "secondary-subtle"}
                      className={
                        member.cadAtivo
                          ? "text-success border border-success-subtle"
                          : "text-secondary border border-secondary-subtle"
                      }
                    >
                      {member.cadAtivo == null ? "Não informado" : member.cadAtivo ? "Ativo no Sistema" : "Inativo"}
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
                      type="date"
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
                        {member.sex && !["Masculino", "Feminino"].includes(member.sex) && (
                          <option value={member.sex}>{member.sex}</option>
                        )}
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
                      col={4}
                    />
                    <InputField
                      label="Bairro"
                      name="district"
                      value={member.district}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
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
                      type="date"
                      name="databatismo"
                      value={member.databatismo}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
                    />
                    <InputField
                      label="Conversão"
                      type="date"
                      name="dataconversao"
                      value={member.dataconversao}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      col={4}
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
                    ].map((field) => (
                      <Col md={3} key={field.name}>
                        <Form.Label className="small fw-bold text-secondary">
                          {field.label}
                        </Form.Label>
                        <Form.Select
                          className="bg-body border shadow-none"
                          name={field.name}
                          value={member[field.name] || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option value="">Selecione...</option>
                          {member[field.name] && !["Sim", "Não"].includes(member[field.name]) && (
                            <option value={member[field.name]}>{member[field.name]}</option>
                          )}
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </Form.Select>
                      </Col>
                    ))}

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
            {additionalSections.map((section) => (
              <Col md={12} key={section.title}>
                <Card className="border shadow-sm rounded-4 bg-body-tertiary overflow-hidden">
                  <Card.Header className="bg-body-secondary py-3 px-4 border-0">
                    <h5 className="mb-0 h6 fw-bold">{section.title}</h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row className="g-3">
                      {section.fields.map((field) => (
                        <InputField key={field.name} {...field}
                          value={member[field.name]} onChange={handleInputChange}
                          disabled={!isEditing} col={6} />
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col md={12}>
              <Card className="border shadow-sm rounded-4 bg-body-tertiary">
                <Card.Header><h5 className="mb-0 h6 fw-bold">Dados do registro</h5></Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    <InputField label="Identificador do registro" name="_id" value={member._id ?? id} disabled col={4} />
                    <InputField label="Matrícula" name="matricula" value={member.matricula} disabled col={4} />
                    <InputField label="Data de inscrição" name="datacriacao" value={formatDate(member.datacriacao)} disabled col={4} />
                    <InputField label="Versão do registro" name="__v" value={member.__v} disabled col={4} />
                    <Col md={4}>
                      <Form.Group controlId="cadAtivo">
                        <Form.Label>Status do cadastro</Form.Label>
                        <Form.Select name="cadAtivo" value={member.cadAtivo == null ? '' : String(member.cadAtivo)}
                          disabled={!isEditing} onChange={event => setMember(previous => ({...previous, cadAtivo: event.target.value === '' ? null : event.target.value === 'true'}))}>
                          <option value="">Não informado</option><option value="true">Ativo</option><option value="false">Inativo</option>
                        </Form.Select>
                      </Form.Group>
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
          Matrícula: <strong>{member.matricula || "Não informada"}</strong>
        </span>
      </footer>
    </div>
  );
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
          value={type === "date" ? toDateInput(value) : (value ?? "")}
          onChange={onChange}
          disabled={disabled}
          className="bg-body border shadow-none"
        />
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={type === "date" ? toDateInput(value) : (value ?? "")}
          onChange={onChange}
          disabled={disabled}
          className="bg-body border shadow-none"
        />
      )}
    </Form.Group>
  </Col>
);

export default MembroMinisterio;
