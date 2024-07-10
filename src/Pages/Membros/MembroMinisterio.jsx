import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";


const MembroMinisterio = () => {
  const [member, setMember] = useState({});
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
  if(!member) return<div>Carregando...</div>

  return (
    
    
    <div className="containerMembro">
        <div key={member._id}>
        
          <h4>Membro do Ministério</h4>
          <div className="dadosdoMembro">
            <div className="dadoinscricao">
              <div className="bloDadoInscricao">
                <h6 >Inscrição: </h6>
                <p>{member._id}</p>
              </div>
              <div className="bloDadoInscricao">
                <h6>Data de crição: </h6>
                <p>{member.datacriacao}</p>
              </div>
            </div>
            <div className="dadosMembro">
              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Dados Pessoais</p>
                </div>

                <div className="ValueMembro">
                  <h6>Nome</h6>
                  <blockquote contenteditable="true">{member.name}</blockquote>
                </div>
                <div className="ValueMembro">
                  <h6>Nome da Mãe</h6>
                  <p>{member.mothersname}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nome da Pai</h6>
                  <p>{member.fathersname}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data de Nascimento</h6>
                  <p>{member.dateBirth}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Sexo</h6>
                  <p>{member.sex}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Celular</h6>
                  <p>{member.telone}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Telefone 2</h6>
                  <p>{member.teltwo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>E-mail</h6>
                  <p>{member.email}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nacionalidade</h6>
                  <p>{member.national}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nacionalidade</h6>
                  <p>{member.national}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Naturalidade</h6>
                  <p>{member.natural}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Profissão</h6>
                  <p>{member.profession}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Naturalidade</h6>
                  <p>{member.natural}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Empresa</h6>
                  <p>{member.companywork}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Escolaridade</h6>
                  <p>{member.education}</p>
                </div>
              </div>
              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Endereço</p>
                </div>
                <div className="ValueMembro">
                  <h6>CEP</h6>
                  <p>{member.cep}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Endereço</h6>
                  <p>{member.address}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Número</h6>
                  <p>{member.number}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Complemento</h6>
                  <p>{member.complement}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Bairro</h6>
                  <p>{member.district}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cidade</h6>
                  <p>{member.city}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Estado</h6>
                  <p>{member.state}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Tempo de Residência</h6>
                  <p>{member.timeinresidence}</p>
                </div>
              </div>
              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Dados Familiares</p>
                </div>
                <div className="ValueMembro">
                  <h6>Estado Civil</h6>
                  <p>{member.estadocivil}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cônjuge</h6>
                  <p>{member.conjuge}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Possui filhos?</h6>
                  <p>{member.filhos}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Quantidade de Fihos</h6>
                  <p>{member.qtdfilhos}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 1</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{member.nomefilhoum}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{member.idadefilhoum}</p>
                    <p>anos</p>
                  </div>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 2</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{member.nomefilhodois}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{member.idadefilhodois}</p>
                    <p>anos</p>
                  </div>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 3</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{member.nomefilhotres}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{member.idadefilhotres}</p>
                    <p>anos</p>
                  </div>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 4</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{member.nomefilhoquatro}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{member.idadefilhoquatro}</p>
                    <p>anos</p>
                  </div>
                </div>

                <div className="ValueMembro">
                  <h6>Primeiro casamento?</h6>
                  <p>{member.optionprimeirocasamento}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Casamento em cerimônia cristã</h6>
                  <p>{member.casamentocristao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Vão congregar juntos</h6>
                  <p>{member.parceironaigreja}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Justificativa</h6>
                  <p>{member.justificativa}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data de Batismo</h6>
                  <p>{member.databatismo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data de Conversão</h6>
                  <p>{member.dataconversao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Última congregação</h6>
                  <p>{member.lastchurch}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Motivo da saída</h6>
                  <p>{member.motivosaida}</p>
                </div>
              </div>

              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Dados do Ministério</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cargo na igreja</h6>
                  <p>{member.jobChurch}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data do inicio do cargo</h6>
                  <p>{member.jobChurchTemp}</p>
                </div>

                <div className="ValueMembro">
                  <h6>Igrejas das quais foi membro</h6>
                  <p>{member.igrejasquefoimembro}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Igrejas das quais foi membro</h6>
                  <p>{member.dizimista}</p>
                </div>
                <div className="ValueMembro">
                  <h6>É dizimista</h6>
                  <p>{member.dizimista}</p>
                </div>
                <div className="ValueMembro">
                  <h6>É ofertante</h6>
                  <p>{member.ofertante}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Seu cargo Anterior</h6>
                  <p>{member.cargoanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Já foi separado para algum cargo?</h6>
                  <p>{member.separadoanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Qual era o seu cargo?</h6>
                  <p>{member.posicaoanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Qual eram suas atividades?</h6>
                  <p>{member.atividadeanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6> Motivos da saída do ministério anterior</h6>
                  <p>{member.problema}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Aceita ser exortado?</h6>
                  <p>{member.exortacao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Entender ser um bom discípulo</h6>
                  <p>{member.discipulo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Participante efetivo de cultos?</h6>
                  <p>{member.participacaocultos}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Tem o hábito de informar ausências?</h6>
                  <p>{member.habito}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Participante dos cultos de oração?</h6>
                  <p>{member.cultosdeoracao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Procura conselhos pastorais?</h6>
                  <p>{member.aconselhamentopastoral}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Desenvolvimento espritual de forma coletiva?</h6>
                  <p>{member.desenvolvimento}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Desenvolvimento espritual de forma coletiva?</h6>
                  <p>{member.conviccaodiscipulo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Definições do evangelho</h6>
                  <p>{member.definicaoevangelho}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Frutos do espírito</h6>
                  <p>{member.frutosespirito}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cuidados da fé</h6>
                  <p>{member.desenvolvimentodafe}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Lutas pessoais</h6>
                  <p>{member.pecado}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Convicções teologógicas</h6>
                  <p>{member.conviccaoteologica}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Hábito de evangelizar</h6>
                  <p>{member.evangelizar}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Hábito de jejuar</h6>
                  <p>{member.jejuar}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Leitura bíblica</h6>
                  <p>{member.leiturabiblica}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Livros lidos</h6>
                  <p>{member.livros}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Últimas considerações</h6>
                  <p>{member.ultimasconsideracoes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      
  );
};

export default MembroMinisterio;
