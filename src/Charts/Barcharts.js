import React from 'react'
import {Chart} from "react-google-charts";
import '../Charts/charts.css'

const data = [ 
    ["Element", "Density", { role: "style" }],
  ["Copper", 8.05, "#b87333"], // RGB value
  ["Silver", 10.55, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], 

]
const Barcharts = () => {

  return (
    <div>
        <Chart chartType="ColumnChart" width="100%" height="40vh"  data={data} margin="0"/>
    </div>
  )
}

export default Barcharts