import React from 'react';
import './App.css';
import { Garage } from './components/Garage';
import { GarageState } from './context/garageContext';
import { PaginationState } from './context/paginationContext';

function App() {
  return (
    <GarageState>
      <PaginationState>
        <Garage></Garage>
      </PaginationState>
    </GarageState>

  );
}

export default App;
