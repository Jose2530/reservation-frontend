import React, { useState } from 'react';
import { createMovie } from '../../api';
import { useNavigate } from 'react-router-dom';
import '../styles/movie-form.css';

const MovieForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [clasification, setClasification] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Opciones para el género y clasificación
  const genres = ['Acción', 'Comedia', 'Drama', 'Terror', 'Aventura', 'Ciencia ficción'];
  const classifications = ['Mayores', 'Infantil', 'Mayores De 13'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedDuration = parseInt(duration);

    if (isNaN(parsedDuration) || !title || !gender || !clasification) {
      alert("Por favor, rellene todos los campos correctamente.");
      return;
    }

    const newMovie = { title, gender, clasification, duration: parsedDuration, description };
    try {
      await createMovie(newMovie);
      setMessage('¡Creación completa! La película ha sido registrada con éxito.');
      setTitle('');
      setGender('');
      setClasification('');
      setDuration('');
      setDescription('');
    } catch (error) {
      setMessage('Hubo un error al crear la película. Intenta nuevamente.');
    }
  };

  const handleViewRooms = () => {
    navigate('/rooms', { state: { movie: { title, gender, duration, clasification, description } } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="input-group">
          <label className="label">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Género:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input"
          >
            <option value="">Seleccionar Género</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="label">Clasificación:</label>
          <select
            value={clasification}
            onChange={(e) => setClasification(e.target.value)}
            className="input"
          >
            <option value="">Seleccionar Clasificación</option>
            {classifications.map((classification) => (
              <option key={classification} value={classification}>
                {classification}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="label">Duración (minutos):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
        </div>

        <button type="submit" className="button">Registrar Película</button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default MovieForm;
