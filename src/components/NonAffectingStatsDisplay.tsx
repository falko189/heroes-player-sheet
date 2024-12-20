import React from 'react';
import { NonAffectingStat } from '../types';

interface NonAffectingStatsProps {
  stats: NonAffectingStat[];
}

const getLi = (stat: NonAffectingStat) => {
  const randomNum = Math.floor(Math.random() * 100000);
  return(
    <li key={stat.id + randomNum}>
      <strong>{stat.name}:</strong>
      <br />
    </li>
  );
}
const NonAffectingStatsDisplay: React.FC<NonAffectingStatsProps> = ({ stats }) => {
  
  return (
    <div>
      { stats ? (
        <ul>
          {stats.map((stat) => (
            getLi(stat)
          ))}
        </ul>
      ) : (
        <p>No affecting stats to display.</p>
      )}
    </div>
  );
};

export default NonAffectingStatsDisplay;
