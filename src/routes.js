import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Membros from './Pages/Membros/Membros';
import { useState, useEffect} from 'react';
import Datainfor from './Contexts/DataInfor';
import Cadastro from './Pages/Cadastro/Cadastro';
import {Financeiro} from './Pages/Financeiro/Financeiro';
import Header from './Pages/Header/Header';
import { Teste } from './Pages/testes/teste';
import Formulario from './Pages/testes/testedois';


const AppRoutes = () => {
  const [dataForm, setDataForm] = useState([]);
 const [dataFinance, setDataFinance] = useState([]);
 const [dados, setDados] = useState([]);





 useEffect(() => {
  fetch('https://api-gestao-igreja.onrender.com/membros/all', {
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
  
    


  
   

  return (
    <Datainfor.Provider value={{dataForm, setDataForm, dataFinance, setDataFinance, dados, setDados}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/membros" element={<Membros />} />
          <Route path='/cadastro' element={<Cadastro/>} />
          <Route path='/financeiro' element={<Financeiro />}/>
          <Route path='/header' element={<Header />}/>               
          <Route path='/teste' element={<Teste />}/>               
          <Route path='/formulario' element={<Formulario />}/>               
                      
       </Routes>
      </BrowserRouter>
    </Datainfor.Provider>
  );
};

export default AppRoutes;
