import React, { useState, useEffect } from 'react';
import { getReservations } from '../../api';
import '../styles/componentCardList.css';

interface Reservation {
  idReservation: number;
  movie: string;
  room: string;
  schedule: string;
  emailAddres: string;
  selectedSeats: string[];
}

const ReservationsList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data.reservations);
      } catch (err) {
        setError('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Cargando reservas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-list-container">
      <h2>Reservas</h2>
      <div className="movie-cards">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.idReservation} className="card" style={{ width: '18rem' }}>
              <img
                src="https://cadenaser.com/resizer/v2/FQUMGEQ4BVLYDI6OPO2EOCN6F4.jpg?auth=f6b5c4fadd1ab21516bba4976fe536e7aec4fbf1e5a883da465336ca18d011ef&quality=70&width=768&height=432&smart=true"
                className="card-img-top"
                alt={reservation.movie}
              />
              <div className="card-body">
                <h5 className="card-title">{reservation.movie}</h5>
                <p><strong>Sala:</strong> {reservation.room}</p>
                <p><strong>Horario:</strong> {reservation.schedule}</p>
                <p><strong>Email:</strong> {reservation.emailAddres}</p>
                <p><strong>Asientos:</strong> {reservation.selectedSeats.join(', ')}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay reservas disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ReservationsList;
