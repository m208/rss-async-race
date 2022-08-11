import React, { useContext, useEffect, useState } from 'react';
import { manageWinnersDB } from '../model/fetchData';
import { ICar, TRaceWinner } from '../types/types';


export function useRaceLogic() {

  const [nonIdleCarsCounter, setnonIdleCarsCounter] = useState(0);
  const [raceStart, setRaceStart] = useState(false);
  const [raceReset, setRaceReset] = useState(false);
  const [raceWinner, setraceWinner] = useState<TRaceWinner | null>(null);
  const [showWinnerModal, setshowWinnerModal] = useState(false);
  const [resetedCars, setresetedCars] = useState(0);
  const [disableRaceBttn, setdisableRaceBttn] = useState(false);

    
  const startRace = () => {
    setRaceReset(false);
    setRaceStart(true);
    setraceWinner(null);
    setresetedCars(0);
    setdisableRaceBttn(true);
  };
  
  const resetRace = () => {
    setraceWinner(null);
    setRaceStart(false);
    setRaceReset(true);
  };

  const setWinner = async (winner: TRaceWinner) => {
    setraceWinner(prev => prev ? null : winner);
    setRaceStart(false);
    setshowWinnerModal(true);
  };

  const confirmReset = async (car: ICar) => {
    setresetedCars(resetedCars + 1);
  };

  const closeWinnerModal = async () => {
    if (raceWinner) await manageWinnersDB(raceWinner);
    setshowWinnerModal(false);
  };
    
  return { nonIdleCarsCounter, setnonIdleCarsCounter,  raceStart, raceReset, setRaceReset, raceWinner, setraceWinner,
    showWinnerModal, resetedCars, disableRaceBttn, setdisableRaceBttn, 
    startRace, resetRace, setWinner, confirmReset, closeWinnerModal, 
  };
}