import React, { useState } from 'react'



export function Car() {
    const [carCount, setCarCount] = useState(0)
    const [pageNum, setpageNum] = useState(1)
    return (
        <div className='garage'>
            <h3>Garage ({carCount})</h3>
            <h4>Page #{pageNum}</h4>

        </div>

    )
}