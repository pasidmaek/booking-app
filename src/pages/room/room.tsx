import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './room.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getBookingsForWeek, checkAvailability } from '../../services/check';
import { DatePicker } from '@mui/x-date-pickers';
import { Link } from 'react-router-dom';

function Room() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(null));
  const [selectedRoom, setSelectedRoom] = useState<'A101' | 'A102' | 'Auditorium'>('A101');
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const [selectedBookRoom, setSelectedBookRoom] = useState<'A101' | 'A102' | 'Auditorium'>('A101');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()));
  const [selectedWeek, setSelectedWeek] = useState<'today' | 't-week' | 'n-week'>('today');
  const [booking, setBooking] = useState<RoomType[] | null>(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'today' | 't-week' | 'n-week' | null,
  ) => {
    if (newAlignment !== null) {
      setSelectedWeek(newAlignment);
    }
  };

  const handleRoomAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'A101' | 'A102' | 'Auditorium' | null,
    type: 'available' | 'book'
  ) => {
    if (newAlignment !== null) {
      type === 'available' ? setSelectedRoom(newAlignment) : setSelectedBookRoom(newAlignment)
    }
  };

  useEffect(() => {
    const isRoomAvailable = checkAvailability(selectedRoom, startDate?.toDate(), endDate?.toDate() ?? startDate?.toDate())
    setIsAvailable(isRoomAvailable)
  }, [startDate, endDate, selectedRoom])

  useEffect(() => {
    const roomBooking = getBookingsForWeek(selectedBookRoom, selectedDate?.toDate(), selectedWeek)
    // console.log(roomBooking)
    setBooking(roomBooking)
  }, [selectedWeek, selectedDate, selectedBookRoom])

  return (
    <div className='room-container'>
      <Link to={'/'} className='btn' style={{ margin: '2% 0 0 4%' }}>Back</Link >
      <div className='input-container'>
        <h1>Check room available</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date"
            value={startDate}
            ampm={false}
            onChange={(newValue) => setStartDate(newValue ?? dayjs(new Date()))}
            sx={{ marginBottom: 2 }}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            ampm={false}
            minDateTime={dayjs(startDate)}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ marginBottom: 2 }}
          />
        </LocalizationProvider>
        <ToggleButtonGroup
          value={selectedRoom}
          exclusive
          onChange={(event, newValue) => handleRoomAlignment(event, newValue, 'available')}
          aria-label="text alignment"
        >
          <ToggleButton value="A101" aria-label="left aligned">
            A101
          </ToggleButton>
          <ToggleButton value="A102" aria-label="centered">
            A102
          </ToggleButton>
          <ToggleButton value="Auditorium" aria-label="right aligned">
            Auditorium
          </ToggleButton>
        </ToggleButtonGroup>
        <h3>
          {`${selectedRoom} ${isAvailable}`}
        </h3>
      </div>
      <div className='input-container'>
        <h1>Check room booked</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue ?? dayjs(new Date()))}
            sx={{ marginBottom: 2 }}
          />
        </LocalizationProvider>
        <ToggleButtonGroup
          value={selectedBookRoom}
          exclusive
          onChange={(event, newValue) => handleRoomAlignment(event, newValue, 'book')}
          aria-label="text alignment"
        >
          <ToggleButton value="A101" aria-label="left aligned">
            A101
          </ToggleButton>
          <ToggleButton value="A102" aria-label="centered">
            A102
          </ToggleButton>
          <ToggleButton value="Auditorium" aria-label="right aligned">
            Auditorium
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={selectedWeek}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="today" aria-label="left aligned">
            Today
          </ToggleButton>
          <ToggleButton value="t-week" aria-label="centered">
            This Week
          </ToggleButton>
          <ToggleButton value="n-week" aria-label="right aligned">
            Next week
          </ToggleButton>
        </ToggleButtonGroup>
        {
          booking &&
          (
            booking.length === 0 ?
              <p>No room was booked</p>
              :
              booking.map((room: RoomType) => (
                <p key={room.id}>{room.title}</p>
              ))
          )
        }
      </div>
    </div >
  );
}

export default Room