import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


const DailyWeatherChart = () => {
  const [cityName, setCityName] = useState('');
  const [dailyData, setDailyData] = useState(null);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cityName.trim() !== '') {
      fetchCoordinates(cityName);
    }
  };

  const fetchCoordinates = (cityName) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0]; // Extract latitude and longitude
          fetchWeatherData(lat, lon);
        } else {
          console.error('City not found');
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
      });
  };

  const fetchWeatherData = (latitude, longitude) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
      .then(response => response.json())
      .then(data => {
        const filteredData = filterDataFor9AM(data.hourly);
        setDailyData(filteredData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const filterDataFor9AM = (hourlyData) => {
    const filteredData = [];
    hourlyData.time.forEach((time, index) => {
      if (time.endsWith('T09:00')) {
        filteredData.push({
          time: time.substring(0, 10), // Extract date only
          temperature_2m: hourlyData.temperature_2m[index],
          relative_humidity_2m: hourlyData.relative_humidity_2m[index],
          wind_speed_10m: hourlyData.wind_speed_10m[index]
        });
      }
    });
    return filteredData;
  };

  return (
    <div>
      {/* <h1>Daily Weather Stats at 9 AM</h1> */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter City Name:&nbsp;
          <input type="text" value={cityName} onChange={handleInputChange} />
        </label>
        <button type="submit">Get Weather Data</button>
      </form>
      {dailyData && (
        <div>
          <h2>Daily Weather Stats at 9 AM in {cityName}</h2>
          <Line
            data={{
              labels: dailyData.map(data => data.time),
              datasets: [
                {
                  label: 'Temperature (°C)',
                  data: dailyData.map(data => data.temperature_2m),
                  fill: false,
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.1
                },
                {
                  label: 'Relative Humidity (%)',
                  data: dailyData.map(data => data.relative_humidity_2m),
                  fill: false,
                  borderColor: 'rgb(54, 162, 235)',
                  tension: 0.1
                },
                {
                  label: 'Wind Speed (m/s)',
                  data: dailyData.map(data => data.wind_speed_10m),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }
              ]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DailyWeatherChart;
