import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  return (
    <div className='btn-container'>
      <Link
        className="btn btn-radius"
        to={`/image`}
      >
        Go To Image
      </Link>
      <Link
        className="btn"
        to={`/room`}
      >
        Go To Room
      </Link>
      <Link
        className="btn"
        to={`/booking`}
      >
        Go To Booking
      </Link>
    </div>
  )
}

export default Home