
import React from 'react';

//import Chart from './Chart';
//import Chart from './Chart copy'
import Chart from './Chart1';
import Dailyweatherchart from './Dailyweatherchart'
import SummaryTable from './SummaryTable';
import DailyWeatherChart from './dailyweather';
import SampleSimulator from './simulator'

import './App.css'


const App = () => {


  return (
   <>
   <Chart copy/>
   <div className="App">
  
  <main style={{ 
    width: '60%', 
    margin: '20px auto',
    border: '5px solid #ccc', 
    padding: '20px',
    borderRadius: '100px', 
    backgroundColor: 'lightyellow'
  }}>
    <DailyWeatherChart /> 
  </main>
</div>
<div className="summary-table">

<SummaryTable/>
</div>
  <div className="summary-table"><SampleSimulator/></div>
   </>
  );
};

export default App;