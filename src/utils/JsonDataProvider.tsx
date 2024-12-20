import { DB, StatData, SingleStatData, PlayerStat, BasicStat } from "../types";

export const parseJsonKeys = (db: DB): Array<string> => {
    return Object.keys(db); // Simple utility to extract top-level keys
};
  

export const findCorrectStatLevel = (stat: string, value: number, db: DB ): StatData => {
  const result:Object<number, any> = db[stat];
  let foundData:StatData;
  for (const [statValue, statData] of Object.entries(result)) {
      console.log(statValue);
      if (Number(statValue) > value) {
        break;
      }
      foundData = statData;
  }

  if(foundData === undefined) {
    //TODO implement default min return of stat IE pick the lowest possible stat
    //potentially superfluous
  }
  return foundData;
};

export const handlePassiveStats = (data: SingleStatData[], characterData: PlayerStat) => {

  data.forEach((statData: SingleStatData) => {
      characterData.stats.push({
        id: statData.id,
        name: statData.name,
        description: statData.description,
        value: Number(statData.value)
      } as BasicStat);

  });
}

export const handleSelectStats = (
  title: string,
  statData: SingleStatData,
  characterData: PlayerStat
) => {
  const selectedStatKey = title.replace(" ", "_") + "_available_choices_selected";
  // Check if the stat already exists in the array
  const existingStatIndex = characterData.choices.findIndex(
    (s) => s.id === selectedStatKey
  );

  // If the stat already exists, update it; otherwise, add it to the array
  if (existingStatIndex !== -1) {
    // Update the existing stat
    characterData.choices[existingStatIndex] = {
      id: selectedStatKey,
      name: statData.name,
      description: statData.description,
      value: Number(statData.value),
    } as BasicStat;
  } else {
    // If it doesn't exist, add the new stat
    characterData.choices.push({
      id: selectedStatKey,
      name: statData.name,
      description: statData.description,
      value: Number(statData.value),
    } as BasicStat);
  }
  console.log("characterData 2")
  console.log(characterData)
};
