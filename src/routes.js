import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Membros from './Pages/Membros/Membros';
import { useState, useEffect } from 'react';
import Datainfor from './Contexts/DataInfor';
import DataApiOne from './Contexts/DataApiOne';
import Cadastro from './Pages/Cadastro/Cadastro';
import { Financeiro } from './Pages/Financeiro/Financeiro';
import Sidebar from './Pages/Header/Sidebar';
import MembroMinisterio from './Pages/Membros/MembroMinisterio';
import Home from './Pages/Home/Home';
import Config from './Pages/Config/Config';
import CadMembers from './Pages/Membros/CadMembers';

import Login from './Pages/Login/Login';
import CreateUser from './Pages/Users/CreateUser';






const AppRoutes = () => {


  const [dados, setDados] = useState([]);
  const [dadosfinance, setDadosfinance] = useState([]);





  // Rota de consulta todos menbros


  useEffect(() => {
    fetch('https://api-gestao-igreja-jcod.vercel.app/membros', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDados(data);
        } else {
          console.error("Dados da API não é um array");

        }
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);




  useEffect(() => {
    fetch('https://api-gestao-igreja-jcod.vercel.app/finance', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setDadosfinance(data);
        } else {
          console.error(`error`);

        }
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);







  return (
    <DataApiOne.Provider>
      <Datainfor.Provider value={{ dadosfinance, setDadosfinance, dados, setDados }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/membros" element={<Membros />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/financeiro' element={<Financeiro />} />
            <Route path='/sidebar' element={<Sidebar />} />
            <Route path='/membro/:id' element={<MembroMinisterio />} />
            <Route path='/config' element={<Config />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cad' element={<CadMembers />} />
            <Route path='/criarusuario' element={<CreateUser/>}/>
           

          </Routes>
        </BrowserRouter>
      </Datainfor.Provider>
    </DataApiOne.Provider>
  );
};

export default AppRoutes;