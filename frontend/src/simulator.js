// SampleSimulator.js

import React, { useState } from 'react';

function generateDummyData(numSamples) {
  const data = [];
  let prevTimestamp = new Date();
  for (let i = 0; i < numSamples; i++) {
    const timestamp = new Date(prevTimestamp.getTime() + 1000); // Increment timestamp by 1 second
    const sample = {
      ts: timestamp.toISOString(),
      machine_status: Math.floor(Math.random() * 2),
      vibration: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    };
    data.push(sample);
    prevTimestamp = timestamp;
  }
  return data;
}

function SampleSimulator() {
  const [numSamples, setNumSamples] = useState(10);
  const [dummyData, setDummyData] = useState(generateDummyData(numSamples));

  const regenerateData = () => {
    const newData = generateDummyData(numSamples);
    setDummyData(newData);
  };

  return (
    <div>
      <h2>Sample Generation Simulator</h2>
      <label htmlFor="numSamples">Number of Samples:</label>
      <input
        type="number"
        id="numSamples"
        value={numSamples}
        onChange={(e) => setNumSamples(parseInt(e.target.value))}
      />
      <button onClick={regenerateData}>Generate Data</button>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Machine Status</th>
            <th>Vibration Level</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((sample, index) => (
            <tr key={index}>
              <td>{sample.ts}</td>
              <td>{sample.machine_status === 1 ? 'On' : 'Off'}</td>
              <td>{sample.vibration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SampleSimulator;
