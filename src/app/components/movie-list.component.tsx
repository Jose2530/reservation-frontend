import React, { useState, useEffect } from 'react';
import { getMovies } from '../../api';
import { useNavigate } from 'react-router-dom';
import '../styles/componentCardList.css';

interface Movie {
  duration: number;
  gender: string;
  title: string;
  clasification: string;
  id: number;
  image?: string;
  description?: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const data = await getMovies();
        setMovies(data.movies);
      } catch (error) {
        setError('No se pudo obtener la lista de películas');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, []);

  if (loading) {
    return <div>Cargando películas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleViewRooms = (movie: Movie) => {
    navigate('/rooms', { state: { movie } });
  };

  return (
    <div className="movie-list-container">
      <h2>Lista de Películas</h2>
      <div className="movie-cards">
        {movies.map((movie) => (
          <div key={movie.id} className="card" style={{ width: '18rem' }}>
            <img
              src={movie.image || 'https://media.vandalsports.com/i/640x360/10-2023/202310492421_1.jpg'}
              className="card-img-top"
              alt={movie.title}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p><strong>Género:</strong> {movie.gender}</p>
              <p><strong>Duración:</strong> {movie.duration} minutos</p>
              <p><strong>Clasificación:</strong> {movie.clasification}</p>
              <p><strong>Descripción:</strong> {movie.description || 'Descripción no disponible'}</p>
              <a className="btn btn-primary" onClick={() => handleViewRooms(movie)}>
                Ver Salas
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
