import React, { useState, useContext, useMemo } from "react";
import { Card, CardGroup, Container, Row, Col } from "react-bootstrap";
import Datainfor from "../../Contexts/DataInfor";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [show, setShow] = useState("showOne");
  const { dados, dadosfinance } = useContext(Datainfor); // 'dados' refere-se aos membros

  // --- LÓGICA DE TRATAMENTO DE DADOS SOCIOECONÔMICOS ---
  const socioStats = useMemo(() => {
    if (!dados)
      return { porSexo: [], porEstadoCivil: [], porDizimista: [], totais: {} };

    // 1. Processamento por Sexo
    const sexoMap = dados.reduce((acc, curr) => {
      const s = curr.sex || "Não Informado";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    // 2. Processamento por Estado Civil
    const civilMap = dados.reduce((acc, curr) => {
      const estado = curr.estadocivil || "Outros";
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});

    // 3. Processamento Dizimistas (Sim/Não)
    const dizimistaMap = dados.reduce((acc, curr) => {
      const status =
        curr.dizimista?.toLowerCase() === "sim" ? "Dizimista" : "Não Dizimista";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      porSexo: Object.entries(sexoMap).map(([name, value]) => ({
        name,
        value,
      })),
      porEstadoCivil: Object.entries(civilMap).map(([name, value]) => ({
        name,
        value,
      })),
      porDizimista: Object.entries(dizimistaMap).map(([name, value]) => ({
        name,
        value,
      })),
      ativos: dados.filter((d) => d.cadAtivo).length,
      total: dados.length,
    };
  }, [dados]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="content-wrapper">
      <div className="content-container p-3">
        {/* BUSCADOR ORIGINAL MANTIDO */}
        <div className="p-3 d-flex gap-2">
          <label htmlFor="buscador">
            <i className="bi bi-speaker-fill"></i>
          </label>
          <input
            type="search"
            id="buscador"
            className="form-control"
            placeholder="Buscar..."
          />
          <button type="button" className="btn btn-primary">
            Buscar
          </button>
        </div>

        {/* CARDS DE SELEÇÃO */}
        <nav className="mb-4">
          <CardGroup className="shadow-sm">
            <Card
              role="button"
              onClick={() => setShow("showOne")}
              className={show === "showOne" ? "bg-light border-primary" : ""}
            >
              <Card.Body>
                <Card.Title>Dados Socioeconômicos</Card.Title>
              </Card.Body>
            </Card>
            <Card
              role="button"
              onClick={() => setShow("showTwo")}
              className={show === "showTwo" ? "bg-light border-primary" : ""}
            >
              <Card.Body>
                <Card.Title>Dados Financeiros</Card.Title>
              </Card.Body>
            </Card>
          </CardGroup>
        </nav>

        {/* CONTAINER 1: SOCIOECONÔMICO */}
        {show === "showOne" && (
          <section className="mt-4 animate__animated animate__fadeIn">
            <h1 className="mb-4 text-primary-custom fw-bold">
              Dados Socioeconômicos
            </h1>

            {/* CARDS DE RESUMO RÁPIDO */}
            <Row className="g-3 mb-4">
              <Col md={4}>
                <div className="box p-3 border shadow-sm bg-white text-center">
                  <small className="text-muted uppercase">
                    Total de Membros
                  </small>
                  <h3 className="fw-bold">{socioStats.total}</h3>
                </div>
              </Col>
              <Col md={4}>
                <div className="box p-3 border shadow-sm bg-primary text-white text-center">
                  <small className="uppercase">Cadastros Ativos</small>
                  <h3 className="fw-bold">{socioStats.ativos}</h3>
                </div>
              </Col>
              <Col md={4}>
                <div className="box p-3 border shadow-sm bg-white text-center">
                  <small className="text-muted uppercase">Inativos</small>
                  <h3 className="fw-bold text-danger">
                    {socioStats.total - socioStats.ativos}
                  </h3>
                </div>
              </Col>
            </Row>

            <Row className="g-4">
              {/* 1. GRÁFICO DE ROSCA: SEXO (Lado a Lado) */}
              <Col md={6}>
                <Card className="p-3 border-0 shadow-sm h-100">
                  <Card.Title className="text-muted small fw-bold uppercase text-center">
                    Distribuição por Sexo
                  </Card.Title>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={socioStats.porSexo}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {socioStats.porSexo.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "Masculino"
                                  ? "#0088FE"
                                  : "#FF8042"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* 2. GRÁFICO DE PIZZA: DIZIMISTAS (Lado a Lado) */}
              <Col md={6}>
                <Card className="p-3 border-0 shadow-sm h-100">
                  <Card.Title className="text-muted small fw-bold uppercase text-center">
                    Fidelidade: Dizimistas
                  </Card.Title>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={socioStats.porDizimista}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {socioStats.porDizimista.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "Dizimista"
                                  ? "#198754"
                                  : "#adb5bd"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* 3. GRÁFICO DE BARRAS: ESTADO CIVIL (100% largura) */}
              <Col xs={12}>
                <Card className="p-3 border-0 shadow-sm">
                  <Card.Title className="text-muted small fw-bold uppercase">
                    Membros por Estado Civil
                  </Card.Title>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={socioStats.porEstadoCivil}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill="#6366f1"
                          radius={[4, 4, 0, 0]}
                          name="Quantidade"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>
        )}

        {/* CONTAINER 2: FINANCEIRO (Mantendo sua lógica anterior) */}
        {show === "showTwo" && (
          <section className="mt-4">
            {/* O código que já fizemos para o financeiro entra aqui */}
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
