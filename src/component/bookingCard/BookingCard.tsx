import React from 'react'

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
      <p style={{
        fontSize: 14,
        margin: 0,
      }}>
        {data.startTime.split(' ')[1].split(':')[0] + ":" + data.startTime.split(' ')[1].split(':')[1] + ' - ' + data.endTime.split(' ')[1].split(':')[0] + ":" + data.endTime.split(' ')[1].split(':')[1]}
      </p>
      <h4 style={{ margin: 2, textWrap: 'wrap', padding: '0 10px 0 0 ' }}>{data.title}</h4>
    </div>
  )
}

export default BookingCard