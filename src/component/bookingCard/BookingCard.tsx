import React from 'react'
import './bookingCard.css'

type BookingProps = {
  data: RoomType
  style?: React.CSSProperties;
}

function BookingCard({ data, style }: BookingProps) {

  const combinedStyle = {
    ...style,
    marginBottom: '20px'
  };

  return (
    <div style={combinedStyle}>
      <p className='text-secondary'>
        {data.startTime.split(' ')[1].split(':')[0] + ":" + data.startTime.split(' ')[1].split(':')[1] + ' - ' + data.endTime.split(' ')[1].split(':')[0] + ":" + data.endTime.split(' ')[1].split(':')[1]}
      </p>
      <h4 className='text-primary'>{data.title}</h4>
    </div>
  )
}

export default BookingCard