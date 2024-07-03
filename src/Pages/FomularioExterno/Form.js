import React from 'react'
import { useState } from "react";





const Form = () => {
  const [exibir, setExibir] = useState ("secao1");
  
  const secaotaiva = (secao) =>{
    setExibir(secao);
  }
  return (
    <form >
      {exibir === "secao1" &&(
      <div className="section">
      <label  className='secao1'>
        <p>Texto1</p>
        <input type="text" />
        </label>
        <button className={`nav-Link ${exibir === "secao1" ? "active": ""}`}
        onClick={() =>secaotaiva('secao2')}>prossiga</button>
        </div>

)}  
      {exibir === "secao2" &&(
        <div className="section">
      <label className='secao2'>
        <p>Texto 2</p>
        <input type="text" />
        </label>
        <button className={`nav-Link ${exibir === "secao2" ? "active": ""}`}
        onClick={() =>secaotaiva('secao1')}>Voltar</button>
        <button className={`nav-Link ${exibir === "secao2" ? "active": ""}`}
        onClick={() =>secaotaiva('secao3')}>prossiga</button>
        </div>
      )}
      {exibir === "secao3" &&(
      <div className="section">
      <label className='secao3'>
        <p>Texto 3</p>
        <input type="text" />
        </label>
        <button className={`nav-Link ${exibir === "secao2" ? "active": ""}`}
        onClick={() =>secaotaiva('secao2')}>Voltar</button>
        <button className={`nav-Link ${exibir === "secao2" ? "active": ""}`}
        onClick={() =>secaotaiva('secao0')}>Enviar</button>
        </div>
        
      )}
    </form>
  )
}

export default Form