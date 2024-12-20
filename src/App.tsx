import { useState } from "react";
import reactLogo from "./assets/react.svg";
import db from "./assets/db.json";
import viteLogo from "/vite.svg";
import TopLevelStatInput from "./components/TopLevelStatInput";
import AvailableChoices from "./components/AvailableChoices";
import {parseJsonKeys, findCorrectStatLevel, handlePassiveStats, }from "./utils/JsonDataProvider";

import "./App.css";
import { PlayerStat } from "./types";

function App() {
  const firstLevelKeys = parseJsonKeys(db); // Use utility to get keys

  // State for input values
  const [formValues, setFormValues] = useState<Record<string, string>>(
    firstLevelKeys.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const handleSelect = (selectedId: string) => {
    console.log("Selected ID:", selectedId);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };
  let choicesToSelect;
  const playerStats: PlayerStat={stats:[]};

  Object.entries(formValues).map(([key, value]) => {

      const stats = findCorrectStatLevel(key, Number(value), db)
      if(stats) {
       handlePassiveStats(stats.passive_stats, playerStats)
      }
       console.log(stats)
      
       
      if(stats) {
        // handleChoices(stats.available_choices, playerStats)
        choicesToSelect = (<AvailableChoices  title={key} items={stats.available_choices} onSelect={handleSelect} />)
      }
  })

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
      </div>

      <h4>Heroes Sheet:</h4>
      <pre>{JSON.stringify(playerStats, null, 2)}</pre>
    </>
  );
}

export default App;
