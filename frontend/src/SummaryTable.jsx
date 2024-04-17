import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryTable = () => {
  const [summary, setSummary] = useState({});
  const [data,setData] = useState();
  const getData = async()=>
  {
    axios.get(`http://localhost:4000/machine/data`, {}).then((response) => {
          
          setData(response.data.data);
          console.log(response); 
          
      }).catch((error) => {
          console.error('Error fetching data:', error);
      });
  }

  
  useEffect(()=>{
    getData();
    if(data){
        generateSummary(data)
    }
  },[data])
  const generateSummary = (data) => {
    let onesCount = 0;
    let zerosCount = 0;
    let continuousOnes = 0;
    let continuousZeros = 0;
    let maxContinuousOnes=0;
    let maxContinuousZeros=0;

    //calculating  ones and zeros for summary table 
    for (let entry of data) {
      if (entry.machine_status === 1) {
        onesCount++;
        continuousOnes++;
        continuousZeros = 0; 
        
        if (continuousOnes > maxContinuousOnes) {
          maxContinuousOnes = continuousOnes;
        }
      } else if (entry.machine_status === 0) {
        zerosCount++;
        continuousZeros++;
        continuousOnes = 0; 
        
        if (continuousZeros > maxContinuousZeros) {
          maxContinuousZeros = continuousZeros;
        }
      }
    }

    setSummary({
      onesCount,
      zerosCount,
      maxContinuousOnes,
      maxContinuousZeros,
    });
  };

  return (
    <div className="container" style={{marginTop:"20%"}}>
    <div className="row justify-content-center">
        <h5 className='text-center'>Summary Table</h5>
      <div className="col-md-8">
        <table className="table table-striped">
        <thead className="thead-dark">
            <tr>
              <th>Status</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number of 1s</td>
              <td>{summary.onesCount}</td>
            </tr>
            <tr>
              <td>Number of 0s</td>
              <td>{summary.zerosCount}</td>
            </tr>
            <tr>
              <td>Max Continuous 1s</td>
              <td>{summary.maxContinuousOnes}</td>
            </tr>
            <tr>
              <td>Max Continuous 0s</td>
              <td>{summary.maxContinuousZeros}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  

  );
};
export default SummaryTable;