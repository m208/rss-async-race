import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="app_menu">
      <span>
        <Link to="/">
            <button>Garage</button>
        </Link>
        <Link to="/winners">
            <button>Winners</button>
        </Link>
      </span>
    </nav>
  );
}