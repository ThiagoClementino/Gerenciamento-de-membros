import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Membros from './Pages/Membros/Membros';
import { useState } from 'react';
import Datainfor from './Contexts/DataInfor';
import Cadastro from './Pages/Cadastro/Cadastro';
import {Financeiro} from './Pages/Financeiro/Financeiro';
import Header from './Pages/Header/Header';
import { Teste } from './Pages/testes/teste';













const AppRoutes = () => {
  const [dataForm, setDataForm] = useState([]);
 const [dataFinance, setDataFinance] = useState([]);
  
    
  
   

  return (
    <Datainfor.Provider value={{dataForm, setDataForm, dataFinance, setDataFinance}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/membros" element={<Membros />} />
          <Route path='/cadastro' element={<Cadastro/>} />
          <Route path='/financeiro' element={<Financeiro />}/>
          <Route path='/header' element={<Header />}/>               
          <Route path='/teste' element={<Teste />}/>               
                      
       </Routes>
      </BrowserRouter>
    </Datainfor.Provider>
  );
};

export default AppRoutes;
