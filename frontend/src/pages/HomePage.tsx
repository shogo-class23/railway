import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to the Railway</h1>
        <p>Your journey starts here.</p>
      </section>
      <section className="route-search">
        <h2>Find your route</h2>
        <form>
          <input type="text" placeholder="From" />
          <input type="text" placeholder="To" />
          <button type="submit">Search</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
