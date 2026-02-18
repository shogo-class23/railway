import React from 'react';

const StatusPage: React.FC = () => {
  const statuses = [
    { line: 'Main Line', status: 'Normal', message: 'Currently operating normally.' },
    { line: 'Subway Line', status: 'Delayed', message: 'Delayed by 10 minutes due to heavy rain.' },
    { line: 'Express Line', status: 'Suspended', message: 'Service suspended for maintenance.' },
  ];

  return (
    <div className="status-page">
      <h1>Operation Status</h1>
      <div className="status-list">
        {statuses.map((item, index) => (
          <div key={index} className={`status-item ${item.status.toLowerCase()}`}>
            <h3>{item.line}</h3>
            <p className="status-badge">{item.status}</p>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPage;
