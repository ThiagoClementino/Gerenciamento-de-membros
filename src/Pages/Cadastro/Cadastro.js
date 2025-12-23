import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faCross,
  faChurch,
  faBook,
  faSave,
  faSearch,
  faMapMarkerAlt,
  faChild,
} from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Tab,
  Tabs,
  InputGroup,
} from "react-bootstrap";

const Cadastro = () => {
  const dataMatricula = () => {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  const [cadMembers, setCadMembers] = useState(() => {
    const savedData = localStorage.getItem("cadMembersData");
    return savedData
      ? JSON.parse(savedData)
      : {
          datacriacao: dataMatricula(),
          name: "",
          mothersname: "",
          fathersname: "",
          dateBirth: "",
          sex: "",
          telone: "",
          teltwo: "",
          email: "",
          national: "",
          natural: "",
          profession: "",
          companywork: "",
          education: "",
          cep: "",
          address: "",
          number: "",
          complement: "",
          district: "",
          city: "",
          state: "",
          timeinresidence: "",
          estadocivil: "",
          conjuge: "",
          filhos: "",
          qtdfilhos: "",
          nomefilhoum: "",
          idadefilhoum: "",
          nomefilhodois: "",
          idadefilhodois: "",
          nomefilhotres: "",
          idadefilhotres: "",
          nomefilhoquatro: "",
          idadefilhoquatro: "",
          jobChurch: "",
          jobChurchTemp: "",
          congregacao: "",
          optionprimeirocasamento: "",
          casamentocristao: "",
          parceironaigreja: "",
          justificativa: "",
          databatismo: "",
          dataconversao: "",
          lastchurch: "",
          motivosaida: "",
          igrejasquefoimembro: "",
          dizimista: "",
          ofertante: "",
          cargoanterior: "",
          separadoanterior: "",
          posicaoanterior: "",
          atividadeanterior: "",
          problema: "",
          exortacao: "",
          discipulo: "",
          cultosdeoracao: "",
          participacaocultos: "",
          habito: "",
          aconselhamentopastoral: "",
          desenvolvimento: "",
          conviccaodiscipulo: "",
          definicaoevangelho: "",
          frutosespirito: "",
          desenvolvimentodafe: "",
          pecado: "",
          conviccaoteologica: "",
          evangelizar: "",
          jejuar: "",
          leiturabiblica: "",
          livros: "",
          Ultimasconsideracoes: "",
          Cad: true,
        };
  });

  const [activeTab, setActiveTab] = useState("dados-pessoais");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    localStorage.setItem("cadMembersData", JSON.stringify(cadMembers));
  }, [cadMembers]);

  const handleSubmitCamps = (event) => {
    const { name, value } = event.target;
    setCadMembers((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setFormError(null);

    try {
      const response = await fetch(
        "https://api-gestao-igreja.onrender.com/membros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(cadMembers),
          mode: "cors",
        }
      );
      const json = await response.json();
      if (response.ok) {
        alert("Dados enviados com sucesso!");
        setCadMembers({ datacriacao: dataMatricula() });
        localStorage.removeItem("cadMembersData");
      } else {
        const errorMessage =
          json.message || "Erro ao enviar dados. Por favor, tente novamente.";
        setFormError(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setFormError("Erro ao enviar dados. Por favor, tente novamente.");
    }
  };

  const buscaCep = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setCadMembers((prevState) => ({
            ...prevState,
            address: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
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
      {/* HEADER PREMIUM */}
      <header className="dashboard-sticky-header" style={{ flexShrink: 0 }}>
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col md={7}>
              <h2 className="fw-bold text-light mb-0">Novo Cadastro</h2>
              <p className="text-primary small mb-0">
                Preencha os dados para registrar o novo membro
              </p>
            </Col>
            <Col
              md={5}
              className="text-end d-flex justify-content-end align-items-center gap-2"
            >
              {formError && (
                <small className="text-danger me-2">{formError}</small>
              )}
              <Button
                variant="primary"
                className="rounded-pill px-4 fw-bold shadow-sm"
                onClick={handleSubmitForm}
              >
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Salvar Cadastro
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* CONTEÚDO SCROLLÁVEL */}
      <main
        className="dashboard-scroll-content"
        style={{ flex: 1, overflowY: "auto", paddingBottom: "3rem" }}
      >
        <Container fluid className="mt-4">
          <Form onSubmit={handleSubmitForm}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4 custom-premium-tabs"
              variant="pills"
              justify
            >
              {/* TAB 1: DADOS PESSOAIS */}
              <Tab
                eventKey="dados-pessoais"
                title={
                  <span>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Pessoais
                  </span>
                }
              >
                <Card className="chart-premium-card border-0 p-4">
                  <h5 className="text-primary mb-4 fw-bold border-bottom border-custom pb-2">
                    Informações de Identidade
                  </h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Nome Completo
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="name"
                          value={cadMembers.name}
                          onChange={handleSubmitCamps}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Nome da Mãe
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="mothersname"
                          value={cadMembers.mothersname || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Nome do Pai
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="fathersname"
                          value={cadMembers.fathersname || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Nascimento
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="date"
                          name="dateBirth"
                          value={cadMembers.dateBirth}
                          onChange={handleSubmitCamps}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Sexo
                        </Form.Label>
                        <Form.Select
                          className="bg-tertiary-custom border-custom text-light"
                          name="sex"
                          value={cadMembers.sex || ""}
                          onChange={handleSubmitCamps}
                        >
                          <option value="">Escolha</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="text-primary mt-5 mb-4 fw-bold border-bottom border-custom pb-2">
                    Contato e Endereço
                  </h5>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Telefone Principal
                        </Form.Label>
                        <IMaskInput
                          className="form-control bg-tertiary-custom border-custom text-light"
                          mask="(00) 00000-0000"
                          name="telone"
                          value={cadMembers.telone || ""}
                          onChange={handleSubmitCamps}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          E-mail
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="email"
                          name="email"
                          value={cadMembers.email || ""}
                          onChange={handleSubmitCamps}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          CEP
                        </Form.Label>
                        <InputGroup>
                          <IMaskInput
                            className="form-control bg-tertiary-custom border-custom text-light"
                            mask="00000-000"
                            name="cep"
                            value={cadMembers.cep || ""}
                            onChange={handleSubmitCamps}
                            onBlur={buscaCep}
                          />
                          <InputGroup.Text className="bg-tertiary-custom border-custom text-primary">
                            <FontAwesomeIcon icon={faSearch} />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Endereço
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="address"
                          value={cadMembers.address || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Número
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="number"
                          value={cadMembers.number || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Bairro
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="district"
                          value={cadMembers.district || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Tab>

              {/* TAB 2: RELACIONAMENTO */}
              <Tab
                eventKey="relacionamento"
                title={
                  <span>
                    <FontAwesomeIcon icon={faHeart} className="me-2" />
                    Família
                  </span>
                }
              >
                <Card className="chart-premium-card border-0 p-4">
                  <h5 className="text-success mb-4 fw-bold border-bottom border-custom pb-2">
                    Estado Civil e Cônjuge
                  </h5>
                  <Row className="g-3 mb-4">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Estado Civil
                        </Form.Label>
                        <Form.Select
                          className="bg-tertiary-custom border-custom text-light"
                          name="estadocivil"
                          value={cadMembers.estadocivil || ""}
                          onChange={handleSubmitCamps}
                        >
                          <option value="">Selecione</option>
                          <option value="Solteiro">Solteiro</option>
                          <option value="Casado">Casado</option>
                          <option value="Divorciado">Divorciado</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={8}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Nome do Cônjuge
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="conjuge"
                          value={cadMembers.conjuge || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="text-success mb-4 fw-bold border-bottom border-custom pb-2">
                    <FontAwesomeIcon icon={faChild} className="me-2" />
                    Dados dos Filhos
                  </h5>
                  <Row className="g-3">
                    {[1, 2, 3, 4].map((num) => {
                      const keyNome = `nomefilho${
                        num === 1
                          ? "um"
                          : num === 2
                          ? "dois"
                          : num === 3
                          ? "tres"
                          : "quatro"
                      }`;
                      const keyIdade = `idadefilho${
                        num === 1
                          ? "um"
                          : num === 2
                          ? "dois"
                          : num === 3
                          ? "tres"
                          : "quatro"
                      }`;
                      return (
                        <React.Fragment key={num}>
                          <Col md={9}>
                            <Form.Group>
                              <Form.Label className="small text-uppercase text-primary">
                                Nome do {num}º filho
                              </Form.Label>
                              <Form.Control
                                className="bg-tertiary-custom border-custom text-light"
                                type="text"
                                name={keyNome}
                                value={cadMembers[keyNome] || ""}
                                onChange={handleSubmitCamps}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group>
                              <Form.Label className="small text-uppercase text-primary">
                                Idade
                              </Form.Label>
                              <Form.Control
                                className="bg-tertiary-custom border-custom text-light"
                                type="number"
                                name={keyIdade}
                                value={cadMembers[keyIdade] || ""}
                                onChange={handleSubmitCamps}
                              />
                            </Form.Group>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  </Row>
                </Card>
              </Tab>

              {/* TAB 3: HISTÓRICO CRISTÃO */}
              <Tab
                eventKey="historico-cristao"
                title={
                  <span>
                    <FontAwesomeIcon icon={faCross} className="me-2" />
                    Histórico
                  </span>
                }
              >
                <Card className="chart-premium-card border-0 p-4">
                  <h5 className="text-info mb-4 fw-bold border-bottom border-custom pb-2">
                    Caminhada Cristã
                  </h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Data de conversão
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="date"
                          name="dataconversao"
                          value={cadMembers.dataconversao || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Data de batismo
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="date"
                          name="databatismo"
                          value={cadMembers.databatismo || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Última igreja que frequentou
                        </Form.Label>
                        <Form.Control
                          className="bg-tertiary-custom border-custom text-light"
                          type="text"
                          name="lastchurch"
                          value={cadMembers.lastchurch || ""}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Dizimista Fiel?
                        </Form.Label>
                        <Form.Select
                          className="bg-tertiary-custom border-custom text-light"
                          name="dizimista"
                          value={cadMembers.dizimista || ""}
                          onChange={handleSubmitCamps}
                        >
                          <option value="">Selecione</option>
                          <option value="sim">Sim</option>
                          <option value="não">Não</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Ofertante Fiel?
                        </Form.Label>
                        <Form.Select
                          className="bg-tertiary-custom border-custom text-light"
                          name="ofertante"
                          value={cadMembers.ofertante || ""}
                          onChange={handleSubmitCamps}
                        >
                          <option value="">Selecione</option>
                          <option value="sim">Sim</option>
                          <option value="não">Não</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Tab>

              {/* TAB 4: CONVICÇÕES */}
              <Tab
                eventKey="conviccoes"
                title={
                  <span>
                    <FontAwesomeIcon icon={faBook} className="me-2" />
                    Convicções
                  </span>
                }
              >
                <Card className="chart-premium-card border-0 p-4">
                  <h5 className="text-warning mb-4 fw-bold border-bottom border-custom pb-2">
                    Vida Espiritual
                  </h5>
                  <Row className="g-3">
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          O que te faz convicto de ser discípulo de Jesus?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className="bg-tertiary-custom border-custom text-light"
                          name="conviccaodiscipulo"
                          value={cadMembers.conviccaodiscipulo}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Como você define o evangelho?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className="bg-tertiary-custom border-custom text-light"
                          name="definicaoevangelho"
                          value={cadMembers.definicaoevangelho}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small text-uppercase fw-bold text-primary">
                          Considerações finais / Observações
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          className="bg-tertiary-custom border-custom text-light"
                          name="ultimasconsideracoes"
                          value={cadMembers.ultimasconsideracoes}
                          onChange={handleSubmitCamps}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Tab>
            </Tabs>
          </Form>
        </Container>
      </main>

      {/* FOOTER FIXO */}
      <footer
        className="footer-section py-2 bg-tertiary-custom border-top border-custom"
        style={{ flexShrink: 0 }}
      >
        <Container fluid>
          <Row className="small text-primary align-items-center">
            <Col md={6} className="text-center text-md-start">
              © 2025 • Sistema de Gestão Eclesiástica Premium
            </Col>
            <Col md={6} className="text-center text-md-end">
              Data do Sistema:{" "}
              <span className="text-light fw-bold">{dataMatricula()}</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Cadastro;
