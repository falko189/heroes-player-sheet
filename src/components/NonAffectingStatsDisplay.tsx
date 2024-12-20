import React from 'react';
import { NonAffectingStat } from '../types';

interface NonAffectingStatsProps {
  stats: NonAffectingStat[];
}

const NonAffectingStatsDisplay: React.FC<NonAffectingStatsProps> = ({ stats }) => {
  return (
    <div>
      <h2>Non-Affecting Stats</h2>
      {(stats && stats.length > 0 )? (
        <ul>
          {stats.map((stat) => (
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
