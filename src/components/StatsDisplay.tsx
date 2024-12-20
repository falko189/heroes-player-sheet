import React from "react";
import { ComputedStats } from "../types";

type Props = {
  computedStats: ComputedStats;
};

const StatsDisplay: React.FC<Props> = ({ computedStats }) => {
  return (
    <div>
      <h2>Computed Stats</h2>
      <ul>
        {Object.entries(computedStats).map(([statName, value]) => (
          <li key={statName}>
            <strong>{statName}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsDisplay;
