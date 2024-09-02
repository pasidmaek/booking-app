import React, { useEffect } from 'react'
import bookingData from '../../data/booking-data.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Booking() {
  const location = useLocation()
  const roomBooking = Array.from(new Set(bookingData.map(room => room.roomId)));

  return (
    <div className='App-header'>
      <Link
        className="btn btn-radius"
        to={'/'}
      >
        Back to Home
      </Link>
      <div className='btn-container'>
        {
          roomBooking.map((room) => (
            <Link
              className="btn btn-radius"
              to={`/booking/thisweek?roomId=${room}`}
              state={{ previousLocation: location }}
              key={room}
            >
              {room}
            </Link>
          ))
        }
      </div>
    </div >
  )
}

export default Booking
