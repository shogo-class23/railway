import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RouteMapPage from './pages/RouteMapPage';
import TimetablePage from './pages/TimetablePage';
import StatusPage from './pages/StatusPage';
import FarePage from './pages/FarePage';
import StationMapPage from './pages/StationMapPage';
import TicketPage from './pages/TicketPage';
import TransferPage from './pages/TransferPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/fares" element={<FarePage />} />
          <Route path="/station-maps" element={<StationMapPage />} />
          <Route path="/map" element={<RouteMapPage />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
