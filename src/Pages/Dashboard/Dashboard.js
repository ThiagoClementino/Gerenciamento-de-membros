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
import "../../css/dashboard.css";

const Dashboard = () => {
  const { dados } = React.useContext(Datainfor);
  const [data, setData] = useState(new Date());
  const { theme } = useTheme();

  useEffect(() => {
    const timerID = setInterval(() => setData(new Date()), 1000);
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
    (d) => d.sex?.toLowerCase() === "masculino"
  ).length;
  const Feminino = dados.filter(
    (d) => d.sex?.toLowerCase() === "feminino"
  ).length;
  const ativos = dados.filter((d) => d.cad === true).length;

  return (
    /* CONTAINER PRINCIPAL: d-flex garante lado a lado */
    <div className="main-layout-wrapper d-flex">
      {/* SIDEBAR: Fixa na lateral esquerda */}
      <Header />

      {/* ÁREA DO DASHBOARD: flex-grow-1 ocupa todo o resto da tela */}
      <div className="dashboard-content-area flex-grow-1 w-100 h-100">
        <Container fluid className="p-4">
          <div className="dashboard-header mb-4 h-auto">
            <Row className="align-items-center">
              <Col>
                <h1 className="h3 mb-1 fw-bold">Dashboard</h1>
                <p className="text-secondary small">
                  Análise em tempo real dos membros
                </p>
              </Col>
              <Col xs="auto" className="text-end">
                <div className="bg-white p-2 rounded shadow-sm border">
                  <span className="small text-muted d-block">
                    Atualizado em:
                  </span>
                  <span className="fw-bold text-primary">
                    {formatarData(data)}
                  </span>
                </div>
              </Col>
            </Row>
          </div>

          {/* Cards de Estatísticas */}
          <Row className="g-3 mb-4">
            {[
              { t: "Total", v: dados.length, i: faPeopleGroup, c: "#3b82f6" },
              { t: "Ativos", v: ativos, i: faPeopleLine, c: "#6366f1" },
              { t: "Homens", v: Masculino, i: faChildReaching, c: "#0ea5e9" },
              { t: "Mulheres", v: Feminino, i: faChildDress, c: "#10b981" },
            ].map((s, i) => (
              <Col key={i} xs={12} sm={6} lg={3}>
                <Card className="border-0 shadow-sm h-75">
                  <Card.Body className="d-flex align-items-center p-3">
                    <div
                      className="me-3 p-3 rounded-circle"
                      style={{ backgroundColor: `${s.c}15` }}
                    >
                      <FontAwesomeIcon
                        icon={s.i}
                        style={{ color: s.c }}
                        size="lg"
                      />
                    </div>
                    <div>
                      <h6 className="text-muted small mb-1">{s.t}</h6>
                      <h3 className="mb-0 fw-bold">{s.v}</h3>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ÁREA DOS GRÁFICOS COM SCROLL INTERNO */}
          <Card className="border-0 shadow-sm mb-4 overflow-overflow-y-auto h-75">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Gráficos Analíticos</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <div className="charts-scroll-viewport">
                <Row className="g-4">
                  <Col xs={12} lg={6}>
                    <div className="p-2 border rounded bg-light">
                      <iframe
                        src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697f96d-22ee-48b5-871d-fb08a93f831c&theme=${theme}`}
                        className="w-100 border-0"
                        style={{ height: "350px" }}
                        title="Gênero"
                      />
                    </div>
                  </Col>
                  <Col xs={12} lg={6}>
                    <div className="p-2 border rounded bg-light">
                      <iframe
                        src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697fc6b-0a12-483e-8cb3-3ff11fc0d451&theme=${theme}`}
                        className="w-100 border-0"
                        style={{ height: "350px" }}
                        title="Status"
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="p-2 border rounded bg-light">
                      <iframe
                        src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=66982cc4-1232-4aea-8407-a721d3d95ec4&theme=${theme}`}
                        className="w-100 border-0"
                        style={{ height: "500px" }}
                        title="Geral"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>

          <Footer />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
