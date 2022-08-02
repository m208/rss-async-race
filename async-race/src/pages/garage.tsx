import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Garage } from '../components/Garage';

import { GarageState } from '../context/garageContext';
import { PaginationState } from '../context/paginationContext';



export function GaragePage() {
  return (
        <Garage></Garage>
  );
}