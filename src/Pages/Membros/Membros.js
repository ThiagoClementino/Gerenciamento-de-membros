import './membros.css';
import'./MembrosMobile.css'
import React from 'react'
import { useContext, useState } from 'react';
import Header from '../Header/Header';
import Datainfor from '../../Contexts/DataInfor';
import Footer from '../Footer/Footer'
import '../../css/defaultStyle.css';
import { IoSearchSharp } from "react-icons/io5";
import { DataGrid } from '@mui/x-data-grid';





const Membros = () => {
    const { dataForm, setDataForm } = useContext(Datainfor);
    const [busca, setBusca] = useState('');
    const [selectedItems, setSelectedItems] = useState('[]'); 
    const handleSearch = (event) => {
      setBusca(event.target.value);
    };
    const filteredData = dataForm.filter((data) =>
      data.name.toLowerCase().includes(busca.toLowerCase()) && data.active
    );
    const handleDeactivate = () => {
      const newData = dataForm.map((data) => {
        if (selectedItems.includes(data.id)) { // Check by ID
          return { ...data, active: false, selected: false };
        }
        return data;
      });
      setDataForm(newData);
      setSelectedItems([]); 
    };
    const handleCheckboxChange = (id) => {
      const newSelectedItems = [...selectedItems];
      const index = newSelectedItems.indexOf(id);
      if (index !== -1) {
        newSelectedItems.splice(index, 1); // Remove from selected if already checked
      } else {
        newSelectedItems.push(id); 
      }
      setSelectedItems(newSelectedItems);
    };
    
    
   


  return (
    <div className="componentMembros">
      <Header />
      <div className="containerMembros">
        <div className="titleAndControl">
        <aside className="btncontroll">
      <p>Relação de Membros</p>
      </aside>
      <div className="btncontroll">
      <p>
      <input type="search" onChange={handleSearch}
      placeholder="Pesquisar  "  />
      <button>
      <IoSearchSharp size={18} />
      </button>
      </p>
       
      </div>
      <div className="btncontroll">
        
   <button>Excluir</button>
   <button onClick={handleDeactivate} 
   disabled={!selectedItems.length}>Desativar</button>
      </div>
      </div>
      <div className="sectiontabela">
        <div className="tabelaBloco">
          <table className="tabelaContainer">
            <thead>
            <tr>
                
                <th className='checked-table'></th>
                <th className='titleTable'>Nome Completo</th>
                {/* <th className='titleTable'>Nome da Mãe</th>
                <th className='titleTable'>Nome da Pai</th>*/}
                <th className='titleTable'>Dada de nascimento</th>
                <th className='titleTable'>Sexo</th> 
                <th className='titleTable'>Telefone</th>
               <th className='titleTable'>Telefone 2</th> 
                <th className='titleTable'>E-mail</th>
            {/* <th className='titleTable'>Nacionalidade</th>
                <th className='titleTable'>Naturalidade</th>
                <th className='titleTable'>Cep</th>
                <th className='titleTable'>Endereço</th>
                <th className='titleTable'>Número</th>
                <th className='titleTable'>Complemento</th>
                <th className='titleTable'>Bairro</th> */}
            {/* <th className='titleTable'>Cidade</th>
                <th className='titleTable'>Estado</th>
                <th className='titleTable'>Tempo de residência</th>
                <th className='titleTable'>Profissão</th>
                <th className='titleTable'>Grau de escolaridade</th>
                <th className='titleTable'>Onde trabalha</th>
                <th className='titleTable'>Estado Civil</th>
                <th className='titleTable'>Nome do Cônjuge</th>
                <th className='titleTable'>Quantidade de filhos</th>
                <th className='titleTable'>Filho 1</th>
                <th className='titleTable'>Filho 2</th>
                <th className='titleTable'>Filho 3</th>
                <th className='titleTable'>Filho 4</th>
                <th className='titleTable'>Cargo</th>
                <th className='titleTable'>Primeiro Casamento?</th>
                <th className='titleTable'>Casamento Cristão?</th>
                <th className='titleTable'>Cônjuge irá congregar em nosso ministério?</th>
                <th className='titleTable'>Justificativa</th>
                <th className='titleTable'>Data de conversão</th>
                <th className='titleTable'>Data de Batismo</th>
                <th className='titleTable'>Saída da igreja</th>
                <th className='titleTable'>Última igreja</th>
                <th className='titleTable'>Igrejas que foi membro</th>
                <th className='titleTable'>Dizimisma</th>
                <th className='titleTable'>Ofertante</th> 
              <th className='titleTable'>Liderança</th>*/}
                <th className='titleTable'>Cargo ministerial</th>
                {/* <th className='titleTable'>Posição Ministério</th>
                <th className='titleTable'>Atividades igreja</th>
                <th className='titleTable'>Dificuldades de lideraça, hierarquia</th>
                <th className='titleTable'>Exortação</th>
                <th className='titleTable'>Discipulo pasteoreável</th>
                <th className='titleTable'>Participação de cultos e EBDs</th>
                <th className='titleTable'>Informar ausencia </th>
                <th className='titleTable'>Participação culto de Oração </th>
                <th className='titleTable'>Conselho Pastoral </th>
                <th className='titleTable'>Desenvolvimento em congregar </th>
                <th className='titleTable'>Convicção Cristã</th>
                <th className='titleTable'>Definição envagelho</th>
                <th className='titleTable'>Frutos do Espírito</th>
                <th className='titleTable'>Cuidado com a fé</th>
                <th className='titleTable'>Lutas pessoais</th>
                <th className='titleTable'>Convições teológicas</th>
                <th className='titleTable'>Hábito de Envagelizar</th>
                <th className='titleTable'>Hábito de Jejuar</th>
                <th className='titleTable'>Leitura completa da bíblia</th>
                <th className='titleTable'>Últimos livros lidos</th> */}
                <th className='titleTable'>Últimos informações</th>
              </tr>

            </thead>
            <tbody> 
                {filteredData.map((data, index)=>(
                  <tr key={index} >
                    <th className='checked-table'><input 
                    type="checkbox"
                    checked={selectedItems.includes(data.id)} 
                    onChange={() => handleCheckboxChange(data.id)}        
                    /></th>
                   
                    <th>{data.name}</th>
                    {/* <th>{data.mothersname}</th> */}
                    {/* <th>{data.fathersname}</th> */}
                    {/* <th>{data.dateBirth}</th> */}
                    {/* <th>{data.sex}</th> */}
                    <th>{data.telone}</th>
                    {/* <th>{data.teltwo}</th> */}
                    <th>{data.email}</th>
                    {/* <th>{data.national}</th> */}
                    {/* <th>{data.natural}</th> */}
                    {/* <th>{data.cep}</th> */}
                    {/* <th>{data.address}</th> */}
                    {/* <th>{data.number}</th> */}
                    {/* <th>{data.complement}</th> */}
                    {/* <th>{data.district}</th> */}
                    <th>{data.city}</th>
                    {/* <th>{data.state}</th> */}
                    {/* <th>{data.timeinresidence}</th> */}
                    {/* <th>{data.profession}</th> */}
                    {/* <th>{data.education}</th> */}
                    {/* <th>{data.companywork}</th> */}
                    {/* <th>{data.estadocivil}</th> */}
                    {/* <th>{data.conjuge}</th> */}
                    {/* <th>{data.qtdfilhos}</th> */}
                    {/* <th>{data.nomefilhoum}</th> */}
                    {/* <th>{data.idadefilhoum}</th> */}
                    {/* <th>{data.nomefilhodois}</th> */}
                    {/* <th>{data.idadefilhodois}</th>  */}
                    {/* <th>{data.nomefilhotres}</th>  */}
                    {/* <th>{data.idadefilhotres}</th>  */}
                    {/* <th>{data.nomefilhoquatro}</th>  */}
                    {/* <th>{data.idadefilhoquatro}</th>  */}
                    {/* <th>{data.optionprimeirocasamento}</th>  */}
                    <th>{data.jobChurch}</th> 
                    {/* <th>{data.casamentocristao}</th>  */}
                    {/* <th>{data.parceironaigreja}</th>  */}
                    {/* <th>{data.justificativa}</th>  */}
                    {/* <th>{data.dataconversao}</th>  */}
                    {/* <th>{data.databatismo}</th>  */}
                    {/* <th>{data.motivosaida}</th>  */}
                    {/* <th>{data.lastchurch}</th>  */}
                    {/* <th>{data.igrejasquefoimembro}</th>  */}
                    {/* <th>{data.dizimista}</th>  */}
                    {/* <th>{data.ofertante}</th>  */}
                    {/* <th>{data.cargoanterior}</th>  */}
                    {/* <th>{data.separadoanterior}</th>  */}
                    {/* <th>{data.posicaoanterior}</th>  */}
                    {/* <th>{data.atividadeanterior}</th>  */}
                    {/* <th>{data.problema}</th>  */}
                    {/* <th>{data.discipulo}</th>  */}
                    {/* <th>{data.participacaocultos}</th>  */}
                    {/* <th>{data.cultosdeoracao}</th>  */}
                    {/* <th>{data.aconselhamentopastoral}</th>  */}
                    {/* <th>{data.desenvolvimento}</th>  */}
                    {/* <th>{data.conviccao}</th>  */}
                    {/* <th>{data.definicaoevangelho}</th>  */}
                    {/* <th>{data.frutosespirito}</th>  */}
                    {/* <th>{data.desenvolvimentodafe}</th>  */}
                    {/* <th>{data.pecado}</th>  */}
                    {/* <th>{data.conviccaoteologica}</th>  */}
                    {/* <th>{data.evangelizar}</th>  */}
                    {/* <th>{data.jejuar}</th>  */}
                    {/* <th>{data.leiturabiblica}</th>  */}
                    {/* <th>{data.livros}</th>  */}
                    <th>{data.ultimasconsideracoes}</th>
                  </tr>
                
                ))}
              </tbody>

          </table>
        </div>
      </div>
  
 
    

      <Footer />
      </div>
    </div>
  )
}
export default Membros
