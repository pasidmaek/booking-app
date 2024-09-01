import React, { useEffect, useState } from 'react'
import './modal.css'
import Time from '../../utils/date.json'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { getBookingsForWeek } from '../../services/check';
import BookingCard from '../bookingCard/BookingCard';
import { CircularProgress } from '@mui/material';

function Modal() {
  const location = useLocation()
  const navigate = useNavigate();
  const date = new Date()
  const { weekNo } = useParams();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date('Sun Sep 28 2019 00:00:00 GMT+0700 ')));
  const [booking, setBooking] = useState<RoomType[] | null>(null);
  const [bookingDate, setBookingDate] = useState<{ [date: string]: RoomType[] } | null>(null);
  const [sortedDates, setSortedDates] = useState<string[] | null>(null);
  const [todayBooking, setTodayBooking] = useState<RoomType[] | null>(null);

  const groupBookingsByDate = (bookings: RoomType[]) => {
    return bookings.reduce((acc, booking) => {
      const startDate = new Date(booking.startTime).toDateString();
      if (!acc[startDate]) {
        acc[startDate] = [];
      }
      acc[startDate].push(booking);
      return acc;
    }, {} as { [date: string]: RoomType[] });
  };

  useEffect(() => {
    const typeOfDate = weekNo === 'thisweek' ? 't-week' : weekNo === 'nextweek' ? 'n-week' : 'w-month'
    const roomBooking = getBookingsForWeek(roomId!, selectedDate?.toDate(), typeOfDate)

    const groupedBookings = groupBookingsByDate(roomBooking);
    const sortedDates = Object.keys(groupedBookings).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    setBooking(roomBooking)
    setBookingDate(groupedBookings);
    setSortedDates(sortedDates);
  }, [weekNo, roomId, selectedDate])

  useEffect(() => {
    const bookingList = getBookingsForWeek(roomId!, selectedDate?.toDate(), 'today')

    bookingList.sort((a, b) => {
      const startTimeA = new Date(a.startTime).getTime();
      const startTimeB = new Date(b.startTime).getTime();
      return startTimeA - startTimeB;
    });

    setTodayBooking(bookingList)
  }, [roomId, selectedDate])

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
          <div className='room-header'>
            <h2>{roomId}</h2>
          </div>
          <p style={{
            fontSize: '14px'
          }}>upcoming</p>
          <h1 className='font' style={{ fontWeight: 'lighter' }}>{Time.Date[date.getDay()]}</h1>
          <h1 className='font' style={{ fontWeight: 'normal', marginBottom: '20%' }}>{`${date.getDate()} ${Time.ShortMonth[date.getMonth()]}`}</h1>
          {
            todayBooking &&
            (
              todayBooking.length === 0 ?
                <p>No room was booked</p>
                :
                todayBooking.map((room: RoomType) => (
                  <BookingCard data={room} key={room.id} />
                ))
            )
          }
        </div>
        <div>
          <div>
            <Link
              // className="frontpage-job"
              to={`/booking/thisweek?roomId=${roomId}`}
              state={{ previousLocation: location }}
            >
              This Week
            </Link>
            <Link
              // className="frontpage-job"
              to={`/booking/nextweek?roomId=${roomId}`}
              state={{ previousLocation: location }}
            >
              Next Week
            </Link>
            <Link
              // className="frontpage-job"
              to={`/booking/wholemonth?roomId=${roomId}`}
              state={{ previousLocation: location }}
            >
              Whole Month
            </Link>
          </div>
          {
            bookingDate && sortedDates ? (
              sortedDates.length === 0 ? (
                <p>No Booking</p>
              ) : (
                sortedDates.map(date => (
                  <div key={date}>
                    <h4 className='date-header'>{new Date(date).toDateString()}</h4>
                    {bookingDate[date].map((room: RoomType) => (
                      <div className='activity'>
                        <div className='circle' />
                        <BookingCard key={room.id} data={room} style={{ marginLeft: '20%' }} />
                      </div>
                    ))}
                  </div>
                ))
              )
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
      </div>
    </div >
  );
}

export default Modal