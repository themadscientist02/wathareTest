import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistogramChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data:data ,
      options: {
        categoryPercentage: 1.0,  
  barPercentage: 1.0,   
  maintainAspectRatio: false,
        scales: {
            
            x: {
            beginAtZero : true,
            barPercentage : 100,
            barThickness: 100
            // title: {
               
            //   display: true,
            //   text: 'X Axis'
            // }
          },
          y: {
            barThickness: 6,
             beginAtZero : true ,
            title: {
              display: true,
              text: 'Frequency'
            }
          }
        },
        // Additional options can be added as needed
      }
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default HistogramChart;
