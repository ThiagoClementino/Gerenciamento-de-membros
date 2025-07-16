import React from "react";
import Header from "../Header/Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
import Datainfor from "../../Contexts/DataInfor";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChildDress,
  faChildReaching,
  faPeopleGroup,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import { useTheme } from "../../Contexts/ThemeContext";
import { ChartCard } from "../../Components/UI/Card";

const Dashboard = () => {
  const { dados } = React.useContext(Datainfor);
  const [data, setData] = useState(new Date());
  const { theme } = useTheme();

  useEffect(() => {
    const timerID = setInterval(() => {
      setData(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    const segundos = String(data.getSeconds()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  };

  const Masculino = dados.filter(
    (dadomeber) =>
      dadomeber.sex === "Masculino" || dadomeber.sex === "masculino"
  ).length;

  const Feminino = dados.filter(
    (dadomeber) => dadomeber.sex === "Feminino" || dadomeber.sex === "feminino"
  ).length;

  const membrosAtivos = dados.filter(
    (dadomeber) => dadomeber.cad === true
  ).length;

  const statsCards = [
    {
      title: "Total de Membros",
      value: dados.length,
      icon: faPeopleGroup,
      color: "var(--custom-accent-primary)",
      bgColor: "rgba(102, 164, 202, 0.1)",
    },
    {
      title: "Membros Ativos",
      value: membrosAtivos,
      icon: faPeopleLine,
      color: "var(--custom-accent-secondary)",
      bgColor: "rgba(156, 195, 221, 0.1)",
    },
    {
      title: "Homens",
      value: Masculino,
      icon: faChildReaching,
      color: "var(--custom-accent-tertiary)",
      bgColor: "rgba(50, 110, 151, 0.1)",
    },
    {
      title: "Mulheres",
      value: Feminino,
      icon: faChildDress,
      color: "var(--custom-accent-primary)",
      bgColor: "rgba(102, 164, 202, 0.1)",
    },
  ];

  return (
    <div className="d-flex">
      <Header />
      <Container fluid className="p-4 flex-grow-1">
        {/* Cabeçalho do Dashboard */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div>
                <h1 className="h3 mb-1 text-primary-custom fw-bold">
                  Dashboard
                </h1>
                <p className="text-muted-custom mb-0">
                  Gráficos e informações sobre os membros cadastrados
                </p>
              </div>
              <div className="text-md-end mt-3 mt-md-0">
                <small className="text-muted-custom d-block">Data e Hora</small>
                <span className="fw-semibold">{formatarData(data)}</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Cards de Estatísticas */}
        <Row className="mb-4 g-6">
          {statsCards.map((stat, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={6}>
              <Card className="h-100  border-0 shadow-custom">
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="flex-grow-1">
                    <h6 className="card-title mb-1 text-muted-custom">
                      {stat.title}
                    </h6>
                    <h3 className="mb-0 fw-bold text-primary-custom">
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: stat.bgColor,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={stat.icon}
                      size="lg"
                      style={{ color: stat.color }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Gráficos */}
        <Row className="mb-4 g-3">
          <Col xs={12} lg={6}>
            <Card className="h-100 border-0 shadow-custom">
              <Card.Header className="bg-secondary-custom border-0">
                <h6 className="mb-0 fw-semibold">Distribuição por Gênero</h6>
              </Card.Header>
              <Card.Body className="p-0">
                <iframe
                  src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697f96d-22ee-48b5-871d-fb08a93f831c&maxDataAge=3600&theme=${theme}&autoRefresh=true`}
                  frameBorder="0"
                  className="w-100"
                  style={{ height: "300px" }}
                  title="Gráfico de Distribuição por Gênero"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="h-100 border-0 shadow-custom">
              <Card.Header className="bg-secondary-custom border-0">
                <h6 className="mb-0 fw-semibold">Status dos Membros</h6>
              </Card.Header>
              <Card.Body className="p-0">
                <iframe
                  src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697fc6b-0a12-483e-8cb3-3ff11fc0d451&maxDataAge=3600&theme=${theme}&autoRefresh=true`}
                  frameBorder="0"
                  className="w-100"
                  style={{ height: "300px" }}
                  title="Gráfico de Status dos Membros"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Painel Completo */}
        <Row className="mb-4">
          <Col xs={12}>
            <Card className="border-0 shadow-custom">
              <Card.Header className="bg-secondary-custom border-0">
                <h6 className="mb-0 fw-semibold">Painel Geral de Membros</h6>
              </Card.Header>
              <Card.Body className="p-0">
                <iframe
                  src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=66982cc4-1232-4aea-8407-a721d3d95ec4&maxDataAge=3600&theme=${theme}&autoRefresh=true`}
                  frameBorder="0"
                  className="w-100"
                  style={{ height: "400px" }}
                  title="Painel Geral de Membros"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
};

export default Dashboard;
