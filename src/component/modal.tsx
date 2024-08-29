import React, { useEffect } from 'react'
import './modal.css'
import bookingData from '../data/booking-data.json'
import Time from '../utils/date.json'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

function Modal(type: 'book' | 'room') {
  const location = useLocation()
  const navigate = useNavigate();
  const date = new Date()
  const { weekNo } = useParams();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  useEffect(() => {
    console.log(weekNo, roomId)
  }, [])

  const checkAvailability = (roomId: string, startTime: string, endTime: string) => {
    const roomIdBook = bookingData.filter((room) => room.roomId === roomId)
    return roomIdBook.every((booking) => {
      return (
        endTime <= booking.startTime || startTime >= booking.endTime
      );
    })
  }

  const getBookingsForWeek = (roomId: string, weekNo: '1' | '2' | '3') => {
    //weekno [1 = today, 2 = this week, 3 = next week]
    const today = new Date()
    switch (weekNo) {
      case '1': // today
        return bookingData.filter((booking) => {
          const bookingStart = new Date(booking.startTime);
          const bookingEnd = new Date(booking.endTime);
          return booking.roomId === roomId &&
            (today.toDateString() === bookingStart.toDateString() || today.toDateString() === bookingEnd.toDateString())
        });

      case '2': // this week
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return bookingData.filter((booking) => {
          const bookingStart = new Date(booking.startTime);
          return booking.roomId === roomId &&
            bookingStart >= startOfWeek &&
            bookingStart <= endOfWeek;
        });

      case '3': // next week
        const startOfNextWeek = new Date(today);
        startOfNextWeek.setDate(today.getDate() - today.getDay() + 7);

        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
        return bookingData.filter((booking) => {
          const bookingStart = new Date(booking.startTime);
          return booking.roomId === roomId &&
            bookingStart >= startOfWeek &&
            bookingStart <= endOfWeek;
        });
      default:
        return [];
    }
    // return [...array of bookings]
  }

  useEffect(() => {

  }, [weekNo, roomId])

  return (
    <div
      className="modal-wrapper"
      onClick={() => navigate('/booking')}
    >
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        <div className='info'>
          <div className='header'>
            <p>Room ID: {roomId}</p>
          </div>
          <p>upcoming</p>
          <p>{Time.Date[date.getDay()]}</p>
          <p>{`${date.getDate()} ${Time.ShortMonth[date.getMonth()]}`}</p>
          <p>Week: {weekNo}</p>
        </div>
        <div>
          <Link
            // className="frontpage-job"
            to={`/today?roomId=${roomId}`}
            state={{ previousLocation: location }}
          >
            Today
          </Link>
          <Link
            // className="frontpage-job"
            to={`/thisweek?roomId=${roomId}`}
            state={{ previousLocation: location }}
          >
            This Week
          </Link>
          <Link
            // className="frontpage-job"
            to={`/wholemonth?roomId=${roomId}`}
            state={{ previousLocation: location }}
          >
            Next Week
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Modal