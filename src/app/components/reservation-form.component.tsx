import React, { useState } from 'react';
import SeatMap from '../components/seact-map.component';
import { createReservation } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/reservation-form.css';

const ReservationForm: React.FC = () => {
  const { state } = useLocation();
  const movie = state?.movie;
  const room = state?.room;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [emailAddres, setEmail] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');
  const [reservationMessage, setReservationMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const availableSchedules = [
    '10:00 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
    '08:00 PM',
  ];

  const handleReserve = async () => {
    if (movie && room && selectedSeats.length > 0 && emailAddres && schedule) {
      const reservation = {
        movie: movie.title,
        room: room.name,
        schedule: schedule,
        emailAddres: emailAddres,
        selectedSeats: selectedSeats,
      };

      try {
        const result = await createReservation(reservation);
        setReservationMessage('¡Reserva exitosa!');
        console.log('Reservation result:', result);

        navigate('/reservations');
      } catch (error) {
        setReservationMessage('Hubo un error al realizar la reserva.');
        console.error('Reservation error:', error);
      }
    } else {
      setReservationMessage('Por favor, completa todos los campos.');
    }
  };

  if (!movie || !room) {
    return <div>Faltan datos importantes para realizar la reserva.</div>;
  }

  return (
    <div className="reservation-form-container">
      <div className="seat-map-section">
        <SeatMap onSelectSeats={setSelectedSeats} capacity={room?.capacity || 0} />
      </div>
      <div className="reservation-form-section">
        <h3>Película seleccionada: {movie.title}</h3>
        <h3>Sala seleccionada: {room.name}</h3>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={emailAddres}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
          />
        </div>

        <div>
          <label>Horario:</label>
          <div>
            {availableSchedules.map((time) => (
              <button
                key={time}
                className={`btn ${schedule === time ? 'btn-success' : 'btn-primary'} m-2`}
                onClick={() => setSchedule(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          className="confirm-btn"
          onClick={handleReserve}
          disabled={selectedSeats.length === 0 || !emailAddres || !schedule}
        >
          Confirmar Reserva
        </button>

        {reservationMessage && (
          <div
            className={`reservation-message ${reservationMessage.includes('exitosa') ? 'success' : 'error'}`}
          >
            {reservationMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
