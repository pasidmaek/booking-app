import React, { useEffect } from 'react'
import './modal.css'
import bookingData from '../../data/booking-data.json'
import Time from '../../utils/date.json'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

type ModalProps = {
  type: 'book' | 'room'
}

function Modal() {
  const location = useLocation()
  const navigate = useNavigate();
  const date = new Date()
  const { weekNo } = useParams();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  useEffect(() => {
    console.log(weekNo, roomId)
  }, [])

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