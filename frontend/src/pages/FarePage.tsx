import React, { useState } from 'react';

const FarePage: React.FC = () => {
  const [fare, setFare] = useState<number | null>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const calculateFare = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy fare calculation logic
    if (from && to) {
      const dummyFare = Math.floor(Math.random() * 500) + 100;
      setFare(dummyFare);
    }
  };

  return (
    <div className="fare-page">
      <h1>Fare Calculator</h1>
      <section className="route-search">
        <h2>Enter Journey Details</h2>
        <form onSubmit={calculateFare}>
          <input 
            type="text" 
            placeholder="From Station" 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="To Station" 
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button type="submit">Calculate Fare</button>
        </form>
        {fare !== null && (
          <div className="fare-result">
            <p>From {from} to {to}:</p>
            <h3>¥{fare}</h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default FarePage;
