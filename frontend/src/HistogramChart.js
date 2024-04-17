import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistogramChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Histogram',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'X Axis'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequency'
            }
          }
        }
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
