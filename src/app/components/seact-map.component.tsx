import React, { useState, useEffect } from 'react';
import '../styles/seact-map.css';

interface SeatMapProps {
  onSelectSeats: (seats: string[]) => void;
  capacity: number;
}

const SeatMap: React.FC<SeatMapProps> = ({ onSelectSeats, capacity }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<string[]>([]);

  useEffect(() => {
    const generatedSeats = [];
    const rows = Math.ceil(capacity / 6);
    const seatsPerRow = 6;

    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row);
      for (let seatNumber = 1; seatNumber <= seatsPerRow && row * seatsPerRow + seatNumber <= capacity; seatNumber++) {
        generatedSeats.push(`${rowLetter}${seatNumber}`);
      }
    }

    setSeats(generatedSeats);
  }, [capacity]);

  const toggleSeat = (seat: string) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleReserve = () => {
    onSelectSeats(selectedSeats);
  };

  return (
    <div className="seat-map-container">
      <h3>Selecciona tus asientos</h3>
      <div className="seat-buttons-container">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`seat-btn ${selectedSeats.includes(seat) ? 'selected-seat' : 'unselected-seat'}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
      <button 
        className="reserve-btn" 
        onClick={handleReserve}
        disabled={selectedSeats.length === 0}
      >
        Reservar Asientos
      </button>
    </div>
  );
};

export default SeatMap;
