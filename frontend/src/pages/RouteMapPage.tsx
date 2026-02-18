import React from 'react';

const RouteMapPage: React.FC = () => {
  return (
    <div className="route-map-page">
      <h1>Route Map</h1>
      <p>Network layout of our lines.</p>
      <div className="svg-container" style={{ textAlign: 'center', marginTop: '30px' }}>
        <svg width="600" height="400" viewBox="0 0 600 400" style={{ border: '1px solid #ccc', backgroundColor: 'white' }}>
          {/* Main Line */}
          <line x1="100" y1="200" x2="500" y2="200" stroke="#2ecc71" strokeWidth="8" />
          <circle cx="100" cy="200" r="10" fill="white" stroke="#2ecc71" strokeWidth="3" />
          <text x="70" y="230" fontSize="12">West Station</text>
          
          <circle cx="300" cy="200" r="10" fill="white" stroke="#2ecc71" strokeWidth="3" />
          <text x="270" y="230" fontSize="12">Central Station</text>
          
          <circle cx="500" cy="200" r="10" fill="white" stroke="#2ecc71" strokeWidth="3" />
          <text x="470" y="230" fontSize="12">East Station</text>

          {/* North Line */}
          <line x1="300" y1="50" x2="300" y2="350" stroke="#3498db" strokeWidth="8" />
          <circle cx="300" cy="50" r="10" fill="white" stroke="#3498db" strokeWidth="3" />
          <text x="320" y="55" fontSize="12">North Station</text>

          <circle cx="300" cy="350" r="10" fill="white" stroke="#3498db" strokeWidth="3" />
          <text x="320" y="355" fontSize="12">South Station</text>
        </svg>
      </div>
    </div>
  );
};

export default RouteMapPage;
