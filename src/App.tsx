import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PeoplePage from './pages/PeoplePage';
import StarshipsPage from './pages/StarshipsPage';
import StarshipDetail from './pages/StarshipDetail';
import PlanetsPage from './pages/PlanetsPage';
import PeopleDetail from './components/PeopleDetail';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      {/* Fondo animado de estrellas */}
      <div className="stars">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Configuración del Router */}
      <Router>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:id" element={<PeopleDetail />} />
            <Route path="/starships" element={<StarshipsPage />} />
            <Route path="/starships/:id" element={<StarshipDetail />} />
            <Route path="/planets" element={<PlanetsPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
