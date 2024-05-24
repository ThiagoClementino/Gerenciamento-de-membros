import { useContext, useState } from 'react';
import Header from '../Header/Header';
import Datainfor from '../../Contexts/DataInfor';
import './membros.css';

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

   <div className="componentMembers">
    <Header />
    <div className="containerMembers">
      <div className="headerMembers">
        <div className="titleMembers">
          <p>Relação de membros</p>
        </div>
        <div className="searchMembers">
          <input type="search" onChange={handleSearch}
       placeholder="Pesquisar" />
        </div>
        <div className="btnMembers">
          <button>Excluir</button><button onClick={handleDeactivate} disabled={!selectedItems.length}>Desativar</button>
        </div>

      </div>
      <div className="tableMembers">
      <table id='tableData' >
              <thead >
                <tr>
                
                  <th></th>
                  <th className='layouttable'>Nome Completo</th>
                  {/* <th className='layouttable'>Nome da Mãe</th>
                  <th className='layouttable'>Nome da Pai</th>*/}
                  <th className='layouttable'>Dada de nascimento</th>
                  <th className='layouttable'>Sexo</th> 
                  <th className='layouttable'>Telefone</th>
                 <th className='layouttable'>Telefone 2</th> 
                  <th className='layouttable'>E-mail</th>
              {/* <th className='layouttable'>Nacionalidade</th>
                  <th className='layouttable'>Naturalidade</th>
                  <th className='layouttable'>Cep</th>
                  <th className='layouttable'>Endereço</th>
                  <th className='layouttable'>Número</th>
                  <th className='layouttable'>Complemento</th>
                  <th className='layouttable'>Bairro</th> */}
              {/* <th className='layouttable'>Cidade</th>
                  <th className='layouttable'>Estado</th>
                  <th className='layouttable'>Tempo de residência</th>
                  <th className='layouttable'>Profissão</th>
                  <th className='layouttable'>Grau de escolaridade</th>
                  <th className='layouttable'>Onde trabalha</th>
                  <th className='layouttable'>Estado Civil</th>
                  <th className='layouttable'>Nome do Cônjuge</th>
                  <th className='layouttable'>Quantidade de filhos</th>
                  <th className='layouttable'>Filho 1</th>
                  <th className='layouttable'>Filho 2</th>
                  <th className='layouttable'>Filho 3</th>
                  <th className='layouttable'>Filho 4</th>
                  <th className='layouttable'>Cargo</th>
                  <th className='layouttable'>Primeiro Casamento?</th>
                  <th className='layouttable'>Casamento Cristão?</th>
                  <th className='layouttable'>Cônjuge irá congregar em nosso ministério?</th>
                  <th className='layouttable'>Justificativa</th>

                  <th className='layouttable'>Data de conversão</th>
                  <th className='layouttable'>Data de Batismo</th>
                  <th className='layouttable'>Saída da igreja</th>
                  <th className='layouttable'>Última igreja</th>
                  <th className='layouttable'>Igrejas que foi membro</th>
                  <th className='layouttable'>Dizimisma</th>
                  <th className='layouttable'>Ofertante</th> 
                <th className='layouttable'>Liderança</th>*/}
                  <th className='layouttable'>Cargo ministerial</th>
                  {/* <th className='layouttable'>Posição Ministério</th>
                  <th className='layouttable'>Atividades igreja</th>
                  <th className='layouttable'>Dificuldades de lideraça, hierarquia</th>
                  <th className='layouttable'>Exortação</th>
                  <th className='layouttable'>Discipulo pasteoreável</th>
                  <th className='layouttable'>Participação de cultos e EBDs</th>
                  <th className='layouttable'>Informar ausencia </th>
                  <th className='layouttable'>Participação culto de Oração </th>
                  <th className='layouttable'>Conselho Pastoral </th>
                  <th className='layouttable'>Desenvolvimento em congregar </th>
                  <th className='layouttable'>Convicção Cristã</th>
                  <th className='layouttable'>Definição envagelho</th>
                  <th className='layouttable'>Frutos do Espírito</th>
                  <th className='layouttable'>Cuidado com a fé</th>
                  <th className='layouttable'>Lutas pessoais</th>
                  <th className='layouttable'>Convições teológicas</th>
                  <th className='layouttable'>Hábito de Envagelizar</th>
                  <th className='layouttable'>Hábito de Jejuar</th>
                  <th className='layouttable'>Leitura completa da bíblia</th>
                  <th className='layouttable'>Últimos livros lidos</th> */}
                  <th className='layouttable'>Últimos informações</th>
                </tr>
              </thead>
              <tbody> 
                {filteredData.map((data, index)=>(
                  <tr key={index} >
                    <th><input 
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
   </div>
  )
}
export default Membros
