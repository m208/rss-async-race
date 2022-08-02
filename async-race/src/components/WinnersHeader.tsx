import React from 'react';

export function WinnersHeader() {
  return (
      <div className="winners_head">
        <div className="winners_index">#</div>
        <div className="winners_name">Name</div>
        <div className="winners_wins">Wins</div>
        <div className="winners_time">Time</div>
      </div>
  );
}