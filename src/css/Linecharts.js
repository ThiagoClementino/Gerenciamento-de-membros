import React from 'react'
import { Chart } from "react-google-charts";





const LineCharts = () => {

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
 


 

  return (
    <div className="dashboard">
      <div className="charts">
     <Chart
     chartType='ScatterChart'
     data={data}
     options={options}
     width="100%"
     height="25vh"
     margin="0"
     legendToggle 
     />
  </div>
  </div>
  )
}

export default LineCharts