import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Contexto para compartilhar os dados com toda a aplicação
import Datainfor from "./Contexts/DataInfor";

// Componentes e Páginas
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Membros from "./Pages/Membros/Membros";
import Cadastro from "./Pages/Cadastro/Cadastro";
import { Financeiro } from "./Pages/Financeiro/Financeiro";
import Sidebar from "./Pages/Header/Sidebar";
import MembroMinisterio from "./Pages/Membros/MembroMinisterio";
import Home from "./Pages/Home/Home";
import Config from "./Pages/Config/Config";
import CadMembers from "./Pages/Membros/CadMembers";
import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/Users/CreateUser";
import { Comprovantes } from "./Pages/Financeiro/Comprovantes";

const AppRoutes = () => {
  // --- ESTADOS CORRIGIDOS E ESPECÍFICOS ---
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [listaMembros, setListaMembros] = useState([]);
  const [dadosFinanceiro, setDadosFinanceiro] = useState([]);
  const [erro, setErro] = useState(null);

  // --- LÓGICA DE BUSCA DE DADOS CORRIGIDA ---
  useEffect(() => {
    const apiUrl = "https://api-gestao-igreja-jcod.vercel.app/membros/";

    fetch(apiUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição de membros: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // CORREÇÃO: 'data' é o objeto { count: XX, results: [...] }

        // 1. Preenche o estado do Dashboard com a contagem
        setDadosDashboard({
          contagemMembros: data.count,
        });

        // 2. Preenche o estado da lista de membros com o array de resultados
        setListaMembros(data.results);
      })
      .catch((error) => {
        console.error("Falha ao buscar dados dos membros:", error);
        setErro("Não foi possível carregar os dados dos membros.");
      });
  }, []); // Array vazio [] para rodar apenas uma vez.

  // Efeito para buscar dados financeiros (seu código já estava bom aqui)
  useEffect(() => {
    const apiUrl = "https://api-gestao-igreja-jcod.vercel.app/finance/";
    fetch(apiUrl, {
      /* ... */
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDadosFinanceiro(data);
        }
      })
      .catch((error) => {
        console.error("Falha ao buscar dados financeiros:", error);
        setErro("Não foi possível carregar os dados financeiros.");
      });
  }, []);

  return (
    // --- CONTEXTO CORRIGIDO ---
    // O Provider agora fornece todos os estados de forma organizada.
    <Datainfor.Provider
      value={{
        dadosDashboard,
        listaMembros,
        dadosFinanceiro,
        erro,
        setListaMembros, // Exemplo de como passar uma função 'set'
      }}
    >
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/criarusuario" element={<CreateUser />} />

        {/* Rotas Privadas (Protegidas) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/membros"
          element={
            <PrivateRoute>
              <Membros />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <PrivateRoute>
              <Cadastro />
            </PrivateRoute>
          }
        />
        <Route
          path="/financeiro"
          element={
            <PrivateRoute>
              <Financeiro />
            </PrivateRoute>
          }
        />
        <Route
          path="/sidebar"
          element={
            <PrivateRoute>
              <Sidebar />
            </PrivateRoute>
          }
        />
        <Route
          path="/membro/:id"
          element={
            <PrivateRoute>
              <MembroMinisterio />
            </PrivateRoute>
          }
        />
        <Route
          path="/config"
          element={
            <PrivateRoute>
              <Config />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cad"
          element={
            <PrivateRoute>
              <CadMembers />
            </PrivateRoute>
          }
        />
        <Route
          path="/comprovante"
          element={
            <PrivateRoute>
              <Comprovantes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Datainfor.Provider>
  );
};

export default AppRoutes;
