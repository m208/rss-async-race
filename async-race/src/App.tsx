import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Garage } from './components/Garage';
import { Navigation } from './components/Navigation';
import { WinnersTable } from './components/WinnersTable';
import { createPagState } from './context/appState';
import { IAppState, TSortDir, TSortOptions } from './types/types';


function App() {
  const garageCurrPage = useState(1);
  const garageLastPage = useState(1);
  const winnersCurrPage = useState(1);
  const winnersLastPage = useState(1);

  const [sortBy, setSortBy] = useState<TSortOptions>('Time');
  const [activeSorter, setActiveSorter] = useState<TSortDir>('Asc');
  const [timeSorter, setTimeSorter] = useState<TSortDir>('Asc');
  const [winSorter, setWinSorter] = useState<TSortDir>('Asc');

  const appState: IAppState = {
    garagePagState: createPagState(garageCurrPage, garageLastPage),
    winnersPagState: createPagState(winnersCurrPage, winnersLastPage),
    winnersSort: { sortBy, setSortBy, activeSorter, setActiveSorter, timeSorter, setTimeSorter, winSorter, setWinSorter, onChange: ()=>{} },
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Garage appState={appState} />}></Route>
        <Route path='/winners' element={<WinnersTable appState={appState} />}></Route>
      </Routes>
    </>
  );
}

export default App;
