import React from 'react';
import { NonAffectingStat } from '../types';

interface NonAffectingStatsProps {
  nonAffectingStats: NonAffectingStat[];
}

const NonAffectingStatsDisplay: React.FC<NonAffectingStatsProps> = ({ nonAffectingStats }) => {
  return (
    <div>
      <h2>Non-Affecting Stats</h2>
      {(nonAffectingStats && nonAffectingStats.length > 0 )? (
        <ul>
          {nonAffectingStats.map((stat) => (
            <li key={stat.id}>
              <strong>{stat.name}:</strong>
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No stats that do not affect the computation.</p>
      )}
    </div>
  );
};

export default NonAffectingStatsDisplay;
