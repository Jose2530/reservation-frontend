import React, { useEffect, useState } from 'react';
import { getRooms } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/componentCardList.css';
interface Room {
  name: string;
  capacity: string;
}

const RoomList: React.FC = () => {
  const { state } = useLocation();
  const movie = state?.movie;
  const navigate = useNavigate();

  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms({ name: '', capacity: '' });
        const roomsArray = response.room || [];
        setAllRooms(roomsArray);
        setLoading(false);
      } catch (error) {
        setError('Hubo un error al obtener las salas');
        setLoading(false);
      }
    };

    fetchRooms();
  }, [movie]);

  const handleReserve = (room: Room) => {
    navigate('/reservation', { state: { movie, room } });
  };

  if (loading) {
    return <div className="loading">Cargando salas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-list-container">
      {movie && <h2>Para la película: {movie.title}</h2>}
      <div>
        <h3>Salas disponibles</h3>
        <div className="movie-cards">
          {allRooms.length > 0 ? (
            allRooms.map((room) => (
              <div key={room.name} className="card">
                <img
                  src="https://caracoltv.brightspotcdn.com/dims4/default/e2c80c0/2147483647/strip/true/crop/1200x720+0+0/resize/767x460!/quality/75/?url=http%3A%2F%2Fcaracol-brightspot.s3.us-west-2.amazonaws.com%2F46%2Fc9%2F9584278f4e90b3f4bcb72fb1953b%2Fcine-colombia.jpg"
                  className="card-img-top"
                  alt="Room"
                />
                <div className="card-body">
                  <h5 className="card-title">Sala: {room.name}</h5>
                  <p className="card-text">Capacidad: {room.capacity} personas</p>
                  <button
                    onClick={() => handleReserve(room)}
                    className="btn btn-primary"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="roomItem">No se encontraron salas disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
