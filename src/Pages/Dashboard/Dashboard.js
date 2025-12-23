import React, { useState, useContext, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import Datainfor from "../../Contexts/DataInfor";
import {
  LineChart,
  Line,
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
  AreaChart,
  Area,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faWallet,
  faUserCheck,
  faMale,
  faFemale,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [show, setShow] = useState("showOne");
  const { dados, dadosfinance } = useContext(Datainfor);

  // --- LÓGICA SOCIOECONÔMICA ---
  const socioStats = useMemo(() => {
    if (!dados)
      return { sex: [], civil: [], dizimista: [], timeline: [], cards: {} };

    const mesesNome = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const timelineMap = Array(12)
      .fill(0)
      .map((_, i) => ({ name: mesesNome[i], membros: 0 }));
    const sexMap = { Masculino: 0, Feminino: 0 };
    const civilMap = {};
    const dizimistaMap = { Sim: 0, Não: 0 };

    dados.forEach((m) => {
      if (m.datacriacao) {
        const partes = m.datacriacao.split("-");
        const mes = parseInt(partes[1]) - 1;
        if (mes >= 0 && mes < 12) timelineMap[mes].membros++;
      }
      if (m.sex) sexMap[m.sex] = (sexMap[m.sex] || 0) + 1;
      if (m.estadocivil)
        civilMap[m.estadocivil] = (civilMap[m.estadocivil] || 0) + 1;

      const diz = m.dizimista?.toLowerCase() === "sim" ? "Sim" : "Não";
      dizimistaMap[diz]++;
    });

    return {
      timeline: timelineMap,
      sex: Object.entries(sexMap).map(([name, value]) => ({ name, value })),
      civil: Object.entries(civilMap).map(([name, value]) => ({ name, value })),
      dizimista: Object.entries(dizimistaMap).map(([name, value]) => ({
        name,
        value,
      })),
      cards: {
        ativos: dados.filter((d) => d.cadAtivo !== false).length,
        homens: sexMap.Masculino,
        mulheres: sexMap.Feminino,
        total: dados.length,
      },
    };
  }, [dados]);

  // --- LÓGICA FINANCEIRA ---
  const finStats = useMemo(() => {
    if (!dadosfinance)
      return {
        mensal: [],
        categorias: [],
        status: [],
        totais: { r: 0, d: 0, l: 0 },
      };
    const mesesNome = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const mensal = mesesNome.map((m) => ({ name: m, receita: 0, despesa: 0 }));
    const catMap = {};
    const statusMap = { Pago: 0, Pendente: 0 };

    dadosfinance.forEach((item) => {
      const dataStr = item.datapagamento || "";
      const mesIdx = dataStr.includes("-")
        ? parseInt(dataStr.split("-")[1]) - 1
        : parseInt(dataStr.split("/")[1]) - 1;
      const valor = parseFloat(item.valor || 0);

      if (mesIdx >= 0 && mesIdx < 12) {
        if (item.tipodedado?.toLowerCase() === "receita")
          mensal[mesIdx].receita += valor;
        else if (item.tipodedado?.toLowerCase() === "despesa")
          mensal[mesIdx].despesa += valor;
      }
      const cat = item.tipolancamento || "Outros";
      catMap[cat] = (catMap[cat] || 0) + valor;

      const st =
        item.statuspagamento?.toLowerCase() === "pago" ? "Pago" : "Pendente";
      statusMap[st]++;
    });

    const totalR = mensal.reduce((acc, m) => acc + m.receita, 0);
    const totalD = mensal.reduce((acc, m) => acc + m.despesa, 0);

    return {
      mensal,
      categorias: Object.entries(catMap).map(([name, value]) => ({
        name,
        value,
      })),
      status: Object.entries(statusMap).map(([name, value]) => ({
        name,
        value,
      })),
      totais: { r: totalR, d: totalD, l: totalR - totalD },
    };
  }, [dadosfinance]);

  // --- PALETA DE AZUIS ---
  const BLUE_PALETTE = [
    "#0d6efd",
    "#0a58ca",
    "#3d8bfd",
    "#6ea8fe",
    "#9ec5fe",
    "#052c65",
  ];

  return (
    <div className="dashboard-fixed-wrapper">
      {/* 1. HEADER FIXO */}
      <header className="dashboard-sticky-header">
        <Container fluid>
          <Row className="align-items-center g-3">
            <Col md={7}>
              <h1>Dashboard</h1>
              <p>Dados para consulta</p>
            </Col>
            <Col md={5} className="text-end">
              <div className="d-inline-flex p-1 bg-tertiary-custom rounded-pill border-custom">
                <Button
                  variant={show === "showOne" ? "primary" : "link"}
                  className="rounded-pill px-4 text-decoration-none text-light"
                  onClick={() => setShow("showOne")}
                >
                  Socioeconômico
                </Button>
                <Button
                  variant={show === "showTwo" ? "primary" : "link"}
                  className="rounded-pill px-4 text-decoration-none text-light"
                  onClick={() => setShow("showTwo")}
                >
                  Financeiro
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* 2. CONTEÚDO COM SCROLL */}
      <main className="dashboard-scroll-content">
        <Container fluid>
          {show === "showOne" ? (
            <div className="animate__animated animate__fadeIn">
              <Row className="g-3 mb-4">
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center">
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      className="text-primary mb-2"
                      size="lg"
                    />
                    <h6>Ativos</h6>
                    <h3 className="fw-bold">{socioStats.cards.ativos}</h3>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center bg-primary text-white border-0 shadow-sm">
                    <FontAwesomeIcon icon={faMale} className="mb-2" size="lg" />
                    <h6>Homens</h6>
                    <h3 className="fw-bold">{socioStats.cards.homens}</h3>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center">
                    <FontAwesomeIcon
                      icon={faFemale}
                      className="text-primary mb-2 opacity-75"
                      size="lg"
                    />
                    <h6>Mulheres</h6>
                    <h3 className="fw-bold">{socioStats.cards.mulheres}</h3>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center">
                    <FontAwesomeIcon
                      icon={faHistory}
                      className="text-primary opacity-50 mb-2"
                      size="lg"
                    />
                    <h6>Total</h6>
                    <h3 className="fw-bold">{socioStats.cards.total}</h3>
                  </Card>
                </Col>
              </Row>
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="chart-premium-card p-4">
                    <h6 className="text-center mb-4 text-uppercase fw-bold text-muted small">
                      Crescimento de Membros
                    </h6>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <AreaChart data={socioStats.timeline}>
                          <defs>
                            <linearGradient
                              id="colorBlue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#0d6efd"
                                stopOpacity={0.4}
                              />
                              <stop
                                offset="95%"
                                stopColor="#0d6efd"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="var(--custom-border-color)"
                          />
                          <XAxis
                            dataKey="name"
                            stroke="var(--custom-text-muted)"
                          />
                          <YAxis stroke="var(--custom-text-muted)" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="membros"
                            stroke="#0d6efd"
                            fill="url(#colorBlue)"
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="chart-premium-card p-4 h-100">
                    <h6 className="text-center mb-3 small fw-bold">GÊNERO</h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={socioStats.sex}
                          innerRadius={50}
                          outerRadius={70}
                          dataKey="value"
                        >
                          {socioStats.sex.map((e, i) => (
                            <Cell key={i} fill={BLUE_PALETTE[i % 2]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="chart-premium-card p-4 h-100">
                    <h6 className="text-center mb-3 small fw-bold">
                      DIZIMISTAS
                    </h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={socioStats.dizimista}
                          outerRadius={70}
                          dataKey="value"
                        >
                          {socioStats.dizimista.map((e, i) => (
                            <Cell
                              key={i}
                              fill={e.name === "Sim" ? "#0d6efd" : "#9ec5fe"}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="chart-premium-card p-4 h-100">
                    <h6 className="text-center mb-3 small fw-bold">
                      ESTADO CIVIL
                    </h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={socioStats.civil}>
                        <XAxis
                          dataKey="name"
                          fontSize={10}
                          stroke="var(--custom-text-muted)"
                        />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Bar
                          dataKey="value"
                          fill="#3d8bfd"
                          radius={[4, 4, 0, 0]}
                          barSize={25}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn">
              <Row className="g-3 mb-4">
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center">
                    <h6>Receita</h6>
                    <h3 className="text-primary fw-bold">
                      R$ {finStats.totais.r.toLocaleString()}
                    </h3>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center">
                    <h6>Despesas</h6>
                    <h3 className="text-primary opacity-75 fw-bold">
                      R$ {finStats.totais.d.toLocaleString()}
                    </h3>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center">
                    <h6>Lucro</h6>
                    <h3 className="text-primary opacity-50 fw-bold">
                      R$ {finStats.totais.l.toLocaleString()}
                    </h3>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="chart-premium-card p-3 text-center bg-primary text-white border-0 shadow-sm">
                    <h6>Saldo Total</h6>
                    <h3 className="fw-bold">
                      R$ {finStats.totais.l.toLocaleString()}
                    </h3>
                  </Card>
                </Col>
              </Row>
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="chart-premium-card p-4">
                    <h6 className="text-center mb-4 text-uppercase fw-bold text-muted small">
                      Fluxo de Caixa (Saídas)
                    </h6>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <LineChart data={finStats.mensal}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="var(--custom-border-color)"
                          />
                          <XAxis
                            dataKey="name"
                            stroke="var(--custom-text-muted)"
                          />
                          <YAxis stroke="var(--custom-text-muted)" />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="despesa"
                            stroke="#0d6efd"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#052c65" }}
                            name="Gastos"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="chart-premium-card p-4 h-100">
                    <h6>CATEGORIAS</h6>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={finStats.categorias}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {finStats.categorias.map((e, i) => (
                            <Cell
                              key={i}
                              fill={BLUE_PALETTE[i % BLUE_PALETTE.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="chart-premium-card p-4 h-100">
                    <h6>ARRECADAÇÃO MENSAL</h6>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={finStats.mensal}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="var(--custom-border-color)"
                        />
                        <XAxis
                          dataKey="name"
                          stroke="var(--custom-text-muted)"
                        />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Bar
                          dataKey="receita"
                          fill="#0d6efd"
                          radius={[5, 5, 0, 0]}
                          barSize={40}
                          name="Entradas"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
