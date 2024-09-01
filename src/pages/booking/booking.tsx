import React, { useEffect } from 'react'
import bookingData from '../../data/booking-data.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Booking() {
  const location = useLocation()
  const roomBooking = Array.from(new Set(bookingData.map(room => room.roomId)));

  return (
    <div>
      <Link
        className="back-btn"
        to={location.state?.from}
      >
        Back
      </Link>
      {
        roomBooking.map((room) => (
          <Link
            // className="frontpage-job"
            to={`/booking/today?roomId=${room}`}
            state={{ previousLocation: location }}
            key={room}
          >
            {room}
          </Link>
        ))
      }

    </div >
  )
}

export default Booking
