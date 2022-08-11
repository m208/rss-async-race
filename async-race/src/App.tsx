import React, { useState } from 'react';
import './App.css';

import { Garage } from './components/Garage';
import { Navigation } from './components/Navigation';
import { WinnersTable } from './components/WinnersTable';
import { IAppState } from './types/types';


function App() {
  const [showGarage, setShowGarage] = useState(true);
  const [showWinners, setShowWinners] = useState(false);

  const navActions = { setShowGarage, setShowWinners };

  const appState: IAppState = {
    nav: { showGarage, showWinners },
  };

  return (
    <>
      <Navigation {...navActions} />
      <div className={`app_garage ${!showGarage ? 'hidden' : ''} ` }>
        <Garage/>
      </div>
      <div className={`app_winners ${!showWinners ? 'hidden' : ''} ` }>
        <WinnersTable appState={appState} />
      </div>
    </>
  );
}

export default App;
