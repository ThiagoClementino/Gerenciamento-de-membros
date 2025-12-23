import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Tab,
  Tabs,
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
      console.log(json);
      console.log(response.status);
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
    <div className="main-wrapper">
      <div className="content-container">
        <nav className="navbar-section">
          <Container
            fluid
            className="h-100 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <div>
                <h1 className="h3 mb-1 text-primary-custom fw-bold">
                  Cadastro de Membros
                </h1>
                <p className="text-muted-custom mb-0">
                  Cadastro de novos membros
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Form.Control
                type="search"
                placeholder="Buscar..."
                className="me-2"
              />
              {formError && (
                <p className="text-danger mb-2 ms-3">{formError}</p>
              )}
              <Button variant="primary" onClick={handleSubmitForm}>
                Enviar Cadastro
              </Button>
            </div>
          </Container>
        </nav>

        {/* Form Section - 75% da altura */}
        <section className="form-section-cadastro">
          <Container fluid className="h-100 d-flex flex-column">
            <Form
              onSubmit={handleSubmitForm}
              className="flex-grow-1 d-flex flex-column"
            >
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 flex-shrink-0"
                variant="pills"
                justify
              >
                {/* Tab 1: Dados Pessoais */}
                <Tab
                  eventKey="dados-pessoais"
                  title={
                    <div
                      className={`text-center ${
                        activeTab === "dados-pessoais"
                          ? "text-white"
                          : "text-secondary"
                      }`}
                    >
                      <small className="d-block">Etapa 1</small>
                      <strong>Dados Pessoais</strong>
                    </div>
                  }
                >
                  <Card className="h-100">
                    <Card.Header className="bg-primary text-white">
                      <h5 className="mb-0 fw-semibold">
                        <i className="fas fa-user me-2"></i>
                        Dados Pessoais
                      </h5>
                    </Card.Header>
                    <Card.Body
                      className="overflow-auto"
                      style={{ maxHeight: "calc(100% - 60px)" }} // Ajuste para altura da tab
                    >
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="name">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={cadMembers.name}
                              onChange={handleSubmitCamps}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="mothersname">
                            <Form.Label>Nome da Mãe</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nome da Mãe"
                              name="mothersname"
                              value={cadMembers.mothersname || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="fathersname">
                            <Form.Label>Nome do Pai</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nome do Pai"
                              name="fathersname"
                              value={cadMembers.fathersname || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="dateBirth">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control
                              type="date"
                              name="dateBirth"
                              value={cadMembers.dateBirth}
                              onChange={handleSubmitCamps}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="sex">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select
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

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="telone">
                            <Form.Label>Telefone</Form.Label>
                            <IMaskInput
                              className="form-control"
                              type="text"
                              mask="(00) 00000-0000"
                              placeholder="(00) 00000-0000"
                              name="telone"
                              value={cadMembers.telone || ""}
                              onChange={handleSubmitCamps}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="teltwo">
                            <Form.Label>Telefone 2</Form.Label>
                            <IMaskInput
                              className="form-control"
                              type="text"
                              placeholder="(00) 00000-0000"
                              mask="(00) 00000-0000"
                              name="teltwo"
                              value={cadMembers.teltwo || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="email@email.com"
                              name="email"
                              value={cadMembers.email || ""}
                              onChange={handleSubmitCamps}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="national">
                            <Form.Label>Nacionalidade</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nacionalidade"
                              name="national"
                              value={cadMembers.national || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="natural">
                            <Form.Label>Naturalidade</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Naturalidade"
                              name="natural"
                              value={cadMembers.natural || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="profession">
                            <Form.Label>Profissão</Form.Label>
                            <Form.Control
                              type="text"
                              name="profession"
                              value={cadMembers.profession || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="companywork">
                            <Form.Label>Empresa que trabalha</Form.Label>
                            <Form.Control
                              type="text"
                              name="companywork"
                              value={cadMembers.companywork || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="education">
                            <Form.Label>Grau de escolaridade</Form.Label>
                            <Form.Select
                              name="education"
                              value={cadMembers.education || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Escolha</option>
                              <option value="Ensino Fundamental">
                                Ensino Fundamental
                              </option>
                              <option value="Ensino Medio">Ensino Médio</option>
                              <option value="Ensino Superior">
                                Ensino Superior
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={3}>
                          <Form.Group controlId="cep">
                            <Form.Label>CEP</Form.Label>
                            <IMaskInput
                              className="form-control"
                              mask="00000-000"
                              type="text"
                              placeholder="CEP"
                              name="cep"
                              value={cadMembers.cep || ""}
                              onChange={handleSubmitCamps}
                              onBlur={buscaCep}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="address">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={cadMembers.address || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="number">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                              type="text"
                              name="number"
                              value={cadMembers.number || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="complement">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                              type="text"
                              name="complement"
                              value={cadMembers.complement || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="district">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Bairro"
                              name="district"
                              value={cadMembers.district || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="city">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              value={cadMembers.city || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="state">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Estado"
                              name="state"
                              value={cadMembers.state || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="timeinresidence">
                            <Form.Label>Tempo no mesmo endereço</Form.Label>
                            <Form.Control
                              type="text"
                              name="timeinresidence"
                              value={cadMembers.timeinresidence || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab>

                {/* Tab 2: Relacionamento */}
                <Tab
                  eventKey="relacionamento"
                  title={
                    <div
                      className={`text-center ${
                        activeTab === "relacionamento"
                          ? "text-white"
                          : "text-secondary"
                      }`}
                    >
                      <small className="d-block">Etapa 2</small>
                      <strong>Relacionamento</strong>
                    </div>
                  }
                >
                  <Card className="h-100">
                    <Card.Header className="bg-success text-white">
                      <h5 className="mb-0 fw-semibold">
                        <i className="fas fa-heart me-2"></i>
                        Relacionamento
                      </h5>
                    </Card.Header>
                    <Card.Body
                      className="overflow-auto"
                      style={{ maxHeight: "calc(100% - 60px)" }}
                    >
                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="estadocivil">
                            <Form.Label>Estado Civil</Form.Label>
                            <Form.Select
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
                        <Col md={4}>
                          <Form.Group controlId="conjuge">
                            <Form.Label>Nome do Cônjuge</Form.Label>
                            <Form.Control
                              type="text"
                              name="conjuge"
                              placeholder="Digite o nome do cônjuge"
                              value={cadMembers.conjuge || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="filhos">
                            <Form.Label>Possui Filhos</Form.Label>
                            <Form.Select
                              name="filhos"
                              value={cadMembers.filhos || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="Sim">Sim</option>
                              <option value="Nao">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="qtdfilhos">
                            <Form.Label>Quantidade de filhos</Form.Label>
                            <Form.Control
                              type="number"
                              name="qtdfilhos"
                              value={cadMembers.qtdfilhos || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="jobChurch">
                            <Form.Label>Cargo no ministério</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Cargo"
                              name="jobChurch"
                              value={cadMembers.jobChurch || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="jobChurchTemp">
                            <Form.Label>Tempo no cargo</Form.Label>
                            <Form.Control
                              type="date"
                              name="jobChurchTemp"
                              value={cadMembers.jobChurchTemp || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Card className="mb-4 border-secondary">
                        <Card.Header className="bg-light">
                          <h6 className="mb-0 fw-semibold text-secondary">
                            <i className="fas fa-child me-2"></i>
                            Dados dos filhos
                          </h6>
                        </Card.Header>
                        <Card.Body>
                          {[1, 2, 3, 4].map((num) => (
                            <Row key={num} className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Nome do {num}º filho</Form.Label>
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
                                    placeholder="Digite o nome do filho"
                                    value={
                                      cadMembers[
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
                                    onChange={handleSubmitCamps}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Idade</Form.Label>
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
                                    placeholder="Idade"
                                    value={
                                      cadMembers[
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
                                    onChange={handleSubmitCamps}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          ))}
                        </Card.Body>
                      </Card>

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="optionprimeirocasamento">
                            <Form.Label>Primeiro Casamento?</Form.Label>
                            <Form.Select
                              name="optionprimeirocasamento"
                              value={cadMembers.optionprimeirocasamento || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="casamentocristao">
                            <Form.Label>Cerimônia cristã?</Form.Label>
                            <Form.Select
                              name="casamentocristao"
                              value={cadMembers.casamentocristao || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="parceironaigreja">
                            <Form.Label>Cônjuge será membro?</Form.Label>
                            <Form.Select
                              name="parceironaigreja"
                              value={cadMembers.parceironaigreja || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="justificativa">
                            <Form.Label>Justificativa (se não)</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="justificativa"
                              value={cadMembers.justificativa || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab>

                {/* Tab 3: Histórico Cristão */}
                <Tab
                  eventKey="historico-cristao"
                  title={
                    <div
                      className={`text-center ${
                        activeTab === "historico-cristao"
                          ? "text-white"
                          : "text-secondary"
                      }`}
                    >
                      <small className="d-block">Etapa 3</small>
                      <strong>Histórico Cristão</strong>
                    </div>
                  }
                >
                  <Card className="h-100">
                    <Card.Header className="bg-info text-white">
                      <h5 className="mb-0 fw-semibold">
                        <i className="fas fa-cross me-2"></i>
                        Histórico Cristão
                      </h5>
                    </Card.Header>
                    <Card.Body
                      className="overflow-auto"
                      style={{ maxHeight: "calc(100% - 60px)" }}
                    >
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="dataconversao">
                            <Form.Label>Data de conversão</Form.Label>
                            <Form.Control
                              type="date"
                              name="dataconversao"
                              value={cadMembers.dataconversao || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="databatismo">
                            <Form.Label>Data de batismo</Form.Label>
                            <Form.Control
                              type="date"
                              name="databatismo"
                              value={cadMembers.databatismo || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="lastchurch">
                            <Form.Label>Última igreja</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastchurch"
                              value={cadMembers.lastchurch || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="motivosaida">
                            <Form.Label>Motivo da saída</Form.Label>
                            <Form.Control
                              type="text"
                              name="motivosaida"
                              value={cadMembers.motivosaida || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="igrejasquefoimembro">
                            <Form.Label>Igrejas que foi membro</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="igrejasquefoimembro"
                              value={cadMembers.igrejasquefoimembro || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={3}>
                          <Form.Group controlId="dizimista">
                            <Form.Label>Dizimista fiel?</Form.Label>
                            <Form.Select
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
                        <Col md={3}>
                          <Form.Group controlId="ofertante">
                            <Form.Label>Ofertante fiel?</Form.Label>
                            <Form.Select
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
                        <Col md={3}>
                          <Form.Group controlId="cargoanterior">
                            <Form.Label>Cargo de liderança?</Form.Label>
                            <Form.Select
                              name="cargoanterior"
                              value={cadMembers.cargoanterior || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="separadoanterior">
                            <Form.Label>Foi consagrado?</Form.Label>
                            <Form.Select
                              name="separadoanterior"
                              value={cadMembers.separadoanterior || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="posicaoanterior">
                            <Form.Label>Posição anterior</Form.Label>
                            <Form.Control
                              type="text"
                              name="posicaoanterior"
                              value={cadMembers.posicaoanterior || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="atividadeanterior">
                            <Form.Label>Atividades anteriores</Form.Label>
                            <Form.Control
                              type="text"
                              name="atividadeanterior"
                              value={cadMembers.atividadeanterior || ""}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab>

                {/* Tab 4: Histórico Congregacional */}
                <Tab
                  eventKey="historico-congregacional"
                  title={
                    <div
                      className={`text-center ${
                        activeTab === "historico-congregacional"
                          ? "text-white"
                          : "text-secondary"
                      }`}
                    >
                      <small className="d-block">Etapa 4</small>
                      <strong>Histórico Congregacional</strong>
                    </div>
                  }
                >
                  <Card className="h-100">
                    <Card.Header className="bg-warning text-white">
                      <h5 className="mb-0 fw-semibold">
                        <i className="fas fa-church me-2"></i>
                        Histórico Congregacional
                      </h5>
                    </Card.Header>
                    <Card.Body
                      className="overflow-auto"
                      style={{ maxHeight: "calc(100% - 60px)" }}
                    >
                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="problema">
                            <Form.Label>Problema com liderança?</Form.Label>
                            <Form.Select
                              name="problema"
                              value={cadMembers.problema || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="exortacao">
                            <Form.Label>Problema em ser exortado?</Form.Label>
                            <Form.Select
                              name="exortacao"
                              value={cadMembers.exortacao || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="discipulo">
                            <Form.Label>Discípulo pastoreável?</Form.Label>
                            <Form.Select
                              name="discipulo"
                              value={cadMembers.discipulo || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="participacaocultos">
                            <Form.Label>Participa de estudos?</Form.Label>
                            <Form.Select
                              name="participacaocultos"
                              value={cadMembers.participacaocultos || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="cultosdeoracao">
                            <Form.Label>Participa de orações?</Form.Label>
                            <Form.Select
                              name="cultosdeoracao"
                              value={cadMembers.cultosdeoracao || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="aconselhamentopastoral">
                            <Form.Label>Busca aconselhamento?</Form.Label>
                            <Form.Select
                              name="aconselhamentopastoral"
                              value={cadMembers.aconselhamentopastoral || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="habito">
                            <Form.Label>Informa sobre ausências?</Form.Label>
                            <div className="mt-2">
                              <Form.Check
                                type="radio"
                                name="habito"
                                value="sim"
                                label="Sim"
                                checked={cadMembers.habito === "sim"}
                                onChange={handleSubmitCamps}
                                inline
                              />
                              <Form.Check
                                type="radio"
                                name="habito"
                                value="não"
                                label="Não"
                                checked={cadMembers.habito === "não"}
                                onChange={handleSubmitCamps}
                                inline
                              />
                            </div>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="desenvolvimento">
                            <Form.Label>Preza pela comunidade?</Form.Label>
                            <Form.Select
                              name="desenvolvimento"
                              value={cadMembers.desenvolvimento || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab>

                {/* Tab 5: Convicções */}
                <Tab
                  eventKey="conviccoes"
                  title={
                    <div
                      className={`text-center ${
                        activeTab === "conviccoes"
                          ? "text-white"
                          : "text-secondary"
                      }`}
                    >
                      <small className="d-block">Etapa 5</small>
                      <strong>Convicções</strong>
                    </div>
                  }
                >
                  <Card className="h-100">
                    <Card.Header className="bg-secondary text-white">
                      <h5 className="mb-0 fw-semibold">
                        <i className="fas fa-book me-2"></i>
                        Convicções
                      </h5>
                    </Card.Header>
                    <Card.Body
                      className="overflow-auto"
                      style={{ maxHeight: "calc(100% - 60px)" }}
                    >
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="conviccaodiscipulo">
                            <Form.Label>
                              O que te faz convicto de ser discípulo de Jesus?
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="conviccaodiscipulo"
                              value={cadMembers.conviccaodiscipulo}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="definicaoevangelho">
                            <Form.Label>
                              Como você define o evangelho?
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="definicaoevangelho"
                              value={cadMembers.definicaoevangelho}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="frutosespirito">
                            <Form.Label>
                              Frutos do Espírito na sua vida
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="frutosespirito"
                              value={cadMembers.frutosespirito}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="desenvolvimentodafe">
                            <Form.Label>Como desenvolve sua fé?</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="desenvolvimentodafe"
                              value={cadMembers.desenvolvimentodafe}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="pecado">
                            <Form.Label>
                              Pecados que tem lutado contra
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="pecado"
                              value={cadMembers.pecado}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="conviccaoteologica">
                            <Form.Label>Suas convicções teológicas</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="conviccaoteologica"
                              value={cadMembers.conviccaoteologica}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="evangelizar">
                            <Form.Label>Evangeliza?</Form.Label>
                            <Form.Select
                              name="evangelizar"
                              value={cadMembers.evangelizar || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="jejuar">
                            <Form.Label>Jejua?</Form.Label>
                            <Form.Select
                              name="jejuar"
                              value={cadMembers.jejuar || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="leiturabiblica">
                            <Form.Label>Leu a Bíblia toda?</Form.Label>
                            <Form.Select
                              name="leiturabiblica"
                              value={cadMembers.leiturabiblica || ""}
                              onChange={handleSubmitCamps}
                            >
                              <option value="">Selecione</option>
                              <option value="sim">Sim</option>
                              <option value="não">Não</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="livros">
                            <Form.Label>
                              Últimos 3 livros que edificaram sua fé
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="livros"
                              value={cadMembers.livros}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="ultimasconsideracoes">
                            <Form.Label>Considerações finais</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              name="ultimasconsideracoes"
                              value={cadMembers.ultimasconsideracoes}
                              onChange={handleSubmitCamps}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>
            </Form>
          </Container>
        </section>

        {/* Footer Section - 5% da altura */}
        <footer className="footer-section">
          <Container
            fluid
            className="h-100 d-flex align-items-center justify-content-center"
          >
            <small>© 2024 Sistema de Gestão</small>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default Cadastro;
