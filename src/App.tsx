import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Image from './pages/image/Image';
import Booking from './pages/booking/booking';
import Modal from './component/modal/modal';
import Room from './pages/room/room';
import Home from './pages/home/home';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <div className="App">
      <Routes location={previousLocation || location}>
        <Route path='/' element={<Home />} />
        <Route path='/image' element={<Image />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/room' element={<Room />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
      {previousLocation ? (
        <Routes>
          <Route path="/booking/:weekNo" element={<Modal />} />
        </Routes>
      ) :
        <Routes>
          <Route path="/booking/:weekNo" element={<Modal />} />
        </Routes>
      }
    </div>
  );
}

export default App;
