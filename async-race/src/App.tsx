import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Garage } from './components/Garage';
import { Navigation } from './components/Navigation';
import { WinnersTable } from './components/WinnersTable';
import { createPagState } from './context/appState';
import { ICarState } from './model/Car';
import { model } from './model/fetchData';
import { IAnimState, IAppState, ICar, ICarSpeed, TEngineStatus, TSortDir, TSortOptions } from './types/types';

const homepage = '/m208-JSFE2022Q1/async-race';

function App() {
  const garageCurrPage = useState(1);
  const garageLastPage = useState(1);
  const winnersCurrPage = useState(1);
  const winnersLastPage = useState(1);

  const [sortBy, setSortBy] = useState<TSortOptions>('Time');
  const [activeSorter, setActiveSorter] = useState<TSortDir>('Asc');
  const [timeSorter, setTimeSorter] = useState<TSortDir>('Asc');
  const [winSorter, setWinSorter] = useState<TSortDir>('Asc');

  const [counter, setCounter] = React.useState(0);
  const [shouldAnimate, setShouldAnimate] = React.useState(true);

  const [carState, setCarState] = useState<Array<ICarState>>([]);

  const appState: IAppState = {
    garagePagState: createPagState(garageCurrPage, garageLastPage),
    winnersPagState: createPagState(winnersCurrPage, winnersLastPage),
    winnersSort: { sortBy, setSortBy, activeSorter, setActiveSorter, timeSorter, setTimeSorter, winSorter, setWinSorter, onChange: () => { } },

    //animationCount: prepareState({ counter, setCounter, shouldAnimate, setShouldAnimate, startAnim: ()=>{} }),
    //carState: { carState, setCarState },
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path={`${homepage}/`} element={<Garage appState={appState} />}></Route>
        <Route path={`${homepage}/winners/`} element={<WinnersTable appState={appState} />}></Route>
      </Routes>
    </>
  );
}

export default App;
