// src/components/Formulario.jsx

import React, { useState } from 'react';
import './testedois.css'

const Formulario = () => {
  const [abaAtiva, setAbaAtiva] = useState('dadosPessoais');

  const alternarAba = (aba) => {
    setAbaAtiva(aba);
  };

  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'dadosPessoais' ? 'active' : ''}`}
            onClick={() => alternarAba('dadosPessoais')}
          >
            Dados Pessoais
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'relacionamento' ? 'active' : ''}`}
            onClick={() => alternarAba('relacionamento')}
          >
            Relacionamento
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'histCristao' ? 'active' : ''}`}
            onClick={() => alternarAba('histCristao')}
          >
            Hist. Cristão
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'histCongregacional' ? 'active' : ''}`}
            onClick={() => alternarAba('histCongregacional')}
          >
            Hist. Congregacional
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'conviccoes' ? 'active' : ''}`}
            onClick={() => alternarAba('conviccoes')}
          >
            Convicções
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {abaAtiva === 'dadosPessoais' && (
          <div className="tab-pane active">
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
          </div>
        )}
        {abaAtiva === 'relacionamento' && (
          <div className="tab-pane active">
            {/* Campos de entrada para relacionamento */}
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
          </div>
        )}
        {abaAtiva === 'histCristao' && (
          <div className="tab-pane active">
            {/* Campos de entrada para história cristã */}
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
          </div>
        )}
        {abaAtiva === 'histCongregacional' && (
          <div className="tab-pane active">
            {/* Campos de entrada para história congregacional */}
          </div>
        )}
        {abaAtiva === 'conviccoes' && (
          <div className="tab-pane active">
            {/* Campos de entrada para convicções */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulario;
