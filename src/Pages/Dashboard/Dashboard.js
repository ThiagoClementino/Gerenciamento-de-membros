import React from 'react'

import {Chart} from "react-google-charts";
import './dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { useContext } from 'react';
import Datainfor from '../../Contexts/DataInfor';
import Header from '../Header/Header';








const Dashboard = () => {
  const { dataForm  } = useContext(Datainfor);

 
   

  const optionsLine={
    title: 'Age vs. Weight comparsion',
    hAxis:{title: "Age", viewWindow: {min:0, max: 30}},
    vAxis:{title: "Weight", viewWindow: {min:0, max: 30}},
    lengend: "value"
  };
  
  const dataLine = [
    ["Age", "Weight"],
    [8, 12],
    [9, 13],
    [10, 14],
    [11, 15],
    [12, 16],
    [13, 18],
  
  ]
  const options={
    title: 'Age vs. Weight comparsion',
    hAxis:{title: "Age", viewWindow: {min:0, max: 30}},
    vAxis:{title: "Weight", viewWindow: {min:0, max: 30}},
    lengend: "value"
  };
  
  const data = [
    ["Age", "Weight"],
    [8, 12],
    [9, 13],
    [10, 14],
    [11, 15],
    [12, 16],
    [13, 17],
  
  ]
  const pieData = [
    ["Task", "Hours per Day"],
    ["Work", 20],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ]
  const pieOptions ={
    title: "My daily Activites",
  }
  const pieTwoData =[
    ["Task", "hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  const pieTwoOptions ={
    title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
  };

  
  return (
    <div className='dashboard'>
  
    <Header/>
   
     
      <div className="painels">
     
    <div className="containerPainel">
      <div className="painel">
        <div className="iconPainel">
          <FontAwesomeIcon icon={faUser} size="2x"  color="#0476D9 "pull="center" />
          </div>
          <div className="informationpainel">
            <h3>Membros cadastrados</h3>
            <p>{dataForm.length}</p>
          </div>
      </div>
      <div className="painel">
        <div className="iconPainel">
          <FontAwesomeIcon icon={ faUserCheck} size="2x" color="#0476D9" pull="center" />
          </div>
          <div className="informationpainel">
            <h3>Membros ativos</h3>
            <p>{dataForm.sex}</p>
          </div>
      </div>
   
      <div className="painel">
        <div className="iconPainel">
          <FontAwesomeIcon icon={faUserPlus} color="#0476D9" size="2x" pull="center" />
          </div>
          <div className="informationpainel">
            <h3>Novos Membros</h3>
            <p></p>
          </div>
      </div>
      <div className="painel">
        <div className="iconPainel">
          <FontAwesomeIcon icon={faUserCircle} color="#0476D9" size="2x" pull="center" />
          </div>
          <div className="informationpainel">
            <h3>Membros ativos</h3>
            <p>0</p>
          </div>
      </div>
    </div>
    <div className="painelChars">
      <div className="Piechart">
      <Chart
      chartType='PieChart'
      data={pieData}
      optional={pieOptions}
      width="100%"
      
      
          
       />
      </div>
      <div className="Piechart">
      <Chart
        chartType="PieChart"
        width="100%"
        height="auto"
                 
        data={pieTwoData}
        options={pieTwoOptions}
       />
      </div>
     
    
     
    </div>
    <div className="barcharts">
    <Chart
     chartType='ScatterChart'
     data={dataLine}
     options={optionsLine}
     width="100%"
     height="auto"
     
     
     
     
     />
    </div>
    <div className="linecharts">
      <div className="colunmCharts">
      
    <Chart chartType="ColumnChart" width="100%"  height="auto"  data={data} />
    </div>
    <div className="colunmCharts">
    <Chart chartType="ColumnChart" width="100%"  height="auto" data={data} />
    </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard