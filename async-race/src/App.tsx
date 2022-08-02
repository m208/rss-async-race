import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Garage } from './components/Garage';
import { Navigation } from './components/Navigation';
import { WinnersPage } from './pages/winners';

function App() {
  const garageCurrPage = useState(1);
  const garageLastPage = useState(1);

  const garagePagState = { 
    currentPage: garageCurrPage[0], 
    lastPage: garageLastPage[0],  
    setPage: garageCurrPage[1],  
    setPageCount: garageLastPage[1],
    callback: ()=>{},
  };


  return (
    <>
    <Navigation />
    <Routes>
      <Route path = '/' element = {<Garage paginationState={garagePagState} /> }></Route>
      <Route path = '/winners' element = {<WinnersPage /> }></Route>
    </Routes>
    </>
  );
}

export default App;
