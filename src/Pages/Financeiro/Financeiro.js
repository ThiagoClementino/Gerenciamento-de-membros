import React from 'react'
import './Financeiro.css'

import Footer from '../Footer/Footer'
import { useState } from 'react'
import { useContext } from 'react';
import Datainfor from '../../Contexts/DataInfor';
import Header from '../Header/Header';
import '../../css/defaultStyle.css'
import axios from 'axios';





export  const Financeiro = () => {
  const { dataFinance, setDataFinance } = useContext(Datainfor);  

  const dabaBankdata = (e) =>{
    const cep = e.target.value;
    fetch(`https://localhost:8080`)
    .then((response) =>response.json())
    .then(data =>{
      setTimeout((async) => {
        setDataFinance({...dataFinance, tipodedado: data.tipodedado, valor: data.valor, statuspagamento: data.statuspagamento, datapagamento: data.datapagamento, tipolancamento: data.tipolancamento, observacao: data.observacao})
        
      }, 1000);
    })
    .catch(error => console.log(error));
  }
  
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
  
 

  const handleCampfinancial =(event) =>{
    setFinancialData({...financialData,[event.target.name]: event.target.value
    })
  }
const handleFormFinancial =  async (event) =>{
  event.preventDefault();
  setDataFinance ((dataFinance) =>[...dataFinance,financialData ]);
  try {
    // Envie os dados para a API usando Axios
    const response = await axios.post('/api/lancamentos', financialData);

    if (response.status === 201) {
      // Limpe o formulário e exiba uma mensagem de sucesso
      console.log('Lançamento criado com sucesso!');
      // ... (limpe os campos do formulário)
    } else {
      console.error('Erro ao criar lançamento:', response.data.error);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
     
      setFinancialData('');
}

  return (
    <div className='LayoutFinanceiro'>

        <Header/>

    
        <div className='FinanceiroContent'>
          <div className="containerFinanceiro">
            <form onSubmit={handleFormFinancial}>
              <div className="titleAndBtn">
                <h2>Cadastro Financeiro</h2>
                <button>Salvar</button>
                
              </div>
              <label className="campFormFinancial">
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
              <label className="campFormFinancial">
                <p>Valor</p>
                <input type="number" 
                name="valor" 
                id="valor" 
                value={financialData.valor}
                onChange={handleCampfinancial}
                />
              </label>
             

              <label className="campFormFinancial">
                <p>Status</p>
                <select 
                name="statuspagamento" 
                id="statuspagamento"
                value={financialData.statuspagamento}
                onChange={handleCampfinancial}
                > 
                  <option value=""></option>
                  <option value="pago">Pago</option>
                  <option value="Nãopago">Não pago</option>
                </select>
              </label>
              <label className="campFormFinancial">
                <p>Data</p>
                <input type="date" 
                name="datapagamento" 
                id="datapagamento"
                value={financialData.datapagamento}
                onChange={handleCampfinancial}
                 
                />
              </label>
            
              <label className="campFormFinancial">
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
            
              
              <label className="campFormFinancial">
                <p>Comprovantes</p>
                <input type="file" 
               
                name="comprovante" 
                id="comprovante"
                value={financialData.comprovante}
                onChange={handleCampfinancial}
                 />
              </label>
              <label className="campFormFinancial">
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
              <label className="campFormFinancial">
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
            <div className="sectiontabela">
                <h2>Valores</h2>
            <div className="tabelaBloco">
              <table className='tabelaContainer'>
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
                {dataFinance.map((data, index)=>(
                   <tr key={index}>
                    <td className='checked-table'><input type="checkbox" name="" id="" /></td>
                   <td className='dataTable'>{data.tipodedado}</td>
                   <td className='dataTable'>{data.valor}</td>
                   <td className='dataTable'>{data.statuspagamento}</td>
                   <td className='dataTable'>{data.datapagamento}</td>
                   <td className='dataTable'>{data.tipolancamento}</td>
                   <td className='dataTable'>{data.descricao}</td>
                   <td className='dataTable'>{data.observacao}</td>
                 </tr>
                ))}
                 
                </tbody>
              </table>
            </div>
            </div>
            
          </div>
          
          <Footer/>
        </div>

      
    </div>
  )
  
}
