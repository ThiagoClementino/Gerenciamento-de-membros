import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Membros from "./Pages/Membros/Membros";
import Cadastro from "./Pages/Cadastro/Cadastro";
import { Financeiro } from "./Pages/Financeiro/Financeiro";
import MembroMinisterio from "./Pages/Membros/MembroMinisterio";
import Home from "./Pages/Home/Home";
import Config from "./Pages/Config/Config";
import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/Users/CreateUser";
import TransacaoFinanceiro from "./Pages/Financeiro/TransacaoFinanceiro";
import PrivateRoute from "./Components/PrivateRoute";
import ResetPassword from "./Pages/RecuperarSenha/ResetPassword";
import ChangePassword from "./Pages/RecuperarSenha/ChangePassword";
import ForgotPassword from "./Pages/RecuperarSenha/ForgotPassword";
import MainLayout from "./Components/MainLayout"; // Componente de Layout Global
import Datainfor from "./Contexts/DataInfor";
import DataApiOne from "./Contexts/DataApiOne";
import MemMinisterio from "./Pages/Membros/MemMinisterio";
import Membresia from "./Pages/Membros/Membresia";

const AppRoutes = () => {
  const [dados, setDados] = useState([]);
  const [dadosfinance, setDadosfinance] = useState([]);

  useEffect(() => {
    fetch("https://api-gestao-igreja-jcod.vercel.app/membros", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDados(data);
        } else {
          console.error("Dados da API não é um array");
        }
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error),
      );
  }, []);

  useEffect(() => {
    fetch("https://api-gestao-igreja-jcod.vercel.app/finance", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDadosfinance(data);
        } else {
          console.error(`error`);
        }
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error),
      );
  }, []);

  return (
    <DataApiOne.Provider value={{}}>
      <Datainfor.Provider
        value={{ dadosfinance, setDadosfinance, dados, setDados }}
      >
        <Routes>
          {/* 1. Rotas Públicas: Sem menu, sem proteção */}
          <Route path="/" element={<Login />} />
          <Route path="/criarusuario" element={<CreateUser />} />
          <Route path="/redefinirsenha" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/changepassword" element={<ChangePassword />} />

          {/* 2. Rotas Privadas: Com Sidebar (MainLayout) e Protegidas */}
          <Route
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            {/* Tudo que estiver aqui dentro mostrará a Sidebar automaticamente */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/membros" element={<Membros />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/membro/:id" element={<MembroMinisterio />} />
            <Route path="/financeiro/:id" element={<TransacaoFinanceiro />} />
            <Route path="/config" element={<Config />} />
            <Route path="/home" element={<Home />} />

            {/* MOVIDAS PARA DENTRO DO LAYOUT AQUI: */}
            <Route path="/membrosministerio" element={<MemMinisterio />} />
            <Route path="/membresia" element={<Membresia />} />
          </Route>
        </Routes>
      </Datainfor.Provider>
    </DataApiOne.Provider>
  );
};

export default AppRoutes;
