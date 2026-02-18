import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RouteMapPage from './pages/RouteMapPage';
import TimetablePage from './pages/TimetablePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<RouteMapPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
