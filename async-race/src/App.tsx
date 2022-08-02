import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Garage } from './components/Garage';
import { Navigation } from './components/Navigation';
import { GarageState } from './context/garageContext';
import { PaginationState } from './context/paginationContext';
import { GaragePage } from './pages/garage';
import { WinnersPage } from './pages/winners';

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path = '/' element = {<GaragePage /> }></Route>
      <Route path = '/winners' element = {<WinnersPage /> }></Route>
    </Routes>
    </>
  );
}

export default App;
