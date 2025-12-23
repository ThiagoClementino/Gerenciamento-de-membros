import React, { useState, useContext, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import DataInfor from "../../Contexts/DataInfor"; // Nome corrigido conforme importação
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
  faMoon,
  faSun,
  faArrowUp,
  faArrowDown,
  faChartLine,
  faUsers,
  faWallet,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [show, setShow] = useState("showOne");
  const [theme, setTheme] = useState("dark");
  const { dados, dadosfinance } = useContext(DataInfor);

  // Sincroniza o tema com o atributo nativo do Bootstrap 5.3
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  // Paleta de cores dinâmica para os gráficos
  const COLORS = ["#0d6efd", "#6ea8fe", "#0dcaf0", "#3d8bfd", "#052c65"];
  const chartConfig = useMemo(
    () => ({
      stroke: theme === "dark" ? "#444" : "#dee2e6",
      text: theme === "dark" ? "#adb5bd" : "#495057",
      grid: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    }),
    [theme]
  );

  // --- Lógica Socioeconômica (Preservada) ---
  const socioStats = useMemo(() => {
    if (!dados) return { sex: [], timeline: [], cards: {} };
    const meses = [
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
    const timelineMap = meses.map((m) => ({ name: m, membros: 0 }));
    const sexMap = { Masculino: 0, Feminino: 0 };

    dados.forEach((m) => {
      if (m.datacriacao) {
        const mes = parseInt(m.datacriacao.split("-")[1]) - 1;
        if (mes >= 0 && mes < 12) timelineMap[mes].membros++;
      }
      if (m.sex) sexMap[m.sex] = (sexMap[m.sex] || 0) + 1;
    });

    return {
      timeline: timelineMap,
      sex: Object.entries(sexMap).map(([name, value]) => ({ name, value })),
      cards: {
        ativos: dados.filter((d) => d.cadAtivo !== false).length,
        homens: sexMap.Masculino,
        mulheres: sexMap.Feminino,
        total: dados.length,
      },
    };
  }, [dados]);

  // --- Lógica Financeira (Preservada) ---
  const finStats = useMemo(() => {
    if (!dadosfinance) return { mensal: [], totais: { r: 0, d: 0, l: 0 } };
    const meses = [
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
    const mensal = meses.map((m) => ({ name: m, receita: 0, despesa: 0 }));

    dadosfinance.forEach((item) => {
      const mesIdx =
        parseInt(
          item.datapagamento?.split("-")[1] || item.datapagamento?.split("/")[1]
        ) - 1;
      const valor = parseFloat(item.valor || 0);
      if (mesIdx >= 0 && mesIdx < 12) {
        if (item.tipodedado?.toLowerCase() === "receita")
          mensal[mesIdx].receita += valor;
        else if (item.tipodedado?.toLowerCase() === "despesa")
          mensal[mesIdx].despesa += valor;
      }
    });

    const totalR = mensal.reduce((acc, m) => acc + m.receita, 0);
    const totalD = mensal.reduce((acc, m) => acc + m.despesa, 0);
    return { mensal, totais: { r: totalR, d: totalD, l: totalR - totalD } };
  }, [dadosfinance]);

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden bg-body text-body">
      {/* HEADER FIXO */}
      <header className="py-3 px-4 border-bottom bg-body-tertiary shadow-sm z-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={4}>
              <h2 className="fw-bold mb-0 h4">Painel de Gestão</h2>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <div className="btn-group p-1 bg-body border rounded-pill shadow-sm">
                <Button
                  variant={show === "showOne" ? "primary" : "link"}
                  className="rounded-pill px-4 border-0 text-decoration-none"
                  onClick={() => setShow("showOne")}
                >
                  Social
                </Button>
                <Button
                  variant={show === "showTwo" ? "primary" : "link"}
                  className="rounded-pill px-4 border-0 text-decoration-none"
                  onClick={() => setShow("showTwo")}
                >
                  Financeiro
                </Button>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <Button
                variant="outline-secondary"
                className="rounded-circle border-0 shadow-sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ÁREA DE SCROLL INTERNO */}
      <main className="flex-grow-1 overflow-auto p-4">
        <Container fluid>
          {show === "showOne" ? (
            <div className="animate-fade-in">
              <Row className="g-3 mb-4">
                <StatCard
                  label="Membros Ativos"
                  val={socioStats.cards.ativos}
                  icon={faUsers}
                  color="text-primary"
                />
                <StatCard
                  label="Homens"
                  val={socioStats.cards.homens}
                  icon={faArrowUp}
                  color="text-info"
                />
                <StatCard
                  label="Mulheres"
                  val={socioStats.cards.mulheres}
                  icon={faArrowDown}
                  color="text-danger"
                />
                <StatCard
                  label="Total Geral"
                  val={socioStats.cards.total}
                  icon={faCheckCircle}
                  color="text-success"
                />
              </Row>

              <Row className="g-4">
                <Col md={8}>
                  <Card className="border shadow-sm rounded-4 bg-body-tertiary h-100 p-4">
                    <h6 className="fw-bold text-secondary text-uppercase mb-4">
                      Crescimento Anual
                    </h6>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={socioStats.timeline}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke={chartConfig.grid}
                        />
                        <XAxis
                          dataKey="name"
                          stroke={chartConfig.text}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke={chartConfig.text}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--bs-body-bg)",
                            borderColor: "var(--bs-border-color)",
                            borderRadius: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="membros"
                          stroke="#0d6efd"
                          fillOpacity={0.1}
                          fill="#0d6efd"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border shadow-sm rounded-4 bg-body-tertiary h-100 p-4">
                    <h6 className="fw-bold text-secondary text-uppercase mb-4 text-center">
                      Distribuição Gênero
                    </h6>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={socioStats.sex}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {socioStats.sex.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="animate-fade-in">
              <Row className="g-3 mb-4">
                <StatCard
                  label="Receitas"
                  val={`R$ ${finStats.totais.r.toLocaleString()}`}
                  icon={faArrowUp}
                  color="text-success"
                />
                <StatCard
                  label="Despesas"
                  val={`R$ ${finStats.totais.d.toLocaleString()}`}
                  icon={faArrowDown}
                  color="text-danger"
                />
                <StatCard
                  label="Lucro"
                  val={`R$ ${finStats.totais.l.toLocaleString()}`}
                  icon={faChartLine}
                  color="text-info"
                />
                <StatCard
                  label="Saldo"
                  val={`R$ ${finStats.totais.l.toLocaleString()}`}
                  icon={faWallet}
                  color="text-primary"
                />
              </Row>

              <Card className="border shadow-sm rounded-4 bg-body-tertiary p-4 mb-4">
                <h6 className="fw-bold text-secondary text-uppercase mb-4">
                  Fluxo de Caixa Mensal
                </h6>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={finStats.mensal}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={chartConfig.grid}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={chartConfig.text}
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={chartConfig.text}
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bs-body-bg)",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="receita"
                      fill="#198754"
                      radius={[4, 4, 0, 0]}
                      name="Entradas"
                    />
                    <Bar
                      dataKey="despesa"
                      fill="#dc3545"
                      radius={[4, 4, 0, 0]}
                      name="Saídas"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </Container>
      </main>

      {/* FOOTER FIXO */}
      <footer className="py-2 px-4 border-top bg-body-tertiary text-secondary small">
        <Container fluid className="d-flex justify-content-between">
          <span>Sistema Eclesiástico Premium • 2025</span>
          <span>
            Tema: <strong className="text-uppercase">{theme}</strong>
          </span>
        </Container>
      </footer>
    </div>
  );
};

// Componente Interno para Cards de Estatística
const StatCard = ({ label, val, icon, color }) => (
  <Col md={3}>
    <Card className="border shadow-sm rounded-4 bg-body-tertiary">
      <Card.Body className="d-flex align-items-center p-3">
        <div
          className="bg-body p-3 rounded-circle border me-3 d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "52px", height: "52px" }}
        >
          <FontAwesomeIcon icon={icon} className={color} size="lg" />
        </div>
        <div>
          <p className="small text-secondary fw-bold text-uppercase mb-0">
            {label}
          </p>
          <h4 className="fw-bold mb-0">{val}</h4>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default Dashboard;
