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
        console.error("There was a problem with the fetch operation:", error)
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
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  return (
    <DataApiOne.Provider value={{}}>
      <Datainfor.Provider
        value={{ dadosfinance, setDadosfinance, dados, setDados }}
      >
        <Routes>
          {/* Rotas Públicas (Sem Sidebar/Footer) */}
          <Route path="/" element={<Login />} />
          <Route path="/criarusuario" element={<CreateUser />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/redefinirsenha" element={<ForgotPassword />} />

          {/* Rotas Privadas com Layout Global (Sidebar e Footer Fixos) */}
          <Route element={<MainLayout />}>
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
              path="/membro/:id"
              element={
                <PrivateRoute>
                  <MembroMinisterio />
                </PrivateRoute>
              }
            />
            <Route
              path="/financeiro/:id"
              element={
                <PrivateRoute>
                  <TransacaoFinanceiro />
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
          </Route>
        </Routes>
      </Datainfor.Provider>
    </DataApiOne.Provider>
  );
};

export default AppRoutes;
