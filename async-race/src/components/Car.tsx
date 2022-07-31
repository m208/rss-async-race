import React, { useState } from 'react';

//const a = 0;


export function Car() {
  const [carCount] = useState(0);
  const [pageNum] = useState(1);
  return (
        <div className='garage'>
            <h3>Garage ({carCount})</h3>
            <h4>Page #{pageNum}</h4>

        </div>

  );
}