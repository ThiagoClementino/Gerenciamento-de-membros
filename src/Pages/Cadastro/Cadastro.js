import React from 'react'
import {  useState } from 'react';
// import Datainfor from '../../Contexts/DataInfor';
import Footer from '../Footer/Footer'
import './cadastro.css'
import './cadastrotablet.css'
// import axios from 'axios'; useContext



import Header from '../Header/Header';

const Cadastro = () => {
  // const { setDataForm } = useContext(Datainfor);
  const [cadMembers, setCadMembers] = useState(
    
      {
        id:'',
        name: '',
        mothersname:'',
        fathersname:'',
        dateBirth: '',
        sex:'',
        telone: '',
        teltwo: '',
        email: '',
        national:'',
        natural:'',
        cep:'',
        address:'',
        number:'',
        complement:'',
        city:'',
        district:'',
        state:'',
        timeinresidence:'',
        profession:'',
        education:'',
        companywork:'', 
        dateBatism: '',
        congregation: '',
        dateMember: '',
        jobChurch: '',
        linkFacebook: '',
        linkInsta: '',
        comentary: '',
        
        selected:'',
      }
  
  );
  const handleSubmitCamps = (event) => {
    setCadMembers({...cadMembers,[event.target.name]: event.target.value});
  };
  
// axios.post('http://localhost:3050/membros', {cadMembers} )
// .then(res => console.log(res))
// .catch(error =>console.log(error));

  const handleSubmitForm = async (event) => {
    
    try{
      event.preventDefault();
      // setDataForm((dataForm) => [...dataForm, cadMembers]);
      const response =  await fetch('http://localhost:3050/membros',{
        method: 'POST',
        body:JSON.stringify(cadMembers)
      })
      const json = await response.json();
      console.log(json);
      console.log(response.status);


    }catch (error){

    }


    
  
    
    setCadMembers(''); 
  };
  
 

  const buscaCep = (e) =>{
    const cep = e.target.value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) =>response.json())
    .then(data =>{
      setTimeout((async) => {
        setCadMembers({...cadMembers, address: data.logradouro, district: data.bairro, city: data.localidade, state: data.uf})
        
      }, 1000);
    })
    .catch(error => console.log(error));
  }
  // const [abas, setAbas] = useState ('#aba1');
  
  return (
    <div className='layoutform'>
         
    <Header/>
     <div className='form'>
        
        <form className='' onSubmit={handleSubmitForm}>
        <div className="titleAndBtn">
          <div className="titlesection">
          <h2>Cadastro de Membros</h2>
          <p>Cadastro de novos membros</p>
          </div>
          <div className="titlesection">
          <button>Enviar</button>
          </div>
        </div>
        <div className="abas">
          <section>
          <a href="#aba1">Dados Pessoais</a>
          <a href="#aba2">Relacionamento </a>
          <a href="#aba3">Hist. Cristão</a>
          <a href="#aba4">Hist. Congregacional</a>
          <a href="#aba5">Convicções</a>
          <a href="#aba6">Dados adicionais</a>
          </section>
        
        <div className="sectionAbas" id="aba1" >
          <div className="titleaba">
          <h4>Dados pessoais</h4>
          </div>
         
         <label className="campForm" id='campForm'>
          <p>Nome Completo</p>
          <input type="text" 
          name="name" 
          value={cadMembers.name || ''} 
          onChange={handleSubmitCamps} />
         </label>
         <label className="campForm">
            <p>Nome da Mãe</p>
            <input type="text" 
            placeholder='Nome da Mãe' 
            name='mothersname' 
            value={cadMembers.mothersname || ''} 
            onChange={handleSubmitCamps} />
          </label>
          <label className="campForm">
                      <p>Nome do Pai</p>
                      <input type="text" 
                      placeholder='Nome do Pai' 
                      name='fathersname' 
                      value={cadMembers.fathersname || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className='campForm'>
                      <p>Data de nascimento</p>
                      <input type="date" 
                      name='dateBirth' 
                      value={cadMembers.dateBirth || ''}
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className='campForm' >
                      <p>Sexo</p>
                      <select name="sex" 
                      value={cadMembers.sex || ''} 
                      onChange={handleSubmitCamps} >
                        <option value="">Escolha</option>
                        <option value="Masculine">Masculino</option>
                        <option value="Feminine">Feminino</option>
                               </select>
                    </label>
    
                    <label className='campForm'>
                      <p>Telefone</p>
                      <input type="tel" 
                      placeholder='(00) 00000-0000' 
                      name='telone' 
                      value={cadMembers.telone || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
    
                    <label className='campForm' >
                      <p>Telefone 2</p>
                      <input type="tel" 
                      placeholder='(00) 00000-0000' 
                      name='teltwo' 
                      value={cadMembers.teltwo || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className='campForm'>
                      <p>E-mail</p>
                      <input type="email" 
                      placeholder='email@email.com' 
                      name='email' value={cadMembers.email || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className='campForm'>
                      <p>Nacionalidade</p>
                      <input type="text" 
                      placeholder='Nacionalidade' 
                      name='national' value={cadMembers.national || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className='campForm'>
                      <p>Naturalidade</p>
                      <input type="text" 
                      placeholder='Naturalidade' 
                      name='natural' value={cadMembers.natural || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className='campForm'>
                      <p>CEP</p>
                      <input type="text" 
                      placeholder='CEP' 
                      name='cep' value={cadMembers.cep || ''} 
                      onChange={handleSubmitCamps}
                      onBlur={buscaCep}
                       />
                    </label>
                    <label className='campForm'>
                      <p>Endereço</p>
                      <input type="text" 
                       
                      name='address' 
                      value={cadMembers.address || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
                    <label className="campForm">
                      <p>Número</p>
                      <input type="text" 
                     
                      name='number' 
                      value={cadMembers.number || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className="campForm">
                      <p>Complemento</p>
                      <input type="text" 
                      name='complement' 
                      value={cadMembers.complement || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
                    <label className="campForm">
                      <p>Bairro</p>
                      <input type="text" 
                      placeholder='district' 
                      name='district' 
                      value={cadMembers.district || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className="campForm">
                      <p>Cidade</p>
                      <input type="text" 
                      name='city' 
                      value={cadMembers.city || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                   
    
                    <label className="campForm">
                      <p>Estado</p>
                      <input type="text" 
                      placeholder='Estado' 
                      name='state' 
                      value={cadMembers.state || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className="campForm">
                      <p>Quanto tempo está no mesmo endereço?</p>
                      <input type="text" 
                      name='timeinresidence' 
                      value={cadMembers.timeinresidence || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
               
    
                    <label className="campForm">
                      <p>Profissão</p>
                      <input type="text" 
                      placeholder='' 
                      name='profession' 
                      value={cadMembers.profession || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
                    <label className="campForm">
                      <p>Grau de escolaridade</p>
                      <select name="education" 
                      value={cadMembers.education || ''}
                      onChange={handleSubmitCamps} >
                        <option value="">Escolha</option>
                        <option value="EnsinoFundamental">Ensino Fundamental</option>
                        <option value="EnsinoMedio">Ensino Médio</option>
                        <option value="EnsinoSuperior">Ensino Superior</option>
                        <option value="Recanto">Recanto das Emas</option>
                        <option value="Sede">Sede</option>
                      </select>
                    </label>
    
                    <label className="campForm">
                      <p>Empresa que trabalha </p>
                      <input type="text" 
                       
                      name='companywork' 
                      value={cadMembers.companywork || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
    
     
        </div>
        <div className="sectionAbas" id='aba2'>
    
                    <label htmlFor="" className="campForm">
                      <p>Estado Civil</p>
                      <select name="estadocivil" id="estadocivil" 
                      className="estadocivil" 
                      value={cadMembers.estadocivil || ''} 
                      onChange={handleSubmitCamps} >
                        <option value="">Selecione</option>
                        <option value="solteiro">Solteiro</option>
                        <option value="casado">Casado</option>
                        <option value="divorciado">Divocriado</option>
                      </select>
                 
                    </label>
                    <label  className="campForm">
                        <p>Nome do Conjugê</p>
                        <input type="text" name="conjuge" id="conjuge" placeholder='Digite o nome do conjugê' value={cadMembers.conjuge || ''} onChange={handleSubmitCamps} />
                      </label>
                    <label htmlFor="" className="campForm">
                      <p>Quantidade de filhos</p>
                      <input type="number" 
                      name="qtdfilhos" id="qtdfilhos" 
                      value={cadMembers.qtdfilhos || ''} 
                      onChange={handleSubmitCamps} />
    
                      </label>
                      <div id='dadosdosfilhos'>
                      <h3>Dados do filho</h3>
                        
                        <section className="dadosdofilho">
                        <input type="text" 
                        name="nomefilhoum" 
                        id="nomefilhoum" 
                        placeholder='Digite o nome dos filhos'
                        value={cadMembers.nomefilhoum || ''} 
                        onChange={handleSubmitCamps} />

                        <input type="number" 
                        name="idadefilhoum" 
                        id="idadefilhoum"
                        placeholder='idade'
                        value={cadMembers.idadefilhoum || ''} 
                        onChange={handleSubmitCamps} 
                        />
                        
                        </section>



                        <section className="dadosdofilho">
                        <input type="text" 
                        name="nomefilhodois" 
                        id="nomefilhodois" 
                        placeholder='Digite o nome dos filhos'
                        value={cadMembers.nomefilhodois || ''} 
                        onChange={handleSubmitCamps} />
                        <input type="number" 
                        name="idadefilhodois" 
                        id="idadefilhodois"
                        value={cadMembers.idadefilhodois || ''} 
                        onChange={handleSubmitCamps}
                        placeholder='idade'/>
                        </section>

                        <section className="dadosdofilho">
                        <input type="text" 
                        name="nomefilhotres" 
                        id="nomefilhotres" 
                        placeholder='Digite o nome dos filhos'
                        value={cadMembers.nomefilhotres || ''} 
                        onChange={handleSubmitCamps} />
                        <input type="number" 
                        name="idadefilhotres" 
                        id="idadefilhotres"
                        value={cadMembers.idadefilhotres || ''} 
                        onChange={handleSubmitCamps}
                        placeholder='idade'/>
                       
                        </section>

                        <section className="dadosdofilho">
                        <input type="text" 
                        name="nomefilhoquatro" 
                        id="nomefilhoquatro" 
                        placeholder='Digite o nome dos filhos'
                        value={cadMembers.nomefilhoquatro || ''} 
                        onChange={handleSubmitCamps} />
                        <input type="number" 
                        name="idadefilhoquatro" 
                        id="idadefilhoquatro"
                        value={cadMembers.idadefilhoquatro || ''} 
                        onChange={handleSubmitCamps} 
                        placeholder='idade'/>
                      
                        </section>

                   

                        
                      <label className="campForm">
                      <p>Qual cargo exerce no ministério</p>
                      <input type="text" 
                      placeholder='Cargo' 
                      name='jobChurch' 
                      value={cadMembers.jobChurch || ''} 
                      onChange={handleSubmitCamps} />
                    </label>
                        {/* <section className="dadosdofilho">
                        <input type="text" name="Filhoum" id="Filhoum" placeholder='Digite o nome dos filhos' />
                        <input type="number" name="idadefilhoum" id="" placeholder='idade'/>
                        </section>
                        <section className="dadosdofilho">
                        <input type="text" name="Filhoum" id="Filhoum" placeholder='Digite o nome dos filhos' />
                        <input type="number" name="idadefilhoum" id="" placeholder='idade'/>
                        </section> */}
                        
                        </div>
                        
                        <label  className="campForm">
                          <p>Primeiro Casamento</p>
                          <select name="optionprimeirocasamento" 
                          id="optionprimeirocasamento"
                          value={cadMembers.optionprimeirocasamento || ''} 
                          onChange={handleSubmitCamps}
                          
                          >
                          <option value="">Selecione</option>
                          <option value="sim">Sim</option>
                          <option value="nao">Não</option>
                          </select>
                        </label>
                    <label className="campForm">
                      <p>Casaram-se em cerimônia cristã?</p>
                      <select name="casamentocristao" 
                      id="casamentocristao"
                      value={cadMembers.casamentocristao || ''} 
                      onChange={handleSubmitCamps}
                      >
                      <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                      </select>
                    </label>
                    <label className="campForm">
                      <p>Conjugê vai congregar junto?</p>
                      <select name="parceironaigreja" 
                      id="parceironaigreja"
                      value={cadMembers.parceironaigreja || ''} 
                      onChange={handleSubmitCamps}
                      >
                      <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                      </select>
                    </label>
                    <label className="campForm">
                <p>Se não, justificar motivo</p>
                <textarea name="justificativa" 
                id="justificativa" 
                cols="48" rows="5"
                value={cadMembers.justificativa || ''} 
                onChange={handleSubmitCamps}
                ></textarea>
                    </label>
    
        </div>           
        <div className="sectionAbas" id="aba3">
        <label htmlFor="" className="campForm">
          <p>Qual a foi a data de conversão</p>
          <input type="date" name="dataconversao" 
          id="dataconversao" value={cadMembers.dataconversao || ''} 
          onChange={handleSubmitCamps} />
        </label>
        <label  className="campForm">
          <p>Qual foi sua data de batismo nas águas</p>
          <input type="date" name="databatismo" 
          id="databatismo" value={cadMembers.databatismo || ''} 
          onChange={handleSubmitCamps} />
        </label>
        <label  className="campForm">
          <p>Por qual motivo você saiu dela?</p>
          <input type="text" name="motivosaida" 
          id="motivosaida" value={cadMembers.motivosaida || ''} 
          onChange={handleSubmitCamps} />
        </label>
        <label  className="campForm">
          <p>Qual foi a sua última igreja?</p>
          <input type="text" name="lastchurch" 
          id="lastchurch" value={cadMembers.lastchurch || ''} 
          onChange={handleSubmitCamps} />
        </label>
        <label  className="campForm">
          <p>Quais foram as igrejas que você foi membro desde a sua conversão?</p>
          <textarea name="igrejasquefoimembro" 
          id="igrejasquefoimembro" cols="80" rows="2"
          value={cadMembers.igrejasquefoimembro || ''} 
          onChange={handleSubmitCamps}
          ></textarea>
        </label>
        <label  className="campForm">
          <p>Você é dizimista fiel? </p>
          <select name="dizimista" 
          id="dizimista" value={cadMembers.dizimista || ''} 
          onChange={handleSubmitCamps}>
          <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>
        <label htmlFor="" className="campForm">
          <p>Você é ofertante fiel? </p>
          <select name="ofertante" 
          id="ofertante" 
          value={cadMembers.ofertante || ''} 
          onChange={handleSubmitCamps}>
          <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>
        <label htmlFor="" className="campForm">
          <p>Você exerceu algum cargo de liderança nas igrejas que passou? </p>
          <select name="cargoanterior" id="cargoanterior" 
          value={cadMembers.cargoanterior || ''} 
          onChange={handleSubmitCamps}>
          <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>
        <label htmlFor="" className="campForm">
          <p>Você foi separado/consagrado a algum cargo ministerial? </p>
          <select name="separadoanterior" 
          id="separadoanterior" value={cadMembers.separadoanterior || ''} 
          onChange={handleSubmitCamps}>
          <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>
        <label htmlFor="" className="campForm">
          <p>Qual era a sua posição</p>
          <input type="text" name="posicaoanterior" 
          id="posicaoanterior" 
          value={cadMembers.posicaoanterior || ''} 
          onChange={handleSubmitCamps} />
        </label>
        <label htmlFor="" className="campForm">
          <p>Quais eram as suas atividades?</p>
          <input type="text" name="atividadeanterior" 
          id="atividadeanterior" value={cadMembers.atividadeanterior || ''} 
          onChange={handleSubmitCamps} />
        </label>
    
        </div> 
    
        <div className="sectionAbas" id="aba4">
          <label className="campForm">
            <p>Tem algum problema com liderança, hierarquia e pastoreio?</p>
            <select name="problema" id="problema" 
            value={cadMembers.problema || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Tem algum problema em ser exortado quando alguma conduta estiver fora dos padrões bíblicos?</p>
            <select name="exortacao" id="exortacao" 
            value={cadMembers.exortacao || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Você se considera um discípulo de Jesus com coração pastoreável/ensinável?</p>
            <select name="discipulo" id="discipulo" 
            value={cadMembers.discipulo || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Tem o hábito de participar de cultos de estudo bíblico e EBD’s?</p>
            <select name="participacaocultos" 
            id="participacaocultos" value={cadMembers.participacaocultos || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Costuma informar seus pastores sobre ausências na adoração coletiva?</p>
            <textarea name="habito" 
            id="habito" cols="45" rows="1" 
            value={cadMembers.habito || ''} 
            onChange={handleSubmitCamps}></textarea >
          </label>
          <label className="campForm">
            <p>Tem o hábito de participar de cultos de oração?</p>
            <select name="cultosdeoracao" 
            id="cultosdeoracao" 
            value={cadMembers.cultosdeoracao || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Tem o hábito de buscar aconselhamento pastoral?</p>
            <select name="aconselhamentopastoral" 
            id="aconselhamentopastoral" 
            value={cadMembers.aconselhamentopastoral || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Você preza pelo desenvolvimento da vida em comunidade, do congregar e servir uns aos outros?</p>
            <select name="desenvolvimento" 
            id="desenvolvimento" 
            value={cadMembers.desenvolvimento || ''}
             onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
        </div>
    
        <div className="sectionAbas" id="aba5">
          <label className="campForm">
            <p>O que te faz convicto de que você é um verdadeiro discípulo de Jesus?</p>
            <textarea name="conviccaodiscipulo" 
            id="conviccaodiscipulo" cols="85" rows="3" 
            value={cadMembers.conviccao}
             onChange={handleSubmitCamps}></textarea>
          </label>
          <label className="campForm">
            <p>Como você define o evangelho?</p>
            <textarea name="definicaoevangelho" 
            id="definicaoevangelho" cols="85" 
            rows="3" 
            value={cadMembers.definicaoevangelho} 
            onChange={handleSubmitCamps}></textarea>
          </label>
          <label className="campForm">
            <p>Quais frutos do Espírito que podem ser claramente percebidos na vida?</p>
            <textarea name="frutosespirito" 
            id="frutosespirito" cols="85" 
            rows="3" value={cadMembers.frutosespirito} 
            onChange={handleSubmitCamps}></textarea>
          </label>
          <label className="campForm">
            <p>Como cuida do desenvolvimento e sua fé e da sua comunhão com Deus?</p>
            <textarea name="desenvolvimentodafe" 
            id="frutosespidesenvolvimentodaferito" cols="85" rows="3" 
            value={cadMembers.desenvolvimentodafe} 
            onChange={handleSubmitCamps}></textarea>
          </label>
          <label className="campForm">
            <p>Existe algum pecado contra qual você tenha lutado nos últimos anos?</p>
            <textarea name="pecado" id="pecado" 
            cols="85" rows="3" value={cadMembers.pecado}
             onChange={handleSubmitCamps}></textarea>
          </label>
          <label className="campForm">
            <p>Você tem convicções teológicas? Quais seriam?</p>
            <textarea name="conviccaoteologica" 
            id="conviccaoteologica" cols="85" rows="3" 
            value={cadMembers.conviccaoteologica} 
            onChange={handleSubmitCamps}></textarea>
          </label>
          <label className="campForm">
            <p>Você tem o hábito de evangelizar?</p>
            <select name="evangelizar" 
            id="evangelizar" 
            value={cadMembers.evangelizar || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Você tem o hábito de jejuar?</p>
            <select name="jejuar" id="jejuar" 
            value={cadMembers.jejuar || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Você já leu a bíblia toda alguma vez?</p>
            <select name="leiturabiblica" 
            id="leiturabiblica" 
            value={cadMembers.leiturabiblica || ''} 
            onChange={handleSubmitCamps}>
            <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
            </select>
          </label>
          <label className="campForm">
            <p>Quais os últimos 3 livros que você leu que edificaram a sua fé?</p>
           <input type="text" name="livros" 
           id="livros" 
           value={cadMembers.livros} 
           onChange={handleSubmitCamps} />
          </label>
        </div>
        <div className="sectionAbas" id="aba6">
        <label className="campForm">
          <p>Tem alguma coisa a mais que você queria nos contar?</p>
          <textarea name="ultimasconsideracoes" 
          id="ultimasconsideracoes" cols="100" rows="5" 
          value={cadMembers.ultimasconsideracoes} 
          onChange={handleSubmitCamps}></textarea>
        </label>
    
        </div>           
        </div>
        </form>
    
    <Footer />
          </div>
    </div>
  )
}

export default Cadastro