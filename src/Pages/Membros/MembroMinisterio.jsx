import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const handleSave = async () => {
    try {
      await axios.put(
        `https://api-gestao-igreja.onrender.com/membros/${id}`,
        member
      );
      alert("Dados salvos com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar os dados.");
    }
  };

  if (!member) return <div>Carregando...</div>;

  return (
    <div className="containerMembro">
      <div key={member._id}>
        <h4>Membro do Ministério</h4>
        <div className="dadosdoMembro">
          <div className="dadoinscricao">
            <div className="bloDadoInscricao">
              <h6>Inscrição: </h6>
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
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={member.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Nome da Mãe</h6>
                <input
                  id="Nomedamae"
                  type="text"
                  name="name"
                  value={member.mothersname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Nome da Pai</h6>
                <input
                  id="namedopai"
                  type="text"
                  name="name"
                  value={member.fathersname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Data de Nascimento</h6>
                <input
                  type="text"
                  name="dateBirth"
                  id="dateBirth"
                  value={member.dateBirth || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Sexo</h6>
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
                <h6>Celular</h6>
                <IMaskInput
                  type="tel"
                  name="telone"
                  id="telone"
                  value={member.telone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Telefone 2</h6>
                <IMaskInput
                  type="tel"
                  name="teltwo"
                  id="teltwo"
                  value={member.teltwo || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>E-mail</h6>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={member.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Nacionalidade</h6>
                <input
                  type="text"
                  name="national"
                  id="national"
                  value={member.national || ""}
                />
              </div>

              <div className="ValueMembro">
                <h6>Naturalidade</h6>
                <input
                  type="text"
                  name="natural"
                  id="natural"
                  value={member.natural || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ValueMembro">
                <h6>Profissão</h6>
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  value={member.profession || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="ValueMembro">
                <h6>Empresa</h6>
                <input
                  type="text"
                  name="companywork"
                  id="companywork"
                  value={member.companywork || ""}
                  onChange={handleInputChange}
                />
                
              </div>
              <div className="ValueMembro">
                <h6>Escolaridade</h6>
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
                <h6>CEP</h6>
                <IMaskInput 
                type="text"
                id="cep"
                name="cep"
                value={member.cep || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              
              <div className="ValueMembro">
                <h6>Endereço</h6>
                <input 
                type="text" 
                name="address" 
                id="address" 
                value={member.address || ""}
                onChange={handleInputChange}
                />                
              </div>

              <div className="ValueMembro">
                <h6>Número</h6>
                <input 
                type="text"
                name="number"
                id="number"
                value={member.number || ""}
                onChange={handleInputChange}
                 />
                 </div>

              <div className="ValueMembro">
                <h6>Complemento</h6>
                <input 
                type="text" 
                name="complement" 
                id="complement"
                value={member.complement || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Bairro</h6>
                <input 
                type="text" 
                name="district" 
                id="district"
                value={member.district || ""}
                onChange={handleInputChange}

                 />
               
              </div>
              <div className="ValueMembro">
                <h6>Cidade</h6>
                <input 
                type="text" 
                name="city" 
                id="city"
                value={member.city || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Estado</h6>
                <input 
                type="text" 
                name="state" 
                id="state"
                value={member.state || ""}
                onChange={handleInputChange}

                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Tempo de Residência</h6>
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
                <h6>Estado Civil</h6>
                <input 
                type="text" 
                name="estadocivil" 
                id="estadocivil"
                value={member.estadocivil || ""}
                onChange={handleInputChange}

                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Cônjuge</h6>
                <input 
                type="text" 
                name="conjuge" 
                id="conjuge"
                value={member.conjuge || ""}
                onChange={handleInputChange}

                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Possui filhos?</h6>
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
                <h6>Quantidade de Fihos</h6>
                <input 
                type="number" 
                name="qtdfilhos" 
                id="qtdfilhos"
                value={member.qtdfilhos || ""}
                onChange={handleInputChange}
                 />
              </div>

              <div className="ValueMembro">
                <h6>Dados do filho 1</h6>
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
                  name="idadefilhoum" 
                  id="idadefilhoum"
                  value={member.idadefilhoum || ""}
                  onChange={handleInputChange}
                   />
                  <p>{member.idadefilhoum}</p>
                  <p>anos</p>
                </div>
              </div>
              <div className="ValueMembro">
                <h6>Dados do filho 2</h6>
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
                  type="number" 
                  name="idadefilhodois" 
                  id="idadefilhodois"
                  value={member.idadefilhodois || ""}
                  onChange={handleInputChange}
                   />
                  
                  <p>anos</p>
                </div>
              </div>
              <div className="ValueMembro">
                <h6>Dados do filho 3</h6>
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
                  type="number" 
                  name="idadefilhotres" 
                  id="idadefilhotres"
                  value={member.idadefilhotres || ""}
                  onChange={handleInputChange}
                   />
                  
                  <p>anos</p>
                </div>
              </div>
              <div className="ValueMembro">
                <h6>Dados do filho 4</h6>
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
                  type="number" 
                  name="idadefilhoquatro" 
                  id="idadefilhoquatro"
                  value={member.idadefilhoquatro || ""}
                  onChange={handleInputChange}
                   />
                  
                  <p>anos</p>
                </div>
              </div>

              <div className="ValueMembro">
                <h6>Primeiro casamento?</h6>
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
                <h6>Casamento em cerimônia cristã</h6>
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
                <h6>Vão congregar juntos</h6>
                
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
                <h6>Justificativa</h6>
                <textarea 
                name="justificativa" 
                id="justificativa"
                value={member.justificativa || ""}
                onChange={handleInputChange}
                ></textarea>
                
              </div>
              <div className="ValueMembro">
                <h6>Data de Batismo</h6>
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
                <h6>Data de Conversão</h6>
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
                <h6>Última congregação</h6>
                <input 
                type="text" 
                name="lastchurch" 
                id="lastchurch"
                value={member.lastchurch || ""}
                onChange={handleInputChange}
                 />
               
              </div>
              <div className="ValueMembro">
                <h6>Motivo da saída</h6>
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
                <h6>Cargo na igreja</h6>
                <input 
                type="text"
                id="jobChurch"
                name="jobChurch"
                value={member.jobChurch || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Data do inicio do cargo</h6>
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
                <h6>Igrejas das quais foi membro</h6>
                <textarea 
                name="igrejasquefoimembro" 
                id="igrejasquefoimembro"
                value={member.igrejasquefoimembro || ""}
                onChange={handleInputChange}

                ></textarea>
                
              </div>
              <div className="ValueMembro">
                <h6>Igrejas das quais foi membro</h6>
                <select 
                name="dizimista" 
                id="dizimista"
                value={member.dizimista || ""}
                onChange={handleInputChange}
                ></select>
                
              </div>
              <div className="ValueMembro">
                <h6>É ofertante</h6>
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
                <h6>Seu cargo Anterior</h6>
                <input 
                type="text" 
                name="cargoanterior" 
                id="cargoanterior"
                value={member.cargoanterior || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Já foi separado para algum cargo?</h6>
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
                <h6>Qual era o seu cargo?</h6>
                <input 
                type="text" 
                name="posicaoanterior" 
                id="posicaoanterior"
                value={member.posicaoanterior || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Qual eram suas atividades?</h6>
                <input 
                type="text" 
                name="atividadeanterior" 
                id="atividadeanterior"
                value={member.atividadeanterior || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6> Motivos da saída do ministério anterior</h6>
                <textarea 
                type="text" 
                name="problema" 
                id="problema"
                value={member.problemaanterior || ""}
                onChange={handleInputChange}
                ></textarea>
                              
              </div>
              <div className="ValueMembro">
                <h6>Aceita ser exortado?</h6>
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
                <h6>Entender ser um bom discípulo</h6>
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
                <h6>Participante efetivo de cultos?</h6>
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
                <h6>Tem o hábito de informar ausências?</h6>
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
                <h6>Participante dos cultos de oração?</h6>
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
                <h6>Procura conselhos pastorais?</h6>
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
                <h6>Desenvolvimento espritual de forma coletiva?</h6>
                <input 
                type="text" 
                name="desenvolvimento" 
                id="desenvolvimento"
                value={member.desenvolvimento || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Desenvolvimento espritual de forma coletiva?</h6>
                <input 
                type="text" 
                name="conviccaodiscipulo" 
                id="conviccaodiscipulo"
                value={member.conviccaodiscipulo || ""}
                onChange={handleInputChange}
                 />
                <p>{member.conviccaodiscipulo}</p>
              </div>
              <div className="ValueMembro">
                <h6>Definições do evangelho</h6>
                <input 
                type="text" 
                name="definicaoevangelho" 
                id="definicaoevangelho"
                value={member.definicaoevangelho || ""}
                onChange={handleInputChange}
                 />
               
              </div>
              <div className="ValueMembro">
                <h6>Frutos do espírito</h6>
                <input 
                type="text" 
                name="frutosespirito" 
                id="frutosespirito"
                value={member.frutosespirito || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Cuidados da fé</h6>
                <input 
                type="text" 
                name="desenvolvimentodafe" 
                id="desenvolvimentodafe"
                value={member.desenvolvimentodafe || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Lutas pessoais</h6>
                <input 
                type="text" 
                name="pecado" 
                id="pecado"
                value={member.pecado || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Convicções teologógicas</h6>
                <input 
                type="text" 
                name="conviccaoteologica" 
                id="conviccaoteologica"
                value={member.conviccaoteologica || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Hábito de evangelizar</h6>
                <select 
                name="evangelizar" 
                id="evangelizar"
                value={member.evangelizar || ""}
                onChange={handleInputChange}
                
                ></select>
                
              </div>
              <div className="ValueMembro">
                <h6>Hábito de jejuar</h6>
                <select 
                name="jejuar" 
                id="jejuar"
                value={member.jejuar || ""}
                onChange={handleInputChange}
                
                ></select>
                
              </div>
              <div className="ValueMembro">
                <h6>Leitura bíblica</h6>
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
                <h6>Livros lidos</h6>
                <input 
                type="text" 
                name="livros" 
                id="livros"
                value={member.livros || ""}
                onChange={handleInputChange}
                 />
                
              </div>
              <div className="ValueMembro">
                <h6>Últimas considerações</h6>
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
