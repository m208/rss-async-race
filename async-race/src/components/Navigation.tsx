import React from 'react';

interface NavProps {
  setShowGarage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWinners: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navigation({ setShowWinners,  setShowGarage }: NavProps) {

  const showGarage = () =>{
    setShowGarage(true); 
    setShowWinners(false);
  };
  const showWinners = () =>{
    setShowGarage(false); 
    setShowWinners(true);
  };


  return (
    <nav className="app_menu">
      <button onClick={showGarage}>Garage</button>
      <button onClick={showWinners}>Winners</button>
    </nav>
  );
}