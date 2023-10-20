import React, { useState } from 'react';
import "./index.css";
import Home from './routes/Home'
import Membership  from './routes/Membership'
import About from './routes/About'
import Trainers  from './routes/Trainers'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home  />}/>
      <Route path='/membership' element={<Membership />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/trainers' element={<Trainers />}/>
      <Route path='*' element={<Home />}/>
    </Routes>
   </>
  );
}

export default App;
