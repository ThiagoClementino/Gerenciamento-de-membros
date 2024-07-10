import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Membros from './Pages/Membros/Membros';
import { useState, useEffect} from 'react';
import Datainfor from './Contexts/DataInfor';
import Cadastro from './Pages/Cadastro/Cadastro';
import {Financeiro} from './Pages/Financeiro/Financeiro';
import Header from './Pages/Header/Header';
import MembroMinisterio from './Pages/Membros/MembroMinisterio';
import { useParams } from 'react-router-dom'
import axios from "axios";




const AppRoutes = () => {
  const [dataForm, setDataForm] = useState([]);
 const [dataFinance, setDataFinance] = useState([]);
 const [dados, setDados] = useState([]);
 const [member, setMember] = useState({});
 const [updateMember, setUpdateMember] = useState([]);
 


// Rota de consulta todos menbros


 useEffect(() => {
  fetch('https://api-gestao-igreja.onrender.com/membros', {
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
    



// Rota de consulta por id


  const { id } = useParams();



  useEffect(()=>{
    const fetchDados = async ()=>{
      try{
        const response = await axios.get(`https://api-gestao-igreja.onrender.com/membros/${id}`);
        setMember(response.data);
      }catch(error){
        console.error(error);
      }
    };
    fetchDados();
  }, [id]);
  
   // Rota de atualização de cadastros


  //  useEffect(() =>{
  //   const putDados =async () =>{
  //     try{
  //       const response = await axios.put(`https://api-gestao-igreja.onrender.com/membros/${id}`);
  //       setUpdateMember(response.data);
  //     }catch(error){
  //       console.error(error );
  //     }
  //   };
  //   putDados();
  //  })



  return (
    <Datainfor.Provider value={{dataForm, setDataForm, dataFinance, setDataFinance, dados, setDados, member, setMember, updateMember, setUpdateMember}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/membros" element={<Membros />} />
          <Route path='/cadastro' element={<Cadastro/>} />
          <Route path='/financeiro' element={<Financeiro />}/>
          <Route path='/header' element={<Header />}/>             
          <Route path='/membro/:id' element={<MembroMinisterio />}/>             
                     
       </Routes>
      </BrowserRouter>
    </Datainfor.Provider>
  );
};

export default AppRoutes;