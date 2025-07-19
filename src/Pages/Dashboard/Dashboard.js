import React from "react";
import Sidebar from "../Header/Sidebar";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [dadosEducacao, setDadosEducacao] = useState([]);

  // Cores para os gráficos
  const cores = {
    Masculino: "#0d6efd",
    Feminino: "#d63384",
    M: "#0d6efd",
    F: "#d63384",
    Outro: "#6c757d",
    "Não Informado": "#adb5bd",
  };

  // Cores para o gráfico de educação
  const coresEducacao = {
    "Ensino Fundamental": "#28a745",
    "Ensino Médio": "#ffc107",
    "Ensino Superior": "#17a2b8",
    "Não Informado": "#6c757d",
  };

  // Função para buscar dados da API
  const buscarDados = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://api-gestao-igreja-jcod.vercel.app/membros/"
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const dados = await response.json();
      setMembros(dados);

      // Processar dados do campo 'sex'
      const dadosProcessados = processarDadosSexo(dados);
      setDadosGrafico(dadosProcessados);

      // Processar dados do campo 'education'
      const dadosEducacaoProcessados = processarDadosEducacao(dados);
      setDadosEducacao(dadosEducacaoProcessados);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para processar os dados do campo 'sex'
  const processarDadosSexo = (dados) => {
    const contadores = {};

    dados.forEach((membro) => {
      let sexo = membro.sex || "Não Informado";

      // Normalizar os valores
      if (sexo === "M" || sexo === "Masculino" || sexo === "masculino") {
        sexo = "Masculino";
      } else if (sexo === "F" || sexo === "Feminino" || sexo === "feminino") {
        sexo = "Feminino";
      } else if (sexo === "" || sexo === null || sexo === undefined) {
        sexo = "Não Informado";
      }

      contadores[sexo] = (contadores[sexo] || 0) + 1;
    });

    // Converter para array para os gráficos
    return Object.entries(contadores).map(([sexo, quantidade]) => ({
      name: sexo, // Esta é a chave que aparece na legenda
      sexo,
      quantidade,
      cor: cores[sexo] || cores["Outro"],
      porcentagem: ((quantidade / dados.length) * 100).toFixed(1),
    }));
  };

  // Função para processar os dados do campo 'education'
  const processarDadosEducacao = (dados) => {
    const contadores = {};

    dados.forEach((membro) => {
      let educacao = membro.education || "Não Informado";

      // Normalizar os valores
      if (educacao === "" || educacao === null || educacao === undefined) {
        educacao = "Não Informado";
      }

      contadores[educacao] = (contadores[educacao] || 0) + 1;
    });

    // Converter para array para os gráficos
    return Object.entries(contadores).map(([educacao, quantidade]) => ({
      educacao,
      quantidade,
      cor: coresEducacao[educacao] || coresEducacao["Não Informado"],
      porcentagem: ((quantidade / dados.length) * 100).toFixed(1),
    }));
  };

  // Hook para buscar dados ao carregar o componente
  useEffect(() => {
    buscarDados();
  }, []);

  // Função para renderizar labels customizados no gráfico de pizza
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Carregando...</span>
            </div>
            <h4 className="mt-3">Carregando dados dos membros...</h4>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Erro ao carregar dados
              </h4>
              <p>Não foi possível conectar com a API: {error}</p>
              <button className="btn btn-outline-danger" onClick={buscarDados}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalMembros = membros.length;
  const masculino =
    dadosGrafico.find((item) => item.sexo === "Masculino")?.quantidade || 0;
  const feminino =
    dadosGrafico.find((item) => item.sexo === "Feminino")?.quantidade || 0;
  const naoInformado =
    dadosGrafico.find((item) => item.sexo === "Não Informado")?.quantidade || 0;

  return (
    <div className="vh-100 d-flex">
      <div className="d-flex flex-column">
        <Sidebar />
      </div>
      <Container className="d-flex flex-column flex-grow-1 p-3 justify-content-center w-100 ">
        <Row className="g-3 ">
          {" "}
          {/* g-3 para espaçamento entre colunas */}
          <Col xs={12} sm={6} md={3}>
            {" "}
            {/* Responsivo: 1 por linha no mobile, 4 no desktop */}
            <Card className="shadow-lg border-0 p-3 h-100 d-flex justify-content-center">
              <div>
                <h6 className="card-title">Total de Membros</h6>
                <h3 className="mb-0">{totalMembros}</h3>
              </div>
              <i
                className="bi bi-people"
                style={{ fontSize: "2.5rem", opacity: 0.8 }}
              ></i>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="shadow-lg border-0 p-3 h-100 d-flex justify-content-center">
              <div>
                <h6 className="card-title">Masculino</h6>
                <h3 className="mb-0">{masculino}</h3>
                <small>
                  {totalMembros > 0
                    ? ((masculino / totalMembros) * 100).toFixed(1)
                    : 0}
                  %
                </small>
              </div>
              <i
                className="bi bi-person"
                style={{ fontSize: "2.5rem", opacity: 0.8 }}
              ></i>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="shadow-lg border-0 p-3 h-100 d-flex justify-content-center">
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="card-title">Feminino</h6>
                  <h3 className="mb-0">{feminino}</h3>
                  <small>
                    {totalMembros > 0
                      ? ((feminino / totalMembros) * 100).toFixed(1)
                      : 0}
                    %
                  </small>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="shadow-lg border-0 p-3 h-100 d-flex justify-content-center">
              <div>
                <h6 className="card-title">Não Informado</h6>
                <h3 className="mb-0">{naoInformado}</h3>
                <small>
                  {totalMembros > 0
                    ? ((naoInformado / totalMembros) * 100).toFixed(1)
                    : 0}
                  %
                </small>
              </div>
              <i
                className="bi bi-question-circle"
                style={{ fontSize: "2.5rem", opacity: 0.8 }}
              ></i>
            </Card>
          </Col>
        </Row>
        <Row className="g-3 mt-3">
          {" "}
          {/* g-3 para espaçamento entre colunas */}
          <Col xs={12} sm={6} md={6}>
            {" "}
            {/* Responsivo: 1 por linha no mobile, 4 no desktop */}
            <Card className="shadow-lg border-0 p-3 h-100 d-flex justify-content-center">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="quantidade"
                  >
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} membros`,
                      "Quantidade",
                    ]}
                    labelFormatter={(label) => `Sexo: ${label}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6}>
            <Card className="shadow-lg border-0 p-3 h-100">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-mortarboard fs-2 text-success me-2"></i>
                <h4 className="mb-0">Nível de Educação</h4>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={dadosEducacao}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="educacao"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} membros`,
                      "Quantidade",
                    ]}
                    labelFormatter={(label) => `Educação: ${label}`}
                  />
                  <Bar
                    dataKey="quantidade"
                    fill="#28a745"
                    radius={[4, 4, 0, 0]}
                  >
                    {dadosEducacao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
