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
import { PlayerStat, SingleStatData, ComputedStats } from "./types";

function App() {
  const firstLevelKeys = parseJsonKeys(db);

  const [formValues, setFormValues] = useState<Record<string, string>>(
    firstLevelKeys.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const [playerStats, setPlayerStats] = useState<PlayerStat>({ stats: [] });
  const [computedStats, setComputedStats] = useState<ComputedStats>({});
  const [choicesToSelect, setChoicesToSelect] = useState<JSX.Element[]>(
    []
  );

  const handleSelect = (title: string, selectedChoice: SingleStatData) => {
    const updatedStats = { ...playerStats };
    handleSelectStats(title, selectedChoice, updatedStats);
    setPlayerStats(updatedStats);
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
  
      if (stats) {
        // 1. First, we need to ensure we don't duplicate stats.
        //    We can clear out any stats related to this key.
        updatedPlayerStats.stats = updatedPlayerStats.stats.filter(
          (stat) => stat.name !== key
        );
  
        // 2. Now we add the new stat based on the updated input value
        handlePassiveStats(stats.passive_stats, updatedPlayerStats);
  
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
  


  // Compute stats whenever `playerStats` changes
// Compute stats whenever `playerStats` changes
useEffect(() => {
  const computeStats = (): ComputedStats => {
    const statsSummary: ComputedStats = {}; // Start with a fresh object
    
    playerStats.stats.forEach((stat) => {
      statsSummary[stat.name] = (statsSummary[stat.name] || 0) + stat.value;
    });

    return statsSummary; // Return the fresh computation
  };

  setComputedStats(computeStats()); // Reset computed stats with the new summary
}, [playerStats]);

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


      <pre>{JSON.stringify(playerStats, null, 2)}</pre>
    </>
  );
}

export default App;
