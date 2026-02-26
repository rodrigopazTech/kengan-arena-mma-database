import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ArenaPage from './pages/ArenaPage.jsx';
import WorkoutsPage from './pages/WorkoutsPage.jsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-kengan-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<ArenaPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
        </Routes>
      </div>
    </Router>
  );
}