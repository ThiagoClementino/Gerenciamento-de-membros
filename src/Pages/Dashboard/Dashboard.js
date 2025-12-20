import React, { useState, useEffect } from "react";

import { Row, Col, Card } from "react-bootstrap";
import Datainfor from "../../Contexts/DataInfor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChildDress,
  faChildReaching,
  faPeopleGroup,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import { useTheme } from "../../Contexts/ThemeContext";

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
    <div
      className="main-layout-wrapper d-flex"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div className="dashboard-content-area flex-grow-1 d-flex flex-column">
        {/* 1. Cabeçalho da Página (Fixo) */}
        <div className="fixed-top-section">
          <Row className="align-items-center mb-3">
            <Col>
              <h1 className="h3 mb-1 fw-bold">Dashboard</h1>
              <p className="text-secondary small">Análise em tempo real</p>
            </Col>
            <Col xs="auto">
              <div className="bg-white p-2 rounded shadow-sm border small fw-bold text-primary">
                {formatarData(data)}
              </div>
            </Col>
          </Row>

          {/* 2. Cards de Estatísticas (FIXOS) */}
          <Row className="g-3 mb-2">
            {[
              { t: "Total", v: dados.length, i: faPeopleGroup, c: "#3b82f6" },
              { t: "Ativos", v: ativos, i: faPeopleLine, c: "#6366f1" },
              { t: "Homens", v: Masculino, i: faChildReaching, c: "#0ea5e9" },
              { t: "Mulheres", v: Feminino, i: faChildDress, c: "#10b981" },
            ].map((s, i) => (
              <Col key={i} xs={12} sm={6} lg={3}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="d-flex align-items-center p-3">
                    <div
                      className="me-3 p-2 rounded-circle"
                      style={{ backgroundColor: `${s.c}15` }}
                    >
                      <FontAwesomeIcon icon={s.i} style={{ color: s.c }} />
                    </div>
                    <div>
                      <h6 className="text-muted small mb-0">{s.t}</h6>
                      <h4 className="mb-0 fw-bold">{s.v}</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <hr />
        </div>

        {/* 3. Área de Gráficos (ROLÁVEL) */}
        <div className="scrollable-content-section">
          <Row className="g-4">
            <Col xs={12} lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <iframe
                    src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697f96d-22ee-48b5-871d-fb08a93f831c&theme=${theme}`}
                    className="w-100 border-0"
                    style={{ height: "350px" }}
                    title="Gênero"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <iframe
                    src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697fc6b-0a12-483e-8cb3-3ff11fc0d451&theme=${theme}`}
                    className="w-100 border-0"
                    style={{ height: "350px" }}
                    title="Status"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <iframe
                    src={`https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=66982cc4-1232-4aea-8407-a721d3d95ec4&theme=${theme}`}
                    className="w-100 border-0"
                    style={{ height: "500px" }}
                    title="Geral"
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
