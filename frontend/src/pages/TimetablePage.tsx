import React from 'react';

const TimetablePage: React.FC = () => {
  return (
    <div>
      <h1>Timetable</h1>
      <table>
        <thead>
          <tr>
            <th>Train</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Express 101</td>
            <td>Central Station</td>
            <td>North Station</td>
            <td>08:00</td>
            <td>10:30</td>
          </tr>
          <tr>
            <td>Local 202</td>
            <td>Central Station</td>
            <td>South Station</td>
            <td>08:15</td>
            <td>09:00</td>
          </tr>
          <tr>
            <td>Express 102</td>
            <td>North Station</td>
            <td>Central Station</td>
            <td>11:00</td>
            <td>13:30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimetablePage;
