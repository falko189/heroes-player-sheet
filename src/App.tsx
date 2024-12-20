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
  const [choicesToSelect, setChoicesToSelect] = useState<JSX.Element | null>(
    null
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

  // Update stats and dynamically generate choices
  useEffect(() => {
    const updatedPlayerStats = { ...playerStats };
    let newChoicesToSelect: JSX.Element | null = null;

    Object.entries(formValues).forEach(([key, value]) => {
      const stats = findCorrectStatLevel(key, Number(value), db);
      if (stats) {
        handlePassiveStats(stats.passive_stats, updatedPlayerStats);

        newChoicesToSelect = (
          <AvailableChoices
            title={key}
            items={stats.available_choices}
            onSelect={handleSelect}
          />
        );
      }
    });

    setPlayerStats(updatedPlayerStats);
    setChoicesToSelect(newChoicesToSelect); // Update the dynamic choices
  }, [formValues]);

  // Compute stats whenever `playerStats` changes
  useEffect(() => {
    const computeStats = (): ComputedStats => {
      const statsSummary: ComputedStats = {};

      playerStats.stats.forEach((stat) => {
        statsSummary[stat.name] = (statsSummary[stat.name] || 0) + stat.value;
      });

      return statsSummary;
    };

    setComputedStats(computeStats());
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
