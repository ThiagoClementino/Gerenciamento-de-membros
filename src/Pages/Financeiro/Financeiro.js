import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import Datainfor from "../../Contexts/DataInfor";
import Footer from "../Footer/Footer";
import Header from "../Header/Sidebar";

export const Financeiro = () => {
  const { dadosfinance } = useContext(Datainfor);
  const [dataRegistro, setDataRegistro] = useState("");

  const [financialData, setFinancialData] = useState({
    tipodedado: "",
    valor: "",
    statuspagamento: "",
    datapagamento: "",
    tipolancamento: "",
    comprovante: null,
    observacao: "",
    descricao: "",
  });

  const handleCampfinancial = useCallback((event) => {
    const { name, value } = event.target;
    setFinancialData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFormFinancial = useCallback(async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://api-gestao-igreja.onrender.com/finance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(financialData),
          mode: "cors",
        }
      );

      const json = await response.json();
      console.log(json);
      
      setFinancialData({
        tipodedado: "",
        valor: "",
        statuspagamento: "",
        datapagamento: "",
        tipolancamento: "",
        comprovante: null,
        observacao: "",
        descricao: "",
      });

      alert("Dados financeiros salvos com sucesso!");
      window.location.reload();
      
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao salvar os dados financeiros. Por favor, tente novamente.");
    }
  }, [financialData]);

  const handleSearch = useCallback((e) => {
    setDataRegistro(e.target.value);
  }, []);

  const filteredFinance = dadosfinance.filter((dado) => {
    const lowerSearchTerm = dataRegistro.toLowerCase();
    return (
      dado.dataderegistro?.toLowerCase().includes(lowerSearchTerm) ||
      dado.tipodedado?.toLowerCase().includes(lowerSearchTerm) ||
      dado.statuspagamento?.toLowerCase().includes(lowerSearchTerm) ||
      dado.datapagamento?.toLowerCase().includes(lowerSearchTerm) ||
      dado.tipolancamento?.toLowerCase().includes(lowerSearchTerm) ||
      dado.observacao?.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div className="layoutDefault">
      <Header />
      <div className="layoutComponent">
        <div className="titleAndBtnForm">
          <div className="banner">
            <h2>Cadastro Financeiro</h2>
            <p>Relação de despesas</p>
          </div>
          <div className="contTitle">
            <input
              type="search"
              value={dataRegistro}
              onChange={handleSearch}
              placeholder="Buscar..."
            />
          </div>
          <div className="btncontrol">
            <button className="primary" onClick={handleFormFinancial}>
              Salvar
            </button>
          </div>
        </div>

        <form
          onSubmit={handleFormFinancial}
          encType="multipart/form-data"
          className="LayoutForm"
        >
          <label className="campForm">
            <p>Tipo de registro</p>
            <select
              name="tipodedado"
              id="tipodedado"
              value={financialData.tipodedado}
              onChange={handleCampfinancial}
              required
            >
              <option value=""></option>
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </label>
          <label className="campForm">
            <p>Valor</p>
            <input
              type="number"
              name="valor"
              id="valor"
              value={financialData.valor}
              onChange={handleCampfinancial}
              required
            />
          </label>
          <label className="campForm">
            <p>Status</p>
            <select
              name="statuspagamento"
              id="statuspagamento"
              value={financialData.statuspagamento}
              onChange={handleCampfinancial}
              required
            >
              <option value=""></option>
              <option value="Pago">Pago</option>
              <option value="Não pago">Não pago</option>
            </select>
          </label>
          <label className="campForm">
            <p>Data</p>
            <input
              type="date"
              name="datapagamento"
              id="datapagamento"
              placeholder="DD/MM/AAAA"
              value={financialData.datapagamento}
              onChange={handleCampfinancial}
              required
            />
          </label>
          <label className="campForm">
            <p>Tipo de lançamento</p>
            <select
              name="tipolancamento"
              id="tipolancamento"
              value={financialData.tipolancamento}
              onChange={handleCampfinancial}
              required
            >
              <option value=""></option>
              <option value="Agua">Água</option>
              <option value="Luz">Luz</option>
              <option value="Aluguel">Aluguel</option>
              <option value="Despesa de departamento">
                Despesa de departamento
              </option>
              <option value="Internet">Internet</option>
            </select>
          </label>
          <label className="campForm">
            <p>Descrição</p>
            <textarea
              name="descricao"
              id="descricao"
              cols="85"
              rows="5"
              value={financialData.descricao}
              onChange={handleCampfinancial}
              required
            ></textarea>
          </label>
          <label className="campForm">
            <p>Observação</p>
            <textarea
              name="observacao"
              id="observacao"
              cols="85"
              rows="5"
              value={financialData.observacao}
              onChange={handleCampfinancial}
              required
            ></textarea>
          </label>
        </form>

        <div className="componentTable">
          <h4>Valores</h4>
          <table>
            <thead>
              <tr>
                <th className="checked">
                  <input type="checkbox" />
                </th>
                <th className="detalhes">Visualizar</th>
                <th className="detalhes">Data de registro</th>
                <th className="titleTable">Tipo de registro</th>
                <th className="titleTable">Valor</th>
                <th className="titleTable">Status</th>
                <th className="titleTable">Data do pagamento</th>
                <th className="titleTable">Tipo de lançamento</th>
                <th className="titleTable">Descrição</th>
                <th className="titleTable">Comprovantes</th>
              </tr>
            </thead>
            <tbody>
              {filteredFinance.map((dado, index) => (
                <tr key={index}>
                  <td className="checked-table">
                    <input type="checkbox" />
                  </td>
                  <td className="detalhes">
                    <button className="secundary">
                      <Link to={`/finance/${dado._id}`}>Detalhes</Link>
                    </button>
                  </td>
                  <td className="dataTable">{dado.dataderegistro}</td>
                  <td className="dataTable">{dado.tipodedado}</td>
                  <td className="dataTable">{dado.valor}</td>
                  <td className="dataTable">{dado.statuspagamento}</td>
                  <td className="dataTable">{dado.datapagamento}</td>
                  <td className="dataTable">{dado.tipolancamento}</td>
                  <td className="dataTable">{dado.descricao}</td>
                  <td className="dataTable">{dado.observacao}</td>
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