import React from "react";
import { ComputedStats } from "../types";
import DisplayCountedStats from "./DisplayCountedStats";
import NonAffectingStatsDisplay from "./NonAffectingStatsDisplay";

type Props = {
  computedStats: ComputedStats;
};

const StatsDisplay: React.FC<Props> = ({ computedStats }) => {

    console.log(computedStats)
  return (
    <div>
     <h4>Heroes Sheet:</h4>
      <DisplayCountedStats stats={computedStats.statsSummary}/>
      <NonAffectingStatsDisplay stats={computedStats.nonAffectingStats}/>
    </div>
  );
};

export default StatsDisplay;
