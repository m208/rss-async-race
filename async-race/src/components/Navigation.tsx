import React from 'react';
import { Link } from 'react-router-dom';

const homepage = '/m208-JSFE2022Q1/async-race';

export function Navigation() {
  return (
    <nav className="app_menu">
      <span>
        <Link to={homepage}>
            <button>Garage1</button>
        </Link>
        <Link to={`${homepage}/winners`}>
            <button>Winners1</button>
        </Link>
      </span>
    </nav>
  );
}