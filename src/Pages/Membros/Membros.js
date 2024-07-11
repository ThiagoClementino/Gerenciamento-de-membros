import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import Datainfor from "../../Contexts/DataInfor";
import Footer from "../Footer/Footer";
import '../../css/Globalcss.css'
import { Link } from "react-router-dom";


import { CSVLink } from "react-csv";

const Membros = () => {
  const { dataForm, setDataForm, dados } = useContext(Datainfor);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const handleDeactivate = () => {
    const newData = dataForm.map((data) => {
      if (selectedItems.includes(data.id)) {
      
        return { ...data, active: false, selected: false };
      }
      return data;
    });
    setDataForm(newData);
    setSelectedItems([]);
  };

  const dataExport = () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



  const filteredDados = dados.filter((dado) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      (dado._id?.toLowerCase().includes(lowerSearchTerm) || '') ||
      (dado.name?.toLowerCase().includes(lowerSearchTerm) || '') ||
      (dado.email?.toLowerCase().includes(lowerSearchTerm) || '') ||
      (dado.mothersname?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.fathersname?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.dateBirth?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.profession?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.companywork?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.nomefilhoum?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.nomefilhodois?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.nomefilhotres?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.nomefilhoquatro?.toLowerCase().includes(lowerSearchTerm) || '')||
      (dado.databatismo?.toLowerCase().includes(lowerSearchTerm) || '')
      
      
    );
  });

  return (
    <div className="layoutDefault">
      <Header />
      <div className="layoutComponent">
        <div className="titleAndBtnForm">
          <div className="contTitle">
            <h4>Relação de Membros</h4>
            <p>Membros cadastrados</p>
          </div>
          <div className="contTitle">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar..."
            />
           
          </div>
          <div className="contTitle">
            <button>Excluir</button>
            <button onClick={handleDeactivate} disabled={!selectedItems.length}>
              Desativar
            </button>
            <button className="export">
              <CSVLink
                data={dados}
                target="_blank"
                color="#fff"
                filename={`Table Members ${dataExport()}`}
                className="export"
              >
                Exportar
              </CSVLink>
            </button>
          </div>
        </div>

        <div className="conponentTable">
          <table>
            <thead>
              <tr>
              <th className="checked-table">
              <input type="checkbox" name="" id="" value={selectedItems}/>
                </th>
              
                
               <th>Visualizar</th>
                <th className="titleTable">Matrícula</th>
                <th className="titleTable">Data de inscrição</th>
                <th className="titleTable">Nome Completo</th>
                <th className='titleTable'>Nome da Mãe</th>
                <th className='titleTable'>Nome da Pai</th>
                <th className="titleTable">Data de nascimento</th>
                <th className="titleTable">Sexo</th>
                <th className="titleTable">Telefone</th>
                <th className="titleTable">Telefone 2</th>
                <th className="titleTable">E-mail</th>
                <th className='titleTable'>Nacionalidade</th>
                <th className='titleTable'>Naturalidade</th>
                <th className='titleTable'>Profissão</th>
                <th className='titleTable'>Onde trabalha</th>
                <th className='titleTable'>Grau de escolaridade</th>
                <th className='titleTable'>Cep</th>
                <th className='titleTable'>Endereço</th>
                <th className='titleTable'>Número</th>
                <th className='titleTable'>Complemento</th>
                <th className='titleTable'>Bairro</th>
                <th className='titleTable'>Cidade</th>
                <th className='titleTable'>Estado</th>
                <th className='titleTable'>Tempo de residência</th>
                <th className='titleTable'>Estado Civil</th>
                <th className='titleTable'>Nome do Cônjuge</th>
                <th className='titleTable'>Possui Filhos</th>
                <th className='titleTable'>Quantidade de filhos</th>
                <th className='titleTable'>Filho 1</th>
                <th className='titleTable'>Idade filho 1</th>
                <th className='titleTable'>Filho 2</th>
                <th className='titleTable'>Idade filho 2</th>
                <th className='titleTable'>Filho 3</th>
                <th className='titleTable'>Idade filho 3</th>
                <th className='titleTable'>Filho 4</th>
                <th className='titleTable'>Idade filho 4</th>
                <th className='titleTable'>Cargo</th>
                <th className='titleTable'>Tempo de Cargo</th>
                <th className='titleTable'>Primeiro Casamento?</th>
                <th className='titleTable'>Casamento Cristão?</th>
                <th className='titleTable'>Cônjuge irá congregar em nosso ministério?</th>
                <th className='titleTable'>Justificativa</th>
                <th className='titleTable'>Data de Batismo</th>
                <th className='titleTable'>Data de conversão</th>
                <th className='titleTable'>Última igreja</th>
                <th className='titleTable'>Saída da igreja</th>
                <th className='titleTable'>Igrejas que foi membro</th>
                <th className='titleTable'>É Dizimista</th>
                <th className='titleTable'>Ofertante</th>
                <th className='titleTable'>Cargo Anterior</th>
                <th className="titleTable">Cargo ministerial</th>
                <th className='titleTable'>Posição Ministério</th>
                <th className='titleTable'>Atividades igreja</th>
                <th className='titleTable'>Dificuldades de liderança, hierarquia</th>
                <th className='titleTable'>Exortação</th>
                <th className='titleTable'>Discípulo pastoreável</th>
                <th className='titleTable'>Participação culto de Oração </th>
                <th className='titleTable'>Participação de cultos e EBDs</th>
                <th className='titleTable'>Informar ausência </th>
                <th className='titleTable'>Conselho Pastoral </th>
                <th className='titleTable'>Desenvolvimento em congregar </th>
                <th className='titleTable'>Convicção Cristã</th>
                <th className='titleTable'>Definição evangelho</th>
                <th className='titleTable'>Frutos do Espírito</th>
                <th className='titleTable'>Cuidado com a fé</th>
                <th className='titleTable'>Lutas pessoais</th>
                <th className='titleTable'>Convicções teológicas</th>
                <th className='titleTable'>Hábito de Evangelizar</th>
                <th className='titleTable'>Hábito de Jejuar</th>
                <th className='titleTable'>Leitura completa da bíblia</th>
                <th className='titleTable'>Últimos livros lidos</th>
                <th className="titleTable">Últimas informações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDados.map((dado, id) => (
                <tr key={id}>
                  <td><input type="checkbox" name="" id="" value={selectedItems}/></td>
                  <td className="detalhes">
                    <Link to={`/membro/${dado._id}`}>Detalhes</Link>
                  </td>
                  <td>{dado._id}</td>
                  <td>{dado.datacriacao}</td>
                  <td>{dado.name}</td>
                  <td>{dado.mothersname}</td>
                  <td>{dado.fathersname}</td>
                  <td>{dado.dateBirth}</td>
                  <td>{dado.sex}</td>
                  <td>{dado.telone}</td>
                  <td>{dado.teltwo}</td>
                  <td>{dado.email}</td>
                  <td>{dado.national}</td>
                  <td>{dado.natural}</td>
                  <td>{dado.profession}</td>
                  <td>{dado.companywork}</td>
                  <td>{dado.education}</td>
                  <td>{dado.cep}</td>
                  <td>{dado.address}</td>
                  <td>{dado.number}</td>
                  <td>{dado.complement}</td>
                  <td>{dado.district}</td>
                  <td>{dado.city}</td>
                  <td>{dado.state}</td>
                  <td>{dado.timeinresidence}</td>
                  <td>{dado.estadocivil}</td>
                  <td>{dado.conjuge}</td>
                  <td>{dado.filhos}</td>
                  <td>{dado.qtdfilhos}</td>
                  <td>{dado.nomefilhoum}</td>
                  <td>{dado.idadefilhoum}</td>
                  <td>{dado.nomefilhodois}</td>
                  <td>{dado.idadefilhodois}</td>
                  <td>{dado.nomefilhotres}</td>
                  <td>{dado.idadefilhotres}</td>
                  <td>{dado.nomefilhoquatro}</td>
                  <td>{dado.idadefilhoquatro}</td>
                  <td>{dado.jobChurch}</td>
                  <td>{dado.jobChurchTemp}</td>
                  <td>{dado.optionprimeirocasamento}</td>
                  <td>{dado.casamentocristao}</td>
                  <td>{dado.parceironaigreja}</td>
                  <td>{dado.justificativa}</td>
                  <td>{dado.databatismo}</td>
                  <td>{dado.dataconversao}</td>
                  <td>{dado.lastchurch}</td>
                  <td>{dado.motivosaida}</td>
                  <td>{dado.igrejasquefoimembro}</td>
                  <td>{dado.dizimista}</td>
                  <td>{dado.ofertante}</td>
                  <td>{dado.cargoanterior}</td>
                  <td>{dado.separadoanterior}</td>
                  <td>{dado.posicaoanterior}</td>
                  <td>{dado.atividadeanterior}</td>
                  <td>{dado.problema}</td>
                  <td>{dado.exortacao}</td>
                  <td>{dado.discipulo}</td>
                  <td>{dado.participacaocultos}</td>
                  <td>{dado.habito}</td>
                  <td>{dado.cultosdeoracao}</td>
                  <td>{dado.aconselhamentopastoral}</td>
                  <td>{dado.desenvolvimento}</td>
                  <td>{dado.conviccaodiscipulo}</td>
                  <td>{dado.definicaoevangelho}</td>
                  <td>{dado.frutosespirito}</td>
                  <td>{dado.desenvolvimentodafe}</td>
                  <td>{dado.pecado}</td>
                  <td>{dado.conviccaoteologica}</td>
                  <td>{dado.evangelizar}</td>
                  <td>{dado.jejuar}</td>
                  <td>{dado.leiturabiblica}</td>
                  <td>{dado.livros}</td>
                  <td>{dado.ultimasconsideracoes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Membros;