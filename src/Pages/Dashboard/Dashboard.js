import React from 'react'
import Header from '../Header/Sidebar';

import Datainfor from '../../Contexts/DataInfor';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildDress, faChildReaching,faPeopleGroup, faPeopleLine} from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';


const Dashboard = () => {
  const {  dados } = React.useContext(Datainfor);
  const [data, setData] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setData(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero
    const ano = data.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
  };

  
   const Masculino = 
   dados.filter((dadomeber) => dadomeber.sex === "Masculino" || dadomeber ==="masculino").length;
   const Feminino = 
   dados.filter((dadomeber) => dadomeber.sex === "Feminino" || dadomeber ==="feminino").length;
   const membrosAtivos = dados.filter((dadomeber) => dadomeber.cad === true).length;

  
  
  return (
  <div className='layoutDefault'>
  <Header/>
  <div className='layoutDashboard'>
    <aside className="titleDashbaord">
      <div className="bannerDash">
      <h1>Dashboard</h1>
      <p>Gráficos e informações sobre os membros cadastrados</p>
      </div>
      <div className="bannerDash">
      <p>Data e Hora: {formatarData(data)}</p>
      </div>
    </aside>
    <div className="cards">
      <div className="card">
        <div className="inforCards">
        <p>Membros</p>
        <h2>{dados.length}</h2>
        </div>
        <div className="iconCards">
          <FontAwesomeIcon icon={faPeopleGroup} size='2xl' style={{color:"#383ef3"}}/>
        </div>
      </div>
      <div className="card">
        <div className="inforCards">
        <p>Membros ativos</p>
        <h2>{membrosAtivos}</h2>
        </div>
        <div className="iconCards">
          <FontAwesomeIcon icon={faPeopleLine} size='2xl' style={{color:"#383ef3"}}/>
        </div>
      </div>
      <div className="card">
        <div className="inforCards">
        <p>Homens</p>
        <h2>{Masculino}</h2>
        </div>
        <div className="iconCards">
        <FontAwesomeIcon icon={faChildReaching} size='2xl' style={{color:"#383ef3"}} />
        </div>
      </div>
      <div className="card">
        <div className="inforCards">
        <p>Mulheres</p>
        <h2>{Feminino}</h2>
        </div>
        <div className="iconCards">
    <FontAwesomeIcon icon={faChildDress} size='2xl' style={{color:"#383ef3"}}/>
        </div>
    
    </div>
  </div> 
  <div className="dashboards">
    <div className="Dashboard">
      <iframe src="
      https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697f96d-22ee-48b5-871d-fb08a93f831c&maxDataAge=3600&theme=light&autoRefresh=true" frameborder="0" className="charts"></iframe>
    </div>
    <div className="Dashboard">
      <iframe src="https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=6697fc6b-0a12-483e-8cb3-3ff11fc0d451&maxDataAge=3600&theme=light&autoRefresh=true" frameborder="0" className="charts"></iframe>
    </div>

  </div>
  <div className="painelFull">
    <iframe src="https://charts.mongodb.com/charts-gerenciadordemembros-oikrdpy/embed/charts?id=66982cc4-1232-4aea-8407-a721d3d95ec4&maxDataAge=3600&theme=light&autoRefresh=true" frameborder="0" className="charts"></iframe>

  </div>
  <Footer/>
  </div>
  </div>
  )
}

export default Dashboard