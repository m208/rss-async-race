import React from 'react';

import './App.css';
import { Garage } from './components/Garage';
import { GarageState } from './context/garageContext';

function App() {
  return (
    <GarageState>
       <Garage></Garage>
    </GarageState>
     
  );
}

export default App;
