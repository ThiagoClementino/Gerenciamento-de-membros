import { Route, Routes } from "react-router-dom";
// Removidas as importações de useState e useEffect
import Dashboard from "./Pages/Dashboard/Dashboard";
import Membros from "./Pages/Membros/Membros";
import Cadastro from "./Pages/Cadastro/Cadastro";
import { Financeiro } from "./Pages/Financeiro/Financeiro";
import MembroMinisterio from "./Pages/Membros/MembroMinisterio";
import Home from "./Pages/Home/Home";
import Config from "./Pages/Config/Config";
import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/Users/CreateUser";
import PrivateRoute from "./Components/PrivateRoute";
import ResetPassword from "./Pages/RecuperarSenha/ResetPassword";
import ChangePassword from "./Pages/RecuperarSenha/ChangePassword";
import ForgotPassword from "./Pages/RecuperarSenha/ForgotPassword";
import MainLayout from "./Components/MainLayout"; // Componente de Layout Global
import Datainfor from "./Contexts/DataInfor";
import DataApiOne from "./Contexts/DataApiOne";

// Importação dos Custom Hooks (Assumindo que foram criados em src/utils/)
import useMembros from "./utils/useMembros";
import useFinanceiro from "./utils/useFinanceiro";

const AppRoutes = () => {
  // 1. Chamada dos Custom Hooks para obter os dados e estados de carregamento
  const {
    dados: dadosMembros,
    isLoading: isLoadingMembros,
    error: errorMembros,
  } = useMembros();
  const {
    dados: dadosFinanceiro,
    isLoading: isLoadingFinanceiro,
    error: errorFinanceiro,
  } = useFinanceiro();

  // 2. Criação de um objeto de contexto mais completo
  const contextValue = {
    dadosMembros,
    isLoadingMembros,
    errorMembros,
    dadosFinanceiro,
    isLoadingFinanceiro,
    errorFinanceiro,
    // Se necessário, inclua funções de set, mas o ideal é que o hook gerencie o estado.
  };

  return (
    <DataApiOne.Provider value={{}}>
      {/* O Datainfor.Provider agora recebe os dados e estados dos hooks */}
      <Datainfor.Provider value={contextValue}>
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
