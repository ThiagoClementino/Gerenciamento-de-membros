import { useContext, useState } from 'react';
import Header from '../Header/Header';
import Datainfor from '../../Contexts/DataInfor';
import './membros.css';


const Membros = () => {
  const { dataForm, setDataForm } = useContext(Datainfor);
  const [busca, setBusca] = useState('');
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items

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
    setSelectedItems([]); // Clear selected items after deactivation
  };

  const handleCheckboxChange = (id) => {
    const newSelectedItems = [...selectedItems];
    const index = newSelectedItems.indexOf(id);

    if (index !== -1) {
      newSelectedItems.splice(index, 1); // Remove from selected if already checked
    } else {
      newSelectedItems.push(id); // Add to selected if not checked
    }
    setSelectedItems(newSelectedItems);
  };
  
  
  return (
    <div className='ContainerMembers'>
      
      <div className="LayoutMembers">
      <Header/>
      
      
    <div className="tableMembers">
      <div className="titleMembers">
       <h2> Relação de Membros</h2>
       <div className="inputSearch">
       <input type="search"
      onChange={handleSearch}
       placeholder="Pesquisar" />
      
       </div>
       <div className="options">

        
        <button>Excluir</button>
        <button onClick={handleDeactivate} disabled={!selectedItems.length}> Desativar </button>
       </div>
       </div>
                  <table >
              <thead>
                <tr>
                  <th className="select"> </th>
                  <th className='layouttable'>Nome</th>
                  <th className='layouttable'>Nome da Mãe</th>
                  <th className='layouttable'>Nome da Pai</th>
                  <th className='layouttable'>Dada de nascimento</th>
                  <th className='layouttable'>Sexo</th>
                  <th className='layouttable'>Telefone</th>
                  <th className='layouttable'>Telefone 2</th>
                  <th className='layouttable'>Email</th>
                  <th className='layouttable'>Nacionalidade</th>
                  <th className='layouttable'>Naturalidade</th>
                  <th className='layouttable'>Cep</th>
                  <th className='layouttable'>Endereço</th>
                  <th className='layouttable'>Número</th>
                  <th className='layouttable'>Complemento</th>
                  <th className='layouttable'>Bairro</th>
                  <th className='layouttable'>Cidade</th>
                  <th className='layouttable'>Estado</th>
                  <th className='layouttable'>Tempo de residência</th>
                  <th className='layouttable'>Profissão</th>
                  <th className='layouttable'>Grau de escolaridade</th>
                  <th className='layouttable'>Onde trabalha</th>
                  <th className='layouttable'>Estado Civil</th>
                  <th className='layouttable'>Nome do Conjugê</th>
                  <th className='layouttable'>Quatidade de filhos</th>
                  <th className='layouttable'>Filho 1</th>
                  <th className='layouttable'>Filho 2</th>
                  <th className='layouttable'>Filho 3</th>
                  <th className='layouttable'>Filho 4</th>
                  <th className='layouttable'>Filho 5</th>
                  <th className='layouttable'>Filho 6</th>
                  <th className='layouttable'>Cargo</th>
                  <th className='layouttable'>Primeiro Casamento?</th>
                  <th className='layouttable'>Conjugê irá congregar em nosso ministério?</th>
                  <th className='layouttable'>Justificativa</th>
                  <th className='layouttable'>Casamento Cristão?</th>
                  <th className='layouttable'>Data de conversão</th>
                  <th className='layouttable'>Data de Batismo</th>
                  <th className='layouttable'>Data de Membro</th>
                  <th className='layouttable'>Congregação</th>
                  <th className='layouttable'>Facebook</th>
                  <th className='layouttable'>Instagram</th>
                  <th className='layouttable'>Comentarios</th>
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
                    <th>{data.telone}</th>
                    <th>{data.teltwo}</th>
                    <th>{data.email}</th>
                    <th>{data.sex}</th>
                    <th>{data.national}</th>
                    <th>{data.natural}</th>
                    <th>{data.cep}</th>
                    <th>{data.address}</th>
                    <th>{data.number}</th>
                    <th>{data.complement}</th>
                    <th>{data.district}</th>
                    <th>{data.city}</th>
                    <th>{data.state}</th>
                    <th>{data.timeinresidence}</th>
                    <th>{data.profession}</th>
                    <th>{data.education}</th>
                    <th>{data.companywork}</th>
                    <th>{data.dateBirth}</th>
                    <th>{data.dateBatism}</th>
                    <th>{data.dateMember}</th>
                    <th>{data.jobChurch}</th>
                    <th>{data.congregation}</th>
                    <th>{data.linkFacebook}</th>
                    <th>{data.linkInsta}</th>
                    <th>{data.comentary}</th>
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