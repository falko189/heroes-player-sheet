import React from 'react';
import { NonAffectingStat } from '../types';

interface NonAffectingStatsProps {
  stats: NonAffectingStat[];
}

const NonAffectingStatsDisplay: React.FC<NonAffectingStatsProps> = ({ stats }) => {
  return (
    <div>
      <h3>Non-Affecting Stats</h3>
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
        <p>No affecting stats to display.</p>
      )}
    </div>
  );
};

export default NonAffectingStatsDisplay;
