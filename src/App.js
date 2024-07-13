import React from 'react';
import MapComponent from './MapComponent';

const data = [
  { country: 'United States', headCount: 100, color: '#FFD700' },
  { country: 'China', headCount: 150, color: '#98FB98' },
  { country: 'India', headCount: 200, color: '#E6E6FA' },
  { country: 'Russia', headCount: 50, color: '#B0E0E6' },
  { country: 'Brazil', headCount: 75, color: '#FFA07A' },
  { country: 'Australia', headCount: 125, color: '#FFDAB9' },
  { country: 'Pakistan', headCount: 125, color: '#DDA0DD' },
  { country: 'Germany', headCount: 125, color: '#FFDEAD' },
  // Add more countries with headCount and color as needed
];



function App() {
  return (
    <div className="App">
      <h1>World Map with Head Count</h1>
      <MapComponent data={data} />
    </div>
  );
}

export default App;
