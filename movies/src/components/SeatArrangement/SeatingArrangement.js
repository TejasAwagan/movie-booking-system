import React, { useState } from 'react';
import './SeatingArrangement.css'; 

const Seat = ({ id, selected, onSelect }) => {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div
      className={`seat ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {id}
    </div>
  );
};

const SeatingArrangement = ({ onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatId) => {
    const seatIndex = selectedSeats.indexOf(seatId);
    if (seatIndex > -1) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
    onSeatSelect(seatId);
  };

  // Generating seating layout, you can replace it with your own logic
  const seatRows = 6;
  const seatsPerRow = 10;
  const totalSeats = seatRows * seatsPerRow;

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={i}
          id={i}
          selected={selectedSeats.includes(i)}
          onSelect={handleSeatSelect}
        />
      );
    }
    return seats;
  };

  return (
    <div className="seating-arrangement">
      <h2>Select Your Seat</h2>
      <div className="seats">{renderSeats()}</div>
      <div className='display-seats'>Selected Seats No : {selectedSeats.join(', ')}</div>
    </div>
  );
};

export default SeatingArrangement;
