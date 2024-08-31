import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';

import './room.css'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getBookingsForWeek, checkAvailability } from '../../services/check';

function Room() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(null));
  const [selectedRoom, setSelectedRoom] = useState<'A101' | 'A102' | 'Auditorium'>('A101');
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

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
  ) => {
    if (newAlignment !== null) {
      setSelectedRoom(newAlignment);
    }
  };

  useEffect(() => {
    const roomBooking = getBookingsForWeek('A101', selectedWeek)
    setBooking(roomBooking)
  }, [selectedWeek])

  useEffect(() => {
    const isRoomAvailable = checkAvailability(selectedRoom, startDate?.toString(), endDate?.toString() ?? startDate?.toString())
    setIsAvailable(isRoomAvailable)
  }, [startDate, endDate])

  return (
    <>
      <>
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
          onChange={handleRoomAlignment}
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
        <p>
          {`${selectedRoom} ${isAvailable}`}
        </p>
      </>
      <>
        <h1>Check room booked</h1>
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
                <p>{room.roomId}</p>
              ))
          )
        }
      </>
    </>
  );
}

export default Room