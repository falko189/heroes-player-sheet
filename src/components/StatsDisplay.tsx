import React from "react";
import { ComputedStats } from "../types";
import DisplayCountedStats from "./DisplayCountedStats";
import NonAffectingStatsDisplay from "./NonAffectingStatsDisplay";

type Props = {
  computedStats: ComputedStats;
};

const StatsDisplay: React.FC<Props> = ({ computedStats }) => {

  return (
    <div>
     <h4>Heroes Sheet:</h4>
      <DisplayCountedStats stats={computedStats.statsSummary}/>
      <h4>Non-Affecting Stats</h4>
      <NonAffectingStatsDisplay stats={computedStats.nonAffectingStats}/>
    </div>
  );
};

export default StatsDisplay;
