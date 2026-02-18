import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/status">Operation Info</Link></li>
          <li><Link to="/timetable">Timetable</Link></li>
          <li><Link to="/fares">Fares</Link></li>
          <li><Link to="/station-maps">Station Maps</Link></li>
          <li><Link to="/map">Route Map</Link></li>
          <li><Link to="/tickets">Buy Tickets</Link></li>
          <li><Link to="/transfer">Transfer Guide</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
