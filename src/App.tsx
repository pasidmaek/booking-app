import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Image from './pages/Image';
import Booking from './pages/booking';
import Modal from './component/modal';
import Room from './pages/room';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <div className="App">
      <Routes location={previousLocation || location}>
        <Route path='/image' element={<Image />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/room' element={<Room />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/booking/:weekNo" element={<Modal type={'book'}/>} />
          <Route path="/room/:weekNo" element={<Modal type={'room'}/>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
