import React, { useEffect, useState } from 'react'
import './modal.css'
import Time from '../../utils/date.json'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { getBookingsForWeek } from '../../services/check';
import BookingCard from '../bookingCard/BookingCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Modal() {
  const location = useLocation()
  const navigate = useNavigate();
  const date = new Date()
  const { weekNo } = useParams();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date('Sun Sep 28 2019 00:00:00 GMT+0700 ')));
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
          <div className='today-container'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue ?? dayjs(new Date()))}
              />
            </LocalizationProvider>
            <h1 className='font' style={{ fontWeight: 'lighter' }}>{Time.Date[selectedDate.get('day')]}</h1>
            <h1 className='font' style={{ fontWeight: 'normal', marginBottom: '20%' }}>{`${selectedDate.get('D')} ${Time.ShortMonth[selectedDate.get('M')]}`}</h1>
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
        </div>
        <div className='plan'>
          <div className='week-container'>
            <Link
              className={`week ${weekNo === 'thisweek' ? 'active' : ''}`}
              to={`/booking/thisweek?roomId=${roomId}`}
              state={{ previousLocation: location }}
            >
              This Week
            </Link>
            <Link
              className={`week ${weekNo === 'nextweek' ? 'active' : ''}`}
              to={`/booking/nextweek?roomId=${roomId}`}
              state={{ previousLocation: location }}
            >
              Next Week
            </Link>
            <Link
              className={`week ${weekNo === 'wholemonth' ? 'active' : ''}`}
              to={`/booking/wholemonth?roomId=${roomId}`}
              state={{ previousLocation: location }}
            >
              Whole Month
            </Link>
          </div>
          {
            bookingDate && sortedDates ? (
              sortedDates.length === 0 ? (
                <p className='text-error'>No Booking</p>
              ) : (
                sortedDates.map(date => (
                  <div key={date}>
                    <h4 className='date-header'>{new Date(date).toDateString()}</h4>
                    {bookingDate[date].map((room: RoomType) => (
                      <div className='activity'>
                        <div className='circle' />
                        <BookingCard key={room.id} data={room} style={{ marginLeft: '5%' }} />
                      </div>
                    ))}
                  </div>
                ))
              )
            ) : (
              <p className='text-error'>Loading...</p>
            )
          }
        </div>
      </div>
    </div >
  );
}

export default Modal