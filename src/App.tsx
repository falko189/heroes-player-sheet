import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import db from "./assets/db.json";
import viteLogo from "/vite.svg";
import TopLevelStatInput from "./components/TopLevelStatInput";
import AvailableChoices from "./components/AvailableChoices";
import StatsDisplay from "./components/StatsDisplay";

import {
  parseJsonKeys,
  findCorrectStatLevel,
  handlePassiveStats,
  handleSelectStats,
} from "./utils/JsonDataProvider";
import "./App.css";
import { PlayerStat, SingleStatData, ComputedStats, BasicStat, NonAffectingStat } from "./types";

function App() {
  const firstLevelKeys = parseJsonKeys(db);

  const [formValues, setFormValues] = useState<Record<string, string>>(
    firstLevelKeys.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const [playerStats, setPlayerStats] = useState<PlayerStat>({ stats: {}, choices: [] });
  const [computedStats, setComputedStats] = useState<ComputedStats>({});
  const [choicesToSelect, setChoicesToSelect] = useState<JSX.Element[]>(
    []
  );

  const handleSelect = (title: string, selectedChoice: SingleStatData) => {
    setPlayerStats((prevPlayerStats) => {
      const updatedStats = { ...prevPlayerStats };
      handleSelectStats(title, selectedChoice, updatedStats);
      return updatedStats;
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  useEffect(() => {
    let updatedPlayerStats = { ...playerStats };  // Make a shallow copy of the player stats
    let newChoicesToSelect: JSX.Element[] = [];
  
    // Go through each key-value pair of the form
    Object.entries(formValues).forEach(([key, value]) => {
      const newValue = Number(value); // Convert input value to a number
      const stats = findCorrectStatLevel(key, newValue, db);
      const statKey = key + "_key";
      if (stats) {
        // 1. First, we need to ensure we don't duplicate stats.
        //    We can clear out any stats related to this key.
        updatedPlayerStats.stats[statKey] = [] as BasicStat[]

        // 2. Now we add the new stat based on the updated input value
        handlePassiveStats(statKey, stats.passive_stats, updatedPlayerStats);
  
        // Add the new choices for the user to select
        newChoicesToSelect.push(
          <AvailableChoices
            key={key}
            title={key}
            items={stats.available_choices}
            onSelect={handleSelect}
          />
        );
      }
    });
  
    // After processing the stats, update the state with the new player stats and available choices
    setPlayerStats(updatedPlayerStats);
    setChoicesToSelect(newChoicesToSelect);
  }, [formValues]); // Re-run when formValues change
  


  // useEffect(() => {
  //   const computeStats = (): ComputedStats => {
  //     const statsSummary: ComputedStats = {}; // Start with a fresh object
  
  //     // Iterate through each stat group (e.g., destrezza_key, destrezza_again_key)
  //     Object.entries(playerStats.stats).forEach(([statKey, statsArray]) => {
  //       // Now statsArray should be an array of BasicStat objects
  //       statsArray.forEach((stat: BasicStat) => {
  //         // Accumulate the value for each stat by name
  //         statsSummary[stat.name] = (statsSummary[stat.name] || 0) + stat.value;
  //       });
  //     });
  
  //     return statsSummary; // Return the fresh computation
  //   };
  
  //   // Update the computed stats whenever `playerStats` changes
  //   setComputedStats(computeStats());
  // }, [playerStats]); // Re-run when playerStats change
  
  useEffect(() => {
    const computeStats = (): ComputedStats => {
      const statsSummary: Record<string, number> = {}; // For stats that affect the computation
      const nonAffectingStats: NonAffectingStat[] = []; // For stats that do not affect the computation
  
      // Iterate through each stat group (e.g., destrezza_key, destrezza_again_key)
      Object.entries(playerStats.stats).forEach(([statKey, statsArray]) => {
        // Now statsArray should be an array of BasicStat objects
        statsArray.forEach((stat: BasicStat) => {
          if (stat.should_affect_stats) {
            // Accumulate the value for each stat by name (if it affects stats)
            statsSummary[stat.name] = (statsSummary[stat.name] || 0) + stat.value;
          } else {
            //TODO bug maybe 2 passives can be displayed at once
            // Otherwise, add the stat to the nonAffectingStats list
            nonAffectingStats.push(stat);
          }
        });
      });
  
      // Return both the stats summary and non-affecting stats
      return { statsSummary, nonAffectingStats };
    };
  
    const { statsSummary, nonAffectingStats } = computeStats();
    setComputedStats({ statsSummary, nonAffectingStats });
  }, [playerStats]); // Re-run when playerStats change
  
  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Heroes Sheet</h1>

      <div className="card">
        <TopLevelStatInput
          jsonData={firstLevelKeys}
          formValues={formValues}
          handleChange={handleInputChange}
        />
        {choicesToSelect}
        <StatsDisplay computedStats={computedStats} />
      </div>


      {/* <pre>{JSON.stringify(playerStats, null, 2)}</pre> */}
    </>
  );
}

export default App;
