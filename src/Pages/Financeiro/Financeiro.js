import React, {  useEffect } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Footer from '../Footer/Footer'
import { useState } from 'react'

import Header from '../Header/Header';







export  const Financeiro = () => {
  // const { dataFinance, setDataFinance } = useContext(Datainfor);
  const [dadosfinance, setDadosfinance] = useState ([])  
 


const [financialData, setFinancialData] = useState(
  {
    tipodedado:'',
    valor:'',
    statuspagamento:'',
    datapagamento:'',
    tipolancamento:'',
    comprovante:'',
    observacao:'',
  });
  
  
  const handleCampfinancial =  (event) =>{
    setFinancialData({...financialData,[event.target.name]: event.target.value
    })
  }
const handleFormFinancial =  async (event) =>{
  try{
    event.preventDefault();
    // setDataFinance ((dataFinance) =>[...dataFinance,financialData ]);
    const response = await fetch("https://api-gestao-igreja.onrender.com/",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(financialData),
      mode: "cors",
    })
    const json = await response.json();
      console.log(json);
      console.log(response.status);

  }catch(error){

  }


  
setFinancialData('');

}; 

useEffect(() => {
  fetch('https://api-gestao-igreja.onrender.com', {
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
        console.error("Dados da API não é um array");
        
      }
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
}, []);





  return (
    <div className='layoutDefault'>

        <Header/>

    
        <div className='layoutComponent'>
          
            <form onSubmit={handleFormFinancial} className='LayoutForm'>
              <div className="titleAndBtnForm">
                <div className="contTitle">
                <h4>Cadastro Financeiro</h4>
                </div>
                <div className="contTitle">
              <input type="search" name="" id="" />
              <button> <IoSearchSharp size={18} /></button>
            </div>
                <div className="contTitle">
                <button>Salvar</button>
                </div>
              </div>
              <label className="campForm">
                <p>Tipo de registro</p>
                <select 
                name="tipodedado" 
                id="tipodedado"
                value={financialData.tipodedado}
                onChange={handleCampfinancial}>
                  <option value=""></option>
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                  
                </select>
              </label>
              <label className="campForm">
                <p>Valor</p>
                <input type="number" 
                name="valor" 
                id="valor" 
                value={financialData.valor}
                onChange={handleCampfinancial}
                />
              </label>
              <label className="campForm">
                <p>Status</p>
                <select 
                name="statuspagamento" 
                id="statuspagamento"
                value={financialData.statuspagamento}
                onChange={handleCampfinancial}
                > 
                  <option value=""></option>
                  <option value="pago">Pago</option>
                  <option value="Não pago">Não pago</option>
                </select>
              </label>
              <label className="campForm">
                <p>Data</p>
                <input type="date" 
                name="datapagamento" 
                id="datapagamento"
                value={financialData.datapagamento}
                onChange={handleCampfinancial}
                 
                />
              </label>
            
              <label className="campForm">
                <p>Tipo de lançamento</p>
                <select 
                name="tipolancamento" 
                id="tipolancamento"
                value={financialData.tipolancamento}
                onChange={handleCampfinancial}
                >
                  <option value=""></option>
                  <option value="agua">Água</option>
                  <option value="luz">Luz</option>
                  <option value="aluguel">Aluguel</option>
                  <option value="despesadepartamento">Despesa de departamento</option>
                  <option value="internet">Internet</option>
                </select>
              </label>         
              <label className="campForm">
                <p>Comprovantes</p>
                <input type="file" 
               
                name="comprovante" 
                id="comprovante"
                value={financialData.comprovante}
                onChange={handleCampfinancial}
                 />
              </label>
              <label className="campForm">
                <p>Descrição</p>
                <textarea 
                name="descricao" 
                id="descricao" 
                cols="85" 
                rows="5"
                value={financialData.descricao}
                onChange={handleCampfinancial}
                ></textarea>
              </label>
              <label className="campForm">
                <p>Observação</p>
                <textarea 
                name="observacao" 
                id="observacao" 
                cols="85" 
                rows="5"
                value={financialData.observacao}
                onChange={handleCampfinancial}
                ></textarea>
              </label>
            </form>

            <div className="conponentTable">
                <h4>Valores</h4>
               <table >
                <thead>
                 
                    <tr>
                    <th className='checked-table'></th>
                    <th className='titleTable'>Tipo de registro</th>
                    <th className='titleTable'>Valor</th>
                    <th className='titleTable'>Status</th>
                    <th className='titleTable'>Data do pagamento</th>
                    <th className='titleTable'>Tipo de lançamento</th>
                    <th className='titleTable'>Descrição</th>
                    <th className='titleTable'>Comprovantes</th>
                  </tr>
                </thead>
                <tbody>
                {dadosfinance.map((dado)=>(
                   <tr key={dado.id}>
                    <td className='checked-table' ><input type="checkbox" name="" id="" /></td>
                   <td className='dataTable'>{dado.tipodedado}</td>
                   <td className='dataTable'>{dado.valor}</td>
                   <td className='dataTable'>{dado.statuspagamento}</td>
                   <td className='dataTable'>{dado.datapagamento}</td>
                   <td className='dataTable'>{dado.tipolancamento}</td>
                   <td className='dataTable'>{dado.comprovante}</td>
                   <td className='dataTable'>{dado.observacao}</td>
                 </tr>
                ))}
                 
                </tbody>
              </table> 

            </div>
          <Footer/>
            
         
          
        </div>

      
    </div>
  )
  
}
