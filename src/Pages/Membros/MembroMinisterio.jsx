import React, { useContext } from "react";
import Datainfor from "../../Contexts/DataInfor";
import "../../css/defaultStyle.css";
const MembroMinisterio = () => {
  const { dados } = useContext(Datainfor);

  return (
    <div className="containerMembro">
      {dados.map((dado) => (
        <details key={dado._id}>
          <summary className="summaryExemplo">
            <div className="blockinformation">
            
           <h6>{dado.name}</h6>
           </div>
           <p>{dado.email}</p>
          </summary>
          <h4>Membro do Ministério</h4>
          <div className="dadosdoMembro">
            <div className="dadoinscricao">
              <div className="bloDadoInscricao">
                <h6>Inscrição: </h6>
                <p>{dado._id}</p>
              </div>
              <div className="bloDadoInscricao">
                <h6>Data de crição: </h6>
                <p>{dado.datacriacao}</p>
              </div>
            </div>
            <div className="dadosMembro">
              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Dados Pessoais</p>
                </div>

                <div className="ValueMembro">
                  <h6>Nome</h6>
                  <p>{dado.name}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nome da Mãe</h6>
                  <p>{dado.mothersname}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nome da Pai</h6>
                  <p>{dado.fathersname}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data de Nascimento</h6>
                  <p>{dado.dateBirth}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Sexo</h6>
                  <p>{dado.sex}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Celular</h6>
                  <p>{dado.telone}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Telefone 2</h6>
                  <p>{dado.teltwo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>E-mail</h6>
                  <p>{dado.email}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nacionalidade</h6>
                  <p>{dado.national}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Nacionalidade</h6>
                  <p>{dado.national}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Naturalidade</h6>
                  <p>{dado.natural}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Profissão</h6>
                  <p>{dado.profession}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Naturalidade</h6>
                  <p>{dado.natural}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Empresa</h6>
                  <p>{dado.companywork}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Escolaridade</h6>
                  <p>{dado.education}</p>
                </div>
              </div>
              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Endereço</p>
                </div>
                <div className="ValueMembro">
                  <h6>CEP</h6>
                  <p>{dado.cep}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Endereço</h6>
                  <p>{dado.address}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Número</h6>
                  <p>{dado.number}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Complemento</h6>
                  <p>{dado.complement}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Bairro</h6>
                  <p>{dado.district}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cidade</h6>
                  <p>{dado.city}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Estado</h6>
                  <p>{dado.state}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Tempo de Residência</h6>
                  <p>{dado.timeinresidence}</p>
                </div>
              </div>
              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Dados Familiares</p>
                </div>
                <div className="ValueMembro">
                  <h6>Estado Civil</h6>
                  <p>{dado.estadocivil}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cônjuge</h6>
                  <p>{dado.conjuge}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Possui filhos?</h6>
                  <p>{dado.filhos}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Quantidade de Fihos</h6>
                  <p>{dado.qtdfilhos}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 1</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{dado.nomefilhoum}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{dado.idadefilhoum}</p>
                    <p>anos</p>
                  </div>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 2</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{dado.nomefilhodois}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{dado.idadefilhodois}</p>
                    <p>anos</p>
                  </div>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 3</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{dado.nomefilhotres}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{dado.idadefilhotres}</p>
                    <p>anos</p>
                  </div>
                </div>
                <div className="ValueMembro">
                  <h6>Dados do filho 4</h6>
                  <div className="dadosfilho">
                    <p>Nome:</p>
                    <p>{dado.nomefilhoquatro}</p>
                  </div>
                  <div className="dadosfilho">
                    <p>idade:</p>
                    <p>{dado.idadefilhoquatro}</p>
                    <p>anos</p>
                  </div>
                </div>

                <div className="ValueMembro">
                  <h6>Primeiro casamento?</h6>
                  <p>{dado.optionprimeirocasamento}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Casamento em cerimônia cristã</h6>
                  <p>{dado.casamentocristao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Vão congregar juntos</h6>
                  <p>{dado.parceironaigreja}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Justificativa</h6>
                  <p>{dado.justificativa}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data de Batismo</h6>
                  <p>{dado.databatismo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data de Conversão</h6>
                  <p>{dado.dataconversao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Última congregação</h6>
                  <p>{dado.lastchurch}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Motivo da saída</h6>
                  <p>{dado.motivosaida}</p>
                </div>
              </div>

              <div className="blockInfor">
                <div className="titleblockMember">
                  <p>Dados do Ministério</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cargo na igreja</h6>
                  <p>{dado.jobChurch}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Data do inicio do cargo</h6>
                  <p>{dado.jobChurchTemp}</p>
                </div>

                <div className="ValueMembro">
                  <h6>Igrejas das quais foi membro</h6>
                  <p>{dado.igrejasquefoimembro}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Igrejas das quais foi membro</h6>
                  <p>{dado.dizimista}</p>
                </div>
                <div className="ValueMembro">
                  <h6>É dizimista</h6>
                  <p>{dado.dizimista}</p>
                </div>
                <div className="ValueMembro">
                  <h6>É ofertante</h6>
                  <p>{dado.ofertante}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Seu cargo Anterior</h6>
                  <p>{dado.cargoanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Já foi separado para algum cargo?</h6>
                  <p>{dado.separadoanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Qual era o seu cargo?</h6>
                  <p>{dado.posicaoanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Qual eram suas atividades?</h6>
                  <p>{dado.atividadeanterior}</p>
                </div>
                <div className="ValueMembro">
                  <h6> Motivos da saída do ministério anterior</h6>
                  <p>{dado.problema}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Aceita ser exortado?</h6>
                  <p>{dado.exortacao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Entender ser um bom discípulo</h6>
                  <p>{dado.discipulo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Participante efetivo de cultos?</h6>
                  <p>{dado.participacaocultos}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Tem o hábito de informar ausências?</h6>
                  <p>{dado.habito}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Participante dos cultos de oração?</h6>
                  <p>{dado.cultosdeoracao}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Procura conselhos pastorais?</h6>
                  <p>{dado.aconselhamentopastoral}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Desenvolvimento espritual de forma coletiva?</h6>
                  <p>{dado.desenvolvimento}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Desenvolvimento espritual de forma coletiva?</h6>
                  <p>{dado.conviccaodiscipulo}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Definições do evangelho</h6>
                  <p>{dado.definicaoevangelho}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Frutos do espírito</h6>
                  <p>{dado.frutosespirito}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Cuidados da fé</h6>
                  <p>{dado.desenvolvimentodafe}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Lutas pessoais</h6>
                  <p>{dado.pecado}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Convicções teologógicas</h6>
                  <p>{dado.conviccaoteologica}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Hábito de evangelizar</h6>
                  <p>{dado.evangelizar}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Hábito de jejuar</h6>
                  <p>{dado.jejuar}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Leitura bíblica</h6>
                  <p>{dado.leiturabiblica}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Livros lidos</h6>
                  <p>{dado.livros}</p>
                </div>
                <div className="ValueMembro">
                  <h6>Últimas considerações</h6>
                  <p>{dado.ultimasconsideracoes}</p>
                </div>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
};

export default MembroMinisterio;
