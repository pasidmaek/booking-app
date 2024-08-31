import React, { useEffect } from 'react'
import bookingData from '../../data/booking-data.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Booking() {
  //TODO: make assign 3
  const location = useLocation()
  const navigate = useNavigate()
  const roomBooking = Array.from(new Set(bookingData.map(room => room.roomId)));

  const handleOpenModal = (room: string) => {
    console.log('click room')
    navigate(`/booking/today?roomId=${room}`);
  };

  return (
    <div className=''>
      {roomBooking.map((room) => (
        // <button key={room} onClick={() => handleOpenModal(room)}>{room}</button>
        <Link
          // className="frontpage-job"
          to={`/today?roomId=${room}`}
          state={{ previousLocation: location }}
        >
          {room}
        </Link>
      ))}

    </div>
  )
}

export default Booking
