import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../css/Components.css';
// import '../../css/Reset.css';
// import GlobalStyle from "../../css/GlobalStyles";
import axios from "axios";
import { IMaskInput } from "react-imask";



const MembroMinisterio = () => {
  const [member, setMember] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(
          `https://api-gestao-igreja.onrender.com/membros/${id}`
        );
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDados();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  // const handleSave = async () => {
  //   try {
  //     await axios.put(
  //       `https://api-gestao-igreja.onrender.com/membros/${id}`,
  //       member
  //     );
  //     alert("Dados salvos com sucesso!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Erro ao salvar os dados.");
  //   }
  // };

  if (!member) return <div>Carregando...</div>;










  

  return (
      
    <div className="containerMembro">
      <div key={member._id} className="layoutMember">
        <h4>Membro do Ministério</h4>
        <div className="dadosdoMembro">
          <div className="dadoinscricao">
            <div className="bloDadoInscricao">
              <p>Inscrição: </p>
              <p>{member._id}</p>
            </div>
            <div className="bloDadoInscricao">
              <p>Data de crição: </p>
              <p>{member.datacriacao}</p>
            </div>
          </div>
          <div className="dadosMembro">
           
            <div className="blockInfor">
              <div className="titleblockMember">
                <p>Dados Pessoais</p>
              </div>

              <div className="ValueMembro">
                <p>Nome</p>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={member.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Nome da Mãe</p>
                <input
                  id="Nomedamae"
                  type="text"
                  name="name"
                  value={member.mothersname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Nome da Pai</p>
                <input
                  id="namedopai"
                  type="text"
                  name="name"
                  value={member.fathersname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Data de Nascimento</p>
                <input
                  type="text"
                  name="dateBirth"
                  id="dateBirth"
                  value={member.dateBirth || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Sexo</p>
                <select
                  name="sex"
                  id="se"
                  value={member.sex || ""}
                  onChange={handleInputChange}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
              <div className="ValueMembro">
                <p>Celular</p>
                <IMaskInput
                  type="tel"
                  name="telone"
                  id="telone"
                  value={member.telone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Telefone 2</p>
                <IMaskInput
                  type="tel"
                  name="teltwo"
                  id="teltwo"
                  value={member.teltwo || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>E-mail</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={member.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Nacionalidade</p>
                <input
                  type="text"
                  name="national"
                  id="national"
                  value={member.national || ""}
                />
              </div>

              <div className="ValueMembro">
                <p>Naturalidade</p>
                <input
                  type="text"
                  name="natural"
                  id="natural"
                  value={member.natural || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <p>Profissão</p>
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  value={member.profession || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="ValueMembro">
                <p>Empresa</p>
                <input
                  type="text"
                  name="companywork"
                  id="companywork"
                  value={member.companywork || ""}
                  onChange={handleInputChange}
                />
                
              </div>
              <div className="ValueMembro">
                <p>Escolaridade</p>
                <input 
                type="text" 
                name="education" id="education"
                value={member.education || ""}
                onChange={handleInputChange}
                 />
                
              </div>
            </div>
            <div className="blockInfor">
              <div className="ValueMembro">
                <p>CEP</p>
                <IMaskInput 
                type="text"
                id="cep"
                name="cep"
                value={member.cep || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              
              <div className="ValueMembro">
                <p>Endereço</p>
                <input 
                type="text" 
                name="address" 
                id="address" 
                value={member.address || ""}
                onChange={handleInputChange}
                />                
              </div>

              <div className="ValueMembro">
                <p>Número</p>
                <input 
                type="text"
                name="number"
                id="number"
                value={member.number || ""}
                onChange={handleInputChange}
                 />
                 </div>

              <div className="ValueMembro">
                <p>Complemento</p>
                <input 
                type="text" 
                name="complement" 
                id="complement"
                value={member.complement || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Bairro</p>
                <input 
                type="text" 
                name="district" 
                id="district"
                value={member.district || ""}
                onChange={handleInputChange}

                 />
               
              </div>
              <div className="ValueMembro">
                <p>Cidade</p>
                <input 
                type="text" 
                name="city" 
                id="city"
                value={member.city || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Estado</p>
                <input 
                type="text" 
                name="state" 
                id="state"
                value={member.state || ""}
                onChange={handleInputChange}

                 />
                
              </div>
              <div className="ValueMembro">
                <p>Tempo de Residência</p>
                <input 
                type="text" 
                name="timeinresidence" 
                id="timeinresidence"
                value={member.timeinresidence || ""}
                onChange={handleInputChange}

                 />
                
              </div>
            </div>
            <div className="blockInfor">
              <div className="titleblockMember">
                <p>Dados Familiares</p>
              </div>
              <div className="ValueMembro">
                <p>Estado Civil</p>
                <input 
                type="text" 
                name="estadocivil" 
                id="estadocivil"
                value={member.estadocivil || ""}
                onChange={handleInputChange}

                 />
                
              </div>
              <div className="ValueMembro">
                <p>Cônjuge</p>
                <input 
                type="text" 
                name="conjuge" 
                id="conjuge"
                value={member.conjuge || ""}
                onChange={handleInputChange}

                 />
                
              </div>
              <div className="ValueMembro">
                <p>Possui filhos?</p>
              <select 
              name="filhos" 
              id="filhos"
              value={member.filhos || ""}
              onChange={handleInputChange}>

                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
               
              </div>
              <div className="ValueMembro">
                <p>Quantidade de Fihos</p>
                <input 
                type="number" 
                name="qtdfilhos" 
                id="qtdfilhos"
                value={member.qtdfilhos || ""}
                onChange={handleInputChange}
                 />
              </div>

              <div className="ValueMembro">
                <p>Dados do filho 1</p>
                <div className="dadosfilho">
                  <p>Nome:</p>
                  <input 
                 
                  type="text" 
                  name="nomefilhoum" 
                  id="nomefilhoum"
                  value={member.nomefilhoum || ""}
                  onChange={handleInputChange}
                   />
                  
                </div>
                <div className="dadosfilho">
                  <p>idade:</p>
                  <input
                  type="number" 
                  style={{width:"50px"}}
                  name="idadefilhoum" 
                  id="idadefilhoum"
                  value={member.idadefilhoum || ""}
                  onChange={handleInputChange}
                   />
                  <p>{member.idadefilhoum}</p>
                  
                </div>
              </div>
              <div className="ValueMembro">
                <p>Dados do filho 2</p>
                <div className="dadosfilho">
                  <p>Nome:</p>
                  <input 
                  type="text" 
                  name="nomefilhodois" 
                  id="nomefilhodois"
                  value={member.nomefilhodois || ""}
                  onChange={handleInputChange}
                   />
                 
                </div>
                <div className="dadosfilho">
                  <p>idade:</p>
                  <input 
                  style={{width:"50px"}}
                  type="number" 
                  name="idadefilhodois" 
                  id="idadefilhodois"
                  value={member.idadefilhodois || ""}
                  onChange={handleInputChange}
                   />
                  
                  
                </div>
              </div>
              <div className="ValueMembro">
                <p>Dados do filho 3</p>
                <div className="dadosfilho">
                  <p>Nome:</p>
                  <input 
                  type="text" 
                  name="nomefilhotres" 
                  id="nomefilhotres"
                  value={member.nomefilhotres || ""}
                  onChange={handleInputChange}
                   />
                  
                </div>
                <div className="dadosfilho">
                  <p>idade:</p>
                  <input 
                  style={{width:"50px"}}
                  type="number" 
                  name="idadefilhotres" 
                  id="idadefilhotres"
                  value={member.idadefilhotres || ""}
                  onChange={handleInputChange}
                   />
                  
                  
                </div>
              </div>
              <div className="ValueMembro">
                <p>Dados do filho 4</p>
                <div className="dadosfilho">
                  <p>Nome:</p>
                  <input 
                  
                  type="text" 
                  name="nomefilhoquatro" 
                  id="nomefilhoquatro"
                  value={member.nomefilhoquatro || ""}
                  onChange={handleInputChange}
                   />
                  
                </div>
                <div className="dadosfilho">
                  <p>idade:</p>
                  <input 
                  style={{width:"50px"}}
                  type="number" 
                  name="idadefilhoquatro" 
                  id="idadefilhoquatro"
                  value={member.idadefilhoquatro || ""}
                  onChange={handleInputChange}
                   />
                  
                  
                </div>
              </div>

              <div className="ValueMembro">
                <p>Primeiro casamento?</p>
                <select 
                name="optionprimeirocasamento" 
                id="optionprimeirocasamento"
                value={member.optionprimeirocasamento || ""}
                onChange={handleInputChange}
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Casamento em cerimônia cristã</p>
                <select 
                name="casamentocristao" 
                id="casamentocristao"
                value={member.casamentocristao || ""}
                onChange={handleInputChange}                
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Vão congregar juntos</p>
                
                <select 
                name="parceironaigreja" 
                id="parceironaigreja"
                value={member.parceironaigreja || ""}
                onChange={handleInputChange}          
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>

                </select>
              </div>
              <div className="ValueMembro">
                <p>Justificativa</p>
                <textarea 
                name="justificativa" 
                id="justificativa"
                value={member.justificativa || ""}
                onChange={handleInputChange}
                ></textarea>
                
              </div>
              <div className="ValueMembro">
                <p>Data de Batismo</p>
                <IMaskInput 
                type="text" 
                name="databatismo"
                mask="00/00/0000" 
                id="databatismo"
                value={member.databatismo || ""}
                onChange={handleInputChange}
                
                />
               
              </div>
              <div className="ValueMembro">
                <p>Data de Conversão</p>
                <IMaskInput 
                type="text" 
                name="dataconversao" 
                id="dataconversao"
                mask="00/00/0000" 
                
                value={member.dataconversao || ""}
                onChange={handleInputChange}
                />
                
              </div>
              <div className="ValueMembro">
                <p>Última congregação</p>
                <input 
                type="text" 
                name="lastchurch" 
                id="lastchurch"
                value={member.lastchurch || ""}
                onChange={handleInputChange}
                 />
               
              </div>
              <div className="ValueMembro">
                <p>Motivo da saída</p>
                <textarea 
                name="motivosaida" 
                id="motivosaida"
                value={member.motivosaida || ""}
                onChange={handleInputChange}
                ></textarea>
                
              </div>
            </div>

            <div className="blockInfor">
              <div className="titleblockMember">
                <p>Dados do Ministério</p>
              </div>
              <div className="ValueMembro">
                <p>Cargo na igreja</p>
                <input 
                type="text"
                id="jobChurch"
                name="jobChurch"
                value={member.jobChurch || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Data do inicio do cargo</p>
                <IMaskInput 
                type="text"
                name="jobChurchTemp" 
                id="jobChurchTemp"
                mask="00/00/0000"
                value={member.jobChurchTemp || ""}
                onChange={handleInputChange}
                />
               
              </div>

              <div className="ValueMembro">
                <p>Igrejas das quais foi membro</p>
                <textarea 
                name="igrejasquefoimembro" 
                id="igrejasquefoimembro"
                value={member.igrejasquefoimembro || ""}
                onChange={handleInputChange}

                ></textarea>
                
              </div>
              <div className="ValueMembro">
                <p>Igrejas das quais foi membro</p>
                <select 
                name="dizimista" 
                id="dizimista"
                value={member.dizimista || ""}
                onChange={handleInputChange}
                ></select>
                
              </div>
              <div className="ValueMembro">
                <p>É ofertante</p>
                <select 
                name="ofertante" 
                id="ofertante"
                value={member.ofertante || ""}
                onChange={handleInputChange}
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Seu cargo Anterior</p>
                <input 
                type="text" 
                name="cargoanterior" 
                id="cargoanterior"
                value={member.cargoanterior || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Já foi separado para algum cargo?</p>
                <select 
                name="separadoanterior" 
                id="separadoanterior"
                value={member.separadoanterior || ""}
                onChange={handleInputChange}>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Qual era o seu cargo?</p>
                <input 
                type="text" 
                name="posicaoanterior" 
                id="posicaoanterior"
                value={member.posicaoanterior || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Qual eram suas atividades?</p>
                <textarea 
                
                name="atividadeanterior" 
                id="atividadeanterior"
                value={member.atividadeanterior || ""}
                onChange={handleInputChange}
                 ></textarea>
                
              </div>
              <div className="ValueMembro">
                <p> Motivos da saída do ministério anterior</p>
                <textarea 
                
                name="problema" 
                id="problema"
                value={member.problemaanterior || ""}
                onChange={handleInputChange}
                ></textarea>
                              
              </div>
              <div className="ValueMembro">
                <p>Aceita ser exortado?</p>
                <select 
                name="aceitaexortado" 
                id="aceitaexortado"
                value={member.aceitaexortado || ""}
                onChange={handleInputChange}>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Entender ser um bom discípulo</p>
                <select 
                name="discipulo" 
                id="discipulo"
                value={member.discipulo || ""}
                onChange={handleInputChange}
                
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                <p>{member.discipulo}</p>
              </div>
              <div className="ValueMembro">
                <p>Participante efetivo de cultos?</p>
                <select 
                name="participacaocultos" 
                id="participacaocultos"
                value={member.participacaocultos || ""}
                onChange={handleInputChange}
                
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
               
              </div>
              <div className="ValueMembro">
                <p>Tem o hábito de informar ausências?</p>
                <select 
                name="habito" 
                id="habito"
                value={member.habito || ""}
                onChange={handleInputChange}                
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Participante dos cultos de oração?</p>
                <select 
                name="cultosdeoracao" 
                id="cultosdeoracao"
                value={member.cultosdeoracao || ""}
                onChange={handleInputChange}                
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Procura conselhos pastorais?</p>
                <select 
                name="aconselhamentopastoral" 
                id="aconselhamentopastoral"
                value={member.aconselhamentopastoral || ""}
                onChange={handleInputChange}
                
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                
              </div>
              <div className="ValueMembro">
                <p>Desenvolvimento espritual de forma coletiva?</p>
                <input 
                type="text" 
                name="desenvolvimento" 
                id="desenvolvimento"
                value={member.desenvolvimento || ""}
                onChange={handleInputChange}
                 />
                
              </div>
           
              <div className="ValueMembro">
                <p>Definições do evangelho</p>
                <input 
                type="text" 
                name="definicaoevangelho" 
                id="definicaoevangelho"
                value={member.definicaoevangelho || ""}
                onChange={handleInputChange}
                 />
               
              </div>
              <div className="ValueMembro">
                <p>Frutos do espírito</p>
                <input 
                type="text" 
                name="frutosespirito" 
                id="frutosespirito"
                value={member.frutosespirito || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Cuidados da fé</p>
                <input 
                type="text" 
                name="desenvolvimentodafe" 
                id="desenvolvimentodafe"
                value={member.desenvolvimentodafe || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Lutas pessoais</p>
                <input 
                type="text" 
                name="pecado" 
                id="pecado"
                value={member.pecado || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Convicções teologógicas</p>
                <input 
                type="text" 
                name="conviccaoteologica" 
                id="conviccaoteologica"
                value={member.conviccaoteologica || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Hábito de evangelizar</p>
                <select 
                name="evangelizar" 
                id="evangelizar"
                value={member.evangelizar || ""}
                onChange={handleInputChange}
                
                ></select>
                
              </div>
              <div className="ValueMembro">
                <p>Hábito de jejuar</p>
                <select 
                name="jejuar" 
                id="jejuar"
                value={member.jejuar || ""}
                onChange={handleInputChange}
                
                ></select>
                
              </div>
              <div className="ValueMembro">
                <p>Leitura bíblica</p>
                <select 
                name="leiturabiblica" 
                id="leiturabiblica"
                value={member.leiturabiblica || ""}
                onChange={handleInputChange}
                
                ><option value="Sim">Sim</option>
                <option value="Nao">Não</option>
                </select>
                
                
              </div>
              <div className="ValueMembro">
                <p>Livros lidos</p>
                <input 
                type="text" 
                name="livros" 
                id="livros"
                value={member.livros || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <p>Últimas considerações</p>
                <textarea 
                name="ultimasconsideracoes" 
                id="ultimasconsideracoes"
                value={member.ultimasconsideracoes || ""}
                onChange={handleInputChange}
                ></textarea>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default MembroMinisterio;