import React, { useState } from 'react';

const StationMapPage: React.FC = () => {
  const [stationName, setStationName] = useState('Central Station');

  return (
    <div className="station-map-page">
      <h1>Station Maps</h1>
      <div className="station-selector">
        <label htmlFor="station-select">Select Station:</label>
        <select 
          id="station-select" 
          value={stationName} 
          onChange={(e) => setStationName(e.target.value)}
        >
          <option value="Central Station">Central Station</option>
          <option value="North Station">North Station</option>
          <option value="West Station">West Station</option>
          <option value="East Station">East Station</option>
        </select>
      </div>

      <div className="map-display">
        <h2>{stationName} Layout</h2>
        <div className="map-placeholder">
          <p>This is a placeholder for the 3D or 2D layout of {stationName}.</p>
          <div className="map-grid">
            <div className="map-item platform">Platforms 1-4 (B2)</div>
            <div className="map-item concourse">Concourse & Tickets (B1)</div>
            <div className="map-item entrance">Main Entrance (Ground)</div>
            <div className="map-item shops">Shopping Area (1F)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationMapPage;
