import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from './app/components/movie-list.component';
import MovieForm from './app/components/movie-form.component';
import './App.css';
import RoomList from './app/components/room-list.component';
import ReservationForm from './app/components/reservation-form.component';
import ReservationsList from './app/components/reservation-list';
import '../src/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/listmovie" element={<MovieList />} />
          <Route path="/add" element={<MovieForm />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/reservations" element={<ReservationsList />} />
        </Routes>
      </div>
    </Router>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goToMovies = () => {
    navigate("/listmovie");
  };

  const goToAddMovie = () => {
    navigate("/add");
  };

  const goToReservations = () => {
    navigate("/reservations");
  };

  return (
    <header className="header">
      <h1>Cinema El Paspi</h1>
      <div>
        <a 
          href="#"
          onClick={goToMovies}
          className="btn-custom"
          role="button"
        >
          Películas
        </a>

        <a 
          href="#"
          onClick={goToAddMovie}
          className="btn-custom"
          role="button"
        >
          Agregar Película
        </a>

        <a 
          href="#"
          onClick={goToReservations}
          className="btn-custom"
          role="button"
        >
          Ver Reservas
        </a>
      </div>
    </header>
  );
};

export default App;
