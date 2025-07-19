import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Header/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Charts = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-gestao-igreja-jcod.vercel.app/membros")
      .then((res) => {
        const membros = res.data;

        // Contar quantos são masculinos e femininos
        const contagem = membros.reduce(
          (acc, membro) => {
            const sexo = membro.sex?.toLowerCase(); // Certifica-se de que está em minúsculas
            if (sexo === "masculino") acc.masculino += 1;
            else if (sexo === "feminino") acc.feminino += 1;
            return acc;
          },
          { masculino: 0, feminino: 0 }
        );

        const dadosGrafico = [
          { sexo: "Masculino", total: contagem.masculino },
          { sexo: "Feminino", total: contagem.feminino },
        ];

        setChartData(dadosGrafico);
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "1rem" }}>
        <h2>Distribuição de Membros por Sexo</h2>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sexo" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
